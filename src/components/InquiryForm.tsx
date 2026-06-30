import React, { useState, useEffect } from "react";
import { PROPERTIES_DATA } from "../types";
import ScrollReveal from "./ScrollReveal";
import { Calendar, User, Mail, ShieldCheck, CheckCircle2, ChevronDown, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface InquiryFormProps {
  selectedPropertyTitle: string;
  onResetSelectedProperty: () => void;
}

interface SubmittedInquiry {
  name: string;
  email: string;
  property: string;
  checkIn: string;
  checkOut: string;
  notes: string;
  timestamp: string;
  referenceId: string;
}

export default function InquiryForm({
  selectedPropertyTitle,
  onResetSelectedProperty
}: InquiryFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [property, setProperty] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [notes, setNotes] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<SubmittedInquiry | null>(null);
  const [savedInquiries, setSavedInquiries] = useState<SubmittedInquiry[]>([]);

  // Pre-populate if selected from collection
  useEffect(() => {
    if (selectedPropertyTitle) {
      setProperty(selectedPropertyTitle);
    }
  }, [selectedPropertyTitle]);

  // Load previously saved inquiries from localStorage
  useEffect(() => {
    const raw = localStorage.getItem("walterbeinstein_inquiries");
    if (raw) {
      try {
        setSavedInquiries(JSON.parse(raw));
      } catch (e) {
        console.error("Failed to parse previous inquiries", e);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !property || !checkIn || !checkOut) {
      return;
    }

    setIsSubmitting(true);

    try {
      const referenceId = "WBP-" + Math.floor(100000 + Math.random() * 900000);
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          property,
          checkIn,
          checkOut,
          notes,
          referenceId,
        }),
      });

      if (!response.ok) {
        throw new Error("Server communication failure");
      }

      const data = await response.json();
      const finalRefId = data.referenceId || referenceId;

      const newInquiry: SubmittedInquiry = {
        name,
        email,
        property,
        checkIn,
        checkOut,
        notes,
        timestamp: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        }),
        referenceId: finalRefId
      };

      const updated = [newInquiry, ...savedInquiries];
      localStorage.setItem("walterbeinstein_inquiries", JSON.stringify(updated));
      setSavedInquiries(updated);
      setSubmittedInquiry(newInquiry);
      
      // Reset form fields
      setName("");
      setEmail("");
      setCheckIn("");
      setCheckOut("");
      setNotes("");
      onResetSelectedProperty();
    } catch (error) {
      console.error("Inquiry submission failed:", error);
      alert("We encountered an issue submitting your booking inquiry to our registrar desk. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearPreviousInquiries = () => {
    localStorage.removeItem("walterbeinstein_inquiries");
    setSavedInquiries([]);
  };

  return (
    <section id="inquiry" className="py-28 md:py-36 px-6 md:px-12 bg-[#E6E3D8]/30 border-t border-sand/40">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 md:mb-20">
          <ScrollReveal delay={0.1}>
            <span className="font-sans text-[10px] md:text-xs tracking-[0.25em] uppercase text-sage font-semibold mb-4 block">
              Reservations
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal tracking-tight leading-[1.05]">
              Booking Inquiry
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.3} className="mt-4">
            <p className="font-sans font-light text-sm md:text-base text-charcoal/70 leading-relaxed">
              We operate as a private invitation-only service. Submit your requested dates, and our estate registrar will connect with you in 24 hours to coordinate your volume.
            </p>
          </ScrollReveal>
        </div>

        <AnimatePresence mode="wait">
          {!submittedInquiry ? (
            <motion.div
              key="booking-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <ScrollReveal delay={0.3}>
                <form onSubmit={handleSubmit} className="space-y-12 bg-cream/70 rounded-[12px] p-8 md:p-12 border border-sand/45">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    
                    {/* Guest Name field */}
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="guest-name" className="font-sans text-[10px] tracking-[0.2em] uppercase text-charcoal/50 font-semibold">
                        Guest Name
                      </label>
                      <div className="relative flex items-center">
                        <User size={14} className="absolute left-0 text-sage" />
                        <input
                          id="guest-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Lord Walter Beinstein"
                          className="w-full pl-6 border-b border-sand/80 focus:border-forest focus:outline-none bg-transparent py-2.5 font-sans font-light text-sm text-charcoal transition-colors placeholder:text-charcoal/30"
                        />
                      </div>
                    </div>

                    {/* Email field */}
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="guest-email" className="font-sans text-[10px] tracking-[0.2em] uppercase text-charcoal/50 font-semibold">
                        Email Address
                      </label>
                      <div className="relative flex items-center">
                        <Mail size={14} className="absolute left-0 text-sage" />
                        <input
                          id="guest-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="curator@slowliving.com"
                          className="w-full pl-6 border-b border-sand/80 focus:border-forest focus:outline-none bg-transparent py-2.5 font-sans font-light text-sm text-charcoal transition-colors placeholder:text-charcoal/30"
                        />
                      </div>
                    </div>

                    {/* Property Selection drop-down */}
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="property-select" className="font-sans text-[10px] tracking-[0.2em] uppercase text-charcoal/50 font-semibold">
                        Selected Sanctuary
                      </label>
                      <div className="relative flex items-center">
                        <select
                          id="property-select"
                          required
                          value={property}
                          onChange={(e) => setProperty(e.target.value)}
                          className="w-full pl-0 border-b border-sand/80 focus:border-forest focus:outline-none bg-transparent py-2.5 font-sans font-light text-sm text-charcoal transition-colors appearance-none cursor-pointer"
                        >
                          <option value="" disabled className="bg-cream">Choose a space...</option>
                          {PROPERTIES_DATA.map((p) => (
                            <option key={p.id} value={p.title} className="bg-cream text-charcoal">
                              {p.title} &mdash; {p.location}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-0 text-sage pointer-events-none" />
                      </div>
                    </div>

                    {/* Date Ranges */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="check-in-date" className="font-sans text-[10px] tracking-[0.2em] uppercase text-charcoal/50 font-semibold">
                          Check In
                        </label>
                        <div className="relative flex items-center">
                          <input
                            id="check-in-date"
                            type="date"
                            required
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="w-full border-b border-sand/80 focus:border-forest focus:outline-none bg-transparent py-2 font-sans font-light text-xs text-charcoal transition-colors cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <label htmlFor="check-out-date" className="font-sans text-[10px] tracking-[0.2em] uppercase text-charcoal/50 font-semibold">
                          Check Out
                        </label>
                        <div className="relative flex items-center">
                          <input
                            id="check-out-date"
                            type="date"
                            required
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="w-full border-b border-sand/80 focus:border-forest focus:outline-none bg-transparent py-2 font-sans font-light text-xs text-charcoal transition-colors cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Message/Special request text input */}
                  <div className="flex flex-col space-y-2 pt-4">
                    <label htmlFor="guest-notes" className="font-sans text-[10px] tracking-[0.2em] uppercase text-charcoal/50 font-semibold">
                      Special Narratives or Requests (Optional)
                    </label>
                    <textarea
                      id="guest-notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Let us know about dietary habits, noise sensitivities, or specific aesthetic additions you would enjoy during your sanctuary residency..."
                      className="w-full border-b border-sand/80 focus:border-forest focus:outline-none bg-transparent py-2.5 font-sans font-light text-sm text-charcoal resize-none transition-colors placeholder:text-charcoal/30 leading-relaxed"
                    />
                  </div>

                  {/* Submission and verification details */}
                  <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-center space-x-2 text-charcoal/40">
                      <ShieldCheck size={14} className="text-sage" />
                      <span className="font-sans text-[9px] tracking-wider uppercase font-light">
                        Encrypted reservation desk &bull; Strict privacy
                      </span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02, backgroundColor: "#1e2418" }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      type="submit"
                      className="bg-forest text-cream font-sans text-xs tracking-widest uppercase px-10 py-4.5 rounded-[4px] cursor-pointer font-medium shadow-xs hover:shadow-md transition-all duration-300 min-w-[200px] flex items-center justify-center space-x-2"
                      id="booking-submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw size={14} className="animate-spin text-cream/70" />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <span>Request Invitation</span>
                      )}
                    </motion.button>
                  </div>
                </form>
              </ScrollReveal>
            </motion.div>
          ) : (
            /* Success letter template */
            <motion.div
              key="booking-success"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-cream rounded-[12px] p-8 md:p-12 border border-sage/30 shadow-md text-charcoal"
              id="booking-success-letter"
            >
              <div className="flex flex-col items-center justify-center text-center pb-8 border-b border-sand/40">
                <CheckCircle2 size={40} className="text-sage mb-4" />
                <h3 className="font-serif text-3xl md:text-4xl text-forest italic">
                  Inquiry Verified
                </h3>
                <p className="font-mono text-[10px] text-charcoal/40 uppercase tracking-widest mt-1">
                  Reference: {submittedInquiry.referenceId}
                </p>
              </div>

              {/* Private letter body */}
              <div className="py-8 font-sans font-light text-sm md:text-base leading-relaxed text-charcoal/95 space-y-6 max-w-2xl mx-auto">
                <p>Dear {submittedInquiry.name},</p>
                <p>
                  We have received your requested reservation for <span className="font-medium text-forest font-serif italic text-lg">{submittedInquiry.property}</span>, starting on <span className="font-semibold">{submittedInquiry.checkIn}</span> through <span className="font-semibold">{submittedInquiry.checkOut}</span>.
                </p>
                {submittedInquiry.notes && (
                  <p className="bg-sand/20 border border-sand/40 p-4 rounded-[6px] text-xs md:text-sm text-charcoal/80 italic font-serif">
                    &ldquo;{submittedInquiry.notes}&rdquo;
                  </p>
                )}
                <p>
                  Our primary reservation registrar is currently reviewing your dates against the private estate schedule. You will receive a personalized invitation and a dossier of our material specifics via email ({submittedInquiry.email}) within the next 24 hours.
                </p>
                <p className="pt-4 font-serif text-base italic text-sage">
                  Warmest regards,<br />
                  <span className="font-serif text-charcoal font-medium not-italic text-sm tracking-wider uppercase block mt-1">The Walter Beinstein Registrar</span>
                </p>
              </div>

              <div className="pt-6 border-t border-sand/40 text-center">
                <button
                  onClick={() => setSubmittedInquiry(null)}
                  className="font-sans text-[10px] tracking-widest uppercase text-forest font-semibold hover:underline cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Saved Submissions History Drawer (Tactile Local Persistence UI) */}
        {savedInquiries.length > 0 && (
          <ScrollReveal delay={0.5} className="mt-16 pt-10 border-t border-sand/40">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl md:text-2xl text-charcoal">Your Submitted Request History</h3>
                <button
                  onClick={handleClearPreviousInquiries}
                  className="font-sans text-[9px] tracking-widest text-charcoal/40 hover:text-charcoal uppercase transition-colors cursor-pointer"
                >
                  Clear History
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedInquiries.map((inq, index) => (
                  <div key={index} className="bg-cream/40 rounded-[8px] p-5 border border-sand/30 shadow-xs space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="font-serif text-base font-semibold text-forest">{inq.property}</span>
                      <span className="font-mono text-[9px] text-charcoal/40">{inq.referenceId}</span>
                    </div>
                    <div className="text-xs text-charcoal/75 space-y-1 font-sans font-light">
                      <p><span className="font-medium">Guest:</span> {inq.name}</p>
                      <p><span className="font-medium">Stay:</span> {inq.checkIn} to {inq.checkOut}</p>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-sand/20 text-[9px] uppercase tracking-wider text-charcoal/40 font-medium">
                      <span>Submitted: {inq.timestamp}</span>
                      <span className="text-sage font-semibold font-sans">Under Registry Review</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

      </div>
    </section>
  );
}
