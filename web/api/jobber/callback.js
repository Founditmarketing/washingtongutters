import { exchangeCodeForToken, jobberGraphql, env } from "./_lib.js";

/**
 * GET /api/jobber/callback?code=...
 * Jobber redirects here after the owner clicks "Allow" on the authorize
 * screen. We exchange the code for an access_token + refresh_token, then
 * render an HTML page that prints the refresh_token once for the owner to
 * copy into .env.local and Vercel env vars.
 */
export default async function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) return renderHtml(res, 400, errorPage(error, url.searchParams.get("error_description")));
  if (!code)  return renderHtml(res, 400, errorPage("missing_code", "No `code` parameter on the callback URL."));

  let tokens;
  try {
    tokens = await exchangeCodeForToken(code);
  } catch (e) {
    return renderHtml(res, 500, errorPage("token_exchange_failed", e.message));
  }

  /* Immediately verify which Jobber account this token actually belongs to.
   * This is the single most useful diagnostic we can show — it confirms in
   * one glance whether the OAuth landed on the right business account, or on
   * a sandbox/test account the user was incidentally logged into. */
  let account = null;
  let accountError = null;
  try {
    const data = await jobberGraphql(
      `query Whoami { account { id name } }`,
      {},
      tokens.access_token,
    );
    account = data?.account || null;
  } catch (e) {
    accountError = e.message;
  }

  return renderHtml(res, 200, successPage(tokens, account, accountError));
}

function renderHtml(res, status, html) {
  if (typeof res.status === "function") {
    res.status(status).setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(html);
    return;
  }
  res.statusCode = status;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(html);
}

const baseStyles = `
  body { font-family: -apple-system, "Segoe UI", Roboto, sans-serif; margin: 0; background: #F6F3ED; color: #18202E; min-height: 100vh; padding: 48px 24px; }
  .card { max-width: 720px; margin: 0 auto; background: #FDFCFA; border: 1px solid rgba(42,64,128,0.10); border-radius: 18px; padding: 32px; }
  h1 { font-family: "Barlow Condensed", "Oswald", system-ui, sans-serif; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em; font-size: 36px; margin: 0 0 8px; color: #2A4080; }
  h2 { font-family: "Barlow Condensed", system-ui, sans-serif; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 14px; color: #C68A40; margin: 24px 0 6px; }
  p { line-height: 1.6; margin: 8px 0; }
  pre { background: #0D1638; color: #F6F3ED; padding: 16px; border-radius: 10px; font-size: 13px; overflow-x: auto; user-select: all; }
  .grid { display: grid; gap: 18px; margin-top: 18px; }
  ol li { margin-bottom: 6px; line-height: 1.55; }
  code { background: rgba(42,64,128,0.08); padding: 2px 6px; border-radius: 4px; font-size: 13px; }
  .err { color: #B33; }
`;

