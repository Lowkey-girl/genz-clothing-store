import { useNavigate } from "react-router-dom";
import { useState } from "react";

const saleProducts = [
  { id: 3, name: "White Basic Tee", price: 12.99, originalPrice: 19.99, category: "T-Shirts", image: "tee3.jpg", discount: 35 },
  { id: 4, name: "Vintage Wash Tee", price: 14.99, originalPrice: 22.99, category: "T-Shirts", image: "tee4.jpg", discount: 35 },
  { id: 8, name: "Classic Blue Jeans", price: 37.99, originalPrice: 54.99, category: "Jeans", image: "jeans4.jpg", discount: 31 },
  { id: 9, name: "Camo Cargo Pants", price: 29.99, originalPrice: 45.99, category: "Streetwear", image: "street6.jpg", discount: 35 },
  { id: 10, name: "Plaid Flannel Shirt", price: 24.99, originalPrice: 38.99, category: "Streetwear", image: "street2.jpg", discount: 36 },
  { id: 13, name: "Zip-Up Hoodie", price: 27.99, originalPrice: 39.99, category: "Hoodies", image: "hoodie1.jpg", discount: 30 },
  { id: 16, name: "Cropped Hoodie", price: 25.99, originalPrice: 39.99, category: "Hoodies", image: "hoodie6.jpg", discount: 35 },
  { id: 17, name: "Sun Glasses", price: 9.99, originalPrice: 24.99, category: "Accessories", image: "acc6.jpg", discount: 60 },
  { id: 18, name: "Beanie Hat", price: 11.99, originalPrice: 19.99, category: "Accessories", image: "acc2.jpg", discount: 40 },
  { id: 19, name: "Leather Belt", price: 14.99, originalPrice: 24.99, category: "Accessories", image: "acc3.jpg", discount: 40 },
];

export default function Sale() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-white/10 px-8 py-12 bg-gradient-to-r from-red-900/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-2">🎉 Big Sale Event</h1>
          <p className="text-lg opacity-60">Incredible discounts on your favorite items - limited time only!</p>
        </div>
      </header>

      {/* Sale Products Grid */}
      <div className="px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12">
            {saleProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/product/${p.id}`)}
                className="border border-white/10 p-4 rounded-xl cursor-pointer hover:scale-105 transition hover:border-red-500/50 group relative overflow-hidden"
              >
                {/* Sale Badge */}
                <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10 flex items-center gap-1">
                  <span>-{p.discount}%</span>
                </div>

                <div className="w-full overflow-hidden rounded-xl relative">
                  <img
                    src={`/upload/${p.image}`}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:brightness-110 transition"
                  />
                </div>
                <h3 className="mt-3 font-semibold group-hover:text-red-500 transition">{p.name}</h3>

                {/* Price Section */}
                <div className="mt-2 flex items-center gap-2">
                  <p className="text-red-500 font-bold text-lg">${p.price}</p>
                  <p className="text-gray-400 line-through text-sm">${p.originalPrice}</p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${p.id}`);
                  }}
                  className="mt-3 w-full bg-red-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
                >
                  Shop Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
