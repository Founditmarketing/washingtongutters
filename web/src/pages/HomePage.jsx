import { useState } from "react";
import Hero from "../components/Hero";
import LeadCaptureSection from "../components/LeadCaptureSection";
import CityMarquee from "../components/CityMarquee";
import Services from "../components/Services";
import Process from "../components/Process";
import TrustStack from "../components/TrustStack";
import WhyPnw from "../components/WhyPnw";
import Gallery from "../components/Gallery";
import ReviewsMarquee from "../components/ReviewsMarquee";
import EstimatorSection from "../components/EstimatorSection";
import FinalCta from "../components/FinalCta";
import EstimateModal from "../components/EstimateModal";
import SchemaJsonLd from "../components/SchemaJsonLd";
import { localBusinessSchema, reviewSchema, breadcrumbSchema } from "../lib/schema";
import { REVIEWS } from "../data/reviews";

export default function HomePage() {
  const [estimateOpen, setEstimateOpen] = useState(false);
  const openEstimate = () => setEstimateOpen(true);

  const schemas = [
    localBusinessSchema(),
    breadcrumbSchema([{ name: "Home", path: "/" }]),
    ...reviewSchema(REVIEWS),
  ];

  return (
    <>
      <SchemaJsonLd data={schemas} id="home" />
      <Hero onEstimate={openEstimate} />
      <CityMarquee />
      <LeadCaptureSection />
      <Services />
      <Process />
      <TrustStack />
      <WhyPnw />
      <Gallery />
      <ReviewsMarquee />
      <EstimatorSection onEstimate={openEstimate} />
      <FinalCta onEstimate={openEstimate} />
      <EstimateModal open={estimateOpen} onClose={() => setEstimateOpen(false)} />
    </>
  );
}
