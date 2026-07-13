import { useState } from "react";
import { ArrowRight, MapPin, Check, Phone } from "lucide-react";
import { SITE } from "../data/site";

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

  return (
    <div className="material-light w-full lg:max-w-md rounded-[var(--radius-tile)] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] border border-white/10 overflow-hidden">
      {step === 0 && (
        <form onSubmit={handleZipSubmit} className="p-5 sm:p-6 lg:p-7">
          <div className="text-[var(--color-copper)] text-[10px] tracking-[0.3em] uppercase font-semibold mb-2">
            Free Estimate · No Pressure
          </div>
          <h2 className="font-display text-[var(--color-royal)] text-[22px] sm:text-2xl lg:text-[28px] font-light leading-[1.15] mb-2">
            Are we in your area?
          </h2>
          <p className="text-[var(--color-slate)]/70 text-[13.5px] leading-relaxed mb-4 sm:mb-5">
            We serve King, Pierce, Snohomish, Thurston &amp; Mason counties across the Puget Sound. Enter your ZIP to confirm.
          </p>
          <label className="block">
            <span className="sr-only">Property zip code</span>
            <div className="flex bg-[var(--color-paper)] border-2 border-[var(--color-line-strong)] focus-within:border-[var(--color-copper)] rounded-[var(--radius-input)] transition-colors overflow-hidden">
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
                className="flex-1 min-w-0 py-3.5 bg-transparent text-[var(--color-royal)] placeholder:text-[var(--color-royal)]/45 focus:outline-none text-[16px]"
                aria-label="Property zip code"
                required
              />
              <button
                type="submit"
                className="haptic bg-[var(--color-copper)] hover:bg-[var(--color-copper-deep)] text-white px-5 transition-colors flex items-center gap-1.5 font-semibold text-sm"
              >
                Check <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </label>
          {served === false && (
            <div className="mt-3 text-[13px] text-[var(--color-slate)]/80">
              We don't yet serve that zip. Call{" "}
              <a href={SITE.phone.tel} className="text-[var(--color-copper)] font-semibold underline">
                {SITE.phone.display}
              </a>{" "}
              and we'll point you to a good local crew.
            </div>
          )}
          {/* Reassurance row — single line on small mobile via flex-wrap, no
              awkward 2-column squeeze. Each item shrinks gracefully. */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] text-[var(--color-slate)]/65">
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
        </form>
      )}

      {step === 1 && (
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 lg:p-7">
          <div className="flex items-center gap-2 text-[var(--color-copper)] text-xs font-semibold mb-2">
            <Check className="w-4 h-4" /> Yes — we serve {zip}.
          </div>
          <h2 className="font-display text-[var(--color-royal)] text-[22px] sm:text-2xl font-light leading-tight mb-5">
            Two more details and we'll text you back.
          </h2>

          <div className="mb-4">
            <label className="block text-[10px] tracking-[0.2em] uppercase font-semibold text-[var(--color-royal)] mb-2">
              What do you need?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {SERVICE_OPTIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setService(s.id)}
                  className={`haptic px-3 py-2.5 text-[14px] rounded-[var(--radius-input)] border transition-all ${
                    service === s.id
                      ? "bg-[var(--color-royal)] text-white border-[var(--color-royal)]"
                      : "bg-[var(--color-paper)] border-[var(--color-line-strong)] text-[var(--color-royal)] hover:border-[var(--color-royal)]"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Identity row — first + last share one row since they're
              one conceptual entity. */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="bg-[var(--color-paper)] border border-[var(--color-line-strong)] focus:border-[var(--color-copper)] focus:outline-none px-3 py-3 text-[15px] text-[var(--color-slate)] rounded-[var(--radius-input)]"
              aria-label="First name"
            />
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className="bg-[var(--color-paper)] border border-[var(--color-line-strong)] focus:border-[var(--color-copper)] focus:outline-none px-3 py-3 text-[15px] text-[var(--color-slate)] rounded-[var(--radius-input)]"
              aria-label="Last name"
            />
          </div>

          {/* Phone — primary contact channel, full width. */}
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            className="block w-full bg-[var(--color-paper)] border border-[var(--color-line-strong)] focus:border-[var(--color-copper)] focus:outline-none px-3 py-3 text-[15px] text-[var(--color-slate)] rounded-[var(--radius-input)] mb-3"
            aria-label="Phone number"
          />

          {/* Email — required so the crew has a written-quote channel and a
              backup if the phone is missed. Previous version of this form
              omitted email entirely and leads were arriving without one. */}
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="block w-full bg-[var(--color-paper)] border border-[var(--color-line-strong)] focus:border-[var(--color-copper)] focus:outline-none px-3 py-3 text-[15px] text-[var(--color-slate)] rounded-[var(--radius-input)] mb-3"
            aria-label="Email"
          />

          {/* Property address. ZIP was already collected in step 0; we
              still ask for street + city so the crew can be routed. */}
          <input
            id="address"
            name="address"
            type="text"
            autoComplete="street-address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Property address"
            className="block w-full bg-[var(--color-paper)] border border-[var(--color-line-strong)] focus:border-[var(--color-copper)] focus:outline-none px-3 py-3 text-[15px] text-[var(--color-slate)] rounded-[var(--radius-input)] mb-3"
            aria-label="Property address"
          />

          <div className="grid grid-cols-[1fr_auto] gap-3 mb-5">
            <input
              id="city"
              name="city"
              type="text"
              autoComplete="address-level2"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="bg-[var(--color-paper)] border border-[var(--color-line-strong)] focus:border-[var(--color-copper)] focus:outline-none px-3 py-3 text-[15px] text-[var(--color-slate)] rounded-[var(--radius-input)]"
              aria-label="City"
            />
            {/* ZIP echoed back as a confirmation chip — already validated in
                step 0, so this is a read-only reminder of what they entered. */}
            <div className="flex items-center justify-center px-4 bg-[var(--color-paper)]/60 border border-[var(--color-line)] rounded-[var(--radius-input)] text-[var(--color-slate)]/75 text-[14px] font-mono tracking-wider">
              {zip}
            </div>
          </div>

          <button
            type="submit"
            disabled={!service || submitting}
            className="haptic w-full bg-[var(--color-copper)] hover:bg-[var(--color-copper-deep)] disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 font-semibold transition-colors inline-flex items-center justify-center gap-2 rounded-[var(--radius-input)]"
          >
            {submitting ? "Sending..." : "Get my free estimate"}{" "}
            {!submitting && <ArrowRight className="w-4 h-4" />}
          </button>

          <p className="mt-3 text-[11px] text-[var(--color-slate)]/55 leading-relaxed">
            We'll text you within 30 minutes during business hours. No spam, no shared lists.
          </p>
        </form>
      )}

      {step === 2 && (
        <div className="p-5 sm:p-6 lg:p-7 text-center">
          <div className="w-12 h-12 rounded-full bg-[var(--color-copper)] text-white inline-flex items-center justify-center mx-auto mb-4">
            <Check className="w-6 h-6" />
          </div>
          <h3 className="font-display text-[var(--color-royal)] text-2xl font-light mb-2">
            Got it, {firstName || "neighbor"}.
          </h3>
          <p className="text-[var(--color-slate)]/75 text-[14px] leading-relaxed mb-5">
            We'll text you at <span className="text-[var(--color-royal)] font-semibold">{phone}</span>{" "}
            within 30 minutes. If you'd rather talk now, call us — we answer.
          </p>
          <a
            href={SITE.phone.tel}
            className="haptic inline-flex items-center gap-2 bg-[var(--color-royal)] hover:bg-[var(--color-royal-deep)] text-white px-5 py-2.5 font-semibold transition-colors rounded-[var(--radius-input)]"
          >
            <Phone className="w-4 h-4" /> {SITE.phone.display}
          </a>
        </div>
      )}
    </div>
  );
}
