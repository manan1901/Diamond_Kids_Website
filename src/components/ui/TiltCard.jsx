import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Card mouse ki direction me 3D tilt hota hai. `max` = maximum degrees.
export default function TiltCard({ children, className = "", max = 7 }) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothX = useSpring(rotateX, { stiffness: 180, damping: 16 });
  const smoothY = useSpring(rotateY, { stiffness: 180, damping: 16 });

  const handleMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const box = ref.current.getBoundingClientRect();
    const px = (e.clientX - box.left) / box.width - 0.5; // -0.5 se +0.5
    const py = (e.clientY - box.top) / box.height - 0.5;
    rotateY.set(px * max * 2);
    rotateX.set(-py * max * 2);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ rotateX: smoothX, rotateY: smoothY, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
