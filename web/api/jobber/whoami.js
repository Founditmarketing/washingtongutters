import { refreshAccessToken, jobberGraphql, sendJson, env } from "./_lib.js";

/**
 * GET /api/jobber/whoami
 *
 * Diagnostic endpoint. Refreshes the access token using the currently stored
 * JOBBER_REFRESH_TOKEN, then calls Jobber's `account` query and returns the
 * account name + id. Use this immediately after an OAuth handshake (or any
 * time things look weird in production) to confirm which Jobber account the
 * token is bound to.
 *
 * Always also returns `env` — a non-destructive view of which env vars are
 * set, masked enough to NOT leak secrets but specific enough to verify
 * "the value Vercel saved is actually what we expect to be there". Crucial
 * when a refresh fails: lets us tell at a glance whether the env var is
 * wrong vs the token was burned somewhere else.
 */

/* Mask a secret for safe display: keeps length + first 4 + last 4 chars,
 * replaces the middle with asterisks. Length is the diagnostic signal —
 * an unexpected length almost always means a paste typo. */
function maskSecret(v) {
  if (!v) return null;
  const s = String(v);
  if (s.length <= 8) return { length: s.length, value: "***" };
  return {
    length: s.length,
    prefix: s.slice(0, 6),
    suffix: s.slice(-6),
  };
}

function envSnapshot() {
  return {
    JOBBER_CLIENT_ID:     maskSecret(env("JOBBER_CLIENT_ID")),
    JOBBER_CLIENT_SECRET: maskSecret(env("JOBBER_CLIENT_SECRET")),
    JOBBER_REFRESH_TOKEN: maskSecret(env("JOBBER_REFRESH_TOKEN")),
    JOBBER_REDIRECT_URI:  env("JOBBER_REDIRECT_URI") || null,
    JOBBER_API_VERSION:   env("JOBBER_API_VERSION") || null,
  };
}

export default async function handler(req, res) {
  const envSnap = envSnapshot();

  if (!env("JOBBER_REFRESH_TOKEN")) {
    return sendJson(res, 400, {
      ok: false,
      error: "JOBBER_REFRESH_TOKEN is not set in env. Run the OAuth handshake first via /api/jobber/auth.",
      env: envSnap,
    });
  }

  try {
    const tok = await refreshAccessToken();
    const data = await jobberGraphql(
      `query Whoami { account { id name } }`,
      {},
      tok.access_token,
    );
    const account = data?.account || null;
    if (!account) {
      return sendJson(res, 502, {
        ok: false,
        error: "Jobber returned no account data for this token. The token may belong to a non-Jobber-API account.",
        env: envSnap,
      });
    }
    return sendJson(res, 200, {
      ok: true,
      account: { id: account.id, name: account.name },
      api_version: env("JOBBER_API_VERSION", "2025-04-16"),
      env: envSnap,
      note: "If the account name above is NOT your real business account (the one with your real clients), the OAuth handshake landed on the wrong account. Disconnect the app from that Jobber account and re-run the handshake while logged into the correct account.",
    });
  } catch (e) {
    return sendJson(res, 500, {
      ok: false,
      error: e.message,
      env: envSnap,
      hint:
        "If this is HTTP 404, the token is valid but the connected Jobber account doesn't have GraphQL API access. " +
        "If this is 'refresh token is not valid', the value in JOBBER_REFRESH_TOKEN env var has been consumed or " +
        "the env var differs from what was saved at OAuth time — compare the masked refresh-token prefix/suffix " +
        "below against the value you pasted into Vercel.",
    });
  }
}
