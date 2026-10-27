import useCountUp from '../../../hooks/useCountUp.js'
import { stats } from '../data.js'

function Stat({ value, label, suffix, decimals = 0 }) {
  const [ref, current] = useCountUp(value, 2000)

  return (
    <div ref={ref} className="border-t-2 border-white/20 pt-6">
      <p className="font-display text-[clamp(3.5rem,7vw,6.5rem)] leading-none font-extrabold tracking-[-0.04em]">
        {current.toLocaleString('es-MX', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
        <span className="text-accent-400">{suffix}</span>
      </p>
      <p className="mt-3 text-white/70">{label}</p>
    </div>
  )
}

export default function StatsSection() {
  return (
    <section className="bg-brand-600 py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">El campus en números</h2>
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">Datos de ejemplo</span>
        </div>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Stat key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
