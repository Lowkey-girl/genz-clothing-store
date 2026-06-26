import { Search, Shield, User as UserIcon, Plus, Pencil, Trash2, X } from "lucide-react";
import { useState, useEffect } from "react";

const avatarColors = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ef4444",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
];

const roleConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  Admin: { color: "#8b5cf6", icon: <Shield size={11} /> },
  Moderator: { color: "#f59e0b", icon: <Shield size={11} /> },
  Customer: { color: "#3b82f6", icon: <UserIcon size={11} /> },
};

export function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

const [form, setForm] = useState({
  username: "",
  email: "",
  password: "",
  role: "customer",
});

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((data) => {
  console.log("API DATA:", data);
  setUsers(data);
})
      .catch((err) => console.log(err));
  }, []);
  const openEdit = (user: any) => {
  setEditingId(user.id);

  setForm({
    username: user.username,
    email: user.email,
    password: "",
    role: user.role || "user",
  });

  setModal(true);
};

  const filtered = users.filter(
    (u) =>
      u.username?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddUser = async () => {
  try {

    if (editingId) {

      await fetch(
        `http://localhost:3000/api/users/${editingId}`,
        {
          method: "PUT",
          
          body: JSON.stringify({
            username: form.username,
            email: form.email,
            role: form.role,
          }),
        }
      );

    } else {

      await fetch(
        "http://localhost:3000/api/users",
        {
          method: "POST",
          
          body: JSON.stringify(form),
        }
      );

    }

    window.location.reload();

  } catch (err) {
    console.log(err);
  }
};

const handleDeleteUser = async (id: number) => {

  if (!window.confirm("Delete this user?")) return;

  try {

    await fetch(
      `http://localhost:3000/api/users/${id}`,
      {
        method: "DELETE",
      }
    );

    setUsers(
      users.filter((u) => u.id !== id)
    );

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="flex flex-col gap-6 p-6 pt-24">
      <div>
        <h1 style={{ color: "var(--foreground)", marginBottom: 4 }}>
          Users
        </h1>
        <p style={{ color: "var(--muted-foreground)", fontSize: 13 }}>
          {users.length} registered users
        </p>
      </div>

      <div
        className="flex items-center gap-2 rounded-lg px-3 py-2"
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
        }}
      >
        <Search size={14} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search username or email..."
          className="flex-1 bg-transparent outline-none"
        />
      </div>

      <button
  onClick={() => setModal(true)}
  className="flex items-center gap-2 rounded-lg px-4 py-2 cursor-pointer"
  style={{
    background: "#3b82f6",
    color: "white",
    border: "none",
  }}
>
  <Plus size={15} />
  Add User
</button>

{modal && (
  <div
    className="fixed inset-0 flex items-center justify-center"
    style={{ background: "rgba(0,0,0,0.7)" }}
  >
    <div
      className="p-6 rounded-lg w-[400px]"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2>Add User</h2>

        <button onClick={() => setModal(false)}>
          <X size={18} />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <select
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
        </select>

        <button
          onClick={handleAddUser}
          className="mt-2 rounded-lg px-4 py-2"
          style={{
            background: "#3b82f6",
            color: "white",
          }}
        >
          Save User
        </button>
      </div>
    </div>
  </div>
)}


      <div
        className="rounded-lg overflow-hidden"
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <th className="text-left px-5 py-3">User</th>
                <th className="text-left px-5 py-3">Email</th>
                <th className="text-left px-5 py-3">Role</th>
                <th className="text-left px-5 py-3">Created</th>
<th className="text-left px-5 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((u) => {
                const avatarColor =
                  avatarColors[u.id % avatarColors.length];

                const roleName =
                  u.role?.charAt(0).toUpperCase() +
                  u.role?.slice(1).toLowerCase();

                const role =
                  roleConfig[roleName] || roleConfig["Customer"];

                return (
                  <tr key={u.id}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex items-center justify-center rounded-full"
                          style={{
                            width: 34,
                            height: 34,
                            background: avatarColor + "25",
                            color: avatarColor,
                          }}
                        >
                          {u.username?.substring(0, 2).toUpperCase()}
                        </div>

                        <div>
                          <p>{u.username}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-3">{u.email}</td>

                    <td className="px-5 py-3">
                      <span
                        className="flex items-center gap-1.5 rounded-full px-2.5 py-0.5 w-fit"
                        style={{
                          background: role.color + "20",
                          color: role.color,
                        }}
                      >
                        {role.icon}
                        {roleName}
                      </span>
                    </td>

                    <td className="px-5 py-3">
  {new Date(u.created_at).toLocaleDateString()}
</td>

<td className="px-5 py-3">
  <div className="flex gap-2">
    <button onClick={() => openEdit(u)}>
      <Pencil size={16} />
    </button>

    <button
      onClick={() => handleDeleteUser(u.id)}
      style={{ color: "#ef4444" }}
    >
      <Trash2 size={16} />
    </button>
  </div>
</td>


                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-5">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}