import * as usuariosService from './usuarios.service.js'
import { LISTA_ROLES } from '../../permissions/roles.js'
import { correo, objectId, opcion, texto } from '../../utils/validacion.js'
import { solicitudInvalida } from '../../utils/HttpError.js'

export async function listar(req, res) {
  const rol = opcion(req.query.rol, 'rol', LISTA_ROLES, { opcional: true })
  const activo = req.query.activo === undefined ? undefined : req.query.activo === 'true'
  res.json({ usuarios: await usuariosService.listar({ rol, activo }) })
}

export async function crear(req, res) {
  const body = req.body ?? {}
  const usuario = await usuariosService.crear({
    nombre: texto(body.nombre, 'nombre', { min: 3, max: 80 }),
    correo: correo(body.correo),
    password: texto(body.password, 'password', { min: 8, max: 128 }),
    rol: opcion(body.rol, 'rol', LISTA_ROLES),
  })
  res.status(201).json({ usuario })
}

export async function actualizar(req, res) {
  const body = req.body ?? {}
  if (body.activo !== undefined && typeof body.activo !== 'boolean') {
    throw solicitudInvalida('El campo "activo" debe ser true o false')
  }
  const cambios = {
    nombre: texto(body.nombre, 'nombre', { min: 3, max: 80, opcional: true }),
    rol: opcion(body.rol, 'rol', LISTA_ROLES, { opcional: true }),
    activo: body.activo,
    password: texto(body.password, 'password', { min: 8, max: 128, opcional: true }),
  }
  const usuario = await usuariosService.actualizar(objectId(req.params.id, 'Usuario'), cambios, req.usuario)
  res.json({ usuario })
}
