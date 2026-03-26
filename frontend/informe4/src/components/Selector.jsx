import React from "react";
import { Listado } from "../Listado/Listado";
import "./selector.css"
export function Selector({valor, onChange, objeto, textoSinSeleccion, style}){
  // valor = valor que obtiene la caja
  // onChange = función cuando cambia el valor
  // objeto = dirección para obtener la lista (api/"objeto")
  // textoSinSelección = cuando no haya nada seleccionado
  return(
    <select className="selector" style={style} value={valor} onChange={e => onChange(e.target.value)}>
      <option disabled value="" style={{color:"gray"}}>- {textoSinSeleccion} -</option>
      <Listado objeto={objeto} wrapper={React.Fragment}
      render={e =>(
        <option key={e.id} value={e.id}>{e.id}</option>
      )}/>
    </select>
  )
}