import { Router } from "express";
import { getAprCourses, getAprCourse, createAprCourse, updateAprCourse, deleteAprCourse, getAprCourseByUser } from '../controllers/cursos_apr.controller.js'
import { auth } from "../middleware/Auth.js";

const router = Router()

router.get('/cursosapr', getAprCourses)
router.get('/cursosapr/:id_curso', getAprCourse)
router.post('/cursosapr', createAprCourse)
router.put('/cursosapr/:id_curso', updateAprCourse)
router.delete('/cursosapr/:id_curso', deleteAprCourse)

router.get('/vercursos', auth, getAprCourseByUser)
router.get('/vercursos/:id_usuario', getAprCourseByUser)

export default router