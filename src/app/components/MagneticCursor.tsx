import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function MagneticCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });
  const scaleMv = useMotionValue(1);
  const scale = useSpring(scaleMv, { stiffness: 200, damping: 20 });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      if (t && t.closest("[data-magnetic]")) {
        scaleMv.set(2.4);
      } else {
        scaleMv.set(1);
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y, scaleMv]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={{ x: sx, y: sy, scale, translateX: "-50%", translateY: "-50%" }}
      className="pointer-events-none fixed left-0 top-0 z-[200] hidden md:block"
    >
      <div className="h-3 w-3 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm" />
    </motion.div>
  );
}
