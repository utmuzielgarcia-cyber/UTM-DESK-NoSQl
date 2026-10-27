import { useEffect, useState } from 'react'
import Alerta from '../../../components/ui/Alerta.jsx'
import { claseCampo, claseEtiqueta, claseTarjeta, claseBotonPrimario, claseBotonSecundario } from '../../../components/ui/formulario.js'
import { PERMISOS } from '../../../constants/permisos.js'
import { useAuth } from '../../auth/authContext.js'
import * as usuariosService from '../../usuarios/usuarios.service.js'
import * as incidenciasService from '../incidencias.service.js'


function useAccion(onActualizada) {
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)
  const ejecutar = async (accion) => {
    setError('')
    setEnviando(true)
    try {
      await accion()
      onActualizada()
    } catch (e) {
      setError(e.message)
      setEnviando(false)
    }
  }
  return { error, enviando, ejecutar }
}

function Asignar({ incidencia, onActualizada }) {
  const [tecnicos, setTecnicos] = useState([])
  const [tecnicoId, setTecnicoId] = useState(incidencia.tecnico?.id ?? '')
  const { error, enviando, ejecutar } = useAccion(onActualizada)

  useEffect(() => {
    usuariosService.listar({ rol: 'tecnico', activo: true }).then(setTecnicos).catch(() => setTecnicos([]))
  }, [])

  return (
    <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); ejecutar(() => incidenciasService.asignar(incidencia._id, tecnicoId)) }}>
      <h3 className="font-display text-lg font-bold text-ink">{incidencia.tecnico ? 'Reasignar técnico' : 'Asignar técnico'}</h3>
      <Alerta>{error}</Alerta>
      <select required className={claseCampo} value={tecnicoId} onChange={(e) => setTecnicoId(e.target.value)} aria-label="Técnico">
        <option value="" disabled>Elige un técnico</option>
        {tecnicos.map((t) => <option key={t.id} value={t.id}>{t.nombre}</option>)}
      </select>
      <button type="submit" disabled={enviando || !tecnicoId} className={claseBotonPrimario}>Asignar</button>
    </form>
  )
}

function Atender({ incidencia, onActualizada }) {
  const [form, setForm] = useState({ horas: '', etiquetas: '', nota: '' })
  const { error, enviando, ejecutar } = useAccion(onActualizada)
  const siguiente = { asignada: 'en_proceso', en_proceso: 'resuelta' }[incidencia.estado]
  const textoBoton = { en_proceso: 'Iniciar atención', resuelta: 'Marcar como resuelta' }[siguiente]

  const enviar = (estado) => {
    const cambios = {
      ...(estado && { estado }),
      ...(form.horas && { horas: Number(form.horas) }),
      ...(form.etiquetas.trim() && { etiquetas: form.etiquetas.split(',').map((t) => t.trim()).filter(Boolean) }),
      ...(form.nota.trim() && { nota: form.nota.trim() }),
    }
    ejecutar(() => incidenciasService.atender(incidencia._id, cambios))
  }

  return (
    <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); enviar() }}>
      <h3 className="font-display text-lg font-bold text-ink">Atender incidencia</h3>
      <Alerta>{error}</Alerta>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className={claseEtiqueta}>
          Horas trabajadas
          <input type="number" min="0.25" max="24" step="0.25" className={claseCampo} value={form.horas} onChange={(e) => setForm({ ...form, horas: e.target.value })} />
        </label>
        <label className={claseEtiqueta}>
          Etiquetas <span className="font-normal text-slate-400">(separadas por coma)</span>
          <input className={claseCampo} placeholder="cableado, wifi" value={form.etiquetas} onChange={(e) => setForm({ ...form, etiquetas: e.target.value })} />
        </label>
      </div>
      <label className={claseEtiqueta}>
        Nota
        <textarea rows={2} maxLength={500} className={claseCampo} value={form.nota} onChange={(e) => setForm({ ...form, nota: e.target.value })} />
      </label>
      <div className="flex flex-wrap gap-3">
        {siguiente && <button type="button" disabled={enviando} onClick={() => enviar(siguiente)} className={claseBotonPrimario}>{textoBoton}</button>}
        <button type="submit" disabled={enviando} className={claseBotonSecundario}>Guardar avance</button>
      </div>
    </form>
  )
}

function Cerrar({ incidencia, onActualizada }) {
  const [nota, setNota] = useState('')
  const { error, enviando, ejecutar } = useAccion(onActualizada)
  return (
    <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); ejecutar(() => incidenciasService.cerrar(incidencia._id, nota.trim() || undefined)) }}>
      <h3 className="font-display text-lg font-bold text-ink">Cerrar incidencia</h3>
      <p className="text-sm text-slate-500">El técnico la marcó como resuelta. Revisa el trabajo y ciérrala.</p>
      <Alerta>{error}</Alerta>
      <textarea rows={2} maxLength={500} className={claseCampo} placeholder="Comentario de cierre (opcional)" value={nota} onChange={(e) => setNota(e.target.value)} />
      <button type="submit" disabled={enviando} className={claseBotonPrimario}>Cerrar incidencia</button>
    </form>
  )
}

// Muestra solo las acciones que el rol puede hacer en el estado actual.
export default function AccionesIncidencia({ incidencia, onActualizada }) {
  const { usuario, puede } = useAuth()
  const acciones = []
  const llave = `${incidencia.estado}-${incidencia.historial.length}`

  if (puede(PERMISOS.INCIDENCIAS_ASIGNAR) && ['abierta', 'asignada'].includes(incidencia.estado)) {
    acciones.push(<Asignar key={`asignar-${llave}`} incidencia={incidencia} onActualizada={onActualizada} />)
  }
  if (puede(PERMISOS.INCIDENCIAS_ATENDER) && incidencia.tecnico?.id === usuario.id && ['asignada', 'en_proceso'].includes(incidencia.estado)) {
    acciones.push(<Atender key={`atender-${llave}`} incidencia={incidencia} onActualizada={onActualizada} />)
  }
  if (puede(PERMISOS.INCIDENCIAS_CERRAR) && incidencia.estado === 'resuelta') {
    acciones.push(<Cerrar key={`cerrar-${llave}`} incidencia={incidencia} onActualizada={onActualizada} />)
  }

  if (!acciones.length) return null
  return <section className={`${claseTarjeta} space-y-6`}>{acciones}</section>
}
