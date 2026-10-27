import { motion, useReducedMotion } from 'framer-motion'
import { categories } from '../data.js'
import Reveal from './Reveal.jsx'

// "Sabores": cada categoría con su color.
export default function CategoriesSection() {
  const reduce = useReducedMotion()

  return (
    <section id="categorias" className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.92] font-extrabold tracking-[-0.04em] text-ink">
            Tres sabores
            <br />
            de <span className="text-accent-500">problema.</span>
          </h2>
          <p className="max-w-sm text-lg text-ink/70">
            Elige la categoría y tu reporte llega directo al equipo que sabe resolverlo.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {categories.map(({ icon: Icon, name, tagline, examples, bg, text, chip }, index) => (
            <Reveal key={name} delay={index * 0.1}>
              <motion.article
                whileHover={reduce ? undefined : { y: -12, rotate: index === 1 ? 0 : index === 0 ? -1.5 : 1.5 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className={`group relative flex min-h-[26rem] flex-col overflow-hidden rounded-[2rem] p-8 ${bg} ${text}`}
              >
                <span className="font-mono text-sm opacity-70">0{index + 1}</span>
                <Icon
                  className="absolute -right-6 -bottom-6 h-56 w-56 opacity-15 transition duration-700 group-hover:scale-110 group-hover:rotate-6"
                  strokeWidth={1.2}
                  aria-hidden="true"
                />
                <h3 className="mt-auto font-display text-5xl leading-[0.95] font-extrabold tracking-tight">{name}</h3>
                <p className="mt-4 max-w-[16rem] opacity-80">{tagline}</p>
                <ul className="relative mt-6 flex flex-wrap gap-2">
                  {examples.map((example) => (
                    <li key={example} className={`rounded-full px-3 py-1 text-xs font-bold ${chip}`}>
                      {example}
                    </li>
                  ))}
                </ul>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
