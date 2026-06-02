import { motion } from "motion/react";
import { Mail, Phone } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Contact() {
  return (
    <section id="contact" className="relative min-h-screen w-full overflow-hidden bg-black py-32 flex items-center justify-center">
      {/* subtle radial gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,#161616_0%,#0a0a0a_40%,#000_100%)]" />

      <div className="relative z-10 w-full max-w-5xl px-8">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
          className="mb-16 text-center text-[11px] uppercase tracking-[0.3em] text-white/50"
        >
          Let's Connect — Get in Touch
        </motion.div>

        {/* main heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease }}
          className="mb-20 text-center"
        >
          <h2
            className="text-white"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontSize: "clamp(3rem, 8vw, 8rem)",
              lineHeight: 0.95,
              fontWeight: 300,
            }}
          >
            Get in
          </h2>
          <h2
            className="text-white"
            style={{
              fontSize: "clamp(3rem, 12vw, 12rem)",
              lineHeight: 0.82,
              fontWeight: 100,
              letterSpacing: "-0.04em",
            }}
          >
            TOUCH
          </h2>
        </motion.div>

        {/* contact cards */}
        <div className="flex flex-col gap-6 md:flex-row md:gap-8">
          {/* Email Card */}
          <motion.a
            href="mailto:manavsingh54610@gmail.com"
            data-magnetic
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease, delay: 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group relative flex-1 overflow-hidden rounded-lg p-8 backdrop-blur-2xl transition-all duration-500"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.06) 100%)",
              boxShadow:
                "0 20px 50px -15px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 0 rgba(255,255,255,0.15), inset 0 0 20px 0 rgba(255,255,255,0.03)",
            }}
          >
            {/* reflective border ring */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-lg"
              style={{
                padding: 1,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.05) 55%, rgba(255,255,255,0.3) 80%, rgba(255,255,255,0.5) 100%)",
                WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            {/* moving sheen on hover */}
            <motion.span
              aria-hidden
              initial={{ x: "-120%" }}
              animate={{ x: "220%" }}
              transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}
              className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
            />

            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/15">
                <Mail className="h-5 w-5 text-white/80" strokeWidth={1.5} />
              </div>
              <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-white/50">
                Email
              </div>
              <div
                className="text-white/90 transition-colors duration-300 group-hover:text-white"
                style={{ fontSize: "1.1rem", letterSpacing: "-0.01em" }}
              >
                manavsingh54610@gmail.com
              </div>
            </div>
          </motion.a>

          {/* Phone Card */}
          <motion.a
            href="tel:7217772730"
            data-magnetic
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease, delay: 0.2 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group relative flex-1 overflow-hidden rounded-lg p-8 backdrop-blur-2xl transition-all duration-500"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.06) 100%)",
              boxShadow:
                "0 20px 50px -15px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 0 rgba(255,255,255,0.15), inset 0 0 20px 0 rgba(255,255,255,0.03)",
            }}
          >
            {/* reflective border ring */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-lg"
              style={{
                padding: 1,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.05) 55%, rgba(255,255,255,0.3) 80%, rgba(255,255,255,0.5) 100%)",
                WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            {/* moving sheen on hover */}
            <motion.span
              aria-hidden
              initial={{ x: "-120%" }}
              animate={{ x: "220%" }}
              transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}
              className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
            />

            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/15">
                <Phone className="h-5 w-5 text-white/80" strokeWidth={1.5} />
              </div>
              <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-white/50">
                Phone
              </div>
              <div
                className="text-white/90 transition-colors duration-300 group-hover:text-white"
                style={{ fontSize: "1.1rem", letterSpacing: "0.02em" }}
              >
                +91 7217772730
              </div>
            </div>
          </motion.a>
        </div>

        {/* bottom text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease, delay: 0.4 }}
          className="mt-16 text-center text-[10px] uppercase tracking-[0.3em] text-white/40"
        >
          Always open to new opportunities and collaborations
        </motion.div>
      </div>
    </section>
  );
}
