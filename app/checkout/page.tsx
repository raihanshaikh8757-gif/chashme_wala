'use client';
import { useCart } from '@/lib/cart-context';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ShieldCheck, MapPin, CreditCard, Banknote } from 'lucide-react';
import Image from 'next/image';

export default function CheckoutPage() {
  const { cart, cartTotal, cartItemCount, isMounted } = useCart();
  const router = useRouter();
  
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Success
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    if (isMounted && cartItemCount === 0 && step !== 3) {
      router.push('/cart');
    }
  }, [isMounted, cartItemCount, step, router]);

  if (!isMounted || (cartItemCount === 0 && step !== 3)) {
    return null;
  }

  const lensCost = 500;
  let totalLensesCost = 0;
  cart.forEach(item => {
    if (item.selectedPower && item.type !== 'Sunglasses') {
       totalLensesCost += lensCost * item.quantity;
    }
  });

  const finalSubtotal = cartTotal;
  const taxes = Math.round((finalSubtotal + totalLensesCost) * 0.18);
  const finalTotal = finalSubtotal + totalLensesCost + taxes;

  const handlePlaceOrder = (e: any) => {
    e.preventDefault();
    setOrderId(Math.floor(Math.random() * 1000000).toString());
    setStep(3);
    // In real app, empty cart here
  };

  if (step === 3) {
    return (
      <div className="container py-20 px-4 flex flex-col items-center justify-center text-center max-w-lg mx-auto">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 shadow-sm">
           <Check size={48} />
        </div>
        <h1 className="text-3xl font-extrabold text-[#0A1F44] mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">Thank you for choosing Chashme Wallah. Your order #{orderId} has been placed successfully and will be delivered within 3-5 working days.</p>
        <button 
          onClick={() => {
            router.push('/');
            // window.location.reload() to clear cart state
            setTimeout(() => window.location.reload(), 100);
          }}
          className="bg-[#0A1F44] text-white px-8 py-3 rounded-full font-bold hover:bg-[#FFC107] hover:text-[#0A1F44] transition-colors"
        >
          CONTINUE SHOPPING
        </button>
      </div>
    );
  }

  return (
    <div className="container px-4 md:px-6 max-w-6xl mx-auto py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Main Content */}
        <div className="flex-1">
           {/* Steps Indicator */}
           <div className="flex items-center mb-10 border-b border-gray-200 pb-4">
              <div className={`flex items-center gap-2 font-bold ${step >= 1 ? 'text-[#0A1F44]' : 'text-gray-400'}`}>
                 <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-[#0A1F44] text-white' : 'bg-gray-200'}`}>1</span>
                 Address
              </div>
              <div className="w-12 h-px bg-gray-300 mx-4"></div>
              <div className={`flex items-center gap-2 font-bold ${step >= 2 ? 'text-[#0A1F44]' : 'text-gray-400'}`}>
                 <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-[#0A1F44] text-white' : 'bg-gray-200'}`}>2</span>
                 Payment
              </div>
           </div>

           {step === 1 ? (
             <form onSubmit={() => setStep(2)} className="space-y-6">
                <h2 className="text-2xl font-bold font-poppins text-[#0A1F44] mb-6 flex items-center gap-2"><MapPin size={24} className="text-[#FFC107]" /> Shipping Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">First Name</label>
                    <input required type="text" className="w-full p-3 border border-gray-300 rounded-xl focus:border-[#0A1F44] outline-none transition-colors" placeholder="John" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Last Name</label>
                    <input required type="text" className="w-full p-3 border border-gray-300 rounded-xl focus:border-[#0A1F44] outline-none transition-colors" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                  <input required type="email" className="w-full p-3 border border-gray-300 rounded-xl focus:border-[#0A1F44] outline-none transition-colors" placeholder="john@example.com" />
                </div>

                <div className="space-y-1">
                   <label className="text-xs font-bold text-gray-500 uppercase">Delivery Address</label>
                   <textarea required rows={3} className="w-full p-3 border border-gray-300 rounded-xl focus:border-[#0A1F44] outline-none transition-colors resize-none" placeholder="123 Appt, Street details..."></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">City</label>
                    <input required type="text" className="w-full p-3 border border-gray-300 rounded-xl focus:border-[#0A1F44] outline-none transition-colors" placeholder="Mumbai" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Pincode</label>
                    <input required type="text" className="w-full p-3 border border-gray-300 rounded-xl focus:border-[#0A1F44] outline-none transition-colors" placeholder="400001" />
                  </div>
                </div>

                <button type="submit" className="w-full md:w-auto mt-6 bg-[#0A1F44] text-white px-10 py-4 rounded-full font-bold hover:bg-black transition-colors self-end float-right">
                  CONTINUE TO PAYMENT
                </button>
             </form>
           ) : (
             <form onSubmit={handlePlaceOrder} className="space-y-8">
               <h2 className="text-2xl font-bold font-poppins text-[#0A1F44] mb-2 flex items-center gap-2">Payment Method</h2>
               <p className="text-sm text-gray-500 mb-6 flex items-center gap-1"><ShieldCheck size={16} className="text-green-600" /> Secure encrypted checkout</p>
               
               <div className="space-y-4">
                  <label className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-[#0A1F44] bg-[#0A1F44]/5' : 'border-gray-200'}`}>
                    <input type="radio" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} className="mt-1 w-4 h-4 accent-[#0A1F44]" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                         <CreditCard size={20} className={paymentMethod === 'card' ? 'text-[#0A1F44]' : 'text-gray-400'} />
                         <span className={`font-bold ${paymentMethod === 'card' ? 'text-[#0A1F44]' : 'text-gray-700'}`}>Credit / Debit Card</span>
                      </div>
                      <p className="text-xs text-gray-500">Pay securely with your Visa, Mastercard, or RuPay card.</p>

                      {paymentMethod === 'card' && (
                        <div className="mt-4 space-y-3">
                          <input required type="text" placeholder="Card Number" className="w-full p-3 border border-gray-300 rounded-lg text-sm" />
                          <div className="flex gap-3">
                            <input required type="text" placeholder="MM/YY" className="w-1/2 p-3 border border-gray-300 rounded-lg text-sm" />
                            <input required type="text" placeholder="CVV" className="w-1/2 p-3 border border-gray-300 rounded-lg text-sm" />
                          </div>
                        </div>
                      )}
                    </div>
                  </label>

                  <label className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-colors ${paymentMethod === 'upi' ? 'border-[#0A1F44] bg-[#0A1F44]/5' : 'border-gray-200'}`}>
                    <input type="radio" value="upi" checked={paymentMethod === 'upi'} onChange={(e) => setPaymentMethod(e.target.value)} className="mt-1 w-4 h-4 accent-[#0A1F44]" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                         <div className="font-bold text-sm bg-gray-200 px-1.5 py-0.5 rounded text-[#0A1F44]">UPI</div>
                         <span className={`font-bold ${paymentMethod === 'upi' ? 'text-[#0A1F44]' : 'text-gray-700'}`}>UPI Options</span>
                      </div>
                      <p className="text-xs text-gray-500">GPay, PhonePe, Paytm supported.</p>
                      {paymentMethod === 'upi' && (
                        <div className="mt-4">
                          <input required type="text" placeholder="Enter UPI ID (e.g. john@okicici)" className="w-full p-3 border border-gray-300 rounded-lg text-sm" />
                        </div>
                      )}
                    </div>
                  </label>

                  <label className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-[#0A1F44] bg-[#0A1F44]/5' : 'border-gray-200'}`}>
                    <input type="radio" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} className="mt-1 w-4 h-4 accent-[#0A1F44]" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                         <Banknote size={20} className={paymentMethod === 'cod' ? 'text-[#0A1F44]' : 'text-gray-400'} />
                         <span className={`font-bold ${paymentMethod === 'cod' ? 'text-[#0A1F44]' : 'text-gray-700'}`}>Cash on Delivery</span>
                      </div>
                      <p className="text-xs text-gray-500">Pay when your order arrives.</p>
                    </div>
                  </label>
               </div>

               <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                  <button type="button" onClick={() => setStep(1)} className="text-[#0A1F44] font-bold text-sm hover:underline">
                    Back to Address
                  </button>
                  <button type="submit" className="bg-[#FFC107] text-[#0A1F44] border-2 border-[#FFC107] px-10 py-4 rounded-full font-bold hover:bg-[#FFC107]/90 transition-colors shadow-md shadow-[#FFC107]/20 flex items-center gap-2">
                    PAY ₹{finalTotal} & PLACE ORDER
                  </button>
               </div>
             </form>
           )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-[400px]">
           <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200 shadow-sm sticky top-28">
              <h3 className="font-bold text-[#0A1F44] mb-4 text-lg">Order Items</h3>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide border-b border-gray-200 pb-4">
                 {cart.map((item, idx) => (
                   <div key={idx} className="flex gap-4">
                      <div className="w-16 h-16 bg-white rounded-xl border border-gray-100 flex-shrink-0 relative overflow-hidden flex items-center justify-center p-1">
                         <div className="absolute top-0 right-0 bg-gray-800 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-bl-lg z-10">{item.quantity}</div>
                         <Image src={item.image} alt={item.name} fill className="object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                         <h4 className="text-sm font-bold text-[#0A1F44] line-clamp-1">{item.name}</h4>
                         <p className="text-[10px] text-gray-500 mt-0.5">{item.color} {item.selectedPower ? `| Power: ${item.selectedPower}` : ''}</p>
                         <p className="text-sm font-bold text-[#0A1F44] mt-1">₹{item.price * item.quantity}</p>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="space-y-3 text-sm text-gray-600 mb-6">
                 <div className="flex justify-between">
                   <span>Subtotal</span>
                   <span className="font-medium text-[#0A1F44]">₹{finalSubtotal}</span>
                 </div>
                 {totalLensesCost > 0 && (
                   <div className="flex justify-between">
                     <span>Lenses Extr</span>
                     <span className="font-medium text-[#0A1F44]">₹{totalLensesCost}</span>
                   </div>
                 )}
                 <div className="flex justify-between">
                   <span>GST (18%)</span>
                   <span className="font-medium text-[#0A1F44]">₹{taxes}</span>
                 </div>
              </div>

              <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                 <span className="font-bold text-lg text-[#0A1F44]">Total You Pay</span>
                 <span className="font-bold text-2xl text-[#0A1F44]">₹{finalTotal}</span>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
