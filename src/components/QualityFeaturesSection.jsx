import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpeg";
import img6 from "../assets/img6.jpeg";   

import { motion } from "framer-motion";
import { Puzzle, HeartHandshake, ShieldCheck, Music, Trophy, MonitorPlay } from "lucide-react";
import TiltCard from "./ui/TiltCard";
import Squiggle from "./ui/Squiggle";
import FloatingShapes from "./ui/FloatingShapes";

const features = [
  {
    image: img1,
    icon: Puzzle,
    title: "Play-Based Learning",
    description:
      "Pre-primary classrooms built around hands-on play — blocks, art, and sensory corners that make learning feel like fun.",
    accent: "#FF6B4A",
  },
  {
    image: img4,
    icon: HeartHandshake,
    title: "Caring, Qualified Teachers",
    description:
      "A low student-to-teacher ratio means every child gets noticed, encouraged, and genuinely known by name.",
    accent: "#7C9885",
  },
  {
    image: img2,
    icon: ShieldCheck,
    title: "Safe & Secure Campus",
    description:
      "CCTV-monitored corridors, verified staff, and RFID entry tracking — safety built into every part of the day.",
    accent: "#FFC857",
  },
  {
    image: img3,
    icon: Music,
    title: "Arts, Music & Dance",
    description:
      "Weekly creative electives that build confidence and imagination, not just an academic checklist.",
    accent: "#FF6B4A",
  },
  {
    image: img5,
    icon: Trophy,
    title: "Sports & Active Play",
    description:
      "Daily physical education, an annual sports day, and inter-school tournaments for every age group.",
    accent: "#7C9885",
  },
  {
    image: img6,
    icon: MonitorPlay,
    title: "Smart Digital Classrooms",
    description:
      "Interactive boards and visual lessons that make even tricky concepts click for young learners.",
    accent: "#FFC857",
  },
];

// Alternate cards ke corners alag shape ke hote hain (leaf-style), taaki grid monotonous na lage
const cardShapes = ["rounded-[2rem_2rem_2rem_4.5rem]", "rounded-[2rem_4.5rem_2rem_2rem]"];

const FeatureCard = ({ feature, index }) => {
  const Icon = feature.icon;
  const shape = cardShapes[index % 2];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: index % 2 === 0 ? -2 : 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={index % 2 === 1 ? "lg:mt-12" : ""}
    >
      <TiltCard className="group relative">
        {/* Sticker-style offset block: hover par aur door khisakta hai */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 translate-x-2.5 translate-y-2.5 transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4 ${shape}`}
          style={{ backgroundColor: feature.accent }}
        />

        <div className={`relative overflow-hidden bg-sand shadow-xl shadow-black/20 ${shape}`}>
          {/* Image + icon badge ek relative wrapper me, taaki badge image ke neeche ke edge par tike */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-b-[2.5rem] bg-gray-100">
              <img
                src={feature.image}
                alt={feature.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Hover par halki shine strip image par se guzarti hai */}
              <div
                aria-hidden="true"
                className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 blur-md transition-all duration-700 group-hover:left-[130%]"
              />
            </div>

            {/* Icon badge: hover par seedha ho jaata hai */}
            <div
              className="absolute -bottom-6 right-6 flex h-14 w-14 rotate-6 items-center justify-center rounded-2xl text-navy shadow-lg transition-transform duration-300 group-hover:rotate-0 group-hover:scale-110"
              style={{ backgroundColor: feature.accent }}
            >
              <Icon size={26} />
            </div>
          </div>

          <div className="p-6 pt-7">
            <h3 className="pr-16 font-serif text-lg font-semibold text-navy transition-colors duration-300 group-hover:text-coral">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm text-navy/70 leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

const QualityFeaturesSection = () => {
  return (
    <section className="relative overflow-hidden pt-20 pb-0 md:pt-28 bg-gradient-to-bl from-navy via-navy/100 to-coral/70">
      <FloatingShapes />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl md:text-4xl font-semibold text-white"
          >
            What makes a{" "}
            <span className="relative inline-block text-coral">
              Diamond Kid
              <Squiggle color="#FFC857" />
            </span>{" "}
            different
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-white/85"
          >
            Six things every parent notices within their first week on campus.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 pb-28">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualityFeaturesSection;
