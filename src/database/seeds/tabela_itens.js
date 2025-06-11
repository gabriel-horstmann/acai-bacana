/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("itens").del()
  await knex("itens").insert([
    {
      id_item: "ddc7aaf4-5e65-4dc7-a2ce-069614969879",
      id_pedido: "ed33f92a-f883-4d09-afc4-7e71bc3fb4f0",
      produto: "Leite em pó",
      preco_unit: 2.5,
      updated_at: "2025-06-11T10:37:38.315048-03:00",
    },
    {
      id_item: "90d79b17-65b1-45b8-aacb-e2f8dfd6bee0",
      id_pedido: "ed33f92a-f883-4d09-afc4-7e71bc3fb4f0",
      produto: "Leite condensado",
      preco_unit: 4.0,
      updated_at: "2025-06-11T10:37:38.315048-03:00",
    },
    {
      id_item: "ee284d1b-377b-4f2a-9436-16708e707434",
      id_pedido: "f3dcdf68-1cb7-4340-950e-d1298f9d5a39",
      produto: "Brigadeiro",
      preco_unit: 4.0,
      updated_at: "2025-06-11T10:38:41.735778-03:00",
    },
    {
      id_item: "8579b1f6-584f-4f5c-800a-4494e2df027f",
      id_pedido: "f3dcdf68-1cb7-4340-950e-d1298f9d5a39",
      produto: "Leite em pó",
      preco_unit: 2.5,
      updated_at: "2025-06-11T10:38:41.735778-03:00",
    },
    {
      id_item: "ac14fd6f-d152-41ab-8438-c207f05c6f40",
      id_pedido: "f3dcdf68-1cb7-4340-950e-d1298f9d5a39",
      produto: "Banana",
      preco_unit: 1.5,
      updated_at: "2025-06-11T10:38:41.735778-03:00",
    },
    {
      id_item: "ec61ebf3-dc3a-4b80-b137-d124eb1ef458",
      id_pedido: "0595f3f7-0edf-4612-a206-91c1472094a1",
      produto: "Nutella",
      preco_unit: 10.0,
      updated_at: "2025-06-11T10:39:24.748361-03:00",
    },
    {
      id_item: "9bab523b-722c-42d9-9aa2-31f91b2f02c9",
      id_pedido: "0595f3f7-0edf-4612-a206-91c1472094a1",
      produto: "Leite em pó",
      preco_unit: 2.5,
      updated_at: "2025-06-11T10:39:24.748361-03:00",
    },
    {
      id_item: "5c2ee32d-f057-48f5-8b6e-46c9c4450a40",
      id_pedido: "0595f3f7-0edf-4612-a206-91c1472094a1",
      produto: "Granulado",
      preco_unit: 1.0,
      updated_at: "2025-06-11T10:39:24.748361-03:00",
    },
    {
      id_item: "4e61c825-782e-4fff-b7c0-2d98c09a23ff",
      id_pedido: "75888843-e878-4794-8bd6-19086a09db73",
      produto: "Whey",
      preco_unit: 6.0,
      updated_at: "2025-06-11T11:12:15.296558-03:00",
    },
    {
      id_item: "dea54c3d-1a37-4e8d-a1c5-3f883990556d",
      id_pedido: "75888843-e878-4794-8bd6-19086a09db73",
      produto: "Mel",
      preco_unit: 2.0,
      updated_at: "2025-06-11T11:12:15.296558-03:00",
    },
    {
      id_item: "efa4cf82-5d5d-49bb-851e-39d52855b97f",
      id_pedido: "75888843-e878-4794-8bd6-19086a09db73",
      produto: "Aveia",
      preco_unit: 1.0,
      updated_at: "2025-06-11T11:12:15.296558-03:00",
    },
    {
      id_item: "d20f1b55-7bec-4c11-854d-9945bdbd0026",
      id_pedido: "ed33f92a-f883-4d09-afc4-7e71bc3fb4f0",
      produto: "Morango",
      preco_unit: 5.0,
      updated_at: "2025-06-11T10:37:38.315048-03:00",
    },
  ])
}
