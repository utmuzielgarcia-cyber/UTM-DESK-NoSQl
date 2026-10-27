import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from '../ui/Logo.jsx'
import Button from '../ui/Button.jsx'

const links = [
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#categorias', label: 'Categorías' },
  { href: '#roles', label: 'Roles' },
  { href: '#testimonios', label: 'Testimonios' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        scrolled || open ? 'bg-white/85 shadow-soft backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo />

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm font-medium text-slate-600 transition hover:text-brand-700">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button href="/login">Iniciar sesión</Button>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-brand-950 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-100 px-4 pb-6 md:hidden">
          <ul className="flex flex-col gap-1 py-3">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 font-medium text-slate-700 hover:bg-brand-50"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href="/login" className="w-full" onClick={() => setOpen(false)}>
            Iniciar sesión
          </Button>
        </div>
      )}
    </header>
  )
}
