// Configuración de Express: middlewares globales y rutas de cada módulo.
import express from 'express'
import cors from 'cors'
import { env } from './config/env.js'
import authRoutes from './modules/auth/auth.routes.js'
import usuariosRoutes from './modules/usuarios/usuarios.routes.js'
import incidenciasRoutes from './modules/incidencias/incidencias.routes.js'
import analiticaRoutes from './modules/analitica/analitica.routes.js'
import sistemaRoutes from './modules/sistema/sistema.routes.js'
import { manejarErrores, rutaNoEncontrada } from './middlewares/errores.js'

const app = express()

app.disable('x-powered-by')
app.use(cors({ origin: env.frontendUrl.split(',') }))
app.use(express.json({ limit: '100kb' }))

app.get('/api/salud', (_req, res) => res.json({ ok: true, servicio: 'utm-desk-api' }))
app.use('/api/auth', authRoutes)
app.use('/api/usuarios', usuariosRoutes)
app.use('/api/incidencias', incidenciasRoutes)
app.use('/api/analitica', analiticaRoutes)
app.use('/api/sistema', sistemaRoutes)

app.use(rutaNoEncontrada)
app.use(manejarErrores)

export default app
