import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, Pin, Search, X, CalendarDays, Paperclip, SearchX } from "lucide-react";
import PageHeader from "../components/ui/PageHeader";
import { notices, noticeCategories } from "../components/schoolData";

// Har category ka apna color
const categoryStyles = {
  Events: "bg-coral/15 text-coral",
  Academics: "bg-sage/20 text-[#4f6e58]",
  Holidays: "bg-gold/30 text-[#8a6500]",
  Fees: "bg-navy/10 text-navy",
  General: "bg-gray-100 text-gray-600",
};

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const isNew = (iso) => {
  const daysAgo = (Date.now() - new Date(iso).getTime()) / 86400000;
  return daysAgo >= 0 && daysAgo <= 7;
};

function CategoryBadge({ category }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${categoryStyles[category] ?? categoryStyles.General}`}>
      {category}
    </span>
  );
}

// ---------- Pinned notice: kagaz pin kiye hue jaisa look ----------
function PinnedCard({ notice, index, onOpen }) {
  return (
    <motion.button
      layout
      type="button"
      onClick={() => onOpen(notice)}
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
      whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="relative rounded-2xl bg-[#FFF4CC] p-6 pt-8 text-left shadow-lg shadow-navy/10"
    >
      <Pin size={22} className="absolute -top-3 left-1/2 -translate-x-1/2 rotate-12 fill-coral text-coral drop-shadow" />
      <div className="mb-3 flex items-center gap-2">
        <CategoryBadge category={notice.category} />
        <span className="text-xs text-navy/50">{formatDate(notice.date)}</span>
      </div>
      <h3 className="font-serif text-lg font-semibold leading-snug text-navy">{notice.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm text-navy/70">{notice.summary}</p>
      <span className="mt-4 inline-block text-xs font-semibold text-coral">Read more →</span>
    </motion.button>
  );
}

// ---------- Normal notice row ----------
function NoticeRow({ notice, onOpen }) {
  const date = new Date(notice.date);

  return (
    <motion.button
      layout
      type="button"
      onClick={() => onOpen(notice)}
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ x: 6 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className="group flex w-full items-stretch gap-4 rounded-2xl border border-navy/5 bg-white p-4 text-left shadow-sm transition-shadow hover:shadow-lg sm:gap-5 sm:p-5"
    >
      {/* Date block */}
      <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-navy py-2 text-white transition-colors group-hover:bg-coral">
        <span className="font-serif text-2xl font-semibold leading-none">{date.getDate()}</span>
        <span className="mt-1 text-[11px] font-medium uppercase tracking-wider text-white/70">
          {date.toLocaleDateString("en-IN", { month: "short" })}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex flex-wrap items-center gap-2">
          <CategoryBadge category={notice.category} />
          {isNew(notice.date) && (
            <span className="rounded-full bg-coral px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">New</span>
          )}
        </div>
        <h3 className="font-serif text-base font-semibold text-navy sm:text-lg">{notice.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-navy/65">{notice.summary}</p>
      </div>
    </motion.button>
  );
}

// ---------- Detail popup ----------
function NoticeModal({ notice, onClose }) {
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden"; // peeche ka page scroll na ho
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-navy/60 p-4 backdrop-blur-sm"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-7 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-navy"
        >
          <X size={20} />
        </button>

        <div className="mb-3 flex items-center gap-3 pr-8">
          <CategoryBadge category={notice.category} />
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <CalendarDays size={13} /> {formatDate(notice.date)}
          </span>
        </div>
        <h2 className="font-serif text-2xl font-semibold leading-snug text-navy">{notice.title}</h2>
        <p className="mt-4 text-sm leading-relaxed text-gray-700">{notice.details}</p>

        {notice.link && (
          <a
            href={notice.link}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy/85"
          >
            <Paperclip size={15} /> Open attachment
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function NoticeBoard() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  // Category + search dono ke hisaab se filter, phir naye notices pehle
  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase();
    return notices
      .filter((n) => category === "All" || n.category === category)
      .filter((n) => !text || `${n.title} ${n.summary} ${n.details}`.toLowerCase().includes(text))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [category, query]);

  const pinned = filtered.filter((n) => n.pinned);
  const regular = filtered.filter((n) => !n.pinned);

  return (
    <div className="bg-sand pb-24">
      <PageHeader
        icon={Megaphone}
        title="Notice Board"
        subtitle="Announcements, events and circulars — everything parents and students need to know."
      />

      <div className="mx-auto -mt-8 max-w-4xl px-5">
        {/* Search + filters */}
        <div className="relative z-10 rounded-3xl bg-white p-4 shadow-xl sm:p-5">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notices…"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm transition-all focus:border-coral focus:bg-white focus:outline-none focus:ring-2 focus:ring-coral/40"
            />
          </div>

          <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
            {noticeCategories.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setCategory(name)}
                className={`relative shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  category === name ? "text-white" : "text-navy/70 hover:text-navy"
                }`}
              >
                {category === name && (
                  <motion.span layoutId="notice-chip" className="absolute inset-0 rounded-full bg-navy" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
                <span className="relative">{name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Pinned */}
        {pinned.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 flex items-center gap-2 font-serif text-xl font-semibold text-navy">
              <Pin size={18} className="text-coral" /> Pinned
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {pinned.map((notice, index) => (
                  <PinnedCard key={notice.id} notice={notice} index={index} onOpen={setSelected} />
                ))}
              </AnimatePresence>
            </div>
          </section>
        )}

        {/* All notices */}
        <section className="mt-12">
          {regular.length > 0 && (
            <h2 className="mb-6 font-serif text-xl font-semibold text-navy">Latest Notices</h2>
          )}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {regular.map((notice) => (
                <NoticeRow key={notice.id} notice={notice} onOpen={setSelected} />
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center text-gray-500">
              <SearchX size={40} className="mx-auto mb-3 text-gray-300" />
              No notices found.
            </motion.div>
          )}
        </section>
      </div>

      <AnimatePresence>
        {selected && <NoticeModal notice={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
