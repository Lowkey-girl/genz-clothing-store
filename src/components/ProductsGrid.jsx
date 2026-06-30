import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductsGrid({ category = "all" }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Products:", data);
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((p) => p.category_name === category);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-8 pb-12">
      {filteredProducts.map((p) => {
        console.log("Product:", p.name);
        console.log("Image:", p.image);

        return (
          <div
            key={p.id}
            onClick={() => navigate(`/product/${p.id}`)}
            className="border p-4 rounded-xl cursor-pointer hover:scale-105 transition"
          >
            <div className="h-64 overflow-hidden rounded-xl">
              <img
                src={
                  p.image
                    ? `http://localhost:3000/product_images/${p.image}`
                    : "http://localhost:3000/product_images/default.jpg"
                }
                alt={p.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.log("Image failed:", p.image);
                  e.currentTarget.src =
                    "http://localhost:3000/product_images/default.jpg";
                }}
              />
            </div>

            <h3 className="mt-3 font-semibold">{p.name}</h3>
            <p className="text-orange-500 font-bold">${p.price}</p>
          </div>
        );
      })}
    </div>
  );
}