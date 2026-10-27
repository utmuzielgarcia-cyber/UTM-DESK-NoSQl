import { apiFetch } from '../../services/api.js'

export const obtenerResumen = () => apiFetch('/analitica')
