import express from "express"
import userRoutes from './routes/usuarios.js'
import indexRoutes from './routes/index.routes.js'

const app = express()

app.use(express.json())

app.use(indexRoutes)
app.use('/api', userRoutes)

app.listen(3000)
console.log("Server running on port 3000.")