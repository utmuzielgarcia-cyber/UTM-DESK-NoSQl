// Validaciones pequeñas y reutilizables para el cuerpo de las peticiones.
import { ObjectId } from 'mongodb'
import { solicitudInvalida, noEncontrado } from './HttpError.js'

export function texto(valor, campo, { min = 1, max = 500, opcional = false } = {}) {
  if (valor === undefined || valor === null || valor === '') {
    if (opcional) return undefined
    throw solicitudInvalida(`El campo "${campo}" es obligatorio`)
  }
  if (typeof valor !== 'string') throw solicitudInvalida(`El campo "${campo}" debe ser texto`)
  const limpio = valor.trim()
  if (limpio.length < min || limpio.length > max) {
    throw solicitudInvalida(`El campo "${campo}" debe tener entre ${min} y ${max} caracteres`)
  }
  return limpio
}

export function opcion(valor, campo, opciones, { opcional = false } = {}) {
  if (valor === undefined || valor === null || valor === '') {
    if (opcional) return undefined
    throw solicitudInvalida(`El campo "${campo}" es obligatorio`)
  }
  if (!opciones.includes(valor)) {
    throw solicitudInvalida(`El campo "${campo}" debe ser uno de: ${opciones.join(', ')}`)
  }
  return valor
}

export function correo(valor) {
  const limpio = texto(valor, 'correo', { max: 120 }).toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(limpio)) throw solicitudInvalida('El correo no es válido')
  return limpio
}

export function objectId(valor, recurso = 'Recurso') {
  if (!ObjectId.isValid(valor)) throw noEncontrado(`${recurso} no encontrado`)
  return new ObjectId(valor)
}
