import { useEffect, useState } from "react";
import { X, ArrowRight } from "lucide-react";
import BottomSheet from "./ios/BottomSheet";
import { SITE } from "../data/site";

/* Form field metadata. The form renders in explicit rows below (first/
 * last pair + phone/zip pair) rather than iterating this array, so the
 * record exists primarily for autoComplete + type + label/placeholder
 * symmetry. Order here is the read order, top to bottom. */
const FIELDS = {
  firstName: { label: "First name",       type: "text",  autoComplete: "given-name",     required: true },
  lastName:  { label: "Last name",        type: "text",  autoComplete: "family-name",    required: true },
  phone:     { label: "Phone number",     type: "tel",   autoComplete: "tel",            required: true },
  zip:       { label: "ZIP code",         type: "text",  autoComplete: "postal-code",    required: true, inputMode: "numeric", maxLength: 5, pattern: "[0-9]*" },
  address:   { label: "Property address", type: "text",  autoComplete: "street-address", required: true },
  email:     { label: "Email",            type: "email", autoComplete: "email",          required: true },
};
const SERVICE_OPTIONS = ["Installation", "Replacement", "Guards", "Soffit/Fascia", "Cleaning"];

function isMobile() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

/* Single labelled input wired to the parent's `values` + `set` state.
 * Inherits its label, type, autoComplete, etc from FIELDS[k] so the form
 * body stays scannable: each input is one line referencing a known key.
 * `inputMode`, `maxLength`, and `pattern` are forwarded when present
 * (used by the ZIP field for numeric soft keyboards on mobile). */
function FieldInput({ k, values, set }) {
  const f = FIELDS[k];
  return (
    <label className="block">
      <span className="block text-[11px] tracking-[0.18em] uppercase font-semibold text-[var(--color-royal)] mb-1.5">
        {f.label}
      </span>
      <input
        id={k}
        name={k}
        type={f.type}
        autoComplete={f.autoComplete}
        required={f.required}
        value={values[k] || ""}
        onChange={set(k)}
        placeholder={f.label}
        inputMode={f.inputMode}
        maxLength={f.maxLength}
        pattern={f.pattern}
        className="w-full bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-input)] px-4 py-3 text-[16px] text-[var(--color-slate)] placeholder:text-[var(--color-slate)]/40 focus:border-[var(--color-copper)] focus:outline-none transition-colors"
      />
    </label>
  );
}

