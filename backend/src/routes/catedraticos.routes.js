import { Router } from "express";
import { getProfs, getProf, createProf, updateProf, deleteProf } from '../controllers/catedraticos.controller.js'

const router = Router()

router.get('/catedraticos', getProfs)
router.get('/catedraticos/:id_catedratico', getProf)
router.post('/catedraticos', createProf)
router.put('/catedraticos/:id_catedratico', updateProf)
router.delete('/catedraticos/:id_catedratico', deleteProf)

export default router