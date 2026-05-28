"use client";

// Tabela de pedidos com filtro por status e atualização manual
import React, { useEffect, useState } from 'react';
import PedidoStatusForm from './PedidoStatusForm';

type Pedido = {
  id: string;
  status: string;
  total: number;
  user: { email: string } | null;
  createdAt: string;
  products: { product: { name: string }, quantity: number, price: number }[];
};

export default function PedidoTable() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch(`/admin/api/pedidos${status ? `?status=${status}` : ''}`)
      .then(res => res.json())
      .then(setPedidos);
  }, [status]);

  return (
    <div>
      <label>Status: </label>
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="">Todos</option>
        <option value="PENDENTE">Pendente</option>
        <option value="PAGO">Pago</option>
        <option value="ENVIADO">Enviado</option>
        <option value="CANCELADO">Cancelado</option>
      </select>
      <table style={{ width: '100%', marginTop: 16 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Status</th>
            <th>Total</th>
            <th>Produtos</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(p => (
            <tr key={p.id}>
              <td>{p.id.slice(0, 6)}</td>
              <td>{p.user?.email}</td>
              <td>{p.status}</td>
              <td>R${p.total.toFixed(2)}</td>
              <td>
                {p.products.map((prod, i) => (
                  <div key={i}>{prod.product.name} x{prod.quantity}</div>
                ))}
              </td>
              <td>{new Date(p.createdAt).toLocaleDateString()}</td>
              <td><PedidoStatusForm pedidoId={p.id} currentStatus={p.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
