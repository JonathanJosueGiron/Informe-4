import { Router } from "express";
import { getComnts, getComnt, createComnt, updateComnt, deleteComnt, getComntsFromPost } from '../controllers/comentarios.controller.js'
import { auth } from "../middleware/Auth.js";

const router = Router()

router.get('/comentarios', getComnts)
router.get('/publicaciones/:id_publicacion/comentarios', getComntsFromPost)
router.get('/comentarios/:id_comentario', getComnt)
router.post('/comentarios', auth, createComnt)
router.put('/comentarios/:id_comentario', updateComnt)
router.delete('/comentarios/:id_comentario', deleteComnt)

export default router