const db = require('../database/db')
const { v4: uuidv4 } = require('uuid')

const Item = {
    getByPedidoId: (id_pedido) => {
        return db('itens').where({ id_pedido: id_pedido }).select('*')
    },

    create: (item) => {
        return db('itens').insert(item).returning('*')
    },

    createMany: (itens, trx) => {
        const queryBuilder = trx || db
        const addIdItens = itens.map(item => ({
           ...item,
           id_item: item.id_item || uuidv4() 
        }))
        return queryBuilder('itens').insert(addIdItens).returning('*')
    },

    update: (id_item, item) => {
        return db('itens').where({ id_item: id_item }).update(item).returning('*')
    },

    delete: (id_pedido, trx) => {
        const queryBuilder = trx || db
        return queryBuilder('itens').where({ id_pedido: id_pedido }).del()
    }
}

module.exports = Item