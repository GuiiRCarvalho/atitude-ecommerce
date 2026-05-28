import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside style={{ width: 220, background: '#111', color: '#fff', padding: 24, minHeight: '100vh' }}>
      <h2 style={{ fontWeight: 800, fontSize: 22, marginBottom: 32 }}>Admin</h2>
      <nav>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <li><Link href="/admin">Dashboard</Link></li>
          <li><Link href="/admin/pedidos">Pedidos</Link></li>
          <li><Link href="/admin/estoque">Estoque</Link></li>
          <li><Link href="/admin/relatorios">Relatórios</Link></li>
        </ul>
      </nav>
    </aside>
  );
}
