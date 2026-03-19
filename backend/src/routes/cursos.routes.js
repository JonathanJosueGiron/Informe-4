import { Router } from "express";
import { getCourses, getCourse, createCourse, updateCourse, deleteCourse } from '../controllers/cursos.controller.js'

const router = Router()

router.get('/cursos', getCourses)
router.get('/cursos/:id_curso', getCourse)
router.post('/cursos', createCourse)
router.put('/cursos/:id_curso', updateCourse)
router.delete('/cursos/:id_curso', deleteCourse)

export default router