"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedPriceProps {
  price: number;
  className?: string;
}

export default function AnimatedPrice({ price, className }: AnimatedPriceProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, price, {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplayValue(Math.round(v)),
    });
    return controls.stop;
  }, [isInView, price]);

  return (
    <span ref={ref} className={className}>
      ${displayValue.toLocaleString("es-AR")}
    </span>
  );
}
