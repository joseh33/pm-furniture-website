import React, { useState } from 'react';
import CollectionTile from "../Collections/new_collection_tile.jsx";
import { collections } from "../Collections/new_collection_data.jsx";
import OffersSection from "../components/what_we_offer/what_we_offer.jsx";
import TestimonialsSection from '../components/reviews/review.jsx';
import InteriorSection from '../components/hero_section/hero_section.jsx';
import { Link } from 'react-router-dom';
import AuthPage from "../pages/auth.jsx";

const LandingPage = () => {
 const [showAll, setShowAll] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const currentYear = new Date().getFullYear();

  const openAuthModal = (login = true) => {
    setIsLogin(login);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const visibleCollections = showAll ? collections : collections.slice(0, 6);

  const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};


  return (
    <>
      {/* Auth Modal */}
      {authModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-3xl">
            <button
              className="absolute top-4 right-4 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center z-10"
              onClick={closeAuthModal}
            >
              ✕
            </button>
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <AuthPage isLogin={isLogin} />
            </div>
          </div>
        </div>
      )}

      {/* Landing Section */}
      <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://i.postimg.cc/W3Ygxkxz/modern-living-room-interior-3d-render.jpg')" }}>
        {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* Navigation Bar */}
        <header className="absolute top-0 left-0 w-full flex flex-wrap items-center justify-between px-6 md:px-12 py-4 z-20 text-white">
          <div className="text-2xl font-bold">PM Furnitures and Pulpits</div>
          <nav className="flex flex-wrap gap-4 items-center text-sm md:text-base">
           <Link to="/" className="hover:underline">Home</Link>
         <button onClick={() => scrollToSection('about')} className="hover:underline bg-transparent border-none outline-none">
            About
          </button>
          <Link to="/contact" className="hover:underline">Contact</Link>

          {/* Login Button */}
<button 
  onClick={() => openAuthModal(true)} // This will trigger the modal for login
  className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-black transition-all"
>
  Login
</button>

           {/* Sign Up Button */}
          
          <button 
            onClick={() => openAuthModal(false)} // This will trigger the modal for login
            className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-black transition-all"
          >
            SignUp
          </button>
          </nav>
        </header>

        {/* Hero Section */}
        <div className="relative z-10 flex flex-col items-center justify-center h-screen text-white text-center px-4 sm:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Find The Perfect Furniture <br className="hidden sm:inline" /> To Complete Your Home
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl">
            We specialize in buying and selling high-quality, marketable furniture, each piece reflecting our unique aesthetic.
          </p>
          <button onClick={() => openAuthModal(true)} className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-white hover:text-black">
            Shop Now
          </button>
        </div>
      </div>

      {/* Collection Tiles Section */}
      <div className="relative z-10 bg-white bg-opacity-90 py-12 px-6 sm:px-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our New Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCollections.map((item, index) => (
            <CollectionTile
              key={index}
              title={item.title}
              price={item.price}
              badge={item.badge}
              image={item.image}
              colors={item.colors}
            />
          ))}
        </div>
        {!showAll && (
          <div className="mt-8 flex justify-center">
   <button
  onClick={() => setShowAll(true)}
  className="px-6 py-3 bg-white text-gray-800 border border-gray-400 rounded-full font-semibold hover:bg-gray-200 transition"
>
  See More Collection
</button>

          </div>
        )}
        <div className="mt-16">
           <OffersSection />
</div>

<TestimonialsSection />

<section className="py-16 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        You’ve Got Questions & We’ve Got Answers!
      </h2>
      <p className="text-gray-600 mb-6">Still have a question in mind?</p>
      <Link to="/contact" className="inline-flex items-center px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition duration-300">
 Contact Us <span className="ml-2 text-lg">↗</span>
</Link>

    </section>

    {/* About Section */}
