const Pedido = require('../model/pedido')
const Item = require('../model/item')

exports.listarPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.getAll()
        const pedidosComItens = await Promise.all(pedidos.map(async (pedido) => {
            const itens = await Item.getByPedidoId(pedido.id_pedido)
            return { ...pedido, itens }
        }))
        res.status(200).json({ message: "Listar todos os pedidos", data: pedidosComItens })
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar pedidos", error: error.message})
    }
}

exports.criarPedido = async (req, res) => {
    try {
        const { itens, ...dadosPedido } = req.body
        if (!itens || itens.length === 0) {
            return res.status(400).json({ message: "O pedido deve conter pelo menos um item."})
        }

        const [novoPedido] = await Pedido.create(dadosPedido)

        if (novoPedido && novoPedido.id_pedido) {
            const itensComIdPedido = itens.map(item => ({
                ...item,
                id_pedido: novoPedido.id_pedido
            }))
            const novosItens = await Item.createMany(itensComIdPedido)
            res.status(201).json({ message: "Pedido criado com sucesso", data: { ...novoPedido, itens: novosItens } })
        } else {
            throw new Error("Falha ao criar o pedido.")
        }
        res.status(201).json({ message: "Pedido criado", data: req.body})
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar pedido", error: error.message})
    }
}

exports.buscarPedidoPorId = async (req, res) => {
    try {
        const { id } = req.params
        const pedido = await Pedido.getById(id)

        if (!pedido) {
            return res.status(404).json({ message: `Pedido com ID ${id} não encontrado`})
        }

        const itens = await Item.getPedido
        res.status(200).json({ message: `Pedido com ID ${id} encontrado`, data: { ...pedido, itens} })    
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar pedido", error: error.message })
    }
}

exports.atualizarPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { itens, ...dadosPedido } = req.body

        const [pedidoAtualizado] = await Pedido.update(id, dadosPedido)

        if (!pedidoAtualizado){
           return res.status(404).json({ message: `Pedido com ID ${id} não encontrado para atualização`}) 
        }

        await Item.delete(id)
        let itensAtualizados = []
        if (itens && itens.length > 0) {
            const itensComIdPedido = itens.map(item => ({
                ...item, 
                id_pedido: pedidoAtualizado.id_pedido
            }))
            itensAtualizados = await Item.createMany(itensComIdPedido)
        }

        res.status(200).json({ message: `Pedido com ID ${id} atualizado`, data: req.body });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar pedido", error: error.message });
    }
};

exports.excluirPedido = async (req, res) => {
    try {
        const { id } = req.params
        const pedidoDeletado = await Pedido.delete(id)
        if (!pedidoDeletado) {
            return res.status(404).json({ message: `Não foi possível deletar o pedido.`, data: req.body })
        }
        res.status(200).json({ message: `Pedido com ID ${id} excluído` })
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir pedido", error: error.message })
    }
}
