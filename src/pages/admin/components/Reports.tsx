import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { TrendingUp, DollarSign, ShoppingCart, Package } from "lucide-react";

const monthlySales = [
  { month: "Jan", sales: 38200, orders: 420 },
  { month: "Feb", sales: 42100, orders: 481 },
  { month: "Mar", sales: 51400, orders: 562 },
  { month: "Apr", sales: 47300, orders: 514 },
  { month: "May", sales: 63800, orders: 692 },
  { month: "Jun", sales: 58700, orders: 641 },
  { month: "Jul", sales: 71200, orders: 763 },
  { month: "Aug", sales: 68500, orders: 725 },
  { month: "Sep", sales: 79400, orders: 844 },
  { month: "Oct", sales: 85100, orders: 912 },
  { month: "Nov", sales: 92400, orders: 984 },
  { month: "Dec", sales: 88100, orders: 952 },
];

const bestSellers: Array<{ name: string; price: number; category: string; image: string; units: number; revenue?: number }> = [
  { name: "Classic Blue Jeans", price: 37.99, category: "Jeans", image: "jeans4.jpg", units: 1284 },
  { name: "Camo Cargo Pants", price: 29.99, category: "Streetwear", image: "street6.jpg", units: 984 },
  { name: "Plaid Flannel Shirt", price: 24.99, category: "Streetwear", image: "street2.jpg", units: 812 },
  { name: "Denim Jacket", price: 49.99, category: "Streetwear", image: "street7.jpg", units: 642 },
  { name: "Hooded Sweatshirt", price: 34.99, category: "Streetwear", image: "street4.jpg", units: 721 },
];

// add revenue field derived from price * units for table calculations
for (const p of bestSellers) {
  // round revenue to nearest integer cents -> dollars
  // ensure revenue property exists for usage in table
  p.revenue = Math.round(p.price * p.units);
}

const categoryRevenue = [
  { name: "T-shirts", value: 42, color: "#3b82f6" },
  { name: "Jeans", value: 18, color: "#10b981" },
  { name: "Streetwear", value: 14, color: "#f59e0b" },
  { name: "Accessories", value: 12, color: "#8b5cf6" },
  { name: "Other", value: 8, color: "#ef4444" },
];

const summaryStats = [
  { label: "Total Revenue", value: "$881,290", sub: "FY 2024", icon: <DollarSign size={18} />, color: "#3b82f6" },
  { label: "Total Orders", value: "8,490", sub: "FY 2024", icon: <ShoppingCart size={18} />, color: "#10b981" },
  { label: "Best Month", value: "November", sub: "$92,400", icon: <TrendingUp size={18} />, color: "#f59e0b" },
  { label: "Top Product", value: "Smart Watch X", sub: "1,284 units", icon: <Package size={18} />, color: "#8b5cf6" },
];

const tooltipStyle = { background: "#1e2740", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 12, color: "#e2e8f0" };

export function Reports() {
  return (
    <div className="flex flex-col gap-6 p-6 pt-24">  
      <div>
        <h1 style={{ color: "var(--foreground)", marginBottom: 4 }}>Reports</h1>
        <p style={{ color: "var(--muted-foreground)", fontSize: 13 }}>Sales analytics and performance for FY 2024</p>
      </div>

      {/* Summary */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        {summaryStats.map((s) => (
          <div key={s.label} className="rounded-lg p-5 flex flex-col gap-3" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 12, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{s.label}</span>
              <span className="flex items-center justify-center rounded-lg" style={{ width: 34, height: 34, background: s.color + "18", color: s.color }}>{s.icon}</span>
            </div>
            <div>
              <p style={{ fontSize: 20, fontWeight: 600, color: "var(--foreground)", lineHeight: 1.2 }}>{s.value}</p>
              <p style={{ fontSize: 12, color: "var(--muted-foreground)", marginTop: 2 }}>{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly sales chart */}
      <div className="rounded-lg p-6" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <h3 style={{ color: "var(--foreground)", marginBottom: 4 }}>Monthly Sales</h3>
        <p style={{ color: "var(--muted-foreground)", fontSize: 12, marginBottom: 24 }}>Revenue and order volume by month</p>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlySales} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v: any) => (typeof v === "number" ? [`$${v.toLocaleString()}`, "Revenue"] : ["$0", "Revenue"]) } />
            <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Order trend + Category breakdown */}
      <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        <div className="rounded-lg p-6" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h3 style={{ color: "var(--foreground)", marginBottom: 4 }}>Monthly Orders</h3>
          <p style={{ color: "var(--muted-foreground)", fontSize: 12, marginBottom: 24 }}>Order volume trend</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlySales} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: any) => [typeof v === 'number' ? v : 0, "Orders"]} />
              <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg p-6" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h3 style={{ color: "var(--foreground)", marginBottom: 4 }}>Revenue by Category</h3>
          <p style={{ color: "var(--muted-foreground)", fontSize: 12, marginBottom: 16 }}>Breakdown of revenue by product category</p>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie data={categoryRevenue} cx="50%" cy="50%" innerRadius={42} outerRadius={62} dataKey="value" strokeWidth={0}>
                  {categoryRevenue.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2 flex-1">
              {categoryRevenue.map((c) => (
                <div key={c.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full" style={{ width: 8, height: 8, background: c.color, display: "inline-block", flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{c.name}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 500, color: "var(--foreground)" }}>{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Best sellers */}
      <div className="rounded-lg overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="px-6 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <h3 style={{ color: "var(--foreground)" }}>Best Selling Products</h3>
          <p style={{ color: "var(--muted-foreground)", fontSize: 12, marginTop: 2 }}>Top products by units sold in FY 2024</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Rank", "Product", "Units Sold", "Revenue", "Share"].map((h) => (
                  <th key={h} className="text-left px-5 py-3" style={{ fontSize: 11, color: "var(--muted-foreground)", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bestSellers.map((p, i) => {
                const maxRevenue = Math.max(...bestSellers.map((b) => b.revenue || 0));
                const share = ((p.revenue! / bestSellers.reduce((a, b) => a + (b.revenue || 0), 0)) * 100).toFixed(1);
                return (
                  <tr key={p.name} style={{ borderBottom: "1px solid var(--border)" }} className="transition-colors hover:bg-white/[0.02]">
                    <td className="px-5 py-3">
                      <span
                        className="flex items-center justify-center rounded-full"
                        style={{ width: 24, height: 24, fontSize: 11, fontWeight: 600, background: i === 0 ? "#f59e0b20" : "var(--secondary)", color: i === 0 ? "#f59e0b" : "var(--muted-foreground)" }}
                      >
                        {i + 1}
                      </span>
                    </td>
                    <td className="px-5 py-3" style={{ fontSize: 13, color: "var(--foreground)", fontWeight: 500 }}>{p.name}</td>
                    <td className="px-5 py-3" style={{ fontSize: 13, color: "var(--foreground)" }}>{p.units.toLocaleString()}</td>
                    <td className="px-5 py-3" style={{ fontSize: 13, color: "var(--foreground)", fontWeight: 500 }}>${(p.revenue ?? 0).toLocaleString()}</td>
                    <td className="px-5 py-3" style={{ width: 160 }}>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 rounded-full overflow-hidden" style={{ height: 6, background: "var(--secondary)" }}>
                          <div style={{ width: `${((p.revenue || 0) / maxRevenue) * 100}%`, height: "100%", background: "#3b82f6", borderRadius: 99 }} />
                        </div>
                        <span style={{ fontSize: 11, color: "var(--muted-foreground)", minWidth: 32 }}>{share}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
