import { pool } from '../db.js'

// Ver todos los catedraticos
export const getProfs = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM CATEDRATICO')
    res.json(rows)
}

// Ver un catedratico
export const getProf = async (req, res) => {
    console.log(req.params)
    const [rows] = await pool.query('SELECT * FROM CATEDRATICO WHERE id_catedratico = ?', [req.params.id_catedratico])
    if (rows.length <= 0) return res.status(404).json({
        message: "catedratico no encontrado."
    })
    res.json(rows[0])
}

// Crear un catedratico
export const createProf = async (req, res) => {
    const {nombre, apellido, correo} = req.body
    const [rows] = await pool.query('INSERT INTO CATEDRATICO (nombre, apellido, correo) VALUES  ?, ?, ?)', 
     [nombre, apellido, correo], (err, result) => {
        if (err){
            console.error("Error: "+err)
            return res.status(500).json(err)
        }
     })
    
    res.send({nombre, apellido, correo})
}

// Actualizar un catedratico
export const updateProf = async (req, res) => {
    const id_catedratico = req.params.id_catedratico
    const {nombre, apellido, correo} = req.body
    const [rows] = await pool.query('UPDATE CATEDRATICO SET nombre = ?, apellido = ?, correo = ? WHERE id_catedratico = ?', 
     [nombre, apellido, correo, id_catedratico], (err, result) => {
        if (err){
            console.error("Error: "+err)
            return res.status(500).json(err)
        }
     })
    
    res.send({nombre, apellido, correo})
}


// Eliminar un catedratico
export const deleteProf = async (req, res) => {
    const [result] = await pool.query('DELETE FROM CATEDRATICO WHERE id_catedratico = ?', [req.params.id_catedratico])
    console.log(result)
    if (result.affectedRows <= 0) return res.status(404).json({
        message: "catedratico no encontrado."
    })
    res.sendStatus(204)
}