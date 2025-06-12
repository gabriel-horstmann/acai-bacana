const Pedido = require("../model/pedido")
const Item = require("../model/item")
const db = require("../database/db")

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

exports.listarItensDePedido = async (req, res) => {
  const { id_pedido } = req.params
  try {
    const pedido = await Pedido.getById(id_pedido);
    if (!pedido) {
      return res.status(404).json({ message: `Pedido com ID ${id_pedido} não encontrado.` });
    }
    const itens = await Item.getByPedidoId(id_pedido)
    if (!itens || itens.length === 0) {
      return res.status(400).json({ message: `Nenhum item encontrado para o pedido ${id_pedido}.`, data: [] });
    }
    res.status(200).json({
      message: `Itens do pedido ${id_pedido} listados com sucesso.`,
      data: itens
    })
  } catch (error) {
    console.error(`Erro ao listar itens do pedido ${id_pedido}:`, error)
    res.status(500).json({
      message: "Erro ao buscar itens do pedido.",
      error: error.message,
    })
  }
}

exports.criarPedido = async (req, res) => {
  const trx = await db.transaction()

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

    const [novoPedido] = await Pedido.create(dadosPedidoParaCriar, trx)

    if (novoPedido && novoPedido.id_pedido) {
      const itensComIdPedido = itens.map((item) => ({
        ...item,
        id_pedido: novoPedido.id_pedido,
      }))
      const novosItens = await Item.createMany(itensComIdPedido, trx)

      await trx.commit()
      res.status(201).json({
        message: "Pedido criado com sucesso",
        data: { ...novoPedido, itens: novosItens },
      })
    } else {
      throw new Error("Falha ao criar o pedido.")
    }
  } catch (error) {
    await trx.rollback()

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

      res.status(200).json({
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

exports.atualizarItem = async (req, res) => {
  const { id_pedido, id_item } = req.params
  const { produto, preco_unit } = req.body

  const trx = await db.transaction()

  try {
    let dadosAtualizarItem = {}

    if (req.body.hasOwnProperty("produto")) {
      if (typeof produto !== "string" || produto.trim() === "") {
        await trx.rollback()
        return res.status(400).json({ message: "Produto inválido." })
      }
      dadosAtualizarItem.produto = produto.trim()
    }

    if (req.body.hasOwnProperty("preco_unit")) {
      const formatPrice = parseFloat(preco_unit)
      if (isNaN(formatPrice) || formatPrice < 0) {
        await trx.rollback()
        return res.status(400).json({ message: "Preço inválido." })
      }
      dadosAtualizarItem.preco_unit = formatPrice
    }

    if (Object.keys(dadosAtualizarItem).length === 0) {
      await trx.rollback()
      res.status(400).json({ message: "Nenhum dado fornecido." })
    }
    const pedido = await Pedido.getById(id_pedido, trx)
    if (!pedido) {
      await trx.rollback()
      return res.status(404).json({ message: "Pedido não foi encontrado" })
    }

    const item = await Item.getById(id_item, trx)
    if (!item) {
      await trx.rollback()
      return res.status(404).json({ message: "Item não encontrado." })
    }

    const [itemAtualizado] = await Item.update(id_item, dadosAtualizarItem, trx)
    if (!itemAtualizado) {
      throw new Error("Falha ao atualizar o item.")
    }

    const itensPedido = await Item.getByPedidoId(id_pedido, trx)

    let valorPedidoAtualizado = 15
    for (const item of itensPedido) {
      const itemPrecoUnit = parseFloat(item.preco_unit)
      valorPedidoAtualizado += itemPrecoUnit
    }

    const [pedidoAtualizado] = await Pedido.update(
      id_pedido,
      { valor_pedido: valorPedidoAtualizado.toFixed(2) },
      trx
    )
    if (!pedidoAtualizado) {
      throw new Error("Falha ao atualizar valor do pedido.")
    }

    await trx.commit()
    res.status(200).json({
      message: "Pedido atualizado com sucesso.",
      data: { ...pedidoAtualizado, itens: itensPedido },
    })
  } catch (error) {
    await trx.rollback()
    console.error(
      `Erro ao atualizar item ${id_item} do pedido ${id_pedido}:`,
      error
    )
    if (
      error.message.includes("inválido") ||
      error.message.includes("inválida") ||
      error.message.includes("não encontrado")
    ) {
      return res.status(400).json({ message: error.message })
    }
    res.status(500).json({
      message: "Erro interno ao atualizar item do pedido.",
      error: error.message,
    })
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
