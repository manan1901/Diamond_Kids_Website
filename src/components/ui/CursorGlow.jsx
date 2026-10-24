import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Desktop par mouse ke peeche ek halka coral glow chalta hai.
// Touch devices par ye render hi nahi hota.
export default function CursorGlow() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const smoothX = useSpring(x, { stiffness: 90, damping: 18, mass: 0.5 });
  const smoothY = useSpring(y, { stiffness: 90, damping: 18, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const handleMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: smoothX, y: smoothY }}
      className="pointer-events-none fixed top-0 left-0 z-[5] -ml-44 -mt-44 hidden h-88 w-88 rounded-full bg-coral/10 blur-3xl md:block"
    />
  );
}
