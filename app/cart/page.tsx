'use client';
import { useCart } from '@/lib/cart-context';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, isMounted } = useCart();

  if (!isMounted) return null;

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={48} className="text-slate-300" />
        </div>
        <h1 className="text-2xl font-bold text-[#0A1F44] mb-2">Your cart is empty</h1>
        <p className="text-slate-500 mb-8 text-center max-w-md">Looks like you haven't added anything to your cart yet. Explore our premium collection and find your perfect pair.</p>
        <Link href="/products" className="accent-bg text-[#0A1F44] px-8 py-3 rounded-full font-bold hover:bg-yellow-500 transition-all shadow-lg">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-[#0A1F44] mb-8 uppercase tracking-tight">Your Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {cart.map((item) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={item.id} 
                className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4 md:gap-6 items-center"
              >
                <div className="relative w-24 h-24 md:w-32 md:h-32 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                  <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-900 md:text-lg truncate">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="text-slate-500 text-xs md:text-sm mb-4">{item.category} | {item.color}</p>
                  
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-3 border border-slate-200 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-slate-50 rounded text-slate-500"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-bold text-sm min-w-[20px] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-slate-50 rounded text-slate-500"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-400 text-xs line-through">₹{item.originalPrice ? item.originalPrice * item.quantity : (item.price * 1.5) * item.quantity}</div>
                      <div className="text-[#0A1F44] font-black text-lg">₹{item.price * item.quantity}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="bg-[#0A1F44] text-white p-6 md:p-8 rounded-3xl shadow-xl sticky top-24">
              <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Order Summary</h2>
              
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shipping</span>
                  <span className="text-green-400 font-medium uppercase text-xs tracking-widest">Free</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tax (GST)</span>
                  <span className="text-white font-medium">₹0</span>
                </div>
                <div className="h-px bg-white/10 my-2"></div>
                <div className="flex justify-between text-lg md:text-xl font-black">
                  <span>Total</span>
                  <span className="text-[#FFC107]">₹{cartTotal}</span>
                </div>
              </div>

              <Link href="/checkout" className="w-full accent-bg text-[#0A1F44] py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-yellow-500 transition-all shadow-lg group">
                Proceed to Checkout <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="mt-6 flex items-center justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                <div className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold">VISA</div>
                <div className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold">UPI</div>
                <div className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold">COD</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
