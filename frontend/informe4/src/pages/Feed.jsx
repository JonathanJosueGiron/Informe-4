import { useState } from 'react'
import { Button } from '../components/Button.jsx'

function Feed() {
  const width  = 320
  const height   = 55
  const font = 20

  const [details, setDetails] = useState(null)
  const [show, setShow]       = useState(false)

  const carga = async () => {
    const datos = await ApiService.verTodos("xml")
    console.log(datos)
    setDetails(datos)
  }
  
  return(
    <>
      <div>
        <Button text={"CARGAR ARCHIVO"}        page={"/subirxml"}           style={{width:width*1.25, height:height*1.5, fontSize:font*2}}/>
        <Button text={"GESTIONAR CENTROS"}     page={"/gestioncentros"}     style={{width:width*0.9, height:height, fontSize:font}}/>
        <Button text={"GESTIONAR RUTAS"}       page={"/gestionrutas"}       style={{width:width*0.8, height:height, fontSize:font}}/>
        <Button text={"GESTIONAR PAQUETES"}    page={"/gestionpaquetes"}    style={{width:width*0.925, height:height, fontSize:font}}/>
        <Button text={"GESTIONAR MENSAJEROS"}  page={"/gestionmensajeros"}  style={{width:width, height:height, fontSize:font}}/>
        <Button text={"GESTIONAR SOLICITUDES"} page={"/gestionsolicitudes"} style={{width:width*1.1, height:height, fontSize:font}}/>
      </div>
    </>
  )
}

export default Feed