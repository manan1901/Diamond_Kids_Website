import logo from '../assets/logo.png'
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Calendar", to: "/calendar" },
  { label: "Online Fee Payment", to: "/online-fee-payment" },
  { label: "Admissions", to: "/admissions" }, // Points to Admissions
  { label: "Gallery", to: "/gallery" },
  { label: "Notice Board & Events", to: "/notice-board-events" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-[#FF6B4A]" : "text-[#1B2A4A] hover:text-[#FF6B4A]"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-[#FDF8F0]/90 backdrop-blur-md border-b border-[#1B2A4A]/10">
      <div className='h-7 bg-[rgb(54,88,248)] text-center text-white w-full py-1 text-sm font-semibold'> 
        <div className="absolute right-full whitespace-nowrap motion-translate-x-loop-[calc(100vw_+_100%)] motion-duration-[60s] motion-ease-linear">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap');
          </style>
          Admission Open 2025-26 | 
          {/* CHANGED: Wrapped "Apply Now" in a Link pointing to /admissions */}
          <Link to="/admissions" className="underline ml-1 hover:text-[#FF6B4A]">
            Apply Now
          </Link>          
        </div>
      </div> 
      <nav className="max-w-7xl mx-auto px-5 md:px-8 h-18 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="flex w-auto h-auto py-1 justify-center lg:justify-between">
            <span className="sr-only">Home</span>
            <img src={logo} className="w-15 h-15" alt="Logo" />
          </div>
          <span className="font-serif text-lg uppercase font-bold text-slate-600 drop-shadow-md tracking-tight">
            Diamond Kids School
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={linkClasses} end={link.to === "/"}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ALREADY CORRECT: Points to /admissions */}
        <Link
          to="/admissions"
          className="hidden sm:w-auto md:inline-flex items-center justify-center rounded-full bg-[#1B2A4A] text-white text-sm font-medium px-5 py-2.5 hover:bg-[#17dd45] hover:text-black transition-colors duration-200 motion-preset-oscillate-lg motion-reset hover:motion-running"
        >
          Enroll Now
        </Link>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          className="md:hidden text-[#1B2A4A]"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-[#1B2A4A]/10 bg-[#FDF8F0]"
          >
            <ul className="flex flex-col px-5 py-4 gap-4">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={linkClasses}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li>
                {/* ALREADY CORRECT: Points to /admissions */}
                <Link
                  to="/admissions"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex w-full justify-center rounded-full bg-[#1B2A4A] text-white text-sm font-medium px-5 py-2.5 hover:bg-[#17dd45] hover:text-black transition-colors duration-200 motion-preset-oscillate-lg motion-reset hover:motion-running"
                >
                  Enroll Now
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;