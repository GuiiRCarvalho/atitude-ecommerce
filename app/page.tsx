import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Truck, Tag, RefreshCcw, CreditCard } from 'lucide-react';

export default function Home() {
    return (
        <>
            <section className="hero">
                <div className="hero-text">
                    <div className="badge">Novo Drop</div>
                    <h2>ESSENTIALS<br />OVERSIZED</h2>
                    <p className="subtitle">Desenhada para o caos urbano. Caimento perfeito, algodão 100% premium e atitude em cada costura.</p>

                    <div className="price-container">
                        <div className="price">R$ 179,90</div>
                        <div className="price-promo">🔥 Oferta: 2 peças por R$ 299,90</div>
                    </div>
                    <br />

                    <Link href="/produtos" className="btn">
                        Comprar Agora
                        <ArrowRight size={20} />
                    </Link>
                </div>

                <div className="hero-img-container">
                    <img className="hero-img"
                        src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1000&auto=format&fit=crop"
                        alt="Modelo usando Camiseta Oversized Atitude" />
                </div>
            </section>

            <div className="benefits-wrapper">
                <section className="benefits">
                    <div className="benefit">
                        <div className="icon-container">
                            <Truck size={24} />
                        </div>
                        <strong>Frete Grátis</strong>
                        <span>Em compras acima de R$249,90</span>
                    </div>

                    <div className="benefit">
                        <div className="icon-container">
                            <Tag size={24} />
                        </div>
                        <strong>10% Off</strong>
                        <span>Na sua primeira compra</span>
                    </div>

                    <div className="benefit">
                        <div className="icon-container">
                            <RefreshCcw size={24} />
                        </div>
                        <strong>Cashback</strong>
                        <span>Ganhe 5% na próxima compra</span>
                    </div>

                    <div className="benefit">
                        <div className="icon-container">
                            <CreditCard size={24} />
                        </div>
                        <strong>Parcelamento</strong>
                        <span>Até 5x sem juros no cartão</span>
                    </div>
                </section>
            </div>
        </>
    );
}
