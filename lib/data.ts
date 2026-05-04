export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  category: string;
  type: string; // Eyeglasses, Sunglasses, etc.
  shape: string; // Round, Rectangle, Cat Eye, etc.
  gender: string; // Unisex, Men, Women, Kids
  color: string;
  isPremium?: boolean;
  isTrending?: boolean;
};

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Black Round Eyeglasses',
    price: 999,
    originalPrice: 1999,
    discount: '50% OFF',
    rating: 4.8,
    reviews: 1245,
    image: 'https://cdn1.visiofactory.com/140611-thickbox/ray-ban-wayfarer-puffer-asap-rocky-rb4940bp-6865-87-47-23-black-with-strass.jpg',
    images: [
      'https://cdn1.visiofactory.com/140611-thickbox/ray-ban-wayfarer-puffer-asap-rocky-rb4940bp-6865-87-47-23-black-with-strass.jpg',
    ],
    category: 'Eyeglasses',
    type: 'Eyeglasses',
    shape: 'Round',
    gender: 'Unisex',
    color: 'Black',
    isTrending: true,
  },
  {
    id: 'p2',
    name: 'Blue Rectangle Premium Frame',
    price: 2499,
    originalPrice: 4000,
    discount: '37% OFF',
    rating: 4.9,
    reviews: 890,
    image: 'https://cdn1.visiofactory.com/141345-thickbox/ray-ban-wayfarer-puffer-asap-rocky-rb4940bp-6867-87-47-23-blue-with-strass-pave.jpg',
    images: [
      'https://cdn1.visiofactory.com/141345-thickbox/ray-ban-wayfarer-puffer-asap-rocky-rb4940bp-6867-87-47-23-blue-with-strass-pave.jpg',
    ],
    category: 'Eyeglasses',
    type: 'Eyeglasses',
    shape: 'Rectangle',
    gender: 'Men',
    color: 'Blue',
    isPremium: true,
    isTrending: true,
  },
  {
    id: 'p3',
    name: 'Gold Aviator Sunglasses',
    price: 1500,
    originalPrice: 2500,
    discount: '40% OFF',
    rating: 4.6,
    reviews: 530,
    image: 'https://cdn1.visiofactory.com/140622-thickbox/chanel-ch4292-c134sb-56-16-gold.jpg',
    images: [
      'https://cdn1.visiofactory.com/140622-thickbox/chanel-ch4292-c134sb-56-16-gold.jpg',
    ],
    category: 'Sunglasses',
    type: 'Sunglasses',
    shape: 'Aviator',
    gender: 'Men',
    color: 'Gold',
    isTrending: true,
  },
  {
    id: 'p4',
    name: 'Pink Kids Round Glasses',
    price: 799,
    originalPrice: 1200,
    discount: '33% OFF',
    rating: 4.5,
    reviews: 320,
    image: 'https://cdn1.visiofactory.com/140584-thickbox/ray-ban-wayfarer-puffer-asap-rocky-rb4940b-686187-47-23-red-with-strass.jpg',
    images: [
      'https://cdn1.visiofactory.com/140584-thickbox/ray-ban-wayfarer-puffer-asap-rocky-rb4940b-686187-47-23-red-with-strass.jpg'
    ],
    category: 'Kids',
    type: 'Kids',
    shape: 'Round',
    gender: 'Kids',
    color: 'Pink',
  },
  {
    id: 'p5',
    name: 'Transparent Computer Glasses',
    price: 1199,
    originalPrice: 1800,
    discount: '33% OFF',
    rating: 4.7,
    reviews: 642,
    image: 'https://cdn1.visiofactory.com/140860-thickbox/ray-ban-wayfarer-puffer-asap-rocky-rb4940bp-6866-87-47-23-white-with-strass-pave.jpg',
    images: [
      'https://cdn1.visiofactory.com/140860-thickbox/ray-ban-wayfarer-puffer-asap-rocky-rb4940bp-6866-87-47-23-white-with-strass-pave.jpg'
    ],
    category: 'Computer Glasses',
    type: 'Computer Glasses',
    shape: 'Geometric',
    gender: 'Unisex',
    color: 'Transparent',
    isTrending: true,
  },
  {
    id: 'p6',
    name: 'Hazel Contact Lenses',
    price: 499,
    originalPrice: 800,
    discount: 'Buy 1 Get 1',
    rating: 4.9,
    reviews: 2100,
    image: 'https://cdn1.visiofactory.com/140593-thickbox/ray-ban-wayfarer-puffer-asap-rocky-rb4940b-6863-87-47-23-white-with-strass.jpg',
    images: [
      'https://cdn1.visiofactory.com/140593-thickbox/ray-ban-wayfarer-puffer-asap-rocky-rb4940b-6863-87-47-23-white-with-strass.jpg'
    ],
    category: 'Contact Lenses',
    type: 'Contact Lenses',
    shape: 'Round',
    gender: 'Unisex',
    color: 'Hazel',
    isTrending: true,
  },
  {
    id: 'p7',
    name: 'Premium Silver Aviators',
    price: 3999,
    originalPrice: 5000,
    discount: '20% OFF',
    rating: 4.8,
    reviews: 142,
    image: 'https://cdn1.visiofactory.com/140622-thickbox/chanel-ch4292-c134sb-56-16-gold.jpg',
    images: [
       'https://cdn1.visiofactory.com/140622-thickbox/chanel-ch4292-c134sb-56-16-gold.jpg'
    ],
    category: 'Sunglasses',
    type: 'Sunglasses',
    shape: 'Aviator',
    gender: 'Men',
    color: 'Silver',
    isPremium: true,
  },
  {
    id: 'p8',
    name: 'Tortoise Cat Eye Sunglasses',
    price: 2999,
    originalPrice: 4500,
    discount: '33% OFF',
    rating: 4.9,
    reviews: 580,
    image: 'https://cdn1.visiofactory.com/140611-thickbox/ray-ban-wayfarer-puffer-asap-rocky-rb4940bp-6865-87-47-23-black-with-strass.jpg',
    images: [
      'https://cdn1.visiofactory.com/140611-thickbox/ray-ban-wayfarer-puffer-asap-rocky-rb4940bp-6865-87-47-23-black-with-strass.jpg'
    ],
    category: 'Sunglasses',
    type: 'Sunglasses',
    shape: 'Cat Eye',
    gender: 'Women',
    color: 'Tortoise',
    isPremium: true,
  }
];

