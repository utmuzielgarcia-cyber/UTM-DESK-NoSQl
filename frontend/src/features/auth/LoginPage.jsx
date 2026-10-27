import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import Logo from '../../components/ui/Logo.jsx'
import Alerta from '../../components/ui/Alerta.jsx'
import { claseBotonPrimario, claseCampo, claseEtiqueta, claseTitulo } from '../../components/ui/formulario.js'
import { ROLES } from '../../constants/catalogos.js'
import { useAuth } from './authContext.js'

// Cuentas creadas por el seed del backend, para probar cada perfil rápido.
const CUENTAS_PRUEBA = [
  { rol: 'reportante', correo: 'reportante@utm.mx' },
  { rol: 'tecnico', correo: 'tecnico@utm.mx' },
  { rol: 'coordinador', correo: 'coordinador@utm.mx' },
  { rol: 'directivo', correo: 'directivo@utm.mx' },
  { rol: 'soporte_ti', correo: 'soporte@utm.mx' },
]
const PASSWORD_PRUEBA = 'UtmDesk2026!'

export default function LoginPage() {
  const { usuario, iniciarSesion } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ correo: '', password: '' })
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  if (usuario) return <Navigate to="/panel" replace />

  const entrar = async (correo, password) => {
    setError('')
    setEnviando(true)
    try {
      await iniciarSesion(correo, password)
      navigate(location.state?.desde ?? '/panel', { replace: true })
    } catch (e) {
      setError(e.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-[1.1fr_1fr]">
      <aside className="relative hidden overflow-hidden bg-ink p-12 text-white lg:flex lg:flex-col">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgb(39_71_216/0.55),transparent_55%)]" aria-hidden="true" />
        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-accent-400/20 blur-3xl" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:48px_48px]" aria-hidden="true" />

        <div className="relative"><Logo light href="/" /></div>
        <div className="relative mt-auto max-w-lg">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent-300 uppercase">Mesa de ayuda del campus</p>
          <h2 className="mt-4 font-display text-6xl leading-[0.95] font-extrabold tracking-[-0.03em]">
            Cada reporte,
            <br />
            <span className="text-accent-400">resuelto.</span>
          </h2>
          <p className="mt-6 text-lg text-white/65">Reporta, asigna y da seguimiento a las incidencias del campus desde un solo lugar.</p>
        </div>
        <div className="relative mt-12 flex gap-10 border-t border-white/10 pt-8 text-sm">
          <div><p className="font-display text-3xl font-extrabold">5</p><p className="text-white/55">perfiles</p></div>
          <div><p className="font-display text-3xl font-extrabold">3</p><p className="text-white/55">categorías</p></div>
          <div><p className="font-display text-3xl font-extrabold">24/7</p><p className="text-white/55">seguimiento</p></div>
        </div>
      </aside>

      <main className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden"><Logo href="/" /></div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              entrar(form.correo, form.password)
            }}
            className="mt-10 space-y-5 lg:mt-0"
          >
            <div>
              <h1 className={claseTitulo}>Inicia sesión</h1>
              <p className="mt-2 text-sm text-slate-500">Usa tu cuenta institucional de UTM Desk.</p>
            </div>

            <Alerta>{error}</Alerta>

            <label className={claseEtiqueta}>
              Correo
              <input
                type="email" required autoComplete="email" className={claseCampo} placeholder="tu.nombre@utm.mx"
                value={form.correo} onChange={(e) => setForm({ ...form, correo: e.target.value })}
              />
            </label>
            <label className={claseEtiqueta}>
              Contraseña
              <input
                type="password" required autoComplete="current-password" className={claseCampo}
                value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </label>

            <button type="submit" disabled={enviando} className={`${claseBotonPrimario} w-full py-3`}>
              <LogIn className="h-4 w-4" aria-hidden="true" /> {enviando ? 'Entrando…' : 'Entrar'}
            </button>
          </form>

          <div className="mt-8 rounded-2xl bg-surface p-5 ring-1 ring-slate-200/70">
            <p className="text-xs font-semibold tracking-[0.12em] text-slate-500 uppercase">Versión de prueba: entrar como</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {CUENTAS_PRUEBA.map(({ rol, correo }) => (
                <button
                  key={rol} type="button" disabled={enviando} onClick={() => entrar(correo, PASSWORD_PRUEBA)}
                  className="rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-ink ring-1 ring-slate-200 transition hover:bg-ink hover:text-white hover:ring-ink"
                >
                  {ROLES[rol]}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-500">Contraseña de todas las cuentas de prueba: <code className="rounded bg-white px-1.5 py-0.5 text-ink ring-1 ring-slate-200">{PASSWORD_PRUEBA}</code></p>
          </div>
        </div>
      </main>
    </div>
  )
}
