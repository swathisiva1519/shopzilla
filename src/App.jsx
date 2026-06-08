import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <div className="bg-slate-50 min-h-screen font-sans">
        <Navbar />
        <Routes>
          {/* డిఫాల్ట్ రూట్ నేరుగా హోమ్ పేజీకి వెళ్లేలా చేయడం */}
          <Route path="/" element={<Home />} /> 
          <Route path="/cart" element={<Cart />} />
          {/* ఒకవేళ యూజర్ వేరే ఏదైనా రాంగ్ URL టైప్ చేస్తే హోమ్ పేజీకి రీడైరెక్ట్ చేయడం */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
