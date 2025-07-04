const express = require("express")
const router = express.Router()
const controller = require('../controller/controller.js')

router.get('/', controller.listarPedidos)
router.get('/:id_pedido/itens', controller.listarItensDePedido)
router.post('/', controller.criarPedido)
router.get('/:id', controller.buscarPedidoPorId)
router.put('/:id', controller.atualizarPedido)
router.put('/:id_pedido/itens/:id_item', controller.atualizarItem)
router.delete('/:id', controller.excluirPedido)

module.exports = router