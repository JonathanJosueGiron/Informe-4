import "./Superpos.css"

export function Superpos({titulo, texto, style}){
    return(
        <div className="overlay-super">
            <div style={style} className="detalles-super">
                <h1 style={{textAlign:"center"}}>{titulo}</h1>
                <hr></hr>
                <h2>{texto}</h2>
            </div>
        </div>
    )
}