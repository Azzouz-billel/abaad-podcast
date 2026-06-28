import { ArrowUpRight } from 'lucide-react'

import { InstagramIcon, YoutubeIcon, SpotifyIcon } from './BrandIcons'
import { links } from '../data/links'

const PLATFORMS = [
  { name: 'Spotify', icon: SpotifyIcon, href: links.spotify },
  { name: 'YouTube', icon: YoutubeIcon, href: links.youtube },
]

const SOCIALS = [
  { name: 'Instagram', icon: InstagramIcon, href: links.instagram },
  { name: 'YouTube', icon: YoutubeIcon, href: links.youtube },
]

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--line)] px-5 pb-12 pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-start">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="" width="36" height="36" />
              <span className="font-arabic text-2xl text-bone" dir="rtl">
                أبعاد
              </span>
            </div>
            <p className="mt-5 leading-relaxed text-moss">
              One idea, every angle. New conversations released as they are ready —
              never on a schedule we do not believe in.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-5">Subscribe wherever you listen</p>
            <div className="flex flex-col gap-3">
              {PLATFORMS.map(({ name, icon: Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass group flex items-center justify-between gap-10 rounded-full px-5 py-3 text-bone transition-colors duration-300 hover:border-[var(--line-bright)]"
                >
                  <span className="flex items-center gap-3">
                    <Icon size={18} className="text-phosphor" />
                    {name}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-moss transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-phosphor"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-6 border-t border-[var(--line)] pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-moss">
            © {new Date().getFullYear()} Abaad · أبعاد — All rights reserved
          </p>
          <div className="flex items-center gap-5">
            {SOCIALS.map(({ name, icon: Icon, href }) => (
              <a
                key={name}
                href={href}
                aria-label={name}
                target="_blank"
                rel="noopener noreferrer"
                className="text-moss transition-colors duration-300 hover:text-bone"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
