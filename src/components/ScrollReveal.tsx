import { motion } from "motion/react";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.9,
  yOffset = 30,
  className = ""
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.25, 1, 0.5, 1] // Elegant slow-release cubic-bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
