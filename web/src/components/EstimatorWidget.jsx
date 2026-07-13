import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function FooterContactForm() {
  const [values, setValues] = useState({ name: "", phone: "", email: "", address: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (k) => (e) => {
    setValues((prev) => ({ ...prev, [k]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/jobber/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          phone: values.phone,
          email: values.email,
          address: values.address,
          message: "Contact form request from footer.",
          source: "Website — footer contact form",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        console.warn("[footer-contact] jobber submission failed:", data.error || res.status);
      }
    } catch (err) {
      console.warn("network error:", err);
    } finally {
      setSubmitting(false);
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-7 lg:p-10 text-center h-full flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-14 h-14 rounded-full bg-[var(--color-copper)] text-white flex items-center justify-center mx-auto mb-5">
          <Check className="w-6 h-6" />
        </div>
        <h3 className="font-display text-3xl text-white font-light mb-3">
          Got it, {values.name.split(" ")[0] || "neighbor"}.
        </h3>
        <p className="text-white/70 text-[15px] leading-relaxed">
          We'll contact you soon at <span className="text-white font-semibold">{values.phone}</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-7 lg:p-10">
      <div className="text-[var(--color-copper)] text-xs tracking-[0.25em] uppercase font-semibold mb-6">
        Request Contact
      </div>
      <form onSubmit={submit} className="space-y-4">
        <label className="block">
          <span className="block text-[11px] tracking-[0.18em] uppercase font-semibold text-white/70 mb-1.5">
            Full Name
          </span>
          <input
            type="text"
            required
            value={values.name}
            onChange={set("name")}
            className="w-full bg-black/20 border border-white/10 focus:border-[var(--color-copper)] rounded-[var(--radius-input)] px-4 py-3 text-white focus:outline-none transition-colors"
          />
        </label>
        <label className="block">
          <span className="block text-[11px] tracking-[0.18em] uppercase font-semibold text-white/70 mb-1.5">
            Phone Number
          </span>
          <input
            type="tel"
            required
            value={values.phone}
            onChange={set("phone")}
            className="w-full bg-black/20 border border-white/10 focus:border-[var(--color-copper)] rounded-[var(--radius-input)] px-4 py-3 text-white focus:outline-none transition-colors"
          />
        </label>
        <label className="block">
          <span className="block text-[11px] tracking-[0.18em] uppercase font-semibold text-white/70 mb-1.5">
            Email
          </span>
          <input
            type="email"
            required
            value={values.email}
            onChange={set("email")}
            className="w-full bg-black/20 border border-white/10 focus:border-[var(--color-copper)] rounded-[var(--radius-input)] px-4 py-3 text-white focus:outline-none transition-colors"
          />
        </label>
        <label className="block">
          <span className="block text-[11px] tracking-[0.18em] uppercase font-semibold text-white/70 mb-1.5">
            Property Address
          </span>
          <input
            type="text"
            required
            value={values.address}
            onChange={set("address")}
            placeholder="123 Main St, Tacoma, WA"
            className="w-full bg-black/20 border border-white/10 focus:border-[var(--color-copper)] rounded-[var(--radius-input)] px-4 py-3 text-white placeholder:text-white/30 focus:outline-none transition-colors"
          />
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="haptic w-full bg-[var(--color-copper)] hover:bg-[var(--color-copper-deep)] text-white py-4 rounded-[var(--radius-input)] font-semibold transition-colors mt-4 inline-flex items-center justify-center gap-2"
        >
          {submitting ? "Sending..." : "Request Estimate"}
          {!submitting && <ArrowRight className="w-4 h-4" />}
        </button>
      </form>
    </div>
  );
}
