import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUp, ChevronRight, Clock, Phone } from "lucide-react";
import Footer_image from "../assets/Footer_image.jpg";
import logo from "../assets/logo.png";
import { mainNavLinks, footerContact, footerLegalLinks } from "./schoolData";
import Reveal from "./ui/Reveal";

// Round social button (WhatsApp / YouTube) — hover par spring ke saath bada hota hai
function SocialButton({ href, label, hoverClass, children }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.15, rotate: -6 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
      className={`flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-colors duration-200 ${hoverClass}`}
    >
      <span className="sr-only">{label}</span>
      {children}
    </motion.a>
  );
}

function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative mt-0 bg-navy text-white">
      {/* Footer ke upar behti hui wave. Do periods ka path hai, isliye -50% translate seamless loop banta hai */}
      <div className="pointer-events-none absolute -top-[39px] left-0 h-10 w-full overflow-hidden" aria-hidden="true">
        <svg viewBox="0 0 2880 80" preserveAspectRatio="none" className="h-full w-[200%] animate-wave fill-navy">
          <path d="M0 40 Q 180 0 360 40 T 720 40 T 1080 40 T 1440 40 T 1800 40 T 2160 40 T 2520 40 T 2880 40 V 80 H 0 Z" />
        </svg>
      </div>

      {/* Background glow (sirf design) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-coral/15 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-sage/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pt-14 pb-8 sm:px-6 lg:px-8 lg:pt-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-14">
          {/* LEFT: Branding image */}
          <Reveal className="w-full lg:w-1/3">
            <Link to="/" className="mb-5 flex items-center gap-3">
              <img src={logo} alt="Diamond Kids School logo" className="h-12 w-12" />
              <span className="font-serif text-lg font-bold uppercase tracking-tight">Diamond Kids School</span>
            </Link>

            <div className="group relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-2 translate-y-2 rounded-se-3xl rounded-es-3xl bg-gold transition-transform duration-300 group-hover:translate-x-3.5 group-hover:translate-y-3.5"
              />
              <img
                alt="Company Branding"
                src={Footer_image}
                className="relative h-40 w-full rounded-se-3xl rounded-es-3xl object-cover sm:h-48"
              />
            </div>
          </Reveal>

          {/* RIGHT: Contact, Quick Links, Social */}
          <div className="grid flex-1 grid-cols-1 gap-10 sm:grid-cols-2">
            {/* Column 1: Contact */}
            <Reveal delay={0.1}>
              <p className="text-xs font-bold uppercase tracking-widest text-gold">Contact us</p>

              <div className="mt-4 space-y-1">
                {footerContact.phones.map((phone) => (
                  <a
                    key={phone.href}
                    href={phone.href}
                    className="group flex items-center gap-3 text-xl font-medium transition-colors hover:text-coral sm:text-2xl"
                  >
                    <Phone size={18} className="shrink-0 text-coral transition-transform duration-300 group-hover:rotate-12" />
                    {phone.label}
                  </a>
                ))}
              </div>

              <ul className="mt-5 space-y-2 text-sm text-white/70">
                {footerContact.hours.map((line) => (
                  <li key={line} className="flex items-center gap-2">
                    <Clock size={14} className="shrink-0 text-sage" />
                    {line}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex gap-4">
                <SocialButton href={footerContact.whatsapp} label="WhatsApp" hoverClass="hover:bg-green-500">
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.488-1.761-1.663-2.06-.175-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </SocialButton>

                <SocialButton href={footerContact.youtube} label="YouTube" hoverClass="hover:bg-red-600">
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </SocialButton>
              </div>
            </Reveal>

            {/* Column 2: Quick Links */}
            <Reveal delay={0.2}>
              <p className="text-xs font-bold uppercase tracking-widest text-gold">Quick Links</p>
              <ul className="mt-4 space-y-3 text-sm">
                {mainNavLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="group inline-flex items-center gap-1 text-white/75 transition-all duration-200 hover:translate-x-1 hover:text-coral"
                    >
                      <ChevronRight size={14} className="-ml-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* BOTTOM ROW: T&C, Privacy Policy, Copyright */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-4 text-xs">
              {footerLegalLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.to} className="text-white/55 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="text-xs text-white/55">
              &copy; 2026. Diamond Kids School . All rights reserved.
            </p>

            <motion.button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-10 w-10 items-center justify-center self-start rounded-full bg-coral text-white shadow-lg shadow-coral/30 sm:self-auto"
            >
              <ArrowUp size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
