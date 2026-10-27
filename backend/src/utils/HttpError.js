// Error con código HTTP que el manejador de errores convierte en respuesta JSON.
export class HttpError extends Error {
  constructor(status, message, detalles) {
    super(message)
    this.status = status
    this.detalles = detalles
  }
}

export const noAutorizado = (msg = 'Necesitas iniciar sesión') => new HttpError(401, msg)
export const prohibido = (msg = 'Tu rol no tiene permiso para esta acción') => new HttpError(403, msg)
export const noEncontrado = (msg = 'Recurso no encontrado') => new HttpError(404, msg)
export const solicitudInvalida = (msg, detalles) => new HttpError(400, msg, detalles)
export const conflicto = (msg) => new HttpError(409, msg)
