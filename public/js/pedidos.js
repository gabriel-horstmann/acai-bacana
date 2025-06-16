async function loadData() {
  const pedidosTable = document.getElementById("pedidosTable")
  const API = await fetch("http://localhost:3000/api/pedidos")
  const objects = await API.json()
  objects.data.forEach((object) => {
    let trPedido = document.createElement("tr")
    let tdCliente = document.createElement("td")
    let tdStatus = document.createElement("td")
    let tdValor = document.createElement("td")
    let tdAcoes = document.createElement("td")
    let tdId = document.createElement("td")

    tdCliente.innerHTML = object.cliente
    tdStatus.innerHTML = object.status
    tdValor.innerHTML = object.valor_pedido
    tdId.innerHTML = object.id_pedido

    let linkVerItens = document.createElement("a")
    linkVerItens.href = `itensPedido.html?id=${object.id_pedido}`
    linkVerItens.textContent = "Ver itens"
    linkVerItens.className = "btn-ver"

    let btnEditar = document.createElement("a")
    btnEditar.textContent = "Editar"
    btnEditar.className = "btn-editar"
    btnEditar.onclick = () => editarPedido(object.id_pedido)

    let btnExcluir = document.createElement("button")
    btnExcluir.textContent = "Excluir"
    btnExcluir.className = "btn-excluir"
    btnExcluir.onclick = () => excluirPedido(object.id_pedido)

    tdAcoes.appendChild(linkVerItens)
    tdAcoes.appendChild(btnEditar)
    tdAcoes.appendChild(btnExcluir)

    trPedido.appendChild(tdCliente)
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
      loadData()
    } else {
      const error = await response.json()
      alert(`Erro ao excluir o pedido: ${error.message}`)
    }
  }
}
