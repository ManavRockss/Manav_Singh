import { AnimatePresence, motion, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Loader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v).toString().padStart(3, "0"));

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 2.4,
      ease: [0.7, 0, 0.3, 1],
    });
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 1100);
    }, 2600);
    return () => {
      controls.stop();
      clearTimeout(t);
    };
  }, [count, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease }}
          className="fixed inset-0 z-[300] flex flex-col bg-[#0a0a0a]"
        >
          {/* soft radial depth */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,#161616_0%,#0a0a0a_55%,#000_100%)]" />

          {/* subtle grain */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
            }}
          />

          {/* top eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.1 }}
            className="relative flex items-center justify-between px-8 py-6 text-[10px] uppercase tracking-[0.3em] text-white/50"
          >
            <span>Index — 026</span>
            <span>UI / UX · Portfolio</span>
          </motion.div>

          {/* center mark */}
          <div className="relative flex flex-1 flex-col items-center justify-center px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease, delay: 0.15 }}
              className="relative flex flex-col items-center"
            >
              {/* glassy halo */}
              <motion.div
                aria-hidden
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.8, ease, delay: 0.2 }}
                className="absolute -inset-x-20 -inset-y-16 rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 35%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              <div className="relative flex items-baseline gap-3">
                <span
                  className="italic text-white/60"
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontWeight: 300,
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    lineHeight: 1,
                  }}
                >
                  m.
                </span>
                <span
                  className="text-white"
                  style={{
                    fontWeight: 200,
                    letterSpacing: "0.4em",
                    fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
                  }}
                >
                  MANAV
                </span>
              </div>

              {/* progress line */}
              <div className="relative mt-10 h-px w-[min(60vw,440px)] overflow-hidden bg-white/8">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 2.4, ease: [0.7, 0, 0.3, 1] }}
                  style={{ transformOrigin: "left" }}
                  className="absolute inset-0 origin-left bg-gradient-to-r from-white/30 via-white to-white/30"
                />
              </div>

              {/* counter */}
              <div className="mt-6 flex w-[min(60vw,440px)] items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/50">
                <motion.span>{rounded}</motion.span>
                <span>Loading · Studio</span>
              </div>
            </motion.div>
          </div>

          {/* bottom marquee word */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease, delay: 0.5 }}
            className="relative overflow-hidden pb-10"
          >
            <motion.div
              initial={{ x: "5%" }}
              animate={{ x: "-5%" }}
              transition={{ duration: 6, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
              className="flex whitespace-nowrap text-white/[0.04]"
              style={{
                fontSize: "clamp(4rem, 14vw, 14rem)",
                fontWeight: 100,
                letterSpacing: "-0.05em",
                lineHeight: 1,
              }}
            >
              PORTFOLIO · DESIGNER · PORTFOLIO · DESIGNER
            </motion.div>
          </motion.div>

          {/* exit reveal — black sheet slides up */}
          <motion.div
            aria-hidden
            initial={{ y: "100%" }}
            exit={{ y: 0 }}
            transition={{ duration: 1, ease }}
            className="pointer-events-none absolute inset-0 bg-black"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
