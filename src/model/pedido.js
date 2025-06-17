const db = require('../database/db')
const { v4: uuidv4 } = require('uuid')

const Pedido = {
    getAll: () => {
        return db('pedidos').select('*')
    },

    getById: (id) => {
        return db('pedidos').where({ id_pedido: id }).first()
    },

    create: (pedido, trx) => {
        const queryBuilder = trx || db
        const addIdPedidos = {
            ...pedido,
            id_pedido: pedido.id_pedido || uuidv4()
        }
        return queryBuilder('pedidos').insert(addIdPedidos).returning('*')
    },

    update: (id, pedido, trx) => {
        const queryBuilder = trx || db
        return queryBuilder('pedidos').where({ id_pedido: id }).update(pedido).returning('*')
    },

    delete: (id, trx) => {
        const queryBuilder = trx || db
        return queryBuilder('pedidos').where({ id_pedido: id }).del()
    }
}

module.exports = Pedido