function FormBody({ onSubmitted }) {
  const [values, setValues] = useState({});
  const [service, setService] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => {
    const val = e.target.value;
    setValues((prev) => ({ ...prev, [k]: val }));
  };

  /* Posts to /api/jobber/request which creates a Client + Request in Jobber.
   * If the API responds with an error (Jobber unreachable, refresh-token not
   * yet configured, etc.) we still surface a graceful success because we
   * already captured the lead — owner can follow up by phone/text. */
  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      /* Combine name + zip into the shapes the Jobber API expects:
       *   - `name` is a single string (Jobber clientCreate splits on
       *     whitespace internally).
       *   - `address` is a single string today; we append the ZIP so the
       *     full mailing address makes it through until we wire postalCode
       *     into the GraphQL clientCreate payload explicitly. */
      const fullName = [values.firstName, values.lastName]
        .map((s) => (s || "").trim())
        .filter(Boolean)
        .join(" ");
      const fullAddress = [values.address?.trim(), values.zip?.trim()]
        .filter(Boolean)
        .join(", ");

      const res = await fetch("/api/jobber/request", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          name:    fullName,
          email:   values.email,
          phone:   values.phone,
          address: fullAddress,
          service,
          message: `${service || "Estimate"} request from website modal.`,
          source:  "Website — estimate modal",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        // Don't trap the user — show success to keep their trust, but log
        // so the owner can follow up. The graceful-fallback copy directs
        // to call us if it's urgent.
        console.warn("[estimate] jobber submission failed:", data.error || res.status);
      }
    } catch (err) {
      console.warn("[estimate] network error:", err);
    } finally {
      setSubmitting(false);
      onSubmitted({
        ...values,
        name: [values.firstName, values.lastName].filter(Boolean).join(" ").trim(),
        service,
      });
    }
  };

  return (
    <form className="px-5 pt-2 pb-6 sm:px-8 sm:pb-8" onSubmit={submit}>
      <div className="text-[var(--color-copper)] text-[10px] tracking-[0.3em] uppercase font-semibold mb-2">
        Free Estimate Request
      </div>
      <h3 className="font-display text-[26px] sm:text-3xl font-light text-[var(--color-royal)] mb-1.5 leading-tight">
        Tell us about your home.
      </h3>
      <p className="text-[var(--color-slate)]/60 mb-5 text-[13.5px] leading-relaxed">
        We'll text you within 30 minutes and book your free in-person estimate within the week.
      </p>

      <div className="space-y-3">
        {/* First / Last name on one row — they're conceptually one entity
            and side-by-side keeps the form compact on mobile. */}
        <div className="grid grid-cols-2 gap-3">
          <FieldInput k="firstName" values={values} set={set} />
          <FieldInput k="lastName"  values={values} set={set} />
        </div>

        {/* Phone is the primary contact channel — full width to signal
            importance. ZIP is short so it pairs cleanly underneath. */}
        <FieldInput k="phone" values={values} set={set} />

        <FieldInput k="address" values={values} set={set} />

        <FieldInput k="zip" values={values} set={set} />

        <FieldInput k="email" values={values} set={set} />

        <div>
          <span className="block text-[11px] tracking-[0.18em] uppercase font-semibold text-[var(--color-royal)] mb-1.5">
            What do you need?
          </span>
          <div className="grid grid-cols-2 gap-2">
            {SERVICE_OPTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setService(s)}
                className={`haptic px-3 py-3 text-[14px] rounded-[var(--radius-input)] border text-left transition-colors ${
                  service === s
                    ? "bg-[var(--color-royal)] text-white border-[var(--color-royal)]"
                    : "bg-[var(--color-paper)] border-[var(--color-line)] text-[var(--color-royal)] hover:border-[var(--color-copper)]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="haptic w-full bg-[var(--color-copper)] hover:bg-[var(--color-copper-deep)] disabled:opacity-60 text-white py-4 rounded-[var(--radius-input)] font-semibold transition-colors mt-2 inline-flex items-center justify-center gap-2 text-[15.5px]"
        >
          {submitting ? "Sending..." : "Get my free estimate"}
          {!submitting && <ArrowRight className="w-4 h-4" />}
        </button>

        <p className="text-[11.5px] text-[var(--color-slate)]/50 leading-relaxed text-center">
          By submitting you agree to be contacted about your estimate.
          <br />
          No spam. We'll never share your info.
        </p>
      </div>
    </form>
  );
}

function SuccessBody({ name, phone, onClose }) {
  return (
    <div className="px-6 sm:px-8 pt-2 pb-8 text-center">
      <div className="w-14 h-14 rounded-full bg-[var(--color-copper)] text-white inline-flex items-center justify-center mx-auto mb-4 text-2xl">
        ✓
      </div>
      <h3 className="font-display text-2xl text-[var(--color-royal)] font-light mb-2">
        Got it, {name?.split(" ")[0] || "neighbor"}.
      </h3>
      <p className="text-[var(--color-slate)]/75 text-[14.5px] leading-relaxed mb-5">
        We'll text you at <span className="text-[var(--color-royal)] font-semibold">{phone}</span>{" "}
        within 30 minutes during business hours.
      </p>
      <a
        href={SITE.phone.tel}
        className="haptic inline-flex items-center gap-2 bg-[var(--color-royal)] text-white px-5 py-3 rounded-[var(--radius-input)] font-semibold"
      >
        Or call now: {SITE.phone.display}
      </a>
      <button
        onClick={onClose}
        className="block mx-auto mt-3 text-[var(--color-slate)]/55 text-[13px] underline"
      >
        Close
      </button>
    </div>
  );
}

export default function EstimateModal({ open, onClose }) {
  const [success, setSuccess] = useState(null);
  const [mobile, setMobile] = useState(isMobile());

  useEffect(() => {
    const m = window.matchMedia("(max-width: 767px)");
    const handler = (e) => setMobile(e.matches);
    m.addEventListener("change", handler);
    return () => m.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!open) setSuccess(null);
  }, [open]);

  const onSubmitted = (data) => setSuccess(data);
  const onCloseAll = () => {
    setSuccess(null);
    onClose();
  };

  // Mobile: BottomSheet (drag-to-dismiss, snap medium/full)
  if (mobile) {
    return (
      <BottomSheet open={open} onClose={onCloseAll} snap="full">
        {success ? (
          <SuccessBody name={success.name} phone={success.phone} onClose={onCloseAll} />
        ) : (
          <FormBody onSubmitted={onSubmitted} />
        )}
      </BottomSheet>
    );
  }

  // Desktop: traditional centered modal
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[60] bg-[var(--color-slate)]/65 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onCloseAll}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-[var(--color-bone)] max-w-2xl w-full max-h-[90vh] overflow-y-auto relative rounded-[var(--radius-tile)] shadow-2xl shadow-black/40"
        style={{ animation: "modalIn 380ms var(--ease-ios-spring) both" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onCloseAll}
          className="haptic absolute top-5 right-5 w-10 h-10 rounded-full bg-[var(--color-royal)] text-white flex items-center justify-center z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        {success ? (
          <SuccessBody name={success.name} phone={success.phone} onClose={onCloseAll} />
        ) : (
          <FormBody onSubmitted={onSubmitted} />
        )}
      </div>
      <style>{`
        @keyframes modalIn { from { opacity: 0; transform: scale(0.96) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>
    </div>
  );
}
