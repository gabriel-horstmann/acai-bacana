document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pedidoForm')
    const adicionarItemBtn = document.getElementById('adicionarItem')
    const itensContainer = document.getElementById('itensContainer')

    adicionarItemBtn.addEventListener('click', () => {
        const novoItem = document.createElement('div')
        novoItem.innerHTML = `
            <div class="form-group">
                <label for="produto">Produto:</label>
                <input type="text" name="produto[]" maxlength="255" required>
            </div>

            <div class="form-group">
                <label for="preco">Preço:</label>
                <input type="number" name="preco[]" step="0.01" min="0" required>
            </div>

            <button type="button" class="remover-item">Remover</button>
        `

        novoItem.querySelector('.remover-item').addEventListener('click', () => {
            novoItem.remove()
        })

        itensContainer.appendChild(novoItem)
    })

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const formData = {
            cliente: document.getElementById('cliente').value,
            status: document.getElementById('status').value,
            pedido: document.getElementById('pedido').value,
            itens: []
        }

        const produtos = document.getElementsByName('produto[]')
        const precos = document.getElementsByName('preco[]')

        for (let i = 0; i < produtos.length; i++) {
            formData.itens.push({
                produto: produtos[i].value,
                preco_unit: parseFloat(precos[i].value)
            })
        }

        const response = await fetch('/api/pedidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if (response.ok) {
            alert('Pedido criado com sucesso!')
            window.location.href = '/pedidos.html'
        } else {
            const error = await response.json()
            alert('Erro ao criar pedido: ' + error.message)
        }
    })
})