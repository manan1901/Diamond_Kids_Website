import { motion } from "framer-motion";
import FloatingShapes from "./FloatingShapes";
import Squiggle from "./Squiggle";

// Notice Board / Gallery / Fee Payment pages ka common navy header.
export default function PageHeader({ icon: Icon, title, subtitle, children }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-navy via-navy to-coral/70 px-5 pt-14 pb-20 text-center md:pt-20 md:pb-24">
      <FloatingShapes />

      <div className="relative z-10 mx-auto max-w-2xl">
        {Icon && (
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 14 }}
            className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-gold ring-1 ring-white/20 backdrop-blur"
          >
            <Icon size={26} />
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-4xl font-semibold tracking-tight text-white md:text-5xl"
        >
          <span className="relative inline-block">
            {title}
            <Squiggle color="#FFC857" />
          </span>
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-6 max-w-lg text-white/75"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Optional extra content (jaise payment stepper) */}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  );
}
