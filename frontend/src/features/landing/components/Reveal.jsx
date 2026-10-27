import { motion, useReducedMotion } from 'framer-motion'

// Aparece con desplazamiento suave al entrar en pantalla.
export default function Reveal({ children, delay = 0, y = 40, className = '', as = 'div' }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]

  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}
