import { Activity } from 'lucide-react'
import useCountUp from '../../../hooks/useCountUp.js'
import { stats } from '../data.js'

function StatCard({ value, label, suffix, decimals = 0 }) {
  const [ref, current] = useCountUp(value)

  return (
    <div ref={ref} className="rounded-2xl bg-white p-5 sm:p-6 shadow-soft ring-1 ring-slate-100">
      <p className="text-3xl font-extrabold sm:text-4xl tracking-tight text-brand-950">
        {current.toLocaleString('es-MX', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
        <span className="text-accent-500">{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-slate-600">{label}</p>
    </div>
  )
}

export default function Stats() {
  return (
    <section aria-labelledby="stats-title" className="relative pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
          <Activity className="h-4 w-4 text-accent-500" aria-hidden="true" />
          <h2 id="stats-title">El campus en números</h2>
          <span className="ml-1 rounded-full bg-slate-200/70 px-2 py-0.5 text-xs">datos de ejemplo</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
