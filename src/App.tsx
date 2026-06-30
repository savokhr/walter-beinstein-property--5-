import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ethos from "./components/Ethos";
import Collection from "./components/Collection";
import MaterialPalette from "./components/MaterialPalette";
import Journal from "./components/Journal";
import InquiryForm from "./components/InquiryForm";
import Footer from "./components/Footer";

export default function App() {
  const [selectedPropertyTitle, setSelectedPropertyTitle] = useState<string>("");

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectPropertyForInquiry = (propertyTitle: string) => {
    setSelectedPropertyTitle(propertyTitle);
    // Smooth scroll down to the inquiry section
    setTimeout(() => {
      handleScrollToSection("inquiry");
    }, 100);
  };

  const handleResetSelectedProperty = () => {
    setSelectedPropertyTitle("");
  };

  return (
    <div className="relative min-h-screen bg-cream selection:bg-forest selection:text-cream">
      {/* Editorial tactile paper grain texture overlay */}
      <div className="grain-overlay pointer-events-none" />

      {/* Sticky, semi-transparent navigation header */}
      <Navbar onScrollToSection={handleScrollToSection} />

      {/* Immersive cinematic Hero Section */}
      <Hero onScrollToCollection={() => handleScrollToSection("collection")} />

      {/* Brand Ethos Column Section */}
      <Ethos onLearnMore={() => handleScrollToSection("materials")} />

      {/* Asymmetrical masonry list grid & interactive slide-over filters */}
      <Collection onSelectPropertyForInquiry={handleSelectPropertyForInquiry} />

      {/* Interactive materials slider showcasing Oak, Brass, Linen, Sandstone */}
      <MaterialPalette />

      {/* 3-column Preview Essays Journal section */}
      <Journal />

      {/* Wide, minimalist booking inquiry sheet */}
      <InquiryForm
        selectedPropertyTitle={selectedPropertyTitle}
        onResetSelectedProperty={handleResetSelectedProperty}
      />

      {/* Minimalist footer with news subscription & links */}
      <Footer onScrollToSection={handleScrollToSection} />
    </div>
  );
}

