/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
  await knex.raw('ALTER TABLE itens DROP CONSTRAINT IF EXISTS itens_pkey CASCADE')
  await knex.raw('ALTER TABLE itens ALTER COLUMN id_item DROP DEFAULT')
  await knex.raw('ALTER TABLE itens ALTER COLUMN id_item SET DATA TYPE UUID USING (uuid_generate_v4())')
  await knex.raw('ALTER TABLE itens ALTER COLUMN id_item SET DEFAULT uuid_generate_v4()')
  await knex.raw('ALTER TABLE itens ADD PRIMARY KEY (id_item)')
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.raw('ALTER TABLE itens DROP CONSTRAINT IF EXISTS itens_pkey CASCADE')
  await knex.raw('ALTER TABLE itens ALTER COLUMN id_item DROP DEFAULT')
  await knex.raw('ALTER TABLE itens ALTER COLUMN id_item SET DATA TYPE INTEGER USING (0)')
  await knex.raw('CREATE SEQUENCE IF NOT EXISTS itens_id_item_seq')
  await knex.raw('ALTER TABLE itens ALTER COLUMN id_item SET DEFAULT nextval(\'itens_id_item_seq\')')
  await knex.raw(`SELECT setval('itens_id_item_seq', (SELECT COALESCE(MAX(id_item), 1) FROM itens))`)
  await knex.raw('ALTER TABLE items ADD PRIMARY KEY (id_item)')
}