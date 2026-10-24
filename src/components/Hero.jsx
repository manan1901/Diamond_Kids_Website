import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Gem } from "lucide-react";

import video from "../assets/video.mp4"; // Update with your actual video file path
import FloatingShapes from "./ui/FloatingShapes";
import MagneticButton from "./ui/MagneticButton";
import Squiggle from "./ui/Squiggle";

// Headline ke words ek ke baad ek aate hain (stagger animation)
const headlineWords = ["Where", "every", "child", "finds", "their"];

const wordVariants = {
  hidden: { opacity: 0, y: 24, rotate: 3 },
  visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const Hero = () => {
  // `sectionRef` outer <section> par laga hai taaki useScroll sirf is section ka
  // scroll progress track kare (poore page ka nahi).
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"], // 0 jab section top par aaye, 1 jab bahar nikal jaye
  });

  // Video neeche scroll par slow move + thoda zoom (parallax)
  const mainPhotoY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const mainPhotoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // Scroll shuru hote hi text dheere fade ho jaata hai
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // ---- Mouse se video frame ka 3D tilt ----
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { stiffness: 120, damping: 16 });
  const smoothTiltY = useSpring(tiltY, { stiffness: 120, damping: 16 });

  const handleVideoMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const box = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - box.left) / box.width - 0.5;
    const py = (e.clientY - box.top) / box.height - 0.5;
    tiltY.set(px * 10);
    tiltX.set(-py * 10);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-navy pt-16 pb-0 md:pt-20"
    >
      <FloatingShapes />

      <div className="relative max-w-7xl mx-auto w-auto md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* ---------------- Left: text content ---------------- */}
        <motion.div style={{ opacity: textOpacity }} className="relative z-10 py-10 lg:py-20 px-5 md:px-0">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/90 mb-7"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-coral animate-pulse-ring" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-coral" />
            </span>
            Admissions Open for 2026–27
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08, delayChildren: 0.15 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.08] tracking-tight"
          >
            {headlineWords.map((word) => (
              <motion.span key={word} variants={wordVariants} className="mr-[0.25em] inline-block">
                {word}
              </motion.span>
            ))}
            <motion.span variants={wordVariants} className="relative inline-block text-gold">
              spark
              <Squiggle color="#FF6B4A" />
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 text-base sm:text-lg text-white/65 max-w-md"
          >
            A campus built on real foundations-caring teachers, strong
            academics, and a building your child will be proud to call
            their second home.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-9"
          >
            <MagneticButton className="inline-block">
              <Link
                to="/admissions"
                className="group inline-flex items-center gap-2 rounded-full bg-coral text-white font-medium px-7 py-3.5 shadow-lg shadow-coral/30 hover:bg-[#E55A3B] hover:shadow-xl hover:shadow-coral/40 transition-all duration-200"
              >
                Schedule a Campus Visit
                <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1.5" />
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* ---------------- Right: video composition ---------------- */}
        <div
          onPointerMove={handleVideoMove}
          onPointerLeave={resetTilt}
          className="relative mx-5 md:mx-0 h-[420px] sm:h-[480px] lg:h-[560px]"
        >
          {/* Video ke peeche ek tirchha dashed frame, design touch ke liye */}
          <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-2 rounded-3xl border-2 border-dashed border-coral/50" aria-hidden="true" />

          {/* Main video — clip-path reveal on mount, parallax on scroll, tilt on hover */}
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
            style={{
              y: mainPhotoY,
              scale: mainPhotoScale,
              rotateX: smoothTiltX,
              rotateY: smoothTiltY,
              transformPerspective: 1000,
            }}
            className="absolute inset-0 rounded-3xl overflow-hidden"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video.
            </video>

            {/* Duotone overlay: navy-to-coral gradient (mix-blend-color) taaki video "branded" lage */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-navy via-navy/40 to-coral/70 mix-blend-color"
              aria-hidden="true"
            />
            {/* Neeche ka fade, video section ke background me ghul jaye */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy to-transparent"
              aria-hidden="true"
            />
          </motion.div>

          {/* Video ke corner par tairta hua gem badge */}
          <motion.div
            initial={{ scale: 0, rotate: -40 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1, type: "spring", stiffness: 200, damping: 12 }}
            className="absolute -top-5 -right-3 z-10 md:-right-6"
            aria-hidden="true"
          >
            <div className="animate-float flex h-16 w-16 items-center justify-center rounded-2xl bg-gold text-navy shadow-xl shadow-gold/30 rotate-12">
              <Gem size={30} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom filler: navy hero ko agle section me smoothly milane ke liye */}
      <div className="h-16 md:h-24 bg-navy" aria-hidden="true" />
    </section>
  );
};

export default Hero;
