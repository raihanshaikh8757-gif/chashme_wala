'use client';
import { useWishlist } from '@/lib/wishlist-context';
import { useCart } from '@/lib/cart-context';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, isMounted } = useWishlist();
  const { addToCart } = useCart();

  if (!isMounted) return null;

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
          <Heart size={48} />
        </div>
        <h1 className="text-2xl font-bold text-[#0A1F44] mb-2">Your wishlist is empty</h1>
        <p className="text-slate-500 mb-8 text-center max-w-md">Save your favorite styles here to find them easily later.</p>
        <Link href="/products" className="accent-bg text-[#0A1F44] px-8 py-3 rounded-full font-bold hover:bg-yellow-500 transition-all shadow-lg">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-[#0A1F44] mb-8 uppercase tracking-tight flex items-center gap-3">
          <Heart className="fill-red-500 text-red-500" /> My Wishlist
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              key={product.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group hover:shadow-md transition-all"
            >
              <div className="relative aspect-video bg-slate-50 overflow-hidden">
                <Image src={product.image} alt={product.name} fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                <button 
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 bg-white/80 backdrop-blur text-red-500 p-2 rounded-full shadow-sm hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              <div className="p-5">
                <h3 className="font-bold text-[#0A1F44] mb-1">{product.name}</h3>
                <p className="text-slate-500 text-xs mb-4">{product.category} | {product.color}</p>
                
                <div className="flex items-center justify-between">
                  <div className="text-[#0A1F44] font-black text-xl">₹{product.price}</div>
                  <button 
                    onClick={() => {
                      addToCart(product);
                      removeFromWishlist(product.id);
                    }}
                    className="accent-bg text-[#0A1F44] p-2.5 rounded-xl hover:bg-yellow-500 transition-all shadow-sm flex items-center gap-2 text-sm font-bold"
                  >
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
