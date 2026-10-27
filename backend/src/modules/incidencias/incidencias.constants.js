// Catálogos de incidencias. También los usa scripts/setup-db.js para el $jsonSchema.

export const ESTADOS = {
  ABIERTA: 'abierta',
  ASIGNADA: 'asignada',
  EN_PROCESO: 'en_proceso',
  RESUELTA: 'resuelta',
  CERRADA: 'cerrada',
}
export const LISTA_ESTADOS = Object.values(ESTADOS)

export const PRIORIDADES = ['baja', 'media', 'alta', 'critica']

// Cada categoría tiene su propio "detalle" (oneOf en el $jsonSchema).
export const CATEGORIAS = {
  computo_redes: {
    campo: 'tipo_equipo',
    opciones: ['computadora', 'red', 'proyector', 'impresora', 'software', 'otro'],
  },
  infraestructura: {
    campo: 'tipo_instalacion',
    opciones: ['electrica', 'hidraulica', 'mobiliario', 'clima', 'limpieza', 'otro'],
  },
  academico: {
    campo: 'asunto',
    opciones: ['aula', 'horario', 'material', 'otro'],
  },
}
export const LISTA_CATEGORIAS = Object.keys(CATEGORIAS)

// Transiciones que puede hacer el técnico asignado.
export const TRANSICIONES_TECNICO = {
  [ESTADOS.ASIGNADA]: [ESTADOS.EN_PROCESO],
  [ESTADOS.EN_PROCESO]: [ESTADOS.RESUELTA],
}

// Borrado automático (índice TTL) a los 60 días de resuelta.
export const SEGUNDOS_TTL_RESUELTA = 60 * 24 * 60 * 60
