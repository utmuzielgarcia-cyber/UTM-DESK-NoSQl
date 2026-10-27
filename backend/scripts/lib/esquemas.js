// Validadores $jsonSchema e índices de cada colección.
import { LISTA_ROLES } from '../../src/permissions/roles.js'
import {
  CATEGORIAS,
  LISTA_ESTADOS,
  PRIORIDADES,
  SEGUNDOS_TTL_RESUELTA,
} from '../../src/modules/incidencias/incidencias.constants.js'

const referenciaUsuario = {
  bsonType: 'object',
  required: ['id', 'nombre'],
  properties: { id: { bsonType: 'objectId' }, nombre: { bsonType: 'string' } },
}

export const esquemaUsuarios = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['nombre', 'correo', 'password_hash', 'rol', 'activo', 'creado_en'],
    properties: {
      nombre: { bsonType: 'string', minLength: 3, maxLength: 80 },
      correo: { bsonType: 'string', pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$' },
      password_hash: { bsonType: 'string' },
      rol: { enum: LISTA_ROLES },
      activo: { bsonType: 'bool' },
      creado_en: { bsonType: 'date' },
      actualizado_en: { bsonType: 'date' },
      ultimo_acceso: { bsonType: 'date' },
    },
  },
}

// Cada categoría exige su propio "detalle": oneOf por categoría.
const variantesCategoria = Object.entries(CATEGORIAS).map(([categoria, { campo, opciones }]) => ({
  properties: {
    categoria: { enum: [categoria] },
    detalle: {
      bsonType: 'object',
      required: [campo],
      properties: { [campo]: { enum: opciones } },
    },
  },
}))

export const esquemaIncidencias = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['folio', 'titulo', 'descripcion', 'categoria', 'edificio', 'prioridad', 'estado', 'reportante', 'detalle', 'historial', 'creada_en'],
    properties: {
      folio: { bsonType: 'string', pattern: '^INC-[0-9]{4}-[0-9]{4,}$' },
      titulo: { bsonType: 'string', minLength: 5, maxLength: 120 },
      descripcion: { bsonType: 'string', minLength: 10, maxLength: 2000 },
      categoria: { enum: Object.keys(CATEGORIAS) },
      edificio: { bsonType: 'string', minLength: 1, maxLength: 60 },
      ubicacion: { bsonType: 'string' },
      prioridad: { enum: PRIORIDADES },
      estado: { enum: LISTA_ESTADOS },
      reportante: referenciaUsuario,
      tecnico: { oneOf: [{ bsonType: 'null' }, referenciaUsuario] },
      etiquetas: { bsonType: 'array', maxItems: 10, items: { bsonType: 'string' } },
      horas_invertidas: { bsonType: ['double', 'int', 'long', 'decimal'], minimum: 0 },
      evidencias: { bsonType: 'array' },
      historial: { bsonType: 'array', minItems: 1 },
      creada_en: { bsonType: 'date' },
      actualizada_en: { bsonType: 'date' },
      resuelta_en: { bsonType: 'date' },
      cerrada_en: { bsonType: 'date' },
    },
    oneOf: variantesCategoria,
  },
}

export const indices = {
  usuarios: [
    { key: { correo: 1 }, name: 'correo_unico', unique: true },
    { key: { rol: 1, activo: 1 }, name: 'rol_activo' },
  ],
  incidencias_campus: [
    { key: { folio: 1 }, name: 'folio_unico', unique: true },
    { key: { 'reportante.id': 1, creada_en: -1 }, name: 'por_reportante' },
    { key: { 'tecnico.id': 1, estado: 1 }, name: 'por_tecnico' },
    { key: { estado: 1, creada_en: -1 }, name: 'por_estado' },
    { key: { edificio: 1 }, name: 'por_edificio' },
    {
      key: { titulo: 'text', descripcion: 'text', etiquetas: 'text' },
      name: 'busqueda_texto',
      default_language: 'spanish',
      weights: { titulo: 5, etiquetas: 3, descripcion: 1 },
    },
    { key: { resuelta_en: 1 }, name: 'ttl_resuelta_60_dias', expireAfterSeconds: SEGUNDOS_TTL_RESUELTA },
  ],
}
