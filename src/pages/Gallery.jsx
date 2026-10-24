import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, CalendarDays, ExternalLink, Images, ImageOff } from "lucide-react";
import PageHeader from "../components/ui/PageHeader";
import EventCarousel from "../components/gallery/EventCarousel";
import { galleryEvents } from "../components/schoolData";

// ---------------------------------------------------------------
// FOLDER SE AUTO-LOAD
// `src/assets/gallery/<event id>/` me jo bhi photos daloge wo apne aap
// us event ke carousel me aa jayengi (naam ke order me).
// Vite build ke time ye folders scan karta hai.
// ---------------------------------------------------------------
const folderImages = import.meta.glob("../assets/gallery/**/*.{jpg,jpeg,png,webp,gif,avif}", {
  eager: true,
  query: "?url",
  import: "default",
});

// { "sports-day": [url1, url2], ... }
function groupImagesByEvent() {
  const grouped = {};
  Object.entries(folderImages)
    .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
    .forEach(([path, url]) => {
      const eventId = path.split("/gallery/")[1].split("/")[0];
      (grouped[eventId] ||= []).push(url);
    });
  return grouped;
}

// Module load par ek hi baar chalta hai (photos build ke time fix hoti hain)
const folderPhotos = groupImagesByEvent();

// Google Drive folder link ko embeddable link me badalta hai.
// (Folder "Anyone with the link" share hona chahiye.)
function getDriveEmbedUrl(albumUrl) {
  const match = albumUrl?.match(/drive\.google\.com\/drive\/(?:u\/\d+\/)?folders\/([\w-]+)/);
  return match ? `https://drive.google.com/embeddedfolderview?id=${match[1]}#grid` : null;
}

function AlbumButton({ url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-coral/30 transition-all hover:-translate-y-0.5 hover:bg-[#E55A3B]"
    >
      <ExternalLink size={16} /> View full album
    </a>
  );
}

// Jab tak photos nahi hain, ye placeholder dikhta hai
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-navy/20 bg-white/60 px-6 py-20 text-center">
      <div className="animate-float mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gold/30 text-navy">
        <ImageOff size={36} />
      </div>
      <h3 className="font-serif text-xl font-semibold text-navy">Photos coming soon</h3>
      <p className="mt-1 max-w-xs text-sm text-gray-500">We're getting the best moments of this event ready for you.</p>
    </div>
  );
}

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Har event ke liye final photo list = folder ki photos + data file ke direct links
  const events = galleryEvents.map((event) => ({
    ...event,
    allPhotos: [...(folderPhotos[event.id] ?? []), ...event.photos],
  }));

  // Selected event URL me store hota hai (?event=sports-day) => link share kar sakte ho
  const activeId = searchParams.get("event") ?? events[0]?.id;
  const activeEvent = events.find((event) => event.id === activeId) ?? events[0];

  const driveEmbedUrl = getDriveEmbedUrl(activeEvent?.albumUrl);
  const hasPhotos = activeEvent?.allPhotos.length > 0;

  return (
    <div className="bg-sand pb-24">
      <PageHeader
        icon={Camera}
        title="Gallery"
        subtitle="Moments from the events and celebrations that make Diamond Kids School special."
      />

      <div className="mx-auto -mt-8 max-w-5xl px-5">
        {/* Event tabs */}
        <div className="relative z-10 rounded-3xl bg-white p-3 shadow-xl">
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {events.map((event) => {
              const isActive = event.id === activeEvent.id;
              return (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => setSearchParams({ event: event.id }, { replace: true })}
                  className={`relative shrink-0 rounded-2xl px-5 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? "text-white" : "text-navy/70 hover:text-navy"
                  }`}
                >
                  {isActive && (
                    <motion.span layoutId="gallery-tab" className="absolute inset-0 rounded-2xl bg-navy" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                  )}
                  <span className="relative flex items-center gap-2">
                    {event.title}
                    {event.allPhotos.length > 0 && (
                      <span className={`rounded-full px-1.5 text-[11px] ${isActive ? "bg-white/20" : "bg-navy/10"}`}>
                        {event.allPhotos.length}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active event */}
        <AnimatePresence mode="wait">
          <motion.section
            key={activeEvent.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mt-10"
          >
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-navy md:text-3xl">{activeEvent.title}</h2>
                {activeEvent.date && (
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                    <CalendarDays size={14} /> {activeEvent.date}
                  </p>
                )}
                {activeEvent.description && <p className="mt-2 max-w-xl text-sm text-gray-600">{activeEvent.description}</p>}
              </div>

              {hasPhotos && activeEvent.albumUrl && !driveEmbedUrl && <AlbumButton url={activeEvent.albumUrl} />}
            </div>

            {hasPhotos && <EventCarousel photos={activeEvent.allPhotos} title={activeEvent.title} />}

            {/* Google Drive folder: page ke andar hi grid me */}
            {driveEmbedUrl && (
              <div className={hasPhotos ? "mt-10" : ""}>
                <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
                  <iframe title={`${activeEvent.title} album`} src={driveEmbedUrl} className="h-[480px] w-full border-0" loading="lazy" />
                </div>
                <div className="mt-4 text-center">
                  <AlbumButton url={activeEvent.albumUrl} />
                </div>
              </div>
            )}

            {/* Google Photos jaisa non-embeddable album link, aur koi photo nahi */}
            {!hasPhotos && activeEvent.albumUrl && !driveEmbedUrl && (
              <div className="flex flex-col items-center justify-center rounded-3xl bg-white px-6 py-20 text-center shadow-xl">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-sage/25 text-navy">
                  <Images size={36} />
                </div>
                <h3 className="mb-5 font-serif text-xl font-semibold text-navy">The photos for this event are in our album</h3>
                <AlbumButton url={activeEvent.albumUrl} />
              </div>
            )}

            {!hasPhotos && !activeEvent.albumUrl && <EmptyState />}
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  );
}
