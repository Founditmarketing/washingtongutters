import HeroLeadForm from "./HeroLeadForm";

/**
 * Lead-capture section — sits directly under the (now centered) hero on every
 * breakpoint and holds the ZIP "are we in your area?" form. The hero itself is
 * pure brand + CTAs, so this is where the form lives for both mobile and
 * desktop, centered with breathing room.
 */
export default function LeadCaptureSection() {
  return (
    <section
      className="relative z-10 bg-[var(--color-royal-deep)] overflow-hidden"
      aria-label="Free estimate request"
    >
      <div className="absolute inset-0 grain opacity-[0.06] pointer-events-none" aria-hidden />
      <div className="relative max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)] py-10 lg:py-14">
        <HeroLeadForm />
      </div>
    </section>
  );
}
