import { useState } from "react";
import { ArrowRight, MapPin, Check, Phone } from "lucide-react";
import { SITE } from "../data/site";
import Eyebrow from "./atoms/Eyebrow";

/* ZIP3 (first three digits) regions that cover our service area — King,
 * Pierce, Snohomish, Thurston, and Mason counties:
 *   980 = King County Eastside / south King + north-Snohomish (Bothell)
 *   981 = Seattle (King)
 *   982 = Everett / Snohomish County
 *   983 + 984 = Tacoma / Pierce County
 *   985 = Olympia (Thurston) + Shelton & Belfair (Mason)
 * A ZIP that resolves outside these regions gets the friendly "call us"
 * fallback rather than a hard rejection. */
const SERVED_PREFIXES = new Set(["980", "981", "982", "983", "984", "985"]);
function checkServiceArea(zip) {
  const clean = zip.replace(/\D/g, "");
  if (clean.length !== 5) return null;
  return SERVED_PREFIXES.has(clean.slice(0, 3));
}

const SERVICE_OPTIONS = [
  { id: "install", label: "Gutter Installation" },
  { id: "replace", label: "Gutter Replacement" },
  { id: "repair", label: "Gutter Repair" },
  { id: "guards", label: "Gutter Guards" },
  { id: "soffit", label: "Soffit or Fascia" },
];

