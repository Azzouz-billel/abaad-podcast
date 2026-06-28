import { HookPlayer } from './HookPlayer'
import { EpisodeBadge } from './EpisodeBadge'

export function EpisodeCard({ episode }) {
  return (
    <article data-reveal className="group flex flex-col">
      <HookPlayer
        slug={episode.slug}
        number={episode.number}
        accent={episode.accent}
        aspect="aspect-video"
        youtubeId={episode.youtubeId}
      />

      <div className="mt-4 flex items-center gap-3">
        <EpisodeBadge category={episode.category} />
        <span className="font-mono text-xs text-moss">{episode.date}</span>
      </div>

      <h3 className="mt-3 font-display text-lg font-medium leading-snug text-bone transition-colors duration-300 group-hover:text-phosphor">
        {episode.url ? (
          <a href={episode.url} target="_blank" rel="noopener noreferrer">
            {episode.title}
          </a>
        ) : (
          episode.title
        )}
      </h3>
      <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-phosphor/70">
        {episode.guest}
      </p>
    </article>
  )
}
