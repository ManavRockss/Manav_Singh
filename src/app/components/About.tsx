import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import portraitImg from "../../imports/image.png";

const ease = [0.22, 1, 0.36, 1] as const;

const DOMAINS = [
  "Ed Tech",
  "SaaS",
  "Legal Tech",
  "Food Tech",
  "Digital Wellbeing",
  "Digital Wealth Management",
];

const FOCUS = ["Layout", "Interaction", "Hierarchy", "Usability"];

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`inline-block overflow-hidden align-bottom ${className ?? ""}`}>
      <motion.span
        initial={{ y: "110%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease, delay }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

export function About() {
  return (
    <section className="relative w-full bg-black px-[18px] md:px-8 py-20 md:py-40">
      {/* eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
        className="mb-24 flex items-end justify-between"
      >
        <div className="text-[11px] uppercase tracking-[0.3em] text-white/50">
          About — 01
        </div>
        <div className="text-[11px] uppercase tracking-[0.3em] text-white/50">
          Designer · Independent
        </div>
      </motion.div>

      <div className="grid grid-cols-12 gap-8">
        {/* Portrait — left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease, delay: 0.2 }}
          className="order-1 col-span-12 lg:col-span-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease, delay: 0.25 }}
            className="relative aspect-[4/5] w-full overflow-hidden ring-1 ring-white/10"
          >
            <ImageWithFallback
              src={portraitImg}
              alt="Manav"
              className="h-full w-full object-cover grayscale contrast-110 transition-all duration-[1200ms] ease-out hover:grayscale-0 hover:saturate-125"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-[10px] uppercase tracking-[0.3em] text-white/70">
              <span>Manav</span>
              <span>Portrait · 026</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Editorial statement + paragraph — right, aligned to bottom of image */}
        <div className="relative order-2 col-span-12 flex flex-col justify-end gap-10 lg:col-span-8 lg:pl-12">
          {/* Schematic pattern overlay — fills the empty top space */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease, delay: 0.3 }}
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-[55%] lg:block"
          >
            {/* faint dot grid */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
                maskImage:
                  "radial-gradient(ellipse at 30% 40%, black 0%, transparent 75%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at 30% 40%, black 0%, transparent 75%)",
                opacity: 0.35,
              }}
            />

            {/* schematic SVG overlay */}
            <svg
              viewBox="0 0 800 400"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              <defs>
                <linearGradient id="strokeFade" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
                  <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="strokeFadeSoft" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="#fff" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#fff" stopOpacity="0.15" />
                  <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* horizontal rules with tick marks */}
              <g stroke="url(#strokeFade)" strokeWidth="1" fill="none">
                <line x1="0" y1="60" x2="520" y2="60" />
                <line x1="0" y1="160" x2="380" y2="160" />
                <line x1="0" y1="260" x2="620" y2="260" />
              </g>
              <g stroke="url(#strokeFadeSoft)" strokeWidth="1" fill="none">
                <line x1="40" y1="100" x2="760" y2="100" />
                <line x1="120" y1="220" x2="700" y2="220" />
              </g>

              {/* vertical accent */}
              <line
                x1="0"
                y1="20"
                x2="0"
                y2="320"
                stroke="#fff"
                strokeOpacity="0.15"
                strokeWidth="1"
              />

              {/* tick marks along the left vertical */}
              <g stroke="#fff" strokeOpacity="0.25" strokeWidth="1">
                <line x1="0" y1="60" x2="6" y2="60" />
                <line x1="0" y1="160" x2="6" y2="160" />
                <line x1="0" y1="260" x2="6" y2="260" />
              </g>

              {/* coordinate marker circles */}
              <g fill="none" stroke="#fff" strokeOpacity="0.22" strokeWidth="1">
                <circle cx="180" cy="60" r="3" />
                <circle cx="300" cy="160" r="3" />
                <circle cx="460" cy="260" r="3" />
                <circle cx="180" cy="60" r="10" strokeOpacity="0.1" />
                <circle cx="460" cy="260" r="10" strokeOpacity="0.1" />
              </g>

              {/* crosshair top-right */}
              <g stroke="#fff" strokeOpacity="0.18" strokeWidth="1">
                <line x1="700" y1="40" x2="740" y2="40" />
                <line x1="720" y1="20" x2="720" y2="60" />
                <circle cx="720" cy="40" r="2" fill="#fff" fillOpacity="0.3" />
              </g>
            </svg>

            {/* index labels */}
            <div
              className="absolute left-0 top-[15%] flex flex-col gap-[68px] text-[9px] uppercase tracking-[0.3em] text-white/35"
              style={{ fontFeatureSettings: "'tnum'" }}
            >
              <span>—— 01 / Layout</span>
              <span>—— 02 / Hierarchy</span>
              <span>—— 03 / Usability</span>
            </div>

            <div className="absolute right-2 top-2 text-[9px] uppercase tracking-[0.3em] text-white/30">
              N · 45.4642° · E · 9.1900°
            </div>
          </motion.div>
          <h2
            className="text-white"
            style={{
              fontWeight: 200,
              fontSize: "clamp(1.5rem, 5.2vw, 5.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            <Reveal delay={0}>I design</Reveal>{" "}
            <Reveal delay={0.05}>
              <span
                className="italic text-white/70"
                style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 300 }}
              >
                thoughtful,
              </span>
            </Reveal>{" "}
            <Reveal delay={0.1}>user-centric</Reveal>{" "}
            <Reveal delay={0.15}>digital experiences</Reveal>{" "}
            <Reveal delay={0.2}>— turning</Reveal>{" "}
            <Reveal delay={0.25}>complex ideas</Reveal>{" "}
            <Reveal delay={0.3}>into</Reveal>{" "}
            <Reveal delay={0.35}>
              <span
                className="italic text-white/70"
                style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 300 }}
              >
                clean,
              </span>
            </Reveal>{" "}
            <Reveal delay={0.4}>intuitive,</Reveal>{" "}
            <Reveal delay={0.45}>visually engaging</Reveal>{" "}
            <Reveal delay={0.5}>products.</Reveal>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease, delay: 0.5 }}
            className="max-w-2xl text-white/60 leading-relaxed text-sm md:text-base"
          >
            Most people open apps to use them. I open them to notice what's
            broken first — confusing flows, unnecessary steps, or tiny UX
            decisions that frustrate users without them realizing it. Somewhere
            along the way, that habit turned into a passion for designing
            experiences that feel simple, intuitive, and genuinely human.
          </motion.p>
        </div>
      </div>

      {/* Specs row */}
      <div className="mt-32 grid grid-cols-12 gap-8 border-t border-white/10 pt-12">
        <div className="col-span-12 md:col-span-3">
          <div className="mb-6 text-[10px] uppercase tracking-[0.3em] text-white/40">
            Focus
          </div>
          <ul className="space-y-2">
            {FOCUS.map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease, delay: i * 0.05 }}
                className="text-white/80"
              >
                — {f}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 md:col-span-5">
          <div className="mb-6 text-[10px] uppercase tracking-[0.3em] text-white/40">
            Domains
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {DOMAINS.map((d, i) => (
              <motion.li
                key={d}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease, delay: i * 0.05 }}
                className="text-white/80"
              >
                {d}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 md:col-span-4">
          <div className="mb-6 text-[10px] uppercase tracking-[0.3em] text-white/40">
            Currently
          </div>
          <p className="text-white/70">
            Initiating design systems, product thinking, and modern user
            experiences at GeeksforGeeks.
          </p>
        </div>
      </div>
    </section>
  );
}
