import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart, deleteFromCart, clearCart } from '../features/cartSlice';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (cartItems.length === 0) return (
    <div className="container mx-auto px-6 py-20 text-center bg-slate-50 min-h-screen flex flex-col items-center justify-center">
      <ShoppingBag className="h-16 w-16 text-slate-300 mb-4" />
      <h2 className="text-2xl font-bold text-slate-700">Your cart is empty</h2>
      <Link to="/" className="mt-4 bg-indigo-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-indigo-700 transition">Shop Now</Link>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-8 min-h-screen bg-slate-50">
      <h1 className="text-2xl font-black text-slate-800 mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between gap-4">
              <img className="h-20 w-20 object-contain p-2 bg-slate-50 rounded-xl" src={item.image} alt={item.title} />
              <div className="flex-grow">
                <h3 className="font-bold text-slate-800 text-sm line-clamp-1">{item.title}</h3>
                <p className="text-indigo-600 font-extrabold text-sm mt-1">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                <button onClick={() => dispatch(removeFromCart(item.id))} className="p-1 hover:bg-white rounded-md"><Minus className="h-4 w-4" /></button>
                <span className="px-2 text-sm font-bold text-slate-800">{item.quantity}</span>
                <button onClick={() => dispatch(addToCart(item))} className="p-1 hover:bg-white rounded-md"><Plus className="h-4 w-4" /></button>
              </div>
              <button onClick={() => dispatch(deleteFromCart(item.id))} className="text-red-500 hover:bg-red-50 p-2 rounded-xl"><Trash2 className="h-5 w-5" /></button>
            </div>
          ))}
          <button onClick={() => dispatch(clearCart())} className="text-xs font-bold text-red-500 hover:underline">Clear Entire Cart</button>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit space-y-4">
          <h2 className="text-lg font-black text-slate-800 border-b pb-3">Order Summary</h2>
          <div className="flex justify-between font-medium text-slate-600 text-sm"><span>Subtotal:</span><span>${totalAmount.toFixed(2)}</span></div>
          <div className="flex justify-between font-medium text-slate-600 text-sm"><span>Shipping:</span><span className="text-green-500 font-bold">FREE</span></div>
          <div className="flex justify-between font-black text-slate-800 text-lg border-t pt-3"><span>Total:</span><span>${totalAmount.toFixed(2)}</span></div>
          <button onClick={() => alert("Checkout success!")} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
