import * as authService from './auth.service.js'
import { correo, texto } from '../../utils/validacion.js'

export async function login(req, res) {
  const datos = await authService.iniciarSesion(
    correo(req.body?.correo),
    texto(req.body?.password, 'password', { max: 128 }),
  )
  res.json(datos)
}

export function perfil(req, res) {
  res.json({ usuario: authService.usuarioPublico(req.usuario) })
}
