import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Tag } from "lucide-react";

interface Category {
  id: number;
  name: string;
  description: string;
  productCount: number;
  slug: string;
}

const emptyCategory: Omit<Category, "id"> = { name: "", description: "", productCount: 0, slug: "" };

export function Categories() {
 const [categories, setCategories] = useState<Category[]>([]);
 useEffect(() => {
  fetch("http://localhost:3000/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const formatted = data.map((item: any) => ({
        id: item.id,
        name: item.category_name,
        description: "",
        productCount: 0,
        slug: item.category_name
          .toLowerCase()
          .replace(/\s+/g, "-"),
      }));

      setCategories(formatted);
    })
    .catch((err) => console.log(err));
}, []);
  const [modal, setModal] = useState<{ open: boolean; mode: "add" | "edit"; data: Omit<Category, "id"> & { id?: number } }>({
    open: false, mode: "add", data: { ...emptyCategory },
  });
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const openAdd = () => setModal({ open: true, mode: "add", data: { ...emptyCategory } });
  const openEdit = (c: Category) => setModal({ open: true, mode: "edit", data: { ...c } });
  const closeModal = () => setModal((m) => ({ ...m, open: false }));

  const handleSave = async () => {
  if (!modal.data.name.trim()) return;

  try {
    if (modal.mode === "add") {
      await fetch(
        "http://localhost:3000/api/categories",
        {
          method: "POST",
          
          body: JSON.stringify({
            category_name: modal.data.name,
          }),
        }
      );
    } else {
      await fetch(
        `http://localhost:3000/api/categories/${modal.data.id}`,
        {
          method: "PUT",
          
          body: JSON.stringify({
            category_name: modal.data.name,
          }),
        }
      );
    }

    const res = await fetch(
      "http://localhost:3000/api/categories"
    );

    const data = await res.json();

    const formatted = data.map((item: any) => ({
      id: item.id,
      name: item.category_name,
      description: "",
      productCount: 0,
      slug: item.category_name
        .toLowerCase()
        .replace(/\s+/g, "-"),
    }));

    setCategories(formatted);

    closeModal();
  } catch (err) {
    console.log(err);
  }
};
const handleDelete = async (id: number) => {
  try {
    await fetch(
      `http://localhost:3000/api/categories/${id}`,
      {
        method: "DELETE",
      }
    );

    setCategories(
      categories.filter((c) => c.id !== id)
    );

    setDeleteConfirm(null);
  } catch (err) {
    console.log(err);
  }
};
  

  const categoryColors = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4", "#ec4899", "#84cc16"];

  return (
    <div className="flex flex-col gap-6 p-6 pt-24">  
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ color: "var(--foreground)", marginBottom: 4 }}>Categories</h1>
          <p style={{ color: "var(--muted-foreground)", fontSize: 13 }}>{categories.length} categories total</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-lg px-4 py-2 cursor-pointer transition-opacity hover:opacity-90"
          style={{ background: "var(--primary)", color: "#fff", border: "none", fontSize: 13, fontWeight: 500 }}
        >
          <Plus size={15} /> Add Category
        </button>
      </div>

      {/* Grid */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
        {categories.map((c, i) => {
          const color = categoryColors[i % categoryColors.length];
          return (
            <div
              key={c.id}
              className="rounded-lg p-5 flex flex-col gap-4"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="flex items-center justify-center rounded-lg"
                  style={{ width: 40, height: 40, background: color + "18", color }}
                >
                  <Tag size={18} />
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => openEdit(c)} className="p-1.5 rounded cursor-pointer transition-colors hover:bg-white/10" style={{ color: "var(--muted-foreground)", border: "none", background: "transparent" }}>
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => setDeleteConfirm(c.id)} className="p-1.5 rounded cursor-pointer transition-colors hover:bg-red-500/10" style={{ color: "#ef4444", border: "none", background: "transparent" }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div>
                <p style={{ color: "var(--foreground)", fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{c.name}</p>
                <p style={{ color: "var(--muted-foreground)", fontSize: 12, lineHeight: 1.5 }}>{c.description}</p>
              </div>
              <div className="flex items-center justify-between pt-2" style={{ borderTop: "1px solid var(--border)" }}>
                <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>/{c.slug}</span>
                <span
                  className="rounded-full px-2.5 py-0.5"
                  style={{ fontSize: 11, fontWeight: 500, background: color + "20", color }}
                >
                  {c.productCount} products
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="w-full max-w-md rounded-xl p-6 flex flex-col gap-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between">
              <h3 style={{ color: "var(--foreground)" }}>{modal.mode === "add" ? "Add Category" : "Edit Category"}</h3>
              <button onClick={closeModal} style={{ color: "var(--muted-foreground)", border: "none", background: "transparent", cursor: "pointer" }}><X size={18} /></button>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label: "Name", key: "name", type: "text", placeholder: "e.g. Electronics" },
                { label: "Slug", key: "slug", type: "text", placeholder: "e.g. electronics" },
                { label: "Description", key: "description", type: "text", placeholder: "Short description" },
                { label: "Product Count", key: "productCount", type: "number", placeholder: "0" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label style={{ fontSize: 12, color: "var(--muted-foreground)", fontWeight: 500 }}>{label}</label>
                  <input
                    type={type}
                    value={(modal.data as Record<string, unknown>)[key] as string}
                    placeholder={placeholder}
                    onChange={(e) => setModal((m) => ({ ...m, data: { ...m.data, [key]: type === "number" ? +e.target.value : e.target.value } }))}
                    className="rounded-lg px-3 py-2 outline-none"
                    style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: 13 }}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={closeModal} className="rounded-lg px-4 py-2 cursor-pointer" style={{ background: "var(--secondary)", color: "var(--secondary-foreground)", border: "none", fontSize: 13 }}>Cancel</button>
              <button onClick={handleSave} className="rounded-lg px-4 py-2 cursor-pointer hover:opacity-90 transition-opacity" style={{ background: "var(--primary)", color: "#fff", border: "none", fontSize: 13, fontWeight: 500 }}>
                {modal.mode === "add" ? "Add Category" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="w-full max-w-sm rounded-xl p-6 flex flex-col gap-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <h3 style={{ color: "var(--foreground)" }}>Delete Category</h3>
            <p style={{ color: "var(--muted-foreground)", fontSize: 13 }}>Deleting this category may affect products assigned to it. Continue?</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="rounded-lg px-4 py-2 cursor-pointer" style={{ background: "var(--secondary)", color: "var(--secondary-foreground)", border: "none", fontSize: 13 }}>Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="rounded-lg px-4 py-2 cursor-pointer hover:opacity-90" style={{ background: "#ef4444", color: "#fff", border: "none", fontSize: 13, fontWeight: 500 }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
