async function loadItensPedido() {
  const itensPedido = document.getElementById("itensPedido")
  const API = await fetch("http://localhost:3000/api/pedidos")
  const pedidos = await API.json()
  pedidos.data.forEach(pedido => {
    pedido.itens.forEach(item => {
      let trItem = document.createElement("tr")
      let tdProduto = document.createElement("td")
      let tdPreco = document.createElement("td")
      tdProduto.innerHTML = item.produto
      tdPreco.innerHTML = item.preco_unit
      trItem.appendChild(tdProduto)
      trItem.appendChild(tdPreco)
      itensPedido.appendChild(trItem)
    })
  })
}
