import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Cart from './components/Cart';
import TrustedBy from './components/TrustedBy';
import Products, { type Product } from './components/Products';
import Services from './components/Services';
import Comparison from './components/Comparison';
import HowTo from './components/HowTo';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import { isLoggedIn, logout, AuthUser } from './services/api';

export default function App() {
  const [cart, setCart] = useState<{ id: number; name: string; price: number; quantity: number }[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const handler = () => { setLoggedIn(false); setCurrentUser(null); setCart([]); };
    window.addEventListener('auth:logout', handler);
    return () => window.removeEventListener('auth:logout', handler);
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(item => item.id !== id));

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) { removeFromCart(id); return; }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    setCurrentUser(null);
    setCart([]);
  };

  const handleAuthSuccess = (user: AuthUser) => {
    setLoggedIn(true);
    setCurrentUser(user);
    setShowAuth(false);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        cartCount={cartCount}
        onCartClick={() => { if (!loggedIn) { setShowAuth(true); return; } setShowCart(!showCart); }}
        loggedIn={loggedIn}
        onLogout={handleLogout}
        onLoginClick={() => setShowAuth(true)}
        userName={currentUser?.name || currentUser?.phone || null}
      />
      {showCart && <Cart cart={cart} onClose={() => setShowCart(false)} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onSuccess={handleAuthSuccess} />}
      <Hero />
      <TrustedBy />
      <Products onAddToCart={(product) => { if (!loggedIn) { setShowAuth(true); return; } addToCart(product); }} />
      <Services />
      <Comparison />
      <HowTo />
      <Contact />
      <Footer />
    </div>
  );
}
