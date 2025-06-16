// No arquivo: 20250610104502_alter_pedidos_id_to_uuid.js

exports.up = async function(knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await knex.raw('ALTER TABLE pedidos DROP CONSTRAINT IF EXISTS pedidos_pkey CASCADE');
  await knex.raw('ALTER TABLE pedidos ALTER COLUMN id_pedido DROP DEFAULT');
  await knex.raw('ALTER TABLE pedidos ALTER COLUMN id_pedido SET DATA TYPE UUID USING (uuid_generate_v4())');
  await knex.raw('ALTER TABLE pedidos ALTER COLUMN id_pedido SET DEFAULT uuid_generate_v4()');
  await knex.raw('ALTER TABLE pedidos ADD PRIMARY KEY (id_pedido)');
};

exports.down = async function(knex) {
  await knex.raw('ALTER TABLE pedidos DROP CONSTRAINT IF EXISTS pedidos_pkey CASCADE');
  await knex.raw('ALTER TABLE pedidos ALTER COLUMN id_pedido DROP DEFAULT');
  await knex.raw('ALTER TABLE pedidos ALTER COLUMN id_pedido SET DATA TYPE INTEGER USING (0)');
};