import * as incidenciasService from './incidencias.service.js'
import { CATEGORIAS, LISTA_CATEGORIAS, LISTA_ESTADOS, PRIORIDADES, TRANSICIONES_TECNICO } from './incidencias.constants.js'
import { objectId, opcion, texto } from '../../utils/validacion.js'
import { solicitudInvalida } from '../../utils/HttpError.js'

function validarDetalle(categoria, detalle = {}) {
  const { campo, opciones } = CATEGORIAS[categoria]
  const resultado = { [campo]: opcion(detalle[campo], `detalle.${campo}`, opciones) }
  if (categoria === 'computo_redes') {
    const inventario = texto(detalle.numero_inventario, 'detalle.numero_inventario', { max: 40, opcional: true })
    if (inventario) resultado.numero_inventario = inventario
  }
  if (categoria === 'academico') {
    const materia = texto(detalle.materia, 'detalle.materia', { max: 80, opcional: true })
    if (materia) resultado.materia = materia
  }
  return resultado
}

function validarEtiquetas(etiquetas) {
  if (etiquetas === undefined) return undefined
  if (!Array.isArray(etiquetas) || etiquetas.length > 10) {
    throw solicitudInvalida('Las etiquetas deben ser una lista de máximo 10 elementos')
  }
  return [...new Set(etiquetas.map((e) => texto(e, 'etiquetas', { max: 30 }).toLowerCase()))]
}

export async function listar(req, res) {
  const incidencias = await incidenciasService.listar(req.usuario, {
    estado: opcion(req.query.estado, 'estado', LISTA_ESTADOS, { opcional: true }),
    categoria: opcion(req.query.categoria, 'categoria', LISTA_CATEGORIAS, { opcional: true }),
    q: texto(req.query.q, 'q', { max: 100, opcional: true }),
  })
  res.json({ incidencias })
}

export async function obtener(req, res) {
  const incidencia = await incidenciasService.obtener(req.usuario, objectId(req.params.id, 'Incidencia'))
  res.json({ incidencia })
}

export async function crear(req, res) {
  const body = req.body ?? {}
  const categoria = opcion(body.categoria, 'categoria', LISTA_CATEGORIAS)
  const incidencia = await incidenciasService.crear(req.usuario, {
    titulo: texto(body.titulo, 'titulo', { min: 5, max: 120 }),
    descripcion: texto(body.descripcion, 'descripcion', { min: 10, max: 2000 }),
    categoria,
    edificio: texto(body.edificio, 'edificio', { max: 60 }),
    ubicacion: texto(body.ubicacion, 'ubicacion', { max: 120, opcional: true }) ?? '',
    prioridad: opcion(body.prioridad ?? 'media', 'prioridad', PRIORIDADES),
    detalle: validarDetalle(categoria, body.detalle),
  })
  res.status(201).json({ incidencia })
}

export async function asignar(req, res) {
  const incidencia = await incidenciasService.asignar(
    req.usuario,
    objectId(req.params.id, 'Incidencia'),
    objectId(req.body?.tecnico_id, 'Técnico'),
  )
  res.json({ incidencia })
}

export async function atender(req, res) {
  const body = req.body ?? {}
  const estadosTecnico = [...new Set(Object.values(TRANSICIONES_TECNICO).flat())]
  const horas = body.horas === undefined ? undefined : Number(body.horas)
  if (horas !== undefined && (!Number.isFinite(horas) || horas <= 0 || horas > 24)) {
    throw solicitudInvalida('Las horas deben ser un número entre 0 y 24')
  }
  const cambios = {
    estado: opcion(body.estado, 'estado', estadosTecnico, { opcional: true }),
    horas,
    etiquetas: validarEtiquetas(body.etiquetas),
    nota: texto(body.nota, 'nota', { max: 500, opcional: true }),
  }
  if (!cambios.estado && !cambios.horas && !cambios.etiquetas?.length && !cambios.nota) {
    throw solicitudInvalida('No hay cambios que guardar')
  }
  const incidencia = await incidenciasService.atender(req.usuario, objectId(req.params.id, 'Incidencia'), cambios)
  res.json({ incidencia })
}

export async function cerrar(req, res) {
  const incidencia = await incidenciasService.cerrar(
    req.usuario,
    objectId(req.params.id, 'Incidencia'),
    texto(req.body?.nota, 'nota', { max: 500, opcional: true }),
  )
  res.json({ incidencia })
}
