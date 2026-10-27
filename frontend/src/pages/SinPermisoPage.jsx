import { Link } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'

export default function SinPermisoPage() {
  return (
    <div className="grid place-items-center py-24 text-center">
      <ShieldAlert className="h-12 w-12 text-accent-500" aria-hidden="true" />
      <h1 className="mt-4 text-2xl font-extrabold text-ink">403 · Sin permiso</h1>
      <p className="mt-2 max-w-sm text-sm text-slate-600">Tu rol no tiene acceso a esta sección.</p>
      <Link to="/panel" className="mt-6 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800">
        Volver al inicio
      </Link>
    </div>
  )
}
