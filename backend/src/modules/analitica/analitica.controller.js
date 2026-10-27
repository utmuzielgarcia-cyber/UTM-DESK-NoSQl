import * as analiticaService from './analitica.service.js'

export async function resumen(_req, res) {
  res.json(await analiticaService.resumen())
}
