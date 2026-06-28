import { MoveRight } from 'lucide-react'

import { EpisodeCard } from './EpisodeCard'
import { MagneticButton } from './MagneticButton'
import { episodes } from '../data/episodes'
import { links } from '../data/links'
import { useScrollReveal } from '../hooks/useScrollReveal'

export function Episodes() {
  const scope = useScrollReveal({ stagger: 0.06, y: 28 })

  // The first (latest) episode is featured above in LatestEpisode.
  const recent = episodes.slice(1)

  return (
    <section id="episodes" ref={scope} className="mx-auto max-w-6xl px-5 py-28 sm:py-36">
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
    </section>
  )
}
