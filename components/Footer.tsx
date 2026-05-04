'use client';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone, ArrowRight, Play, Apple } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0A1F44] text-white/80 pt-16 pb-8 border-t border-white/10 mt-auto w-full">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        {/* Top Section: Newsletter & App Setup */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-16 pb-12 border-b border-white/10">
          <div className="flex-1 max-w-xl">
            <h3 className="text-2xl font-bold text-white mb-3">Follow us on Instagram</h3>
            <p className="text-sm text-white/60 mb-6">Stay updated on new collections, exclusive sales, and eyewear tips.</p>
            <div className="flex">
              <a 
                href="https://instagram.com/ChashmeWallah" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#FFC107] text-[#0A1F44] font-bold px-8 py-4 rounded-full text-sm hover:bg-yellow-400 transition-colors flex items-center gap-3 shadow-lg shadow-black/20"
              >
                <Instagram size={20} /> @ChashmeWallah
              </a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 transition-all rounded-xl px-6 py-3 w-48 justify-center">
              <Play size={24} className="text-white fill-white" />
              <div className="text-left flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-white/70">Get it on</span>
                <span className="text-sm font-bold text-white">Google Play</span>
              </div>
            </button>
            <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 transition-all rounded-xl px-6 py-3 w-48 justify-center">
              <Apple size={24} className="text-white fill-white" />
              <div className="text-left flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-white/70">Download on the</span>
                <span className="text-sm font-bold text-white">App Store</span>
              </div>
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          {/* Brand */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex flex-col">
               <span className="font-extrabold text-3xl tracking-tighter text-white">
                CHASHME<span className="text-[#FFC107]">WALA</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm text-white/60">
              Your trusted eyewear destination for stylish and affordable glasses. Clear vision, better life.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FFC107] hover:text-[#0A1F44] hover:border-[#FFC107] transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FFC107] hover:text-[#0A1F44] hover:border-[#FFC107] transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FFC107] hover:text-[#0A1F44] hover:border-[#FFC107] transition-all">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <h4 className="text-white font-bold text-base uppercase tracking-wider mb-2">Quick Links</h4>
            <Link href="/" className="hover:text-[#FFC107] transition-colors text-sm text-white/70">Home</Link>
            <Link href="/products?category=Eyeglasses" className="hover:text-[#FFC107] transition-colors text-sm text-white/70">Eyeglasses</Link>
            <Link href="/products?category=Sunglasses" className="hover:text-[#FFC107] transition-colors text-sm text-white/70">Sunglasses</Link>
            <Link href="/#offers" className="hover:text-[#FFC107] transition-colors text-sm text-white/70">Offers</Link>
            <Link href="/#stores" className="hover:text-[#FFC107] transition-colors text-sm text-white/70">Store Locator</Link>
          </div>

          {/* Links 2 */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <h4 className="text-white font-bold text-base uppercase tracking-wider mb-2">Customer Support</h4>
            <Link href="#" className="hover:text-[#FFC107] transition-colors text-sm text-white/70">Help Center</Link>
            <Link href="#" className="hover:text-[#FFC107] transition-colors text-sm text-white/70">FAQ</Link>
            <Link href="#" className="hover:text-[#FFC107] transition-colors text-sm text-white/70">Return Policy</Link>
            <Link href="#" className="hover:text-[#FFC107] transition-colors text-sm text-white/70">Track Order</Link>
            <Link href="#" className="hover:text-[#FFC107] transition-colors text-sm text-white/70">Eye Test Online</Link>
          </div>

          {/* Links 3 */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <h4 className="text-white font-bold text-base uppercase tracking-wider mb-2">Contact</h4>
            <div className="flex items-start gap-4 text-white/70 hover:text-white transition-colors cursor-pointer group">
              <MapPin size={20} className="shrink-0 text-white/40 group-hover:text-[#FFC107] mt-0.5 transition-colors" />
              <span className="text-sm leading-relaxed">123 Vision Street, Optic Avenue<br />Mumbai, MH 400001</span>
            </div>
            <div className="flex items-center gap-4 text-white/70 hover:text-white transition-colors cursor-pointer group mt-2">
              <Phone size={20} className="shrink-0 text-white/40 group-hover:text-[#FFC107] transition-colors" />
              <span className="text-sm">1800-111-2222</span>
            </div>
            <div className="flex items-center gap-4 text-white/70 hover:text-white transition-colors cursor-pointer group mt-2">
              <Mail size={20} className="shrink-0 text-white/40 group-hover:text-[#FFC107] transition-colors" />
              <span className="text-sm">support@chashmewala.com</span>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-white/10 flex flex-col-reverse md:flex-row items-center justify-between gap-6">
          <p className="text-white/40 text-xs tracking-wider">
            &copy; {new Date().getFullYear()} CHASHME WALA. All Rights Reserved. | Made by <a href="https://edunexservices.in/" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFC107] transition-colors underline decoration-white/20">edunexservices.in</a>
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-xs font-medium tracking-wider uppercase">
            <Link href="#" className="text-white/50 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-white/50 hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
