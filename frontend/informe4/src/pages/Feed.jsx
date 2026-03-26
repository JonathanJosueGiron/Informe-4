import { useState } from "react"
import { Button } from "../components/Button"
import { Listbox } from "../components/Listbox"
import { Selector } from "../components/Selector"

function Feed(){
  const [idProfessor, setIdProfessor]     = useState("")
  const [idCourse, setIdCourse]           = useState("")
  const [nameProfessor, setNameProfessor] = useState("")
  const [nameCourse, setNameCourse]       = useState("")

  const [filter, setFilter]       = useState("/publicaciones")
  const [req, setReq]             = useState("GET")
  const [jsonData, setJsonData]   = useState({})
  const filterPosts = async () => {
    let data = {}
    console.log("Profesor: "+idProfessor)
    console.log("Curso: "+idCourse)
    console.log("Nombre Profesor: "+nameProfessor)
    console.log("Nombre Curso: "+nameCourse)

    if (idProfessor) data.id_catedratico = idProfessor
    if (idCourse) data.id_curso = idCourse
    if (nameProfessor) data.nombre_catedratico = nameProfessor
    if (nameCourse) data.nombre_curso = nameCourse

    setFilter("/publicaciones/filtro")
    setReq("POST")
    setJsonData(data)
  }
  return(
    <> 
      <h1 style={{fontSize:'3rem', position:'fixed', left:'50%', top:'4%', transform:'translateX(-50%)'}}>PUBLICACIONES</h1>
      <Selector value={idProfessor} onChange={setIdProfessor} object={"catedraticos"} emptyText={"Selecciona el ID del profesor"} valueKey="id_catedratico" labelKey="nombre" style={{ width:"380px", position:'fixed', left:'24%', top:'25%', transform:'translateX(-100%)'}}/>
      <Selector value={idCourse} onChange={setIdCourse} object={"cursos"} emptyText={"Selecciona el ID del curso"} valueKey="id_curso" labelKey="nombre" style={{ width:"380px", position:'fixed', left:'24%', top:'35%', transform:'translateX(-100%)'}}/>
      <input 
				type='text' 
				id="profFilter" 
				placeholder='Nombre de catedrático' 
				value={nameProfessor} 
				onChange={(e) => setNameProfessor(e.target.value)}
				style={{borderRadius:"0px", width:"353px", position:'fixed', left:'23%', top:'50%', transform:'translateX(-100%)'}}
			/>
      <input 
				type='text' 
				id="courseFilter" 
				placeholder='Nombre de curso' 
				value={nameCourse} 
				onChange={(e) => setNameCourse(e.target.value)}
				style={{borderRadius:"0px", width:"353px", position:'fixed', left:'23%', top:'62%', transform:'translateX(-100%)'}}
			/>
      
      <div className="list" style={{width:"800px"}}>
        <Listbox key={JSON.stringify(jsonData) + filter + req} objeto={filter} requestType={req} jsonData={jsonData} noData={"Aún no hay publicaciones."}
        render={ p => (
          <div className="list-card" key={p.id_publicacion}>
            <b>Usuario:</b> {p.nombre_usuario} <br/>
            <b>Fecha:</b> {p.fecha} <br/>
            <b>Curso:</b> {p.nombre_curso} <br/>
            <b>Catedratico:</b> {p.nombre_catedratico} <br/><br/>
            <b>Mensaje:</b> {p.mensaje} <br/>
            <Button text={"Ver comentarios"} page={`comments/${p.id_publicacion}`}/>
          </div>
        )}/>
      </div>
        <div style={{height:30, width:"840px", fontSize:'1.5rem', position:'fixed', left:'50%', top:'80%', transform:'translateX(-50%)'}}>
          <div style={{display:"flex", alignItems:"center", gap:"200px"}}>
            <Button text={"FILTRO"} onClick={filterPosts}/>
            <Button text={"PUBLICAR"} page="/postcreate"/>
          </div>
        </div>
        
      
      <Button text={"SALIR"} page={"/login"} style={{height:60, width:140, fontSize:'1.5rem', position:'fixed', left:'98%', top:'4%', transform:'translateX(-100%)'}}/>
    </>
  )
}

export default Feed