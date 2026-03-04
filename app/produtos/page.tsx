import React from 'react';
import ProductCard from '@/components/ProductCard';
import { SlidersHorizontal } from 'lucide-react';

export default function ProductsPage() {
    const products = [
        {
            id: 1,
            title: "Camiseta Oversized Blank - Branca",
            price: "R$ 149,90",
            imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
            badge: "Novo" as const
        },
        {
            id: 2,
            title: "Camiseta Classic Logo - Preta",
            price: "R$ 129,90",
            oldPrice: "R$ 159,90",
            imageUrl: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop",
            badge: "Sale" as const
        },
        {
            id: 3,
            title: "Moletom Heavyweight Hoodie - Cinza",
            price: "R$ 289,90",
            imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 4,
            title: "Calça Parachute Cargo - Preta",
            price: "R$ 319,90",
            imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop",
            badge: "Restock" as const
        },
        {
            id: 5,
            title: "Camiseta Oversized Washed - Chumbo",
            price: "R$ 169,90",
            imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 6,
            title: "Camiseta Graphic 'No Rules' - Branca",
            price: "R$ 139,90",
            oldPrice: "R$ 169,90",
            imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop",
            badge: "Sale" as const
        }
    ];

    return (
        <>
            <div className="page-header">
                <h2>NOSSOS PRODUTOS</h2>
                <p>Peças premium projetadas para o uso diário. Conforto extremo, corte impecável e durabilidade que resiste à selva de pedra.</p>
            </div>

            <div className="filters-bar">
                <div className="filters-left">
                    <button className="filter-btn active">Todos</button>
                    <button className="filter-btn">Oversized</button>
                    <button className="filter-btn">Calças</button>
                    <button className="filter-btn">Moletons</button>
                </div>
                <div className="filters-right">
                    <button className="filter-btn">
                        <SlidersHorizontal size={16} />
                        Filtrar / Ordenar
                    </button>
                </div>
            </div>

            <section className="products-grid">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        title={product.title}
                        price={product.price}
                        oldPrice={product.oldPrice}
                        imageUrl={product.imageUrl}
                        badge={product.badge}
                    />
                ))}
            </section>
        </>
    );
}
