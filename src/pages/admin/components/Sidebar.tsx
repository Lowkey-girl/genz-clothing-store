import {
  LayoutDashboard,
  Package,
  Tag,
  ShoppingCart,
  Users,
  BarChart3,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import { useState } from "react";

type Page = "dashboard" | "products" | "categories" | "orders" | "users" | "reports";

interface SidebarProps {
  current: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const navItems: { page: Page; label: string; icon: React.ReactNode }[] = [
  { page: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { page: "products", label: "Products", icon: <Package size={18} /> },
  { page: "categories", label: "Categories", icon: <Tag size={18} /> },
  { page: "orders", label: "Orders", icon: <ShoppingCart size={18} /> },
  { page: "users", label: "Users", icon: <Users size={18} /> },
  { page: "reports", label: "Reports", icon: <BarChart3 size={18} /> },
];

export function Sidebar({ current, onNavigate, onLogout }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="flex flex-col h-screen sticky top-0 transition-all duration-300"
      style={{
        width: collapsed ? 64 : 220,
        background: "var(--sidebar)",
        borderRight: "1px solid var(--sidebar-border)",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-4 py-5"
        style={{ borderBottom: "1px solid var(--sidebar-border)" }}
      >
        <div
          className="flex items-center justify-center rounded-lg shrink-0"
          style={{
            width: 32,
            height: 32,
            background: "var(--primary)",
          }}
        >
          <Menu size={16} color="#fff" />
        </div>
        {!collapsed && (
          <span style={{ color: "var(--foreground)", fontWeight: 600, fontSize: 15, letterSpacing: "-0.01em" }}>
            AdminPanel
          </span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
        {navItems.map((item) => {
          const active = current === item.page;
          return (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className="flex items-center gap-3 rounded-md px-3 py-2 w-full transition-colors duration-150 cursor-pointer"
              style={{
                background: active ? "var(--sidebar-accent)" : "transparent",
                color: active ? "var(--sidebar-accent-foreground)" : "var(--sidebar-foreground)",
                fontWeight: active ? 500 : 400,
                fontSize: 13,
                outline: "none",
                border: "none",
                justifyContent: collapsed ? "center" : "flex-start",
              }}
              title={collapsed ? item.label : undefined}
            >
              <span style={{ color: active ? "var(--primary)" : "var(--sidebar-foreground)", flexShrink: 0 }}>
                {item.icon}
              </span>
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-2 pb-4 flex flex-col gap-1" style={{ borderTop: "1px solid var(--sidebar-border)", paddingTop: 12 }}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 rounded-md px-3 py-2 w-full transition-colors duration-150 cursor-pointer"
          style={{
            background: "transparent",
            color: "var(--sidebar-foreground)",
            fontSize: 13,
            outline: "none",
            border: "none",
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          <span style={{ flexShrink: 0 }}>
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </span>
          {!collapsed && <span>Collapse</span>}
        </button>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 rounded-md px-3 py-2 w-full transition-colors duration-150 cursor-pointer"
          style={{
            background: "transparent",
            color: "#ef4444",
            fontSize: 13,
            outline: "none",
            border: "none",
            justifyContent: collapsed ? "center" : "flex-start",
          }}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut size={18} style={{ flexShrink: 0 }} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
