import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MobileTabBar from "./ios/MobileTabBar";
import DesktopCallRail from "./DesktopCallRail";
import EstimateModal from "./EstimateModal";
import SchemaJsonLd from "./SchemaJsonLd";
import { useGoogleFonts } from "../hooks/useGoogleFonts";
import { useRevealObserver } from "../hooks/useRevealObserver";

/**
 * Shared page chrome — wraps every route with Header, Footer,
 * floating call-rail, mobile tab bar, and the estimate modal.
 */
export default function PageLayout({ children, schemas = [] }) {
  useGoogleFonts();
  useRevealObserver();
  const { pathname } = useLocation();
  const [estimateOpen, setEstimateOpen] = useState(false);
  const openEstimate = () => setEstimateOpen(true);

  /* scroll to top on route change */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="bg-[var(--color-bone)] text-[var(--color-slate)] min-h-screen overflow-x-hidden">
      <a href="#main" className="skip-link">Skip to main content</a>
      {schemas.length > 0 && <SchemaJsonLd data={schemas} id={pathname} />}
      <Header onEstimate={openEstimate} />

      <main id="main">{children}</main>

      <Footer />
      {/* Spacer that reserves the height of the fixed mobile tab bar so the
          footer's last row is visible above it. md+ collapses to zero. */}
      <div
        aria-hidden
        className="md:hidden"
        style={{ height: "var(--tabbar-offset)" }}
      />
      <MobileTabBar onEstimate={openEstimate} />
      <DesktopCallRail onEstimate={openEstimate} />
      <EstimateModal open={estimateOpen} onClose={() => setEstimateOpen(false)} />
    </div>
  );
}
