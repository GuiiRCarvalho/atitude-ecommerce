import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Topbar from '@/components/Topbar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { CartProvider } from '@/context/CartContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
    title: 'Atitude – Streetwear',
    description: 'Mundando a forma de ver o mundo, streetwear com atitude.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR">
            <body className={inter.className}>
                <CartProvider>
                    <Topbar />
                    <Header />
                    <main>{children}</main>
                    <Footer />
                    <CartDrawer />
                </CartProvider>
            </body>
        </html>
    );
}
