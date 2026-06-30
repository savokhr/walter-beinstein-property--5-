import ScrollReveal from "./ScrollReveal";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

interface EthosProps {
  onLearnMore: () => void;
}

export default function Ethos({ onLearnMore }: EthosProps) {
  return (
    <section id="philosophy" className="py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto bg-cream">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
        {/* Column A: Vignette Image */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <ScrollReveal delay={0.2} yOffset={40}>
            <div className="relative group overflow-hidden rounded-[12px] shadow-sm bg-sand/30 aspect-[3/4]">
              {/* Image with hover Ken Burns zoom */}
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85"
                alt="Tactile warm minimalist interior detail"
                className="w-full h-full object-cover rounded-[12px] transition-transform duration-[2.5s] ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
                id="ethos-vignette-image"
              />
              {/* Subtle ambient light gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/10 via-transparent to-transparent pointer-events-none" />
            </div>
          </ScrollReveal>
        </div>

        {/* Column B: Philosophy Description */}
        <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center">
          <ScrollReveal delay={0.1}>
            <span className="font-sans text-[10px] md:text-xs tracking-[0.25em] uppercase text-sage font-semibold mb-4 block">
              our core philosophy
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal tracking-tight leading-[1.05] mb-8">
              Texture over <br />
              <span className="italic font-light text-sage">Trend</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="space-y-6 text-charcoal/85 font-sans font-light text-sm md:text-base leading-relaxed max-w-xl">
              <p>
                We believe that a space should speak in whispers, not shouts. Our homes are hand-selected not for their ostentation, but for their physical honesty&mdash;how raw cedar planks meet local limestone, how unlacquered brass fixtures register the touch of our guests, and how loomed linen diffuses the rising sun.
              </p>
              <p>
                In a world obsessed with the temporary, we curate environments rooted in permanence. Each property in our collection is an invitation to slow down, shed the noise, and align with the slow, deliberate rhythms of natural materials and architectural integrity.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4} className="mt-8">
            <motion.button
              onClick={onLearnMore}
              whileHover={{ x: 5 }}
              className="group flex items-center space-x-2 text-forest font-sans text-xs md:text-sm font-medium tracking-widest uppercase cursor-pointer"
              id="ethos-cta-btn"
            >
              <span>Explore Materials Palette</span>
              <ArrowUpRight size={16} className="text-forest transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
