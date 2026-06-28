import { useRef } from 'react'

import { XIcon, InstagramIcon, LinkedinIcon } from './BrandIcons'
import { prefersReducedMotion } from '../lib/gsap'

const ACCENT_HEX = {
  emerald: '#22c55e',
  mint: '#4ade80',
  phosphor: '#b6f08a',
}

const MAX_TILT = 9

export function HostCard({ host }) {
  const cardRef = useRef(null)
  const glareRef = useRef(null)
  const color = ACCENT_HEX[host.accent] ?? ACCENT_HEX.emerald

  const onMove = (event) => {
    const card = cardRef.current
    if (!card || prefersReducedMotion()) return
    const rect = card.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    card.style.transform = `perspective(900px) rotateY(${(px - 0.5) * MAX_TILT * 2}deg) rotateX(${(0.5 - py) * MAX_TILT * 2}deg)`
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(233,242,234,0.16), transparent 45%)`
    }
  }

  const onLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)'
    if (glareRef.current) glareRef.current.style.background = 'transparent'
  }

  return (
    <article
      data-reveal
      ref={cardRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="glass relative overflow-hidden rounded-3xl p-8 transition-transform duration-300 ease-out [transform-style:preserve-3d] sm:p-10"
    >
      <div ref={glareRef} className="pointer-events-none absolute inset-0" aria-hidden="true" />

      <div
        className="flex h-20 w-20 items-center justify-center rounded-2xl font-arabic text-3xl font-bold text-[#06120c]"
        style={{ background: `linear-gradient(140deg, ${color}, var(--color-mint))` }}
        dir="rtl"
        aria-hidden="true"
      >
        {host.initials}
      </div>

      <h3 className="mt-6 font-display text-2xl font-medium text-bone">{host.name}</h3>
      <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-phosphor">
        {host.handle}
      </p>
      <p className="mt-4 max-w-sm leading-relaxed text-moss">{host.bio}</p>

      <div className="mt-7 flex items-center gap-4">
        <a href={host.socials.x} aria-label={`${host.name} on X`} className="text-moss transition-colors duration-300 hover:text-bone">
          <XIcon size={17} />
        </a>
        <a href={host.socials.instagram} aria-label={`${host.name} on Instagram`} className="text-moss transition-colors duration-300 hover:text-bone">
          <InstagramIcon size={18} />
        </a>
        <a href={host.socials.linkedin} aria-label={`${host.name} on LinkedIn`} className="text-moss transition-colors duration-300 hover:text-bone">
          <LinkedinIcon size={18} />
        </a>
      </div>
    </article>
  )
}
