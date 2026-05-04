'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { products, categories, shapes } from '@/lib/data';
import { ArrowRight, Star, Truck, ShieldCheck, Search, Activity, Heart, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';

// Common Product Card Component
function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 relative">
      <button 
        onClick={() => isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur shadow-sm hover:scale-110 transition-all"
      >
        <Heart size={18} className={isWishlisted ? "fill-red-500 text-red-500" : "text-slate-400"} />
      </button>

      <Link href={`/product/${product.id}`} className="block">
        {product.discount && (
          <span className="absolute top-3 left-3 bg-[#FFC107] text-[#0A1F44] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-10">
            {product.discount}
          </span>
        )}
        <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/50 to-white/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 z-10 skew-x-12" />
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-poppins font-medium text-[#0A1F44] text-sm md:text-base line-clamp-1 group-hover:text-amber-500 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-[11px] md:text-xs mb-2 mt-1">{product.color} | {product.shape}</p>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-50 px-1.5 py-0.5 rounded text-[10px] md:text-xs font-medium text-gray-700">
              {product.rating} <Star size={10} className="text-[#FFC107] ml-1 inline fill-[#FFC107]" />
            </div>
            <span className="text-gray-400 text-[10px]">({product.reviews})</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#0A1F44] text-lg">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-400 text-sm line-through">₹{product.originalPrice}</span>
            )}
          </div>
          <button 
            onClick={() => addToCart(product)}
            className="p-2 rounded-full border border-slate-200 hover:bg-[#0A1F44] hover:text-white transition-colors"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { title: "Premium Eyeglasses Collection", cta: "Shop Now", image: "https://www.tbdeyewear.com/cdn/shop/files/Linea_Bottega_TBD_Eyewear.jpg" },
    { title: "Trending Sunglasses", cta: "Explore Now", image: "https://cdn1.visiofactory.com/modules/visiofactorycategoriespush/img/top/807.jpg" },
    { title: "Free Eye Checkup Available", cta: "Book Now", image: "https://www.tbdeyewear.com/cdn/shop/collections/image_tbd.jpg" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    if (touchStart - e.changedTouches[0].clientX > 50) {
      // swipe left
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
    if (touchStart - e.changedTouches[0].clientX < -50) {
      // swipe right
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  return (
    <div className="flex flex-col overflow-x-hidden bg-white">
      
      {/* 2. HERO SECTION */}
      <section 
        className="relative h-[400px] md:h-[500px] lg:h-[600px] shrink-0 bg-[#0A1F44] overflow-hidden flex items-center w-full touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${slide.image}')` }}></div>
            <div className="absolute inset-0 bg-black/50"></div>
            
            <div className="relative px-6 md:px-12 z-10 w-full max-w-4xl text-center flex flex-col items-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={index === currentSlide ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="flex flex-col items-center"
                >
                  <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 md:mb-6 tracking-tight drop-shadow-lg px-4">
                    {slide.title}
                  </h1>
                  <Link 
                    href="/products" 
                    className="accent-bg hover:bg-yellow-500 text-[#0A1F44] font-bold py-3.5 px-8 md:px-12 rounded-full text-sm md:text-lg shadow-xl hover:shadow-2xl transition-all w-4/5 sm:w-auto mx-auto mt-2"
                  >
                    {slide.cta}
                  </Link>
                </motion.div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <div className="absolute bottom-6 md:bottom-10 left-0 right-0 flex justify-center gap-3 z-30">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentSlide ? 'w-8 bg-[#FFC107]' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 3. TOP CATEGORIES (SCROLLABLE ROW) */}
      <section className="bg-slate-50 py-8 px-4 md:px-12 shrink-0 border-b border-slate-200">
        <div className="flex justify-between items-center max-w-screen-2xl mx-auto gap-4 flex-col lg:flex-row">
          <div className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar py-2 w-full lg:w-auto pb-4 lg:pb-0 snap-x justify-start lg:justify-center">
            {categories.map((category, idx) => (
              <Link 
                key={idx} 
                href={category.link}
                className="flex flex-col items-center gap-2 md:gap-3 group cursor-pointer shrink-0 snap-center"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-md shadow-black/5 border-2 border-transparent group-hover:border-yellow-400 flex items-center justify-center overflow-hidden transition-all p-1 group-hover:-translate-y-1">
                  <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center relative bg-slate-50">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <span className="text-[11px] md:text-xs font-bold text-[#0A1F44] uppercase tracking-wide">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="w-full lg:w-[320px] navy-bg p-4 md:p-5 rounded-2xl flex items-center gap-4 text-white shrink-0 shadow-lg mt-4 lg:mt-0">
            <div className="bg-white/20 p-2.5 rounded-xl text-xl backdrop-blur-sm">🛡️</div>
            <div>
              <div className="text-sm font-bold tracking-wide">FREE EYE CHECKUP</div>
              <div className="text-[11px] opacity-80 mt-0.5">At 1500+ Store Locations</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURE BANNER */}
      <section className="bg-[#0A1F44] text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[url('https://cdn1.visiofactory.com/modules/visiofactorycategoriespush/img/top/807.jpg')] bg-cover bg-center"></div>
        <div className="container px-4 md:px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4">FREE LENS REPLACEMENT</h2>
            <p className="text-[#FFC107] text-xl md:text-2xl font-medium tracking-wide">
              Any Frame | Any Power | Any Reason
            </p>
          </div>
          <Link href="#" className="bg-white text-[#0A1F44] px-8 py-4 rounded-full font-bold hover:bg-[#FFC107] transition-colors whitespace-nowrap self-start md:self-center">
            Find Nearby Store
          </Link>
        </div>
      </section>

      {/* 5. SHAPE SELECTOR SECTION */}
      <section className="container px-4 md:px-6 max-w-7xl mx-auto text-center bg-gray-50 py-16 rounded-3xl">
        <h2 className="text-3xl font-poppins font-bold text-[#0A1F44] mb-2">Find Your Perfect Frame</h2>
        <p className="text-gray-500 mb-10">Browse by the shape that fits your face perfectly</p>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {shapes.map((shape, idx) => (
            <Link key={idx} href={`/products?shape=${shape.name}`} className="group flex flex-col items-center gap-4">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full shadow-sm flex items-center justify-center p-6 border-2 border-transparent group-hover:border-yellow-400 group-hover:shadow-md transition-all">
                <div className="relative w-full h-full opacity-70 group-hover:opacity-100 transition-opacity overflow-hidden rounded-full">
                 <Image src={shape.image} alt={shape.name} fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              <span className="font-medium text-gray-700 group-hover:text-[#0A1F44]">{shape.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. TRENDING PRODUCTS */}
      <section className="p-4 md:p-8 flex-1 flex flex-col gap-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end">
          <h2 className="text-2xl font-extrabold text-[#0A1F44]">TRENDING <span className="text-slate-400 font-light">COLLECTION</span></h2>
          <Link href="/products" className="text-xs font-bold text-blue-600 underline">
            VIEW ALL
          </Link>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.filter(p => p.isTrending).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}

          <div className="bg-slate-100 rounded-2xl p-6 flex flex-col justify-center gap-4 col-span-2 lg:col-span-1">
            <div className="text-sm font-bold uppercase tracking-widest text-slate-500 text-center">Frame Shapes</div>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-center uppercase">
              {shapes.slice(0, 4).map((shape, i) => (
                <Link key={i} href={`/products?shape=${shape.name}`} className="bg-white p-2 rounded-lg border border-slate-200 hover:border-yellow-400">
                  {shape.name}
                </Link>
              ))}
            </div>
            <Link href="/products" className="w-full accent-bg text-xs font-black py-3 rounded-lg text-center mt-2 text-[#0A1F44]">TRY ON VIRTUAL</Link>
          </div>
        </div>
      </section>

      {/* 7. PREMIUM COLLECTION GRID */}
      <section className="bg-gray-900 text-white py-20 mt-10">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4">The Premium Collection</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Sophisticated designs crafted with lightweight titanium and premium acetate.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 md:h-[600px]">
            {/* Large Card 1 */}
            <Link href="/products" className="md:col-span-6 lg:col-span-5 relative rounded-3xl overflow-hidden group h-[300px] md:h-full block">
              <Image src="https://www.tbdeyewear.com/cdn/shop/files/Linea_Bottega_TBD_Eyewear.jpg" alt="Premium" fill className="object-cover group-hover:scale-105 transition duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <span className="text-[#FFC107] text-sm font-bold uppercase tracking-widest mb-2">Titanium Series</span>
                <h3 className="text-3xl font-poppins font-bold mb-4">Zero Gravity Frames</h3>
                <span className="inline-flex items-center gap-2 text-sm font-medium hover:underline flex-none self-start">
                  Explore Collection <ArrowRight size={16} />
                </span>
              </div>
            </Link>

            {/* Right side consisting of smaller cards */}
            <div className="md:col-span-6 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 grid-rows-2 gap-4 md:gap-6 h-auto md:h-full">
              {/* Top Row: 1 wide card or 2 small cards */}
              <Link href="/products" className="sm:col-span-2 relative rounded-3xl overflow-hidden group h-[200px] md:h-full block">
                 <Image src="https://cdn1.visiofactory.com/modules/visiofactorycategoriespush/img/top/807.jpg" alt="Premium" fill className="object-cover group-hover:scale-105 transition duration-700" referrerPolicy="no-referrer" />
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex flex-col justify-center items-center text-center p-6">
                    <h3 className="text-2xl font-poppins font-bold text-white mb-2">Italian Acetate</h3>
                    <span className="bg-white/20 backdrop-blur border border-white/30 px-4 py-2 rounded-full text-xs uppercase tracking-wide">Shop Now</span>
                 </div>
              </Link>
              
              <Link href="/products" className="relative rounded-3xl overflow-hidden group h-[200px] md:h-full block">
                <Image src="https://www.tbdeyewear.com/cdn/shop/collections/image_tbd.jpg" alt="Premium" fill className="object-cover group-hover:scale-105 transition duration-700" referrerPolicy="no-referrer" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-xl font-poppins font-bold text-white mb-1">Vogue Luxe</h3>
                 </div>
              </Link>

              <Link href="/products" className="relative rounded-3xl overflow-hidden group h-[200px] md:h-full block">
                <div className="absolute inset-0 bg-[#0A1F44] flex flex-col justify-center items-center text-center p-8 border border-white/10 group-hover:border-[#FFC107]">
                   <ShieldCheck size={48} className="text-[#FFC107] mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
                   <h3 className="text-xl font-poppins font-bold mb-2">Lifetime Warranty</h3>
                   <p className="text-xs text-gray-400">On all premium purchases</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SERVICES SECTION */}
      <section className="container px-4 md:px-6 max-w-7xl mx-auto py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#0A1F44] mb-3">Our Premium Services</h2>
          <p className="text-gray-500">Experience eyewear shopping like never before</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="relative rounded-3xl overflow-hidden shadow-lg group h-[320px] bg-slate-900 border border-slate-200">
            <Image src="https://www.tbdeyewear.com/cdn/shop/files/Linea_Bottega_TBD_Eyewear.jpg" alt="Free Eye Checkup" fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-40" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-[#0A1F44]/90 via-[#0A1F44]/40 to-transparent">
              <h3 className="text-2xl font-bold text-white mb-2">Free Eye Checkup</h3>
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">Visit any of our 1500+ stores for a comprehensive eye test by certified optometrists.</p>
              <button className="text-[#FFC107] font-bold uppercase tracking-wide text-xs self-start flex items-center gap-2 group-hover:gap-3 transition-all">
                Book Appointment <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-lg group h-[320px] bg-slate-900 border border-slate-200">
            <Image src="https://cdn1.visiofactory.com/modules/visiofactorycategoriespush/img/top/807.jpg" alt="Home Trial" fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-40" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-[#0A1F44]/90 via-[#0A1F44]/40 to-transparent">
              <h3 className="text-2xl font-bold text-white mb-2">Home Trial</h3>
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">Select up to 5 frames online and try them at home for free. Pay only for what you love.</p>
              <button className="text-[#FFC107] font-bold uppercase tracking-wide text-xs self-start flex items-center gap-2 group-hover:gap-3 transition-all">
                Try at Home <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-lg group h-[320px] bg-slate-900 border border-slate-200">
            <Image src="https://www.tbdeyewear.com/cdn/shop/collections/image_tbd.jpg" alt="Online 3D Try-On" fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-40" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-[#0A1F44]/90 via-[#0A1F44]/40 to-transparent">
              <h3 className="text-2xl font-bold text-white mb-2">Online 3D Try-On</h3>
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">Use your phone or webcam to literally see how the glasses look on your face using AR.</p>
              <button className="text-[#FFC107] font-bold uppercase tracking-wide text-xs self-start flex items-center gap-2 group-hover:gap-3 transition-all">
                Try Now <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. OFFERS SECTION */}
      <section id="offers" className="container px-4 md:px-6 max-w-7xl mx-auto mb-16 mt-8">
        <div className="rounded-3xl overflow-hidden relative shadow-2xl h-[400px] md:h-[450px]">
          <Image src="https://www.tbdeyewear.com/cdn/shop/files/Linea_Bottega_TBD_Eyewear.jpg" alt="Offers" fill className="object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F44]/95 via-[#0A1F44]/80 to-transparent flex items-center">
            <div className="px-8 md:px-16 w-full md:w-2/3 lg:w-1/2">
              <span className="inline-block bg-[#FFC107] text-[#0A1F44] text-xs font-black px-4 py-1.5 rounded-sm uppercase tracking-widest mb-6">Gold Membership</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-black text-white mb-6 leading-tight drop-shadow-md">BUY 1 GET 1 FREE</h2>
              <p className="text-white/90 text-lg md:text-xl font-medium mb-10 leading-relaxed">On the entire catalog! Share with family or friends. Gold membership starting at just ₹600.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#FFC107] text-[#0A1F44] px-8 py-4 rounded-full font-bold hover:bg-yellow-400 transition-colors shadow-lg shadow-black/20 text-center">
                  Join Gold Membership
                </button>
                <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#0A1F44] transition-colors text-center">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
