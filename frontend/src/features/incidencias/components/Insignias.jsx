import { ESTADOS, PRIORIDADES } from '../../../constants/catalogos.js'

export function EstadoBadge({ estado }) {
  const { label, clase } = ESTADOS[estado] ?? { label: estado, clase: 'bg-slate-100 ring-slate-200' }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${clase}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {label}
    </span>
  )
}

export function Prioridad({ prioridad }) {
  const { label, clase } = PRIORIDADES[prioridad] ?? { label: prioridad, clase: '' }
  return <span className={`text-xs font-bold uppercase tracking-wide ${clase}`}>{label}</span>
}
