import { motion } from "framer-motion";

// Hand-drawn underline jo screen par aate hi "draw" hoti hai.
// Parent element `relative inline-block` hona chahiye.
export default function Squiggle({ color = "#FF6B4A" }) {
  return (
    <svg
      viewBox="0 0 200 20"
      className="absolute left-0 -bottom-2 h-4 w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d="M2 14 C 50 4, 150 4, 198 12"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.4, ease: "easeInOut" }}
      />
    </svg>
  );
}
