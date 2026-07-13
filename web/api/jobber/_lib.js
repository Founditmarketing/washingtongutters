/**
 * Shared Jobber API helpers.
 *
 * Used by both the Vercel serverless functions in api/jobber/* (production)
 * and the Vite dev-server middleware in vite-plugins/jobber-dev-api.js (local
 * development), so the wire protocol is identical in both environments.
 *
 * Env vars (read from process.env at request time so that Vercel's per-route
 * env injection works):
 *   JOBBER_CLIENT_ID
 *   JOBBER_CLIENT_SECRET
 *   JOBBER_REDIRECT_URI       — must match what's registered in the Developer Center
 *   JOBBER_API_VERSION        — default "2025-04-16" (Jobber's active API
 *                               version as of 2025-04-16; older strings like
 *                               "2024-04-22" are NOT in Jobber's published
 *                               active-versions list and cause the gateway to
 *                               return 404 instead of auto-upgrading. See
 *                               https://developer.getjobber.com/docs/changelog
 *   JOBBER_REFRESH_TOKEN      — populated after the one-time OAuth handshake.
 *                               Jobber ROTATES this on every refresh — we
 *                               capture each new value and persist it back.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const JOBBER_OAUTH_AUTHORIZE = "https://api.getjobber.com/api/oauth/authorize";
const JOBBER_OAUTH_TOKEN     = "https://api.getjobber.com/api/oauth/token";
const JOBBER_GRAPHQL         = "https://api.getjobber.com/api/graphql";

export function env(name, fallback = undefined) {
  const v = process.env[name];
  if (v === undefined || v === "") return fallback;
  return v;
}

/**
 * Persist a freshly rotated refresh token. Local dev writes back to
 * web/.env.local so the next request sees the updated value. Production
 * (Vercel) can't mutate env vars at runtime — there we update process.env in
 * memory so the same warm Lambda keeps working, and log a warning so the
 * owner knows to update Vercel's env vars manually before the function cold-
 * starts again. (We'll move to a KV store before that becomes a real problem.)
 */
export function persistRefreshToken(newRefresh) {
  if (!newRefresh) return;
  // Always update the in-memory env so the rest of this request and any
  // subsequent requests in the same warm process see the rotated token.
  process.env.JOBBER_REFRESH_TOKEN = newRefresh;

  // Local dev: write the new value into .env.local. We look up the file from
  // cwd / the script directory so this works whether the call originates from
  // Vite middleware or a one-off node script.
  const candidates = [
    resolve(process.cwd(), ".env.local"),
    resolve(process.cwd(), "web", ".env.local"),
  ];
  for (const path of candidates) {
    if (!existsSync(path)) continue;
    try {
      const txt = readFileSync(path, "utf8");
      if (!/^JOBBER_REFRESH_TOKEN=/m.test(txt)) {
        writeFileSync(path, txt.trimEnd() + `\nJOBBER_REFRESH_TOKEN=${newRefresh}\n`, "utf8");
      } else {
        const updated = txt.replace(/^JOBBER_REFRESH_TOKEN=.*$/m, `JOBBER_REFRESH_TOKEN=${newRefresh}`);
        if (updated !== txt) writeFileSync(path, updated, "utf8");
      }
      return;
    } catch (e) {
      console.warn(`[jobber] could not persist rotated refresh token to ${path}:`, e.message);
    }
  }
  // Production / serverless: no writable filesystem. Surface the rotated value
  // so the operator can update Vercel env vars manually if needed.
  console.warn(
    "[jobber] refresh token rotated. Update JOBBER_REFRESH_TOKEN in Vercel env to:",
    newRefresh
  );
}

export function buildAuthorizeUrl({ state }) {
  const params = new URLSearchParams({
    client_id:    env("JOBBER_CLIENT_ID"),
    redirect_uri: env("JOBBER_REDIRECT_URI"),
    response_type: "code",
    state: state || cryptoState(),
  });
  return `${JOBBER_OAUTH_AUTHORIZE}?${params.toString()}`;
}

