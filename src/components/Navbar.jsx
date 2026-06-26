import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar({ cartCount = 0, onCartClick }) {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Optional: scroll effect
  window.addEventListener("scroll", () => { setScrolled(window.scrollY > 10);});
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "New Drops", path: "/new-drops" },
    { label: "Trending", path: "/trending" },
    { label: "Discount", path: "/sale" }
  ];

  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className={`fixed top-0 bg-white dark:bg-black border-b border-black/10 dark:border-white/10 left-0 right-0 z-40 backdrop-blur-md border-b transition-all duration-300 ${ scrolled ? "bg-black/80" : "bg-black/60" }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 blob flex items-center justify-center bg-orange-500">
              <span className="text-xl">🔥</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">
              Gen-Z Clothing
            </span>
          </div>
          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-white">
            {navItems.map((item) => (
              <div key={item.path} className="relative">
                <button 
                  onClick={() => navigate(item.path)} 
                  className={`nav-link relative font-medium transition-colors duration-300 ${
                    isActive(item.path) ? "text-orange-500" : "hover:text-orange-500"
                  }`}
                >
                  {item.label}
                </button>
                {/* Active Underline */}
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full"></div>
                )}
              </div>
            ))}
          </div>
          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <button onClick={onCartClick} className="relative p-2 rounded-full transition-all duration-300 hover:scale-110 text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              {/* Cart Badge */}
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center bg-orange-500 text-black">
                {cartCount}
              </span>
            </button>
            
            {/* Auth Links */}
            {user ? (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate(user.role === "admin" ? "/admin" : "/account")}
                  className="text-white hover:text-orange-500 transition"
                >
                {user.role === "admin"
  ? "📊 Admin"
  : `👤 ${user.username}`}
                </button>
                <button 
                  onClick={handleLogout}
                  className="px-3 py-1 bg-orange-500 text-black rounded font-medium hover:bg-orange-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate("/login")}
                  className="text-white hover:text-orange-500 transition"
                >
                  Login
                </button>
                <button 
                  onClick={() => navigate("/register")}
                  className="px-3 py-1 bg-orange-500 text-black rounded font-medium hover:bg-orange-600 transition"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
