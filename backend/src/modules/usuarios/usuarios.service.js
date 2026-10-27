import bcrypt from 'bcryptjs'
import { COLECCIONES, coleccion } from '../../config/db.js'
import { conflicto, noEncontrado, solicitudInvalida } from '../../utils/HttpError.js'
import { usuarioPublico } from '../auth/auth.service.js'

const SIN_PASSWORD = { projection: { password_hash: 0 } }

export async function listar({ rol, activo } = {}) {
  const filtro = {}
  if (rol) filtro.rol = rol
  if (activo !== undefined) filtro.activo = activo
  const usuarios = await coleccion(COLECCIONES.usuarios)
  const lista = await usuarios.find(filtro, SIN_PASSWORD).sort({ nombre: 1 }).toArray()
  return lista.map(usuarioPublico)
}

export async function crear({ nombre, correo, password, rol }) {
  const usuarios = await coleccion(COLECCIONES.usuarios)
  const ahora = new Date()
  const documento = {
    nombre,
    correo,
    password_hash: await bcrypt.hash(password, 10),
    rol,
    activo: true,
    creado_en: ahora,
    actualizado_en: ahora,
  }
  try {
    const { insertedId } = await usuarios.insertOne(documento)
    return usuarioPublico({ ...documento, _id: insertedId })
  } catch (error) {
    if (error.code === 11000) throw conflicto('Ya existe un usuario con ese correo')
    throw error
  }
}

export async function actualizar(id, cambios, quienEdita) {
  if (id.equals(quienEdita._id) && (cambios.activo === false || (cambios.rol && cambios.rol !== quienEdita.rol))) {
    throw solicitudInvalida('No puedes desactivar tu propia cuenta ni cambiar tu propio rol')
  }
  const set = { actualizado_en: new Date() }
  if (cambios.nombre !== undefined) set.nombre = cambios.nombre
  if (cambios.rol !== undefined) set.rol = cambios.rol
  if (cambios.activo !== undefined) set.activo = cambios.activo
  if (cambios.password !== undefined) set.password_hash = await bcrypt.hash(cambios.password, 10)

  const usuarios = await coleccion(COLECCIONES.usuarios)
  const actualizado = await usuarios.findOneAndUpdate(
    { _id: id },
    { $set: set },
    { returnDocument: 'after', ...SIN_PASSWORD },
  )
  if (!actualizado) throw noEncontrado('Usuario no encontrado')
  return usuarioPublico(actualizado)
}
