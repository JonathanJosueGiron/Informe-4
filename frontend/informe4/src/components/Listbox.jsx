import { useEffect, useState } from "react"
import "./Listbox.css"
import axios from "../api/axios"

export function Listbox({objeto, render, wrapper: Wrapper = "div", noData="Sin datos.", requestType="GET", jsonData={}}){
  
  const [list, setList] = useState([])
  useEffect(() => {
    const carga = async () => {
      if (requestType == "GET"){
        const datos = await axios.get(objeto)
        setList(datos.data)
      } else if (requestType == "POST") {
        const datos = await axios.post(objeto, JSON.stringify(jsonData), {headers: {'Content-Type': 'application/json'}})
        setList(datos.data)
      }
      
    }
    carga()
  }, [objeto])

  return(
    <Wrapper>
      {list.length === 0 
      ? <option className="no-data" disabled>{noData}</option> 
      : list.map(item => render(item))
      }
    </Wrapper>
  )
}