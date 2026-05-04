'use client';
import { useState, use, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { products } from '@/lib/data';
import { useCart } from '@/lib/cart-context';
import { Star, Shield, Truck, RotateCcw, Check, Heart, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const { addToCart } = useCart();
  const product = products.find(p => p.id === id);
  
  const [activeImage, setActiveImage] = useState(0);
  const [selectedPower, setSelectedPower] = useState('0.00');
  const [isLensIncluded, setIsLensIncluded] = useState(true);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (!product) {
      router.push('/products');
    }
  }, [product, router]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, 1, isLensIncluded ? selectedPower : undefined);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, 1, isLensIncluded ? selectedPower : undefined);
    router.push('/checkout');
  };

  return (
    <div className="container px-4 md:px-6 max-w-7xl mx-auto py-8">
       {/* Breadcrumb */}
       <div className="flex items-center gap-2 text-xs text-gray-500 mb-8 uppercase tracking-wide">
         <Link href="/" className="hover:text-[#0A1F44]">Home</Link>
         <span>/</span>
         <Link href={`/products?category=${product.category}`} className="hover:text-[#0A1F44]">{product.category}</Link>
         <span>/</span>
         <span className="text-[#0A1F44] font-medium">{product.name}</span>
       </div>

       <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">
          {/* Left: Image Gallery */}
          <div className="w-full lg:w-3/5 flex flex-col-reverse md:flex-row gap-4">
             {/* Thumbnail list */}
             <div className="flex md:flex-col gap-4 overflow-x-auto md:w-24 flex-shrink-0 hide-scrollbar pb-2 md:pb-0 snap-x">
               {product.images.map((img, idx) => (
                 <button 
                   key={idx} 
                   onClick={() => setActiveImage(idx)}
                   className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 flex-shrink-0 snap-start transition-all ${activeImage === idx ? 'border-[#0A1F44] opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                  >
                   <Image src={img} alt={`${product.name} ${idx}`} fill className="object-cover bg-gray-50" referrerPolicy="no-referrer" />
                 </button>
               ))}
             </div>
             {/* Main Image */}
             <div className="relative w-full aspect-[4/3] md:aspect-square bg-gray-50 rounded-3xl overflow-hidden group border border-gray-100">
                <Image 
                  src={product.images[activeImage]} 
                  alt={product.name} 
                  fill 
                  className="object-cover" 
                  referrerPolicy="no-referrer" 
                />
                
                {/* 360 View Badge Placeholder */}
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur border border-gray-200 px-3 py-1.5 rounded-full text-xs font-bold text-[#0A1F44] shadow-sm flex items-center gap-1 cursor-pointer hover:bg-white transition-colors">
                  <RotateCcw size={14} /> 360° View
                </div>

                {/* 3D Try On Action - Floating Button */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#0A1F44]/90 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl shadow-black/10 flex items-center gap-2 cursor-pointer border border-[#FFC107]/20 hover:scale-105 transition-transform">
                   <span>Try it on in 3D</span>
                </div>
             </div>
          </div>

          {/* Right: Product Info */}
          <div className="w-full lg:w-2/5 flex flex-col pt-2">
             <div className="flex justify-between items-start mb-2">
               <h1 className="text-2xl md:text-4xl font-poppins font-bold text-[#0A1F44] leading-tight">
                 {product.name}
               </h1>
               <button className="text-gray-400 hover:text-red-500 transition-colors p-2 border border-gray-200 rounded-full hover:border-red-500 bg-white">
                 <Heart size={20} />
               </button>
             </div>

             <div className="flex items-center gap-4 mb-5">
               <span className="text-gray-500 text-sm">Size: Medium</span>
               <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
               <span className="text-gray-500 text-sm">{product.color}</span>
               <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
               <span className="text-gray-500 text-sm">{product.shape}</span>
             </div>

             <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center bg-[#0A1F44] text-white px-2 py-1 rounded text-sm font-bold gap-1 shadow-sm">
                   {product.rating} <Star size={12} className="fill-[#FFC107] text-[#FFC107]" />
                </div>
                <button className="text-sm text-gray-500 underline underline-offset-4 hover:text-[#0A1F44]">
                  Read {product.reviews} Reviews
                </button>
             </div>

             <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col gap-2 relative overflow-hidden">
               {product.discount && (
                  <div className="absolute top-0 left-0 bg-[#FFC107] text-[#0A1F44] text-[10px] uppercase font-bold px-3 py-1 rounded-br-xl">
                    {product.discount}
                  </div>
               )}
               <div className="flex items-end gap-3 mt-4">
                  <span className="text-3xl font-bold text-[#0A1F44]">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through mb-1">₹{product.originalPrice}</span>
                  )}
               </div>
               <p className="text-xs text-gray-500">Includes taxes. Lenses cost extra based on power.</p>
             </div>

             {/* Prescription Selection logic (Simplified for UI demo) */}
             {product.type !== 'Sunglasses' && (
             <div className="mb-8 border border-gray-200 rounded-2xl p-5 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="font-bold text-[#0A1F44] text-lg">Select Lenses</h3>
                 <HelpCircle size={16} className="text-gray-400" />
               </div>
               <div className="flex items-center gap-4 mb-4">
                 <label className="flex items-center gap-2 cursor-pointer">
                   <input type="radio" checked={!isLensIncluded} onChange={() => setIsLensIncluded(false)} className="accent-[#0A1F44] w-4 h-4" />
                   <span className="text-sm font-medium">Frame Only</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer">
                   <input type="radio" checked={isLensIncluded} onChange={() => setIsLensIncluded(true)} className="accent-[#0A1F44] w-4 h-4" />
                   <span className="text-sm font-medium">With Prescription Lenses (+₹500 for demo)</span>
                 </label>
               </div>
               
               {isLensIncluded && (
                 <div className="mt-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex flex-col gap-3">
                    <label className="text-xs font-bold text-[#0A1F44] uppercase tracking-wide">Enter Eye Power (Demo)</label>
                    <select 
                      value={selectedPower} 
                      onChange={(e) => setSelectedPower(e.target.value)}
                      className="w-full p-3 rounded-lg border border-gray-300 outline-none focus:border-[#0A1F44] font-medium"
                    >
                      <option value="0.00">Zero Power (0.00)</option>
                      <option value="-0.50">-0.50</option>
                      <option value="-1.00">-1.00</option>
                      <option value="-1.50">-1.50</option>
                      <option value="+0.50">+0.50</option>
                      <option value="+1.00">+1.00</option>
                    </select>
                 </div>
               )}
             </div>
             )}

             {/* Desktop Actions */}
             <div className="hidden md:flex flex-col gap-3 mb-10">
               <button 
                 onClick={handleAddToCart}
                 disabled={isAdded}
                 className="w-full bg-white text-[#0A1F44] border-2 border-[#0A1F44] py-4 rounded-full font-bold text-lg hover:bg-gray-50 flex flex-col items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed h-[62px]"
                >
                 {isAdded ? (
                    <span className="flex items-center gap-2 text-green-600"><Check size={20} /> Added to Cart</span>
                 ) : (
                    "ADD TO CART"
                 )}
               </button>
               <button 
                onClick={handleBuyNow}
                className="w-full bg-[#FFC107] text-[#0A1F44] border-2 border-[#FFC107] py-4 rounded-full font-bold text-lg hover:bg-[#FFC107]/90 shadow-md transition-all shadow-[#FFC107]/20"
               >
                 BUY NOW
               </button>
             </div>

             {/* Mobile Sticky Actions */}
             <div className="md:hidden fixed bottom-6 left-4 right-4 z-50 flex gap-3 shadow-2xl">
               <button 
                 onClick={handleAddToCart}
                 disabled={isAdded}
                 className="flex-1 bg-white text-[#0A1F44] border-2 border-[#0A1F44] py-3.5 rounded-full font-bold text-sm bg-white/95 backdrop-blur shadow-[0_-10px_20px_rgba(0,0,0,0.05)] disabled:opacity-50 flex items-center justify-center"
                >
                 {isAdded ? <Check size={18} className="text-green-600" /> : "ADD TO CART"}
               </button>
               <button 
                 onClick={handleBuyNow}
                 className="flex-1 bg-[#FFC107] text-[#0A1F44] py-3.5 rounded-full font-bold text-sm shadow-[0_-10px_20px_rgba(0,0,0,0.05)]"
                >
                 BUY NOW
               </button>
             </div>

             {/* Trust Badges */}
             <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-6">
                <div className="flex flex-col items-center text-center gap-2">
                   <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-[#0A1F44]">
                      <Truck size={18} />
                   </div>
                   <span className="text-[10px] uppercase font-bold text-gray-500">Free<br/>Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                   <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-[#0A1F44]">
                      <RotateCcw size={18} />
                   </div>
                   <span className="text-[10px] uppercase font-bold text-gray-500">14 Days<br/>Returns</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                   <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-[#0A1F44]">
                      <Shield size={18} />
                   </div>
                   <span className="text-[10px] uppercase font-bold text-gray-500">1 Year<br/>Warranty</span>
                </div>
             </div>

          </div>
       </div>

       {/* Reviews Section Placeholder */}
       <div className="mt-20 pt-10 border-t border-gray-200">
         <h2 className="text-2xl font-poppins font-bold text-[#0A1F44] mb-8">Customer Reviews</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {[1, 2, 3].map(i => (
             <div key={i} className="bg-gray-50 p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} className="fill-[#FFC107] text-[#FFC107]" />)}
                </div>
                <h4 className="font-bold mb-2">Great fit and look premium</h4>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">Absolutely love these glasses. They fit perfectly and the lens quality is top-notch. I&apos;ve bought from this brand before and they never disappoint. The AR try-on was very helpful.</p>
                <div className="text-xs font-medium text-gray-400">Verified Buyer • 2 weeks ago</div>
             </div>
           ))}
         </div>
       </div>

    </div>
  );
}
