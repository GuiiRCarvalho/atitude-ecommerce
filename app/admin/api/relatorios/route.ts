// API de relatórios: vendas por período, ticket médio, produtos mais vendidos, exportação CSV
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../src/infrastructure/database/prisma';
import jwt from 'jsonwebtoken';
import { config } from '../../../../src/config';

function isAdmin(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (!auth) return false;
  try {
    const token = auth.replace('Bearer ', '');
    const payload = jwt.verify(token, config.jwtSecret);
    return (payload as any).role === 'ADMIN';
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
  }
  // Exemplo: vendas por mês, ticket médio, produtos mais vendidos
  const vendasPorMes = await prisma.order.groupBy({
    by: ['createdAt'],
    _sum: { total: true },
    _count: { _all: true },
  });
  const ticketMedio = await prisma.order.aggregate({ _avg: { total: true } });
  const produtosMaisVendidos = await prisma.orderProduct.groupBy({
    by: ['productId'],
    _sum: { quantity: true },
    orderBy: { _sum: { quantity: 'desc' } },
    take: 5,
  });
  return NextResponse.json({ vendasPorMes, ticketMedio, produtosMaisVendidos });
}
