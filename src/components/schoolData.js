// =============================================================
// schoolData.js
// -------------------------------------------------------------
// Central mock-data file for the Diamond Kids School landing page.
// Every component below pulls its content from here instead of
// having text hardcoded inline. When the FastAPI backend is ready,
// you just replace these exported objects/arrays with data coming
// from your API calls (e.g. inside a useEffect + axios/fetch call)
// — the JSX in the components won't need to change at all.
// =============================================================

// ---- Top navigation bar links ----
// `to` matches the path you'll register in React Router (App.jsx / routes file)
export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Academics", to: "/academics" },
  { label: "Admissions", to: "/admissions" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

// ---- Hero section content ----
export const heroContent = {
  badge: "Admissions Open for 2026–27",
  headline: "Where every child finds their spark",
  subheadline:
    "Diamond Kids School blends a caring, play-first foundation with strong academics — so children grow up curious, confident, and ready for what's next.",
  primaryCta: { label: "Schedule a Campus Visit", to: "/admissions" },
};

// ---- Stat strip (the "10.6x / 37% / 4.8x" style numbers on Duna) ----
export const statHighlights = [
  { value: "98%", label: "Board exam pass rate" },
  { value: "1:15", label: "Teacher to student ratio" },
  { value: "25+", label: "Years shaping young minds" },
];

// ---- Alternating feature sections (mirrors Duna's Onboard / Decide / Lifecycle blocks) ----
// Each entry becomes one <ProgramBlock /> inside ProgramsSection.jsx
export const programStages = [
  {
    id: "pre-primary",
    eyebrow: "Ages 3–5",
    title: "Pre-Primary Wing",
    description:
      "A warm, play-based introduction to school — building language, motor skills, and social confidence through stories, music, and guided play.",
    ctaLabel: "Explore Pre-Primary",
    ctaTo: "/academics/pre-primary",
    features: [
      {
        title: "Play-based learning",
        text: "Activity corners for art, blocks, sand and water play that build fine motor skills daily.",
      },
      {
        title: "Phonics foundation",
        text: "Early reading readiness through sound games, rhymes, and picture-led storytelling.",
      },
      {
        title: "Small group sizes",
        text: "Low student counts per class so every child gets individual attention from day one.",
      },
      {
        title: "Parent connect app",
        text: "Daily photo updates and notes so parents stay close to their child's school day.",
      },
    ],
  },
  {
    id: "primary",
    eyebrow: "Grades 1–5",
    title: "Primary Wing",
    description:
      "Strong fundamentals in literacy, numeracy and science — taught through hands-on projects, not rote memorisation.",
    ctaLabel: "Explore Primary",
    ctaTo: "/academics/primary",
    features: [
      {
        title: "Activity-led curriculum",
        text: "Concepts taught through experiments, models, and group projects rather than textbooks alone.",
      },
      {
        title: "Reading & library hour",
        text: "A dedicated weekly slot in our library to build independent reading habits early.",
      },
      {
        title: "Sports & co-curriculars",
        text: "Daily physical education plus art, music, and dance electives every week.",
      },
      {
        title: "Continuous assessment",
        text: "Regular, low-pressure evaluations that track growth instead of one big exam.",
      },
    ],
  },
  {
    id: "middle-senior",
    eyebrow: "Grades 6–12",
    title: "Middle & Senior Wing",
    description:
      "Board-aligned academics paired with career guidance, competitive exam prep, and leadership opportunities.",
    ctaLabel: "Explore Middle & Senior",
    ctaTo: "/academics/middle-senior",
    features: [
      {
        title: "CBSE-aligned curriculum",
        text: "Structured subject tracks for science, commerce, and humanities from grade 9 onward.",
      },
      {
        title: "Career counselling",
        text: "One-on-one guidance sessions starting grade 9 to help students choose the right stream.",
      },
      {
        title: "Competitive exam prep",
        text: "Integrated foundation classes for JEE / NEET / Olympiads alongside the regular curriculum.",
      },
      {
        title: "Student leadership council",
        text: "Elected student body that runs events, clubs, and represents peer feedback to staff.",
      },
    ],
  },
];

// ---- Parent testimonials (carousel content) ----
export const testimonials = [
  {
    quote:
      "Diamond Kids School gave our daughter a love for learning that we never expected. The teachers genuinely know every child by name.",
    name: "Ritika Sharma",
    role: "Parent, Grade 3",
  },
  {
    quote:
      "The campus feels safe and the communication from teachers is constant. We always know how our son's day went.",
    name: "Anil Mehta",
    role: "Parent, Grade 6",
  },
  {
    quote:
      "What stood out to us was the balance — strong academics without taking away from sports, art, and just being a kid.",
    name: "Sunita Verma",
    role: "Parent, Pre-Primary",
  },
];

// ---- Safety / trust section ----
export const safetyContent = {
  eyebrow: "Safe & Secure",
  title: "A campus parents can trust",
  description:
    "From CCTV-monitored corridors to verified transport staff and a dedicated nurse on campus, every part of the Diamond Kids School day is built around your child's safety.",
  ctaLabel: "View Our Safety Policy",
  ctaTo: "/about/safety",
  points: [
    "24/7 CCTV monitoring across campus",
    "Background-verified staff & transport drivers",
    "On-campus nurse and tied-up hospital network",
    "RFID-based entry & exit tracking for students",
  ],
};

// ---- News / events section ----
export const newsItems = [
  {
    title: "Annual Sports Day 2026 — Save the Date",
    category: "Events",
    readTime: "3 min",
    to: "/news/sports-day-2026",
  },
  {
    title: "Diamond Kids Students Win State-Level Science Fair",
    category: "Achievements",
    readTime: "4 min",
    to: "/news/science-fair-win",
  },
  {
    title: "New Robotics Lab Opens for Grades 6–10",
    category: "Academics",
    readTime: "2 min",
    to: "/news/robotics-lab",
  },
];

// ---- Footer link groups ----
export const footerLinks = {
  Academics: [
    { label: "Pre-Primary", to: "/academics/pre-primary" },
    { label: "Primary", to: "/academics/primary" },
    { label: "Middle & Senior", to: "/academics/middle-senior" },
  ],
  School: [
    { label: "About Us", to: "/about" },
    { label: "Faculty", to: "/about/faculty" },
    { label: "Campus Tour", to: "/about/campus" },
    { label: "Careers", to: "/careers" },
  ],
  Admissions: [
    { label: "How to Apply", to: "/admissions" },
    { label: "Fee Structure", to: "/admissions/fees" },
    { label: "FAQs", to: "/admissions/faqs" },
  ],
  Resources: [
    { label: "News & Events", to: "/news" },
    { label: "Gallery", to: "/gallery" },
    { label: "Contact Us", to: "/contact" },
  ],
};
