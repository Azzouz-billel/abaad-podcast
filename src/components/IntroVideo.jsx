import { useEffect, useRef, useState } from 'react'

import { INTRO_SESSION_KEY } from '../lib/intro'

// A stalled or failed clip must never trap the visitor behind the overlay.
const MAX_DURATION_MS = 12000
// Overlay dissolve length — must match the `duration-[...]` class below.
const FADE_MS = 850

/**
 * Full-screen opening: the brand clip plays once per session over a forest-void
 * backdrop. When it ends it signals the site to reveal (`onReveal`) while the
 * overlay dissolves over it, then unmounts (`onExit`) — a single crossfade.
 * Skippable, and self-dismissing if the video errors or never reaches `ended`.
 */
export function IntroVideo({ onReveal, onExit }) {
  const videoRef = useRef(null)
  const finishedRef = useRef(false)
  const finishRef = useRef(() => {})
  const onRevealRef = useRef(onReveal)
  const onExitRef = useRef(onExit)
  const [exiting, setExiting] = useState(false)

  // Keep the latest callbacks without re-running the effect below.
  useEffect(() => {
    onRevealRef.current = onReveal
    onExitRef.current = onExit
  })

  useEffect(() => {
    const scroller = document.documentElement
    const previousOverflow = scroller.style.overflow
    scroller.style.overflow = 'hidden'

    const finish = () => {
      if (finishedRef.current) return
      finishedRef.current = true
      try {
        sessionStorage.setItem(INTRO_SESSION_KEY, '1')
      } catch {
        // sessionStorage unavailable (private mode quota) — intro just replays.
      }
      scroller.style.overflow = previousOverflow
      onRevealRef.current() // start the hero entrance underneath
      setExiting(true) // dissolve the overlay over it
      setTimeout(() => onExitRef.current(), FADE_MS + 60) // unmount once faded
    }
    finishRef.current = finish

    // The video's `ended` event is the primary trigger. These guard the cases
    // where it never fires (autoplay blocked, codec missing): dismiss at the
    // clip's real length, falling back to a hard cap until the duration is known.
    const video = videoRef.current
    let timer = setTimeout(finish, MAX_DURATION_MS)
    const onMeta = () => {
      if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return
      clearTimeout(timer)
      timer = setTimeout(finish, video.duration * 1000 + 600)
    }
    video?.addEventListener('loadedmetadata', onMeta)
    // Some browsers ignore the autoPlay attribute when sources are <source> tags.
    video?.play?.().catch(() => {})

    return () => {
      clearTimeout(timer)
      video?.removeEventListener('loadedmetadata', onMeta)
      scroller.style.overflow = previousOverflow
    }
  }, [])

  const handleFinish = () => finishRef.current()

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[linear-gradient(to_bottom,var(--color-void),var(--color-deep))] transition-[opacity,transform] duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        exiting ? 'pointer-events-none' : ''
      }`}
      style={{ opacity: exiting ? 0 : 1, transform: exiting ? 'scale(1.06)' : 'scale(1)' }}
      role="dialog"
      aria-label="Intro"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        poster="/media/intro-poster.jpg"
        onEnded={handleFinish}
        onError={handleFinish}
        aria-label="Abaad intro animation"
      >
        <source src="/media/intro-alpha.webm" type="video/webm" />
        <source src="/media/intro.mp4" type="video/mp4" />
      </video>

      <div className="grain pointer-events-none absolute inset-0" />

      <button
        type="button"
        onClick={handleFinish}
        className="glass absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full px-6 py-3 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-bone transition-colors duration-300 hover:border-[var(--line-bright)] hover:text-phosphor"
        aria-label="Skip intro"
      >
        Skip
      </button>
    </div>
  )
}
