async function loadData() {
    const pedidosTable = document.getElementById('pedidosTable')
    const API = await fetch("http://localhost:3000/api/pedidos")
    const objects = await API.json()
    objects.data.forEach(object => {
        let trPedido = document.createElement("tr")
        let tdCliente = document.createElement("td")
        let tdStatus = document.createElement("td")
        let tdValor = document.createElement("td")
        let tdAcoes = document.createElement("td")
        let linkId = document.createElement("a")
        
        tdCliente.innerHTML = object.cliente
        tdStatus.innerHTML = object.status
        tdValor.innerHTML = object.valor_pedido

        linkId.href = `itensPedido.html?id=${object.id_pedido}`
        linkId.textContent = 'Ver itens' 

        linkId.addEventListener('click', (e) => {
            console.log('Link clicado:', linkId.href)
        })

        tdAcoes.appendChild(linkId)
        trPedido.appendChild(tdCliente)
        trPedido.appendChild(tdStatus)
        trPedido.appendChild(tdValor)
        trPedido.appendChild(tdAcoes)
        pedidosTable.appendChild(trPedido)
    })
}
