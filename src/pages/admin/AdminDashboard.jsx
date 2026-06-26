import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { Products } from "./components/Products";
import Orders from "./components/Orders";
import { Reports } from "./components/Reports";
import { Categories } from "./components/Categories";
import { Users } from "./components/Users";

export default function AdminDashboard() {
    const [view, setView] = useState("dashboard");

    return (
        <div className="h-screen flex overflow-hidden bg-black text-white">
            <Sidebar current={view} onNavigate={setView} onLogout={() => {}} />

            <main className="flex-1 overflow-auto p-8">
                {view === "dashboard" && <Dashboard />}
                {view === "products" && <Products />}
                {view === "orders" && <Orders />}
                {view === "reports" && <Reports />}
                {view === "categories" && <Categories />}
                {view === "users" && <Users />}
            </main>
        </div>
    );
}