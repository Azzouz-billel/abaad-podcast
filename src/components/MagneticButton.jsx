import { useEffect, useRef } from 'react'

import { gsap, prefersReducedMotion } from '../lib/gsap'

/**
 * Wraps any control so it drifts toward the pointer on hover and springs back
 * on leave (a "magnetic" micro-interaction). Renders as a <button> by default,
 * or an <a> when `href` is given. Magnetism is skipped under reduced motion.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  strength = 0.4,
  ...rest
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const moveX = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const moveY = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })

    const onMove = (event) => {
      const rect = el.getBoundingClientRect()
      const relX = event.clientX - (rect.left + rect.width / 2)
      const relY = event.clientY - (rect.top + rect.height / 2)
      moveX(relX * strength)
      moveY(relY * strength)
    }
    const onLeave = () => {
      moveX(0)
      moveY(0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [strength])

  const Tag = href ? 'a' : 'button'

  return (
    <Tag
      ref={ref}
      href={href}
      onClick={onClick}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}
