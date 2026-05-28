// API CRUD de produtos
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

export async function GET() {
  const produtos = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(produtos);
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
  }
  const { name, price, quantity } = await req.json();
  const produto = await prisma.product.create({ data: { name, price, quantity } });
  return NextResponse.json(produto);
}

export async function PATCH(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
  }
  const { id, name, price, quantity } = await req.json();
  const produto = await prisma.product.update({
    where: { id },
    data: { name, price, quantity },
  });
  return NextResponse.json(produto);
}

export async function DELETE(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
  }
  const { id } = await req.json();
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
