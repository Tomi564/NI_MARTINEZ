"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function TireTrackGraphic() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0, 0.12, 0.12, 0]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.svg
        className="absolute right-0 top-0 h-full w-[160px]"
        viewBox="0 0 120 800"
        preserveAspectRatio="none"
        style={{ opacity }}
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.rect
            key={i}
            x={i % 2 === 0 ? 20 : 50}
            y={i * 22}
            width={50}
            height={16}
            rx={2}
            fill="white"
            style={{ pathLength }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: i * 0.02 }}
          />
        ))}
      </motion.svg>
    </div>
  );
}

export default function TireTrack() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (hover: hover)");
    const onChange = () => setShow(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (!show) return null;

  return <TireTrackGraphic />;
}