function successPage(tokens, account, accountError) {
  /* Render the account-verification banner FIRST. If we got a name back, show
   * it big and prominent so the owner can confirm the OAuth landed on the
   * right business account. If the account query failed (typically HTTP 404),
   * show a red error banner explaining the most likely cause. */
  let accountBanner;
  if (account) {
    accountBanner = `
      <div style="background:#E9F6EF;border:2px solid #1a8a4a;border-radius:12px;padding:18px 22px;margin:18px 0 8px;">
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#1a8a4a;font-weight:700;margin-bottom:4px;">✓ Connected Jobber Account</div>
        <div style="font-size:28px;font-weight:800;color:#0D1638;line-height:1.1;">${escapeHtml(account.name || "(unnamed account)")}</div>
        <div style="font-size:13px;color:#4B5B72;margin-top:6px;font-family:ui-monospace,monospace;">account id: ${escapeHtml(account.id || "")}</div>
        <p style="margin:12px 0 0;font-size:14px;line-height:1.5;color:#18202E;"><strong>Verify this name matches your real business account.</strong> If it shows a sandbox, test, or someone else's account, the OAuth landed on the wrong account — disconnect "Seamless Gutters Website" from that Jobber account (Settings → Apps) and re-run the handshake while logged into the correct account.</p>
      </div>`;
  } else {
    accountBanner = `
      <div style="background:#FCEDED;border:2px solid #B33;border-radius:12px;padding:18px 22px;margin:18px 0 8px;">
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#B33;font-weight:700;margin-bottom:4px;">⚠ Could not verify connected account</div>
        <div style="font-size:14px;color:#18202E;line-height:1.5;">The OAuth handshake succeeded and a refresh token was issued, but Jobber wouldn't tell us which account it belongs to. Most common cause: <strong>the account that approved this OAuth doesn't have GraphQL API access</strong> — usually because it's a sandbox or test account the owner was still logged into.</div>
        <pre style="margin-top:10px;background:#0D1638;color:#F6F3ED;padding:12px;border-radius:8px;font-size:12px;">${escapeHtml(accountError || "(no error message)")}</pre>
        <p style="margin:10px 0 0;font-size:14px;line-height:1.5;color:#18202E;"><strong>Fix:</strong> Open an incognito window. Log into <code>https://secure.getjobber.com</code> using ONLY the real business account credentials. In that same window, visit <code>http://localhost:5739/api/jobber/auth</code> and click Allow. The "Allow Access" screen should show the business name at the top — if it doesn't, abort and double-check the session.</p>
      </div>`;
  }

  return `<!doctype html><html><head><title>Jobber connected</title><style>${baseStyles}</style></head><body>
    <div class="card">
      <h1>Connected to Jobber.</h1>
      <p style="color:#1a8a4a;font-weight:600">✓ Refresh token has been saved automatically to <code>web/.env.local</code>. No copy/paste needed.</p>

      ${accountBanner}

      <p>If the account name above is correct, you can return to the site and submit an estimate now — it will create a real client + request in your Jobber inbox.</p>

      <h2>For production deployment</h2>
      <p>Add these environment variables in Vercel project settings (Production scope):</p>
      <pre>JOBBER_CLIENT_ID=${escapeHtml(env("JOBBER_CLIENT_ID") || "")}
JOBBER_CLIENT_SECRET=&lt;your secret from Jobber Developer Center&gt;
JOBBER_REFRESH_TOKEN=${escapeHtml(tokens.refresh_token || "")}
JOBBER_REDIRECT_URI=https://seamlessgutters4less.com/api/jobber/callback
JOBBER_API_VERSION=${escapeHtml(env("JOBBER_API_VERSION", "2025-04-16"))}</pre>

      <h2>Notes</h2>
      <ol>
        <li><strong>The server rotates the refresh token automatically.</strong> Every time the API mints a new access token, Jobber issues a fresh refresh token, and the server captures it back into <code>.env.local</code>. You should never need to re-run this handshake unless the app secret is rotated.</li>
        <li>For Vercel production: Vercel's filesystem is read-only at runtime. The first deploy will work with the refresh token above, but if it ever rotates in production the server logs will print the new value — copy it into Vercel env vars when that happens. Long-term we should move this to Vercel KV or another persistent store.</li>
        <li>Visit <code>/api/jobber/whoami</code> any time to re-verify which Jobber account the current token is connected to.</li>
      </ol>
    </div>
  </body></html>`;
}

function errorPage(error, description) {
  return `<!doctype html><html><head><title>Jobber connection error</title><style>${baseStyles}</style></head><body>
    <div class="card">
      <h1 class="err">Jobber handshake failed.</h1>
      <h2>Error</h2>
      <pre>${escapeHtml(error || "")}</pre>
      <h2>Details</h2>
      <pre>${escapeHtml(description || "(none)")}</pre>
      <h2>Common causes</h2>
      <ol>
        <li>The redirect URI in your Jobber Developer Center app doesn't match <code>${escapeHtml(env("JOBBER_REDIRECT_URI") || "(unset)")}</code> exactly.</li>
        <li>Your Jobber subscription tier doesn't include API access (requires Connect or higher).</li>
        <li>The required OAuth scopes weren't approved.</li>
      </ol>
    </div>
  </body></html>`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
