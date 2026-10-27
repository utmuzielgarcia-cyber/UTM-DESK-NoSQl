import { Mail, MapPin } from 'lucide-react'
import Logo from '../ui/Logo.jsx'

const columns = [
  {
    title: 'Plataforma',
    links: [
      { href: '#como-funciona', label: 'Cómo funciona' },
      { href: '#categorias', label: 'Categorías' },
      { href: '#roles', label: 'Roles' },
    ],
  },
  {
    title: 'Proyecto',
    links: [
      { href: '#testimonios', label: 'Testimonios' },
      { href: '/login', label: 'Iniciar sesión' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            Sistema web para reportar y dar seguimiento a las incidencias del campus: cómputo y redes,
            infraestructura y asuntos académicos.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent-300" aria-hidden="true" /> Campus UTM
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent-300" aria-hidden="true" /> soporte@utmdesk.mx
            </li>
          </ul>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-semibold text-white">{column.title}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition hover:text-accent-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-slate-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} UTM Desk · Proyecto de Base de Datos en la Nube · Equipo 2
        </p>
      </div>
    </footer>
  )
}
