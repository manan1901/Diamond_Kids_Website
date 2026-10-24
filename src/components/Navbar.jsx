import logo from '../assets/logo.png'
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mainNavLinks as navLinks } from "./schoolData";
import MagneticButton from "./ui/MagneticButton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll karne par navbar par halka shadow aa jaata hai
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mobileLinkClasses = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-coral" : "text-navy hover:text-coral"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 bg-sand/90 backdrop-blur-md border-b border-navy/10 transition-shadow duration-300 ${
        isScrolled ? "shadow-lg shadow-navy/10" : ""
      }`}
    >
      <div className='h-7 bg-[rgb(54,88,248)] text-center text-white w-full py-1 text-sm font-semibold'> 
        <div className="absolute right-full whitespace-nowrap motion-translate-x-loop-[calc(100vw_+_100%)] motion-duration-[60s] motion-ease-linear">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap');
          </style>
          Admission Open 2026-27 | 
          <Link to="/admissions" className="underline ml-1 hover:text-coral">
            Apply Now
          </Link>          
        </div>
      </div> 
      <nav className="max-w-7xl mx-auto px-5 md:px-8 h-18 flex items-center justify-between">
        <Link to="/" className="group flex items-center gap-2 shrink-0">
          <div className="flex w-auto h-auto py-1 justify-center lg:justify-between">
            <span className="sr-only">Home</span>
            <img
              src={logo}
              className="w-15 h-15 transition-transform duration-500 group-hover:rotate-[360deg]"
              alt="Logo"
            />
          </div>
          <span className="font-serif text-lg uppercase font-bold text-slate-600 drop-shadow-md tracking-tight">
            Diamond Kids School
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === "/"} className="group relative block py-1 text-sm font-medium">
                {({ isActive }) => (
                  <>
                    <span className={`transition-colors duration-200 ${isActive ? "text-coral" : "text-navy group-hover:text-coral"}`}>
                      {link.label}
                    </span>
                    {/* Active link ke neeche coral line, jo ek link se doosre par slide karti hai */}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-coral"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    ) : (
                      <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 origin-left scale-x-0 rounded-full bg-coral/60 transition-transform duration-300 group-hover:scale-x-100" />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <MagneticButton className="hidden md:block">
          <Link
            to="/admissions"
            className="inline-flex items-center justify-center rounded-full bg-navy text-white text-sm font-medium px-5 py-2.5 hover:bg-[#17dd45] hover:text-black transition-colors duration-200 motion-preset-oscillate-lg motion-reset hover:motion-running"
          >
            Enroll Now
          </Link>
        </MagneticButton>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          className="md:hidden text-navy"
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
            className="md:hidden overflow-hidden border-t border-navy/10 bg-sand"
          >
            <ul className="flex flex-col px-5 py-4 gap-4">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={mobileLinkClasses}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
              <li>
                <Link
                  to="/admissions"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex w-full justify-center rounded-full bg-navy text-white text-sm font-medium px-5 py-2.5 hover:bg-[#17dd45] hover:text-black transition-colors duration-200 motion-preset-oscillate-lg motion-reset hover:motion-running"
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
