import { useNavigate } from "react-router-dom";

export default function CartSidebar({ open, cart, onClose, onRemove }) {
  const navigate = useNavigate();
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleQuantityChange = (item, newQty) => {
    if (newQty <= 0) {
      onRemove(item.id);
    }
  };

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <>
      {open && (
        <div onClick={onClose} className="fixed inset-0 bg-black/50 z-40"/>
      )}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white z-50 transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
          <h3 className="font-display text-2xl font-bold">Your Cart 🛒</h3>
          <button onClick={onClose} className="text-2xl hover:text-orange-500 transition">✕</button>
        </div>

        {/* Cart Items */}
        <div className="p-6 space-y-4 overflow-y-auto" style={{ height: "calc(100vh - 280px)" }}>
          {cart.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <p className="opacity-60 text-center">Cart is empty</p>
            </div>
          )}
          {cart.map((item) => (
            <div key={item.id} className="border border-gray-200 p-4 rounded-lg hover:border-orange-500 transition">
              {/* Item Image and Name */}
              <div className="flex gap-3 mb-3">
                {item.image && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    <img 
                      src={`/upload/${item.image}`} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="font-semibold text-sm line-clamp-2">{item.name}</h4>
                  <p className="text-orange-500 font-bold text-sm">${item.price}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                  <button 
                    onClick={() => handleQuantityChange(item, item.qty - 1)}
                    className="w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded transition"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
                  <button 
                    onClick={() => handleQuantityChange(item, item.qty + 1)}
                    className="w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded transition"
                  >
                    +
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-60">Total</p>
                  <p className="font-bold text-orange-500">${(item.price * item.qty).toFixed(2)}</p>
                </div>
              </div>

              {/* Remove Button */}
              <button 
                onClick={() => onRemove(item.id)}
                className="w-full mt-3 px-3 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white font-semibold rounded transition text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Footer - Total and Checkout */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-6 space-y-3">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total:</span>
            <span className="text-orange-500">${total.toFixed(2)}</span>
          </div>
          <button onClick={handleCheckout} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}
