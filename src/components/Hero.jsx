import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Play, ArrowDown } from 'lucide-react'

import { MagneticButton } from './MagneticButton'
import { gsap, prefersReducedMotion } from '../lib/gsap'

const ROTATING_WORDS = ['every angle', 'in depth', 'unhurried', 'in the round', 'from every side']
const ROTATE_INTERVAL_MS = 2500

/**
 * Landing hero: drifting green light beams behind the bilingual Abaad wordmark,
 * with a rotating descriptor that swaps every few seconds. The entrance is gated
 * on `start` so it plays when the intro reveals the site, not behind the overlay.
 */
export function Hero({ start = true }) {
  const root = useRef(null)
  const wordsRef = useRef([])
  const [wordIndex, setWordIndex] = useState(0)

  useLayoutEffect(() => {
    wordsRef.current.forEach((el, i) => {
      if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0, yPercent: i === 0 ? 0 : 120 })
    })
  }, [])

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length)
    }, ROTATE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion()) return
    wordsRef.current.forEach((el, i) => {
      if (!el) return
      gsap.to(el, {
        yPercent: i === wordIndex ? 0 : i < wordIndex ? -120 : 120,
        opacity: i === wordIndex ? 1 : 0,
        duration: 0.6,
        ease: 'back.out(1.4)',
      })
    })
  }, [wordIndex])

  useEffect(() => {
    if (!start || prefersReducedMotion()) return
    const ctx = gsap.context((self) => {
      const items = self.selector('[data-reveal]')
      gsap.timeline({ defaults: { ease: 'power3.out' } }).fromTo(
        items,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.12, delay: 0.15 },
      )
    }, root)
    return () => ctx.revert()
  }, [start])

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 pb-24 pt-28 text-center"
    >
      <div className="relative z-20 flex flex-col items-center">
        <p data-reveal className="eyebrow glass mb-8 rounded-full px-4 py-2">
          Est. 2026 — Conversations in the round
        </p>

        <h1 className="flex flex-col items-center">
          <span
            data-reveal
            dir="rtl"
            className="font-arabic text-2xl font-semibold text-phosphor sm:text-3xl"
          >
            أبعاد
          </span>
          <span
            data-reveal
            className="text-gradient -mt-1 font-display text-[clamp(3.75rem,14vw,11rem)] font-semibold uppercase leading-[0.86] tracking-tight"
          >
            Abaad
          </span>
        </h1>

        <div
          data-reveal
          className="mt-5 flex items-center gap-3 font-display text-xl text-moss sm:text-2xl"
        >
          <span aria-hidden="true" className="text-phosphor/50">—</span>
          <span className="relative grid overflow-hidden">
            <span aria-hidden="true" className="invisible [grid-area:1/1] whitespace-nowrap font-semibold">
              from every side
            </span>
            {ROTATING_WORDS.map((word, i) => (
              <span
                key={word}
                ref={(el) => {
                  wordsRef.current[i] = el
                }}
                className="flex [grid-area:1/1] items-center justify-center whitespace-nowrap font-semibold text-phosphor opacity-0"
              >
                {word}
              </span>
            ))}
          </span>
          <span aria-hidden="true" className="text-phosphor/50">—</span>
        </div>

        <p
          data-reveal
          className="mt-7 max-w-xl text-balance text-base leading-relaxed text-moss sm:text-lg"
        >
          A podcast that turns one idea over in its hands until every side catches
          the light. New conversations, every angle considered.
        </p>

        <div data-reveal className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            href="#latest"
            strength={0.45}
            className="group flex items-center gap-2.5 rounded-full bg-[linear-gradient(120deg,var(--color-emerald),var(--color-mint))] px-7 py-3.5 font-medium text-[#06120c] shadow-[var(--glow-emerald)] transition-transform duration-300"
          >
            <Play size={18} fill="#06120c" strokeWidth={0} className="transition-transform duration-300 group-hover:scale-110" />
            <span>Listen to Latest Episode</span>
          </MagneticButton>

          <MagneticButton
            href="#about"
            strength={0.3}
            className="glass flex items-center gap-2 rounded-full px-6 py-3.5 text-bone transition-colors duration-300 hover:border-[var(--line-bright)]"
          >
            <span>About the show</span>
          </MagneticButton>
        </div>
      </div>

      <a
        href="#about"
        data-reveal
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-moss transition-colors duration-300 hover:text-bone"
        aria-label="Scroll to about"
      >
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  )
}
