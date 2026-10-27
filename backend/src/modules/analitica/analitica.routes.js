import { Router } from 'express'
import { autenticar } from '../../middlewares/autenticar.js'
import { autorizar } from '../../middlewares/autorizar.js'
import { PERMISOS } from '../../permissions/roles.js'
import * as controller from './analitica.controller.js'

const router = Router()

router.get('/', autenticar, autorizar(PERMISOS.ANALITICA_VER), controller.resumen)

export default router
