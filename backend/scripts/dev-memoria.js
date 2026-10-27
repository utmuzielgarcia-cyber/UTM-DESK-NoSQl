// Modo de prueba sin Atlas: levanta MongoDB en memoria, crea el esquema,
// carga los datos de prueba y arranca la API. Los datos se pierden al detenerlo.
// Uso: npm run dev:memoria
import { MongoMemoryServer } from 'mongodb-memory-server'

const mongo = await MongoMemoryServer.create()
process.env.MONGODB_URI = mongo.getUri()
process.env.MONGODB_DB ??= 'utm_desk'
process.env.JWT_SECRET ??= 'secreto-solo-para-pruebas-locales'

const { obtenerDb } = await import('../src/config/db.js')
const { prepararBaseDeDatos } = await import('./lib/preparar.js')
const { sembrar, USUARIOS_PRUEBA } = await import('./lib/sembrar.js')

const password = process.env.SEED_PASSWORD ?? 'UtmDesk2026!'
const db = await obtenerDb()
await prepararBaseDeDatos(db)
await sembrar(db, password)

console.log('\nMongoDB en memoria listo. Usuarios de prueba (contraseña: ' + password + '):')
console.table(USUARIOS_PRUEBA.map(({ correo, rol }) => ({ correo, rol })))

await import('../src/server.js')

const detener = async () => {
  await mongo.stop()
  process.exit(0)
}
process.on('SIGINT', detener)
process.on('SIGTERM', detener)
