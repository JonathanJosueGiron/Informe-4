import { pool } from '../db.js'

// Ver todos los usuarios
export const getUsers = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM usuario')
    res.json(rows)
}

// Ver un usuario
export const getUser = async (req, res) => {
    console.log(req.params)
    const [rows] = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [req.params.id_usuario])
    if (rows.length <= 0) return res.status(404).json({
        message: "Usuario no encontrado."
    })
    res.json(rows[0])
}

// Crear un usuario
export const createUser = async (req, res) => {
    const {id_usuario, registro, nombre, apellido, correo, password} = req.body
    const [rows] = await pool.query('INSERT INTO usuario (id_usuario, registro, nombre, apellido, correo, password) VALUES (?, ?, ?, ?, ?, ?)', 
     [id_usuario, registro, nombre, apellido, correo, password], (err, result) => {
        if (err){
            console.error("Error: "+err)
            return res.status(500).json(err)
        }
     })
    
    res.send({id_usuario, registro, nombre, apellido, correo, password})
}

// Actualizar un usuario
export const updateUser = async (req, res) => {
    const id_usuario = req.params.id_usuario
    const {nombre, apellido, correo, password} = req.body
    const [rows] = await pool.query('UPDATE usuario SET nombre = ?, apellido = ?, correo = ?,password = ?', 
     [nombre, apellido, correo, password], (err, result) => {
        if (err){
            console.error("Error: "+err)
            return res.status(500).json(err)
        }
     })
    
    res.send({id_usuario, registro, nombre, edad, password, tiempo})
}


// Eliminar un usuario
export const deleteUser = async (req, res) => {
    const [result] = await pool.query('DELETE FROM usuario WHERE id_usuario = ?', [req.params.id_usuario])
    console.log(result)
    if (result.affectedRows <= 0) return res.status(404).json({
        message: "Usuario no encontrado."
    })
    res.sendStatus(204)
}