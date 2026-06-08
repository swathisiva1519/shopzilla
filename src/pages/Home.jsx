import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

// API ఒకవేళ పని చేయకపోతే లోడ్ అవ్వడానికి బ్యాకప్ ప్రొడక్ట్స్ డేటా
const backupProducts = [
  {
    id: 101,
    title: "Wireless Noise-Cancelling Headphones",
    price: 99.99,
    category: "electronics",
    description: "Experience premium sound quality with hybrid active noise cancellation technology.",
    image: "https://unsplash.com"
  },
  {
    id: 102,
    title: "Minimalist Leather Quartz Watch",
    price: 129.50,
    category: "accessories",
    description: "Sleek and classic design featuring a genuine leather strap and scratch-resistant glass.",
    image: "https://unsplash.com"
  },
  {
    id: 103,
    title: "Ergonomic Mechanical Keyboard",
    price: 79.99,
    category: "electronics",
    description: "RGB backlit mechanical keyboard with tactile blue switches for typing efficiency.",
    image: "https://unsplash.com"
  },
  {
    id: 104,
    title: "Ultra-Lightweight Running Sneakers",
    price: 65.00,
    category: "shoes",
    description: "Breathable mesh upper with high-traction rubber sole for maximum comfort during runs.",
    image: "https://unsplash.com"
  }
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API నుండి డేటా తెచ్చుకోవడానికి ట్రై చేయడం
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) throw new Error("API issues");
        const data = await res.json();
        
        if(data && data.length > 0) {
          setProducts(data);
          setFilteredProducts(data);
          setCategories(['all', ...new Set(data.map(item => item.category))]);
        } else {
          throw new Error("Empty array");
        }
      } catch (err) {
        console.log("Using secure backup data due to API latency...");
        // ఒకవేళ API ఫెయిల్ అయితే బ్యాకప్ డేటాను సెట్ చేయడం
        setProducts(backupProducts);
        setFilteredProducts(backupProducts);
        setCategories(['all', ...new Set(backupProducts.map(item => item.category))]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-8 min-h-screen bg-slate-50">
      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-6">
        {categories.map((cat) => (
          <button 
            key={cat} 
            onClick={() => { 
              setSelectedCategory(cat); 
              setFilteredProducts(cat === 'all' ? products : products.filter(p => p.category === cat)); 
            }} 
            className={`capitalize px-4 py-2 text-xs font-bold rounded-xl transition ${
              selectedCategory === cat ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Display Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
