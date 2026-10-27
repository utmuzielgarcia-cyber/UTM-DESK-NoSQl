import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage.jsx'
import AuthProvider from '../features/auth/AuthProvider.jsx'
import LoginPage from '../features/auth/LoginPage.jsx'
import PanelLayout from '../features/panel/PanelLayout.jsx'
import InicioPage from '../features/panel/InicioPage.jsx'
import IncidenciasPage from '../features/incidencias/IncidenciasPage.jsx'
import NuevaIncidenciaPage from '../features/incidencias/NuevaIncidenciaPage.jsx'
import IncidenciaDetallePage from '../features/incidencias/IncidenciaDetallePage.jsx'
import UsuariosPage from '../features/usuarios/UsuariosPage.jsx'
import AnaliticaPage from '../features/analitica/AnaliticaPage.jsx'
import SistemaPage from '../features/sistema/SistemaPage.jsx'
import { PERMISOS } from '../constants/permisos.js'
import RutaProtegida from './RutaProtegida.jsx'

const P = PERMISOS
const VER_INCIDENCIAS = [P.INCIDENCIAS_VER_PROPIAS, P.INCIDENCIAS_VER_ASIGNADAS, P.INCIDENCIAS_VER_TODAS]

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/panel" element={<RutaProtegida />}>
            <Route element={<PanelLayout />}>
              <Route index element={<InicioPage />} />
              <Route element={<RutaProtegida permisos={VER_INCIDENCIAS} />}>
                <Route path="incidencias" element={<IncidenciasPage />} />
                <Route path="incidencias/:id" element={<IncidenciaDetallePage />} />
              </Route>
              <Route element={<RutaProtegida permisos={[P.INCIDENCIAS_CREAR]} />}>
                <Route path="incidencias/nueva" element={<NuevaIncidenciaPage />} />
              </Route>
              <Route element={<RutaProtegida permisos={[P.USUARIOS_VER]} />}>
                <Route path="usuarios" element={<UsuariosPage />} />
              </Route>
              <Route element={<RutaProtegida permisos={[P.ANALITICA_VER]} />}>
                <Route path="analitica" element={<AnaliticaPage />} />
              </Route>
              <Route element={<RutaProtegida permisos={[P.SISTEMA_VER]} />}>
                <Route path="sistema" element={<SistemaPage />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
