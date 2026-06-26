import { useNavigate } from "react-router-dom";
import { useState } from "react";

const trendingProducts = [
  { id: 1, name: "Oversized Black Tee", price: 15.99, category: "T-Shirts", image: "tee1.jpg", trend: true },
  { id: 2, name: "Graphic Anime Tee", price: 17.99, category: "T-Shirts", image: "tee2.jpg", trend: true },
  { id: 5, name: "Black Tee", price: 39.99, category: "T-Shirts", image: "tee5.jpg", trend: true },
  { id: 6, name: "High-Waisted Mom Jeans", price: 42.99, category: "Jeans", image: "jeans2.jpg", trend: true },
  { id: 11, name: "Denim Jacket", price: 49.99, category: "Streetwear", image: "street7.jpg", trend: true },
  { id: 12, name: "Hooded Sweatshirt", price: 34.99, category: "Streetwear", image: "street4.jpg", trend: true },
  { id: 13, name: "Zip-Up Hoodie", price: 27.99, category: "Hoodies", image: "hoodie1.jpg", trend: true },
  { id: 15, name: "Fleece Lined Hoodie", price: 32.99, category: "Hoodies", image: "hoodie7.jpg", trend: true },
  { id: 20, name: "Baseball Cap", price: 19.99, category: "Accessories", image: "acc7.jpg", trend: true },
  { id: 14, name: "Graphic Pullover Hoodie", price: 29.99, category: "Hoodies", image: "hoodie2.jpg", trend: true },
];

export default function Trending() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-white/10 px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-2">🔥 Trending Now</h1>
          <p className="text-lg opacity-60">Discover the hottest items everyone's talking about</p>
        </div>
      </header>

      {/* Trending Products Grid */}
      <div className="px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12">
            {trendingProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/product/${p.id}`)}
                className="border border-white/10 p-4 rounded-xl cursor-pointer hover:scale-105 transition hover:border-orange-500/50 group"
              >
                <div className="w-full overflow-hidden rounded-xl relative">
                  <div className="absolute top-2 right-2 bg-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold z-10">
                    Trending
                  </div>
                  <img
                    src={`/upload/${p.image}`}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:brightness-110 transition"
                  />
                </div>
                <h3 className="mt-3 font-semibold group-hover:text-orange-500 transition">{p.name}</h3>
                <p className="text-orange-500 font-bold text-lg">${p.price}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${p.id}`);
                  }}
                  className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-black font-semibold py-2 rounded-lg transition"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
