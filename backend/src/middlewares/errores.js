// Respuestas uniformes para rutas inexistentes y errores.
import { HttpError } from '../utils/HttpError.js'

export function rutaNoEncontrada(req, _res, next) {
  next(new HttpError(404, `No existe la ruta ${req.method} ${req.originalUrl}`))
}

// eslint-disable-next-line no-unused-vars
export function manejarErrores(error, _req, res, _next) {
  if (error instanceof HttpError) {
    return res.status(error.status).json({ message: error.message, detalles: error.detalles })
  }
  if (error?.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'El cuerpo de la petición no es JSON válido' })
  }
  if (error?.code === 121) {
    return res.status(400).json({ message: 'El documento no cumple el esquema de la base de datos' })
  }
  console.error(error)
  res.status(500).json({ message: 'Error interno del servidor' })
}
