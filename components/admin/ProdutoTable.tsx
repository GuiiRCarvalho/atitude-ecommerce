"use client";

// Tabela de produtos com botões de editar/remover
import React, { useEffect, useState } from 'react';

export default function ProdutoTable() {
  const [produtos, setProdutos] = useState<any[]>([]);

  useEffect(() => {
    fetch('/admin/api/produtos')
      .then(res => res.json())
      .then(setProdutos);
  }, []);

  const remover = async (id: string) => {
    await fetch('/admin/api/produtos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setProdutos(produtos.filter(p => p.id !== id));
  };

  return (
    <table style={{ width: '100%', marginTop: 16 }}>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Preço</th>
          <th>Quantidade</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {produtos.map(prod => (
          <tr key={prod.id}>
            <td>{prod.name}</td>
            <td>R${prod.price.toFixed(2)}</td>
            <td>{prod.quantity}</td>
            <td>
              {/* Botão de editar pode abrir um modal ou formulário inline */}
              <button onClick={() => remover(prod.id)}>Remover</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