export async function exchangeCodeForToken(code) {
  const body = new URLSearchParams({
    client_id:     env("JOBBER_CLIENT_ID"),
    client_secret: env("JOBBER_CLIENT_SECRET"),
    grant_type:    "authorization_code",
    code,
    redirect_uri:  env("JOBBER_REDIRECT_URI"),
  });

  const res = await fetch(JOBBER_OAUTH_TOKEN, {
    method:  "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const txt = await res.text();
  let json = {};
  try { json = JSON.parse(txt); } catch { /* not JSON */ }
  if (!res.ok) {
    const msg = json.error_description || json.error || txt || `HTTP ${res.status}`;
    throw new Error(`Jobber token exchange failed: ${msg}`);
  }

  // Capture the issued refresh token so the caller doesn't have to remember.
  if (json.refresh_token) persistRefreshToken(json.refresh_token);
  return json; // { access_token, refresh_token, expires_in, ... }
}

export async function refreshAccessToken() {
  const refresh = env("JOBBER_REFRESH_TOKEN");
  if (!refresh) throw new Error("JOBBER_REFRESH_TOKEN is not set. Run the OAuth handshake first.");
  const body = new URLSearchParams({
    client_id:     env("JOBBER_CLIENT_ID"),
    client_secret: env("JOBBER_CLIENT_SECRET"),
    grant_type:    "refresh_token",
    refresh_token: refresh,
  });
  const res = await fetch(JOBBER_OAUTH_TOKEN, {
    method:  "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const txt = await res.text();
  let json = {};
  try { json = JSON.parse(txt); } catch { /* not JSON */ }
  if (!res.ok) {
    const msg = json.error_description || json.error || txt || `HTTP ${res.status}`;
    throw new Error(`Jobber refresh failed: ${msg}`);
  }

  // Jobber rotates the refresh token. Persist the new one IMMEDIATELY so the
  // next call uses it; otherwise the old token is dead and we'd need to re-
  // run the OAuth handshake.
  if (json.refresh_token) persistRefreshToken(json.refresh_token);
  return json; // { access_token, refresh_token, expires_in, ... }
}

export async function jobberGraphql(query, variables = {}, accessToken) {
  const res = await fetch(JOBBER_GRAPHQL, {
    method: "POST",
    headers: {
      "Content-Type":             "application/json",
      "Accept":                   "application/json",
      "Authorization":            `Bearer ${accessToken}`,
      "X-JOBBER-GRAPHQL-VERSION": env("JOBBER_API_VERSION", "2025-04-16"),
    },
    body: JSON.stringify({ query, variables }),
  });

  /* Read the raw body first so we can surface the real failure reason on
   * non-200 responses (e.g. plan-tier rejection from Jobber is returned
   * as HTML, not JSON, and our previous .catch silently swallowed it). */
  const raw = await res.text();
  let json = {};
  try { json = JSON.parse(raw); } catch { /* body wasn't JSON */ }

  if (!res.ok || json.errors) {
    /* Log full diagnostic context to Vercel function logs. The body is
     * truncated to 600 chars so a paranoid HTML error page doesn't bloat
     * Vercel's log line-length limits. */
    const bodySnippet = raw ? raw.slice(0, 600).replace(/\s+/g, " ") : "(empty body)";
    console.error(
      `[jobber] GraphQL request failed`,
      JSON.stringify({
        status:        res.status,
        statusText:    res.statusText,
        contentType:   res.headers.get("content-type"),
        ratelimitRemaining: res.headers.get("x-ratelimit-remaining"),
        cfRay:         res.headers.get("cf-ray"),
        bodySnippet,
        operation:     /\b(mutation|query)\s+(\w+)/.exec(query)?.[2] || "anonymous",
      }),
    );
    const msg = json.errors?.map((e) => e.message).join("; ")
             || `HTTP ${res.status} ${res.statusText} — ${bodySnippet.slice(0, 200)}`;
    throw new Error(`Jobber GraphQL failed: ${msg}`);
  }
  return json.data;
}

/**
 * Calls Jobber's `account` query. Returned data tells us exactly which Jobber
 * account the current refresh token is connected to — invaluable for confirming
 * that an OAuth handshake landed on the right business account (vs. a sandbox
 * or test account the user was incidentally logged into).
 */
export async function fetchConnectedAccount() {
  const tok = await refreshAccessToken();
  const data = await jobberGraphql(
    `query Whoami { account { id name } }`,
    {},
    tok.access_token,
  );
  return data?.account || null;
}

/**
 * Mutation that creates a new client + linked Request from a website lead.
 *
 * Jobber's `clientCreate` mutation accepts contact info; we then immediately
 * create a `request` referencing the new clientId. Two sequential GraphQL
 * calls (Jobber doesn't support a single create-client-and-request mutation
 * as of API 2025-04-16).
 *
 * Schema notes for the current API version:
 *   - ClientCreateInput has `sourceAttribution: { sourceText }` to label
 *     where the client came from (we stamp "Website").
 *   - RequestCreateInput dropped the flat `source` and `details` fields.
 *     `requestDetails` now requires a `form: FormInput!` — too heavy for
 *     a simple web lead — so we encode the message into a descriptive
 *     `title` instead. Doug sees the full message at-a-glance in Jobber's
 *     Requests inbox, no extra form template needed.
 */
export async function createLeadInJobber({ name, email, phone, address, service, message, source = "Website" }) {
  const tok = await refreshAccessToken();
  const access = tok.access_token;

  const [first, ...rest] = (name || "").trim().split(/\s+/);
  const last = rest.join(" ") || "";

  /* Parse the combined address string into structured components.
   * The front-end sends formats like:
   *   "3803 rue left bank, 78653"          (EstimateModal: street, zip)
   *   "3803 rue left bank Austin, WA 98401" (HeroLeadForm: street city, WA zip)
   * We extract the ZIP (trailing 5-digit number) and treat everything
   * before the last comma as the street line. */
  let parsedStreet = "";
  let parsedCity   = "";
  let parsedZip    = "";
  if (address) {
    const raw = address.trim();
    const zipMatch = raw.match(/\b(\d{5})\s*$/);
    if (zipMatch) {
      parsedZip = zipMatch[1];
      const beforeZip = raw.slice(0, zipMatch.index).replace(/[,\s]+$/, "");
      const lastComma = beforeZip.lastIndexOf(",");
      if (lastComma > 0) {
        parsedStreet = beforeZip.slice(0, lastComma).trim();
        parsedCity   = beforeZip.slice(lastComma + 1).replace(/,?\s*WA\s*$/i, "").trim();
      } else {
        parsedStreet = beforeZip;
      }
    } else {
      parsedStreet = raw;
    }
  }

  /* Build the PropertyAttributes object using the exact Jobber schema:
   *   PropertyAttributes { address: AddressAttributes! }
   *   AddressAttributes  { street1, street2, city, province, postalCode, country }
   * We pass this inline on clientCreate via the `properties` array so the
   * property is created atomically with the client in a single API call. */
  const propertyEntry = address ? {
    address: {
      street1:    parsedStreet || address,
      city:       parsedCity   || "",
      province:   "WA",
      postalCode: parsedZip    || "",
      country:    "United States",
    },
  } : null;

  // 1. Create the client WITH an inline property (if address provided).
  //    Jobber's ClientCreateInput accepts `properties: [PropertyAttributes]`
  //    which creates a service-location Property attached to the new client.
  //    We query back `clientProperties { nodes { id } }` to grab the
  //    property ID for linking to the Request.
  const clientData = await jobberGraphql(
    `mutation Create($input: ClientCreateInput!) {
      clientCreate(input: $input) {
        client {
          id
          firstName
          lastName
          clientProperties {
            nodes { id }
          }
        }
        userErrors { message path }
      }
    }`,
    {
      input: {
        firstName: first || "Unknown",
        lastName:  last,
        emails:       email ? [{ description: "MAIN",   address: email,  primary: true }] : [],
        phones:       phone ? [{ description: "MOBILE", number:  phone, primary: true, smsAllowed: true }] : [],
        ...(propertyEntry && { properties: [propertyEntry] }),
        sourceAttribution: { sourceText: source || "Website" },
      },
    },
    access,
  );

  const userErrors = clientData?.clientCreate?.userErrors;
  if (userErrors && userErrors.length) throw new Error(userErrors.map((e) => e.message).join("; "));
  const clientId = clientData?.clientCreate?.client?.id;
  if (!clientId) throw new Error("Jobber clientCreate returned no client id");

  // Extract the property ID created inline on the client.
  const propertyId = clientData?.clientCreate?.client?.clientProperties?.nodes?.[0]?.id;
  if (address && !propertyId) {
    console.warn("[jobber] property was requested but no propertyId returned from clientCreate");
  }

  /* Build a clean request title. The address now lives in the Property
   * field natively, so we keep the title focused on the service + message. */
  const titleParts = [
    service ? `${service} — website request` : "Website estimate request",
    message ? `"${message.replace(/\s+/g, " ").trim()}"` : null,
  ].filter(Boolean);
  const reqTitle = titleParts.join(" — ");

  // 2. Create the Request linked to that client and property.
  const requestData = await jobberGraphql(
    `mutation Create($input: RequestCreateInput!) {
      requestCreate(input: $input) {
        request { id title }
        userErrors { message path }
      }
    }`,
    {
      input: {
        clientId,
        ...(propertyId && { propertyId }),
        title: reqTitle,
      },
    },
    access,
  );

  const reqErrors = requestData?.requestCreate?.userErrors;
  if (reqErrors && reqErrors.length) throw new Error(reqErrors.map((e) => e.message).join("; "));
  const request = requestData?.requestCreate?.request;
  return { clientId, propertyId, requestId: request?.id, requestTitle: request?.title };
}

/* ─────────────────────────── tiny utilities ─────────────────────────── */

function cryptoState() {
  // Random URL-safe state token. Crypto API works in both Node (globalThis.crypto)
  // and Edge runtimes.
  const arr = new Uint8Array(16);
  globalThis.crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Read the JSON body of a Node http request. Used by the Vite middleware
 * shim; Vercel parses JSON automatically when content-type is application/json.
 */
export async function readJsonBody(req) {
  // If req.body has already been parsed (Vercel), return it.
  if (req.body && typeof req.body === "object") return req.body;
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => { raw += chunk; });
    req.on("end", () => {
      if (!raw) return resolve({});
      try { resolve(JSON.parse(raw)); } catch (e) { reject(e); }
    });
    req.on("error", reject);
  });
}

/**
 * Send a JSON response. Works against both Vercel's res.json (when present)
 * and a raw Node http.ServerResponse (Vite middleware).
 */
export function sendJson(res, status, payload) {
  if (typeof res.json === "function" && typeof res.status === "function") {
    return res.status(status).json(payload);
  }
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

/**
 * 302 redirect that works against both Vercel res helpers and raw Node res.
 */
export function sendRedirect(res, location) {
  if (typeof res.redirect === "function") return res.redirect(302, location);
  res.statusCode = 302;
  res.setHeader("Location", location);
  res.end();
}
