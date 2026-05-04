import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import { WishlistProvider } from '@/lib/wishlist-context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ 
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'], 
  variable: '--font-sans' 
});

export const metadata: Metadata = {
  title: 'Chashme Wallah | Premium Eyewear',
  description: 'Premium eyewear that frames your vision with style and comfort.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans bg-white min-h-screen flex flex-col font-normal text-slate-900" suppressHydrationWarning>
        <CartProvider>
          <WishlistProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
