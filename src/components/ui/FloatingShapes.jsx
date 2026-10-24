import { Gem, Star, Sparkles } from "lucide-react";

// Background me tairte hue chhote decorations (sirf design, koi text nahi).
const shapes = [
  { Icon: Gem, className: "top-[12%] left-[6%] h-7 w-7 text-gold/50", anim: "animate-float" },
  { Icon: Star, className: "top-[22%] right-[8%] h-6 w-6 text-coral/60", anim: "animate-float-slow" },
  { Icon: Sparkles, className: "bottom-[18%] left-[12%] h-8 w-8 text-white/25", anim: "animate-float-slow" },
  { Icon: Gem, className: "bottom-[28%] right-[14%] h-9 w-9 text-sage/50", anim: "animate-float" },
  { Icon: Star, className: "top-[55%] left-[3%] h-5 w-5 text-white/20", anim: "animate-float" },
];

export default function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {shapes.map(({ Icon, className, anim }, index) => (
        <Icon
          key={index}
          className={`absolute ${className} ${anim}`}
          style={{ animationDelay: `${index * 0.8}s` }}
        />
      ))}
    </div>
  );
}
