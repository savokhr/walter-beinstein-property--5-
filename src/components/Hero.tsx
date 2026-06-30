import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  onScrollToCollection: () => void;
}

export default function Hero({ onScrollToCollection }: HeroProps) {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-charcoal">
      {/* Hero Background Image with Subtle Ken Burns Zoom-In on Mount */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.65 }}
        transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1] }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90"
          alt="Luxury architectural sanctuary"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Warm Golden/Sandy Vignette Mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2d2217]/40 via-charcoal/30 to-charcoal/20 mix-blend-multiply" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="font-sans text-[10px] md:text-xs tracking-[0.25em] uppercase text-cream/80 mb-6 font-medium"
        >
          walterbeinsteinproperty &mdash; the collection
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-cream tracking-tight max-w-5xl leading-[0.95]"
        >
          Spaces for the <br />
          <span className="italic font-light text-cream/90 font-serif">Mindful</span> Traveler
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="font-sans text-xs sm:text-sm md:text-base tracking-widest uppercase text-cream/70 max-w-2xl mt-8 leading-relaxed font-light px-4"
        >
          A highly curated portfolio of architectural sanctuaries designed for reflection, texture, and slow living.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onScrollToCollection}
            className="group flex flex-col items-center justify-center space-y-3 cursor-pointer"
            id="hero-explore-btn"
          >
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-cream/60 group-hover:text-cream transition-colors">
              Explore the sanctuaries
            </span>
            <div className="w-[40px] h-[40px] rounded-full border border-cream/20 flex items-center justify-center group-hover:border-cream/50 transition-colors bg-cream/5 backdrop-blur-sm">
              <ArrowDown size={14} className="text-cream/70 group-hover:text-cream group-hover:translate-y-0.5 transition-all duration-300" />
            </div>
          </motion.button>
        </motion.div>
      </div>

      {/* Soft Bottom Shadow Transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F2F0E9] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
