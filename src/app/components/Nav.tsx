import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Resume", href: "https://drive.google.com/file/d/1qQfqC_rf9-IkTX046AatGWndn2EW2_Ep/view?usp=sharing" },
  { label: "Behance", href: "https://www.behance.net/manavsingh24" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/manav-singh-68a722258/" },
];
const ease = [0.22, 1, 0.36, 1] as const;

export function Nav({ loaded }: { loaded: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : -10 }}
        transition={{ duration: 1.2, ease, delay: loaded ? 0.2 : 0 }}
        className="fixed left-0 right-0 top-0 z-50 overflow-hidden"
        style={{
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          background: "rgba(10,10,10,0.4)",
        }}
      >
        <div className="relative flex items-center justify-between px-[18px] md:px-8 py-6">
          <div className="flex items-baseline gap-2">
            <span
              className="italic text-white/60"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 300,
                fontSize: "1.5rem",
                lineHeight: 1,
              }}
            >
              m.
            </span>
            <span
              className="text-white/80"
              style={{
                fontWeight: 200,
                letterSpacing: "0.3em",
                fontSize: "0.65rem",
              }}
            >
              MANAV
            </span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  data-magnetic
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-block text-[11px] uppercase tracking-[0.3em] text-white/80 transition-opacity hover:text-white"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-500 ease-out group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-50 flex items-center justify-center w-10 h-10 text-white/80 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              className="flex flex-col items-center justify-center h-full gap-8 px-[18px]"
              onClick={(e) => e.stopPropagation()}
            >
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  onClick={() => setMenuOpen(false)}
                  className="text-white/80 hover:text-white text-2xl uppercase tracking-[0.2em] transition-colors"
                  style={{ fontWeight: 200 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 1.2 }}
      className="fixed bottom-0 left-0 right-0 z-40 flex items-end justify-between px-[18px] md:px-8 py-6 text-[10px] uppercase tracking-[0.3em] text-white/50 mix-blend-difference"
    >
      <div>UI / UX Designer</div>
      <div className="hidden sm:block">Delhi — India</div>
    </motion.footer>
  );
}