export default function HeroLeadForm() {
  const [step, setStep] = useState(0);
  const [zip, setZip] = useState("");
  const [served, setServed] = useState(null);
  const [service, setService] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* Joined first+last for downstream display and the Jobber API. We keep
   * first/last separate in component state because the API splits a flat
   * name on whitespace, which would corrupt a hyphenated or multi-word
   * surname. Passing the explicit join here avoids that. */
  const fullName = [firstName.trim(), lastName.trim()].filter(Boolean).join(" ");

  /* Build a single mailing-address string for the Jobber clientCreate
   * billingAddress.street1 field. We concatenate "<street>, <city>, WA
   * <zip>" so the full address survives even though our current Jobber
   * payload sends only the street1 line (postalCode/city wiring is a
   * follow-up — see _lib.js TODO). */
  const fullAddress = [
    address.trim(),
    city.trim() && `${city.trim()}, WA`,
    zip.trim(),
  ].filter(Boolean).join(" ");

  const handleZipSubmit = (e) => {
    e.preventDefault();
    const result = checkServiceArea(zip);
    setServed(result);
    if (result) setStep(1);
  };

  /* Posts to /api/jobber/request to create a Client + Request in Jobber.
   * Even if the call fails (token not yet configured, Jobber down) we still
   * advance to the success step because we don't want to discourage the
   * homeowner — a parallel server log lets the owner follow up by phone. */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/jobber/request", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          name:    fullName,
          phone,
          email,
          address: fullAddress || (zip ? `Zip ${zip}` : null),
          service: service ? SERVICE_OPTIONS.find((s) => s.id === service)?.label : null,
          message: "Hero ZIP form on website. Customer wants a callback.",
          source:  "Website — hero form",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        console.warn("[hero-lead] jobber submission failed:", data.error || res.status);
      }
    } catch (err) {
      console.warn("[hero-lead] network error:", err);
    } finally {
      setSubmitting(false);
      setStep(2);
    }
  };

  const inputCls =
    "bg-[var(--color-paper)] border border-transparent focus:border-[var(--color-copper)] focus:outline-none px-3.5 py-3 text-[15px] text-[var(--color-slate)] placeholder:text-[var(--color-slate)]/50 rounded-none";

  return (
    <div className="w-full">
      {step === 0 && (
        <form onSubmit={handleZipSubmit} className="grid lg:grid-cols-2 gap-7 lg:gap-12 items-center">
          {/* Left — copy */}
          <div>
            <Eyebrow color="white">Free Estimate · No Pressure</Eyebrow>
            <h2 className="font-display text-white text-[28px] sm:text-4xl lg:text-[44px] leading-[1.05] tracking-tight mt-4 mb-3">
              Are we in your area?
            </h2>
            <p className="text-white/70 text-[14.5px] leading-relaxed max-w-lg">
              We serve King, Pierce, Snohomish, Thurston &amp; Mason counties across the Puget Sound.
              Drop in your ZIP and we'll confirm in a click.
            </p>
          </div>

          {/* Right — ZIP input + reassurance */}
          <div className="w-full lg:justify-self-end lg:max-w-md">
            <label className="block">
              <span className="sr-only">Property zip code</span>
              <div className="flex bg-[var(--color-paper)] border-2 border-transparent focus-within:border-[var(--color-copper)] transition-colors overflow-hidden">
                <div className="flex items-center px-3.5 text-[var(--color-royal)]/55">
                  <MapPin className="w-[18px] h-[18px]" />
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={5}
                  value={zip}
                  onChange={(e) => {
                    setZip(e.target.value);
                    setServed(null);
                  }}
                  placeholder="Your zip code"
                  className="flex-1 min-w-0 py-4 bg-transparent text-[var(--color-royal)] placeholder:text-[var(--color-royal)]/45 focus:outline-none text-[16px]"
                  aria-label="Property zip code"
                  required
                />
                <button
                  type="submit"
                  className="haptic bg-[var(--color-copper)] hover:bg-[var(--color-copper-deep)] text-white px-6 transition-colors flex items-center gap-1.5 font-display-bold uppercase tracking-tight text-sm"
                >
                  Check <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </label>
            {served === false && (
              <div className="mt-3 text-[13px] text-white/80">
                We don't yet serve that zip. Call{" "}
                <a href={SITE.phone.tel} className="text-[var(--color-copper)] font-semibold underline">
                  {SITE.phone.display}
                </a>{" "}
                and we'll point you to a good local crew.
              </div>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[12px] text-white/65">
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <Check className="w-3 h-3 text-[var(--color-copper)]" /> No spam
              </span>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <Check className="w-3 h-3 text-[var(--color-copper)]" /> Same-day callback
              </span>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <Check className="w-3 h-3 text-[var(--color-copper)]" /> WA licensed
              </span>
            </div>
          </div>
        </form>
      )}

      {step === 1 && (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-[var(--color-copper)] text-xs font-semibold mb-2">
            <Check className="w-4 h-4" /> Yes — we serve {zip}.
          </div>
          <h2 className="font-display text-white text-2xl sm:text-3xl leading-tight mb-5">
            Two more details and we'll text you back.
          </h2>

          <div className="mb-4">
            <label className="block text-[10px] tracking-[0.2em] uppercase font-semibold text-white/80 mb-2">
              What do you need?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SERVICE_OPTIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setService(s.id)}
                  className={`haptic px-3 py-2.5 text-[14px] rounded-none border transition-all ${
                    service === s.id
                      ? "bg-[var(--color-copper)] text-white border-[var(--color-copper)]"
                      : "bg-white/[0.06] border-white/20 text-white hover:border-white/60"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <input id="firstName" name="firstName" type="text" autoComplete="given-name" required
              value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name"
              className={inputCls} aria-label="First name" />
            <input id="lastName" name="lastName" type="text" autoComplete="family-name" required
              value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name"
              className={inputCls} aria-label="Last name" />
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <input id="phone" name="phone" type="tel" autoComplete="tel" required
              value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number"
              className={`${inputCls} block w-full`} aria-label="Phone number" />
            <input id="email" name="email" type="email" autoComplete="email" required
              value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
              className={`${inputCls} block w-full`} aria-label="Email" />
          </div>
          <input id="address" name="address" type="text" autoComplete="street-address" required
            value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Property address"
            className={`${inputCls} block w-full mb-3`} aria-label="Property address" />

          <div className="grid grid-cols-[1fr_auto] gap-3 mb-5">
            <input id="city" name="city" type="text" autoComplete="address-level2" required
              value={city} onChange={(e) => setCity(e.target.value)} placeholder="City"
              className={inputCls} aria-label="City" />
            <div className="flex items-center justify-center px-4 bg-white/[0.06] border border-white/15 text-white/75 text-[14px] font-mono tracking-wider">
              {zip}
            </div>
          </div>

          <button
            type="submit"
            disabled={!service || submitting}
            className="haptic w-full bg-[var(--color-copper)] hover:bg-[var(--color-copper-deep)] disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 font-display-bold uppercase tracking-tight transition-colors inline-flex items-center justify-center gap-2 rounded-none"
          >
            {submitting ? "Sending..." : "Get my free estimate"}{" "}
            {!submitting && <ArrowRight className="w-4 h-4" />}
          </button>

          <p className="mt-3 text-[11px] text-white/55 leading-relaxed">
            We'll text you within 30 minutes during business hours. No spam, no shared lists.
          </p>
        </form>
      )}

      {step === 2 && (
        <div className="max-w-xl mx-auto text-center">
          <div className="w-12 h-12 rounded-none bg-[var(--color-copper)] text-white inline-flex items-center justify-center mx-auto mb-4">
            <Check className="w-6 h-6" />
          </div>
          <h3 className="font-display text-white text-2xl sm:text-3xl mb-2">
            Got it, {firstName || "neighbor"}.
          </h3>
          <p className="text-white/75 text-[14px] leading-relaxed mb-5">
            We'll text you at <span className="text-white font-semibold">{phone}</span>{" "}
            within 30 minutes. If you'd rather talk now, call us — we answer.
          </p>
          <a
            href={SITE.phone.tel}
            className="haptic inline-flex items-center gap-2 bg-[var(--color-copper)] hover:bg-[var(--color-copper-deep)] text-white px-6 py-3 font-display-bold uppercase tracking-tight transition-colors rounded-none"
          >
            <Phone className="w-4 h-4" /> {SITE.phone.display}
          </a>
        </div>
      )}
    </div>
  );
}
