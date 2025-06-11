/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw(
    "ALTER TABLE itens ALTER COLUMN id_pedido SET DATA TYPE UUID USING (NULL::uuid)"
  )
  await knex.raw(`
    ALTER TABLE itens
    ADD CONSTRAINT fk_itens_pedidos
    FOREIGN KEY (id_pedido)
    REFERENCES pedidos (id_pedido)
    ON DELETE CASCADE
  `)
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.raw("ALTER TABLE itens DROP CONSTRAINT fk_itens_pedidos")
}
