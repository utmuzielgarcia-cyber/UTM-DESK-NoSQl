import { lazy, Suspense } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react'
import MagneticButton from './MagneticButton.jsx'

const GlassScene = lazy(() => import('../three/GlassScene.jsx'))

const lines = [
  { text: 'Reporta.', className: 'text-ink' },
  { text: 'Resuelve.', className: 'text-brand-600' },
  { text: 'Avanza.', className: 'text-transparent [-webkit-text-stroke:2px_var(--color-ink)] sm:[-webkit-text-stroke:3px_var(--color-ink)]' },
]

export default function HeroSection() {
  const reduce = useReducedMotion()

  return (
    <section id="inicio" className="relative isolate min-h-[100svh] overflow-hidden bg-white bg-grain">
      <div className="absolute inset-0 -z-10 bg-dots [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" aria-hidden="true" />
      <div className="absolute -top-32 -right-32 -z-10 h-[32rem] w-[32rem] rounded-full bg-brand-300/30 blur-[120px]" aria-hidden="true" />
      <div className="absolute bottom-0 -left-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-brand-600/20 blur-[120px]" aria-hidden="true" />
      <div className="absolute top-1/3 left-1/3 -z-10 h-72 w-72 rounded-full bg-accent-200/50 blur-[110px]" aria-hidden="true" />

      <div className="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-4 px-4 pt-28 pb-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-24 lg:pb-10 lg:px-8">
        <div className="relative z-10 order-2 lg:order-1">
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-1.5 text-xs font-bold tracking-wide text-white uppercase"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent-400" aria-hidden="true" />
            Mesa de ayuda del campus
          </motion.span>

          <h1 className="mt-6 font-display text-[clamp(3.4rem,10vw,8.5rem)] leading-[0.86] font-extrabold tracking-[-0.04em]">
            {lines.map((line, index) => (
              <span key={line.text} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={`block ${line.className}`}
                  initial={reduce ? false : { y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 max-w-md text-lg leading-relaxed text-ink/70"
          >
            Todo lo que falla en el campus, en un solo lugar. Cada reporte recibe su folio, llega al técnico correcto y
            puedes seguirlo en tiempo real.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <MagneticButton to="/login">
              Reportar incidencia <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </MagneticButton>
            <MagneticButton href="#proceso" variant="light">
              Ver cómo funciona
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-1 -mx-4 h-[46svh] min-h-[320px] sm:mx-0 lg:order-2 lg:-mr-16 lg:h-[82svh]"
        >
          <div className="h-full w-full [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_78%)]">
            <Suspense fallback={<div className="h-full w-full animate-pulse rounded-full bg-brand-600/5" />}>
              <GlassScene />
            </Suspense>
          </div>

          <div className="pointer-events-none absolute right-2 bottom-6 rounded-2xl bg-white/80 px-4 py-3 shadow-xl ring-1 ring-ink/5 backdrop-blur sm:right-6">
            <p className="text-[11px] font-bold tracking-wider text-brand-600 uppercase">En vivo</p>
            <p className="font-display text-lg font-extrabold text-ink">INC-2026-0142</p>
            <p className="text-xs text-ink/60">Sin internet · Edificio C</p>
          </div>
        </motion.div>
      </div>

      <a
        href="#proceso"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs font-semibold tracking-widest text-ink/50 uppercase lg:flex"
      >
        Desliza
        <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  )
}
