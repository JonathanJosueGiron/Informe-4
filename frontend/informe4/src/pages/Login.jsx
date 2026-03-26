import { useRef, useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import "../components/Box.css"
import { Button } from "../components/Button.jsx";
import axios from "../api/axios.jsx";
import logo from "../assets/fiusac_logo.jpg"
import { Link, useNavigate } from "react-router-dom";

function Login(){
	const { setAuth } = useContext(AuthContext)
	const userRef = useRef()
	const errRef  = useRef()
	const navigate = useNavigate()
  const [user, setUser]     = useState("")
  const [passw, setPassw]   = useState("")
  const [errMsg, setErrMsg] = useState("")
	const [logged, setLogged] = useState(false)
  useEffect(() =>{
		if (userRef.current){
			userRef.current.focus()
		}
  }, [])
	useEffect(() =>{
		setErrMsg('')
  }, [user, passw])

	const handleLogin = async () => {
		if (user == "" || passw == ""){
			setErrMsg("Ingresa todos los datos.")
			return
		}
		try{
			const response = await axios.post("/login",
				JSON.stringify({registro: user, password: passw}),
				{
					headers: {'Content-Type': 'application/json'},
				}
			)
			console.log(JSON.stringify(response?.data))
			const res = await axios.get("/profile")
			setUser(res.data.registro)
			navigate('/feed')
		} catch (err) {
			if(!err.response){
				setErrMsg('No hubo respuesta del servidor.')
			} else if (err.response.status === 404){
				setErrMsg('No se encuentra el usuario.')
			} else if (err.response.status === 400){
				setErrMsg('Ingresa todos los datos.')
			} else if (err.response.status === 401){
				setErrMsg('Acción no autorizada.')
			} else {
				setErrMsg('Inicio de sesión fallido.')
			}
			errRef.current.focus()
			console.log(err)
		}
	}

  return(
		<>
			<div style={{position:"fixed", top:"70px", left:"50%", transform:"translateX(-50%)", 
							display:"flex", flexDirection:"column", alignItems:"center"}}>
			<div className="box" style={{height:"460px"}}>
					<img src={logo}></img>
			<div className="element" style={{backgroundColor:"Darkblue"}}>Iniciar sesión</div>
				<input 
						type='text' 
						id="register" 
						ref={userRef} 
						placeholder='Registro académico' 
						value={user} 
						onChange={(e) => setUser(e.target.value)}
						required
					/>

					<input 
						type='password' 
						id="password"
						placeholder='Contraseña' 
						value={passw} 
						onChange={(e) => setPassw(e.target.value)}
						required
					/>
					<Link to="/resetPassword">
						<p style={{fontSize:"18px", margin:"0", textAlign:"left"}}>Olvidé la contraseña</p>
					</Link>
					<p style={{fontSize:"15px", margin:"0"}}>{errMsg}</p>
			</div>

				<div style={{display:"flex", alignItems:"center", gap:"200px"}}>
					<Button text={"INGRESAR"} onClick={handleLogin}/>
					<Button text={"REGISTRARSE"} page="/register"/>
				</div>
			</div>
		</>
  )
}

export default Login