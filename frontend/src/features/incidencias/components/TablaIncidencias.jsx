import { Link } from 'react-router-dom'
import { CATEGORIAS, formatoFecha } from '../../../constants/catalogos.js'
import { EstadoBadge, Prioridad } from './Insignias.jsx'

export default function TablaIncidencias({ incidencias, vacio = 'No hay incidencias.' }) {
  if (!incidencias.length) return <p className="py-10 text-center text-sm text-slate-500">{vacio}</p>
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="text-xs uppercase tracking-wide text-slate-500">
          <tr className="border-b border-slate-100">
            <th className="py-3 pr-4 font-semibold">Folio</th>
            <th className="py-3 pr-4 font-semibold">Título</th>
            <th className="py-3 pr-4 font-semibold">Edificio</th>
            <th className="py-3 pr-4 font-semibold">Prioridad</th>
            <th className="py-3 pr-4 font-semibold">Estado</th>
            <th className="py-3 pr-4 font-semibold">Técnico</th>
            <th className="py-3 font-semibold">Creada</th>
          </tr>
        </thead>
        <tbody>
          {incidencias.map((i) => (
            <tr key={i._id} className="border-b border-slate-50 transition hover:bg-surface">
              <td className="py-3 pr-4 font-mono text-xs font-semibold text-brand-700">
                <Link to={`/panel/incidencias/${i._id}`} className="hover:underline">{i.folio}</Link>
              </td>
              <td className="py-3 pr-4">
                <Link to={`/panel/incidencias/${i._id}`} className="font-semibold text-ink hover:text-brand-700">{i.titulo}</Link>
                <p className="text-xs text-slate-500">{CATEGORIAS[i.categoria]?.label}</p>
              </td>
              <td className="py-3 pr-4 text-slate-600">{i.edificio}</td>
              <td className="py-3 pr-4"><Prioridad prioridad={i.prioridad} /></td>
              <td className="py-3 pr-4"><EstadoBadge estado={i.estado} /></td>
              <td className="py-3 pr-4 text-slate-600">{i.tecnico?.nombre ?? <span className="text-slate-400">Sin asignar</span>}</td>
              <td className="py-3 text-xs text-slate-500">{formatoFecha(i.creada_en)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
