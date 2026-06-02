import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import img1 from "../../imports/image-13.png";
import img2 from "../../imports/image-5.png";
import img3 from "../../imports/image-6.png";
import img4 from "../../imports/image-12.png";
import img5 from "../../imports/image-8.png";
import img6 from "../../imports/image-9.png";
import img7 from "../../imports/image-10.png";

type Project = {
  src: string;
  title: string;
  link: string;
  year: string;
};

const PROJECTS: Project[] = [
  {
    src: img3,
    title: "Court Click Landing Page Case Study",
    link: "https://www.behance.net/gallery/248982515/Court-Click-Landing-Page-Case-Study",
    year: "2025",
  },
  {
    src: img2,
    title: "MindShift (Smart Habit Interrupter) Case Study",
    link: "https://www.behance.net/gallery/245110199/MindShift-(Smart-Habit-Interrupter)-Case-Study",
    year: "2024",
  },
  {
    src: img4,
    title: "Designing a Smarter B2B Reordering Experience",
    link: "https://www.behance.net/gallery/250136889/Designing-a-Smarter-B2B-Reordering-Experience",
    year: "2025",
  },
  {
    src: img1,
    title: "Bookstop-Platform for sharing books (UX Case Study)",
    link: "https://www.behance.net/gallery/219208325/Bookstop-Platform-for-sharing-books-(UX-Case-Study)",
    year: "2024",
  },
  {
    src: img5,
    title: "Illustration of a 3D Paint Brush",
    link: "https://www.behance.net/gallery/230509001/Illustration-of-a-3D-Paint-Brush",
    year: "2026",
  },
  {
    src: img6,
    title: "Redesign of TUF(Take You Forward)",
    link: "https://www.behance.net/gallery/230505899/Redesign-of-TUF(Take-You-Forward)",
    year: "2026",
  },
  {
    src: img7,
    title: "Redesign of Prevacare",
    link: "https://www.behance.net/gallery/230506707/Redesign-of-Prevacare",
    year: "2026",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

function Card({ p, i }: { p: Project; i: number }) {
  const [hover, setHover] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const maskImage = useMotionTemplate`radial-gradient(circle 250px at ${mouseX}px ${mouseY}px, black, transparent)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.a
      href={p.link}
      target="_blank"
      rel="noopener noreferrer"
      data-magnetic
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.4, ease, delay: i * 0.05 }}
      className="relative flex shrink-0 flex-col gap-4 cursor-pointer w-full md:w-[45vw] md:min-w-[450px] md:max-w-[650px]"
    >
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/40">
        <span>0{i + 1} / 0{PROJECTS.length}</span>
        <span>{p.year}</span>
      </div>

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        animate={{ scale: hover ? 1.02 : 1 }}
        transition={{ duration: 0.8, ease }}
        className="relative aspect-[4/3] overflow-hidden bg-neutral-950 ring-1 ring-white/5 p-3 md:p-4"
      >
        {/* Grayscale base layer */}
        <motion.div
          animate={{ scale: hover ? 1.04 : 1 }}
          transition={{ duration: 1.4, ease }}
          className="absolute inset-4 flex items-center justify-center"
          style={{ filter: "grayscale(1) saturate(0) contrast(1.1)" }}
        >
          <img
            src={p.src}
            alt={p.title}
            className="h-full w-full object-contain"
          />
        </motion.div>

        {/* Color layer with radial mask */}
        <motion.div
          animate={{
            scale: hover ? 1.04 : 1,
            opacity: hover ? 1 : 0,
          }}
          transition={{ duration: 0.8, ease }}
          className="absolute inset-4 flex items-center justify-center"
          style={{
            filter: "grayscale(0) saturate(1.35) contrast(1.05)",
            maskImage,
            WebkitMaskImage: maskImage,
          }}
        >
          <img
            src={p.src}
            alt={p.title}
            className="h-full w-full object-contain"
          />
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.6, ease }}
          className="pointer-events-none absolute inset-0 bg-black/20"
        />

        <motion.div
          initial={false}
          animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 10 }}
          transition={{ duration: 0.6, ease }}
          className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none"
        >
          <div
            className="text-white text-sm leading-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            View Case Study
          </div>
        </motion.div>
      </motion.div>

      <div
        className="text-white/70 leading-tight"
        style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.1rem", fontStyle: "italic" }}
      >
        {p.title}
      </div>
    </motion.a>
  );
}

export function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const targetX = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 60, damping: 22, mass: 0.7 });
  const transform = useTransform(x, (v) => `translate3d(${v}px,0,0)`);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const calc = () => {
      if (!trackRef.current) return;
      const w = trackRef.current.scrollWidth - window.innerWidth;
      setMaxScroll(w);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const el = trackRef.current?.parentElement?.parentElement;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const inView = r.top < window.innerHeight * 0.4 && r.bottom > window.innerHeight * 0.6;
      if (!inView) return;
      const dom = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const next = Math.min(0, Math.max(-maxScroll, targetX.get() - dom));
      if (next !== targetX.get()) {
        e.preventDefault();
        targetX.set(next);
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [maxScroll, targetX]);

  const nudge = (dir: -1 | 1) => {
    const step = window.innerWidth * 0.4;
    targetX.set(Math.min(0, Math.max(-maxScroll, targetX.get() - dir * step)));
  };

  return (
    <section id="gallery" className="relative min-h-screen w-full overflow-hidden bg-black py-16 md:py-32 scroll-mt-0">
      {/* eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
        className="mb-12 md:mb-20 flex items-end justify-between px-[18px] md:px-8"
      >
        <div className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-white/50">
          Selected Works
        </div>
        <div className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-white/50">
          2024 / 2026
        </div>
      </motion.div>

      {/* horizontal track - desktop only */}
      <div className="relative overflow-hidden hidden md:block">
        <motion.div
          ref={trackRef}
          style={{ transform }}
          className="flex gap-6 px-8 will-change-transform"
        >
          {PROJECTS.map((p, i) => (
            <Card key={p.title} p={p} i={i} />
          ))}
          <div className="shrink-0" style={{ width: "20vw" }} />
        </motion.div>
      </div>

      {/* vertical stack - mobile only */}
      <div className="md:hidden flex flex-col gap-12 px-[18px]">
        {PROJECTS.map((p, i) => (
          <Card key={p.title} p={p} i={i} />
        ))}
      </div>

      {/* controls - desktop only */}
      <div className="mt-20 hidden md:flex items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <button
            data-magnetic
            onClick={() => nudge(-1)}
            className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/[0.02] backdrop-blur-md transition-all duration-500 hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 text-white/70 transition-transform duration-500 group-hover:-translate-x-0.5" />
          </button>
          <button
            data-magnetic
            onClick={() => nudge(1)}
            className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/[0.02] backdrop-blur-md transition-all duration-500 hover:bg-white/10"
          >
            <ArrowRight className="h-4 w-4 text-white/70 transition-transform duration-500 group-hover:translate-x-0.5" />
          </button>
        </div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
          Scroll · Drag · Inertia
        </div>
      </div>

      {/* huge typography */}
      <div className="relative mt-24 flex items-end justify-between px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease }}
          className="text-white"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
            fontSize: "clamp(4rem, 10vw, 11rem)",
            lineHeight: 0.9,
            fontWeight: 300,
          }}
        >
          07
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease, delay: 0.1 }}
          className="text-right text-white"
          style={{
            fontSize: "clamp(4rem, 18vw, 22rem)",
            lineHeight: 0.82,
            fontWeight: 100,
            letterSpacing: "-0.05em",
          }}
        >
          GALLERY
        </motion.div>
      </div>
    </section>
  );
}
