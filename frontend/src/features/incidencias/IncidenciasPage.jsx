import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import Alerta from '../../components/ui/Alerta.jsx'
import Cargando from '../../components/ui/Cargando.jsx'
import { claseCampo, claseTarjeta, claseBotonPrimario, claseTitulo, claseSubtitulo } from '../../components/ui/formulario.js'
import { CATEGORIAS, ESTADOS } from '../../constants/catalogos.js'
import { PERMISOS } from '../../constants/permisos.js'
import { useApi } from '../../hooks/useApi.js'
import { useAuth } from '../auth/authContext.js'
import { TITULO_INCIDENCIAS } from '../panel/navegacion.js'
import TablaIncidencias from './components/TablaIncidencias.jsx'
import * as incidenciasService from './incidencias.service.js'

export default function IncidenciasPage() {
  const { usuario, puede } = useAuth()
  const [filtros, setFiltros] = useState({ estado: '', categoria: '', q: '' })
  const [busqueda, setBusqueda] = useState('')
  const { datos, error, cargando } = useApi(() => incidenciasService.listar(filtros), [filtros])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className={claseTitulo}>{TITULO_INCIDENCIAS[usuario.rol] ?? 'Incidencias'}</h1>
          <p className={claseSubtitulo}>
            {usuario.rol === 'directivo' ? 'Consulta en modo lectura.' : 'Abre una incidencia para ver su historial y acciones.'}
          </p>
        </div>
        {puede(PERMISOS.INCIDENCIAS_CREAR) && (
          <Link to="/panel/incidencias/nueva" className={claseBotonPrimario}>
            <Plus className="h-4 w-4" aria-hidden="true" /> Nuevo reporte
          </Link>
        )}
      </div>

      <div className={claseTarjeta}>
        <form
          className="grid gap-3 sm:grid-cols-[1fr_180px_180px]"
          onSubmit={(e) => {
            e.preventDefault()
            setFiltros({ ...filtros, q: busqueda.trim() })
          }}
        >
          <label className="relative">
            <span className="sr-only">Buscar</span>
            <Search className="pointer-events-none absolute top-1/2 left-3 mt-0.5 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              className={`${claseCampo} pl-9`} placeholder="Buscar en español (ej. proyector, fuga) y Enter"
              value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
            />
          </label>
          <select className={claseCampo} value={filtros.estado} onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })} aria-label="Estado">
            <option value="">Todos los estados</option>
            {Object.entries(ESTADOS).map(([v, { label }]) => <option key={v} value={v}>{label}</option>)}
          </select>
          <select className={claseCampo} value={filtros.categoria} onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value })} aria-label="Categoría">
            <option value="">Todas las categorías</option>
            {Object.entries(CATEGORIAS).map(([v, { label }]) => <option key={v} value={v}>{label}</option>)}
          </select>
        </form>

        <div className="mt-4">
          <Alerta>{error}</Alerta>
          {cargando ? <Cargando /> : datos && <TablaIncidencias incidencias={datos} />}
        </div>
      </div>
    </div>
  )
}
