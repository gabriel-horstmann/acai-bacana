const Pedido = require("../model/pedido")
const Item = require("../model/item")

exports.listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.getAll()
    const pedidosComItens = await Promise.all(
      pedidos.map(async (pedido) => {
        const itens = await Item.getByPedidoId(pedido.id_pedido)
        return { ...pedido, itens }
      })
    )
    res
      .status(200)
      .json({ message: "Listar todos os pedidos", data: pedidosComItens })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao listar pedidos", error: error.message })
  }
}

exports.criarPedido = async (req, res) => {
  try {
    const { itens, valor_pedido, ...dadosPedido } = req.body

    if (!itens || !Array.isArray(itens) || itens.length === 0) {
      return res
        .status(400)
        .json({ message: "O pedido deve conter pelo menos um item." })
    }

    let valorPedido = 0
    for (const item of itens) {
      const preco = parseFloat(item.preco_unit)
      if (isNaN(preco) || preco < 0) {
        const IdItem = item.id_produto || "desconhecido"
        throw new Error(`Item de Id '${IdItem}' possui preço inválido.`)
      }
      valorPedido += preco
    }

    const dadosPedidoParaCriar = {
      ...dadosPedido,
      valor_pedido: valorPedido,
    }

    const [novoPedido] = await Pedido.create(dadosPedidoParaCriar)

    if (novoPedido && novoPedido.id_pedido) {
      const itensComIdPedido = itens.map((item) => ({
        ...item,
        id_pedido: novoPedido.id_pedido,
      }))
      const novosItens = await Item.createMany(itensComIdPedido)
      res.status(201).json({
        message: "Pedido criado com sucesso",
        data: { ...novoPedido, itens: novosItens },
      })
    } else {
      throw new Error("Falha ao criar o pedido.")
    }
  } catch (error) {
    if (error.message.includes("preço inválido")) {
      return res.status(400).json({ message: error.message })
    }
    console.error("Erro ao criar pedido:", error)
    res
      .status(500)
      .json({ message: "Erro ao criar pedido", error: error.message })
  }
}

exports.buscarPedidoPorId = async (req, res) => {
  try {
    const { id } = req.params
    const pedido = await Pedido.getById(id)

    if (!pedido) {
      return res
        .status(404)
        .json({ message: `Pedido com ID ${id} não encontrado` })
    }

    const itens = await Item.getByPedidoId(id)
    res.status(200).json({
      message: `Pedido com ID ${id} encontrado`,
      data: { ...pedido, itens: itens || [] },
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar pedido", error: error.message })
  }
}

exports.atualizarPedido = async (req, res) => {
  try {
    const { id } = req.params
    const { itens, valor_pedido, ...dadosPedido } = req.body

    let dadosAtualizarPedido = { ...dadosPedido }
    let itensProcessados = []

    const pedido = await Pedido.getById(id)
    if (!pedido) {
      return res
        .status(404)
        .json({ message: `Pedido com ID ${id} não encontrado` })
    }

    if (req.body.hasOwnProperty("itens")) {
      if (!Array.isArray(itens) || itens.length === 0) {
        return res.status(400).json({ message: "Pedido não possui itens." })
      }

      let valorPedido = 0
      for (const item of itens) {
        const preco = parseFloat(item.preco_unit)
        if (isNaN(preco) || preco < 0) {
          const IdItem = item.id_produto || "desconhecido"
          throw new Error(`Item de Id '${IdItem}' possui preço inválido`)
        }
        valorPedido += preco
      }
      dadosAtualizarPedido.valor_pedido = valorPedido

      await Item.delete(id)

      const itensPedido = itens.map((item) => ({
        ...item,
        id_pedido: id,
      }))
      itensProcessados = await Item.createMany(itensPedido)
    } else {
      itensProcessados = await Item.getByPedidoId(id)
    }

    if (Object.keys(dadosAtualizarPedido).length > 0) {
      const [pedidoAtualizadoDoBanco] = await Pedido.update(
        id,
        dadosAtualizarPedido
      )
      if (!pedidoAtualizadoDoBanco) {
        console.warn(
          `Pedido.update para ID ${id} não retornou um objeto. Usando dados conhecidos)`
        )
        const dadosRetorno = {
          ...pedido,
          ...dadosAtualizarPedido,
          itens: itensProcessados,
        }
        return res.status(200).json({
          message: `Pedido com ID ${id} atualizado (verifique os dados)`,
          data: dadosRetorno,
        })
      }

      res
        .status(200)
        .json({
          message: `Pedido com ID ${id} atualizado`,
          data: { ...pedidoAtualizadoDoBanco, itens: itensProcessados },
        })
    } else {
      res.status(200).json({
        message: `Nenhuma alteração nos dados principais do pedido com ID ${id}`,
        data: { ...pedido, itens: itensProcessados },
      })
    }
  } catch (error) {
    if (error.message.includes("preço inválido")) {
      return res.status(400).json({ message: error.message })
    }
    console.error(`Erro ao atualizar pedido com ID ${id}:`, error)
    res
      .status(500)
      .json({ message: "Erro ao atualizar pedido", error: error.message })
  }
}

exports.excluirPedido = async (req, res) => {
  try {
    const { id } = req.params
    const linhasDeletadas = await Pedido.delete(id)
    if (linhasDeletadas === 0) {
      return res
        .status(404)
        .json({ message: `Não foi possível deletar o pedido.`, data: req.body })
    }
    res.status(200).json({ message: `Pedido com ID ${id} excluído` })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao excluir pedido", error: error.message })
  }
}
