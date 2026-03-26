import React from "react";
import { Listbox } from "./Listbox";
import "./selector.css"
export function Selector({value, onChange, object, emptyText, style, valueKey, labelKey}){
  return(
    <select className="selector" style={style} value={value} onChange={e => onChange(e.target.value)}>
      <option value="" style={{color:"gray"}}>- {emptyText} -</option>
      <Listbox noData={"Sin datos."} objeto={object} wrapper={React.Fragment}
      render={e =>(
        <option key={e[valueKey]} value={e[valueKey]}>{e[labelKey]}</option>
      )}/>
    </select>
  )
}