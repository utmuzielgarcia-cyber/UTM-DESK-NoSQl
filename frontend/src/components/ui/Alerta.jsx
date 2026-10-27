const tonos = {
  error: 'bg-red-50 text-red-800 ring-red-200',
  exito: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  info: 'bg-brand-50 text-brand-800 ring-brand-200',
}

export default function Alerta({ tono = 'error', children }) {
  if (!children) return null
  return <p role={tono === 'error' ? 'alert' : 'status'} className={`rounded-xl px-4 py-3 text-sm ring-1 ${tonos[tono]}`}>{children}</p>
}
