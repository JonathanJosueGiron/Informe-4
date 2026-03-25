import { useRef, useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import "../components/Box.css"

import { Button } from "../components/Button.jsx";
import { Superpos } from "../components/Superpos.jsx";

import axios from "../api/axios";

export function ResetPassword(){
	const { setAuth } = useContext(AuthContext)
	const userRef = useRef()
	const errRef  = useRef()
  const [register, setRegister] = useState("")
  const [name, setName]         = useState("")
	const [surname, setSurname]   = useState("")
	const [email, setEmail]		  = useState("")
	const [password, setPassword] = useState("")

  const [errMsg, setErrMsg]   = useState("")
  const [success, setSuccess] = useState(false)
  useEffect(() =>{
		if (userRef.current){
			userRef.current.focus()
		}
  }, [])
	useEffect(() =>{
		setErrMsg('')
		setSuccess(false)
  }, [register, name])

	const handleRegister = async () => {
		if (register == "" || name == "" || surname == "" || email == "" || password == ""){
			setErrMsg("Ingresa todos los datos.")
			return
		}
		try{
			const response = await axios.post("/usuarios",
				JSON.stringify({
					registro: register, 
					nombre: name,
					apellido: surname,
					correo: email,
					password: password
				}),
				{
					headers: {'Content-Type': 'application/json'},
				})
			console.log(JSON.stringify(response?.data))
			setSuccess(true)
		} catch (err) {
			if(!err.response){
				setErrMsg('No hubo respuesta del servidor.')
			} else if (err.response.status === 400){
				setErrMsg('Ingresa todos los datos.')
			} else if (err.response.status === 401){
				setErrMsg('Acción no autorizada.')
			} else if (err.response.status === 409){
				setErrMsg('Ingresa los datos correctos.')
			} else {
				setErrMsg('Registro fallido.')
			}
			errRef.current.focus()
			console.log(err)
		}
	}

  return(
	<>	
		<div style={{position:"fixed", top:"40px", left:"50%", transform:"translateX(-50%)", 
						display:"flex", flexDirection:"column", alignItems:"center"}}>
			<div className="box" style={{height:"550px"}}>
			<div className="element" style={{backgroundColor:"Darkblue"}}>Nueva contraseña</div>
			<input 
				type='text' 
				id="regRegister" 
				ref={userRef} 
				placeholder='Registro académico' 
				value={register} 
				onChange={(e) => setRegister(e.target.value)}
				required
			/>

			<input 
				type='text' 
				id="regEmail"
				placeholder='Correo electrónico' 
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>

			<input 
				type='password' 
				id="regPassword"
				placeholder='Nueva contraseña' 
				value={password} 
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<p style={{fontSize:"20px", margin:"0"}}>{errMsg}</p>
			</div>
			<div style={{display:"flex", alignItems:"center", gap:"200px"}}>
				<Button text={"ACTUALIZAR"} onClick={handleRegister}/>
				<Button text={"VOLVER"} page="/login"/>
			</div>
		</div>
		
		{(success) && 
			<div>
				<Superpos titulo={"Contraseña actualizada"} texto={"La contraseña se ha actualizado."}/>
				<div style={{display:"flex", alignItems:"center", gap:"200px", position:"fixed", 
												top:"60%", left:"50%", transform:"translateX(-50%)", zIndex:9999}}>
					<Button text={"VOLVER"} page="/login" />
				</div>
			</div>
		}
		
	</>
  )
}

export default ResetPassword