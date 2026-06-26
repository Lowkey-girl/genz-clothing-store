import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const products = [
  { id: 1, name: "Oversized Black Tee", price: 15.99, category: "T-Shirts", detail: "Comfortable oversized tee", image: "tee1.jpg" },
  { id: 2, name: "Graphic Anime Tee", price: 17.99, category: "T-Shirts", detail: "Graphic anime design", image: "tee2.jpg" },
  { id: 3, name: "White Basic Tee", price: 12.99, category: "T-Shirts", detail: "Classic white tee", image: "tee3.jpg" },
  { id: 4, name: "Vintage Wash Tee", price: 14.99, category: "T-Shirts", detail: "Vintage washed look", image: "tee4.jpg" },
  { id: 5, name: "Black Tee", price: 39.99, category: "T-Shirts", detail: "Premium black tee", image: "tee5.jpg" },
  { id: 6, name: "High-Waisted Mom Jeans", price: 42.99, category: "Jeans", detail: "High-waisted mom jeans with stretch fabric.", image: "jeans2.jpg" },
  { id: 7, name: "Distressed Boyfriend Jeans", price: 44.99, category: "Jeans", detail: "Distressed boyfriend jeans with stretch fabric.", image: "jeans3.jpg" },
  { id: 8, name: "Classic Blue Jeans", price: 37.99, category: "Jeans", detail: "Classic blue jeans with stretch fabric.", image: "jeans4.jpg" },
  { id: 9, name: "Camo Cargo Pants", price: 29.99, category: "Streetwear", detail: "Camo cargo pants with stretch fabric.", image: "street6.jpg" },
  { id: 10, name: "Plaid Flannel Shirt", price: 24.99, category: "Streetwear", detail: "Plaid flannel shirt with stretch fabric.", image: "street2.jpg" },
  { id: 11, name: "Denim Jacket", price: 49.99, category: "Streetwear", detail: "Denim jacket with stretch fabric.", image: "street7.jpg" },
  { id: 12, name: "Hooded Sweatshirt", price: 34.99, category: "Streetwear", detail: "Hooded sweatshirt with stretch fabric.", image: "street4.jpg" },
  { id: 13, name: "Zip-Up Hoodie", price: 27.99, category: "Hoodies", detail: "Zip-up hoodie with stretch fabric.", image: "hoodie1.jpg" },
  { id: 14, name: "Graphic Pullover Hoodie", price: 29.99, category: "Hoodies", detail: "Graphic pullover hoodie with stretch fabric.", image: "hoodie2.jpg" },
  { id: 15, name: "Fleece Lined Hoodie", price: 32.99, category: "Hoodies", detail: "Fleece lined hoodie with stretch fabric.", image: "hoodie7.jpg" },
  { id: 16, name: "Cropped Hoodie", price: 25.99, category: "Hoodies", detail: "Cropped hoodie with stretch fabric.", image: "hoodie6.jpg" },
  { id: 17, name: "Sun Glasses", price: 9.99, category: "Accessories", detail: "Sun glasses with UV protection.", image: "acc6.jpg" },
  { id: 18, name: "Beanie Hat", price: 11.99, category: "Accessories", detail: "Warm beanie hat for cold weather.", image: "acc2.jpg" },
  { id: 19, name: "Leather Belt", price: 14.99, category: "Accessories", detail: "Classic leather belt for any outfit.", image: "acc3.jpg" },
  { id: 20, name: "Baseball Cap", price: 19.99, category: "Accessories", detail: "Classic baseball cap for everyday wear.", image: "acc7.jpg" },
];

export default function ProductDetail({ onAddToCart }) {

  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(p => p.id == id);

  const [color, setColor] = useState("Black");
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);

  if (!product) return <p>Product not found</p>;

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      color,
      size,
      qty
    });
  };

  const similarProducts = products.filter(
    p => p.category === product.category && p.id !== product.id
  );

  return (
    <div>

      {/* Product Detail */}
      <div className="max-w-5xl mx-auto p-6 mt-16 grid md:grid-cols-2 gap-10">

        <img
          src={`/upload/${product.image}`}
          alt={product.name}
          className="rounded-xl w-full"
        />

        <div>

          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-xl text-orange-500 my-4">${product.price}</p>

          <p className="opacity-70">{product.detail}</p>


          {/* Color */}
          <div className="mt-6">
            <p className="font-semibold mb-2">Color</p>

            <div className="flex gap-2">
              {["Black", "White", "Gray"].map(c => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`px-3 py-1 border rounded ${
                    color === c ? "bg-black text-white" : ""
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>


          {/* Size */}
          <div className="mt-6">
            <p className="font-semibold mb-2">Size</p>

            <div className="flex gap-2">
              {["S", "M", "L", "XL"].map(s => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-3 py-1 border rounded ${
                    size === s ? "bg-black text-white" : ""
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>


          {/* Quantity */}
          <div className="mt-6">
            <p className="font-semibold mb-2">Quantity</p>

            <div className="flex items-center gap-3">

              <button
                onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                className="px-3 py-1 border rounded"
              >
                -
              </button>

              <span>{qty}</span>

              <button
                onClick={() => setQty(qty + 1)}
                className="px-3 py-1 border rounded"
              >
                +
              </button>

            </div>
          </div>


          <button
            onClick={handleAddToCart}
            className="mt-8 px-6 py-3 bg-black text-white rounded-lg hover:opacity-80"
          >
            🛒 Add to Cart
          </button>

        </div>
      </div>


      {/* Similar Products */}
      <div className="max-w-5xl mx-auto p-6">

        <h2 className="text-2xl font-bold mb-6">Similar Products</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {similarProducts.slice(0,4).map(p => (

            <div
              key={p.id}
              onClick={() => navigate(`/product/${p.id}`)}
              className="cursor-pointer border rounded-lg p-3 hover:shadow"
            >

              <img
                src={`/upload/${p.image}`}
                className="rounded"
              />

              <p className="font-semibold mt-2">{p.name}</p>

              <p className="text-orange-500">${p.price}</p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}