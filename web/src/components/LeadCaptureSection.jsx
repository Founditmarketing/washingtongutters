import HeroLeadForm from "./HeroLeadForm";

/**
 * Mobile-only lead capture section. On the home page this sits directly under
 * the hero so the ZIP-code form has full breathing room — the previous layout
 * crammed it into the hero where the tab bar covered the CTA button.
 *
 * Desktop is unaffected: the form renders inside the hero's right column.
 */
export default function LeadCaptureSection() {
  return (
    <section
      className="lg:hidden bg-[var(--color-bone)] relative z-10 px-[var(--space-page-x)] py-12"
      aria-label="Free estimate request"
    >
      <div className="mx-auto max-w-[640px]">
        <HeroLeadForm />
      </div>
    </section>
  );
}
