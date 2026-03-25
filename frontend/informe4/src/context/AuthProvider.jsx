import { createContext, useEffect, useState } from "react";
import axios from "../api/axios";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("/profile")
    })
    return(
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext