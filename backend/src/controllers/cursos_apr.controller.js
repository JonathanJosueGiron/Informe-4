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

// Ver los cursos aprobados de un usuario
export const getAprCourseByUser = async (req, res) => {
	console.log(req.params.id_usuario)
	console.log(req.user)
	let registro = -1
    let id_user = -1
    console.log("Param: "+req.params.id_usuario)
	if (req.params.id_usuario){
        registro = req.params.id_usuario
        const [user] = await pool.query('SELECT id_usuario FROM usuario WHERE id_usuario = ?', [registro])
		id_user = user[0].id_usuario
	} else{
        id_user = req.user.id
    }
    const [rows] = await pool.query(`SELECT 
        ca.id_curso_apr,
        ca.fecha_apr,
        cu.nombre AS nombre_curso
        FROM CURSO_APR ca
        JOIN curso cu ON ca.CURSO_id_curso = cu.id_curso
        WHERE ca.USUARIO_id_usuario = ?`, [id_user])
    if (rows.length <= 0) return res.status(404).json({
        message: "Usuario no encontrado."
    })
    res.json(rows)
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