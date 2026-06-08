import { createSlice } from '@reduxjs/toolkit';

const loadCart = () => {
  try {
    const savedCart = localStorage.getItem('shopzilla_cart');
    return savedCart ? JSON.parse(savedCart) : { cartItems: [], totalAmount: 0, totalQuantities: 0 };
  } catch (e) {
    return { cartItems: [], totalAmount: 0, totalQuantities: 0 };
  }
};

const initialState = loadCart();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += action.payload.price;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1, totalPrice: action.payload.price });
      }
      state.totalQuantities += 1;
      state.totalAmount += action.payload.price;
      localStorage.setItem('shopzilla_cart', JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);
      if (existingItem) {
        state.totalQuantities -= 1;
        state.totalAmount -= existingItem.price;
        if (existingItem.quantity === 1) {
          state.cartItems = state.cartItems.filter(item => item.id !== id);
        } else {
          existingItem.quantity -= 1;
          existingItem.totalPrice -= existingItem.price;
        }
      }
      localStorage.setItem('shopzilla_cart', JSON.stringify(state));
    },
    deleteFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);
      if (existingItem) {
        state.totalQuantities -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;
        state.cartItems = state.cartItems.filter(item => item.id !== id);
      }
      localStorage.setItem('shopzilla_cart', JSON.stringify(state));
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantities = 0;
      localStorage.removeItem('shopzilla_cart');
    }
  }
});

export const { addToCart, removeFromCart, deleteFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
