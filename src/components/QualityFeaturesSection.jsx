import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpeg";
import img6 from "../assets/img6.jpeg";   

import { motion } from "framer-motion";

const features = [
  {
    image: img1,
    title: "Play-Based Learning",
    description:
      "Pre-primary classrooms built around hands-on play — blocks, art, and sensory corners that make learning feel like fun.",
    accent: "#FF6B4A",
  },
  {
    image: img4,
    title: "Caring, Qualified Teachers",
    description:
      "A low student-to-teacher ratio means every child gets noticed, encouraged, and genuinely known by name.",
    accent: "#7C9885",
  },
  {
    image: img2,
    title: "Safe & Secure Campus",
    description:
      "CCTV-monitored corridors, verified staff, and RFID entry tracking — safety built into every part of the day.",
    accent: "#FFC857",
  },
  {
    image: img3,
    title: "Arts, Music & Dance",
    description:
      "Weekly creative electives that build confidence and imagination, not just an academic checklist.",
    accent: "#FF6B4A",
  },
  {
    image: img5,
    title: "Sports & Active Play",
    description:
      "Daily physical education, an annual sports day, and inter-school tournaments for every age group.",
    accent: "#7C9885",
  },
  {
    image: img6,
    title: "Smart Digital Classrooms",
    description:
      "Interactive boards and visual lessons that make even tricky concepts click for young learners.",
    accent: "#FFC857",
  },
];

const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1 }}
      className={`group ${index % 2 === 1 ? "lg:mt-12" : ""}`}
    >
      <div className="rounded-3xl bg-white border border-[#1B2A4A]/10 overflow-hidden hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-[4/3] flex items-center justify-center overflow-hidden bg-gray-100">
          
          <img 
            src={feature.image} 
            alt={feature.title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
          
        </div>

        <div className="p-6">
          <h3 className="font-serif text-lg font-semibold text-[#1B2A4A]">
            {feature.title}
          </h3>
          <p className="mt-2 text-sm text-[#1B2A4A]/65 leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const QualityFeaturesSection = () => {
  return (
    <section className="relative overflow-hidden pt-20 pb-0 md:pt-28  bg-gradient-to-bl  from-[#1B2A4A] via-[#1B2A4A]/100 to-[#FF6B4A]/70
     "
     >
      
      {/* Foreground Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#ffffff]">
            What makes a{" "}
            <span className="relative inline-block text-[#FF6B4A]">
              Diamond Kid
              <svg
                viewBox="0 0 200 20"
                className="absolute left-0 -bottom-2 w-full h-4"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 14 C 50 4, 150 4, 198 12"
                  stroke="#FFC857"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>{" "}
            different
          </h2>
          <p className="mt-4 text-white/85">
            Six things every parent notices within their first week on campus.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-28">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualityFeaturesSection;