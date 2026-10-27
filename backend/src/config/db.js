// Conexión única a MongoDB Atlas con el driver oficial (sin ODM).
// La conexión se reutiliza entre invocaciones de Vercel Functions.
import { MongoClient } from 'mongodb'
import { env } from './env.js'

export const COLECCIONES = {
  usuarios: 'usuarios',
  incidencias: 'incidencias_campus',
  contadores: 'contadores',
}

let clientePromesa = null

export function obtenerCliente() {
  if (!clientePromesa) {
    const cliente = new MongoClient(env.mongoUri, { appName: 'utm-desk-api' })
    clientePromesa = cliente.connect().catch((error) => {
      clientePromesa = null
      throw error
    })
  }
  return clientePromesa
}

export async function obtenerDb() {
  const cliente = await obtenerCliente()
  return cliente.db(env.mongoDb)
}

export async function coleccion(nombre) {
  const db = await obtenerDb()
  return db.collection(nombre)
}

export async function cerrarConexion() {
  if (clientePromesa) {
    const cliente = await clientePromesa
    await cliente.close()
    clientePromesa = null
  }
}
