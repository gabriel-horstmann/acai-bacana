require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000
const PORT_FRONTEND = process.env.PORT_FRONTEND || 4200

const configCors = {
    origin: `http://localhost:${PORT_FRONTEND}`
}

app.use(cors(configCors))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

const pedidosRoutes = require('./src/routes/pedidos')
app.use('/api/pedidos', pedidosRoutes)

app.listen(PORT, () => {
    console.log(`Server rodando em http://localhost:${PORT}`)
})