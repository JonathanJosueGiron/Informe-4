import { useState } from "react"
import { Button } from "../components/Button"
import { Listbox } from "../components/Listbox"
import { Selector } from "../components/Selector"

function SearchUser(){
  
  return(
    <> 
      <h1 style={{fontSize:'3rem', position:'fixed', left:'50%', top:'4%', transform:'translateX(-50%)'}}>LISTA DE USUARIOS</h1>
      
      <div className="list" style={{width:"800px"}}>
        <Listbox objeto={"usuarios"} noData={"Aún no hay publicaciones."}
        render={ p => (
          <div className="list-card" key={p.id_usuario  }>
            <b>Registro:</b> {p.registro} <br/>
            <b>Usuario:</b> {p.nombre} {p.apellido} <br/>
            <Button text={"VER PERFIL"} page={`/perfil/${p.id_usuario}`}/>
          </div>
        )}/>
      </div>
        <div style={{height:30, width:"840px", fontSize:'2rem', position:'fixed', left:'50%', top:'80%', transform:'translateX(-50%)'}}>
            <Button text={"VOLVER"} page="/postcreate"/>
        </div>
        
      
      <Button text={"SALIR"} page={"/login"} style={{height:60, width:140, fontSize:'1.5rem', position:'fixed', left:'98%', top:'4%', transform:'translateX(-100%)'}}/>
    </>
  )
}

export default SearchUser