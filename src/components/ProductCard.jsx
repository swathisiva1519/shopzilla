import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { Star, Plus } from 'lucide-react';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 p-5 flex flex-col justify-between group transition-all duration-300 transform hover:-translate-y-1">
      <div className="h-48 w-full flex items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-4 relative">
        <img className="max-h-full object-contain group-hover:scale-110 transition-transform duration-300" src={product.image} alt={product.title} />
        <span className="absolute top-2 left-2 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded-md">{product.category}</span>
      </div>
      <div className="mt-4 flex-grow">
        <h2 className="text-slate-800 font-bold text-base line-clamp-1">{product.title}</h2>
        <div className="flex items-center gap-1 mt-1 mb-2">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="text-xs font-semibold text-slate-500">{product.rating?.rate || 4.5}</span>
        </div>
        <p className="text-slate-500 text-xs line-clamp-2">{product.description}</p>
      </div>
      <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-50">
        <span className="text-xl font-black text-slate-900">${product.price.toFixed(2)}</span>
        <button onClick={() => dispatch(addToCart(product))} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm py-2 px-4 rounded-xl flex items-center gap-1 transition-all">
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
