import { useRef } from "react";
import { MATERIALS_DATA } from "../types";
import ScrollReveal from "./ScrollReveal";
import { ChevronLeft, ChevronRight, Sparkles, MoveRight } from "lucide-react";
import { motion } from "motion/react";

export default function MaterialPalette() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      const targetScroll =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="materials" className="py-28 md:py-36 bg-cream border-t border-sand/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24">
          <div className="max-w-xl">
            <ScrollReveal delay={0.1}>
              <span className="font-sans text-[10px] md:text-xs tracking-[0.25em] uppercase text-sage font-semibold mb-4 block">
                The Sensory Palette
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal tracking-tight leading-[1.05]">
                The Material Palette
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.3} className="mt-4">
              <p className="font-sans font-light text-sm md:text-base text-charcoal/70 leading-relaxed">
                Our retreats are defined by physical sensory honesty. Every room is constructed from raw, living elements designed to develop a rich history over time.
              </p>
            </ScrollReveal>
          </div>

          {/* Minimalist Controls */}
          <ScrollReveal delay={0.4} className="flex space-x-3 mt-8 md:mt-0">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-sand/60 flex items-center justify-center hover:bg-sand/30 text-charcoal cursor-pointer transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-sand/60 flex items-center justify-center hover:bg-sand/30 text-charcoal cursor-pointer transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </ScrollReveal>
        </div>

        {/* Horizontal Slider Track */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-8 -mx-6 px-6 lg:px-0"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {MATERIALS_DATA.map((material, idx) => (
              <div
                key={material.id}
                className="snap-start shrink-0 w-[290px] sm:w-[350px] md:w-[400px] group cursor-grab"
              >
                <ScrollReveal delay={idx * 0.1} yOffset={40}>
                  {/* Card Container */}
                  <div className="relative overflow-hidden rounded-[12px] aspect-[4/5] bg-sand/20 border border-sand/30 shadow-xs mb-6">
                    {/* Background Image */}
                    <img
                      src={material.image}
                      alt={material.name}
                      className="w-full h-full object-cover rounded-[12px] transition-transform duration-[2s] ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-charcoal/10" />

                    {/* Content on Image: Card Name & Category */}
                    <div className="absolute inset-x-6 bottom-6 flex flex-col justify-end text-cream transition-all duration-500 group-hover:translate-y-[-10px]">
                      <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-cream/70 font-semibold mb-2">
                        {material.category}
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl tracking-tight leading-tight mb-2">
                        {material.name}
                      </h3>
                      <p className="font-sans font-light text-xs text-cream/80 line-clamp-2 md:line-clamp-3 leading-relaxed opacity-90">
                        {material.description}
                      </p>
                    </div>

                    {/* Immersive Hover Overlay: Dark Forest Plaster Accent Sheet */}
                    <div className="absolute inset-0 bg-forest/95 backdrop-blur-xs p-8 flex flex-col justify-between opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 rounded-[12px]">
                      <div className="space-y-4">
                        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-cream/50 font-bold block">
                          SPECIFICATION DETAIL
                        </span>
                        <h4 className="font-serif text-3xl text-cream font-medium">
                          {material.name}
                        </h4>
                        <div className="w-8 h-[1px] bg-sage" />
                        <p className="font-sans font-light text-xs md:text-sm text-cream/90 leading-relaxed">
                          {material.description}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="text-[10px] font-mono tracking-widest text-cream/50 uppercase">
                          SENSORY CHARACTER:
                        </div>
                        <div className="flex items-start space-x-2 bg-cream/10 p-3 rounded-[6px] border border-cream/10">
                          <Sparkles size={14} className="text-sage mt-0.5 shrink-0" />
                          <p className="font-serif text-xs md:text-sm text-cream italic">
                            {material.vibe}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>

          {/* Swipe indicator for mobile */}
          <div className="flex lg:hidden items-center justify-center space-x-2 mt-4 text-charcoal/40 font-sans text-[10px] tracking-widest uppercase">
            <span>Swipe to discover</span>
            <MoveRight size={12} className="animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
