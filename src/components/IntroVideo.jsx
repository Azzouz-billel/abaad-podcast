import { useEffect, useRef } from 'react'

import { gsap, prefersReducedMotion } from '../lib/gsap'
import { INTRO_SESSION_KEY } from '../lib/intro'

// A stalled or failed clip must never trap the visitor behind the overlay.
const MAX_DURATION_MS = 12000

/**
 * Full-screen opening: the brand clip plays once per session over a forest-void
 * backdrop, then fades out to reveal the site. Skippable, and self-dismissing if
 * the video errors or never reaches `ended`.
 */
export function IntroVideo({ onFinish }) {
  const rootRef = useRef(null)
  const videoRef = useRef(null)
  const finishedRef = useRef(false)
  const finishRef = useRef(() => {})
  const onFinishRef = useRef(onFinish)

  // Keep the latest onFinish without re-running the lock effect below.
  useEffect(() => {
    onFinishRef.current = onFinish
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

      if (!rootRef.current || prefersReducedMotion()) {
        onFinishRef.current()
        return
      }
      gsap.to(rootRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => onFinishRef.current(),
      })
    }

    finishRef.current = finish

    // The video's `ended` event is the primary dismiss. These guard the cases
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
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[linear-gradient(to_bottom,var(--color-void),var(--color-deep))]"
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
