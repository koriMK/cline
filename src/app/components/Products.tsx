import { ShoppingCart } from 'lucide-react';

const products = {
  eggs: [
    { id: 1, name: 'Eggs Kienyeji', price: 650, unit: '', image: '/assets/eggs.jpg' },
    { id: 2, name: 'Eggs Unfertilized', price: 480, unit: '', image: '/assets/eggs.jpg' },
  ],
  meat: [
    { id: 5, name: 'Beef', price: 700, unit: '/kg', image: '/assets/beef.jpg' },
    { id: 6, name: 'Pork', price: 700, unit: '/kg', image: '/assets/pork.jpg' },
    { id: 7, name: 'Chevon (Goat Meat)', price: 950, unit: '/kg', image: '/assets/chevon.jpg' },
    { id: 8, name: 'Minced Meat', price: 800, unit: '/kg', image: '/assets/beef.jpg' },
  ],
  chickenCuts: [
    { id: 3, name: 'Broilers', price: 550, unit: '', image: '/assets/chicken.jpg' },
    { id: 4, name: 'Kienyeji', price: 600, unit: '/kg', image: '/assets/chicken.jpg' },
    { id: 9, name: 'Chicken Thigh Bone-in', price: 550, unit: '/kg', image: '/assets/chicken.jpg' },
    { id: 10, name: 'Chicken Thigh Boneless', price: 600, unit: '/kg', image: '/assets/chicken.jpg' },
    { id: 11, name: 'Chicken Gizzard', price: 550, unit: '', image: '/assets/chicken.jpg' },
  ],
};

export type Product = { id: number; name: string; price: number; unit: string; image: string };

interface ProductsProps {
  onAddToCart: (product: Product) => void;
}

export default function Products({ onAddToCart }: ProductsProps) {
  const categories = [
    { label: 'Eggs', items: products.eggs },
    { label: 'Meat', items: products.meat },
    { label: 'Chicken', items: products.chickenCuts },
  ];

  return (
    <section id="products" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Our Products</h2>
          <p className="text-xl text-gray-600">Fresh, quality meat delivered to your doorstep</p>
        </div>

        {categories.map(category => (
          <div key={category.label} className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2" style={{ borderColor: '#8e9c78' }}>
              {category.label}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.items.map(product => (
                <div key={product.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col justify-between">
                  <img src={product.image} alt={product.name} className="w-full h-36 object-cover" />
                  <div className="p-4">
                    <div className="font-semibold text-gray-900 mb-3 text-base">{product.name}</div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">Ksh {product.price}{product.unit}</span>
                      <button
                        onClick={() => onAddToCart(product)}
                        className="px-6 py-4 rounded-full transition flex items-center gap-2 text-white font-semibold text-base"
                        style={{ backgroundColor: '#8e9c78' }}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
