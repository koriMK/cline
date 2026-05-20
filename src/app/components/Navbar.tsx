import { ShoppingCart } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center h-20">
          <div className="flex items-center gap-3">
            <img src="/assets/logo.jpg" alt="Nate Poultry Meat" className="h-12 w-12 rounded-full object-cover border-2 border-gray-200" />
            <span className="font-bold text-gray-900 text-lg">Nate Poultry Meat</span>
          </div>
          <nav className="hidden md:flex flex-1 justify-center items-center space-x-10">
            <a href="#home" className="text-gray-900 hover:text-black transition text-sm font-bold">Home</a>
            <a href="#services" className="text-gray-900 hover:text-black transition text-sm font-bold">Services</a>
            <a href="#products" className="text-gray-900 hover:text-black transition text-sm font-bold">Products</a>
            <a href="#howto" className="text-gray-900 hover:text-black transition text-sm font-bold">How It Works</a>
            <a href="#contact" className="text-gray-900 hover:text-black transition text-sm font-bold">Contact</a>
          </nav>
          <button
            onClick={onCartClick}
            className="relative ml-auto px-8 py-5 rounded-full transition flex items-center gap-2 text-white font-semibold text-base" style={{ backgroundColor: '#8e9c78' }}
          >
            <ShoppingCart className="w-4 h-4 text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#5a6b47' }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
