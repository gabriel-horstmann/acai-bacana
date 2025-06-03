exports.up = function(knex) {
  return knex.schema.createTable('itens', function(table) {
    table.increments('id_item').primary()
    table.integer('id_pedido')
         .unsigned()
         .notNullable()
         .references('id_pedido')
         .inTable('pedidos')
         .onDelete('CASCADE')
         .onUpdate('CASCADE')
    table.string('produto', 255).notNullable()
    table.decimal('preco_unit', 10, 2).notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('itens')
}