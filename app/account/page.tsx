'use client';
import { useState } from 'react';
import Link from 'next/link';
import { PackageSearch, Heart, UserCircle, MapPin, ChevronRight, Settings, LogOut } from 'lucide-react';
import Image from 'next/image';
import { products } from '@/lib/data';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="container px-4 md:px-6 max-w-6xl mx-auto py-10 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Menu */}
        <div className="w-full md:w-64 flex-shrink-0">
           <div className="bg-gray-50 rounded-3xl p-6 mb-4 flex items-center gap-4">
              <div className="w-14 h-14 bg-[#0A1F44] text-white rounded-full flex items-center justify-center text-xl font-bold">
                JD
              </div>
              <div>
                <h3 className="font-bold text-[#0A1F44]">John Doe</h3>
                <p className="text-xs text-gray-500">Gold Member ✦</p>
              </div>
           </div>

           <nav className="flex flex-row overflow-x-auto md:flex-col gap-2 pb-4 md:pb-0 scrollbar-hide">
             <button onClick={() => setActiveTab('orders')} className={`flex-shrink-0 flex items-center justify-between p-4 rounded-xl font-medium transition-colors ${activeTab === 'orders' ? 'bg-[#0A1F44] text-white' : 'hover:bg-gray-50 text-gray-700'}`}>
               <span className="flex items-center gap-3"><PackageSearch size={18} /> My Orders</span>
               <ChevronRight size={16} className={`hidden md:block ${activeTab === 'orders' ? 'opacity-100' : 'opacity-0'}`} />
             </button>
             <button onClick={() => setActiveTab('wishlist')} className={`flex-shrink-0 flex items-center justify-between p-4 rounded-xl font-medium transition-colors ${activeTab === 'wishlist' ? 'bg-[#0A1F44] text-white' : 'hover:bg-gray-50 text-gray-700'}`}>
               <span className="flex items-center gap-3"><Heart size={18} /> Wishlist</span>
               <ChevronRight size={16} className={`hidden md:block ${activeTab === 'wishlist' ? 'opacity-100' : 'opacity-0'}`} />
             </button>
             <button onClick={() => setActiveTab('profile')} className={`flex-shrink-0 flex items-center justify-between p-4 rounded-xl font-medium transition-colors ${activeTab === 'profile' ? 'bg-[#0A1F44] text-white' : 'hover:bg-gray-50 text-gray-700'}`}>
               <span className="flex items-center gap-3"><UserCircle size={18} /> Profile Details</span>
               <ChevronRight size={16} className={`hidden md:block ${activeTab === 'profile' ? 'opacity-100' : 'opacity-0'}`} />
             </button>
             <button onClick={() => setActiveTab('addresses')} className={`flex-shrink-0 flex items-center justify-between p-4 rounded-xl font-medium transition-colors ${activeTab === 'addresses' ? 'bg-[#0A1F44] text-white' : 'hover:bg-gray-50 text-gray-700'}`}>
               <span className="flex items-center gap-3"><MapPin size={18} /> Saved Addresses</span>
               <ChevronRight size={16} className={`hidden md:block ${activeTab === 'addresses' ? 'opacity-100' : 'opacity-0'}`} />
             </button>
             <button className={`flex-shrink-0 mt-4 text-red-500 flex items-center gap-3 p-4 rounded-xl font-medium hover:bg-red-50 transition-colors`}>
               <LogOut size={18} /> Logout
             </button>
           </nav>
        </div>

        {/* Dynamic Content */}
        <div className="flex-1">
           {activeTab === 'orders' && (
             <div>
                <h2 className="text-2xl font-bold font-poppins text-[#0A1F44] mb-6">Recent Orders</h2>
                <div className="space-y-6">
                   <div className="border border-gray-200 rounded-3xl overflow-hidden p-6 hover:shadow-md transition-shadow">
                     <div className="flex flex-wrap items-center justify-between border-b border-gray-100 pb-4 mb-4 gap-4 text-sm">
                        <div className="space-y-1">
                          <p className="text-gray-500">Order ID</p>
                          <p className="font-bold text-[#0A1F44]">#CW-98314</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-500">Placed On</p>
                          <p className="font-bold text-[#0A1F44]">12 May, 2026</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-500">Total Status</p>
                          <p className="font-bold text-amber-500 flex items-center gap-1">Shipped</p>
                        </div>
                        <div className="space-y-1 text-right">
                          <p className="text-gray-500">Total</p>
                          <p className="font-bold text-[#0A1F44]">₹2,499</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gray-50 rounded-2xl p-2 flex items-center justify-center border border-gray-100 shrink-0">
                           <Image src={products[1].image} alt="product" width={80} height={80} className="object-contain " referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#0A1F44]">{products[1].name}</h4>
                          <p className="text-xs text-gray-500">Blue | Rectangle | With Prescription Lenses</p>
                        </div>
                     </div>
                     <div className="flex gap-3 justify-end mt-4">
                        <button className="px-4 py-2 text-sm font-bold border border-gray-300 rounded-full hover:bg-gray-50">Track Package</button>
                        <button className="px-4 py-2 text-sm font-bold border border-[#0A1F44] text-[#0A1F44] rounded-full hover:bg-gray-50">Buy Again</button>
                     </div>
                   </div>

                   <div className="border border-gray-200 rounded-3xl overflow-hidden p-6 opacity-70">
                     <div className="flex flex-wrap items-center justify-between border-b border-gray-100 pb-4 mb-4 gap-4 text-sm">
                        <div className="space-y-1">
                          <p className="text-gray-500">Order ID</p>
                          <p className="font-bold text-[#0A1F44]">#CW-76812</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-500">Placed On</p>
                          <p className="font-bold text-[#0A1F44]">01 Jan, 2026</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-500">Total Status</p>
                          <p className="font-bold text-green-600 flex items-center gap-1">Delivered</p>
                        </div>
                        <div className="space-y-1 text-right">
                          <p className="text-gray-500">Total</p>
                          <p className="font-bold text-[#0A1F44]">₹1,500</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gray-50 rounded-2xl p-2 flex items-center justify-center border border-gray-100 shrink-0">
                           <Image src={products[2].image} alt="product" width={80} height={80} className="object-contain " referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#0A1F44]">{products[2].name}</h4>
                          <p className="text-xs text-gray-500">Gold | Aviator</p>
                        </div>
                     </div>
                   </div>
                </div>
             </div>
           )}

           {activeTab === 'wishlist' && (
             <div>
               <h2 className="text-2xl font-bold font-poppins text-[#0A1F44] mb-6">My Wishlist</h2>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                 {products.slice(0,3).map(product => (
                   <div key={product.id} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden relative">
                     <button className="absolute top-2 right-2 p-1.5 bg-white shadow-sm rounded-full text-red-500 z-10 z-10 hover:bg-red-50">
                       <Heart size={16} fill="currentColor" />
                     </button>
                     <Link href={`/product/${product.id}`} className="block">
                       <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center border-b border-gray-100">
                          <Image src={product.image} alt={product.name} width={150} height={100} className="object-contain group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                       </div>
                       <div className="p-4">
                         <h3 className="font-bold text-[#0A1F44] text-sm md:text-base line-clamp-1">{product.name}</h3>
                         <div className="font-bold mt-1">₹{product.price}</div>
                       </div>
                     </Link>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {activeTab === 'profile' && (
             <div className="max-w-xl">
               <h2 className="text-2xl font-bold font-poppins text-[#0A1F44] mb-6">Profile Details</h2>
               <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">First Name</label>
                      <input type="text" defaultValue="John" className="w-full p-3 border border-gray-300 rounded-xl outline-none" disabled />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">Last Name</label>
                      <input type="text" defaultValue="Doe" className="w-full p-3 border border-gray-300 rounded-xl outline-none" disabled />
                    </div>
                  </div>
                  <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                      <input type="email" defaultValue="john.doe@example.com" className="w-full p-3 border border-gray-300 rounded-xl outline-none" disabled />
                  </div>
                  <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                      <input type="tel" defaultValue="+91-7905417816" className="w-full p-3 border border-gray-300 rounded-xl outline-none" />
                  </div>
                  <button className="bg-[#0A1F44] text-white px-8 py-3 rounded-full font-bold hover:bg-[#FFC107] hover:text-[#0A1F44] transition-colors mt-4">
                    Save Changes
                  </button>
               </div>
             </div>
           )}

           {activeTab === 'addresses' && (
             <div>
               <h2 className="text-2xl font-bold font-poppins text-[#0A1F44] mb-6">Saved Addresses</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-2 border-[#0A1F44] rounded-2xl p-5 relative">
                     <div className="absolute top-4 right-4 bg-gray-100 text-xs font-bold px-2 py-1 rounded">DEFAULT</div>
                     <h4 className="font-bold text-[#0A1F44] mb-1">John Doe</h4>
                     <p className="text-sm text-gray-600 mb-4 line-clamp-2">Saripura Alam Nagar Rajajipuram Lucknow</p>
                     <p className="text-sm font-medium mb-4">Ph: +91 79054 17816</p>
                     <div className="flex gap-4 border-t border-gray-100 pt-3">
                       <button className="text-sm font-bold text-[#0A1F44] hover:underline">Edit</button>
                       <button className="text-sm font-bold text-red-500 hover:underline">Remove</button>
                     </div>
                  </div>

                  <button className="border-2 border-dashed border-gray-300 rounded-2xl p-5 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-400 transition-colors min-h-[160px]">
                     <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                       <span className="text-lg">+</span>
                     </div>
                     <span className="font-bold">Add New Address</span>
                  </button>
               </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
