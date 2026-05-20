import { useState, useEffect, useRef } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const TILL = '5247893';
const WA = '254792125943';

function buildWaMessage(cart: CartItem[], total: number) {
  const lines = cart.map(i => `- ${i.name} x${i.quantity} — KSh ${i.price * i.quantity}`).join('%0A');
  return `https://wa.me/${WA}?text=Hi%2C%20I%20would%20like%20to%20place%20an%20order%3A%0A%0A${encodeURIComponent(lines.replace(/%0A/g, '\n'))}%0A%0A*Total%3A%20KSh%20${total}*%0A%0APlease%20confirm%20my%20order.%20Thank%20you!`;
}

function buildWaPayment(total: number) {
  return `https://wa.me/${WA}?text=Hi%2C%20I%20have%20paid%20KSh%20${total}%20via%20Till%20for%20my%20order.%20Please%20confirm.`;
}

const phones = [
  { display: '0794 187 716', href: 'tel:+254794187716' },
  { display: '0720 736 220', href: 'tel:+254720736220' },
  { display: '0790 897 788', href: 'tel:+254790897788' },
];

export default function Cart({ cart, onClose, onUpdateQuantity, onRemove }: CartProps) {
  const [showCall, setShowCall] = useState(false);
  const [showTill, setShowTill] = useState(false);
  const callRef = useRef<HTMLDivElement>(null);
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const count = cart.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (callRef.current && !callRef.current.contains(e.target as Node)) setShowCall(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />

      {/* Sidebar / Bottom sheet */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideIn 0.3s ease',
      }} className="cart-sheet">

        {/* Header */}
        <div style={{ padding: '20px 20px 12px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontWeight: 700, fontSize: '1.2rem', color: '#1a1a1a', margin: 0 }}>Your Order</h2>
              <p style={{ color: '#888', fontSize: '0.85rem', margin: '2px 0 0' }}>{count} {count === 1 ? 'item' : 'items'}</p>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#555', padding: '4px 8px' }}>✕</button>
          </div>
        </div>

        {/* Items list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>
          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#aaa', padding: '40px 0' }}>Your cart is empty</p>
          ) : (
            cart.map((item, i) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < cart.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none' }}>
                <div style={{ flex: 1, minWidth: 0, marginRight: '12px' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#1a1a1a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#8e9c78', marginTop: '2px' }}>KSh {(item.price * item.quantity).toLocaleString()}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button onClick={() => item.quantity <= 1 ? onRemove(item.id) : onUpdateQuantity(item.id, item.quantity - 1)}
                    style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #ccc', background: 'none', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>−</button>
                  <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: 600, fontSize: '0.95rem' }}>{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #ccc', background: 'none', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>+</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Total + Actions */}
        <div style={{ padding: '16px 20px 24px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          {/* Total */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontWeight: 500, fontSize: '1rem', color: '#555' }}>Total</span>
            <span style={{ fontWeight: 700, fontSize: '1.2rem', color: '#8e9c78' }}>KSh {total.toLocaleString()}</span>
          </div>

          {/* WhatsApp button */}
          <a href={buildWaMessage(cart, total)} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', backgroundColor: '#25D366', color: '#fff', fontWeight: 600, fontSize: '1rem', padding: '14px', borderRadius: '10px', textDecoration: 'none', marginBottom: '10px', boxSizing: 'border-box' }}>
            🛒 Order via WhatsApp
          </a>

          {/* Call button */}
          <div ref={callRef} style={{ position: 'relative', marginBottom: '10px' }}>
            <button onClick={() => setShowCall(p => !p)}
              style={{ width: '100%', backgroundColor: '#1a1a1a', color: '#fff', fontWeight: 600, fontSize: '1rem', padding: '14px', borderRadius: '10px', border: 'none', cursor: 'pointer' }}>
              📞 Call to Order
            </button>
            {showCall && (
              <div style={{ position: 'absolute', bottom: '110%', left: 0, right: 0, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', overflow: 'hidden', zIndex: 10 }}>
                {phones.map(p => (
                  <a key={p.href} href={p.href}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: '1px solid rgba(0,0,0,0.07)', textDecoration: 'none', color: '#1a1a1a', fontWeight: 500, fontSize: '0.95rem' }}>
                    <span>📞 {p.display}</span>
                    <span style={{ color: '#8e9c78' }}>→</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Till button */}
          <button onClick={() => setShowTill(p => !p)}
            style={{ width: '100%', backgroundColor: '#8e9c78', color: '#fff', fontWeight: 600, fontSize: '1rem', padding: '14px', borderRadius: '10px', border: 'none', cursor: 'pointer', marginBottom: showTill ? '10px' : '0' }}>
            💳 Pay via Till (M-Pesa)
          </button>

          {showTill && (
            <div style={{ backgroundColor: '#f9f7f4', borderRadius: '10px', padding: '16px', fontSize: '0.9rem', color: '#333' }}>
              <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1rem' }}>Pay via M-Pesa Till</p>
              <p style={{ margin: '4px 0' }}>Till Number: <strong>{TILL}</strong></p>
              <p style={{ margin: '4px 0' }}>Amount: <strong style={{ color: '#8e9c78' }}>KSh {total.toLocaleString()}</strong></p>
              <p style={{ margin: '12px 0 6px', fontWeight: 600 }}>Steps:</p>
              {['Go to M-Pesa on your phone', 'Select "Lipa na M-Pesa"', 'Select "Buy Goods & Services"', `Enter Till Number: ${TILL}`, `Enter Amount: KSh ${total.toLocaleString()}`, 'Enter your M-Pesa PIN', 'Screenshot & send to WhatsApp'].map((s, i) => (
                <p key={i} style={{ margin: '3px 0', color: '#555' }}>{i + 1}. {s}</p>
              ))}
              <a href={buildWaPayment(total)} target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', textAlign: 'center', marginTop: '14px', backgroundColor: '#25D366', color: '#fff', fontWeight: 600, padding: '12px', borderRadius: '8px', textDecoration: 'none' }}>
                Send Payment Confirmation →
              </a>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .cart-sheet {
          width: 100%;
          max-width: 420px;
          height: 100vh;
          border-radius: 0;
        }
        @media (max-width: 640px) {
          @keyframes slideIn {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
          .cart-sheet {
            max-width: 100% !important;
            width: 100% !important;
            height: 85vh !important;
            border-radius: 16px 16px 0 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
