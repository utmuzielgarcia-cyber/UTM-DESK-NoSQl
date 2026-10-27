import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Alerta from '../../components/ui/Alerta.jsx'
import Cargando from '../../components/ui/Cargando.jsx'
import { claseTarjeta } from '../../components/ui/formulario.js'
import { ROLES } from '../../constants/catalogos.js'
import { PERMISOS } from '../../constants/permisos.js'
import { useApi } from '../../hooks/useApi.js'
import { apiFetch } from '../../services/api.js'
import { useAuth } from '../auth/authContext.js'
import { Indicador } from '../analitica/AnaliticaPage.jsx'
import TablaIncidencias from '../incidencias/components/TablaIncidencias.jsx'
import * as incidenciasService from '../incidencias/incidencias.service.js'
import * as usuariosService from '../usuarios/usuarios.service.js'

const P = PERMISOS

// Qué muestra la pantalla de inicio de cada perfil.
const PERFILES = {
  reportante: {
    texto: 'Levanta un reporte cuando algo falle en el campus y sigue su avance con el folio.',
    accion: { to: '/panel/incidencias/nueva', label: 'Nuevo reporte' },
    indicadores: [['Mis reportes', () => true], ['En atención', (i) => ['asignada', 'en_proceso'].includes(i.estado)], ['Resueltos', (i) => ['resuelta', 'cerrada'].includes(i.estado)]],
    tabla: 'Mis reportes recientes',
    filtro: () => true,
  },
  tecnico: {
    texto: 'Estas son las incidencias que coordinación te asignó. Actualiza su estado y registra tus horas.',
    accion: { to: '/panel/incidencias', label: 'Ver mis asignaciones' },
    indicadores: [['Por iniciar', (i) => i.estado === 'asignada'], ['En proceso', (i) => i.estado === 'en_proceso'], ['Resueltas', (i) => ['resuelta', 'cerrada'].includes(i.estado)]],
    tabla: 'Pendientes de atender',
    filtro: (i) => ['asignada', 'en_proceso'].includes(i.estado),
  },
  coordinador: {
    texto: 'Asigna los reportes nuevos al técnico adecuado y cierra los que ya se resolvieron.',
    accion: { to: '/panel/incidencias', label: 'Ver todas' },
    indicadores: [['Sin asignar', (i) => i.estado === 'abierta'], ['En atención', (i) => ['asignada', 'en_proceso'].includes(i.estado)], ['Por cerrar', (i) => i.estado === 'resuelta']],
    tabla: 'Requieren tu acción',
    filtro: (i) => ['abierta', 'resuelta'].includes(i.estado),
  },
  directivo: {
    texto: 'Consulta el estado del campus y la analítica para tomar decisiones.',
    accion: { to: '/panel/analitica', label: 'Ver analítica' },
    indicadores: [['Totales', () => true], ['Pendientes', (i) => ['abierta', 'asignada', 'en_proceso'].includes(i.estado)], ['Cerradas', (i) => i.estado === 'cerrada']],
    tabla: 'Incidencias recientes',
    filtro: () => true,
  },
}

function InicioIncidencias({ perfil }) {
  const { datos, error, cargando } = useApi(() => incidenciasService.listar())
  if (cargando) return <Cargando />
  if (error) return <Alerta>{error}</Alerta>
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        {perfil.indicadores.map(([etiqueta, cumple]) => <Indicador key={etiqueta} etiqueta={etiqueta} valor={datos.filter(cumple).length} />)}
      </div>
      <section className={claseTarjeta}>
        <h2 className="mb-2 font-display text-lg font-bold text-ink">{perfil.tabla}</h2>
        <TablaIncidencias incidencias={datos.filter(perfil.filtro).slice(0, 8)} vacio="Nada pendiente por ahora." />
      </section>
    </>
  )
}

function InicioSoporte() {
  const { datos, error, cargando } = useApi(() => Promise.all([usuariosService.listar(), apiFetch('/sistema/estado')]))
  if (cargando) return <Cargando />
  if (error) return <Alerta>{error}</Alerta>
  const [usuarios, sistema] = datos
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Indicador etiqueta="Cuentas" valor={usuarios.length} />
      <Indicador etiqueta="Activas" valor={usuarios.filter((u) => u.activo).length} />
      <Indicador etiqueta="Base de datos" valor={sistema.baseDeDatos.conectada ? 'En línea' : 'Caída'} />
      <Indicador etiqueta="Latencia" valor={`${sistema.baseDeDatos.latenciaMs} ms`} />
    </div>
  )
}

export default function InicioPage() {
  const { usuario, puede } = useAuth()
  const perfil = PERFILES[usuario.rol]
  const esSoporte = puede(P.SISTEMA_VER)

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-ink p-8 text-white shadow-lift sm:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_-10%,rgb(39_71_216/0.55),transparent_55%)]" aria-hidden="true" />
        <div className="absolute -right-16 -bottom-24 h-64 w-64 rounded-full bg-accent-400/20 blur-3xl" aria-hidden="true" />
        <p className="relative inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-accent-300 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-400" aria-hidden="true" /> {ROLES[usuario.rol]}
        </p>
        <h1 className="relative mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Hola, {usuario.nombre.split(' ')[0]}</h1>
        <p className="relative mt-3 max-w-xl text-white/70">
          {esSoporte ? 'Administra las cuentas de usuario y revisa que el sistema funcione correctamente.' : perfil.texto}
        </p>
        <Link
          to={esSoporte ? '/panel/usuarios' : perfil.accion.to}
          className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-accent-400 px-5 py-2.5 text-sm font-bold text-ink transition hover:bg-accent-300"
        >
          {esSoporte ? 'Administrar usuarios' : perfil.accion.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      {esSoporte ? <InicioSoporte /> : <InicioIncidencias perfil={perfil} />}
    </div>
  )
}
