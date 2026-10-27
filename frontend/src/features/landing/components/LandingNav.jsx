import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import Logo from '../../../components/ui/Logo.jsx'

const links = [
  { href: '#proceso', label: 'Proceso' },
  { href: '#producto', label: 'Producto' },
  { href: '#categorias', label: 'Categorías' },
  { href: '#roles', label: 'Roles' },
]

export default function LandingNav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6 ${
          scrolled || open ? 'bg-white/80 shadow-[0_8px_30px_-12px_rgb(11_11_20/0.25)] ring-1 ring-ink/5 backdrop-blur-xl' : ''
        }`}
      >
        <Logo href="/" />

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-ink/70 transition hover:bg-ink/5 hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <Link
          to="/login"
          className="group hidden items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600 md:inline-flex"
        >
          Iniciar sesión
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </Link>

        <button
          type="button"
          className="rounded-full p-2 text-ink md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto mt-2 max-w-7xl rounded-3xl bg-white p-4 shadow-xl ring-1 ring-ink/5 md:hidden"
          >
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 font-display text-2xl font-extrabold text-ink hover:bg-ink/5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <Link to="/login" className="mt-3 block rounded-full bg-ink py-3.5 text-center font-bold text-white">
              Iniciar sesión
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
