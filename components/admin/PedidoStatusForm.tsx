"use client";

// Formulário para atualizar status do pedido
import React, { useState } from 'react';

type Props = { pedidoId: string; currentStatus: string };

export default function PedidoStatusForm({ pedidoId, currentStatus }: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const updateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch('/admin/api/pedidos', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: pedidoId, status }),
    });
    setLoading(false);
  };

  return (
    <form onSubmit={updateStatus} style={{ display: 'flex', gap: 4 }}>
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="PENDENTE">Pendente</option>
        <option value="PAGO">Pago</option>
        <option value="ENVIADO">Enviado</option>
        <option value="CANCELADO">Cancelado</option>
      </select>
      <button type="submit" disabled={loading}>Salvar</button>
    </form>
  );
}
