import { useEffect, useState } from "react"
import "./Listbox.css"
import axios from "../api/axios"

export function Listbox({objeto, render, wrapper: Wrapper = "div"}){
  
  const [list, setList] = useState([])
  useEffect(() => {
    const carga = async () => {
      const datos = await axios.get(objeto)
      setList(datos.data)
    }
    carga()
  }, [objeto])

  return(
    <Wrapper>
      {list.length === 0 
      ? <option className="no-data" disabled>Sin datos.</option> 
      : list.map(item => render(item))
      }
    </Wrapper>
  )
}