"use client";

// Formulário para adicionar produto (React Hook Form + Zod)
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(2),
  price: z.number().min(0),
  quantity: z.number().int().min(0),
});

type FormData = z.infer<typeof schema>;

export default function ProdutoForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', price: 0, quantity: 0 },
  });

  const onSubmit = async (data: FormData) => {
    await fetch('/admin/api/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
      <input placeholder="Nome" {...register('name')} />
      <input type="number" step="0.01" placeholder="Preço" {...register('price', { valueAsNumber: true })} />
      <input type="number" placeholder="Quantidade" {...register('quantity', { valueAsNumber: true })} />
      <button type="submit">Adicionar</button>
      {errors.name && <span>Nome obrigatório</span>}
      {errors.price && <span>Preço inválido</span>}
      {errors.quantity && <span>Quantidade inválida</span>}
    </form>
  );
}
