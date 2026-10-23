// Cliente HTTP hacia la API de UTM Desk.
// La interfaz nunca se conecta a MongoDB: todo pasa por la API.
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('utm_desk_token')
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message ?? `Error ${response.status}`)
  }

  return response.json()
}
