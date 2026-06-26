import { useState, useEffect } from "react";
import { Users, Package, ShoppingCart, DollarSign, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";





const revenueData = [
  { month: "Jan", revenue: 38000, orders: 420 },
  { month: "Feb", revenue: 42000, orders: 480 },
  { month: "Mar", revenue: 51000, orders: 560 },
  { month: "Apr", revenue: 47000, orders: 510 },
  { month: "May", revenue: 63000, orders: 690 },
  { month: "Jun", revenue: 58000, orders: 640 },
  { month: "Jul", revenue: 71000, orders: 760 },
  { month: "Aug", revenue: 68000, orders: 720 },
  { month: "Sep", revenue: 79000, orders: 840 },
  { month: "Oct", revenue: 85000, orders: 910 },
  { month: "Nov", revenue: 92000, orders: 980 },
  { month: "Dec", revenue: 88000, orders: 950 },
];

const recentOrders = [
  { id: "#ORD-7821", customer: "Alicia Chen", product: "Plaid Flannel Shirt", amount: "$24.99", status: "Delivered" },
  { id: "#ORD-7820", customer: "Marcus Reid", product: "Chopped Hoodie", amount: "$25.99", status: "Processing" },
  { id: "#ORD-7819", customer: "Sofia Patel", product: "White Basic Tee", amount: "$12.99", status: "Shipped" },
  { id: "#ORD-7818", customer: "James Ortega", product: "Black Tee", amount: "$39.99", status: "Delivered" },
  { id: "#ORD-7817", customer: "Yuki Nakamura", product: "Oversized Black Tee", amount: "$15.99", status: "Pending" },
];

const statusColors: Record<string, string> = {
  Delivered: "#10b981",
  Processing: "#3b82f6",
  Shipped: "#f59e0b",
  Pending: "#64748b",
  Cancelled: "#ef4444",
};

export function Dashboard() {

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalUsers: 0,
    lowStockProducts: 0,
  });
  useEffect(() => {
    fetch("http://localhost:3000/api/dashboard")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.log(err));
  }, []);

  const dashboardCards = [
  {
    label: "Total Users",
    value: stats.totalUsers,
    icon: <Users size={20} />,
    color: "#3b82f6",
  },
  {
    label: "Total Products",
    value: stats.totalProducts,
    icon: <Package size={20} />,
    color: "#10b981",
  },
  {
    label: "Total Categories",
    value: stats.totalCategories,
    icon: <ShoppingCart size={20} />,
    color: "#f59e0b",
  },
  {
    label: "Low Stock",
    value: stats.lowStockProducts,
    icon: <DollarSign size={20} />,
    color: "#ef4444",
  },
];
  return (
    <div className="flex flex-col gap-6 p-6 pt-24">  
      <div>
        <h1 style={{ color: "var(--foreground)", marginBottom: 4 }}>Dashboard</h1>
        <p style={{ color: "var(--muted-foreground)", fontSize: 13 }}>Welcome back — here's what's happening today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        {dashboardCards.map((s) => (
          <div
            key={s.label}
            className="rounded-lg p-5 flex flex-col gap-4"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div className="flex items-center justify-between">
              <span style={{ color: "var(--muted-foreground)", fontSize: 12, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                {s.label}
              </span>
              <span
                className="flex items-center justify-center rounded-lg"
                style={{ width: 36, height: 36, background: s.color + "18", color: s.color }}
              >
                {s.icon}
              </span>
            </div>
            <div className="flex items-end justify-between">
              <span style={{ fontSize: 24, fontWeight: 600, color: "var(--foreground)", lineHeight: 1 }}>
                {s.value}
              </span>
              <span
  style={{
    fontSize: 12,
    color: s.color,
    fontWeight: 600,
  }}
>
  Live Data
</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div
        className="rounded-lg p-6"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 style={{ color: "var(--foreground)", marginBottom: 2 }}>Revenue Overview</h3>
            <p style={{ color: "var(--muted-foreground)", fontSize: 12 }}>Monthly revenue for 2024</p>
          </div>
          <span style={{ fontSize: 20, fontWeight: 600, color: "var(--foreground)" }}>$881,290</span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ background: "#1e2740", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 12, color: "#e2e8f0" }}
              formatter={(value: any) => {
                if (value == null) return ["", "Revenue"];
                const num = typeof value === "number" ? value : Number(value);
                if (Number.isNaN(num)) return [String(value), "Revenue"];
                return [`$${num.toLocaleString()}`, "Revenue"];
              }}
            />
            <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fill="url(#colorRevenue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent orders */}
      <div
        className="rounded-lg"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <h3 style={{ color: "var(--foreground)" }}>Recent Orders</h3>
          <button
            className="flex items-center gap-1 rounded-md px-3 py-1.5 transition-colors cursor-pointer"
            style={{ fontSize: 12, color: "var(--primary)", background: "var(--primary)18", border: "none", outline: "none" }}
          >
            View all <ArrowRight size={12} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Order ID", "Customer", "Product", "Amount", "Status"].map((h) => (
                  <th key={h} className="text-left px-6 py-3" style={{ fontSize: 11, color: "var(--muted-foreground)", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} style={{ borderBottom: "1px solid var(--border)" }} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-6 py-3" style={{ fontSize: 13, color: "var(--primary)", fontWeight: 500 }}>{o.id}</td>
                  <td className="px-6 py-3" style={{ fontSize: 13, color: "var(--foreground)" }}>{o.customer}</td>
                  <td className="px-6 py-3" style={{ fontSize: 13, color: "var(--muted-foreground)" }}>{o.product}</td>
                  <td className="px-6 py-3" style={{ fontSize: 13, color: "var(--foreground)", fontWeight: 500 }}>{o.amount}</td>
                  <td className="px-6 py-3">
                    <span
                      className="rounded-full px-2.5 py-0.5"
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        background: (statusColors[o.status] || "#64748b") + "20",
                        color: statusColors[o.status] || "#64748b",
                      }}
                    >
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
