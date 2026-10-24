import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Button cursor ki taraf thoda khinchta hai (magnet jaisa feel).
// Andar jo bhi Link/button doge, wo is wrapper ke saath hilega.
export default function MagneticButton({ children, className = "", strength = 0.3 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 220, damping: 14 });
  const smoothY = useSpring(y, { stiffness: 220, damping: 14 });

  const handleMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const box = ref.current.getBoundingClientRect();
    x.set((e.clientX - (box.left + box.width / 2)) * strength);
    y.set((e.clientY - (box.top + box.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: smoothX, y: smoothY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
