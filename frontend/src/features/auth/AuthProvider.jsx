import { useCallback, useEffect, useMemo, useState } from 'react'
import { TOKEN_KEY } from '../../services/api.js'
import { AuthContext } from './authContext.js'
import * as authService from './auth.service.js'

// Guarda la sesión (token + usuario) y la restaura al recargar la página.
export default function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(() => Boolean(localStorage.getItem(TOKEN_KEY)))

  const cerrarSesion = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setUsuario(null)
  }, [])

  useEffect(() => {
    if (!localStorage.getItem(TOKEN_KEY)) return
    authService
      .obtenerPerfil()
      .then(({ usuario }) => setUsuario(usuario))
      .catch(cerrarSesion)
      .finally(() => setCargando(false))
  }, [cerrarSesion])

  useEffect(() => {
    window.addEventListener('utm-desk:sesion-expirada', cerrarSesion)
    return () => window.removeEventListener('utm-desk:sesion-expirada', cerrarSesion)
  }, [cerrarSesion])

  const iniciarSesion = useCallback(async (correo, password) => {
    const { token, usuario } = await authService.login(correo, password)
    localStorage.setItem(TOKEN_KEY, token)
    setUsuario(usuario)
    return usuario
  }, [])

  const valor = useMemo(
    () => ({
      usuario,
      cargando,
      iniciarSesion,
      cerrarSesion,
      puede: (...permisos) => permisos.some((p) => usuario?.permisos.includes(p)),
    }),
    [usuario, cargando, iniciarSesion, cerrarSesion],
  )

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}
