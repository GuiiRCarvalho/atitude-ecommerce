'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
    title: string;
    price: string;
    oldPrice?: string;
    imageUrl: string;
    badge?: 'Novo' | 'Restock' | 'Sale';
}

export default function ProductCard({ title, price, oldPrice, imageUrl, badge }: ProductCardProps) {
    const { addToCart } = useCart();
    // Helper to generate a stable ID for the mock
    const id = title.toLowerCase().replace(/\s+/g, '-');

    return (
        <article className="product-card">
            <Link href="#" className="product-img-wrapper">
                {badge && (
                    <div className={`product-badge ${badge === 'Sale' ? 'sale' : ''}`}>
                        {badge}
                    </div>
                )}
                <Image
                    src={imageUrl}
                    alt={title}
                    className="product-img"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="product-hover-action">
                    <button
                        className="btn-quick-add"
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart({ id, title, price, imageUrl });
                        }}
                    >
                        Adicionar +
                    </button>
                </div>
            </Link>
            <div className="product-info">
                <Link href="#" className="product-title">{title}</Link>
                <div className="product-price-row">
                    <span className="product-price">{price}</span>
                    {oldPrice && <span className="product-price-old">{oldPrice}</span>}
                </div>
            </div>
        </article>
    );
}
