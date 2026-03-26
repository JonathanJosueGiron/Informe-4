import { pool } from '../db.js'

// Ver todas las publicaciones
export const getPublis = async (req, res) => {
    const [rows] = await pool.query(`SELECT 
        p.id_publicacion,
        p.mensaje, 
        p.fecha, 
        u.nombre AS nombre_usuario, 
        c.nombre AS nombre_catedratico, 
        cu.nombre AS nombre_curso 
        FROM PUBLICACION p 
        JOIN usuario u ON p.USUARIO_id_usuario = u.id_usuario 
        JOIN catedratico c ON p.CATEDRATICO_id_catedratico = c.id_catedratico 
        JOIN curso cu ON p.CURSO_id_curso = cu.id_curso
        ORDER BY p.fecha DESC`) 
    
    res.json(rows)
}

// Ver una publicacion
export const getPubli = async (req, res) => {
    
    const [rows] = await pool.query('SELECT * FROM PUBLICACION WHERE id_publicacion = ?', [req.params.id_publicacion])
    if (rows.length <= 0) return res.status(404).json({
        message: "publicacion no encontrada."
    })
    res.json(rows[0])
}

// Crear una publicacion
export const createPubli = async (req, res) => {
    const USUARIO_id_usuario = req.user.id
    const {mensaje, CATEDRATICO_id_catedratico, CURSO_id_curso} = req.body
    const [rows] = await pool.query('INSERT INTO PUBLICACION (mensaje, fecha, USUARIO_id_usuario, CATEDRATICO_id_catedratico, CURSO_id_curso) VALUES (?, CURDATE(), ?, ?, ?)', 
     [mensaje, USUARIO_id_usuario, CATEDRATICO_id_catedratico, CURSO_id_curso], (err, result) => {
        if (err){
            console.error("Error: "+err)
            return res.status(500).json(err)
        }
     })
    
    res.send("Publicación creada.")
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
    
    res.send("Publicación actualizada.")
}


// Eliminar una publicacion
export const deletePubli = async (req, res) => {
    const [result] = await pool.query('DELETE FROM PUBLICACION WHERE id_publicacion = ?', [req.params.id_publicacion])
    if (result.affectedRows <= 0) return res.status(404).json({
        message: "publicacion no encontrada."
    })
    res.sendStatus(204)
}

// Filtro
export const filter = async (req, res) => {
	const {id_catedratico, id_curso, nombre_catedratico, nombre_curso} = req.body
	console.log(req.body)
	let query = `SELECT 
    p.id_publicacion,
    p.mensaje, 
    p.fecha, 
    u.nombre AS nombre_usuario, 
    c.nombre AS nombre_catedratico, 
    cu.nombre AS nombre_curso 
    FROM PUBLICACION p 
    JOIN usuario u ON p.USUARIO_id_usuario = u.id_usuario 
    JOIN catedratico c ON p.CATEDRATICO_id_catedratico = c.id_catedratico 
    JOIN curso cu ON p.CURSO_id_curso = cu.id_curso
		WHERE 1=1 `
	let params = []

	if (id_catedratico){
		query += "AND p.CATEDRATICO_id_catedratico = ? ORDER BY p.fecha DESC"
		params.push(id_catedratico)
	}

	if (nombre_catedratico){
		query += "AND c.nombre LIKE ? ORDER BY p.fecha DESC"
		params.push(`%${nombre_catedratico}%`)
	}

	if (id_curso){
		query += "AND p.CURSO_id_curso = ? ORDER BY p.fecha DESC"
		params.push(id_curso)
	}

	if (nombre_curso){
		query += "AND cu.nombre LIKE ? ORDER BY p.fecha DESC"
		params.push(`%${nombre_curso}%`)
	}
	console.log(id_catedratico)
	console.log(id_curso)
	console.log(query)
	
  const [rows] = await pool.query(query, params)
  res.json(rows)
}
