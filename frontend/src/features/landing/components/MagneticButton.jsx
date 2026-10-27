import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

const MotionLink = motion.create(Link)

const variants = {
  dark: 'bg-ink text-white hover:bg-brand-600',
  light: 'bg-white text-ink ring-2 ring-ink hover:bg-ink hover:text-white',
  gold: 'bg-accent-400 text-ink hover:bg-white',
}

// Botón que se "atrae" al cursor.
export default function MagneticButton({ to, href, variant = 'dark', children, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 })

  const onMove = (event) => {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - rect.left - rect.width / 2) * 0.25)
    y.set((event.clientY - rect.top - rect.height / 2) * 0.35)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const props = {
    ref,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    style: { x, y },
    whileTap: { scale: 0.96 },
    className: `inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-bold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 ${variants[variant]} ${className}`,
  }

  return to ? (
    <MotionLink to={to} {...props}>
      {children}
    </MotionLink>
  ) : (
    <motion.a href={href} {...props}>
      {children}
    </motion.a>
  )
}
