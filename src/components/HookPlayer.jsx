import { useRef, useState } from 'react'
import { Play, Pause, AudioLines } from 'lucide-react'

import { hookSrc } from '../data/episodes'

const ACCENT_HEX = {
  emerald: '#22c55e',
  mint: '#4ade80',
  phosphor: '#b6f08a',
}

/**
 * The media surface for an episode: a generative cover that swaps to the inline
 * hook video on Play. Falls back to a "hook coming soon" state if the file for
 * this slug is not in public/episodes/ yet.
 */
export function HookPlayer({ slug, number, accent, aspect = 'aspect-[4/3]', youtubeId }) {
  const videoRef = useRef(null)
  const [active, setActive] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)

  const color = ACCENT_HEX[accent] ?? ACCENT_HEX.emerald

  const toggle = () => {
    if (failed) return
    if (youtubeId) {
      // The embed brings its own controls; we only need to reveal it.
      setActive(true)
      return
    }
    const video = videoRef.current
    if (!active) {
      setActive(true)
      return
    }
    if (!video) return
    if (video.paused) {
      video.play()
    } else {
      video.pause()
    }
  }

  return (
    <div className={`group/media relative ${aspect} overflow-hidden rounded-2xl border border-[var(--line)]`}>
      {/* Generative cover (no image asset): layered light + isometric facet */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 90% at 75% 15%, ${color}38, transparent 55%), radial-gradient(90% 80% at 15% 95%, ${color}1f, transparent 60%), linear-gradient(160deg, #0b2018, #06120c)`,
        }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 100 100"
          className="absolute -bottom-6 -right-4 h-44 w-44 opacity-[0.18]"
          fill="none"
          stroke={color}
          strokeWidth="1.2"
        >
          <path d="M50 8 L86 29 L86 71 L50 92 L14 71 L14 29 Z" />
          <path d="M50 24 L72 37 L72 63 L50 76 L28 63 L28 37 Z" />
          <path d="M50 8 L50 24 M86 29 L72 37 M14 29 L28 37" />
        </svg>
        <span
          className="absolute left-5 top-4 font-mono text-sm tracking-[0.3em]"
          style={{ color }}
        >
          {number}
        </span>
      </div>

      {active && youtubeId && (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&playsinline=1`}
          title="Episode hook"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      )}

      {active && !youtubeId && !failed && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={hookSrc(slug)}
          playsInline
          autoPlay
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onError={() => setFailed(true)}
        />
      )}

      {failed ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[rgba(6,18,12,0.55)] text-center">
          <AudioLines size={22} className="text-phosphor" />
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-moss">
            Hook coming soon
          </span>
        </div>
      ) : active && youtubeId ? null : (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause hook' : 'Play hook'}
          className="absolute inset-0 flex items-center justify-center bg-[rgba(6,18,12,0)] transition-colors duration-300 hover:bg-[rgba(6,18,12,0.25)] focus-visible:bg-[rgba(6,18,12,0.25)]"
        >
          <span
            className={`flex h-14 w-14 items-center justify-center rounded-full text-[#06120c] shadow-[var(--glow-emerald)] transition-all duration-300 group-hover/media:scale-105 ${
              playing ? 'opacity-0 group-hover/media:opacity-100' : 'opacity-100'
            }`}
            style={{ background: `linear-gradient(120deg, ${color}, var(--color-mint))` }}
          >
            {playing ? <Pause size={20} fill="#06120c" strokeWidth={0} /> : <Play size={20} fill="#06120c" strokeWidth={0} className="ml-0.5" />}
          </span>
        </button>
      )}
    </div>
  )
}
