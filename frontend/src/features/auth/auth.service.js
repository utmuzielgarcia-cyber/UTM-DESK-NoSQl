import { apiFetch } from '../../services/api.js'

export const login = (correo, password) => apiFetch('/auth/login', { method: 'POST', body: { correo, password } })
export const obtenerPerfil = () => apiFetch('/auth/me')
