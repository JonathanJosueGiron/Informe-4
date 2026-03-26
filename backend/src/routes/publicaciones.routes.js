import { Router } from "express";
import { getPublis, getPubli, createPubli, updatePubli, deletePubli } from '../controllers/publicaciones.controller.js'
import { auth } from "../middleware/Auth.js";

const router = Router()

router.get('/publicaciones', getPublis)
router.get('/publicaciones/:id_publicacion', getPubli)
router.post('/publicaciones', auth, createPubli)
router.put('/publicaciones/:id_publicacion', updatePubli)
router.delete('/publicaciones/:id_publicacion', deletePubli)

export default router