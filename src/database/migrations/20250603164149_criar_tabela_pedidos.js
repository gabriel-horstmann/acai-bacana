
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('pedidos', function(table) {
      table.increments('id_pedido').primary()
      table.date('data').notNullable()
      table.string('cliente', 255).notNullable()
      table.decimal('valor_pedido', 10, 2).notNullable()
      table.string('status', 50).defaultTo('Pendente')
      table.timestamps(true, true)
    }) 
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('pedidos')
}

