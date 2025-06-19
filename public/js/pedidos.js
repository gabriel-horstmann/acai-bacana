async function loadData() {
  const pedidosTable = document.getElementById("pedidosTable")
  const API = await fetch("http://localhost:3000/api/pedidos")
  const objects = await API.json()
  objects.data.forEach((object) => {
    let trPedido = document.createElement("tr")
    let tdCliente = document.createElement("td")
    let tdPedido = document.createElement("td")
    let tdStatus = document.createElement("td")
    let tdValor = document.createElement("td")
    let tdAcoes = document.createElement("td")

    tdCliente.innerHTML = object.cliente
    tdPedido.innerHTML = object.pedido
    tdStatus.innerHTML = object.status
    tdValor.innerHTML = object.valor_pedido

    tdAcoes.className = "tdAcoes"
    tdCliente.className = "data-label"
    tdPedido.className = "data-label"
    tdStatus.className = "data-label"
    tdValor.className = "data-label"

    let btnVerItens = document.createElement("button")
    btnVerItens.textContent = "Ver itens"
    btnVerItens.className = "btnVer"
    btnVerItens.onClick = async () => {
      const existingRow = document.getElementById(`itens-row-${object.id_pedido}`)
      if (existingRow) {
        existingRow.remove()
        return
      }

    const response = await fetch(`http://localhost:3000/api/pedidos/${object.id_pedido}/itens`)
    const data = await response.json()

    const itensRow = document.createElement("tr")
    itensRow.id = `itens-row-${object.id_pedido}`
    const itensTd = document.createElement("td")
    itensTd.colSpan = 4

    let html = "<table class='tablePedidos'><thead><tr><th>Produto</th><th>Valor</th></tr></thead><tbody>"
    data.data.forEach(item => {
      html += `<tr><td>${item.produto}</td><td>${item.preco_unit}</td></tr>`
    })
    html += "</tbody></table>"
    itensTd.innerHTML = html
    itensRow.appendChild(itensTd) 

    trPedido.parentNode.insertBefore(itensRow, trPedido.nextSibling)
    }

    let btnEditar = document.createElement("button")
    btnEditar.textContent = "Editar"
    btnEditar.className = "btnEditar"
    btnEditar.onclick = () => editarPedido(object.id_pedido)

    let btnExcluir = document.createElement("button")
    btnExcluir.textContent = "Excluir"
    btnExcluir.className = "btnExcluir"
    btnExcluir.onclick = () => excluirPedido(object.id_pedido)

    tdAcoes.appendChild(btnVerItens)
    tdAcoes.appendChild(btnEditar)
    tdAcoes.appendChild(btnExcluir)

    trPedido.appendChild(tdCliente)
    trPedido.appendChild(tdPedido)
    trPedido.appendChild(tdStatus)
    trPedido.appendChild(tdValor)
    trPedido.appendChild(tdAcoes)
    pedidosTable.appendChild(trPedido)
  })
}

async function editarPedido(id) {
  window.location.href = `editarPedido.html?id=${id}`
}

async function excluirPedido(id) {
  console.log("teste")
  if (confirm("Tem certeza que deseja excluir o pedido?")) {
    const response = await fetch(`http://localhost:3000/api/pedidos/${id}`, {
      method: "DELETE",
    })

    if (response.ok) {
      alert("Pedido excluído com sucesso.")
    } else {
      const error = await response.json()
      alert(`Erro ao excluir o pedido: ${error.message}`)
    }
  }
}
