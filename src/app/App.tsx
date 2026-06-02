import "../styles/fonts.css";
import { motion } from "motion/react";
import { useState } from "react";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Gallery } from "./components/Gallery";
import { Contact } from "./components/Contact";
import { Nav, Footer } from "./components/Nav";
import { Noise } from "./components/Noise";
import { MagneticCursor } from "./components/MagneticCursor";
import { Loader } from "./components/Loader";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen w-full bg-[#0a0a0a] text-white antialiased"
      style={{ fontFamily: "'Inter', sans-serif", cursor: "none" }}
    >
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,#161616_0%,#0a0a0a_50%,#000_100%)]" />

      <div className="relative z-10">
        <Nav loaded={loaded} />
        <Hero loaded={loaded} />
        <About />
        <Gallery />
        <Contact />
        <Footer />
      </div>

      <Noise />
      <MagneticCursor />

      <Loader onDone={() => setLoaded(true)} />
    </motion.div>
  );
}
