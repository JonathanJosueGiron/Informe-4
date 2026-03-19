import express      from "express"
import userRoutes   from './routes/usuarios.routes.js'
import courseRoutes from './routes/cursos.routes.js'
import profRoutes   from './routes/catedraticos.routes.js'
import indexRoutes  from './routes/index.routes.js'

const app = express()

app.use(express.json())

app.use(indexRoutes)
app.use('/api', userRoutes)
app.use('/api', courseRoutes)
app.use('/api', profRoutes)


app.listen(3000)
console.log("Server running on port 3000.")