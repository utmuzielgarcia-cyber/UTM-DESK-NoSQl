import { RefreshCw } from 'lucide-react'
import Alerta from '../../components/ui/Alerta.jsx'
import Cargando from '../../components/ui/Cargando.jsx'
import { claseTarjeta, claseBotonSecundario, claseTitulo, claseSubtitulo } from '../../components/ui/formulario.js'
import { apiFetch } from '../../services/api.js'
import { useApi } from '../../hooks/useApi.js'
import { Indicador } from '../analitica/AnaliticaPage.jsx'

export default function SistemaPage() {
  const { datos, error, cargando, recargar } = useApi(() => apiFetch('/sistema/estado'))

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className={claseTitulo}>Estado del sistema</h1>
          <p className={claseSubtitulo}>Conexión con MongoDB, colecciones e índices.</p>
        </div>
        <button type="button" onClick={recargar} className={claseBotonSecundario}>
          <RefreshCw className="h-4 w-4" aria-hidden="true" /> Actualizar
        </button>
      </div>
      <Alerta>{error}</Alerta>
      {cargando && !datos ? <Cargando /> : datos && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Indicador etiqueta="Base de datos" valor={datos.baseDeDatos.conectada ? 'En línea' : 'Caída'} />
            <Indicador etiqueta="Latencia" valor={`${datos.baseDeDatos.latenciaMs} ms`} />
            <Indicador etiqueta="Node.js" valor={datos.api.node} />
            <Indicador etiqueta="API activa" valor={`${Math.round(datos.api.uptimeSeg / 60)} min`} />
          </div>
          <section className={claseTarjeta}>
            <h2 className="mb-4 font-display text-lg font-bold text-ink">Colecciones de {datos.baseDeDatos.nombre}</h2>
            <ul className="divide-y divide-slate-100">
              {datos.colecciones.map((c) => (
                <li key={c.nombre} className="py-3">
                  <div className="flex justify-between text-sm"><span className="font-mono font-semibold text-brand-800">{c.nombre}</span><span className="text-slate-600">{c.documentos} documentos</span></div>
                  <p className="mt-1 text-xs text-slate-500">Índices: {c.indices.join(', ')}</p>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  )
}
