import { useNavigate } from "react-router-dom";

const products = [
  { id: 1, name: "Oversized Black Tee", price: 15.99, category: "T-Shirts", image: "tee1.jpg" },
  { id: 2, name: "Graphic Anime Tee", price: 17.99, category: "T-Shirts", image: "tee2.jpg" },
  { id: 3, name: "White Basic Tee", price: 12.99, category: "T-Shirts", image: "tee3.jpg" },
  { id: 4, name: "Vintage Wash Tee", price: 14.99, category: "T-Shirts", image: "tee4.jpg" },
  { id: 5, name: "Black Tee", price: 39.99, category: "T-Shirts", image: "tee5.jpg" },
  { id: 6, name: "High-Waisted Mom Jeans", price: 42.99, category: "Jeans", image: "jeans2.jpg" },
  { id: 7, name: "Distressed Boyfriend Jeans", price: 44.99, category: "Jeans", image: "jeans3.jpg" },
  { id: 8, name: "Classic Blue Jeans", price: 37.99, category: "Jeans", image: "jeans4.jpg" },
  { id: 9, name: "Camo Cargo Pants", price: 29.99, category: "Streetwear", image: "street6.jpg" },
  { id: 10, name: "Plaid Flannel Shirt", price: 24.99, category: "Streetwear", image: "street2.jpg" },
  { id: 11, name: "Denim Jacket", price: 49.99, category: "Streetwear", image: "street7.jpg" },
  { id: 12, name: "Hooded Sweatshirt", price: 34.99, category: "Streetwear", image: "street4.jpg" },
  { id: 13, name: "Zip-Up Hoodie", price: 27.99, category: "Hoodies", image: "hoodie1.jpg" },
  { id: 14, name: "Graphic Pullover Hoodie", price: 29.99, category: "Hoodies", image: "hoodie2.jpg" },
  { id: 15, name: "Fleece Lined Hoodie", price: 32.99, category: "Hoodies", image: "hoodie7.jpg" },
  { id: 16, name: "Cropped Hoodie", price: 25.99, category: "Hoodies", image: "hoodie6.jpg" },
  { id: 17, name: "Sun Glasses", price: 9.99, category: "Accessories", image: "acc6.jpg" },
  { id: 18, name: "Beanie Hat", price: 11.99, category: "Accessories", image: "acc2.jpg" },
  { id: 19, name: "Leather Belt", price: 14.99, category: "Accessories", image: "acc3.jpg" },
  { id: 20, name: "Baseball Cap", price: 19.99, category: "Accessories", image: "acc7.jpg" },
];

export default function ProductsGrid({ category = "all" }) {
  const navigate = useNavigate();
  
  const filteredProducts = category === "all" 
    ? products 
    : products.filter(p => p.category === category);
              
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-8 pb-12">
      {filteredProducts.map((p) => (
        <div 
          key={p.id} 
          onClick={() => navigate(`/product/${p.id}`)} 
          className="border p-4 rounded-xl cursor-pointer hover:scale-105 transition"
        >
          <div className="w-full overflow-hidden rounded-xl">
            <img src={`/upload/${p.image}`} alt={p.name} className="w-full h-full object-cover" /> 
          </div>
          <h3 className="mt-3 font-semibold">{p.name}</h3>
          <p className="text-orange-500 font-bold">${p.price}</p>
        </div>
      ))}
    </div>
  );
}
