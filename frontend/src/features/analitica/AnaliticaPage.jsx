import Alerta from '../../components/ui/Alerta.jsx'
import Cargando from '../../components/ui/Cargando.jsx'
import { claseTarjeta, claseTitulo, claseSubtitulo } from '../../components/ui/formulario.js'
import { CATEGORIAS, ESTADOS } from '../../constants/catalogos.js'
import { useApi } from '../../hooks/useApi.js'
import Barras from './Barras.jsx'
import { obtenerResumen } from './analitica.service.js'

export function Indicador({ etiqueta, valor }) {
  return (
    <div className={`${claseTarjeta} relative overflow-hidden`}>
      <span className="absolute top-0 left-6 h-1 w-10 rounded-b-full bg-accent-400" aria-hidden="true" />
      <p className="text-xs font-semibold tracking-[0.12em] text-slate-500 uppercase">{etiqueta}</p>
      <p className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink tabular-nums">{valor}</p>
    </div>
  )
}

export default function AnaliticaPage() {
  const { datos, error, cargando } = useApi(obtenerResumen)
  if (cargando) return <Cargando />
  if (error) return <Alerta>{error}</Alerta>

  const abiertas = ['abierta', 'asignada', 'en_proceso'].reduce((s, e) => s + (datos.porEstado[e] ?? 0), 0)
  return (
    <div className="space-y-6">
      <div>
        <h1 className={claseTitulo}>Analítica</h1>
        <p className={claseSubtitulo}>Calculada en MongoDB con pipelines de agregación.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Indicador etiqueta="Incidencias totales" valor={datos.total} />
        <Indicador etiqueta="Pendientes" valor={abiertas} />
        <Indicador etiqueta="Horas promedio de trabajo" valor={`${datos.horasPromedio.toFixed(1)} h`} />
        <Indicador etiqueta="Tiempo promedio a resolución" valor={`${datos.horasResolucionPromedio.toFixed(1)} h`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className={claseTarjeta}>
          <h2 className="mb-4 font-display text-lg font-bold text-ink">Incidencias por edificio</h2>
          <Barras datos={datos.porEdificio.map((e) => ({ etiqueta: e.edificio, valor: e.total }))} />
        </section>
        <section className={claseTarjeta}>
          <h2 className="mb-4 font-display text-lg font-bold text-ink">Etiquetas más frecuentes</h2>
          <Barras color="bg-accent-400" datos={datos.etiquetas.map((e) => ({ etiqueta: `#${e.etiqueta}`, valor: e.total }))} />
        </section>
        <section className={claseTarjeta}>
          <h2 className="mb-4 font-display text-lg font-bold text-ink">Por estado</h2>
          <Barras datos={Object.entries(ESTADOS).map(([v, { label }]) => ({ etiqueta: label, valor: datos.porEstado[v] ?? 0 }))} />
        </section>
        <section className={claseTarjeta}>
          <h2 className="mb-4 font-display text-lg font-bold text-ink">Por categoría</h2>
          <Barras color="bg-brand-300" datos={Object.entries(CATEGORIAS).map(([v, { label }]) => ({ etiqueta: label, valor: datos.porCategoria[v] ?? 0 }))} />
        </section>
      </div>
    </div>
  )
}
