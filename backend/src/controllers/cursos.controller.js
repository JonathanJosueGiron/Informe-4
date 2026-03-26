import { pool } from '../db.js'

// Ver todos los cursos
export const getCourses = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM CURSO')
    res.json(rows)
}

// Ver un curso
export const getCourse = async (req, res) => {
    console.log(req.params)
    const [rows] = await pool.query('SELECT * FROM CURSO WHERE id_curso = ?', [req.params.id_curso])
    if (rows.length <= 0) return res.status(404).json({
        message: "curso no encontrado."
    })
    res.json(rows[0])
}

// Crear un curso
export const createCourse = async (req, res) => {
    const {nombre, creditos, area} = req.body
    const [rows] = await pool.query('INSERT INTO CURSO (nombre, creditos, area) VALUES (?, ?, ?)', 
     [nombre, creditos, area], (err, result) => {
        if (err){
            console.error("Error: "+err)
            return res.status(500).json(err)
        }
     })
    
    res.send("Curso registrado.")
}

// Actualizar un curso
export const updateCourse = async (req, res) => {
    const id_curso = req.params.id_curso
    const {nombre, creditos, area} = req.body
    const [rows] = await pool.query('UPDATE CURSO SET nombre = ?, creditos = ?, area = ? WHERE id_curso = ?', 
     [nombre, creditos, area, id_curso], (err, result) => {
        if (err){
            console.error("Error: "+err)
            return res.status(500).json(err)
        }
     })
    
    res.send({nombre, creditos, area})
}


// Eliminar un curso
export const deleteCourse = async (req, res) => {
    const [result] = await pool.query('DELETE FROM CURSO WHERE id_curso = ?', [req.params.id_curso])
    console.log(result)
    if (result.affectedRows <= 0) return res.status(404).json({
        message: "curso no encontrado."
    })
    res.sendStatus(204)
}