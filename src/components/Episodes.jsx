import { MoveRight } from 'lucide-react'

import { EpisodeCard } from './EpisodeCard'
import { MagneticButton } from './MagneticButton'
import { SpotifyIcon, YoutubeIcon } from './BrandIcons'
import { episodes } from '../data/episodes'
import { links } from '../data/links'
import { useScrollReveal } from '../hooks/useScrollReveal'

export function Episodes() {
  const scope = useScrollReveal({ stagger: 0.06, y: 28 })

  // The first (latest) episode is featured above in LatestEpisode; the rest
  // fill this grid. With only one episode, show a "coming soon" block instead.
  const recent = episodes.slice(1)

  return (
    <section id="episodes" ref={scope} className="mx-auto max-w-6xl px-5 py-28 sm:py-36">
      {recent.length > 0 ? (
        <>
          <h2
            data-reveal
            className="mb-12 font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-tight tracking-tight"
          >
            Recent Episodes
          </h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {recent.map((episode) => (
              <EpisodeCard key={episode.slug} episode={episode} />
            ))}
          </div>

          <div data-reveal className="mt-16 flex justify-center">
            <MagneticButton
              href={links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              strength={0.4}
              className="group flex items-center gap-3 rounded-full bg-[linear-gradient(120deg,var(--color-emerald),var(--color-mint))] px-7 py-3.5 font-medium text-[#06120c] shadow-[var(--glow-emerald)] transition-transform duration-300"
            >
              <span>Discover all episodes</span>
              <MoveRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>
          </div>
        </>
      ) : (
        <div
          data-reveal
          className="glass relative overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:px-12 sm:py-24"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_0%,rgba(34,197,94,0.16),transparent_65%)]" />
          <svg
            viewBox="0 0 100 100"
            className="pointer-events-none absolute -right-8 -top-10 h-56 w-56 text-phosphor opacity-[0.07] sm:h-72 sm:w-72"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            aria-hidden="true"
          >
            <path d="M50 8 L86 29 L86 71 L50 92 L14 71 L14 29 Z" />
            <path d="M50 24 L72 37 L72 63 L50 76 L28 63 L28 37 Z" />
            <path d="M50 8 L50 24 M86 29 L72 37 M14 29 L28 37" />
          </svg>

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line-bright)] bg-[rgba(34,197,94,0.1)] px-3.5 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-phosphor">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-phosphor" />
              In production
            </span>

            <h2 className="mx-auto mt-7 max-w-2xl font-display text-[clamp(1.9rem,5vw,3.25rem)] font-semibold leading-[1.08] tracking-tight">
              More conversations, <span className="text-gradient">coming soon</span>.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-moss">
              We're recording the next episodes now. New conversations land here as soon
              as they're ready — follow along so you catch the first drop.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton
                href={links.spotify}
                target="_blank"
                rel="noopener noreferrer"
                strength={0.4}
                className="group flex items-center gap-2.5 rounded-full bg-[linear-gradient(120deg,var(--color-emerald),var(--color-mint))] px-7 py-3.5 font-medium text-[#06120c] shadow-[var(--glow-emerald)] transition-transform duration-300"
              >
                <SpotifyIcon size={18} />
                <span>Follow on Spotify</span>
              </MagneticButton>

              <MagneticButton
                href={links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                strength={0.3}
                className="glass flex items-center gap-2.5 rounded-full px-6 py-3.5 text-bone transition-colors duration-300 hover:border-[var(--line-bright)]"
              >
                <YoutubeIcon size={18} className="text-phosphor" />
                <span>Watch on YouTube</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
