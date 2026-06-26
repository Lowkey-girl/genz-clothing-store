export default function DashboardView() {
  return (
    <>
      <header className="border-b border-white/10 px-8 py-6">
        <h2 className="text-3xl font-bold">Dashboard Overview</h2>
        <p className="opacity-60">Welcome back, admin 👋</p>
      </header>

      <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Products" value="12" emoji="📦" />
        <StatCard title="Revenue" value="$2,450" emoji="💰" />
        <StatCard title="Orders" value="34" emoji="🛒" />
        <StatCard title="Low Stock" value="3" emoji="⚠️" />
      </div>
    </>
  );
}

function StatCard({ title, value, emoji }) {
  return (
    <div className="bg-neutral-900 p-6 rounded-xl hover:-translate-y-1 transition">
      <div className="text-3xl mb-2">{emoji}</div>
      <p className="opacity-60">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
             // 🌿 ECO-FRIENDLY