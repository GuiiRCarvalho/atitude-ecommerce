// API CRUD de pedidos, filtro por status, atualização de status
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
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  let where = {};
  if (status && ['PENDENTE','PAGO','ENVIADO','CANCELADO'].includes(status)) {
    where = { status };
  }
  const pedidos = await prisma.order.findMany({
    where,
    include: { products: { include: { product: true } }, user: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(pedidos);
}

export async function PATCH(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
  }
  const { id, status } = await req.json();
  const pedido = await prisma.order.update({
    where: { id },
    data: { status },
  });
  return NextResponse.json(pedido);
}
