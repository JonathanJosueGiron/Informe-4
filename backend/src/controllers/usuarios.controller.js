import { pool } from '../db.js'
import jwt from 'jsonwebtoken'

// Ver todos los usuarios
export const getUsers = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM usuario')
    res.json(rows)
}

// Ver un usuario
export const getUser = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [req.params.id_usuario])
    if (rows.length <= 0) return res.status(404).json({
        message: "Usuario no encontrado."
    })
    res.json(rows[0])
}

// Ver un usuario mediante su número de registro
export const getUserByReg = async (req, res) => {
	let registro = -1
	if (req.params.id_usuario){
		registro = req.params.id_usuario
	}else{
        registro = req.user.id
    }
    const [rows] = await pool.query('SELECT registro, nombre, apellido, correo FROM usuario WHERE id_usuario = ?', [registro])
    if (rows.length <= 0) return res.status(404).json({
        message: "Usuario no encontrado."
    })
    res.json(rows[0])
}

// Buscar por registro y contraseña
export const userLogin = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM usuario WHERE registro = ? AND password = ?', [req.body.registro, req.body.password])
    if (rows.length <= 0) {
		return res.status(404).json({message: "Usuario incorrecto."})
	}
    const token = jwt.sign({id: rows[0].id_usuario}, "secret", {expiresIn: "2h"})
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
    })
    res.json({message: "Inicio de sesión exitoso."})
}

// Nueva contraseña
export const newPassword = async (req, res) => {
    const {registro, correo, password} = req.body
	
	const [search] = await pool.query('SELECT * FROM usuario WHERE registro = ? AND correo = ?', [registro, correo])
	if (search.length === 0){
		return res.status(404).json({message: "Datos incorrectos."})
	}
	const id_usuario = search[0].id_usuario
	const past_passw = search[0].password
	if (password == past_passw){
		return res.status(409).json({message: "La contraseña debe ser diferente a la anterior."})
	}
	
	
    const [rows] = await pool.query('UPDATE usuario SET password = ? WHERE id_usuario = ?', 
     [password, id_usuario], (err, result) => {
        if (err){
            console.error("Error: "+err)
            return res.status(500).json(err)
        }
     })
	res.json("Datos actualizados.")
}

// Perfil de inicio de sesión
export const getUserAuth = async (req, res) =>{
	try{
		const userId = req.user.id
		const [rows] = await pool.query("SELECT id_usuario, registro FROM usuario WHERE id_usuario = ?", [userId])

		if (rows.length === 0) return res.status(404).json({
        	message: "Usuario no encontrado."
    	})
		res.json(rows[0])
	} catch (error){
		console.error(error)
		res.sendStatus(500)
	}
}


// Crear un usuario
export const createUser = async (req, res) => {
    const {registro, nombre, apellido, correo, password} = req.body
	const [search] = await pool.query('SELECT * FROM usuario WHERE registro = ?', [registro])
	if (search.length > 0){
		return res.status(409).json({message: "Usuario ya existente."})
	}
    const [rows] = await pool.query('INSERT INTO usuario (registro, nombre, apellido, correo, password) VALUES (?, ?, ?, ?, ?)', 
     [registro, nombre, apellido, correo, password], (err, result) => {
        if (err){
            console.error("Error: "+err)
            return res.status(500).json(err)
        }
     })
    res.send({registro, nombre, apellido, correo, password})
}

// Actualizar un usuario
export const updateUser = async (req, res) => {
    const id_usuario = req.params.id_usuario
    const {nombre, registro, apellido, correo, password} = req.body
    const [rows] = await pool.query('UPDATE usuario SET registro = ?, nombre = ?, apellido = ?, correo = ?,password = ? WHERE id_usuario = ?', 
     [registro, nombre, apellido, correo, password, id_usuario], (err, result) => {
        if (err){
            console.error("Error: "+err)
            return res.status(500).json(err)
        }
     })
    
    res.send({nombre, registro, apellido, correo, password})
}


// Eliminar un usuario
export const deleteUser = async (req, res) => {
    const [result] = await pool.query('DELETE FROM usuario WHERE id_usuario = ?', [req.params.id_usuario])
    if (result.affectedRows <= 0) return res.status(404).json({
        message: "Usuario no encontrado."
    })
    res.sendStatus(204)
}