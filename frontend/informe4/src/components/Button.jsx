import { Link } from "react-router-dom"

export function Button({text, page="", disabled=false, style={height:80, width:320, fontSize:"1.8rem"}, onClick, className}){
    return(
        <p>
            {!(page === "") ?
                <Link to={page}>
                    <button type="button" onClick={onClick} style={style} className={className} disabled={disabled}>
                        {text}
                    </button>
                </Link>
                        :
                <button type="button" onClick={onClick} style={style} className={className} disabled={disabled}>
                    {text}
                </button>
            }
        </p>
    )
}