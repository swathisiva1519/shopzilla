import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingBag, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const totalQuantities = useSelector((state) => state.cart.totalQuantities);

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-black tracking-wider text-indigo-400">
          <ShoppingBag className="h-7 w-7" /> SHOPZILLA
        </Link>
        <Link to="/cart" className="relative flex items-center p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition">
          <ShoppingCart className="h-6 w-6 text-white" />
          {totalQuantities > 0 && (
            <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalQuantities}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
