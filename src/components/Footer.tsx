import React, { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { Mail, ArrowRight, Instagram, Facebook, Globe, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    setTimeout(() => {
      setSubscribed(true);
      setEmail("");
      setLoading(false);
    }, 1200);
  };

  return (
    <footer className="bg-charcoal text-cream py-20 px-6 md:px-12 border-t border-sand/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-cream/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-6">
            <ScrollReveal delay={0.1}>
              <h3 className="font-serif text-2xl tracking-wider">walterbeinsteinproperty</h3>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="font-sans font-light text-xs md:text-sm text-cream/60 max-w-sm leading-relaxed">
                Quiet luxury architectural sanctuaries designed for the contemplative traveler. We offer private residencies that foster stillness, connection, and slow living.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3} className="flex space-x-4 pt-2">
              <motion.a
                whileHover={{ y: -2, scale: 1.1 }}
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-cream/10 flex items-center justify-center hover:border-cream/40 text-cream/60 hover:text-cream transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={14} />
              </motion.a>
              <motion.a
                whileHover={{ y: -2, scale: 1.1 }}
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-cream/10 flex items-center justify-center hover:border-cream/40 text-cream/60 hover:text-cream transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={14} />
              </motion.a>
              <motion.a
                whileHover={{ y: -2, scale: 1.1 }}
                href="https://google.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-cream/10 flex items-center justify-center hover:border-cream/40 text-cream/60 hover:text-cream transition-colors"
                aria-label="Visit our main website"
              >
                <Globe size={14} />
              </motion.a>
            </ScrollReveal>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 lg:col-start-6 space-y-6">
            <ScrollReveal delay={0.2}>
              <h4 className="font-sans text-[10px] tracking-[0.2em] uppercase text-cream/40 font-semibold">
                Sitemap &amp; Navigation
              </h4>
            </ScrollReveal>
            <ScrollReveal delay={0.3} className="flex flex-col space-y-3 font-sans text-xs tracking-wider text-cream/75">
              <button
                onClick={() => onScrollToSection("hero")}
                className="text-left hover:text-cream transition-colors cursor-pointer w-fit nav-link-underline"
              >
                Back to Top
              </button>
              <button
                onClick={() => onScrollToSection("collection")}
                className="text-left hover:text-cream transition-colors cursor-pointer w-fit nav-link-underline"
              >
                The Collection
              </button>
              <button
                onClick={() => onScrollToSection("philosophy")}
                className="text-left hover:text-cream transition-colors cursor-pointer w-fit nav-link-underline"
              >
                Philosophy
              </button>
              <button
                onClick={() => onScrollToSection("materials")}
                className="text-left hover:text-cream transition-colors cursor-pointer w-fit nav-link-underline"
              >
                Materials Palette
              </button>
              <button
                onClick={() => onScrollToSection("journal")}
                className="text-left hover:text-cream transition-colors cursor-pointer w-fit nav-link-underline"
              >
                The Journal
              </button>
              <button
                onClick={() => onScrollToSection("inquiry")}
                className="text-left hover:text-cream transition-colors cursor-pointer w-fit nav-link-underline"
              >
                Check Availability
              </button>
            </ScrollReveal>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 space-y-6">
            <ScrollReveal delay={0.2}>
              <h4 className="font-sans text-[10px] tracking-[0.2em] uppercase text-cream/40 font-semibold">
                The Ledger Newsletter
              </h4>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="font-sans font-light text-xs text-cream/60 leading-relaxed mb-4">
                Subscribe to receive private invitations, early announcements of new property volumes, and editorial architectural journals.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <AnimatePresence mode="wait">
                {!subscribed ? (
                  <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
                    <div className="relative flex items-center border-b border-cream/20 focus-within:border-cream/80 transition-colors py-1">
                      <Mail size={14} className="text-cream/40 mr-3 shrink-0" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full bg-transparent outline-none font-sans font-light text-xs text-cream placeholder:text-cream/30 py-1"
                        aria-label="Enter email address for newsletter subscription"
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="p-1 text-cream/60 hover:text-cream transition-colors cursor-pointer"
                        aria-label="Submit newsletter subscription"
                      >
                        <ArrowRight size={16} className={loading ? "animate-pulse" : ""} />
                      </button>
                    </div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 text-sage bg-cream/5 border border-sage/20 p-3 rounded-[6px]"
                  >
                    <CheckCircle2 size={14} />
                    <span className="font-sans text-[11px] tracking-wider uppercase font-medium">
                      Subscribed to the ledger
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </ScrollReveal>
          </div>

        </div>

        {/* Bottom Col */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[10px] font-sans text-cream/40 uppercase tracking-widest">
          <ScrollReveal delay={0.1}>
            <div>
              walterbeinsteinproperty &copy; 2026. All rights reserved.
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2} className="flex space-x-6">
            <a href="#privacy" className="hover:text-cream transition-colors">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#terms" className="hover:text-cream transition-colors">Terms of Sanctuary</a>
            <span>&bull;</span>
            <a href="#accessibility" className="hover:text-cream transition-colors">Accessibility</a>
          </ScrollReveal>
        </div>

      </div>
    </footer>
  );
}
