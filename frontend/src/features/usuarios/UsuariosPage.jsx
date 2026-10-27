import { useState } from 'react'
import { UserPlus } from 'lucide-react'
import Alerta from '../../components/ui/Alerta.jsx'
import Cargando from '../../components/ui/Cargando.jsx'
import { claseCampo, claseEtiqueta, claseTarjeta, claseBotonPrimario, claseTitulo, claseSubtitulo } from '../../components/ui/formulario.js'
import { ROLES } from '../../constants/catalogos.js'
import { PERMISOS } from '../../constants/permisos.js'
import { useApi } from '../../hooks/useApi.js'
import { useAuth } from '../auth/authContext.js'
import * as usuariosService from './usuarios.service.js'

const NUEVO = { nombre: '', correo: '', password: '', rol: 'reportante' }

function FormularioNuevo({ onCreado }) {
  const [form, setForm] = useState(NUEVO)
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)
  const cambiar = (campo) => (e) => setForm({ ...form, [campo]: e.target.value })

  const enviar = async (e) => {
    e.preventDefault()
    setError('')
    setEnviando(true)
    try {
      await usuariosService.crear(form)
      setForm(NUEVO)
      onCreado(`Cuenta de ${form.nombre} creada.`)
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={enviar} className={`${claseTarjeta} space-y-4`}>
      <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink"><UserPlus className="h-5 w-5" aria-hidden="true" /> Nueva cuenta</h2>
      <Alerta>{error}</Alerta>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className={claseEtiqueta}>Nombre<input required minLength={3} className={claseCampo} value={form.nombre} onChange={cambiar('nombre')} /></label>
        <label className={claseEtiqueta}>Correo<input required type="email" className={claseCampo} value={form.correo} onChange={cambiar('correo')} /></label>
        <label className={claseEtiqueta}>Contraseña<input required minLength={8} type="password" autoComplete="new-password" className={claseCampo} value={form.password} onChange={cambiar('password')} /></label>
        <label className={claseEtiqueta}>
          Rol
          <select className={claseCampo} value={form.rol} onChange={cambiar('rol')}>
            {Object.entries(ROLES).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </label>
      </div>
      <button type="submit" disabled={enviando} className={claseBotonPrimario}>
        {enviando ? 'Creando…' : 'Crear cuenta'}
      </button>
    </form>
  )
}

export default function UsuariosPage() {
  const { usuario: yo, puede } = useAuth()
  const administra = puede(PERMISOS.USUARIOS_ADMINISTRAR)
  const [rol, setRol] = useState('')
  const [mensaje, setMensaje] = useState({ tono: 'exito', texto: '' })
  const { datos, error, cargando, recargar } = useApi(() => usuariosService.listar({ rol }), [rol])

  const actualizar = async (u, cambios, texto) => {
    try {
      await usuariosService.actualizar(u.id, cambios)
      setMensaje({ tono: 'exito', texto })
      recargar()
    } catch (e) {
      setMensaje({ tono: 'error', texto: e.message })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className={claseTitulo}>Usuarios</h1>
        <p className={claseSubtitulo}>{administra ? 'Crea cuentas, cambia roles y activa o desactiva accesos.' : 'Consulta del personal (solo lectura).'}</p>
      </div>

      {administra && <FormularioNuevo onCreado={(texto) => { setMensaje({ tono: 'exito', texto }); recargar() }} />}
      <Alerta tono={mensaje.tono}>{mensaje.texto}</Alerta>

      <div className={claseTarjeta}>
        <select className={`${claseCampo} max-w-xs`} value={rol} onChange={(e) => setRol(e.target.value)} aria-label="Filtrar por rol">
          <option value="">Todos los roles</option>
          {Object.entries(ROLES).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <div className="mt-4">
          <Alerta>{error}</Alerta>
          {cargando && !datos ? <Cargando /> : datos && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-slate-500">
                  <tr className="border-b border-slate-100">
                    <th className="py-3 pr-4 font-semibold">Nombre</th>
                    <th className="py-3 pr-4 font-semibold">Correo</th>
                    <th className="py-3 pr-4 font-semibold">Rol</th>
                    <th className="py-3 font-semibold">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {datos.map((u) => {
                    const soyYo = u.id === yo.id
                    return (
                      <tr key={u.id} className="border-b border-slate-50">
                        <td className="py-3 pr-4 font-semibold text-ink">{u.nombre}{soyYo && <span className="ml-2 text-xs text-slate-400">(tú)</span>}</td>
                        <td className="py-3 pr-4 text-slate-600">{u.correo}</td>
                        <td className="py-3 pr-4">
                          {administra && !soyYo ? (
                            <select className="rounded-lg bg-slate-50 px-2 py-1 text-sm ring-1 ring-slate-200" value={u.rol} onChange={(e) => actualizar(u, { rol: e.target.value }, `Rol de ${u.nombre} actualizado.`)} aria-label={`Rol de ${u.nombre}`}>
                              {Object.entries(ROLES).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                            </select>
                          ) : ROLES[u.rol]}
                        </td>
                        <td className="py-3">
                          {administra && !soyYo ? (
                            <button
                              type="button" onClick={() => actualizar(u, { activo: !u.activo }, `${u.nombre} ${u.activo ? 'desactivado' : 'activado'}.`)}
                              className={`rounded-full px-3 py-1 text-xs font-bold ${u.activo ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}
                            >
                              {u.activo ? 'Activo · desactivar' : 'Inactivo · activar'}
                            </button>
                          ) : (
                            <span className={`rounded-full px-3 py-1 text-xs font-bold ${u.activo ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}`}>{u.activo ? 'Activo' : 'Inactivo'}</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
