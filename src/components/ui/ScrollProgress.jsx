import { motion, useScroll, useSpring } from "framer-motion";

// Page ke top par patli si bar jo scroll ke saath bharti hai.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-1 origin-left bg-gradient-to-r from-coral via-gold to-sage"
    />
  );
}
