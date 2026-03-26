import { useRef, useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthProvider.jsx";
import "../components/Box.css"

import { Button } from "../components/Button.jsx";
import { Superpos } from "../components/Superpos.jsx";

import axios from "../api/axios.jsx";
import { useParams } from "react-router-dom";

export function CreatePost(){

	const { setAuth } = useContext(AuthContext)
	const userRef = useRef()
	const errRef  = useRef()

	const {id} = useParams()
  const [post, setPost]           = useState("")
  const [professor, setProfessor] = useState("")
  const [course, setCourse]       = useState("")
	
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
  }, [post])

	const handleRegister = async () => {
        if (professor == "" || course == ""){
			setErrMsg("Selecciona todos los datos.")
			return
		}
		if (post == ""){
			setErrMsg("el comentario no puede quedar vacío.")
			return
		}
		try{
			const response = await axios.post("/comentarios",
				JSON.stringify({
					mensaje: post,
                    CATEDRATICO_id_catedratico: professor,
                    CURSO_id_curso: course
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
				setErrMsg('El usuario ya existe.')
			} else {
				setErrMsg('No se pudo publicar el comentario.')
			}
			errRef.current.focus()
			console.log(err)
		}
	}

  return(
	<>	
		<div style={{position:"fixed", top:"40px", left:"50%", transform:"translateX(-50%)", 
						display:"flex", flexDirection:"column", alignItems:"center"}}>
			<div className="box" style={{height:"550px", width:"1000px"}}>
			<div className="element" style={{backgroundColor:"Darkblue"}}>Publicar</div>
			<br/>
			<textarea 
				id="comment"
				placeholder='Describe tu experiencia...' 
				value={post} 	
				onChange={(e) => setPost(e.target.value)}
				required
				style={{height:"200px", width:"800px"}}
			/>
			<p style={{fontSize:"20px", margin:"0"}}>{errMsg}</p>
			</div>
			<div style={{display:"flex", alignItems:"center", gap:"200px"}}>
				<Button text={"PUBLICAR"} onClick={handleRegister}/>
				<Button text={"VOLVER"} page={`/feed/comments/${id}`}/>
			</div>
		</div>
		
		{(success) && 
			<div>
				<Superpos titulo={"Comentario publicado"} texto={"Se ha publicado el comentario."}/>
				<div style={{display:"flex", alignItems:"center", gap:"200px", position:"fixed", 
												top:"60%", left:"50%", transform:"translateX(-50%)", zIndex:9999}}>
					<Button text={"VOLVER"} page={`/feed/comments/${id}`}/>
				</div>
			</div>
		}
		
	</>
  )
}

export default CreatePost