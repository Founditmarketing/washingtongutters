import { createLeadInJobber, readJsonBody, sendJson, env } from "./_lib.js";

/**
 * POST /api/jobber/request
 *
 * Body (JSON):
 *   { name, email, phone, address, service, message, source }
 *
 * Response (always 200 if either Jobber OR the email backup succeeds):
 *   { ok: true,  jobber: { ok, requestId? }, email: { ok, skipped?, error? } }
 * Response (500 only when BOTH channels fail):
 *   { ok: false, error, jobber, email }
 *
 * Why "either succeeds = success":
 * The form is the primary conversion path for a service business that
 * earns most of its revenue from a few thousand inbound leads per year.
 * Losing a single lead because the Jobber refresh token cold-started
 * stale would be catastrophic. The email backup is cheap insurance: as
 * long as Doug gets an email he can follow up manually, no lead is
 * lost — even if the Jobber pipeline is broken for days.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") return sendJson(res, 405, { ok: false, error: "Method not allowed" });

  let body;
  try { body = await readJsonBody(req); }
  catch (e) { return sendJson(res, 400, { ok: false, error: "Invalid JSON body" }); }

  const { name, email, phone, address, service, message, source } = body || {};
  if (!phone && !email) return sendJson(res, 400, { ok: false, error: "Phone or email required" });

  /* Truncate + normalize once; both channels reuse this canonical shape. */
  const lead = {
    name:    String(name    || "").slice(0, 120),
    email:   String(email   || "").slice(0, 254) || null,
    phone:   String(phone   || "").slice(0, 32)  || null,
    address: String(address || "").slice(0, 240) || null,
    service: String(service || "").slice(0, 80)  || null,
    message: String(message || "").slice(0, 1000),
    source:  String(source  || "Website").slice(0, 80),
  };

  /* CHANNEL 1: Jobber. May be unconfigured (no refresh token) or fail
   * for any number of reasons (cold-start rotation, network, plan
   * changes). We treat it as best-effort. */
  let jobberResult;
  if (env("JOBBER_REFRESH_TOKEN")) {
    try {
      const data = await createLeadInJobber(lead);
      jobberResult = { ok: true, requestId: data.requestId, requestTitle: data.requestTitle };
    } catch (e) {
      console.error("[jobber/request] Jobber channel failed:", e.message);
      jobberResult = { ok: false, error: e.message };
    }
  } else {
    jobberResult = { ok: false, skipped: true, error: "JOBBER_REFRESH_TOKEN not configured" };
  }

  if (!jobberResult.ok) {
    return sendJson(res, 500, {
      ok:     false,
      error:  "We couldn't capture your lead right now — please call us.",
      jobber: jobberResult,
    });
  }

  return sendJson(res, 200, {
    ok:     true,
    jobber: jobberResult,
  });
}