export const shapes = [
  { name: 'Round', image: 'https://www.tbdeyewear.com/cdn/shop/files/Linea_Bottega_TBD_Eyewear.jpg' },
  { name: 'Rectangle', image: 'https://cdn1.visiofactory.com/modules/visiofactorycategoriespush/img/top/807.jpg' },
  { name: 'Cat Eye', image: 'https://www.tbdeyewear.com/cdn/shop/collections/image_tbd.jpg' },
  { name: 'Aviator', image: 'https://www.tbdeyewear.com/cdn/shop/files/Linea_Bottega_TBD_Eyewear.jpg' },
  { name: 'Geometric', image: 'https://cdn1.visiofactory.com/modules/visiofactorycategoriespush/img/top/807.jpg' },
];

export const categories = [
  { name: 'Eyeglasses', image: 'https://www.tbdeyewear.com/cdn/shop/files/Linea_Bottega_TBD_Eyewear.jpg', link: '/products?category=Eyeglasses' },
  { name: 'Sunglasses', image: 'https://cdn1.visiofactory.com/modules/visiofactorycategoriespush/img/top/807.jpg', link: '/products?category=Sunglasses' },
  { name: 'Contact Lenses', image: 'https://www.tbdeyewear.com/cdn/shop/collections/image_tbd.jpg', link: '/products?category=Contact Lenses' },
  { name: 'Kids Glasses', image: 'https://www.tbdeyewear.com/cdn/shop/files/Linea_Bottega_TBD_Eyewear.jpg', link: '/products?category=Kids' },
  { name: 'Computer Glasses', image: 'https://cdn1.visiofactory.com/modules/visiofactorycategoriespush/img/top/807.jpg', link: '/products?category=Computer Glasses' },
];
