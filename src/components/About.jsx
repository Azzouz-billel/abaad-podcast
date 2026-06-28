import { useEffect, useRef } from 'react'
import { Layers, Compass, Radio } from 'lucide-react'

import { useScrollReveal } from '../hooks/useScrollReveal'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'

const FACETS = [
  {
    icon: Layers,
    title: 'Depth over takes',
    body: 'We stay with a single idea long enough to see what is underneath it.',
  },
  {
    icon: Compass,
    title: 'Every angle',
    body: 'Guests who disagree with us, and with each other, on purpose.',
  },
  {
    icon: Radio,
    title: 'Made to be heard',
    body: 'Scored, edited, and paced like the thing it is — a piece of audio.',
  },
]

export function About() {
  const scope = useScrollReveal({ stagger: 0.1 })
  const parallax = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion() || !parallax.current) return
    const tween = gsap.to(parallax.current, {
      yPercent: -18,
      ease: 'none',
      scrollTrigger: {
        trigger: parallax.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section
      id="about"
      ref={scope}
      className="relative mx-auto max-w-6xl px-5 py-28 sm:py-40"
    >
      <span
        ref={parallax}
        aria-hidden="true"
        dir="rtl"
        className="pointer-events-none absolute -top-10 right-0 select-none font-arabic text-[28vw] font-bold leading-none text-[rgba(125,155,134,0.1)] sm:text-[20vw]"
      >
        أبعاد
      </span>

      <p data-reveal className="eyebrow mb-10">
        About the show
      </p>

      <h2 className="relative max-w-4xl font-display text-[clamp(2.25rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-tight">
        <span data-reveal className="block">
          One question,
        </span>
        <span data-reveal className="block text-moss">
          asked from every
        </span>
        <span data-reveal className="block text-gradient">
          possible angle.
        </span>
      </h2>

      <p
        data-reveal
        className="mt-10 max-w-2xl text-lg leading-relaxed text-moss"
      >
        Abaad — أبعاد, Arabic for <em className="not-italic text-bone">dimensions</em> — is a
        long-form conversation show. Each episode picks one idea and holds it up
        to the light, rotating it slowly so you can see the facets a single
        viewpoint would miss. No hot takes, no rush to a verdict.
      </p>

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] sm:grid-cols-3">
        {FACETS.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            data-reveal
            className="bg-[rgba(11,32,24,0.4)] p-7 transition-colors duration-300 hover:bg-[rgba(16,40,28,0.6)]"
          >
            <Icon size={22} className="text-phosphor" strokeWidth={1.5} />
            <h3 className="mt-5 font-display text-xl font-medium text-bone">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-moss">{body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
