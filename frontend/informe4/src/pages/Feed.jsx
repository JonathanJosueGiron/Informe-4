import { Button } from "../components/Button"
import { Listbox } from "../components/Listbox"

function Feed(){
  return(
    <>
      <h1 style={{fontSize:'3rem', position:'fixed', left:'50%', top:'4%', transform:'translateX(-50%)'}}>PUBLICACIONES</h1>
      <div className="list">
        <Listbox objeto={"/publicaciones"}
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
      <Button text={"SALIR"} page={"/login"} style={{height:60, width:140, fontSize:'1.5rem', position:'fixed', left:'98%', top:'4%', transform:'translateX(-100%)'}}/>
    </>
  )
}

export default Feed