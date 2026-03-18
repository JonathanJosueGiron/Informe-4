import { pool } from '../db.js'

export const getUsers = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM usuario')
    res.json(rows)
}

export const getUser = async (req, res) => {
    
}

export const createUser = async (req, res) => {
    const {id_usuario, nombre, edad, contrasena, tiempo} = req.body
    const [rows] = await pool.query('INSERT INTO usuario (id_usuario, nombre, edad, contrasena, tiempo) VALUES (?, ?, ?, ?, ?)', 
     [id_usuario, nombre, edad, contrasena, tiempo], (err, result) => {
        if (err){
            console.error("Error: "+err)
            return res.status(500).json(err)
        }
     })
    
    res.send({id_usuario, nombre, edad, contrasena, tiempo})
}

export const updateUser = (req, res) => res.send('actualizando usuario')

export const deleteUser = (req, res) => res.send('eliminando usuario')