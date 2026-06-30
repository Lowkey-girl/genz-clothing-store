import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Account from "./pages/Account";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marguee";
import CategoryFilter from "./components/CategoryFilter";
import ProductsGrid from "./components/ProductsGrid";
import CartSidebar from "./components/CartSidebar";
import Footer from "./components/Footer";
import Orders from "./pages/admin/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import Trending from "./pages/Trending";
import NewDrop from "./pages/NewDrop";
import Sale from "./pages/Sale";
import Checkout from "./pages/Checkout";
import Thanks from "./pages/Thanks";

import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");

  const [category, setCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id);

      if (found) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, qty: p.qty + product.qty }
            : p
        );
      }

      return [...prev, product];
    });
  };

  return (
    <>
      {!isAdmin && (
        <Navbar
          cartCount={cart.reduce((sum, item) => sum + item.qty, 0)}
          onCartClick={() => setCartOpen(true)}
        />
      )}

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Marquee />
              <CategoryFilter
                current={category}
                onChange={setCategory}
              />
              <ProductsGrid
                category={category}
                onAddToCart={addToCart}
              />
            </>
          }
        />

        {/* THANK YOU */}
        <Route path="/thanks" element={<Thanks />} />

        {/* PRODUCT DETAIL */}
        <Route
          path="/product/:id"
          element={
            <ProductDetail
              onAddToCart={addToCart}
            />
          }
        />

        {/* CHECKOUT */}
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              setCart={setCart}
            />
          }
        />
        <Route
    path="/admin/orders"
    element={<Orders />}
/>

        {/* CART PAGE */}
        <Route
          path="/cart"
          element={
            <CartSidebar
              open={true}
              cart={cart}
              onClose={() => {}}
              onRemove={(id) =>
                setCart(cart.filter((item) => item.id !== id))
              }
            />
          }
        />

        {/* OTHER PAGES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/new-drops" element={<NewDrop />} />
        <Route path="/sale" element={<Sale />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

      </Routes>

      {!isAdmin && (
        <CartSidebar
          open={cartOpen}
          cart={cart}
          onClose={() => setCartOpen(false)}
          onRemove={(id) =>
            setCart(cart.filter((item) => item.id !== id))
          }
        />
      )}

      {!isAdmin && <Footer />}
    </>
  );
}

export default App;