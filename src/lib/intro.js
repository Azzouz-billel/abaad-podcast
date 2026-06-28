import { prefersReducedMotion } from './gsap'

export const INTRO_SESSION_KEY = 'abaad:intro-seen'

// Skip the intro when it has already played this tab session, or for visitors
// who ask for reduced motion (an autoplaying full-screen clip is exactly what
// that preference is meant to avoid).
export function hasSeenIntro() {
  if (prefersReducedMotion()) return true
  try {
    return sessionStorage.getItem(INTRO_SESSION_KEY) === '1'
  } catch {
    return false
  }
}
