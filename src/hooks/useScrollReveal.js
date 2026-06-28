import { useEffect, useRef } from 'react'

import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'

/**
 * Reveals every `[data-reveal]` descendant of the returned ref as it scrolls
 * into view: a staggered fade + rise. Elements start at opacity:0 (set in CSS)
 * so there is no flash before this runs. Honors prefers-reduced-motion.
 */
export function useScrollReveal({ y = 36, stagger = 0.08, start = 'top 82%' } = {}) {
  const scope = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context((self) => {
      const items = self.selector('[data-reveal]')
      items.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger,
            scrollTrigger: { trigger: el, start, once: true },
          },
        )
      })
    }, scope)

    return () => ctx.revert()
  }, [y, stagger, start])

  return scope
}

export { ScrollTrigger }
