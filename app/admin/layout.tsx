import Sidebar from '../../components/admin/Sidebar';
import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: 32 }}>{children}</main>
    </div>
  );
}
