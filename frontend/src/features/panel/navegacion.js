import { BarChart3, FilePlus2, Home, ListChecks, Server, Users } from 'lucide-react'
import { PERMISOS } from '../../constants/permisos.js'

const P = PERMISOS

// Menú lateral: cada opción se muestra solo si el rol tiene alguno de sus permisos.
export const NAVEGACION = [
  { to: '/panel', label: 'Inicio', icon: Home, end: true },
  {
    to: '/panel/incidencias',
    label: 'Incidencias',
    icon: ListChecks,
    end: true,
    permisos: [P.INCIDENCIAS_VER_PROPIAS, P.INCIDENCIAS_VER_ASIGNADAS, P.INCIDENCIAS_VER_TODAS],
  },
  { to: '/panel/incidencias/nueva', label: 'Nuevo reporte', icon: FilePlus2, permisos: [P.INCIDENCIAS_CREAR] },
  { to: '/panel/usuarios', label: 'Usuarios', icon: Users, permisos: [P.USUARIOS_VER] },
  { to: '/panel/analitica', label: 'Analítica', icon: BarChart3, permisos: [P.ANALITICA_VER] },
  { to: '/panel/sistema', label: 'Sistema', icon: Server, permisos: [P.SISTEMA_VER] },
]

export const TITULO_INCIDENCIAS = {
  reportante: 'Mis reportes',
  tecnico: 'Mis asignaciones',
  coordinador: 'Incidencias del campus',
  directivo: 'Incidencias del campus',
}
