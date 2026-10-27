import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Bell, Filter, Plus, Search } from 'lucide-react'
import Reveal from './Reveal.jsx'

const rows = [
  { folio: 'INC-2026-0142', title: 'Sin internet en Lab. 3', place: 'Edificio C', status: 'En atención', tone: 'bg-accent-500' },
  { folio: 'INC-2026-0141', title: 'Proyector sin imagen', place: 'Aula B‑204', status: 'Cerrada', tone: 'bg-accent-400' },
  { folio: 'INC-2026-0140', title: 'Fuga en sanitarios', place: 'Edificio A', status: 'Asignada', tone: 'bg-brand-900' },
  { folio: 'INC-2026-0139', title: 'Aula sin horario', place: 'Edificio D', status: 'Abierta', tone: 'bg-brand-600' },
]

// Presentación del producto: el panel se "endereza" al hacer scroll.
export default function ProductShowcase() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 28, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.85, 1])

  return (
    <section id="producto" className="relative overflow-hidden bg-white bg-grain py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-bold tracking-widest text-brand-600 uppercase">El producto</p>
          <h2 className="mt-4 font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.92] font-extrabold tracking-[-0.04em] text-ink">
            Un panel. <span className="text-brand-600">Todo el campus.</span>
          </h2>
        </Reveal>

        <div ref={ref} className="mt-16 [perspective:1600px]">
          <motion.div
            style={{ rotateX, scale }}
            className="origin-top overflow-hidden rounded-[1.75rem] bg-white shadow-[0_40px_120px_-30px_rgb(43_80_255/0.45)] ring-1 ring-ink/10"
          >
            <div className="flex items-center gap-2 border-b border-ink/5 bg-ink/[0.02] px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-brand-600" />
              <span className="h-3 w-3 rounded-full bg-accent-500" />
              <span className="h-3 w-3 rounded-full bg-accent-400" />
              <span className="ml-4 hidden rounded-full bg-ink/5 px-4 py-1 text-xs text-ink/50 sm:block">utmdesk.mx/panel/incidencias</span>
            </div>

            <div className="grid md:grid-cols-[220px_1fr]">
              <aside className="hidden border-r border-ink/5 p-5 md:block">
                <p className="font-display text-lg font-extrabold text-ink">UTM Desk</p>
                <ul className="mt-6 space-y-1 text-sm font-semibold">
                  {['Inicio', 'Incidencias', 'Analítica', 'Usuarios'].map((item, index) => (
                    <li key={item} className={`rounded-xl px-3 py-2 ${index === 1 ? 'bg-ink text-white' : 'text-ink/60'}`}>
                      {item}
                    </li>
                  ))}
                </ul>
              </aside>

              <div className="p-5 sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-2xl font-extrabold text-ink">Incidencias</h3>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="hidden items-center gap-2 rounded-full bg-ink/5 px-4 py-2 text-sm text-ink/50 sm:flex">
                      <Search className="h-4 w-4" aria-hidden="true" /> Buscar “proyector”
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-ink/5"><Filter className="h-4 w-4" aria-hidden="true" /></span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-ink/5"><Bell className="h-4 w-4" aria-hidden="true" /></span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-600 px-4 py-2 text-sm font-bold text-white">
                      <Plus className="h-4 w-4" aria-hidden="true" /> Nueva
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    ['Abiertas', '32', 'bg-brand-600'],
                    ['En atención', '18', 'bg-accent-500'],
                    ['Cerradas hoy', '27', 'bg-accent-400'],
                  ].map(([label, value, tone]) => (
                    <div key={label} className="rounded-2xl bg-ink/[0.03] p-4">
                      <span className={`inline-block h-2 w-8 rounded-full ${tone}`} />
                      <p className="mt-3 font-display text-3xl font-extrabold text-ink">{value}</p>
                      <p className="text-sm text-ink/60">{label}</p>
                    </div>
                  ))}
                </div>

                <ul className="mt-6 divide-y divide-ink/5">
                  {rows.map((row) => (
                    <li key={row.folio} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-3.5">
                      <span className="font-mono text-xs text-ink/50">{row.folio}</span>
                      <span className="font-semibold text-ink">{row.title}</span>
                      <span className="text-sm text-ink/50">{row.place}</span>
                      <span className={`ml-auto rounded-full px-3 py-1 text-xs font-bold ${row.tone} ${row.tone === 'bg-accent-400' || row.tone === 'bg-accent-500' ? 'text-ink' : 'text-white'}`}>
                        {row.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
