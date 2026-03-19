import { pool } from '../db.js'

// Ver todas las publicaciones
export const getPublis = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM PUBLICACION')
    res.json(rows)
}

// Ver una publicacion
export const getPubli = async (req, res) => {
    console.log(req.params)
    const [rows] = await pool.query('SELECT * FROM PUBLICACION WHERE id_publicacion = ?', [req.params.id_publicacion])
    if (rows.length <= 0) return res.status(404).json({
        message: "publicacion no encontrada."
    })
    res.json(rows[0])
}

// Crear una publicacion
export const createPubli = async (req, res) => {
    const {id_publicacion, mensaje, fecha, USUARIO_id_usuario, CATEDRATICO_id_catedratico, CURSO_id_curso} = req.body
    const [rows] = await pool.query('INSERT INTO PUBLICACION (id_publicacion, mensaje, fecha, USUARIO_id_usuario, CATEDRATICO_id_catedratico, CURSO_id_curso) VALUES (?, ?, ?, ?, ?, ?)', 
     [id_publicacion, mensaje, fecha, USUARIO_id_usuario, CATEDRATICO_id_catedratico, CURSO_id_curso], (err, result) => {
        if (err){
            console.error("Error: "+err)
            return res.status(500).json(err)
        }
     })
    
    res.send({id_publicacion, mensaje, fecha, USUARIO_id_usuario, CATEDRATICO_id_catedratico, CURSO_id_curso})
}

// Actualizar una publicacion
export const updatePubli = async (req, res) => {
    const id_publicacion = req.params.id_publicacion
    const {mensaje, fecha, USUARIO_id_usuario, CATEDRATICO_id_catedratico, CURSO_id_curso} = req.body
    const [rows] = await pool.query('UPDATE PUBLICACION SET mensaje = ?, fecha = ?, USUARIO_id_usuario = ?, CATEDRATICO_id_catedratico = ?, CURSO_id_curso = ? WHERE id_publicacion = ?', 
     [mensaje, fecha, USUARIO_id_usuario, CATEDRATICO_id_catedratico, CURSO_id_curso, id_publicacion], (err, result) => {
        if (err){
            console.error("Error: "+err)
            return res.status(500).json(err)
        }
     })
    
    res.send({id_publicacion, mensaje, fecha, USUARIO_id_usuario, CATEDRATICO_id_catedratico, CURSO_id_curso})
}


// Eliminar una publicacion
export const deletePubli = async (req, res) => {
    const [result] = await pool.query('DELETE FROM PUBLICACION WHERE id_publicacion = ?', [req.params.id_publicacion])
    console.log(result)
    if (result.affectedRows <= 0) return res.status(404).json({
        message: "publicacion no encontrada."
    })
    res.sendStatus(204)
}