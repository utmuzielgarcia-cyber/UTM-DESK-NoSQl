import { COLECCIONES, coleccion } from '../../config/db.js'
import { PERMISOS, ROLES, tienePermiso } from '../../permissions/roles.js'
import { noEncontrado, solicitudInvalida, conflicto, prohibido } from '../../utils/HttpError.js'
import { ESTADOS, TRANSICIONES_TECNICO } from './incidencias.constants.js'

const resumenUsuario = (u) => ({ id: u._id, nombre: u.nombre })
const autor = (u) => ({ id: u._id, nombre: u.nombre, rol: u.rol })

// Qué incidencias puede ver cada rol.
export function filtroVisibilidad(usuario) {
  if (tienePermiso(usuario.rol, PERMISOS.INCIDENCIAS_VER_TODAS)) return {}
  if (tienePermiso(usuario.rol, PERMISOS.INCIDENCIAS_VER_ASIGNADAS)) return { 'tecnico.id': usuario._id }
  if (tienePermiso(usuario.rol, PERMISOS.INCIDENCIAS_VER_PROPIAS)) return { 'reportante.id': usuario._id }
  throw prohibido()
}

async function siguienteFolio() {
  const anio = new Date().getFullYear()
  const contadores = await coleccion(COLECCIONES.contadores)
  const contador = await contadores.findOneAndUpdate(
    { _id: `incidencias-${anio}` },
    { $inc: { secuencia: 1 } },
    { upsert: true, returnDocument: 'after' },
  )
  return `INC-${anio}-${String(contador.secuencia).padStart(4, '0')}`
}

export async function listar(usuario, { estado, categoria, q, limite = 50 }) {
  const filtro = { ...filtroVisibilidad(usuario) }
  if (estado) filtro.estado = estado
  if (categoria) filtro.categoria = categoria

  const incidencias = await coleccion(COLECCIONES.incidencias)
  const opciones = { projection: { historial: 0 }, limit: limite }
  if (q) {
    // Búsqueda textual en español (índice de texto creado en setup-db).
    filtro.$text = { $search: q }
    opciones.projection.puntaje = { $meta: 'textScore' }
    opciones.sort = { puntaje: { $meta: 'textScore' } }
  } else {
    opciones.sort = { creada_en: -1 }
  }
  return incidencias.find(filtro, opciones).toArray()
}

export async function obtener(usuario, id) {
  const incidencias = await coleccion(COLECCIONES.incidencias)
  const incidencia = await incidencias.findOne({ _id: id, ...filtroVisibilidad(usuario) })
  if (!incidencia) throw noEncontrado('Incidencia no encontrada')
  return incidencia
}

export async function crear(usuario, datos) {
  const ahora = new Date()
  const documento = {
    folio: await siguienteFolio(),
    ...datos,
    estado: ESTADOS.ABIERTA,
    reportante: resumenUsuario(usuario),
    tecnico: null,
    etiquetas: [],
    horas_invertidas: 0,
    evidencias: [],
    historial: [{ fecha: ahora, usuario: autor(usuario), accion: 'creada', a: ESTADOS.ABIERTA }],
    creada_en: ahora,
    actualizada_en: ahora,
  }
  const incidencias = await coleccion(COLECCIONES.incidencias)
  const { insertedId } = await incidencias.insertOne(documento)
  return { ...documento, _id: insertedId }
}

export async function asignar(usuario, id, tecnicoId) {
  const usuarios = await coleccion(COLECCIONES.usuarios)
  const tecnico = await usuarios.findOne({ _id: tecnicoId, rol: ROLES.TECNICO, activo: true })
  if (!tecnico) throw solicitudInvalida('El técnico no existe o no está activo')

  const ahora = new Date()
  const incidencias = await coleccion(COLECCIONES.incidencias)
  const actual = await obtener(usuario, id)
  if (![ESTADOS.ABIERTA, ESTADOS.ASIGNADA].includes(actual.estado)) {
    throw conflicto('Solo se pueden asignar incidencias abiertas o reasignar las que aún no se atienden')
  }
  return incidencias.findOneAndUpdate(
    { _id: id, estado: actual.estado },
    {
      $set: { tecnico: resumenUsuario(tecnico), estado: ESTADOS.ASIGNADA, actualizada_en: ahora },
      $push: {
        historial: {
          fecha: ahora,
          usuario: autor(usuario),
          accion: actual.tecnico ? 'reasignada' : 'asignada',
          de: actual.estado,
          a: ESTADOS.ASIGNADA,
          nota: `Asignada a ${tecnico.nombre}`,
        },
      },
    },
    { returnDocument: 'after' },
  )
}

export async function atender(usuario, id, { estado, horas, etiquetas, nota }) {
  const actual = await obtener(usuario, id)
  if (!actual.tecnico?.id?.equals(usuario._id)) throw prohibido('Solo el técnico asignado puede atender esta incidencia')
  if ([ESTADOS.RESUELTA, ESTADOS.CERRADA].includes(actual.estado)) {
    throw conflicto('La incidencia ya está resuelta')
  }
  if (estado && !TRANSICIONES_TECNICO[actual.estado]?.includes(estado)) {
    throw conflicto(`No se puede pasar de "${actual.estado}" a "${estado}"`)
  }

  const ahora = new Date()
  const set = { actualizada_en: ahora }
  if (estado) set.estado = estado
  if (estado === ESTADOS.RESUELTA) set.resuelta_en = ahora

  const actualizacion = {
    $set: set,
    $push: {
      historial: {
        fecha: ahora,
        usuario: autor(usuario),
        accion: estado ? 'cambio_estado' : 'actualizacion',
        ...(estado && { de: actual.estado, a: estado }),
        ...(horas && { horas }),
        ...(nota && { nota }),
      },
    },
  }
  if (horas) actualizacion.$inc = { horas_invertidas: horas }
  if (etiquetas?.length) actualizacion.$addToSet = { etiquetas: { $each: etiquetas } }

  const incidencias = await coleccion(COLECCIONES.incidencias)
  const resultado = await incidencias.findOneAndUpdate({ _id: id, estado: actual.estado }, actualizacion, {
    returnDocument: 'after',
  })
  if (!resultado) throw conflicto('La incidencia cambió mientras la editabas, recarga la página')
  return resultado
}

export async function cerrar(usuario, id, nota) {
  const actual = await obtener(usuario, id)
  if (actual.estado !== ESTADOS.RESUELTA) throw conflicto('Solo se pueden cerrar incidencias resueltas')

  const ahora = new Date()
  const incidencias = await coleccion(COLECCIONES.incidencias)
  return incidencias.findOneAndUpdate(
    { _id: id, estado: ESTADOS.RESUELTA },
    {
      $set: { estado: ESTADOS.CERRADA, cerrada_en: ahora, actualizada_en: ahora },
      $push: {
        historial: {
          fecha: ahora,
          usuario: autor(usuario),
          accion: 'cerrada',
          de: ESTADOS.RESUELTA,
          a: ESTADOS.CERRADA,
          ...(nota && { nota }),
        },
      },
    },
    { returnDocument: 'after' },
  )
}
