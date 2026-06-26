import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrdersTab from "../components/OrdersTab";
import WishlistTab from "../components/WishList";
import ProfileTab from "../components/Profiles";

export default function AccountDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("orders");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (!saved) navigate("/login");
    else setUser(JSON.parse(saved));
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b p-4 flex justify-between">
        <h1 className="font-bold">🔥 Gen-Z Cothing</h1>
        <button onClick={() => { localStorage.removeItem("user");
            localStorage.removeItem("user");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </header>
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-2">
          Welcome back, {user.name}
        </h2>

        {/* Tabs */}
        <div className="flex gap-6 border-b mb-6">
          {["orders", "wishlist", "profile"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 ${
                tab === t ? "border-b-4 border-indigo-500" : ""
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
        {tab === "orders" && <OrdersTab />}
        {tab === "wishlist" && <WishlistTab />}
        {tab === "profile" && <ProfileTab user={user} />}
      </div>
    </div>
  );
}
