import { Link, useLocation, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Alerta from '../../components/ui/Alerta.jsx'
import Cargando from '../../components/ui/Cargando.jsx'
import { claseTarjeta, claseTitulo } from '../../components/ui/formulario.js'
import { CATEGORIAS, ESTADOS, ROLES, formatoFecha } from '../../constants/catalogos.js'
import { useApi } from '../../hooks/useApi.js'
import AccionesIncidencia from './components/AccionesIncidencia.jsx'
import { EstadoBadge, Prioridad } from './components/Insignias.jsx'
import * as incidenciasService from './incidencias.service.js'

const ACCIONES = { creada: 'Creó el reporte', asignada: 'Asignó', reasignada: 'Reasignó', cambio_estado: 'Cambió el estado', actualizacion: 'Registró avance', cerrada: 'Cerró la incidencia' }

function Dato({ etiqueta, children }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{etiqueta}</dt>
      <dd className="mt-1 text-sm text-slate-800">{children}</dd>
    </div>
  )
}

export default function IncidenciaDetallePage() {
  const { id } = useParams()
  const location = useLocation()
  const { datos: incidencia, error, recargar } = useApi(() => incidenciasService.obtener(id), [id])

  if (error && !incidencia) return <Alerta>{error}</Alerta>
  if (!incidencia) return <Cargando />
  const categoria = CATEGORIAS[incidencia.categoria]

  return (
    <div className="space-y-6">
      <Link to="/panel/incidencias" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver
      </Link>

      {location.state?.creada && <Alerta tono="exito">Reporte enviado con el folio {location.state.creada}.</Alerta>}

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-sm font-bold text-brand-600">{incidencia.folio}</p>
          <h1 className={`mt-1 ${claseTitulo}`}>{incidencia.titulo}</h1>
        </div>
        <div className="flex items-center gap-3"><Prioridad prioridad={incidencia.prioridad} /><EstadoBadge estado={incidencia.estado} /></div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <section className={claseTarjeta}>
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">{incidencia.descripcion}</p>
            <dl className="mt-6 grid gap-4 sm:grid-cols-3">
              <Dato etiqueta="Categoría">{categoria?.label}</Dato>
              <Dato etiqueta={categoria?.campoLabel}>{categoria?.opciones[incidencia.detalle?.[categoria.campo]]}</Dato>
              {incidencia.detalle?.numero_inventario && <Dato etiqueta="Inventario">{incidencia.detalle.numero_inventario}</Dato>}
              {incidencia.detalle?.materia && <Dato etiqueta="Materia">{incidencia.detalle.materia}</Dato>}
              <Dato etiqueta="Edificio">{incidencia.edificio}</Dato>
              <Dato etiqueta="Ubicación">{incidencia.ubicacion || '—'}</Dato>
              <Dato etiqueta="Reportó">{incidencia.reportante.nombre}</Dato>
              <Dato etiqueta="Técnico">{incidencia.tecnico?.nombre ?? 'Sin asignar'}</Dato>
              <Dato etiqueta="Horas invertidas">{incidencia.horas_invertidas} h</Dato>
              <Dato etiqueta="Creada">{formatoFecha(incidencia.creada_en)}</Dato>
            </dl>
            {incidencia.etiquetas?.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {incidencia.etiquetas.map((e) => <span key={e} className="rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold text-accent-600">#{e}</span>)}
              </div>
            )}
          </section>

          <AccionesIncidencia incidencia={incidencia} onActualizada={recargar} />
        </div>

        <section className={claseTarjeta}>
          <h2 className="font-display text-lg font-bold text-ink">Historial</h2>
          <ol className="mt-4 space-y-4 border-l-2 border-brand-100 pl-4">
            {[...incidencia.historial].reverse().map((h, i) => (
              <li key={i} className="relative">
                <span className="absolute top-1.5 -left-[23px] h-3 w-3 rounded-full bg-brand-600 ring-4 ring-white" aria-hidden="true" />
                <p className="text-sm font-semibold text-slate-800">
                  {ACCIONES[h.accion] ?? h.accion}
                  {h.a && h.accion !== 'creada' && <> → {ESTADOS[h.a]?.label}</>}
                </p>
                <p className="text-xs text-slate-500">{h.usuario.nombre} · {ROLES[h.usuario.rol]} · {formatoFecha(h.fecha)}</p>
                {h.horas && <p className="text-xs text-slate-600">+{h.horas} h</p>}
                {h.nota && <p className="mt-1 text-sm text-slate-600">{h.nota}</p>}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  )
}
