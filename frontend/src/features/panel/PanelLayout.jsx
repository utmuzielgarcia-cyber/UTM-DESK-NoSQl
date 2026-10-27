import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { LogOut, Menu, X } from 'lucide-react'
import Logo from '../../components/ui/Logo.jsx'
import { ROLES } from '../../constants/catalogos.js'
import { useAuth } from '../auth/authContext.js'
import { NAVEGACION, TITULO_INCIDENCIAS } from './navegacion.js'

const iniciales = (nombre) =>
  nombre.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase()

export default function PanelLayout() {
  const { usuario, puede, cerrarSesion } = useAuth()
  const [abierto, setAbierto] = useState(false)
  const opciones = NAVEGACION.filter((o) => !o.permisos || puede(...o.permisos)).map((o) =>
    o.to === '/panel/incidencias' ? { ...o, label: TITULO_INCIDENCIAS[usuario.rol] ?? o.label } : o,
  )
  const hoy = new Date().toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })

  const menu = (
    <nav className="flex flex-col gap-1">
      {opciones.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to} to={to} end={end} onClick={() => setAbierto(false)}
          className={({ isActive }) =>
            `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
              isActive ? 'bg-white/10 text-white' : 'text-white/55 hover:bg-white/5 hover:text-white'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={`absolute top-2 bottom-2 left-0 w-1 rounded-full bg-accent-400 transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`}
                aria-hidden="true"
              />
              <Icon className={`h-5 w-5 ${isActive ? 'text-accent-300' : ''}`} aria-hidden="true" /> {label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )

  const tarjetaUsuario = (
    <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-400 text-sm font-bold text-ink">
        {iniciales(usuario.nombre)}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">{usuario.nombre}</p>
        <p className="text-xs text-accent-300">{ROLES[usuario.rol]}</p>
      </div>
      <button
        type="button" onClick={cerrarSesion} title="Cerrar sesión" aria-label="Cerrar sesión"
        className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
      >
        <LogOut className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-surface lg:grid lg:grid-cols-[272px_1fr]">
      <aside className="sticky top-0 hidden h-screen flex-col gap-10 bg-ink px-5 py-7 lg:flex">
        <Logo light href="/panel" />
        <div>
          <p className="mb-3 px-3 text-[11px] font-semibold tracking-[0.18em] text-white/35 uppercase">Menú</p>
          {menu}
        </div>
        <div className="mt-auto">{tarjetaUsuario}</div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-slate-200/70 bg-white/85 px-4 py-3 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-3 lg:hidden">
            <button type="button" onClick={() => setAbierto((v) => !v)} className="rounded-lg p-2 text-ink" aria-label="Menú">
              {abierto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Logo href="/panel" />
          </div>
          <p className="hidden text-sm text-slate-500 first-letter:uppercase lg:block">{hoy}</p>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-100 sm:inline-flex">
              {ROLES[usuario.rol]}
            </span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-xs font-bold text-accent-300 lg:hidden">
              {iniciales(usuario.nombre)}
            </span>
          </div>
        </header>

        {abierto && (
          <div className="space-y-4 bg-ink p-4 lg:hidden">
            {menu}
            {tarjetaUsuario}
          </div>
        )}

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-8 sm:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
