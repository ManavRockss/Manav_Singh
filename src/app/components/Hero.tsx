import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { ShaderCanvas } from "./ShaderCanvas";
import img1 from "../../imports/image-1.png";
import img2 from "../../imports/image-2.png";
import img3 from "../../imports/image-3.png";

// Tightly stacked — front fully visible, others peek at corners
const CARDS = [
  { src: img1, x: -70, y: 30, rot: -8, z: 1, depth: -22 },
  { src: img2, x: 70, y: 20, rot: 7, z: 2, depth: 26 },
  { src: img3, x: 0, y: 0, rot: -2, z: 3, depth: 12 },
];

const ease = [0.22, 1, 0.36, 1] as const;

function ParallaxCard({
  c,
  i,
  sx,
  sy,
  loaded,
}: {
  c: typeof CARDS[number];
  i: number;
  sx: any;
  sy: any;
  loaded: boolean;
}) {
  const depth = c.depth;
  const tx = useTransform(sx, (v: number) => v * depth);
  const ty = useTransform(sy, (v: number) => v * depth);
  const [hover, setHover] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [topZ, setTopZ] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const maskImage = useMotionTemplate`radial-gradient(circle 200px at ${mouseX}px ${mouseY}px, black, transparent)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      data-magnetic
      drag
      dragMomentum={false}
      dragElastic={0.18}
      onDragStart={() => {
        setDragging(true);
        setTopZ(true);
      }}
      onDragEnd={() => setDragging(false)}
      onHoverStart={() => {
        setHover(true);
        setTopZ(true);
      }}
      onHoverEnd={() => setHover(false)}
      initial={{ opacity: 0, y: 80, rotate: c.rot * 1.6, scale: 0.9 }}
      animate={{
        opacity: loaded ? 1 : 0,
        y: loaded ? c.y : 80,
        x: loaded ? c.x : 0,
        rotate: loaded ? (hover || dragging ? c.rot * 0.4 : c.rot) : c.rot * 1.6,
        scale: loaded ? (hover ? 1.05 : 1) : 0.9,
      }}
      transition={{ duration: 1.6, ease, delay: loaded ? 0.2 + i * 0.12 : 0 }}
      whileTap={{ cursor: "grabbing" }}
      style={{
        translateX: tx,
        translateY: ty,
        zIndex: topZ ? 5 : c.z,
        cursor: dragging ? "grabbing" : "grab",
      }}
      className="absolute"
    >
      <motion.div
        animate={{
          boxShadow: hover
            ? "0 70px 140px -20px rgba(0,0,0,0.95), 0 25px 50px -10px rgba(0,0,0,0.7), 0 8px 20px -4px rgba(0,0,0,0.5)"
            : "0 50px 100px -25px rgba(0,0,0,0.9), 0 20px 40px -12px rgba(0,0,0,0.65), 0 6px 14px -3px rgba(0,0,0,0.45)",
        }}
        transition={{ duration: 0.6, ease }}
        className="relative h-[44vh] w-[20vh] min-w-[170px] rounded-[6px] p-[14px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.32) 0%, rgba(200,200,200,0.16) 28%, rgba(90,90,90,0.10) 55%, rgba(220,220,220,0.22) 80%, rgba(255,255,255,0.35) 100%)",
          backdropFilter: "blur(22px) saturate(140%)",
          WebkitBackdropFilter: "blur(22px) saturate(140%)",
          boxShadow:
            "inset 0 1px 0 0 rgba(255,255,255,0.55), inset 0 -1px 0 0 rgba(255,255,255,0.15), inset 0 0 0 1px rgba(255,255,255,0.12), inset 0 0 30px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* glassy reflective border ring */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[6px]"
          style={{
            padding: 2,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(180,180,180,0.25) 30%, rgba(255,255,255,0.08) 52%, rgba(200,200,200,0.55) 78%, rgba(255,255,255,0.9) 100%)",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
        {/* top sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-3 top-[3px] h-[22%] rounded-t-[3px] bg-gradient-to-b from-white/50 to-transparent opacity-80"
        />
        {/* diagonal light streak */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[6px] overflow-hidden"
        >
          <span
            className="absolute -top-1/2 -left-1/4 h-[200%] w-1/3 -rotate-[20deg] bg-gradient-to-b from-transparent via-white/15 to-transparent"
          />
        </span>

        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className="relative h-full w-full overflow-hidden rounded-[1px] p-2"
        >
          {/* Grayscale base layer */}
          <motion.div
            animate={{
              scale: hover ? 1.04 : 1,
            }}
            transition={{ duration: 1.1, ease }}
            className="absolute inset-2 flex items-center justify-center"
            style={{ filter: "grayscale(1) saturate(0) contrast(1.1)" }}
          >
            <img
              src={c.src}
              alt="Design mockup"
              className="h-full w-full object-contain pointer-events-none select-none"
              draggable={false}
            />
          </motion.div>

          {/* Color layer with radial mask */}
          <motion.div
            animate={{
              scale: hover ? 1.04 : 1,
              opacity: hover || dragging ? 1 : 0,
            }}
            transition={{ duration: 0.8, ease }}
            className="absolute inset-2 flex items-center justify-center"
            style={{
              filter: "grayscale(0) saturate(1.35) contrast(1.05)",
              maskImage,
              WebkitMaskImage: maskImage,
            }}
          >
            <img
              src={c.src}
              alt="Design mockup"
              className="h-full w-full object-contain pointer-events-none select-none"
              draggable={false}
            />
          </motion.div>

          {/* Overlay gradient */}
          <motion.div
            animate={{ opacity: hover ? 0.15 : 0.35 }}
            transition={{ duration: 0.6, ease }}
            className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 pointer-events-none"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function Word({ children, delay = 0, loaded }: { children: React.ReactNode; delay?: number; loaded: boolean }) {
  return (
    <motion.span
      initial={{ y: "110%", opacity: 0, letterSpacing: "0.2em" }}
      animate={{
        y: loaded ? 0 : "110%",
        opacity: loaded ? 1 : 0,
        letterSpacing: loaded ? "-0.04em" : "0.2em"
      }}
      transition={{ duration: 1.6, ease, delay: loaded ? delay : 0 }}
      className="inline-block"
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.span>
  );
}

export function Hero({ loaded }: { loaded: boolean }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20, mass: 0.8 });
  const sy = useSpring(my, { stiffness: 50, damping: 20, mass: 0.8 });
  const [ctaHover, setCtaHover] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mx.set(nx);
      my.set(ny);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Stacked draggable cards */}
      <div className="absolute inset-0 z-[1] flex items-center justify-center">
        {CARDS.map((c, i) => (
          <ParallaxCard key={i} c={c} i={i} sx={sx} sy={sy} loaded={loaded} />
        ))}
      </div>

      {/* Headline */}
      <div className="pointer-events-none relative z-[10] flex h-full w-full flex-col items-center justify-center px-[18px] md:px-6 pt-24 text-center">
        <h1
          className="select-none leading-[0.85] text-white"
          style={{
            fontWeight: 200,
            fontSize: "clamp(1.8rem, 9vw, 9.5rem)",
            letterSpacing: "-0.04em",
            textShadow: "0 2px 40px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)",
          }}
        >
          <span className="block overflow-hidden">
            <Word delay={0.1} loaded={loaded}>
              <span
                className="italic"
                style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 300 }}
              >
                Hello,
              </span>{" "}
              <span className="opacity-70">I'm</span>
            </Word>
          </span>
          <span className="block overflow-hidden">
            <Word delay={0.35} loaded={loaded}>MANAV</Word>
          </span>
          <span className="block overflow-visible pb-[0.1em]">
            <Word delay={0.55} loaded={loaded}>
              <span className="opacity-70">UI/UX</span>{" "}
              <span
                className="italic"
                style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 300 }}
              >
                Designer
              </span>
            </Word>
          </span>
        </h1>

        {/* CTA */}
        <motion.button
          data-magnetic
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
          onClick={() => {
            const el = document.getElementById("contact");
            el?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 1.2, ease, delay: loaded ? 1 : 0 }}
          whileHover={{ y: -2 }}
          className="pointer-events-auto group relative mt-8 inline-flex items-center gap-3 overflow-hidden rounded-full px-6 py-3.5 text-black backdrop-blur-2xl transition-all duration-500"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0.6) 100%)",
            boxShadow:
              "0 20px 50px -15px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.25), inset 0 1px 0 0 rgba(255,255,255,0.9), inset 0 -1px 1px 0 rgba(255,255,255,0.4), inset 0 0 20px 0 rgba(255,255,255,0.15)",
          }}
        >
          {/* WebGL shader fill (on hover) */}
          <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
            <ShaderCanvas active={ctaHover} />
          </span>
          {/* frosted noise tint */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full bg-white/10"
            style={{ opacity: ctaHover ? 0 : 1, transition: "opacity 500ms ease" }}
          />
          {/* reflective border ring */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              padding: 1,
              background:
                "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.05) 55%, rgba(255,255,255,0.5) 80%, rgba(255,255,255,1) 100%)",
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
          {/* moving sheen */}
          <motion.span
            aria-hidden
            initial={{ x: "-120%" }}
            animate={{ x: "220%" }}
            transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.5 }}
            className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
          {/* top highlight */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-4 top-px h-1/2 rounded-full bg-gradient-to-b from-white/80 to-transparent"
          />

          <span
            className="relative text-[11px] uppercase tracking-[0.25em] transition-colors duration-500"
            style={{ color: ctaHover ? "#fff" : "rgba(0,0,0,0.9)", textShadow: ctaHover ? "0 1px 8px rgba(0,0,0,0.6)" : "none" }}
          >
            Get in touch
          </span>
          <motion.span
            aria-hidden
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 2, ease, repeat: Infinity }}
            className="relative flex h-6 w-6 items-center justify-center rounded-full bg-black/85 backdrop-blur-md"
            style={{
              boxShadow:
                "inset 0 1px 0 0 rgba(255,255,255,0.25), 0 4px 10px -2px rgba(0,0,0,0.4)",
            }}
          >
            <ArrowDown className="h-3 w-3 text-white" strokeWidth={1.5} />
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
}
