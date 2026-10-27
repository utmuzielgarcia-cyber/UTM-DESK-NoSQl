import { apiFetch } from '../../services/api.js'

export function listar(filtros = {}) {
  const params = new URLSearchParams(Object.entries(filtros).filter(([, v]) => v !== undefined && v !== ''))
  return apiFetch(`/usuarios${params.size ? `?${params}` : ''}`).then((r) => r.usuarios)
}
export const crear = (datos) => apiFetch('/usuarios', { method: 'POST', body: datos }).then((r) => r.usuario)
export const actualizar = (id, cambios) => apiFetch(`/usuarios/${id}`, { method: 'PATCH', body: cambios }).then((r) => r.usuario)
