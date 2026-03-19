import { Router } from "express";
import { getAprCourses, getAprCourse, createAprCourse, updateAprCourse, deleteAprCourse } from '../controllers/cursos_apr.controller.js'

const router = Router()

router.get('/cursosapr', getAprCourses)
router.get('/cursosapr/:id_curso', getAprCourse)
router.post('/cursosapr', createAprCourse)
router.put('/cursosapr/:id_curso', updateAprCourse)
router.delete('/cursosapr/:id_curso', deleteAprCourse)

export default router