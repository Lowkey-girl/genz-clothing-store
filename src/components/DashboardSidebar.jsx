export default function DashboardSidebar({ tab, setTab }) {
  const link = (name) =>
    `block px-4 py-3 rounded-lg mb-2 ${
      tab === name ? "bg-indigo-500" : "hover:bg-white/10"
    }`;
  return (
    <aside className="w-64 bg-neutral-900 p-6">
      <h2 className="font-bold text-xl mb-6">👤 My Account</h2>
      <button className={link("profile")} onClick={() => setTab("profile")}>Profile</button>
      <button className={link("orders")} onClick={() => setTab("orders")}>Orders</button>
      <button className={link("wishlist")} onClick={() => setTab("wishlist")}>Wishlist</button>
      <button className="mt-8 text-red-400" onClick={() => {localStorage.removeItem("user"); window.location.href = "/login";}}>Logout</button>
    </aside>
  );
}
