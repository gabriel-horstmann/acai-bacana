const express = require("express")
const path = require("path")
const router = express.Router()

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/views/index.html"))
})

router.get('/pedidos.html', (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/views/pedidos.html"))
})

router.get('/itensPedido.html', (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/views/itensPedido.html"))
})

router.get('/adicionarPedido.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views/adicionarPedido.html'))
})

router.get('/editarPedido.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views/editarPedido.html'))
})

module.exports = router