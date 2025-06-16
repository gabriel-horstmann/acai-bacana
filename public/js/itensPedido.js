async function loadItensPedido() {
  const urlParams = new URLSearchParams(window.location.search)
  const idPedido = urlParams.get("id")

  const response = await fetch(
    `http://localhost:3000/api/pedidos/${idPedido}/itens`
  )

  const data = await response.json()
  let itensTable = document.getElementById("itensTable")
  itensTable.innerHTML = ''

  const thead = document.createElement("thead")
  const headerRow = document.createElement("tr")
  const header = ["Produto", "Valor Unitário"]
  header.forEach((headerText) => {
    const th = document.createElement("th")
    th.textContent = headerText
    headerRow.appendChild(th)
  })
  thead.appendChild(headerRow)
  itensTable.appendChild(thead)
  const tbody = document.createElement("tbody")
  const itens = data.data
  itens.forEach((item) => {
    const tr = document.createElement("tr")
    tr.innerHTML = `
    <td>${item.produto}</td>
    <td>${item.preco_unit}</td>
    `
    tbody.appendChild(tr)
  })
  itensTable.appendChild(tbody)
}

document.addEventListener('DOMContentLoaded', () => {
  loadItensPedido()
})

loadItensPedido()
