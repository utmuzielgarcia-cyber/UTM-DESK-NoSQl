// Carga usuarios de prueba (uno por rol) e incidencias de ejemplo.
// Uso: npm run db:seed
import { cerrarConexion, obtenerDb } from '../src/config/db.js'
import { prepararBaseDeDatos } from './lib/preparar.js'
import { sembrar, USUARIOS_PRUEBA } from './lib/sembrar.js'

const password = process.env.SEED_PASSWORD ?? 'UtmDesk2026!'
const db = await obtenerDb()
await prepararBaseDeDatos(db)
const resultado = await sembrar(db, password)
console.log(`Listo: ${resultado.usuarios} usuarios y ${resultado.incidencias} incidencias nuevas.`)
console.table(USUARIOS_PRUEBA.map(({ correo, rol }) => ({ correo, rol, password })))
await cerrarConexion()
