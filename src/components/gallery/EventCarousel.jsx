import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, Pause, Play } from "lucide-react";
import Lightbox from "./Lightbox";

// Slide aane/jaane ki direction ke hisaab se animation
const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? "-100%" : "100%", opacity: 0 }),
};

const SWIPE_DISTANCE = 80; // itna drag karne par slide badalti hai
const AUTOPLAY_MS = 4000;

export default function EventCarousel({ photos, title }) {
  const [[index, direction], setSlide] = useState([0, 0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const stripRef = useRef(null);
  const wasDragged = useRef(false); // drag ke baad accidental click ko rokne ke liye

  const total = photos.length;

  const paginate = (step) => {
    setSlide(([current]) => [(current + step + total) % total, step]);
  };

  const jumpTo = (target) => {
    setSlide(([current]) => [target, target > current ? 1 : -1]);
  };

  // Autoplay (lightbox khula ho to ruk jaata hai)
  useEffect(() => {
    if (!isPlaying || isLightboxOpen || total < 2) return;
    const timer = setInterval(() => {
      setSlide(([current]) => [(current + 1) % total, 1]);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPlaying, isLightboxOpen, total]);

  // Active thumbnail ko strip me center me laate hain.
  // (scrollIntoView use nahi kiya kyunki wo poore page ko bhi scroll kar deta hai)
  useEffect(() => {
    const strip = stripRef.current;
    const thumb = strip?.children[index];
    if (!strip || !thumb) return;
    strip.scrollTo({ left: thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2, behavior: "smooth" });
  }, [index]);

  const handleDragEnd = (_, { offset, velocity }) => {
    if (offset.x < -SWIPE_DISTANCE || velocity.x < -500) paginate(1);
    else if (offset.x > SWIPE_DISTANCE || velocity.x > 500) paginate(-1);
    setTimeout(() => (wasDragged.current = false), 50);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") paginate(1);
    if (e.key === "ArrowLeft") paginate(-1);
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0} className="outline-none">
      {/* Main stage */}
      <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-navy shadow-2xl sm:aspect-[16/10]">
        {/* Blurred copy of photo peeche, taaki letterbox khali na dikhe */}
        <img src={photos[index]} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-2xl" />

        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={index}
            src={photos[index]}
            alt={`${title} photo ${index + 1}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: "spring", stiffness: 280, damping: 30 }, opacity: { duration: 0.25 } }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragStart={() => (wasDragged.current = true)}
            onDragEnd={handleDragEnd}
            onClick={() => !wasDragged.current && setIsLightboxOpen(true)}
            className="absolute inset-0 h-full w-full cursor-zoom-in object-contain"
          />
        </AnimatePresence>

        {/* Controls */}
        {total > 1 && (
          <>
            <button type="button" onClick={() => paginate(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2.5 text-navy opacity-100 shadow-lg backdrop-blur transition-all hover:scale-110 hover:bg-white sm:opacity-0 sm:group-hover:opacity-100">
              <ChevronLeft size={22} />
            </button>
            <button type="button" onClick={() => paginate(1)} aria-label="Next photo" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2.5 text-navy opacity-100 shadow-lg backdrop-blur transition-all hover:scale-110 hover:bg-white sm:opacity-0 sm:group-hover:opacity-100">
              <ChevronRight size={22} />
            </button>
          </>
        )}

        <div className="absolute right-3 top-3 flex gap-2">
          {total > 1 && (
            <button type="button" onClick={() => setIsPlaying((prev) => !prev)} aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"} className="rounded-full bg-black/45 p-2 text-white backdrop-blur transition-colors hover:bg-black/70">
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
          )}
          <button type="button" onClick={() => setIsLightboxOpen(true)} aria-label="View full screen" className="rounded-full bg-black/45 p-2 text-white backdrop-blur transition-colors hover:bg-black/70">
            <Maximize2 size={16} />
          </button>
        </div>

        <span className="absolute bottom-3 left-3 rounded-full bg-black/45 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {index + 1} / {total}
        </span>

        {/* Autoplay progress line */}
        {isPlaying && (
          <motion.div
            key={`progress-${index}`}
            className="absolute bottom-0 left-0 h-1 bg-coral"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
          />
        )}
      </div>

      {/* Thumbnails */}
      {total > 1 && (
        <div ref={stripRef} className="no-scrollbar relative mt-4 flex gap-3 overflow-x-auto p-2">
          {photos.map((photo, thumbIndex) => (
            <button
              key={photo}
              type="button"
              onClick={() => jumpTo(thumbIndex)}
              aria-label={`Go to photo ${thumbIndex + 1}`}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl transition-all duration-200 sm:h-20 sm:w-28 ${
                thumbIndex === index ? "scale-105 ring-2 ring-coral ring-offset-2" : "opacity-60 hover:opacity-100"
              }`}
            >
              <img src={photo} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isLightboxOpen && (
          <Lightbox
            photos={photos}
            index={index}
            title={title}
            onChange={(next) => setSlide(([current]) => [next, next > current ? 1 : -1])}
            onClose={() => setIsLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
