// Matriz de permisos de UTM Desk. Es la única fuente de verdad:
// las rutas piden permisos, nunca roles directamente.

export const ROLES = {
  REPORTANTE: 'reportante',
  TECNICO: 'tecnico',
  COORDINADOR: 'coordinador',
  DIRECTIVO: 'directivo',
  SOPORTE_TI: 'soporte_ti',
}

export const LISTA_ROLES = Object.values(ROLES)

export const PERMISOS = {
  INCIDENCIAS_CREAR: 'incidencias:crear',
  INCIDENCIAS_VER_PROPIAS: 'incidencias:ver_propias',
  INCIDENCIAS_VER_ASIGNADAS: 'incidencias:ver_asignadas',
  INCIDENCIAS_VER_TODAS: 'incidencias:ver_todas',
  INCIDENCIAS_ATENDER: 'incidencias:atender',
  INCIDENCIAS_ASIGNAR: 'incidencias:asignar',
  INCIDENCIAS_CERRAR: 'incidencias:cerrar',
  USUARIOS_VER: 'usuarios:ver',
  USUARIOS_ADMINISTRAR: 'usuarios:administrar',
  ANALITICA_VER: 'analitica:ver',
  SISTEMA_VER: 'sistema:ver',
}

const P = PERMISOS

export const MATRIZ = {
  [ROLES.REPORTANTE]: [P.INCIDENCIAS_CREAR, P.INCIDENCIAS_VER_PROPIAS],
  [ROLES.TECNICO]: [P.INCIDENCIAS_VER_ASIGNADAS, P.INCIDENCIAS_ATENDER],
  [ROLES.COORDINADOR]: [
    P.INCIDENCIAS_VER_TODAS,
    P.INCIDENCIAS_ASIGNAR,
    P.INCIDENCIAS_CERRAR,
    P.USUARIOS_VER,
    P.ANALITICA_VER,
  ],
  [ROLES.DIRECTIVO]: [P.INCIDENCIAS_VER_TODAS, P.ANALITICA_VER],
  [ROLES.SOPORTE_TI]: [P.USUARIOS_VER, P.USUARIOS_ADMINISTRAR, P.SISTEMA_VER],
}

export function permisosDe(rol) {
  return MATRIZ[rol] ?? []
}

export function tienePermiso(rol, permiso) {
  return permisosDe(rol).includes(permiso)
}
