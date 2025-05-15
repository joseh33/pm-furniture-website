// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingpage';
import ContactPage from './pages/contact_page'; 
import AuthPage from './pages/auth';
import HomePage from './pages/home_page'; 
import CartPage from './pages/Cart_page'; 
import OrderHistoryPage from './pages/order_history_page.jsx';

import { CartProvider } from './components/context_API/cart_context'; // Import CartProvider
import '@fortawesome/fontawesome-free/css/all.min.css';

// Import ToastContainer and its CSS from react-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <CartProvider>
      <Router>
        {/* ToastContainer component for react-toastify notifications */}
        <ToastContainer position="top-right" autoClose={3000} />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order-history" element={<OrderHistoryPage />} />
          <Route path="/login" element={<AuthPage isLogin={true} />} />
          <Route path="/signup" element={<AuthPage isLogin={false} />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
