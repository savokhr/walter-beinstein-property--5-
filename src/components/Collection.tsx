import { useState, useMemo } from "react";
import { PROPERTIES_DATA, Property } from "../types";
import ScrollReveal from "./ScrollReveal";
import { SlidersHorizontal, MapPin, Sparkles, X, Calendar, User, Eye, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CollectionProps {
  onSelectPropertyForInquiry: (propertyTitle: string) => void;
}

export default function Collection({ onSelectPropertyForInquiry }: CollectionProps) {
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Extract unique countries/locations for filtering
  const locations = useMemo(() => {
    const list = PROPERTIES_DATA.map(p => {
      // Get country (last part of location string)
      const parts = p.location.split(", ");
      return parts[parts.length - 1];
    });
    return ["All", ...Array.from(new Set(list))];
  }, []);

  // Filter properties dynamically
  const filteredProperties = useMemo(() => {
    return PROPERTIES_DATA.filter((p) => {
      const parts = p.location.split(", ");
      const country = parts[parts.length - 1];
      const matchLocation = selectedLocation === "All" || country === selectedLocation;
      const matchPrice = p.pricePerNight <= maxPrice;
      return matchLocation && matchPrice;
    });
  }, [selectedLocation, maxPrice]);

  const handleInquiryRedirect = (propertyTitle: string) => {
    setSelectedProperty(null); // Close modal
    onSelectPropertyForInquiry(propertyTitle);
  };

  return (
    <section id="collection" className="py-28 md:py-36 px-6 md:px-12 bg-[#F2F0E9] border-t border-sand/40">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24">
          <div className="max-w-xl">
            <ScrollReveal delay={0.1}>
              <span className="font-sans text-[10px] md:text-xs tracking-[0.25em] uppercase text-sage font-semibold mb-4 block">
                The Curated Portfolio
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal tracking-tight leading-[1.05]">
                The Collection
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.3} className="mt-4">
              <p className="font-sans font-light text-sm md:text-base text-charcoal/70 leading-relaxed">
                Asymmetrical structures, natural materials, and deliberate isolation. Filter by location and budget to find your sanctuary.
              </p>
            </ScrollReveal>
          </div>
          
          <ScrollReveal delay={0.4} className="mt-8 md:mt-0">
            <div className="text-right font-serif text-xs md:text-sm text-sage italic">
              Showing {filteredProperties.length} of {PROPERTIES_DATA.length} spaces
            </div>
          </ScrollReveal>
        </div>

        {/* Dynamic Filter Controls */}
        <ScrollReveal delay={0.2}>
          <div className="bg-sand/20 border border-sand/50 rounded-[12px] p-6 md:p-8 mb-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Location Filters */}
            <div className="space-y-3">
              <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-charcoal/50 block font-medium">
                Filter by Location
              </span>
              <div className="flex flex-wrap gap-2">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setSelectedLocation(loc)}
                    className={`font-sans text-xs tracking-wider px-4 py-2 rounded-[6px] transition-all duration-300 cursor-pointer ${
                      selectedLocation === loc
                        ? "bg-forest text-cream font-medium"
                        : "bg-cream/40 text-charcoal/70 hover:bg-cream/80 border border-sand/20"
                    }`}
                  >
                    {loc === "All" ? "All Locations" : loc}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="space-y-3 min-w-[280px] lg:min-w-[340px]">
              <div className="flex justify-between items-center">
                <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-charcoal/50 block font-medium">
                  Max Nightly Rate
                </span>
                <span className="font-sans text-xs font-semibold text-forest">
                  €{maxPrice} / night
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="1000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-forest h-1 bg-sand/60 rounded-lg cursor-pointer transition-colors"
                aria-label="Filter properties by maximum price"
              />
              <div className="flex justify-between text-[10px] text-charcoal/40 font-mono">
                <span>€500</span>
                <span>€1000</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Asymmetrical Masonry Property Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-y-24 items-start">
            {filteredProperties.map((property, idx) => {
              // Custom desktop vertical offsets for a tactile, editorial magazine layout
              // We alternate margins to create a beautiful asymmetrical aesthetic
              let gridClass = "col-span-1";
              let animationDelay = (idx % 3) * 0.15;
              
              if (idx === 1) {
                // Second card is taller or offset down
                gridClass = "col-span-1 md:translate-y-12 lg:translate-y-16";
              } else if (idx === 3) {
                // Fourth card offset
                gridClass = "col-span-1 md:translate-y-6 lg:-translate-y-8";
              } else if (idx === 4) {
                gridClass = "col-span-1 lg:translate-y-12";
              }

              return (
                <div key={property.id} className={`${gridClass} flex flex-col group`}>
                  <ScrollReveal delay={animationDelay} yOffset={50}>
                    {/* Image Container with Ken Burns Zoom & Rounded Corners */}
                    <div className="relative overflow-hidden rounded-[12px] shadow-sm bg-sand/30 aspect-[3/4] mb-6">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover rounded-[12px] transition-transform duration-[3s] ease-out group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        id={`property-img-${property.id}`}
                      />
                      
                      {/* Quiet Floating Price Tag */}
                      <div className="absolute top-4 left-4 bg-cream/90 backdrop-blur-sm px-3 py-1.5 rounded-[4px] border border-sand/30 shadow-xs">
                        <span className="font-sans text-[10px] tracking-widest text-charcoal uppercase">
                          From {property.currency}{property.pricePerNight} / night
                        </span>
                      </div>

                      {/* Floating Accent for Vibe */}
                      <div className="absolute bottom-4 left-4 bg-forest/85 backdrop-blur-sm px-3 py-1.5 rounded-[4px]">
                        <span className="font-sans text-[9px] tracking-[0.2em] text-cream uppercase font-medium">
                          {property.vibe}
                        </span>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-1 text-sage text-[10px] tracking-widest uppercase font-semibold">
                        <MapPin size={10} className="text-sage" />
                        <span>{property.location}</span>
                      </div>
                      
                      <h3 className="font-serif text-2xl md:text-3xl text-charcoal group-hover:text-forest transition-colors duration-300">
                        {property.title}
                      </h3>
                      
                      <p className="font-sans font-light text-xs md:text-sm text-charcoal/70 leading-relaxed line-clamp-2">
                        {property.tagline}
                      </p>

                      <div className="pt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-charcoal/40 font-mono text-[10px]">
                          <span>{property.bedrooms} Bed</span>
                          <span>&bull;</span>
                          <span>{property.bathrooms} Bath</span>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedProperty(property)}
                          className="flex items-center space-x-1.5 font-sans text-[10px] tracking-[0.18em] uppercase text-forest font-semibold cursor-pointer group/btn"
                          id={`property-btn-${property.id}`}
                        >
                          <span>View Volume</span>
                          <ArrowRight size={12} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </motion.button>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        ) : (
          <ScrollReveal delay={0.1}>
            <div className="text-center py-20 bg-sand/10 border border-dashed border-sand/40 rounded-[12px] p-8 max-w-lg mx-auto">
              <SlidersHorizontal className="mx-auto text-sage/60 mb-4" size={24} />
              <h3 className="font-serif text-2xl text-charcoal mb-2">No Sanctuaries Match Your Criteria</h3>
              <p className="font-sans text-xs text-charcoal/60 leading-relaxed mb-6">
                Consider adjusting your price slider or expanding your location parameters to find a quiet luxury residence.
              </p>
              <button
                onClick={() => {
                  setSelectedLocation("All");
                  setMaxPrice(1000);
                }}
                className="bg-forest text-cream font-sans text-xs tracking-widest uppercase px-6 py-3 rounded-[4px] cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          </ScrollReveal>
        )}

      </div>

      {/* Detailed Slide-over Modal / Modal Details */}
      <AnimatePresence>
        {selectedProperty && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/40 backdrop-blur-sm flex justify-end">
            {/* Backdrop click closer */}
            <div className="absolute inset-0" onClick={() => setSelectedProperty(null)} />

            {/* Slide over sheet */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="relative w-full max-w-2xl bg-cream h-full shadow-2xl p-6 md:p-12 overflow-y-auto flex flex-col justify-between z-10 border-l border-sand/30"
              id="property-modal-panel"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-sand/30 text-charcoal cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="space-y-8">
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[12px] bg-sand/30">
                  <img
                    src={selectedProperty.image}
                    alt={selectedProperty.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent pointer-events-none" />
                </div>

                {/* Info Header */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-1.5 text-sage text-xs tracking-widest uppercase font-semibold">
                    <MapPin size={12} className="text-sage" />
                    <span>{selectedProperty.location}</span>
                    <span className="text-sand/60">&bull;</span>
                    <span className="text-forest/80 font-medium">{selectedProperty.vibe}</span>
                  </div>
                  
                  <h3 className="font-serif text-3xl md:text-5xl text-charcoal">
                    {selectedProperty.title}
                  </h3>
                  
                  <p className="font-serif text-lg text-forest italic font-light">
                    &ldquo;{selectedProperty.tagline}&rdquo;
                  </p>
                </div>

                {/* Specifications Pills */}
                <div className="grid grid-cols-3 gap-4 py-4 border-y border-sand/40">
                  <div className="text-center">
                    <span className="block font-sans text-[10px] tracking-wider text-charcoal/40 uppercase">Bedrooms</span>
                    <span className="font-serif text-xl md:text-2xl text-charcoal font-medium">{selectedProperty.bedrooms}</span>
                  </div>
                  <div className="text-center border-x border-sand/30">
                    <span className="block font-sans text-[10px] tracking-wider text-charcoal/40 uppercase">Bathrooms</span>
                    <span className="font-serif text-xl md:text-2xl text-charcoal font-medium">{selectedProperty.bathrooms}</span>
                  </div>
                  <div className="text-center">
                    <span className="block font-sans text-[10px] tracking-wider text-charcoal/40 uppercase">Max Occupancy</span>
                    <span className="font-serif text-xl md:text-2xl text-charcoal font-medium">{selectedProperty.maxGuests} Guests</span>
                  </div>
                </div>

                {/* Long Description */}
                <div className="space-y-4">
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-charcoal/50 font-semibold block">
                    The Volume &amp; Narrative
                  </span>
                  <p className="font-sans font-light text-sm md:text-base text-charcoal/80 leading-relaxed">
                    {selectedProperty.description}
                  </p>
                </div>

                {/* Key Material Features */}
                <div className="space-y-4">
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-charcoal/50 font-semibold block">
                    Bespoke Details
                  </span>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProperty.features.map((feature, i) => (
                      <li key={i} className="flex items-center space-x-2 text-xs md:text-sm text-charcoal/80 font-sans font-light">
                        <Sparkles size={12} className="text-sage" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Booking CTA Footer */}
              <div className="mt-12 pt-6 border-t border-sand/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <span className="block font-sans text-[10px] tracking-wider text-charcoal/40 uppercase">Nightly Rate</span>
                  <span className="font-serif text-2xl md:text-3xl text-charcoal font-semibold">
                    {selectedProperty.currency}{selectedProperty.pricePerNight}
                    <span className="font-sans text-xs font-normal text-charcoal/60"> / night</span>
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#1e2418" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleInquiryRedirect(selectedProperty.title)}
                  className="bg-forest text-cream font-sans text-xs tracking-widest uppercase px-8 py-4 rounded-[4px] cursor-pointer text-center"
                >
                  Request Residence
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