<section id="about" className="py-16 bg-gray-50 text-center">
  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
    About PM Furnitures and Pulpits
  </h2>
  <p className="text-gray-700 max-w-3xl mx-auto text-lg">
    At PM Furnitures and Pulpits, we believe your living space should reflect your unique personality and style. Our passion lies in sourcing and crafting elegant, market-ready furniture pieces that elevate your home or office. Whether you're looking for contemporary designs, custom pulpits, or timeless classics, our collections embody quality, durability, and distinctive beauty. Explore our vision, built on craftsmanship, integrity, and a commitment to transforming spaces.
  </p>
</section>

    <InteriorSection/>

     <footer className="bg-black text-white px-6 py-12 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2">
          <h3 className="text-xl font-bold mb-4">PM Furnitures and  Pulpits</h3>
          <p className="text-sm text-gray-400 mb-4">
            We specialize in buying and selling high-quality, marketable furniture, each piece reflecting our unique aesthetic.
          </p>
        </div>

       <div>
          <h4 className="font-bold mb-2 hover:underline">Quick Menu</h4>
            <ul className="space-y-1 text-sm text-gray-400">
             <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="#about" className="hover:underline">About us</Link></li>
            <li><Link to="/" className="hover:underline">Product</Link></li>
            <li><Link to="/" className="hover:underline">Collection</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact us</Link></li>
            </ul>
        </div>

        <div>
          <h4 className="font-bold mb-2 hover:underline">Legal</h4>
          <ul className="space-y-1 text-sm text-gray-400">
            <li><Link to="/" className="hover:underline">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:underline">Terms and conditions</Link></li>
            <li><Link to="/" className="hover:underline">Cookies policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-2 hover:underline">Resources</h4>
          <ul className="space-y-1 text-sm text-gray-400">
            <li><Link to="/" className="hover:underline">Documenattion</Link></li>
            <li><Link to="/" className="hover:underline">Blog</Link></li>
            <li><Link to="/" className="hover:underline">Papers</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-6 text-sm flex flex-col md:flex-row justify-between items-center">
       <p>© {currentYear} Copyright by PM Furnitures and Pulpits</p>
        <div className="flex gap-4 mt-4 md:mt-0 list-none flex-wrap justify-center">
 <li>
   <a
     href="https://www.facebook.com/peter.pm.9216"
     target="_blank"
     rel="noopener noreferrer"
     className="hover:underline flex items-center gap-2"
   >
     <i className="fab fa-facebook-f"></i> Facebook
   </a>
 </li>

 <li>
   <a
     href="https://www.tiktok.com/@peterpm22?_t=ZM-8wJViiEDGER&_r=1"
     target="_blank"
     rel="noopener noreferrer"
     className="hover:underline flex items-center gap-2"
   >
     <i className="fab fa-tiktok"></i> TikTok
   </a>
 </li>

 <li>
   <a
     href="https://x.com/m42995?t=nLWjRVXIaQdOE-g1uUdd7Q&s=09"
     target="_blank"
     rel="noopener noreferrer"
     className="hover:underline flex items-center gap-2"
   >
     <i className="fab fa-twitter"></i> Twitter
   </a>
 </li>

 <li>
   <a
     href="https://x.com/m42995?t=nLWjRVXIaQdOE-g1uUdd7Q&s=09"
     target="_blank"
     rel="noopener noreferrer"
     className="hover:underline flex items-center gap-2"
   >
     <i className="fab fa-whatsapp"></i> Whatsapp
   </a>
 </li>

 <li>
   <a
     href="https://www.instagram.com/petermuemanzioki?utm_source=qr&igsh=MTB6cmc2bnV3eHZwNA=="
     target="_blank"
     rel="noopener noreferrer"
     className="hover:underline flex items-center gap-2"
   >
     <i className="fab fa-instagram"></i> Instagram
   </a>
 </li>
</div>

      </div>
    </footer>

      </div>
      
    </>
    
  );
};

export default LandingPage;