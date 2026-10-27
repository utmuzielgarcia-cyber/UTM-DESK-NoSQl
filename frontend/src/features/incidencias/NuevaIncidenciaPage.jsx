import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alerta from '../../components/ui/Alerta.jsx'
import { claseCampo, claseEtiqueta, claseTarjeta, claseBotonPrimario, claseBotonSecundario, claseTitulo, claseSubtitulo } from '../../components/ui/formulario.js'
import { CATEGORIAS, EDIFICIOS, PRIORIDADES } from '../../constants/catalogos.js'
import * as incidenciasService from './incidencias.service.js'

const INICIAL = { titulo: '', descripcion: '', categoria: 'computo_redes', edificio: EDIFICIOS[0], ubicacion: '', prioridad: 'media', detalle: {} }

export default function NuevaIncidenciaPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState(INICIAL)
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)
  const categoria = CATEGORIAS[form.categoria]
  const cambiar = (campo) => (e) => setForm({ ...form, [campo]: e.target.value })
  const cambiarDetalle = (campo) => (e) => setForm({ ...form, detalle: { ...form.detalle, [campo]: e.target.value } })

  const enviar = async (e) => {
    e.preventDefault()
    setError('')
    setEnviando(true)
    try {
      const incidencia = await incidenciasService.crear(form)
      navigate(`/panel/incidencias/${incidencia._id}`, { state: { creada: incidencia.folio } })
    } catch (err) {
      setError(err.message)
      setEnviando(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className={claseTitulo}>Nuevo reporte</h1>
        <p className={claseSubtitulo}>Describe el problema. Al guardarlo recibirás un folio para darle seguimiento.</p>
      </div>

      <form onSubmit={enviar} className={`${claseTarjeta} space-y-5`}>
        <Alerta>{error}</Alerta>

        <label className={claseEtiqueta}>
          Título
          <input required minLength={5} maxLength={120} className={claseCampo} placeholder="Ej. Proyector del aula 204 no enciende" value={form.titulo} onChange={cambiar('titulo')} />
        </label>
        <label className={claseEtiqueta}>
          Descripción
          <textarea required minLength={10} maxLength={2000} rows={4} className={claseCampo} placeholder="¿Qué pasa, desde cuándo y qué ya intentaste?" value={form.descripcion} onChange={cambiar('descripcion')} />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className={claseEtiqueta}>
            Categoría
            <select className={claseCampo} value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value, detalle: {} })}>
              {Object.entries(CATEGORIAS).map(([v, { label }]) => <option key={v} value={v}>{label}</option>)}
            </select>
          </label>
          <label className={claseEtiqueta}>
            {categoria.campoLabel}
            <select required className={claseCampo} value={form.detalle[categoria.campo] ?? ''} onChange={cambiarDetalle(categoria.campo)}>
              <option value="" disabled>Elige una opción</option>
              {Object.entries(categoria.opciones).map(([v, label]) => <option key={v} value={v}>{label}</option>)}
            </select>
          </label>
          {form.categoria === 'computo_redes' && (
            <label className={claseEtiqueta}>
              Número de inventario <span className="font-normal text-slate-400">(opcional)</span>
              <input maxLength={40} className={claseCampo} placeholder="PRY-0042" value={form.detalle.numero_inventario ?? ''} onChange={cambiarDetalle('numero_inventario')} />
            </label>
          )}
          {form.categoria === 'academico' && (
            <label className={claseEtiqueta}>
              Materia <span className="font-normal text-slate-400">(opcional)</span>
              <input maxLength={80} className={claseCampo} value={form.detalle.materia ?? ''} onChange={cambiarDetalle('materia')} />
            </label>
          )}
          <label className={claseEtiqueta}>
            Edificio
            <select className={claseCampo} value={form.edificio} onChange={cambiar('edificio')}>
              {EDIFICIOS.map((e) => <option key={e}>{e}</option>)}
            </select>
          </label>
          <label className={claseEtiqueta}>
            Ubicación <span className="font-normal text-slate-400">(opcional)</span>
            <input maxLength={120} className={claseCampo} placeholder="Aula, piso, laboratorio…" value={form.ubicacion} onChange={cambiar('ubicacion')} />
          </label>
          <label className={claseEtiqueta}>
            Prioridad
            <select className={claseCampo} value={form.prioridad} onChange={cambiar('prioridad')}>
              {Object.entries(PRIORIDADES).map(([v, { label }]) => <option key={v} value={v}>{label}</option>)}
            </select>
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={() => navigate(-1)} className={claseBotonSecundario}>Cancelar</button>
          <button type="submit" disabled={enviando} className={claseBotonPrimario}>
            {enviando ? 'Enviando…' : 'Enviar reporte'}
          </button>
        </div>
      </form>
    </div>
  )
}
