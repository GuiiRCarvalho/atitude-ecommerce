'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package, User } from 'lucide-react';

// Mock data to simulate orders
const MOCK_ORDERS = [
    { id: 'ORD-7A9B2', date: '04 Mar 2026', total: 'R$ 299,90', status: 'Entregue', items: 2 },
    { id: 'ORD-3X5L1', date: '21 Fev 2026', total: 'R$ 145,00', status: 'A Caminho', items: 1 }
];

export default function PerfilPage() {
    const router = useRouter();
    const [tokenInfo, setTokenInfo] = useState<string | null>(null);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('atitude67_token');
        if (!token) {
            router.push('/login');
        } else {
            setTokenInfo(token);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('atitude67_token');
        router.push('/login');
    };

    if (!tokenInfo) return null; // loading state

    return (
        <div className="profile-wrapper">
            <div className="profile-grid">

                {/* SIDEBAR / PERFIL */}
                <div className="profile-sidebar">
                    <div className="sidebar-header">
                        <User size={40} className="avatar-icon" />
                        <div className="sidebar-info">
                            <h2>MEU PERFIL</h2>
                            <p>Conectado</p>
                        </div>
                    </div>

                    <div className="profile-actions">
                        <button onClick={handleLogout} className="logout-button">SAIR DA CONTA</button>
                    </div>
                </div>

                {/* CONTENT / HISTORICO DE PEDIDOS */}
                <div className="profile-content">
                    <div className="content-header">
                        <Package size={24} />
                        <h2>MEUS PEDIDOS</h2>
                    </div>

                    <div className="orders-list">
                        {MOCK_ORDERS.length > 0 ? (
                            MOCK_ORDERS.map(order => (
                                <div key={order.id} className="order-card">
                                    <div className="order-main">
                                        <span className="order-id">#{order.id}</span>
                                        <span className={`order-status ${order.status === 'Entregue' ? 'status-delivered' : 'status-pending'}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="order-details">
                                        <span>{order.date}</span>
                                        <span>•</span>
                                        <span>{order.items} iten(s)</span>
                                        <span>•</span>
                                        <span className="order-total">{order.total}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <p>Você ainda não fez nenhum pedido.</p>
                                <button onClick={() => router.push('/produtos')} className="shop-button">VER PRODUTOS</button>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .profile-wrapper {
          min-height: calc(100vh - 160px);
          background: var(--bg-color);
          padding: 60px 20px;
        }

        .profile-grid {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 32px;
          animation: fadeInUp 0.6s ease forwards;
        }

        /* SIDEBAR / PERFIL */
        .profile-sidebar {
          background: var(--white);
          padding: 32px;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
          height: fit-content;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
        }

        .avatar-icon {
          color: var(--text-main);
          background: var(--bg-color);
          padding: 8px;
          border-radius: 50%;
        }

        .sidebar-info h2 {
          font-size: 18px;
          font-weight: 900;
          letter-spacing: -0.5px;
          margin-bottom: 4px;
        }

        .sidebar-info p {
          color: #4caf50;
          font-size: 13px;
          font-weight: 600;
        }

        .profile-actions {
          margin-top: 32px;
        }

        .logout-button {
          background: transparent;
          color: var(--accent);
          border: 1px solid var(--accent);
          padding: 14px 24px;
          font-family: inherit;
          font-weight: 700;
          font-size: 14px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
        }

        .logout-button:hover {
          background: var(--accent);
          color: var(--white);
        }

        /* CONTENT / HISTORICO */
        .profile-content {
          background: var(--white);
          padding: 32px;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
        }

        .content-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border-color);
        }

        .content-header h2 {
          font-size: 20px;
          font-weight: 900;
          letter-spacing: -0.5px;
        }

        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .order-card {
          padding: 24px;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          transition: border-color 0.2s;
        }

        .order-card:hover {
          border-color: var(--text-main);
        }

        .order-main {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .order-id {
          font-weight: 800;
          font-size: 16px;
          letter-spacing: 0.5px;
        }

        .order-status {
          font-size: 12px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
        }

        .status-delivered {
          background: #e8f5e9;
          color: #2e7d32;
        }

        .status-pending {
          background: #fff3e0;
          color: #ef6c00;
        }

        .order-details {
          display: flex;
          gap: 12px;
          color: var(--text-muted);
          font-size: 14px;
          align-items: center;
        }

        .order-total {
          color: var(--text-main);
          font-weight: 700;
        }

        .empty-state {
          text-align: center;
          padding: 48px 24px;
          color: var(--text-muted);
        }

        .shop-button {
          margin-top: 24px;
          background: var(--text-main);
          color: var(--white);
          border: none;
          padding: 12px 24px;
          font-family: inherit;
          font-weight: 700;
          font-size: 13px;
          border-radius: 6px;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .profile-grid {
            grid-template-columns: 1fr;
          }
          .profile-sidebar, .profile-content {
            padding: 24px;
          }
        }
      `}} />
        </div>
    );
}
