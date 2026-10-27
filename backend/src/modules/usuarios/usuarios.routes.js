import { Router } from 'express'
import { autenticar } from '../../middlewares/autenticar.js'
import { autorizar } from '../../middlewares/autorizar.js'
import { PERMISOS } from '../../permissions/roles.js'
import * as controller from './usuarios.controller.js'

const router = Router()

router.use(autenticar)
router.get('/', autorizar(PERMISOS.USUARIOS_VER), controller.listar)
router.post('/', autorizar(PERMISOS.USUARIOS_ADMINISTRAR), controller.crear)
router.patch('/:id', autorizar(PERMISOS.USUARIOS_ADMINISTRAR), controller.actualizar)

export default router
