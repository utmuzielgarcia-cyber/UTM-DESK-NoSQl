// Crea (o actualiza) colecciones con su validador y sus índices.
import { esquemaIncidencias, esquemaUsuarios, indices } from './esquemas.js'

async function asegurarColeccion(db, nombre, validator) {
  const existe = await db.listCollections({ name: nombre }).hasNext()
  if (existe) {
    if (validator) await db.command({ collMod: nombre, validator, validationLevel: 'strict' })
  } else {
    await db.createCollection(nombre, validator ? { validator, validationLevel: 'strict' } : {})
  }
}

export async function prepararBaseDeDatos(db) {
  await asegurarColeccion(db, 'usuarios', esquemaUsuarios)
  await asegurarColeccion(db, 'incidencias_campus', esquemaIncidencias)
  await asegurarColeccion(db, 'contadores')
  for (const [coleccion, lista] of Object.entries(indices)) {
    await db.collection(coleccion).createIndexes(lista)
  }
}
