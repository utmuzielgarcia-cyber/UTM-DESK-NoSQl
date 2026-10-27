import { motion, useReducedMotion } from 'framer-motion'
import { ingredients } from '../data.js'
import Reveal from './Reveal.jsx'

// "Ingredientes": las funciones que hacen funcionar a UTM Desk.
export default function IngredientsSection() {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-white bg-grain py-28">
      <div className="absolute top-1/2 left-1/2 -z-0 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-200/40 blur-[140px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="text-sm font-bold tracking-widest text-brand-900 uppercase">Los ingredientes</p>
          <h2 className="mx-auto mt-4 max-w-4xl font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.92] font-extrabold tracking-[-0.04em] text-ink">
            Hecho con lo que <span className="italic text-brand-900">sí</span> importa.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ingredients.map(({ icon: Icon, name, text, color }, index) => (
            <Reveal key={name} delay={(index % 3) * 0.08}>
              <motion.div
                whileHover={reduce ? undefined : { scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group flex h-full items-start gap-5 rounded-[1.5rem] bg-white/80 p-6 ring-1 ring-ink/10 backdrop-blur transition-shadow hover:shadow-[0_24px_60px_-24px_rgb(11_11_20/0.35)]"
              >
                <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-ink ${color} transition-transform duration-500 group-hover:rotate-12`}>
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-extrabold text-ink">{name}</h3>
                  <p className="mt-1.5 text-ink/65">{text}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
