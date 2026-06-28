import { useEffect, useRef } from 'react'

import { prefersReducedMotion } from '../lib/gsap'

const LAYERS = 3
const BEAMS_PER_LAYER = 6

// Brand greens, picked per layer so depth reads as a colour shift, not just blur.
const BEAM_COLORS = [
  [182, 240, 138], // phosphor
  [74, 222, 128], // mint
  [34, 197, 94], // emerald
]

function createBeam(width, height, layer) {
  const angle = -35 + Math.random() * 10
  const baseSpeed = 0.2 + layer * 0.2
  const baseOpacity = 0.08 + layer * 0.05
  const baseWidth = 10 + layer * 5
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    width: baseWidth,
    length: height * 2.5,
    angle,
    speed: baseSpeed + Math.random() * 0.2,
    opacity: baseOpacity + Math.random() * 0.1,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.01 + Math.random() * 0.015,
    layer,
    color: BEAM_COLORS[(layer - 1) % BEAM_COLORS.length],
  }
}

/**
 * Drifting diagonal light beams on a forest-void backdrop — the single
 * site-wide background. Recoloured from the cyan reference to the brand greens.
 * The glow comes from one compositor-level CSS blur on the element (cheap)
 * rather than a per-beam canvas blur (expensive). Pauses when the tab is hidden
 * and honours reduced-motion with a single static frame.
 */
export function BeamField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let beams = []
    let frameId = 0

    const paintBackdrop = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, '#06120c') // void
      gradient.addColorStop(1, '#08180f') // deep
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const resizeCanvas = () => {
      // Cap DPR: a full-screen blurred backdrop gains nothing from 2-3x density.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      beams = []
      for (let layer = 1; layer <= LAYERS; layer++) {
        for (let i = 0; i < BEAMS_PER_LAYER; i++) {
          beams.push(createBeam(window.innerWidth, window.innerHeight, layer))
        }
      }
    }

    const drawBeam = (beam) => {
      ctx.save()
      ctx.translate(beam.x, beam.y)
      ctx.rotate((beam.angle * Math.PI) / 180)

      const pulsingOpacity = Math.min(1, beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.4))
      const [r, g, b] = beam.color
      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length)
      gradient.addColorStop(0, `rgba(${r},${g},${b},0)`)
      gradient.addColorStop(0.2, `rgba(${r},${g},${b},${pulsingOpacity * 0.5})`)
      gradient.addColorStop(0.5, `rgba(${r},${g},${b},${pulsingOpacity})`)
      gradient.addColorStop(0.8, `rgba(${r},${g},${b},${pulsingOpacity * 0.5})`)
      gradient.addColorStop(1, `rgba(${r},${g},${b},0)`)

      ctx.fillStyle = gradient
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length)
      ctx.restore()
    }

    resizeCanvas()

    if (prefersReducedMotion()) {
      paintBackdrop()
      beams.forEach(drawBeam)
      return
    }

    const animate = () => {
      paintBackdrop()
      beams.forEach((beam) => {
        beam.y -= beam.speed * (beam.layer / LAYERS + 0.5)
        beam.pulse += beam.pulseSpeed
        if (beam.y + beam.length < -50) {
          beam.y = window.innerHeight + 50
          beam.x = Math.random() * window.innerWidth
        }
        drawBeam(beam)
      })
      frameId = requestAnimationFrame(animate)
    }
    animate()

    // Stop burning frames while the tab is in the background.
    const onVisibility = () => {
      cancelAnimationFrame(frameId)
      if (!document.hidden) frameId = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resizeCanvas)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      document.removeEventListener('visibilitychange', onVisibility)
      cancelAnimationFrame(frameId)
    }
  }, [])

  // scale-110 pushes the blurred edges past the viewport so they don't fade in.
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full scale-110 [filter:blur(8px)]"
      aria-hidden="true"
    />
  )
}
