/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("pedidos").del()
  await knex("pedidos").insert([
    {
      id_pedido: "f3dcdf68-1cb7-4340-950e-d1298f9d5a39",
      cliente: "Maria",
      valor_pedido: 8.0,
      status: "Em rota de entrega",
      created_at: "2025-06-11T10:38:41.735778-03:00",
      updated_at: "2025-06-11T10:38:41.735778-03:00",
    },
    {
      id_pedido: "0595f3f7-0edf-4612-a206-91c1472094a1",
      cliente: "José",
      valor_pedido: 13.5,
      status: "Pendente",
      created_at: "2025-06-11T10:39:24.748361-03:00",
      updated_at: "2025-06-11T10:39:24.748361-03:00",
    },
    {
      id_pedido: "75888843-e878-4794-8bd6-19086a09db73",
      cliente: "Camilla",
      valor_pedido: 9.0,
      status: "Preparando",
      created_at: "2025-06-11T11:12:15.296558-03:00",
      updated_at: "2025-06-11T11:12:15.296558-03:00",
    },
    {
      id_pedido: "ed33f92a-f883-4d09-afc4-7e71bc3fb4f0",
      cliente: "Alex",
      valor_pedido: 26.5,
      status: "Entregue",
      created_at: "2025-06-11T10:37:38.315048-03:00",
      updated_at: "2025-06-11T10:37:38.315048-03:00",
    },
  ])
}
