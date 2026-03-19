import { Router } from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/usuarios.controller.js'

const router = Router()

router.get('/usuarios', getUsers)
router.get('/usuarios/:id_usuario', getUser)
router.post('/usuarios', createUser)
router.put('/usuarios/:id_usuario', updateUser)
router.delete('/usuarios/:id_usuario', deleteUser)

export default router