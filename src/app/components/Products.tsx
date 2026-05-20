import { useState } from 'react';

const categories = [
  {
    label: 'Fresh Eggs',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600',
    badge: '#e8514a',
    items: [
      { id: 1, name: 'Eggs Kienyeji', sub: 'tray', price: 650 },
      { id: 2, name: 'Eggs Unfertilised', sub: 'tray', price: 480 },
    ],
  },
  {
    label: 'Fresh Chicken',
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600',
    badge: '#8e9c78',
    items: [
      { id: 3, name: 'Broilers', sub: 'whole', price: 550 },
      { id: 4, name: 'Kienyeji', sub: 'per kg', price: 600 },
      { id: 9, name: 'Chicken Thigh Bone-in', sub: 'per kg', price: 550 },
      { id: 10, name: 'Chicken Thigh Boneless', sub: 'per kg', price: 600 },
      { id: 11, name: 'Chicken Gizzard', sub: 'per kg', price: 550 },
    ],
  },
  {
    label: 'Beef',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600',
    badge: '#c0392b',
    items: [
      { id: 5, name: 'Beef', sub: 'per kg', price: 700 },
      { id: 8, name: 'Minced Meat', sub: 'per kg', price: 800 },
    ],
  },
  {
    label: 'Pork',
    image: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=600',
    badge: '#e67e22',
    items: [
      { id: 6, name: 'Pork', sub: 'per kg', price: 700 },
    ],
  },
  {
    label: 'Chevon / Goat Meat',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600',
    badge: '#7f8c8d',
    items: [
      { id: 7, name: 'Chevon (Goat Meat)', sub: 'per kg', price: 950 },
    ],
  },
];

export type Product = { id: number; name: string; price: number; unit: string; image: string };

interface ProductsProps {
  onAddToCart: (product: Product) => void;
}

export default function Products({ onAddToCart }: ProductsProps) {
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const increment = (item: typeof categories[0]['items'][0], badge: string, image: string) => {
    setQuantities(prev => {
      const q = (prev[item.id] || 0) + 1;
      if (q === 1) onAddToCart({ id: item.id, name: item.name, price: item.price, unit: item.sub, image });
      return { ...prev, [item.id]: q };
    });
  };

  const decrement = (id: number) => {
    setQuantities(prev => {
      const q = (prev[id] || 0) - 1;
      return { ...prev, [id]: Math.max(0, q) };
    });
  };

  return (
    <section id="products" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Our Products</h2>
          <p className="text-xl text-gray-600">Fresh, quality meat delivered to your doorstep</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="products-grid">
          {categories.map(cat => (
            <div key={cat.label} style={{ borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', overflow: 'hidden', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>

              {/* Image banner */}
              <div style={{ position: 'relative', height: '160px' }}>
                <img src={cat.image} alt={cat.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)' }} />
                <span style={{ position: 'absolute', bottom: '10px', left: '12px', color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>{cat.label}</span>
                <span style={{ position: 'absolute', bottom: '10px', right: '12px', backgroundColor: cat.badge, color: '#fff', borderRadius: '20px', padding: '4px 12px', fontSize: '0.75rem' }}>
                  {cat.items.length} {cat.items.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              {/* Product rows */}
              <div>
                {cat.items.map((item, i) => {
                  const qty = quantities[item.id] || 0;
                  return (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: i < cat.items.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none' }}>
                      <div style={{ flex: 1, minWidth: 0, marginRight: '12px' }}>
                        <div style={{ fontWeight: 500, fontSize: '0.95rem', color: '#1a1a1a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.name}
                        </div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#8e9c78', marginTop: '2px' }}>
                          Ksh {item.price} <span style={{ fontWeight: 400, color: '#888', fontSize: '0.8rem' }}>/ {item.sub}</span>
                        </div>
                      </div>

                      {qty === 0 ? (
                        <button
                          onClick={() => increment(item, cat.badge, cat.image)}
                          style={{ backgroundColor: cat.badge, color: '#fff', borderRadius: '20px', padding: '6px 16px', fontSize: '0.85rem', fontWeight: 600, border: 'none', cursor: 'pointer', minHeight: '44px', whiteSpace: 'nowrap' }}
                        >
                          + Add
                        </button>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: cat.badge, borderRadius: '20px', padding: '4px 8px', minHeight: '44px' }}>
                          <button onClick={() => decrement(item.id)} style={{ background: 'none', border: 'none', color: '#fff', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                          <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', minWidth: '20px', textAlign: 'center' }}>{qty}</span>
                          <button onClick={() => increment(item, cat.badge, cat.image)} style={{ background: 'none', border: 'none', color: '#fff', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .products-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .products-grid { grid-template-columns: repeat(1, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
