import { useEffect, useState } from 'react'
import { Headphones } from 'lucide-react'

import { MagneticButton } from './MagneticButton'
import { links } from '../data/links'

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Episodes', href: '#episodes' },
  { label: 'Hosts', href: '#hosts' },
  { label: 'Support', href: '#support' },
  { label: 'Contact', href: '#contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5"
      data-nav
    >
      <nav
        className={`flex w-full max-w-6xl items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6 ${
          scrolled ? 'glass-strong shadow-[var(--shadow-lift)]' : 'glass'
        }`}
        aria-label="Primary"
      >
        <a href="#top" className="flex items-center gap-2.5" aria-label="Abaad — home">
          <img src="/logo.svg" alt="" width="30" height="30" className="drop-shadow-[0_0_12px_rgba(182,240,138,0.35)]" />
          <span className="font-arabic text-xl leading-none text-bone" dir="rtl">
            أبعاد
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-xs uppercase tracking-[0.2em] text-moss transition-colors duration-300 hover:text-bone"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <MagneticButton
          href={links.spotify}
          target="_blank"
          rel="noopener noreferrer"
          strength={0.5}
          className="group flex items-center gap-2 rounded-full border border-[var(--line-bright)] bg-[rgba(34,197,94,0.1)] px-4 py-2 text-sm font-medium text-bone transition-colors duration-300 hover:bg-[rgba(34,197,94,0.2)]"
        >
          <Headphones size={16} className="text-phosphor transition-transform duration-300 group-hover:scale-110" />
          <span>Listen</span>
        </MagneticButton>
      </nav>
    </header>
  )
}
