const db = require('../database/db')

const Pedido = {
    getAll: () => {
        return db('pedidos').select('*')
    },

    getById: (id) => {
        return db('pedidos').where({ id_pedido: id }).first()
    },

    create: (pedido) => {
        return db('pedidos').insert(pedido).returning('*')
    },

    update: (id, pedido) => {
        return db('pedidos').where({ id_pedido: id }).update(pedido).returning('*')
    },

    delete: (id) => {
        return db('pedidos').where({ id_pedido: id }).del()
    }
}

module.exports = Pedido