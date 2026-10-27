// Cliente HTTP hacia la API de UTM Desk.
// La interfaz nunca se conecta a MongoDB: todo pasa por la API.
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'
export const TOKEN_KEY = 'utm_desk_token'

export class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

export async function apiFetch(path, { body, ...options } = {}) {
  const token = localStorage.getItem(TOKEN_KEY)
  let response
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      body: body === undefined ? undefined : JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    })
  } catch {
    throw new ApiError(0, 'No se pudo conectar con la API. ¿Está corriendo el backend?')
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    if (response.status === 401 && token) window.dispatchEvent(new Event('utm-desk:sesion-expirada'))
    throw new ApiError(response.status, error.message ?? `Error ${response.status}`)
  }

  return response.json()
}
