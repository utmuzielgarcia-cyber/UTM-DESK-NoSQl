// Prepara la base de datos en MongoDB Atlas: colecciones, $jsonSchema e índices.
// Uso: npm run db:setup
import { cerrarConexion, obtenerDb } from '../src/config/db.js'
import { prepararBaseDeDatos } from './lib/preparar.js'

const db = await obtenerDb()
await prepararBaseDeDatos(db)
console.log(`Base de datos "${db.databaseName}" lista (colecciones, validadores e índices).`)
await cerrarConexion()
