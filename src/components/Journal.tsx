import { useState } from "react";
import { JOURNAL_DATA, JournalPost } from "../types";
import ScrollReveal from "./ScrollReveal";
import { Clock, Calendar, ArrowRight, X, Heart, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Journal() {
  const [activePost, setActivePost] = useState<JournalPost | null>(null);

  const getPostContent = (id: string) => {
    switch (id) {
      case "post-1":
        return {
          intro: "In a culture defined by constant ping alerts and sensory overload, the greatest luxury is not gold or marble, but absolute quiet.",
          body: [
            "We approach structural architecture not as the building of objects, but as the framing of silence. A window is not merely an aperture for light; it is a lens that tracks the slow, silent rotation of shadow across a plaster wall. By utilizing high ceilings and bare walls, we give the eye a place to rest.",
            "Our properties omit the clutter of modern hospitality. There are no flashing device panels, no intrusive brand materials, and no noisy machinery. Instead, we allow the slow creak of oak flooring and the rustle of olive leaves in the courtyard to form the acoustic backdrop of your stay.",
            "To inhabit one of our spaces is to participate in a ritual of decompression. We invite you to sit, watch the light shift, and realize that void is not empty—it is full of potential."
          ]
        };
      case "post-2":
        return {
          intro: "Most modern design attempts to freeze time, using plastic-coated paints and lacquered sealants. We believe in the poetry of decay.",
          body: [
            "A living finish is a material that has been left raw, open to the chemical kisses of oxygen, water, and human oil. Unlacquered brass fittings start as bright gold but rapidly deepen into complex, dark bronze tones. Local stone thresholds wear down under the path of bare feet, shaping a micro-topography unique to that home.",
            "When we construct our properties, we work exclusively with craftsmen who understand this material honesty. Our plaster is mixed with marble sand and limestone slaked for years, ensuring that its color is deep within the mineral itself, rather than a surface coat.",
            "Over time, your temporary home gathers the memory of your stay, register by register. It is an honest architecture that accepts and celebrates its own impermanence."
          ]
        };
      case "post-3":
        return {
          intro: "How we begin the day governs how we think. The bath and washing areas are treated as secular shrines to the transition into consciousness.",
          body: [
            "We design bathing spaces around the exact angle of the rising sun. A morning bath should not be a rushed hygienic task, but a slow immersion. We utilize custom-cast deep soaking tubs carved from single blocks of dark basalt or assembled from aromatic hinoki cedarwood.",
            "To step onto cool stone, turn a heavy brass handle, and watch steam rise against textured lime-plaster is a choreographic sequence designed to instill mindfulness.",
            "We select wild organic linen sheets and hand-woven textured Turkish cotton towels to complete this tactile dialogue, ensuring that every touch is comforting and true."
          ]
        };
      default:
        return { intro: "", body: [] };
    }
  };

  return (
    <section id="journal" className="py-28 md:py-36 px-6 md:px-12 bg-cream border-t border-sand/40">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-xl mb-16 md:mb-24">
          <ScrollReveal delay={0.1}>
            <span className="font-sans text-[10px] md:text-xs tracking-[0.25em] uppercase text-sage font-semibold mb-4 block">
              Editorial Essays
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal tracking-tight leading-[1.05]">
              The Journal
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.3} className="mt-4">
            <p className="font-sans font-light text-sm md:text-base text-charcoal/70 leading-relaxed">
              In-depth reflections on slow architecture, tactile craftsmanship, and the restorative philosophy that shapes our boutique collection.
            </p>
          </ScrollReveal>
        </div>

        {/* 3-Column Grid of Posts with Vertical Imagery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {JOURNAL_DATA.map((post, idx) => (
            <article key={post.id} className="flex flex-col group h-full">
              <ScrollReveal delay={idx * 0.15} yOffset={40} className="flex flex-col h-full justify-between">
                <div>
                  {/* Vertical Image with Hover Effect & Rounded Corners */}
                  <div className="relative overflow-hidden rounded-[12px] bg-sand/30 aspect-[2/3] mb-6 shadow-xs">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover rounded-[12px] transition-transform duration-[2s] ease-out group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Floating category */}
                    <div className="absolute bottom-4 left-4 bg-cream/90 backdrop-blur-xs px-3 py-1 rounded-[4px] border border-sand/30">
                      <span className="font-sans text-[9px] tracking-widest text-charcoal uppercase font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center space-x-4 text-charcoal/50 font-mono text-[9px] uppercase tracking-wider mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar size={10} />
                      <span>{post.date}</span>
                    </div>
                    <span>&bull;</span>
                    <div className="flex items-center space-x-1">
                      <Clock size={10} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title and Excerpt */}
                  <h3 className="font-serif text-2xl lg:text-3xl text-charcoal group-hover:text-forest transition-colors duration-300 leading-tight mb-4">
                    <span className="relative inline-block pb-1">
                      {post.title}
                      {/* Underline grow from center animation */}
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-forest scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                    </span>
                  </h3>

                  <p className="font-sans font-light text-xs md:text-sm text-charcoal/70 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Read Button */}
                <div className="pt-6">
                  <motion.button
                    whileHover={{ x: 3 }}
                    onClick={() => setActivePost(post)}
                    className="flex items-center space-x-1 font-sans text-[10px] tracking-widest uppercase text-forest font-semibold cursor-pointer"
                    id={`journal-btn-${post.id}`}
                  >
                    <span>Read Essay</span>
                    <ArrowRight size={12} />
                  </motion.button>
                </div>
              </ScrollReveal>
            </article>
          ))}
        </div>
      </div>

      {/* Essay Detail Overlay Modal */}
      <AnimatePresence>
        {activePost && (() => {
          const content = getPostContent(activePost.id);
          return (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="relative bg-cream w-full max-w-3xl rounded-[12px] shadow-2xl p-6 md:p-12 overflow-y-auto max-h-[90vh] border border-sand/40"
                id="journal-modal-panel"
              >
                {/* Header Action Buttons */}
                <button
                  onClick={() => setActivePost(null)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-sand/30 text-charcoal cursor-pointer transition-colors z-10"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>

                {/* Essay Header Info */}
                <div className="space-y-4 mb-8 pt-4">
                  <span className="font-sans text-[10px] tracking-widest uppercase text-sage font-bold">
                    {activePost.category} &mdash; Essay Volume
                  </span>
                  
                  <h3 className="font-serif text-3xl md:text-5xl text-charcoal leading-tight max-w-2xl">
                    {activePost.title}
                  </h3>

                  <div className="flex items-center space-x-4 text-charcoal/40 font-mono text-[10px] uppercase tracking-widest py-2 border-y border-sand/30">
                    <span>Published: {activePost.date}</span>
                    <span>&bull;</span>
                    <span>{activePost.readTime}</span>
                    <span>&bull;</span>
                    <span>By W. Beinstein</span>
                  </div>
                </div>

                {/* Vertical Hero Feature Image inside essay */}
                <div className="aspect-[16/9] w-full overflow-hidden rounded-[8px] mb-8 bg-sand/30">
                  <img
                    src={activePost.image}
                    alt={activePost.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Article Content */}
                <div className="space-y-6 text-charcoal/90 font-sans font-light text-sm md:text-base leading-relaxed max-w-2xl">
                  {/* Italic intro highlight */}
                  <p className="font-serif text-lg md:text-xl text-forest italic font-light border-l-2 border-sage pl-4 py-1 leading-relaxed">
                    {content.intro}
                  </p>
                  
                  {content.body.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                {/* Footer of modal */}
                <div className="mt-12 pt-6 border-t border-sand/40 flex items-center justify-between text-xs text-charcoal/40">
                  <span>walterbeinsteinproperty &copy; 2026</span>
                  <div className="flex space-x-3">
                    <button className="hover:text-charcoal cursor-pointer" aria-label="Like essay"><Heart size={14} /></button>
                    <button className="hover:text-charcoal cursor-pointer" aria-label="Share essay"><Share2 size={14} /></button>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
