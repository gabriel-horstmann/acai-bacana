exports.up = async function(knex) {
  await knex.schema.raw('ALTER TABLE pedidos DROP CONSTRAINT IF EXISTS pedidos_pkey')
  await knex.schema.raw('ALTER TABLE pedidos ALTER COLUMN id_pedido DROP DEFAULT')
  await knex.schema.raw('ALTER TABLE pedidos ALTER COLUMN id_pedido TYPE uuid USING (uuid_generate_v4())')
  await knex.schema.raw('ALTER TABLE pedidos ALTER COLUMN id_pedido SET NOT NULL')
  await knex.schema.raw('ALTER TABLE pedidos ADD PRIMARY KEY (id_pedido)')
}

// ... (exports.up permanece o mesmo) ...

exports.down = async function(knex) {
  await knex.schema.raw('ALTER TABLE pedidos DROP CONSTRAINT IF EXISTS pedidos_pkey');
  await knex.schema.raw('ALTER TABLE pedidos ALTER COLUMN id_pedido DROP DEFAULT'); 
  
  // Excluir todos os dados da tabela para evitar duplicatas ao definir id_pedido como 0
  // CUIDADO: ISSO APAGA TODOS OS DADOS DA TABELA 'pedidos'
  await knex.schema.raw('DELETE FROM pedidos'); 
  
  await knex.schema.raw('ALTER TABLE pedidos ALTER COLUMN id_pedido TYPE integer USING (0)');
  await knex.schema.raw('ALTER TABLE pedidos ALTER COLUMN id_pedido SET NOT NULL');
  await knex.schema.raw('ALTER TABLE pedidos ADD PRIMARY KEY (id_pedido)');
};
