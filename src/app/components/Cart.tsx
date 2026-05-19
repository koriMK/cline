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

export default function Cart({ cart, onClose, onUpdateQuantity, onRemove }: CartProps) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Your Cart</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
          </div>

          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-4">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">Ksh {item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-11 h-11 rounded-full text-white font-bold transition text-lg" style={{ backgroundColor: '#8e9c78' }}
                      >-</button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-11 h-11 rounded-full text-white font-bold transition text-lg" style={{ backgroundColor: '#8e9c78' }}
                      >+</button>
                    </div>
                    <button onClick={() => onRemove(item.id)} className="ml-4 text-red-500 hover:text-red-700 text-xl">×</button>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-xl font-semibold mb-4">
                  <span>Total:</span>
                  <span>Ksh {total.toFixed(2)}</span>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="font-medium text-green-900 mb-2">Pay via M-PESA</p>
                  <p className="text-sm text-green-800 mb-1">Till Number: <span className="font-semibold">5247893</span></p>
                  <p className="text-xs text-green-700">1. Go to M-PESA on your phone</p>
                  <p className="text-xs text-green-700">2. Select Lipa Na M-PESA</p>
                  <p className="text-xs text-green-700">3. Select Buy Goods and Services</p>
                  <p className="text-xs text-green-700">4. Enter Till Number: 5247893</p>
                  <p className="text-xs text-green-700">5. Enter amount: Ksh {total.toFixed(2)}</p>
                </div>

                <a
                  href="tel:+254712345678"
                  className="block w-full text-white text-center py-4 rounded-full transition font-semibold text-base" style={{ backgroundColor: '#8e9c78' }}
                >
                  Call to Confirm Order
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
