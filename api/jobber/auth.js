import { buildAuthorizeUrl, sendRedirect, env } from "./_lib.js";

/**
 * GET /api/jobber/auth
 * Kicks off the OAuth handshake. The owner visits this URL in their browser
 * exactly once, lands at Jobber's authorize screen, clicks "Allow", and is
 * redirected to /api/jobber/callback which captures the refresh_token.
 */
export default async function handler(req, res) {
  if (!env("JOBBER_CLIENT_ID") || !env("JOBBER_REDIRECT_URI")) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Jobber env vars not configured. See web/.env.local.");
    return;
  }
  const url = buildAuthorizeUrl({});
  sendRedirect(res, url);
}
