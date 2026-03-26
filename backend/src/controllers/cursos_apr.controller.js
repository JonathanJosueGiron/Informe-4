import { pool } from '../db.js'

// Ver todos los cursos aprobados
export const getAprCourses = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM CURSO_APR')
    res.json(rows)
}

// Ver un curso aprobado
export const getAprCourse = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM CURSO_APR WHERE id_curso_apr = ?', [req.params.id_curso])
    if (rows.length <= 0) return res.status(404).json({
        message: "curso no encontrado."
    })
    res.json(rows[0])
}

// Crear un curso aprobado
export const createAprCourse = async (req, res) => {
    const {fecha_apr, USUARIO_id_usuario, CURSO_id_curso} = req.body
    const [rows] = await pool.query('INSERT INTO CURSO_APR (fecha_apr, USUARIO_id_usuario, CURSO_id_curso) VALUES (?, ?, ?)', 
     [fecha_apr, USUARIO_id_usuario, CURSO_id_curso], (err, result) => {
        if (err){
            console.error("Error: "+err)
            return res.status(500).json(err)
        }
     })
    
    res.send({fecha_apr, USUARIO_id_usuario, CURSO_id_curso})
}

// Actualizar un curso aprobado
export const updateAprCourse = async (req, res) => {
    const id_curso_apr = req.params.id_curso
    const {fecha_apr, USUARIO_id_usuario, CURSO_id_curso} = req.body
    const [rows] = await pool.query('UPDATE CURSO_APR SET fecha_apr = ?, USUARIO_id_usuario = ?, CURSO_id_curso = ? WHERE id_curso_apr = ?', 
     [fecha_apr, USUARIO_id_usuario, CURSO_id_curso, id_curso_apr], (err, result) => {
        if (err){
            console.error("Error: "+err)
            return res.status(500).json(err)
        }
     })
    
    res.send({fecha_apr, USUARIO_id_usuario, CURSO_id_curso})
}


// Eliminar un curso aprobado
export const deleteAprCourse = async (req, res) => {
    const [result] = await pool.query('DELETE FROM CURSO_APR WHERE id_curso_apr = ?', [req.params.id_curso])
    if (result.affectedRows <= 0) return res.status(404).json({
        message: "curso no encontrado."
    })
    res.sendStatus(204)
}