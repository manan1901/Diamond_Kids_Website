import { useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Photo par click karne par full-screen viewer. Arrow keys + Esc support.
export default function Lightbox({ photos, index, title, onChange, onClose }) {
  const goNext = () => onChange((index + 1) % photos.length);
  const goPrev = () => onChange((index - 1 + photos.length) % photos.length);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % photos.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + photos.length) % photos.length);
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [index, photos.length, onChange, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4"
    >
      <button type="button" onClick={onClose} aria-label="Close" className="absolute right-5 top-5 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/25">
        <X size={22} />
      </button>

      <p className="absolute left-5 top-6 text-sm font-medium text-white/80">
        {title} · {index + 1} / {photos.length}
      </p>

      {photos.length > 1 && (
        <>
          <button type="button" onClick={(e) => { e.stopPropagation(); goPrev(); }} aria-label="Previous photo" className="absolute left-3 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25 sm:left-6">
            <ChevronLeft size={26} />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); goNext(); }} aria-label="Next photo" className="absolute right-3 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25 sm:right-6">
            <ChevronRight size={26} />
          </button>
        </>
      )}

      <motion.img
        key={photos[index]}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        src={photos[index]}
        alt={`${title} photo ${index + 1}`}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] max-w-full rounded-xl object-contain shadow-2xl"
      />
    </motion.div>
  );
}
