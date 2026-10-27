// Verifica el JWT (Authorization: Bearer <token>) y carga al usuario.
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
import { env } from '../config/env.js'
import { COLECCIONES, coleccion } from '../config/db.js'
import { permisosDe } from '../permissions/roles.js'
import { noAutorizado } from '../utils/HttpError.js'

export async function autenticar(req, _res, next) {
  const [esquema, token] = (req.headers.authorization ?? '').split(' ')
  if (esquema !== 'Bearer' || !token) throw noAutorizado()

  let payload
  try {
    payload = jwt.verify(token, env.jwtSecret)
  } catch {
    throw noAutorizado('Tu sesión expiró o no es válida, vuelve a iniciar sesión')
  }

  // Se consulta al usuario para respetar cambios de rol o desactivaciones.
  const usuarios = await coleccion(COLECCIONES.usuarios)
  const usuario = ObjectId.isValid(payload.sub)
    ? await usuarios.findOne({ _id: new ObjectId(payload.sub) }, { projection: { password_hash: 0 } })
    : null
  if (!usuario || !usuario.activo) throw noAutorizado('Tu cuenta no está activa')

  req.usuario = { ...usuario, permisos: permisosDe(usuario.rol) }
  next()
}
