// Permite el paso si el rol del usuario tiene al menos uno de los permisos.
// Si no, responde 403.
import { tienePermiso } from '../permissions/roles.js'
import { prohibido } from '../utils/HttpError.js'

export function autorizar(...permisos) {
  return (req, _res, next) => {
    const permitido = permisos.some((permiso) => tienePermiso(req.usuario?.rol, permiso))
    if (!permitido) throw prohibido()
    next()
  }
}
