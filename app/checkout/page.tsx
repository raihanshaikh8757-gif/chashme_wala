'use client';
import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Truck, CreditCard, ChevronRight, CheckCircle2, MapPin, Phone, User } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, cartTotal, isMounted } = useCart();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isMounted) return null;

  const handleNextStep = () => {
    if (step === 2) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep(3);
      }, 2500);
    } else {
      setStep(step + 1);
    }
  };

  if (step === 3) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl max-w-lg w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-3xl font-black text-[#0A1F44] mb-4">Order Placed Successfully!</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Thank you for shopping with Chashme Wala. Your order <strong>#CW-89241</strong> has been placed and is being processed.
          </p>
          <div className="bg-slate-50 p-6 rounded-2xl mb-8 text-left">
             <div className="flex justify-between text-sm mb-2 text-slate-600">
                <span>Items:</span>
                <span className="font-bold text-[#0A1F44]">{cart.length}</span>
             </div>
             <div className="flex justify-between text-sm mb-2 text-slate-600">
                <span>Delivery Date:</span>
                <span className="font-bold text-[#0A1F44]">By Friday, May 8th</span>
             </div>
             <div className="flex justify-between text-lg font-black text-[#0A1F44] mt-4 pt-4 border-t border-slate-200">
                <span>Total Paid:</span>
                <span>₹{cartTotal}</span>
             </div>
          </div>
          <Link href="/" className="inline-block accent-bg text-[#0A1F44] px-10 py-4 rounded-full font-black hover:bg-yellow-500 transition-all shadow-lg">
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/cart" className="text-slate-400 hover:text-[#0A1F44] font-bold text-sm uppercase">Cart</Link>
          <ChevronRight size={16} className="text-slate-300" />
          <span className={`text-sm font-black uppercase ${step === 1 ? 'text-[#0A1F44]' : 'text-slate-400'}`}>Shipping</span>
          <ChevronRight size={16} className="text-slate-300" />
          <span className={`text-sm font-black uppercase ${step === 2 ? 'text-[#0A1F44]' : 'text-slate-400'}`}>Payment</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Side */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div 
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100"
                >
                  <h2 className="text-2xl font-black text-[#0A1F44] mb-8 flex items-center gap-3">
                    <MapPin className="text-[#FFC107]" /> Shipping Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-[#0A1F44]">Full Name</label>
                       <input type="text" placeholder="John Doe" className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm focus:bg-white focus:border-[#0A1F44] outline-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-[#0A1F44]">Phone Number</label>
                       <input type="text" placeholder="+91 79054 17816" className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm focus:bg-white focus:border-[#0A1F44] outline-none" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-[#0A1F44]">Flat / House No. / Building</label>
                       <input type="text" placeholder="House 123, Street Name" className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm focus:bg-white focus:border-[#0A1F44] outline-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-[#0A1F44]">City</label>
                       <input type="text" placeholder="Lucknow" className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm focus:bg-white focus:border-[#0A1F44] outline-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-[#0A1F44]">Pincode</label>
                       <input type="text" placeholder="400001" className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm focus:bg-white focus:border-[#0A1F44] outline-none" />
                    </div>
                  </div>
                  <button 
                    onClick={handleNextStep}
                    className="mt-10 w-full md:w-auto navy-bg text-white px-12 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    Continue to Payment <ChevronRight size={18} />
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100"
                >
                  <h2 className="text-2xl font-black text-[#0A1F44] mb-8 flex items-center gap-3">
                    <CreditCard className="text-[#FFC107]" /> Payment Method
                  </h2>
                  
                  <div className="space-y-4 mb-8">
                     <label className="flex items-center gap-4 p-4 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all border-l-4 border-l-[#FFC107] bg-slate-50/50">
                        <input type="radio" name="payment" defaultChecked className="w-5 h-5 accent-[#0A1F44]" />
                        <div className="flex-1">
                           <div className="font-bold text-[#0A1F44]">Cash on Delivery</div>
                           <div className="text-xs text-slate-500 italic">Pay when you receive the product</div>
                        </div>
                        <div className="text-2xl opacity-50">💵</div>
                     </label>
                     <label className="flex items-center gap-4 p-4 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all">
                        <input type="radio" name="payment" className="w-5 h-5 accent-[#0A1F44]" />
                        <div className="flex-1">
                           <div className="font-bold text-[#0A1F44]">UPI / PhonePe / GPay</div>
                           <div className="text-xs text-slate-500">Scan QR or pay via UPI ID</div>
                        </div>
                        <div className="text-2xl opacity-50">📱</div>
                     </label>
                     <label className="flex items-center gap-4 p-4 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all">
                        <input type="radio" name="payment" className="w-5 h-5 accent-[#0A1F44]" />
                        <div className="flex-1">
                           <div className="font-bold text-[#0A1F44]">Credit / Debit Card</div>
                           <div className="text-xs text-slate-500">All major cards accepted</div>
                        </div>
                        <div className="text-2xl opacity-50">💳</div>
                     </label>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-300 mb-10">
                     <div className="flex items-start gap-3">
                        <ShieldCheck className="text-green-600 mt-1" size={20} />
                        <div>
                           <div className="font-bold text-sm text-[#0A1F44]">Safe & Secure Payments</div>
                           <div className="text-xs text-slate-500 leading-relaxed">Your data is protected with 256-bit SSL encryption. We never store your card details.</div>
                        </div>
                     </div>
                  </div>

                  <button 
                    onClick={handleNextStep}
                    disabled={isProcessing}
                    className="w-full md:w-auto accent-bg text-[#0A1F44] px-12 py-4 rounded-xl font-black hover:bg-yellow-500 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[#0A1F44] border-t-transparent rounded-full animate-spin"></div>
                        Processing Payment...
                      </>
                    ) : (
                      <>Place Order & Pay ₹{cartTotal} <ChevronRight size={18} /></>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Summary Side */}
          <div className="lg:col-span-4">
             <div className="bg-[#0A1F44] text-white p-6 rounded-3xl sticky top-24">
                <h3 className="font-bold text-lg mb-6 border-b border-white/10 pb-4">Order Summary</h3>
                <div className="flex flex-col gap-4 mb-6 max-h-60 overflow-y-auto pr-2 no-scrollbar">
                   {cart.map(item => (
                     <div key={item.id} className="flex gap-3">
                        <div className="relative w-12 h-12 bg-white rounded-lg p-1 overflow-hidden shrink-0">
                           <Image src={item.image} alt={item.name} fill className="object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="text-xs font-bold truncate">{item.name}</div>
                           <div className="text-[10px] text-white/50">Qty: {item.quantity}</div>
                        </div>
                        <div className="text-xs font-bold text-[#FFC107]">₹{item.price * item.quantity}</div>
                     </div>
                   ))}
                </div>
                <div className="space-y-3 pt-6 border-t border-white/10">
                   <div className="flex justify-between text-xs text-white/60">
                      <span>Subtotal</span>
                      <span>₹{cartTotal}</span>
                   </div>
                   <div className="flex justify-between text-xs text-white/60">
                      <span>Shipping</span>
                      <span className="text-green-400 uppercase font-bold">Free</span>
                   </div>
                   <div className="flex justify-between text-lg font-black pt-2">
                      <span>Total Amount</span>
                      <span className="text-[#FFC107]">₹{cartTotal}</span>
                   </div>
                </div>
                
                <div className="mt-8 flex items-center gap-3 p-4 bg-white/5 rounded-2xl">
                   <Truck size={24} className="text-[#FFC107]" />
                   <div className="text-[10px] leading-relaxed text-white/60">
                      Standard delivery within <span className="text-white font-bold">3-5 business days</span>.
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
