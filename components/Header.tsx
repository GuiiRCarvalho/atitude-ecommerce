'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
    const { cartCount, toggleCart } = useCart();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('atitude67_token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <header>
            <nav className="nav">
                <h1><Link href="/">ATITUDE</Link></h1>
                <ul>
                    <li><Link href="/produtos">Produtos</Link></li>
                    <li><Link href="#">Camisetas Oversized</Link></li>
                    <li><Link href="#">Calças Parachute</Link></li>
                    <li><Link href="#" className="highlight">Sale – Até 50% OFF</Link></li>
                </ul>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                    <Link href={isLoggedIn ? "/perfil" : "/login"} style={{ color: 'var(--text-main)', transition: 'color 0.3s ease', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <User size={24} />
                        {isLoggedIn && <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>Perfil</span>}
                    </Link>
                    <button
                        onClick={toggleCart}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', color: 'var(--text-main)' }}
                    >
                        <ShoppingCart size={24} />
                        {cartCount > 0 && (
                            <span style={{
                                position: 'absolute', top: '-8px', right: '-8px',
                                background: 'var(--accent)', color: 'white',
                                fontSize: '10px', fontWeight: 'bold',
                                width: '18px', height: '18px', borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </nav>
        </header>
    );
}
