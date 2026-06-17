"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const banners = [
  {
    id: 1,
    monitor: "/images/banners/banner-monitor-1.webp",
    tablet: "/images/banners/banner-tablet-1.webp",
    celular: "/images/banners/banner-celular-1.webp",
    alt: "Promoción 1",
  },
  {
    id: 2,
    monitor: "/images/banners/banner-monitor-2.webp",
    tablet: "/images/banners/banner-tablet-2.webp",
    celular: "/images/banners/banner-celular-2.webp",
    alt: "Promoción 2",
  },
  {
    id: 3,
    monitor: "/images/banners/banner-monitor-3.webp",
    tablet: "/images/banners/banner-tablet-3.webp",
    celular: "/images/banners/banner-celular-3.webp",
    alt: "Promoción 3",
  },
  {
    id: 4,
    monitor: "/images/banners/banner-monitor-4.webp",
    tablet: "/images/banners/banner-tablet-4.webp",
    celular: "/images/banners/banner-celular-4.webp",
    alt: "Promoción 4",
  },
] as const;

const AUTO_INTERVAL_MS = 4000;

export default function BannersCarrusel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [timerKey, setTimerKey] = useState(0);

  const activeBanner = banners[activeIndex];

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
    setTimerKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    }, AUTO_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [timerKey]);

  return (
    <section className="group relative w-full overflow-hidden bg-navy">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeBanner.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="relative w-full [aspect-ratio:4/3] md:[aspect-ratio:768/360] lg:[aspect-ratio:1280/400]"
        >
          <BannerSlide
            monitor={activeBanner.monitor}
            tablet={activeBanner.tablet}
            celular={activeBanner.celular}
            alt={activeBanner.alt}
            priority={activeIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {banners.map((banner, index) => (
          <button
            key={banner.id}
            type="button"
            aria-label={`Ir al banner ${index + 1}`}
            onClick={() => goTo(index)}
            className="p-1"
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`block h-2 rounded-full ${
                index === activeIndex ? "bg-orange" : "bg-[rgba(255,255,255,0.4)]"
              }`}
              style={{ width: index === activeIndex ? 24 : 8 }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

function BannerSlide({
  monitor,
  tablet,
  celular,
  alt,
  priority = false,
}: {
  monitor: string;
  tablet: string;
  celular: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <picture className="block h-full w-full">
      <source media="(max-width: 767px)" srcSet={celular} type="image/webp" />
      <source media="(max-width: 1023px)" srcSet={tablet} type="image/webp" />
      <img
        src={monitor}
        alt={alt}
        className="block h-full w-full object-cover object-center"
        loading={priority ? "eager" : "lazy"}
      />
    </picture>
  );
}
