import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLayout from "./components/PageLayout";
import HomePage from "./pages/HomePage";
import ServicePage from "./pages/ServicePage";
import AboutPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import ReviewsPage from "./pages/ReviewsPage";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";
import LocationsPage from "./pages/LocationsPage";
import LocationPage from "./pages/LocationPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/:slug/*" element={<ServicePage />} />
          <Route path="/about/*" element={<AboutPage />} />
          <Route path="/gallery/*" element={<GalleryPage />} />
          <Route path="/reviews/*" element={<ReviewsPage />} />
          <Route path="/contact/*" element={<ContactPage />} />
          <Route path="/faq/*" element={<FaqPage />} />
          <Route path="/locations/:slug/*" element={<LocationPage />} />
          <Route path="/locations/*" element={<LocationsPage />} />
          <Route path="/blog/:slug/*" element={<BlogPostPage />} />
          <Route path="/blog/*" element={<BlogPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}
