'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

export default function Header() {
  const { cartItemCount } = useCart();
  const { wishlistItemCount } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Eyeglasses', href: '/products?category=Eyeglasses' },
    { label: 'Sunglasses', href: '/products?category=Sunglasses' },
    { label: 'Contact Lenses', href: '/products?category=Contact Lenses' },
    { label: 'Kids', href: '/products?category=Kids' },
    { label: 'Offers', href: '/#offers', highlight: true },
    { label: 'Stores', href: '/#stores' },
  ];

  return (
    <>
      {/* Top Thin Strip */}
      <div className="bg-slate-100 text-[#0A1F44] text-[10px] md:text-xs text-center py-1.5 font-semibold tracking-wider uppercase border-b border-gray-200">
        Free Delivery | 7 Days Return | COD Available
      </div>

      <header className={`sticky top-0 z-50 bg-white transition-all duration-300 w-full ${isScrolled ? 'shadow-md border-b-transparent' : 'shadow-sm border-b border-gray-200'}`}>
        {/* Main Header Container */}
        <div className="h-20 px-4 md:px-8 max-w-screen-2xl mx-auto flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Mobile Left: Hamburger */}
          <button 
            className="lg:hidden p-2 -ml-2 text-slate-800 hover:bg-slate-100 rounded-full transition"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mx-auto lg:mx-0">
            <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full shadow-md border border-slate-200">
              <Image src="/logo.jpeg" alt="Chashmewala Logo" fill className="object-cover" />
            </div>
            <span className="text-[#0A1F44] font-extrabold text-xl md:text-3xl tracking-tighter shrink-0">
              CHASHME<span className="accent-text">WALA</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-6 text-slate-800 text-xs font-bold uppercase tracking-wide">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`hover:text-[#FFC107] transition-colors ${link.highlight ? 'text-[#FFC107]' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Center Search (Hidden on Mobile/Tablet Portrait) */}
          <div className="hidden xl:block flex-1 max-w-md mx-6">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search frames, sunglasses..." 
                className="w-full h-11 rounded-full px-5 text-sm bg-slate-50 text-slate-900 border border-slate-200 focus:bg-white focus:border-[#0A1F44] focus:ring-1 focus:ring-[#0A1F44] outline-none transition-all placeholder:text-slate-400"
              />
              <div className="absolute right-4 top-3 text-slate-400 group-focus-within:text-[#0A1F44] transition-colors">
                <Search size={20} />
              </div>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3 sm:gap-5 text-slate-800 shrink-0">
            <button className="hover:text-[#FFC107] transition xl:hidden p-2 rounded-full hover:bg-slate-50">
               <Search size={22} />
            </button>
            <Link href="/wishlist" className="relative hover:text-[#FFC107] transition hidden sm:block p-2 rounded-full hover:bg-slate-50">
               <Heart size={22} />
               {wishlistItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#FFC107] text-[#0A1F44] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-white">
                  {wishlistItemCount}
                </span>
              )}
            </Link>
            <Link href="/login" className="hover:text-[#FFC107] transition p-2 rounded-full hover:bg-slate-50 hidden sm:block">
              <User size={22} />
            </Link>
            <Link href="/cart" className="relative hover:text-[#FFC107] transition p-2 rounded-full hover:bg-slate-50">
              <ShoppingCart size={22} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#FFC107] text-[#0A1F44] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-white">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-[#0A1F44]/50 z-[60] lg:hidden backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '-100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '-100%' }} 
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-[70] lg:hidden shadow-2xl flex flex-col overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 overflow-hidden rounded-full shadow-md border border-slate-200">
                    <Image src="/logo.jpeg" alt="Chashmewala Logo" fill className="object-cover" />
                  </div>
                  <span className="font-extrabold text-2xl tracking-tighter text-[#0A1F44]">
                    CHASHME<span className="accent-text">WALA</span>
                  </span>
                </div>
                <button 
                  className="p-2 text-slate-500 hover:text-slate-900 bg-white rounded-full shadow-sm transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="relative mb-6">
                  <input 
                    type="text" 
                    placeholder="Search frames..." 
                    className="w-full h-12 rounded-xl px-4 text-sm bg-slate-50 border border-slate-200 outline-none"
                  />
                  <Search size={18} className="absolute right-4 top-4 text-slate-400" />
                </div>

                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`font-bold text-sm uppercase py-4 border-b border-slate-50 flex justify-between items-center ${
                        link.highlight ? 'text-[#FFC107]' : 'text-slate-800'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="mt-auto bg-slate-50 p-6 flex flex-col gap-4">
                <Link 
                   href="/login"
                   className="flex items-center gap-3 text-slate-700 font-bold text-sm uppercase"
                   onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User size={18} className="text-[#0A1F44]" /> My Account
                </Link>
                <Link 
                   href="/wishlist"
                   className="flex items-center gap-3 text-slate-700 font-bold text-sm uppercase"
                   onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Heart size={18} className="text-[#0A1F44]" /> Wishlist
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
