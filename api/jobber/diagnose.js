import { refreshAccessToken, sendJson, env } from "./_lib.js";

/**
 * GET /api/jobber/diagnose
 *
 * Heavy-duty diagnostic endpoint. Refreshes the access token, then probes the
 * Jobber GraphQL endpoint with several variations so we can see exactly where
 * the failure lives. Returns full unedited response bodies + headers from
 * every probe. Use this when /api/jobber/whoami returns a 404 and you need to
 * decide whether to fix code on our side or escalate to Jobber's API support.
 *
 * Probes (in order):
 *   1. GET /api/graphql (no auth)              — should always be 405 or 401-ish
 *   2. POST /api/graphql with INVALID token    — should be 401
 *   3. POST /api/graphql with VALID token + introspection query, version 2025-04-16
 *   4. POST /api/graphql with VALID token + account query, version 2025-04-16
 *      (most recent active version per Jobber's changelog)
 *   5. POST /api/graphql with VALID token + account query, NO version header
 *   6. POST /api/graphql with VALID token + account query, version 2024-04-22
 *      (the *invalid* version string our code historically sent — should 404
 *      since it's not in Jobber's active-versions list, confirming the bug)
 *
 * If 3-6 all return 404 with the same "GraphQL endpoint not found at /api/graphql"
 * body, the restriction is account-level on Jobber's side — escalate to support.
 */

const JOBBER_GRAPHQL = "https://api.getjobber.com/api/graphql";

async function probe(label, init, accessToken, query) {
  /* Build init: spread defaults, layer in caller overrides. */
  const finalInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...init.headers,
    },
    ...(query !== undefined
      ? { body: JSON.stringify({ query }) }
      : init.body !== undefined
      ? { body: init.body }
      : {}),
    ...Object.fromEntries(Object.entries(init).filter(([k]) => k !== "headers" && k !== "body")),
  };

  let result = { label, ok: false };
  try {
    const res = await fetch(JOBBER_GRAPHQL, finalInit);
    const raw = await res.text();
    result = {
      label,
      status: res.status,
      statusText: res.statusText,
      headers: {
        "content-type": res.headers.get("content-type"),
        "x-ratelimit-remaining": res.headers.get("x-ratelimit-remaining"),
        "x-ratelimit-limit": res.headers.get("x-ratelimit-limit"),
        "cf-ray": res.headers.get("cf-ray"),
        "server": res.headers.get("server"),
        "x-request-id": res.headers.get("x-request-id"),
      },
      bodyLength: raw.length,
      body: raw.length > 8000 ? raw.slice(0, 8000) + "…(truncated)" : raw,
    };
  } catch (e) {
    result.error = e.message;
  }
  return result;
}

export default async function handler(req, res) {
  if (!env("JOBBER_REFRESH_TOKEN")) {
    return sendJson(res, 400, {
      ok: false,
      error: "JOBBER_REFRESH_TOKEN is not set. Run the OAuth handshake first.",
    });
  }

  let accessToken = null;
  let refreshError = null;
  try {
    const tok = await refreshAccessToken();
    accessToken = tok.access_token;
  } catch (e) {
    refreshError = e.message;
  }

  const probes = [];

  /* P1: GET (wrong method, no auth) — baseline server-reachability check. */
  probes.push(await probe("p1_get_no_auth", { method: "GET" }));

  /* P2: POST with invalid token. */
  probes.push(
    await probe(
      "p2_post_invalid_token",
      { headers: {} },
      "obviously-not-a-real-token",
      "query { account { id } }",
    ),
  );

  if (accessToken) {
    /* P3: introspection query with valid token + active 2025-04-16 version. */
    probes.push(
      await probe(
        "p3_introspection_2025_04_16",
        { headers: { "X-JOBBER-GRAPHQL-VERSION": "2025-04-16" } },
        accessToken,
        "{ __schema { queryType { name } } }",
      ),
    );
    /* P4: account query with valid token + 2025-04-16 (latest active). */
    probes.push(
      await probe(
        "p4_account_2025_04_16",
        { headers: { "X-JOBBER-GRAPHQL-VERSION": "2025-04-16" } },
        accessToken,
        "query { account { id name } }",
      ),
    );
    /* P5: same query, no version header (per docs, version is REQUIRED — so
     * this should fail; we send it to confirm Jobber's actual error format). */
    probes.push(
      await probe(
        "p5_account_no_version",
        { headers: {} },
        accessToken,
        "query { account { id name } }",
      ),
    );
    /* P6: account query with the *INVALID* version string our code used to
     * send. Confirms whether this is the root cause of every 404 we've seen. */
    probes.push(
      await probe(
        "p6_account_invalid_2024_04_22",
        { headers: { "X-JOBBER-GRAPHQL-VERSION": "2024-04-22" } },
        accessToken,
        "query { account { id name } }",
      ),
    );
    /* P7: introspect RequestCreateInput so we can confirm which fields the
     * current API version accepts (Jobber renamed some between API versions). */
    probes.push(
      await probe(
        "p7_introspect_RequestCreateInput",
        { headers: { "X-JOBBER-GRAPHQL-VERSION": "2025-04-16" } },
        accessToken,
        `{ __type(name: "RequestCreateInput") { name inputFields { name description type { name kind ofType { name kind } } } } }`,
      ),
    );
    /* P8: introspect ClientCreateInput too — same risk. */
    probes.push(
      await probe(
        "p8_introspect_ClientCreateInput",
        { headers: { "X-JOBBER-GRAPHQL-VERSION": "2025-04-16" } },
        accessToken,
        `{ __type(name: "ClientCreateInput") { name inputFields { name description type { name kind ofType { name kind } } } } }`,
      ),
    );
    /* P9: introspect the nested RequestDetailsInput type. */
    probes.push(
      await probe(
        "p9_introspect_RequestDetailsInput",
        { headers: { "X-JOBBER-GRAPHQL-VERSION": "2025-04-16" } },
        accessToken,
        `{ __type(name: "RequestDetailsInput") { name inputFields { name description type { name kind ofType { name kind } } } } }`,
      ),
    );
    /* P10: introspect SourceAttributionAttributes so we can stamp leads "Website". */
    probes.push(
      await probe(
        "p10_introspect_SourceAttributionAttributes",
        { headers: { "X-JOBBER-GRAPHQL-VERSION": "2025-04-16" } },
        accessToken,
        `{ __type(name: "SourceAttributionAttributes") { name inputFields { name description type { name kind ofType { name kind } } } } }`,
      ),
    );
  }

  return sendJson(res, 200, {
    ok: true,
    accessTokenObtained: Boolean(accessToken),
    refreshError,
    apiVersionConfigured: env("JOBBER_API_VERSION", "2025-04-16"),
    probes,
  });
}
