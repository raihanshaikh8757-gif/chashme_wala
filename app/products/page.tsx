'use client';
import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products, shapes } from '@/lib/data';
import { Star, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function ProductListingContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');
  const initialShape = searchParams.get('shape');

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : []);
  const [selectedShapes, setSelectedShapes] = useState<string[]>(initialShape ? [initialShape] : []);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('popularity');

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }
    if (selectedShapes.length > 0) {
      result = result.filter(p => selectedShapes.includes(p.shape));
    }
    if (selectedGenders.length > 0) {
      // Check if product gender is exactly in selected, or 'Unisex' fits Men/Women mostly but handle exact for demo
       result = result.filter(p => selectedGenders.includes(p.gender));
    }

    // Sort
    if (sortOption === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortOption === 'popularity') {
      result = [...result].sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [selectedCategories, selectedShapes, selectedGenders, sortOption]);

  const toggleFilter = (setFn: any, value: string) => {
    setFn((prev: string[]) => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  return (
    <div className="container px-4 md:px-6 max-w-7xl mx-auto py-8">
      {/* Breadcrumb & Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-poppins font-bold text-[#0A1F44]">
          Eyewear Collection
        </h1>
        <p className="text-gray-500 mt-2">Showing {filteredProducts.length} products</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between border-b border-t py-3">
           <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-2 font-medium">
             <SlidersHorizontal size={18} /> Filters
           </button>
           <select 
             value={sortOption} 
             onChange={(e) => setSortOption(e.target.value)}
             className="bg-transparent font-medium border-none outline-none text-right"
            >
             <option value="popularity">Popularity</option>
             <option value="price-low">Price: Low to High</option>
             <option value="price-high">Price: High to Low</option>
           </select>
        </div>

        {/* Sidebar Filters */}
        <aside 
          className={`w-full lg:w-64 flex-shrink-0 flex-col gap-6 lg:flex border-b lg:border-b-0 pb-6 lg:pb-0 ${isFilterOpen ? 'flex' : 'hidden'}`}
        >
              <div className="hidden lg:block mb-8">
                 <h3 className="font-bold mb-4">Sort By</h3>
                 <select 
                   value={sortOption} 
                   onChange={(e) => setSortOption(e.target.value)}
                   className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-[#0A1F44]"
                  >
                   <option value="popularity">Popularity</option>
                   <option value="price-low">Price: Low to High</option>
                   <option value="price-high">Price: High to Low</option>
                 </select>
              </div>

              <div>
                <h3 className="font-bold mb-4 border-b pb-2">Category</h3>
                <div className="flex flex-col gap-3">
                  {['Eyeglasses', 'Sunglasses', 'Contact Lenses', 'Kids', 'Computer Glasses'].map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedCategories.includes(cat) ? 'bg-[#0A1F44] border-[#0A1F44]' : 'border-gray-300 group-hover:border-[#0A1F44]'}`}>
                        {selectedCategories.includes(cat) && <Check size={14} className="text-white" />}
                      </div>
                      <input type="checkbox" className="hidden" checked={selectedCategories.includes(cat)} onChange={() => toggleFilter(setSelectedCategories, cat)} />
                      <span className="text-gray-700">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4 border-b pb-2">Shape</h3>
                <div className="flex flex-col gap-3">
                  {shapes.map(s => (
                    <label key={s.name} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedShapes.includes(s.name) ? 'bg-[#0A1F44] border-[#0A1F44]' : 'border-gray-300 group-hover:border-[#0A1F44]'}`}>
                        {selectedShapes.includes(s.name) && <Check size={14} className="text-white" />}
                      </div>
                      <input type="checkbox" className="hidden" checked={selectedShapes.includes(s.name)} onChange={() => toggleFilter(setSelectedShapes, s.name)} />
                      <span className="text-gray-700">{s.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4 border-b pb-2">Gender</h3>
                <div className="flex flex-col gap-3">
                  {['Men', 'Women', 'Unisex', 'Kids'].map(g => (
                    <label key={g} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedGenders.includes(g) ? 'bg-[#0A1F44] border-[#0A1F44]' : 'border-gray-300 group-hover:border-[#0A1F44]'}`}>
                        {selectedGenders.includes(g) && <Check size={14} className="text-white" />}
                      </div>
                      <input type="checkbox" className="hidden" checked={selectedGenders.includes(g)} onChange={() => toggleFilter(setSelectedGenders, g)} />
                      <span className="text-gray-700">{g}</span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center">
              <span className="text-4xl mb-4">👓</span>
              <h3 className="text-2xl font-bold mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters to find what you&apos;re looking for.</p>
              <button 
                onClick={() => { setSelectedCategories([]); setSelectedShapes([]); setSelectedGenders([]); }}
                className="mt-6 border border-[#0A1F44] text-[#0A1F44] px-6 py-2 rounded-full font-medium hover:bg-[#0A1F44] hover:text-white transition-colors"
               >
                 Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map(product => (
                <Link key={product.id} href={`/product/${product.id}`} className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 relative flex flex-col h-full">
                  {product.discount && (
                    <span className="absolute top-2 left-2 bg-[#FFC107] text-[#0A1F44] text-[9px] md:text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-10 shadow-sm border border-[#0A1F44]/10">
                      {product.discount}
                    </span>
                  )}
                  <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-3 md:p-4 flex flex-col flex-1">
                    <h3 className="font-poppins font-medium text-[#0A1F44] text-xs md:text-sm line-clamp-2 md:line-clamp-1 group-hover:text-amber-500 transition-colors mb-auto">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-[10px] md:text-xs mb-2 mt-1 hidden md:block">{product.color} • {product.shape}</p>
                    <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-3 mt-1">
                      <div className="flex items-center bg-gray-50 px-1 py-0.5 rounded text-[9px] md:text-[10px] font-medium text-gray-700">
                        {product.rating} <Star size={8} className="text-[#FFC107] ml-0.5 inline fill-[#FFC107]" />
                      </div>
                      <span className="text-gray-400 text-[9px] md:text-[10px]">({product.reviews})</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-[#0A1F44] text-sm md:text-lg">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-gray-400 text-[10px] md:text-sm line-through">₹{product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container py-20 text-center text-gray-500">Loading products...</div>}>
      <ProductListingContent />
    </Suspense>
  );
}
