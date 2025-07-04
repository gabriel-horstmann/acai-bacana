/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("pedidos", function (table) {
    table.string("pedido", 255).notNullable().defaultTo('Açai 500ML')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table('pedidos', function(table) {
    table.dropColumn('pedido')
  })
}
