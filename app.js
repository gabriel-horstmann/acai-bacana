const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

const pedidosRoutes = require('./src/routes/pedidos')
app.use('/api/pedidos', pedidosRoutes)

app.listen(PORT, () => {
    console.log(`Server rodando em http://localhost:${PORT}`)
})