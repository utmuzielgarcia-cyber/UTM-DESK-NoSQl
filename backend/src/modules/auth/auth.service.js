import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { env } from '../../config/env.js'
import { COLECCIONES, coleccion } from '../../config/db.js'
import { permisosDe } from '../../permissions/roles.js'
import { noAutorizado } from '../../utils/HttpError.js'

export function usuarioPublico(usuario) {
  return {
    id: usuario._id.toString(),
    nombre: usuario.nombre,
    correo: usuario.correo,
    rol: usuario.rol,
    activo: usuario.activo,
    permisos: permisosDe(usuario.rol),
  }
}

export async function iniciarSesion(correo, password) {
  const usuarios = await coleccion(COLECCIONES.usuarios)
  const usuario = await usuarios.findOne({ correo })

  // Mismo mensaje para correo o contraseña incorrectos, para no revelar cuentas.
  const valido = usuario && (await bcrypt.compare(password, usuario.password_hash))
  if (!valido) throw noAutorizado('Correo o contraseña incorrectos')
  if (!usuario.activo) throw noAutorizado('Tu cuenta está desactivada, contacta a Soporte TI')

  await usuarios.updateOne({ _id: usuario._id }, { $set: { ultimo_acceso: new Date() } })

  const token = jwt.sign({ sub: usuario._id.toString(), rol: usuario.rol }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  })
  return { token, usuario: usuarioPublico(usuario) }
}
