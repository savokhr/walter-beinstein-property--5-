import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Navbar({ onScrollToSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "The Collection", id: "collection" },
    { name: "Philosophy", id: "philosophy" },
    { name: "Materials", id: "materials" },
    { name: "Journal", id: "journal" }
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onScrollToSection(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-cream/85 backdrop-blur-md border-b border-sand/40 py-4 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleLinkClick("hero")}
            className="font-serif text-xl md:text-2xl tracking-tighter font-bold italic text-charcoal cursor-pointer text-left hover:opacity-80 transition-all"
            id="nav-logo"
          >
            walterbeinsteinproperty
          </button>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="nav-link-underline font-sans text-xs tracking-[0.15em] uppercase text-charcoal/80 hover:text-charcoal transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#1e2418" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLinkClick("inquiry")}
              className="bg-forest text-cream font-sans text-[10px] md:text-xs tracking-[0.18em] uppercase px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl"
              id="nav-cta"
            >
              Check Availability
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-charcoal p-1 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-0 top-[60px] bg-cream z-40 flex flex-col justify-between p-8 md:hidden border-t border-sand/40"
          >
            <nav className="flex flex-col space-y-8 mt-12">
              {navLinks.map((link, i) => (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="font-serif text-3xl text-charcoal text-left hover:text-forest transition-colors cursor-pointer"
                >
                  {link.name}
                </motion.button>
              ))}
            </nav>

            <div className="space-y-6 pb-12">
              <div className="w-full h-[1px] bg-sand/50" />
              <button
                onClick={() => handleLinkClick("inquiry")}
                className="w-full bg-forest text-cream font-sans text-xs tracking-widest uppercase py-4 rounded-xl cursor-pointer block text-center shadow-lg"
              >
                Check Availability
              </button>
              <div className="text-center font-sans text-[10px] tracking-wider text-charcoal/40 uppercase">
                walterbeinsteinproperty &copy; 2026
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
