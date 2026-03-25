import { Router } from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser, userLogin, getUserAuth, newPassword} from '../controllers/usuarios.controller.js'
import { auth } from "../middleware/Auth.js";
const router = Router()

router.get('/usuarios', getUsers)
router.get('/usuarios/:id_usuario', getUser)
router.post('/usuarios', createUser)
router.put('/usuarios/:id_usuario', updateUser)
router.delete('/usuarios/:id_usuario', deleteUser)

router.post('/login', userLogin)
router.get('/profile', auth, getUserAuth)
router.put('/resetpassword',newPassword)

export default router