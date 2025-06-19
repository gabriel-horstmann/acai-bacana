let pedidoId = null
let pedidoAtual = null

function obterIdPedido() {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get("id")
}

async function carregarPedido() {
  pedidoId = obterIdPedido()

  const response = await fetch(`http://localhost:3000/api/pedidos/${pedidoId}`)
  const data = await response.json()
  pedidoAtual = data.data

  document.getElementById("cliente").value = pedidoAtual.cliente
  document.getElementById("pedido").value = pedidoAtual.pedido
  document.getElementById("status").value = pedidoAtual.status

  carregarItens(pedidoAtual.itens)
}

function carregarItens(item) {
  const containerItens = document.getElementById("itensPedido")
  containerItens.innerHTML = ""

  item.forEach((item, index) => {
    const itemElement = criarElementoItem(item, index)
    containerItens.appendChild(itemElement)
  })
}

function criarElementoItem(item, index) {
  const div = document.createElement("div")
  div.className = "item-row"
  div.innerHTML = `
        <input type="text" placeholder="Nome do Produto" value="${item.produto}" required>
        <input type="number" placeholder="Preço Unitário" value="${item.preco_unit}" required step="0.01" min="0">
        <button type="button" class="btn-remover-item" onclick="removerItem(this)">Remover</button>
    `
    return div
}

function removerItem(button) {
  const itemRow = button.parentElement
  itemRow.remove()
}

function adicionarNovoItem() {
    const containerItens = document.getElementById("itensPedido")
    const novoItem = {
        produto: '',
        preco_unit: 0
    }
    const itemElement = criarElementoItem(novoItem, containerItens.children.length)
    containerItens.appendChild(itemElement)
}

function coletarDadosFormulario() {
  const itens = []
  const itensElements = document.querySelectorAll(".item-row")

  itensElements.forEach(element => {
    const inputs = element.querySelectorAll('input')
    itens.push({
      produto: inputs[0].value,
      preco_unit: parseFloat(inputs[1].value)
    })
  })

  return {
    cliente: document.getElementById('cliente').value,
    pedido: document.getElementById('pedido').value,
    status: document.getElementById('status').value,
    itens: itens
  }
}

async function salvarPedido(event) {
  event.preventDefault()

  const dadosPedido = coletarDadosFormulario()

  await fetch(`http://localhost:3000/api/pedidos/${pedidoId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dadosPedido)
  })

  alert("Pedido atualizado com sucesso")
  voltarParaLista()
}

function voltarParaLista() {
  window.location.href = 'pedidos.html'
}
