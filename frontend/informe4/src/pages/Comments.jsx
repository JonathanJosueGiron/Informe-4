import { useParams } from "react-router-dom"
import { Button } from "../components/Button"
import { Listbox } from "../components/Listbox"
import { useEffect, useState } from "react"
import axios from "../api/axios"

function Comments(){
  const {id} = useParams()
  const API = `publicaciones/${id}/comentarios`
  const [postMsg, setPostMsg] = useState("")
    useEffect(() => {
      const carga = async () => {
        const datos = await axios.get(API)
        if (datos.data[0]){
          setPostMsg(datos.data[0].mensaje_publicacion)
        }else{
          const publicacion = await axios.get(`publicaciones/${id}`)
          setPostMsg(publicacion.data.mensaje)
        }
      }
      carga()
    }, [])
  return(
    <>
      <div className="list-card" key={id} style={{width:'800px', height:'100px', maxHeight:'100px', fontSize:'1rem', position:'fixed', left:'50%', top:'0%', transform:'translateX(-50%)', textAlign:'left', overflowY:'auto'}}>{postMsg}</div>
      <div className="list">
        <Listbox objeto={API} noData={"Sin comentarios."}
        render={ com => (
          <div className="list-card" key={com.id_comentario}>
            <b>Usuario:</b> {com.nombre_usuario } <br/>
            <b>Fecha:</b> {com.fecha} <br/><br/>
            <b>Comentario:</b> {com.mensaje} <br/>
          </div>
        )}/>
      </div>
      <Button text={"SALIR"} page={"/login"} style={{height:60, width:140, fontSize:'1.5rem', position:'fixed', left:'98%', top:'4%', transform:'translateX(-100%)'}}/>
      
      <div style={{height:30, width:"840px", fontSize:'1.5rem', position:'fixed', left:'50%', top:'80%', transform:'translateX(-50%)'}}>
        <div style={{display:"flex", alignItems:"center", gap:"200px"}}>
            <Button text={"VOLVER"} page="/feed"/>
            <Button text={"COMENTAR"} page="post"/>
        </div>
      </div>
    </>
  )
}

export default Comments