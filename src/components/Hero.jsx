import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import buildingMain from "../assets/school-building-main.jpg";
import video from "../assets/video.mp4"; // Update with your actual video file path


const Hero = () => {
  // `sectionRef` is attached to the outer <section> so framer-motion's
  // useScroll can track scroll progress specifically AS THIS SECTION
  // moves through the viewport (not the whole page's scroll position).
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"], // 0 when section hits top, 1 once it's scrolled past
  });

  // Main photo moves UP slower than scroll (classic parallax) and
  // scales up slightly — feels like the photo has depth, not pasted flat.
  const mainPhotoY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const mainPhotoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);



  // Text content fades out a bit faster as you start scrolling,
  // so the photo gets visual priority once you begin exploring the page.
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#1B2A4A] pt-16 pb-0 md:pt-20"
    >
      <div className="max-w-7xl mx-auto w-auto md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* ---------------- Left: text content ---------------- */}
        <motion.div style={{ opacity: textOpacity }} className="relative z-10 py-10 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/90 mb-7"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF6B4A]" />
            Admissions Open for 2026–27
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.08] tracking-tight"
          >
            Where every child finds their{" "}
            <span className="relative inline-block text-[#FFC857]">
              spark
              <svg
                viewBox="0 0 200 20"
                className="absolute left-0 -bottom-2 w-full h-4"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 14 C 50 4, 150 4, 198 12"
                  stroke="#FF6B4A"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-white/65 max-w-md"
          >
            A campus built on real foundations-caring teachers, strong
            academics, and a building your child will be proud to call
            their second home.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9"
          >
            <Link
              to="/admissions"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF6B4A] text-white font-medium px-7 py-3.5 hover:bg-[#E55A3B] transition-colors duration-200"
            >
              Schedule a Campus Visit
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>

        {/* ---------------- Right: photo composition ---------------- */}
        <div className="relative h-[420px] sm:h-[480px] lg:h-[560px]">
          {/* Main photo — clip-path reveal on mount, parallax on scroll */}
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
            style={{ y: mainPhotoY, scale: mainPhotoScale }}
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
          </motion.div>
        </div>
      </div>
            {/* Duotone overlay: navy-to-coral gradient blended over the
                grayscale photo using mix-blend-mode so the photo reads
                as "branded" rather than a plain camera shot */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#1B2A4A] via-[#1B2A4A]/40 to-[#FF6B4A]/70 mix-blend-color"
              aria-hidden="true"
            />
            {/* Bottom fade so the photo settles into the section background
                instead of having a hard rectangular edge */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#1B2A4A] to-transparent"
              aria-hidden="true"
            />
          
          
      {/* Bottom wave-style divider so the navy hero settles cleanly
          into the next (sand-colored) section instead of a hard cut */}
      <div className="h-16 md:h-24 bg-[#1B2A4A]" aria-hidden="true" />
    
    
    </section>
  );
};

export default Hero;