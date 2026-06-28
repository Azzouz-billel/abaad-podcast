import { Headphones, Clock } from 'lucide-react'

import { HookPlayer } from './HookPlayer'
import { EpisodeBadge } from './EpisodeBadge'
import { MagneticButton } from './MagneticButton'
import { episodes } from '../data/episodes'
import { useScrollReveal } from '../hooks/useScrollReveal'

export function LatestEpisode() {
  const scope = useScrollReveal({ stagger: 0.1 })
  const episode = episodes[0]

  return (
    <section id="latest" ref={scope} className="mx-auto max-w-6xl px-5 py-28 sm:py-36">
      <p data-reveal className="eyebrow mb-10">
        Latest episode
      </p>

      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div data-reveal>
          <HookPlayer
            slug={episode.slug}
            number={episode.number}
            accent={episode.accent}
            aspect="aspect-video"
            youtubeId={episode.youtubeId}
          />
        </div>

        <div data-reveal>
          <div className="flex items-center gap-3">
            <EpisodeBadge category={episode.category} />
            <span className="font-mono text-xs text-moss">{episode.date}</span>
          </div>

          <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
            {episode.title}
          </h2>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-phosphor/80">
            {episode.guest}
          </p>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-moss">{episode.blurb}</p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <MagneticButton
              href={episode.url ?? '#episodes'}
              target={episode.url ? '_blank' : undefined}
              rel={episode.url ? 'noopener noreferrer' : undefined}
              strength={0.45}
              className="group flex items-center gap-2.5 rounded-full bg-[linear-gradient(120deg,var(--color-emerald),var(--color-mint))] px-7 py-3.5 font-medium text-[#06120c] shadow-[var(--glow-emerald)] transition-transform duration-300"
            >
              <Headphones size={18} className="transition-transform duration-300 group-hover:scale-110" />
              <span>Listen now</span>
            </MagneticButton>

            <span className="flex items-center gap-1.5 font-mono text-sm text-moss">
              <Clock size={15} />
              {episode.duration}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
