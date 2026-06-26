import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import Profile from "../components/Profiles";
import Orders from "../components/Orders";
import Wishlist from "../components/WishList";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("profile");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) navigate("/login");
    else setUser(JSON.parse(savedUser));
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white flex">
      <DashboardSidebar tab={tab} setTab={setTab} />

      <main className="flex-1 p-8">
        {tab === "profile" && <Profile user={user} />}
        {tab === "orders" && <Orders />}
        {tab === "wishlist" && <Wishlist />}
      </main>
    </div>
  );
}
