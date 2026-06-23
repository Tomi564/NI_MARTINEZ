'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'

const slides = [
  {
    id: 1,
    monitor: '/images/hero/hero-monitor-1.webp',
    tablet:  '/images/hero/hero-tablet-1.webp',
    celular: '/images/hero/hero-celular-1.webp',
    alt: 'Neumáticos Importados - Banner 1'
  },
  {
    id: 2,
    monitor: '/images/hero/hero-monitor-2.webp',
    tablet:  '/images/hero/hero-tablet-2.webp',
    celular: '/images/hero/hero-celular-2.webp',
    alt: 'Neumáticos Importados - Banner 2'
  },
  {
    id: 3,
    monitor: '/images/hero/hero-monitor-3.webp',
    tablet:  '/images/hero/hero-tablet-3.webp',
    celular: '/images/hero/hero-celular-3.webp',
    alt: 'Neumáticos Importados - Banner 3'
  },
  {
    id: 4,
    monitor: '/images/hero/hero-monitor-4.webp',
    tablet:  '/images/hero/hero-tablet-4.webp',
    celular: '/images/hero/hero-celular-4.webp',
    alt: 'Neumáticos Importados - Banner 4'
  },
]

const AUTO_INTERVAL_MS = 5000

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [timerKey, setTimerKey] = useState(0)

  const goTo = useCallback((index: number) => {
    setActiveIndex(index)
    setTimerKey(k => k + 1)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % slides.length)
    }, AUTO_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [timerKey])

  const activeSlide = slides[activeIndex]

  return (
    <section className="relative w-full overflow-hidden">

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id}
          initial={activeIndex === 0 ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="relative w-full
                     [aspect-ratio:4/3]
                     md:[aspect-ratio:768/360]
                     lg:[aspect-ratio:1280/400]"
        >
          <picture className="block h-full w-full">
            <source
              media="(max-width: 767px)"
              srcSet={activeSlide.celular}
              type="image/webp"
            />
            <source
              media="(max-width: 1023px)"
              srcSet={activeSlide.tablet}
              type="image/webp"
            />
            <img
              src={activeSlide.monitor}
              alt={activeSlide.alt}
              className="block h-full w-full object-cover object-center"
              loading={activeIndex === 0 ? 'eager' : 'lazy'}
            />
          </picture>
        </motion.div>
      </AnimatePresence>

      {/* Dots indicadores */}
      <div className="absolute bottom-3 left-1/2 z-20
                      -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ir al slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'bg-[var(--color-orange)] w-6 h-2'
                : 'bg-white/40 w-2 h-2'
            }`}
          />
        ))}
      </div>

    </section>
  )
}
