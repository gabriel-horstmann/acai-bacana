/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  // --- Gerenciar id_pedido (chave estrangeira) ---
  // 1. Remover a constraint de chave estrangeira existente em id_pedido.
  //    Verifique o nome exato da sua constraint com \d itens.
  await knex.raw('ALTER TABLE itens DROP CONSTRAINT IF EXISTS id_pedido');

  // 2. Alterar o tipo da coluna id_pedido para UUID.
  //    Assume que pedidos.id_pedido já é UUID.
  //    A cláusula USING é para converter dados existentes. Se a coluna estiver vazia ou os dados não puderem ser convertidos, ajuste.
  await knex.raw('ALTER TABLE itens ALTER COLUMN id_pedido TYPE uuid USING (uuid_generate_v4())');
  await knex.raw('ALTER TABLE itens ALTER COLUMN id_pedido SET NOT NULL');


  // --- Gerenciar id_item (chave primária) ---
  // 3. Remover a constraint de chave primária existente em id_item.
  //    Verifique o nome exato da sua PK com \d itens (geralmente 'itens_pkey' ou 'itens_id_item_pkey').
  await knex.raw('ALTER TABLE itens DROP CONSTRAINT IF EXISTS itens_pkey');

  // 4. Remover o valor padrão da coluna id_item (se existia, por ex. de um increments())
  await knex.raw('ALTER TABLE itens ALTER COLUMN id_item DROP DEFAULT IF EXISTS');
  
  // 5. Alterar o tipo da coluna id_item para UUID.
  await knex.raw('ALTER TABLE itens ALTER COLUMN id_item TYPE uuid USING (uuid_generate_v4())');
  await knex.raw('ALTER TABLE itens ALTER COLUMN id_item SET NOT NULL');

  // 6. Readicionar id_item como a chave primária.
  await knex.raw('ALTER TABLE itens ADD PRIMARY KEY (id_item)');

  // 7. Readicionar a constraint de chave estrangeira para id_pedido (agora com tipos UUID).
  await knex.raw('ALTER TABLE itens ADD CONSTRAINT id_pedido_uuid FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido)');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// ... (exports.up) ...
exports.down = async function(knex) {
  await knex.raw('ALTER TABLE itens DROP CONSTRAINT IF EXISTS id_pedido_uuid');
  await knex.raw('ALTER TABLE itens DROP CONSTRAINT IF EXISTS itens_pkey'); 
  
  // CUIDADO: ISSO APAGA TODOS OS DADOS DA TABELA 'itens'
  await knex.raw('DELETE FROM itens');

  await knex.raw('ALTER TABLE itens ALTER COLUMN id_item DROP DEFAULT');
  await knex.raw('ALTER TABLE itens ALTER COLUMN id_item TYPE integer USING (0)');
  await knex.raw('ALTER TABLE itens ALTER COLUMN id_item SET NOT NULL');
  await knex.raw('ALTER TABLE itens ADD PRIMARY KEY (id_item)');

  await knex.raw('ALTER TABLE itens ALTER COLUMN id_pedido DROP DEFAULT');
  await knex.raw('ALTER TABLE itens ALTER COLUMN id_pedido TYPE integer USING (0)');
  await knex.raw('ALTER TABLE itens ALTER COLUMN id_pedido SET NOT NULL');

  // A recriação da FK pode falhar se pedidos.id_pedido não for PK ou se houver valores 0 em ambos
  // que não se alinham. Dado que estamos revertendo tudo, e pedidos.id_pedido também será 0 (e PK),
  // esta FK para um único valor 0 pode funcionar se ambas as tabelas tiverem apenas linhas com id_pedido = 0.
  await knex.raw('ALTER TABLE itens ADD CONSTRAINT id_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido)');
};
