import { Link } from 'react-router-dom'
import Logo from '../../../components/ui/Logo.jsx'

export default function LandingFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <Logo light href="/" />
            <p className="mt-4 text-sm text-white/60">
              Sistema para reportar y dar seguimiento a las incidencias del campus. Proyecto de Base de Datos en la
              Nube, Equipo 2.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm font-semibold">
            <li><a href="#proceso" className="text-white/70 hover:text-accent-400">Proceso</a></li>
            <li><a href="#producto" className="text-white/70 hover:text-accent-400">Producto</a></li>
            <li><a href="#categorias" className="text-white/70 hover:text-accent-400">Categorías</a></li>
            <li><a href="#roles" className="text-white/70 hover:text-accent-400">Roles</a></li>
            <li><Link to="/login" className="text-white/70 hover:text-accent-400">Iniciar sesión</Link></li>
          </ul>
        </div>
        <p className="mt-16 font-display text-[clamp(4rem,18vw,16rem)] leading-[0.8] font-extrabold tracking-[-0.06em] text-white/[0.06] select-none" aria-hidden="true">
          UTM DESK
        </p>
        <p className="mt-6 text-xs text-white/40">© {new Date().getFullYear()} UTM Desk</p>
      </div>
    </footer>
  )
}
