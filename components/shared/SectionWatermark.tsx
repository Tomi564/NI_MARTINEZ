"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function useShowOnDesktop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (hover: hover)");
    const onChange = () => setShow(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return show;
}

export default function SectionWatermark() {
  const show = useShowOnDesktop();

  if (!show) return null;

  return (
    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 max-md:hidden">
      <motion.span
        className="select-none font-condensed text-[120px] font-black leading-none"
        style={{
          color: "rgba(255,255,255,0.04)",
          zIndex: 0,
          fontFamily: "Saira Condensed",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          letterSpacing: "0.1em",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        NEUMATICOS
      </motion.span>
    </div>
  );
}
