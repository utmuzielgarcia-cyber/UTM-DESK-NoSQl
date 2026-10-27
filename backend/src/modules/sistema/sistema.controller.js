import { COLECCIONES, obtenerDb } from '../../config/db.js'
import { env } from '../../config/env.js'

// Estado técnico del sistema para Soporte TI.
export async function estado(_req, res) {
  const db = await obtenerDb()
  const inicio = Date.now()
  await db.command({ ping: 1 })
  const latenciaMs = Date.now() - inicio

  const colecciones = await Promise.all(
    Object.values(COLECCIONES).map(async (nombre) => {
      const col = db.collection(nombre)
      const [documentos, indices] = await Promise.all([col.estimatedDocumentCount(), col.indexes()])
      return { nombre, documentos, indices: indices.map((i) => i.name) }
    }),
  )

  res.json({
    api: { version: process.env.npm_package_version ?? '1.0.0', node: process.version, uptimeSeg: Math.round(process.uptime()) },
    baseDeDatos: { nombre: env.mongoDb, conectada: true, latenciaMs },
    colecciones,
  })
}
