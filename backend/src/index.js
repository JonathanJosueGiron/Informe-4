import express      from "express"

import userRoutes   from './routes/usuarios.routes.js'
import courseRoutes from './routes/cursos.routes.js'
import profRoutes   from './routes/catedraticos.routes.js'
import publiRoutes  from './routes/publicaciones.routes.js'
import comntRoutes  from './routes/comentarios.routes.js'
import aprCrsRoutes from './routes/cursos_apr.routes.js'

import indexRoutes  from './routes/index.routes.js'

import cors from 'cors'
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser())
app.use(indexRoutes)
app.use('/api', userRoutes)
app.use('/api', courseRoutes)
app.use('/api', profRoutes)
app.use('/api', publiRoutes)
app.use('/api', comntRoutes)
app.use('/api', aprCrsRoutes)

app.listen(3000)
console.log("Server running on port 3000.")