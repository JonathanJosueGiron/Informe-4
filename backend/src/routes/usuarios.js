import { Router } from "express";
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/usuarios.controller.js'

const router = Router()

router.get('/usuarios', getUsers)
router.post('/usuarios', createUser)
router.put('/usuarios', updateUser)
router.delete('/usuarios', deleteUser)

export default router