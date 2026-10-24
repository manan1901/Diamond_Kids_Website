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


// =============================================================
// NEW DATA (edit yahin se — components ko chhune ki zaroorat nahi)
// =============================================================

// ---- Navbar + Footer ke "Quick Links" dono yahin se aate hain ----
export const mainNavLinks = [
  { label: "Home", to: "/" },
  { label: "Calendar", to: "/calendar" },
  { label: "Online Fee Payment", to: "/online-fee-payment" },
  { label: "Admissions", to: "/admissions" },
  { label: "Gallery", to: "/gallery" },
  { label: "Notice Board", to: "/notice-board" },
];

// ---- Online Fee Payment ----
// SAMPLE amounts hain. Apni real fee structure se replace kar lena.
export const feeTypes = [
  { id: "tuition", label: "Tuition Fee", amount: 12000, hint: "Quarterly" },
  { id: "transport", label: "Transport Fee", amount: 3000, hint: "Quarterly" },
  { id: "activity", label: "Activity Fee", amount: 1500, hint: "Annual" },
  { id: "exam", label: "Exam Fee", amount: 800, hint: "Per term" },
  { id: "other", label: "Other / Custom", amount: 0, hint: "Enter amount" },
];

export const classOptions = [
  "Nursery", "LKG", "UKG",
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6",
  "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12",
];

// ---- Notice Board ----
// SAMPLE notices hain — apne real notices se replace karo.
// Naya notice add karne ke liye bas ek object is array me daal do.
//   date     : "YYYY-MM-DD" — notice publish hone ki date (7 din se purane nahi to "New" badge dikhta hai)
//   pinned   : true => page ke top par pinned section me dikhega
//   link     : optional (PDF / Google Drive link), "Open attachment" button banega
export const noticeCategories = ["All", "Events", "Academics", "Holidays", "Fees", "General"];

export const notices = [
  {
    id: "n1",
    title: "Annual Sports Day — Save the Date",
    category: "Events",
    date: "2026-10-23",
    pinned: true,
    summary: "Our Annual Sports Day will be held on campus. All students are encouraged to participate.",
    details:
      "Annual Sports Day will be held on the school grounds from 9:00 am onwards. Students should report in their house colour t-shirts and sports shoes. Parents are warmly invited to cheer for the children. Event-wise entry forms are available with class teachers.",
    link: "",
  },
  {
    id: "n2",
    title: "Parent–Teacher Meeting",
    category: "Academics",
    date: "2026-10-22",
    pinned: true,
    summary: "PTM for all classes. Please collect the progress report from your child's class teacher.",
    details:
      "The Parent–Teacher Meeting will be held between 9:00 am and 12:00 pm. Parents are requested to come on their allotted time slot, shared by the class teacher, to avoid waiting. Students must accompany their parents.",
    link: "",
  },
  {
    id: "n3",
    title: "Diwali Holidays",
    category: "Holidays",
    date: "2026-10-20",
    pinned: false,
    summary: "School will remain closed for the Diwali break. Classes resume after the holidays.",
    details:
      "On the occasion of Diwali, the school will remain closed for the festival break. Holiday homework has been shared through class teachers. Regular classes will resume on the first working day after the break. Wishing all families a safe and joyful Diwali!",
    link: "",
  },
  {
    id: "n4",
    title: "Quarterly Fee Payment Reminder",
    category: "Fees",
    date: "2026-10-15",
    pinned: false,
    summary: "Parents are requested to pay the quarterly fee before the due date using Online Fee Payment.",
    details:
      "The quarterly fee can now be paid online through UPI from the Online Fee Payment page. Please keep the admission number of your child handy. A receipt is generated immediately after a successful payment.",
    link: "",
  },
  {
    id: "n5",
    title: "Science Exhibition — Project Registration",
    category: "Academics",
    date: "2026-10-12",
    pinned: false,
    summary: "Students of Class 6 to 10 can register their working models and projects with the science department.",
    details:
      "Students of Class 6 to 10 may register their projects with the science department. Projects can be individual or in groups of up to three. Guidance sessions will be held every Wednesday during the activity period.",
    link: "",
  },
  {
    id: "n6",
    title: "Children's Day Celebration",
    category: "Events",
    date: "2026-10-08",
    pinned: false,
    summary: "A day full of games, performances and surprises for our little diamonds.",
    details:
      "We will celebrate Children's Day with fun games, music and dance performances by teachers. Students may come in colourful casual clothes on this day. Regular lessons will be replaced by activities.",
    link: "",
  },
  {
    id: "n7",
    title: "Winter Uniform Guidelines",
    category: "General",
    date: "2026-10-01",
    pinned: false,
    summary: "Winter uniform will be applicable from next month. Please check the guidelines.",
    details:
      "The winter uniform is applicable from next month. Only navy blue sweaters and blazers with the school logo are allowed. Parents may contact the school office in case of any difficulty in getting the uniform.",
    link: "",
  },
];

// ---- Gallery ----
// Har event ek carousel banta hai. Photos 3 tareeke se add ho sakti hain
// (teeno saath me bhi chalte hain):
//
//  1) FOLDER (sabse aasaan): photos ko `src/assets/gallery/<event id>/` folder me
//     daal do — jaise `src/assets/gallery/sports-day/pic1.jpg`. Apne aap dikhengi.
//  2) `photos: ["https://.../a.jpg", ...]` — direct image links.
//  3) `albumUrl`: Google Drive folder link => page ke andar hi grid me dikhega.
//     Google Photos album link => "View full album" button banega
//     (Google Photos apne albums ko kisi website me embed hone nahi deta).
//
// Naya event: ek object add karo + (agar folder use karna hai) usi `id` ka folder banao.
export const galleryEvents = [
  { id: "sports-day", title: "Annual Sports Day", date: "", description: "", photos: [], albumUrl: "" },
  { id: "science-exhibition", title: "Science Exhibition", date: "", description: "", photos: [], albumUrl: "" },
  { id: "annual-function", title: "Annual Function", date: "", description: "", photos: [], albumUrl: "" },
  { id: "childrens-day", title: "Children's Day", date: "", description: "", photos: [], albumUrl: "" },
  { id: "independence-day", title: "Independence Day", date: "", description: "", photos: [], albumUrl: "" },
];

// ---- Footer ----
export const footerContact = {
  phones: [
    { label: "+91-9694132733", href: "tel:+919694132733" },
    { label: "+91-9829133136", href: "tel:+919829133136" },
  ],
  hours: ["Monday to Friday: 8:00am - 5:00pm", "Weekend: 8:00am - 2:00pm"],
  whatsapp: "https://wa.me/qr/2LMA37Z4VHLRK1",
  youtube: "https://www.youtube.com/@diamondkidsschool2951",
};

export const footerLegalLinks = [
  { label: "Terms & Conditions", to: "#" },
  { label: "Privacy Policy", to: "#" },
  { label: "Cookies", to: "#" },
];
