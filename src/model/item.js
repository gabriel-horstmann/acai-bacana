const db = require('../database/db')

const Item = {
    getByPedidoId: (id_pedido) => {
        return db('itens').where({ id_pedido: id_pedido }).select('*')
    },

    create: (item) => {
        return db('itens').insert(item).returning('*')
    },

    createMany: (itens) => {
        return db('itens').insert(itens).returning('*')
    },

    update: (id_item, item) => {
        return db('itens').where({ id_item: id_item }).update(item).returning('*')
    },

    delete: (id_pedido) => {
        return db('itens').where({ id_pedido: id_pedido }).del()
    }
}

module.exports = Item