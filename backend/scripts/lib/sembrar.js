// Datos de prueba: un usuario por rol (más un técnico extra) e incidencias de ejemplo
// que pasan por todo el flujo. Si los usuarios ya existen no se duplican.
import bcrypt from 'bcryptjs'

export const USUARIOS_PRUEBA = [
  { nombre: 'Ana Reportante', correo: 'reportante@utm.mx', rol: 'reportante' },
  { nombre: 'Tomás Técnico', correo: 'tecnico@utm.mx', rol: 'tecnico' },
  { nombre: 'Rosa Técnica de Redes', correo: 'tecnico2@utm.mx', rol: 'tecnico' },
  { nombre: 'Carlos Coordinador', correo: 'coordinador@utm.mx', rol: 'coordinador' },
  { nombre: 'Diana Directiva', correo: 'directivo@utm.mx', rol: 'directivo' },
  { nombre: 'Sergio Soporte TI', correo: 'soporte@utm.mx', rol: 'soporte_ti' },
]

const horas = (n) => new Date(Date.now() - n * 3600000)

export async function sembrar(db, password) {
  const usuarios = db.collection('usuarios')
  const hash = await bcrypt.hash(password, 10)
  const ids = {}
  for (const u of USUARIOS_PRUEBA) {
    const ahora = new Date()
    const r = await usuarios.findOneAndUpdate(
      { correo: u.correo },
      { $setOnInsert: { ...u, password_hash: hash, activo: true, creado_en: ahora, actualizado_en: ahora } },
      { upsert: true, returnDocument: 'after' },
    )
    ids[u.correo] = r
  }

  const incidencias = db.collection('incidencias_campus')
  if ((await incidencias.estimatedDocumentCount()) > 0) return { usuarios: USUARIOS_PRUEBA.length, incidencias: 0 }

  const ref = (u) => ({ id: u._id, nombre: u.nombre })
  const autor = (u) => ({ id: u._id, nombre: u.nombre, rol: u.rol })
  const rep = ids['reportante@utm.mx']
  const tec = ids['tecnico@utm.mx']
  const tec2 = ids['tecnico2@utm.mx']
  const coord = ids['coordinador@utm.mx']
  const anio = new Date().getFullYear()

  const base = [
    {
      titulo: 'Proyector del aula 204 no enciende',
      descripcion: 'El proyector no enciende desde ayer, ya revisamos el cable de corriente.',
      categoria: 'computo_redes', edificio: 'Edificio A', ubicacion: 'Aula 204', prioridad: 'alta',
      detalle: { tipo_equipo: 'proyector', numero_inventario: 'PRY-0042' },
      estado: 'abierta', creada: 3,
    },
    {
      titulo: 'Sin Wi-Fi en la biblioteca',
      descripcion: 'La red inalámbrica de la planta alta de la biblioteca no da acceso a internet.',
      categoria: 'computo_redes', edificio: 'Biblioteca', ubicacion: 'Planta alta', prioridad: 'critica',
      detalle: { tipo_equipo: 'red' }, estado: 'asignada', tecnico: tec2, creada: 20,
    },
    {
      titulo: 'Fuga de agua en baños del edificio C',
      descripcion: 'Hay una fuga constante en el lavabo de los baños de la planta baja.',
      categoria: 'infraestructura', edificio: 'Edificio C', ubicacion: 'Baños planta baja', prioridad: 'media',
      detalle: { tipo_instalacion: 'hidraulica' }, estado: 'en_proceso', tecnico: tec, etiquetas: ['fuga', 'plomeria'], horas: 1.5, creada: 30,
    },
    {
      titulo: 'Aire acondicionado del laboratorio 3',
      descripcion: 'El aire acondicionado del laboratorio de cómputo 3 hace ruido y no enfría.',
      categoria: 'infraestructura', edificio: 'Edificio A', ubicacion: 'Laboratorio 3', prioridad: 'alta',
      detalle: { tipo_instalacion: 'clima' }, estado: 'resuelta', tecnico: tec, etiquetas: ['clima', 'laboratorio'], horas: 3, creada: 72, resuelta: 10,
    },
    {
      titulo: 'Choque de horario en Bases de Datos',
      descripcion: 'El grupo 5B tiene Bases de Datos en la Nube y Redes a la misma hora los martes.',
      categoria: 'academico', edificio: 'Edificio B', ubicacion: 'Coordinación académica', prioridad: 'media',
      detalle: { asunto: 'horario', materia: 'Base de Datos en la Nube' }, estado: 'cerrada', tecnico: tec, etiquetas: ['horario'], horas: 0.5, creada: 120, resuelta: 96,
    },
  ]

  const documentos = base.map((b, i) => {
    const creada_en = horas(b.creada)
    const historial = [{ fecha: creada_en, usuario: autor(rep), accion: 'creada', a: 'abierta' }]
    if (b.tecnico) {
      historial.push({ fecha: horas(b.creada - 1), usuario: autor(coord), accion: 'asignada', de: 'abierta', a: 'asignada', nota: `Asignada a ${b.tecnico.nombre}` })
    }
    if (['en_proceso', 'resuelta', 'cerrada'].includes(b.estado)) {
      historial.push({ fecha: horas(b.creada - 2), usuario: autor(b.tecnico), accion: 'cambio_estado', de: 'asignada', a: 'en_proceso', horas: b.horas })
    }
    if (['resuelta', 'cerrada'].includes(b.estado)) {
      historial.push({ fecha: horas(b.resuelta), usuario: autor(b.tecnico), accion: 'cambio_estado', de: 'en_proceso', a: 'resuelta', nota: 'Trabajo terminado' })
    }
    if (b.estado === 'cerrada') {
      historial.push({ fecha: horas(b.resuelta - 2), usuario: autor(coord), accion: 'cerrada', de: 'resuelta', a: 'cerrada' })
    }
    const doc = {
      folio: `INC-${anio}-${String(i + 1).padStart(4, '0')}`,
      titulo: b.titulo, descripcion: b.descripcion, categoria: b.categoria, edificio: b.edificio,
      ubicacion: b.ubicacion, prioridad: b.prioridad, detalle: b.detalle, estado: b.estado,
      reportante: ref(rep), tecnico: b.tecnico ? ref(b.tecnico) : null,
      etiquetas: b.etiquetas ?? [], horas_invertidas: b.horas ?? 0, evidencias: [], historial,
      creada_en, actualizada_en: historial.at(-1).fecha,
    }
    if (b.resuelta) doc.resuelta_en = horas(b.resuelta)
    if (b.estado === 'cerrada') doc.cerrada_en = horas(b.resuelta - 2)
    return doc
  })

  await incidencias.insertMany(documentos)
  await db.collection('contadores').updateOne(
    { _id: `incidencias-${anio}` },
    { $max: { secuencia: documentos.length } },
    { upsert: true },
  )
  return { usuarios: USUARIOS_PRUEBA.length, incidencias: documentos.length }
}
