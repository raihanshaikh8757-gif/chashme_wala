'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, Github, Chrome } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 bg-slate-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl shadow-black/5 overflow-hidden flex max-w-4xl w-full"
      >
        {/* Left Side: Illustration/Brand */}
        <div className="hidden md:flex flex-col justify-between w-1/2 navy-bg p-12 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://cdn1.visiofactory.com/modules/visiofactorycategoriespush/img/top/807.jpg')] bg-cover bg-center"></div>
           
           <div className="relative z-10">
              <Link href="/" className="flex items-center gap-2 mb-12">
                <div className="relative w-10 h-10 overflow-hidden rounded-full border border-white/20">
                  <Image src="/logo.jpeg" alt="Logo" fill className="object-cover" />
                </div>
                <span className="font-extrabold text-xl tracking-tighter">CHASHME<span className="text-[#FFC107]">WALA</span></span>
              </Link>
              
              <h2 className="text-4xl font-black mb-6 leading-tight">Frames for every vision.</h2>
              <p className="text-white/60 leading-relaxed max-w-sm">Join the community of 1M+ stylish people who chose Chashmewala for their premium eyewear needs.</p>
           </div>
           
           <div className="relative z-10 pt-12 flex gap-4 text-xs font-bold text-white/40 uppercase tracking-widest">
              <span>Support</span>
              <span>Privacy</span>
              <span>Terms</span>
           </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="mb-10">
            <h1 className="text-3xl font-black text-[#0A1F44] mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-slate-500 font-medium">Please enter your details to login</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-[#0A1F44]">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-slate-400" size={20} />
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 text-sm focus:bg-white focus:border-[#0A1F44] outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black uppercase tracking-widest text-[#0A1F44]">Password</label>
                <Link href="#" className="text-xs font-bold text-[#FFC107] hover:underline">Forgot Password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-slate-400" size={20} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-12 text-sm focus:bg-white focus:border-[#0A1F44] outline-none transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded accent-[#0A1F44]" />
              <label htmlFor="remember" className="text-xs font-bold text-slate-600 cursor-pointer">Remember for 30 days</label>
            </div>

            <button className="w-full navy-bg text-white h-12 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg">
              Sign In
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-slate-500">
            Don't have an account? <Link href="#" className="text-[#FFC107] font-black hover:underline">Sign up for free</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
