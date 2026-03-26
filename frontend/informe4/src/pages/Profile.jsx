import { useParams } from "react-router-dom"
import { Button } from "../components/Button"
import { Listbox } from "../components/Listbox"
import { useEffect, useState } from "react"
import axios from "../api/axios"

function Profile(){
  const {registro} = useParams()
  console.log("ID: "+registro)
  const API_DATOS  = `verperfil${registro ? "/"+registro : ""}`
  const API_CURSOS = `vercursos${registro ? "/"+registro : ""}`
  const [register, setRegister] = useState("")
  const [name, setName]         = useState("")
	const [surname, setSurname]   = useState("")
	const [email, setEmail]		  = useState("")
    useEffect(() => {
      const carga = async () => {
        console.log(API_DATOS)
        const datos = await axios.get(API_DATOS)
        console.log(datos.data)
        setRegister(datos.data.registro)
        setName(datos.data.nombre)
        setSurname(datos.data.apellido)
        setEmail(datos.data.correo)
      }
      carga()
    }, [])
  return(
    <>
      <div className="list-card" key={registro} style={{width:'800px', height:'220px', fontSize:'1rem', position:'fixed', left:'50%', top:'0%', transform:'translateX(-50%)', textAlign:'left', overflowY:'auto'}}>
        <div style={{fontSize:"1.8rem"}}>
          <center><b>PERFIL</b></center>
          Registro: {register} <br/>
          Nombre: {name} <br/>
          Apellido: {surname} <br/>
          Correo elecrónico: {email} <br/>
        </div>
      </div>

      <div className="list" style={{height:"250px", position:'fixed', left:'50%', top:'40%', transform:'translateX(-50%)'}}>
        <Listbox objeto={API_CURSOS} noData={"No hay cursos."}
        render={ cur => (
          <div className="list-card" key={cur.id_curso_apr}>
            <b>Curso:</b> {cur.nombre_curso} <br/>
            <b>Fecha:</b> {cur.fecha_apr} <br/><br/>
          </div>
        )}
        />
      </div>

      <Button text={"SALIR"} page={"/login"} style={{height:60, width:140, fontSize:'1.5rem', position:'fixed', left:'98%', top:'4%', transform:'translateX(-100%)'}}/>
      
      <div style={{height:30, width:"840px", fontSize:'1.5rem', position:'fixed', left:'50%', top:'80%', transform:'translateX(-50%)'}}>
        <Button text={"VOLVER"} page="/feed"/>
      </div>
    </>
  )
}

export default Profile