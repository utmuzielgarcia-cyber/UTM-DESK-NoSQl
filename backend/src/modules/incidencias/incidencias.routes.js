import { Router } from 'express'
import { autenticar } from '../../middlewares/autenticar.js'
import { autorizar } from '../../middlewares/autorizar.js'
import { PERMISOS } from '../../permissions/roles.js'
import * as controller from './incidencias.controller.js'

const P = PERMISOS
const puedeVer = autorizar(P.INCIDENCIAS_VER_PROPIAS, P.INCIDENCIAS_VER_ASIGNADAS, P.INCIDENCIAS_VER_TODAS)

const router = Router()

router.use(autenticar)
router.get('/', puedeVer, controller.listar)
router.get('/:id', puedeVer, controller.obtener)
router.post('/', autorizar(P.INCIDENCIAS_CREAR), controller.crear)
router.patch('/:id/asignar', autorizar(P.INCIDENCIAS_ASIGNAR), controller.asignar)
router.patch('/:id/atencion', autorizar(P.INCIDENCIAS_ATENDER), controller.atender)
router.patch('/:id/cerrar', autorizar(P.INCIDENCIAS_CERRAR), controller.cerrar)

export default router
