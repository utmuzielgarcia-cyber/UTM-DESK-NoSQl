export default function Cargando({ texto = 'Cargando…' }) {
  return (
    <div className="flex items-center gap-3 py-10 text-sm text-slate-500" role="status">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand-100 border-t-brand-600" aria-hidden="true" />
      {texto}
    </div>
  )
}
