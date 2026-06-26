import { useNavigate } from "react-router-dom";
import { useState } from "react";

const newDropProducts = [
  { id: 3, name: "White Basic Tee", price: 12.99, category: "T-Shirts", image: "tee3.jpg", isNew: true },
  { id: 4, name: "Vintage Wash Tee", price: 14.99, category: "T-Shirts", image: "tee4.jpg", isNew: true },
  { id: 7, name: "Distressed Boyfriend Jeans", price: 44.99, category: "Jeans", image: "jeans3.jpg", isNew: true },
  { id: 9, name: "Camo Cargo Pants", price: 29.99, category: "Streetwear", image: "street6.jpg", isNew: true },
  { id: 10, name: "Plaid Flannel Shirt", price: 24.99, category: "Streetwear", image: "street2.jpg", isNew: true },
  { id: 16, name: "Cropped Hoodie", price: 25.99, category: "Hoodies", image: "hoodie6.jpg", isNew: true },
  { id: 17, name: "Sun Glasses", price: 9.99, category: "Accessories", image: "acc6.jpg", isNew: true },
  { id: 18, name: "Beanie Hat", price: 11.99, category: "Accessories", image: "acc2.jpg", isNew: true },
  { id: 19, name: "Leather Belt", price: 14.99, category: "Accessories", image: "acc3.jpg", isNew: true },
  { id: 8, name: "Classic Blue Jeans", price: 37.99, category: "Jeans", image: "jeans4.jpg", isNew: true },
];

export default function NewDrop() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-white/10 px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-2 text-black">✨ New Drops</h1>
          <p className="text-lg opacity-60 text-black">Fresh arrivals just landed - be the first to shop the latest collection</p>
        </div>
      </header>

      {/* New Drop Products Grid */}
      <div className="px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12">
            {newDropProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/product/${p.id}`)}
                className="border border-white/10 p-4 rounded-xl cursor-pointer hover:scale-105 transition hover:border-orange-500/50 group"
              >
                <div className="w-full overflow-hidden rounded-xl relative">
                  <div className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                    New
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
                  className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
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
