import { apiFetch } from '../../services/api.js'

export function listar(filtros = {}) {
  const params = new URLSearchParams(Object.entries(filtros).filter(([, v]) => v))
  return apiFetch(`/incidencias${params.size ? `?${params}` : ''}`).then((r) => r.incidencias)
}
export const obtener = (id) => apiFetch(`/incidencias/${id}`).then((r) => r.incidencia)
export const crear = (datos) => apiFetch('/incidencias', { method: 'POST', body: datos }).then((r) => r.incidencia)
export const asignar = (id, tecnico_id) =>
  apiFetch(`/incidencias/${id}/asignar`, { method: 'PATCH', body: { tecnico_id } }).then((r) => r.incidencia)
export const atender = (id, cambios) =>
  apiFetch(`/incidencias/${id}/atencion`, { method: 'PATCH', body: cambios }).then((r) => r.incidencia)
export const cerrar = (id, nota) =>
  apiFetch(`/incidencias/${id}/cerrar`, { method: 'PATCH', body: { nota } }).then((r) => r.incidencia)
