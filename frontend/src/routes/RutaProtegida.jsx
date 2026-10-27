import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../features/auth/authContext.js'
import Cargando from '../components/ui/Cargando.jsx'
import SinPermisoPage from '../pages/SinPermisoPage.jsx'

// Exige sesión iniciada y, si se indican, al menos uno de los permisos.
export default function RutaProtegida({ permisos = [] }) {
  const { usuario, cargando, puede } = useAuth()
  const location = useLocation()

  if (cargando) return <div className="grid min-h-screen place-items-center"><Cargando texto="Verificando sesión…" /></div>
  if (!usuario) return <Navigate to="/login" replace state={{ desde: location.pathname }} />
  if (permisos.length && !puede(...permisos)) return <SinPermisoPage />
  return <Outlet />
}
