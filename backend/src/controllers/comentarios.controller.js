import { pool } from '../db.js'

// Ver todos los comentarios
export const getComnts = async (req, res) => {
    const [rows] = await pool.query(`SELECT * FROM COMENTARIO`)
    res.json(rows)
}
// Ver todos los comentarios de una publicación
export const getComntsFromPost = async (req, res) => {
    const [rows] = await pool.query(`SELECT 
        com.id_comentario,
        p.mensaje AS mensaje_publicacion,
        com.mensaje,
        com.fecha,
        u.nombre AS nombre_usuario
        FROM COMENTARIO com
        JOIN usuario u ON com.USUARIO_id_usuario = u.id_usuario
        JOIN publicacion p ON p.id_publicacion = PUBLICACION_id_publicacion
        WHERE PUBLICACION_id_publicacion = ?
        ORDER BY com.fecha DESC`, [req.params.id_publicacion])
    res.json(rows)
}

// Ver un comentario
export const getComnt = async (req, res) => {
    console.log(req.params)
    const [rows] = await pool.query('SELECT * FROM COMENTARIO WHERE id_comentario = ?', [req.params.id_comentario])
    if (rows.length <= 0) return res.status(404).json({
        message: "comentario no encontrado."
    })
    res.json(rows[0])
}

// Crear un comentario
export const createComnt = async (req, res) => {
    console.log(req.user.id)
    const USUARIO_id_usuario = req.user.id
    const {mensaje, PUBLICACION_id_publicacion} = req.body
    const [rows] = await pool.query('INSERT INTO COMENTARIO (mensaje, fecha, PUBLICACION_id_publicacion, USUARIO_id_usuario) VALUES (?, CURDATE(), ?, ?)', 
     [mensaje, PUBLICACION_id_publicacion, USUARIO_id_usuario], (err, result) => {
        if (err){
            console.error("Error: "+err)
            return res.status(500).json(err)
        }
     })
    
    res.send("Se ha publicado el comentario.")
}

// Actualizar un comentario
export const updateComnt = async (req, res) => {
    const id_comentario = req.params.id_comentario
    const {mensaje, fecha, PUBLICACION_id_publicacion, USUARIO_id_usuario} = req.body
    const [rows] = await pool.query('UPDATE COMENTARIO SET mensaje = ?, fecha = ?, PUBLICACION_id_publicacion = ?, USUARIO_id_usuario = ? WHERE id_comentario = ?', 
     [mensaje, fecha, PUBLICACION_id_publicacion, USUARIO_id_usuario, id_comentario], (err, result) => {
        if (err){
            console.error("Error: "+err)
            return res.status(500).json(err)
        }
     })
    
    res.send({mensaje, fecha, PUBLICACION_id_publicacion, USUARIO_id_usuario})
}


// Eliminar un comentario
export const deleteComnt = async (req, res) => {
    const [result] = await pool.query('DELETE FROM COMENTARIO WHERE id_comentario = ?', [req.params.id_comentario])
    console.log(result)
    if (result.affectedRows <= 0) return res.status(404).json({
        message: "comentario no encontrado."
    })
    res.sendStatus(204)
}