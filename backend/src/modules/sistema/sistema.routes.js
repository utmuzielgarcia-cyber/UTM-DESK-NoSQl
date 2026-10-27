import { Router } from 'express'
import { autenticar } from '../../middlewares/autenticar.js'
import { autorizar } from '../../middlewares/autorizar.js'
import { PERMISOS } from '../../permissions/roles.js'
import * as controller from './sistema.controller.js'

const router = Router()

router.get('/estado', autenticar, autorizar(PERMISOS.SISTEMA_VER), controller.estado)

export default router
