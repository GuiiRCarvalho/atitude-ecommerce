"use client";

// Gráfico de vendas por período, ticket médio, produtos mais vendidos (Recharts)
import React, { useEffect, useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function RelatorioChart() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/admin/api/relatorios')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div>Carregando...</div>;

  return (
    <div>
      <h3>Ticket Médio: R${data.ticketMedio._avg.total?.toFixed(2) || '0,00'}</h3>
      {/*
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.vendasPorMes}>
          <XAxis dataKey="createdAt" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="_sum.total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      */}
      <div>
        <h4>Produtos mais vendidos:</h4>
        <ul>
          {data.produtosMaisVendidos.map((p: any) => (
            <li key={p.productId}>{p.productId} - {p._sum.quantity} vendas</li>
          ))}
        </ul>
      </div>
      <p>Para gráficos, instale e use o pacote Recharts.</p>
    </div>
  );
}
