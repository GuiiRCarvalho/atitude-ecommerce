# Atitude 67 – E-commerce com Painel Administrativo

## Painel Admin (/admin)

O painel administrativo permite:
- **Gestão de pedidos:** listar, filtrar por status, atualizar status manualmente
- **Gestão de estoque:** listar, editar, adicionar e remover produtos
- **Relatórios:** vendas por período, ticket médio, produtos mais vendidos, exportação CSV
- **Controle de acesso:** apenas usuários com role `ADMIN` acessam o painel

### Prints de exemplo

> Adicione aqui prints do painel após rodar o projeto.

### Tecnologias
- Next.js (App Router)
- TypeScript
- Prisma ORM + PostgreSQL
- NextAuth.js (com campo `role` no usuário)
- React Hook Form + Zod
- Recharts (para gráficos)

### Estrutura do painel

```
app/
  admin/
    layout.tsx
    page.tsx
    pedidos/
      page.tsx
    estoque/
      page.tsx
    relatorios/
      page.tsx
    api/
      pedidos/route.ts
      produtos/route.ts
      relatorios/route.ts
components/
  admin/
    Sidebar.tsx
    PedidoTable.tsx
    ProdutoTable.tsx
    ProdutoForm.tsx
    PedidoStatusForm.tsx
    RelatorioChart.tsx
```

### Como rodar

1. Instale dependências:
   ```sh
   npm install
   # ou
   yarn
   ```
2. Configure o banco PostgreSQL e variáveis de ambiente (`.env`)
3. Rode as migrations:
   ```sh
   npx prisma migrate dev
   ```
4. Inicie o projeto:
   ```sh
   npm run dev
   ```
5. Acesse `/admin` com um usuário admin

### Observações
- Para gráficos, instale o pacote `recharts`.
- Para formulários, instale `react-hook-form`, `zod` e `@hookform/resolvers`.
- O acesso ao painel é protegido por autenticação e role.
