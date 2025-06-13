async function loadData() {
    const pedidosTable = document.getElementById('pedidosTable')
    const API = await fetch("http://localhost:3000/api/pedidos")
    const objects = await API.json()
    objects.data.forEach(object => {
        let trPedido = document.createElement("tr")
        let tdCliente = document.createElement("td")
        let tdStatus = document.createElement("td")
        let tdValor = document.createElement("td")
        tdCliente.innerHTML = object.cliente
        tdStatus.innerHTML = object.status
        tdValor.innerHTML = object.valor_pedido
        trPedido.appendChild(tdCliente)
        trPedido.appendChild(tdStatus)
        trPedido.appendChild(tdValor)
        pedidosTable.appendChild(trPedido)
    })
}


