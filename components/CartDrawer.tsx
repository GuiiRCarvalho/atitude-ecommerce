'use client';

import React from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function CartDrawer() {
    const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const [isCheckingOut, setIsCheckingOut] = React.useState(false);

    if (!isCartOpen) return null;

    const handleCheckout = async () => {
        const token = localStorage.getItem('atitude67_token') || sessionStorage.getItem('atitude67_token');
        if (!token) {
            alert('Você precisa estar logado para finalizar a compra.');
            window.location.href = '/login';
            return;
        }

        if (cart.length === 0) return;

        setIsCheckingOut(true);
        try {
            const response = await fetch('/api/payments/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    items: cart.map(item => ({
                        id: item.id,
                        price: item.price,
                        quantity: item.quantity,
                        title: item.title,
                        imageUrl: item.imageUrl
                    }))
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || data.error || 'Erro ao iniciar checkout');
            }

            if (data.url) {
                window.location.href = data.url; // Redirect to Stripe
            } else {
                throw new Error('URL de pagamento não retornada');
            }
        } catch (err: any) {
            alert(`Erro no checkout: ${err.message}`);
            setIsCheckingOut(false);
        }
    };

    return (
        <>
            <div
                className="cart-overlay"
                onClick={toggleCart}
                style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999,
                    backdropFilter: 'blur(4px)'
                }}
            />
            <div
                className="cart-drawer"
                style={{
                    position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '400px',
                    backgroundColor: '#fff', zIndex: 1000, display: 'flex', flexDirection: 'column',
                    boxShadow: '-4px 0 24px rgba(0,0,0,0.1)',
                    animation: 'slideInRight 0.3s ease forwards'
                }}
            >
                <div className="cart-header" style={{
                    padding: '24px', borderBottom: '1px solid #e5e5e5', display: 'flex',
                    justifyContent: 'space-between', alignItems: 'center'
                }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 800 }}>SEU CARRINHO</h2>
                    <button onClick={toggleCart} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                </div>

                <div className="cart-items" style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {cart.length === 0 ? (
                        <div style={{ textAlign: 'center', marginTop: '40px', color: '#666' }}>
                            <p>Seu carrinho está vazio.</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} style={{ display: 'flex', gap: '16px' }}>
                                <div style={{ position: 'relative', width: '80px', height: '106px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                                    <Image src={item.imageUrl} alt={item.title} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <div>
                                        <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{item.title}</h4>
                                        <span style={{ fontSize: '14px', fontWeight: 700 }}>{item.price}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e5e5', borderRadius: '4px' }}>
                                            <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: '4px 8px', background: 'none', border: 'none', cursor: 'pointer' }}><Minus size={14} /></button>
                                            <span style={{ fontSize: '14px', fontWeight: 600, width: '24px', textAlign: 'center' }}>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: '4px 8px', background: 'none', border: 'none', cursor: 'pointer' }}><Plus size={14} /></button>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} style={{ color: '#E53935', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Trash2 size={14} />
                                            Remover
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-footer" style={{ padding: '24px', borderTop: '1px solid #e5e5e5', backgroundColor: '#f8f8f8' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '18px', fontWeight: 800 }}>
                        <span>Total</span>
                        <span>R$ {cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        disabled={isCheckingOut || cart.length === 0}
                        style={{
                            width: '100%', padding: '16px',
                            backgroundColor: isCheckingOut || cart.length === 0 ? '#666' : '#111',
                            color: '#fff',
                            border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '16px',
                            cursor: isCheckingOut || cart.length === 0 ? 'not-allowed' : 'pointer',
                            transition: 'background 0.2s'
                        }}>
                        {isCheckingOut ? 'PROCESSANDO...' : 'FINALIZAR COMPRA'}
                    </button>
                </div>
            </div>
            <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
        </>
    );
}
