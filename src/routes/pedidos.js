const express = require("express")
const router = express.Router()
const pedidoController = require('../controller/pedido.js')

router.get('/', pedidoController.listarPedidos)
router.post('/', pedidoController.criarPedido)
router.get('/:id', pedidoController.buscarPedidoPorId)
router.put('/:id', pedidoController.atualizarPedido)
router.put('/:id_pedido/itens/:id_item', pedidoController.atualizarItem)
router.delete('/:id', pedidoController.excluirPedido)

module.exports = router