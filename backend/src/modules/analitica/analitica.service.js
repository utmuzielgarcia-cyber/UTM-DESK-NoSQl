import { COLECCIONES, coleccion } from '../../config/db.js'

// Analítica con pipelines de agregación sobre incidencias_campus.
export async function resumen() {
  const incidencias = await coleccion(COLECCIONES.incidencias)
  const [resultado] = await incidencias
    .aggregate([
      {
        $facet: {
          total: [{ $count: 'n' }],
          porEstado: [{ $group: { _id: '$estado', total: { $sum: 1 } } }],
          porCategoria: [{ $group: { _id: '$categoria', total: { $sum: 1 } } }],
          porEdificio: [
            {
              $group: {
                _id: '$edificio',
                total: { $sum: 1 },
                abiertas: { $sum: { $cond: [{ $in: ['$estado', ['abierta', 'asignada', 'en_proceso']] }, 1, 0] } },
              },
            },
            { $sort: { total: -1 } },
          ],
          etiquetas: [
            { $unwind: '$etiquetas' },
            { $group: { _id: '$etiquetas', total: { $sum: 1 } } },
            { $sort: { total: -1, _id: 1 } },
            { $limit: 10 },
          ],
          atencion: [
            { $match: { resuelta_en: { $exists: true } } },
            {
              $group: {
                _id: null,
                horasPromedio: { $avg: '$horas_invertidas' },
                horasResolucion: { $avg: { $divide: [{ $subtract: ['$resuelta_en', '$creada_en'] }, 3600000] } },
              },
            },
          ],
        },
      },
    ])
    .toArray()

  const aObjeto = (lista) => Object.fromEntries(lista.map(({ _id, total }) => [_id, total]))
  return {
    total: resultado.total[0]?.n ?? 0,
    porEstado: aObjeto(resultado.porEstado),
    porCategoria: aObjeto(resultado.porCategoria),
    porEdificio: resultado.porEdificio.map(({ _id, ...resto }) => ({ edificio: _id, ...resto })),
    etiquetas: resultado.etiquetas.map(({ _id, total }) => ({ etiqueta: _id, total })),
    horasPromedio: resultado.atencion[0]?.horasPromedio ?? 0,
    horasResolucionPromedio: resultado.atencion[0]?.horasResolucion ?? 0,
  }
}
