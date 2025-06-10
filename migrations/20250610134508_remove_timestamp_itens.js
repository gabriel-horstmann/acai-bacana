/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   return knex.schema.table('itens', function(table) {
        table.dropColumn('created_at')
    }) 
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('itens', function(table) {
        table.timestamp('created_at').defaultTo(knex.fn.now())
    }) 
}
