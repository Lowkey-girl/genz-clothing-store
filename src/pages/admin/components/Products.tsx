import { useState, useEffect } from "react";
import {
  Plus, Pencil, Trash2, Search, X,
  ChevronUp, ChevronDown, Images, ChevronLeft, ChevronRight,
} from "lucide-react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  images: string[];
}

// ─────────────────────────────────────────────
// Mock data — replace with real API calls
// ────────────────────────────────────────────

const categories = ["All", "T-Shirts", "Jeans", "Streetwear", "Accessories"];


const emptyProduct: Omit<Product, "id"> = {
  name: "",
  category: "T-Shirts",
  price: 0,
  stock: 0,
  status: "Active",
  images: [],
};

// ─────────────────────────────────────────────
// Image Gallery Modal — shows all product images
// with prev/next navigation
// ─────────────────────────────────────────────

function ImageGallery({ images, productName, onClose }: {
  images: string[];
  productName: string;
  onClose: () => void;
}) {
  // Track which image is currently shown
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={onClose} // clicking the backdrop closes the gallery
    >
      <div
        className="w-full max-w-2xl rounded-xl overflow-hidden flex flex-col"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        onClick={(e) => e.stopPropagation()} // prevent backdrop click from bubbling
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div>
            <h3 style={{ color: "var(--foreground)", margin: 0 }}>{productName}</h3>
            <p style={{ color: "var(--muted-foreground)", fontSize: 12, marginTop: 2 }}>
              Image {current + 1} of {images.length}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ color: "var(--muted-foreground)", border: "none", background: "transparent", cursor: "pointer" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Main image */}
        <div className="relative flex items-center justify-center" style={{ background: "#0a0d14", height: 400 }}>
          <img
            src={images[current]}
            alt={`${productName} — image ${current + 1}`}
            style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
          />

          {/* Prev/Next arrows — only shown when there are multiple images */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 flex items-center justify-center rounded-full cursor-pointer transition-opacity hover:opacity-80"
                style={{ width: 36, height: 36, background: "rgba(0,0,0,0.6)", border: "1px solid var(--border)", color: "#fff" }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 flex items-center justify-center rounded-full cursor-pointer transition-opacity hover:opacity-80"
                style={{ width: 36, height: 36, background: "rgba(0,0,0,0.6)", border: "1px solid var(--border)", color: "#fff" }}
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 px-5 py-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="rounded-lg overflow-hidden shrink-0 cursor-pointer transition-opacity"
                style={{
                  width: 64,
                  height: 64,
                  border: i === current ? "2px solid var(--primary)" : "2px solid transparent",
                  padding: 0,
                  background: "transparent",
                  opacity: i === current ? 1 : 0.5,
                }}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Image URL input list — used inside Add/Edit modal
// Lets the user type in multiple image URLs
// ─────────────────────────────────────────────

function ImageUrlList({
  images,
  onChange,
}: {
  images: string[];
  onChange: (imgs: string[]) => void;
}) {
  const addSlot = () => onChange([...images, ""]);
  const removeSlot = (i: number) => onChange(images.filter((_, idx) => idx !== i));
  const updateSlot = (i: number, val: string) =>
    onChange(images.map((img, idx) => (idx === i ? val : img)));

  return (
    <div className="flex flex-col gap-2">
      {images.map((url, i) => (
        <div key={i} className="flex gap-2 items-center">
          {/* Preview thumbnail if URL is not empty */}
          {url ? (
            <img
              src={url}
              alt=""
              style={{ width: 36, height: 36, objectFit: "cover", borderRadius: 6, flexShrink: 0, background: "var(--secondary)" }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          ) : (
            <div style={{ width: 36, height: 36, borderRadius: 6, background: "var(--secondary)", flexShrink: 0 }} />
          )}
          <input
            type="url"
            value={url}
            placeholder="https://example.com/image.jpg"
            onChange={(e) => updateSlot(i, e.target.value)}
            className="flex-1 rounded-lg px-3 py-2 outline-none"
            style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: 12, minWidth: 0 }}
          />
          <button
            type="button"
            onClick={() => removeSlot(i)}
            style={{ color: "#ef4444", border: "none", background: "transparent", cursor: "pointer", flexShrink: 0 }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addSlot}
        className="flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer transition-opacity hover:opacity-80"
        style={{ background: "var(--secondary)", color: "var(--muted-foreground)", border: "1px dashed var(--border)", fontSize: 12, outline: "none" }}
      >
        <Plus size={13} /> Add image URL
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// Sortable column header icon helper
// ─────────────────────────────────────────────

function SortIcon({ field, sortField, sortDir }: { field: keyof Product; sortField: keyof Product; sortDir: "asc" | "desc" }) {
  if (sortField !== field) return null;
  return sortDir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />;
}

// ─────────────────────────────────────────────
// Main Products Page
// ─────────────────────────────────────────────

export function Products() {
const [categories, setCategories] = useState([]);
const [products, setProducts] = useState<Product[]>([]);

useEffect(() => {
  fetch("http://localhost:3000/api/categories")
    .then((res) => res.json())
    .then((data) => {
      setCategories(
        data.map((item: any) => ({
          id: item.id,
          name: item.category_name,
          slug: item.category_name.toLowerCase(),
          products: 0,
        }))
      );
    });
}, []);

useEffect(() => {
  fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => {
      const formattedProducts = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        category: item.category_name,
        price: Number(item.price),
        stock: Number(item.stock),
status: item.stock > 0 ? "Active" : "Inactive",

        images: item.image
          ? [`http://localhost:5173/upload/${item.image}`]
          : [],
      }));

      setProducts(formattedProducts);
    })
    .catch((err) => console.log(err));
}, []);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Modal state: "add" creates a new product, "edit" updates an existing one
  const [modal, setModal] = useState<{
    open: boolean;
    mode: "add" | "edit";
    data: Omit<Product, "id"> & { id?: number };
  }>({ open: false, mode: "add", data: { ...emptyProduct } });

  // id of the product awaiting delete confirmation (null = no dialog open)
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // Gallery state: product whose images are displayed in the lightbox
  const [gallery, setGallery] = useState<Product | null>(null);

  // Sorting
  const [sortField, setSortField] = useState<keyof Product>("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  // ── Helpers ──────────────────────────────

  const openAdd = () => setModal({ open: true, mode: "add", data: { ...emptyProduct } });
  const openEdit = (p: Product) => setModal({ open: true, mode: "edit", data: { ...p } });
  const closeModal = () => setModal((m) => ({ ...m, open: false }));

  const handleSave = async () => {
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
      `http://localhost:3000/api/products/${id}`,
      {
        method: "DELETE",
      }
    );

    setProducts(
      products.filter((p) => p.id !== id)
    );

    setDeleteConfirm(null);
  } catch (err) {
    console.log(err);
  }
};

  const toggleSort = (field: keyof Product) => {
    if (sortField === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("asc"); }
  };

  // Apply search, category filter, and sort
  const filtered = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => categoryFilter === "All" || p.category === categoryFilter)
    .sort((a, b) => {
      const av = a[sortField];
      const bv = b[sortField];
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });

  // ── Render ───────────────────────────────

  return (
    <div className="flex flex-col gap-6 p-6 pt-24">  

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ color: "var(--foreground)", marginBottom: 4 }}>Products</h1>
          <p style={{ color: "var(--muted-foreground)", fontSize: 13 }}>{products.length} products total</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-lg px-4 py-2 cursor-pointer transition-opacity hover:opacity-90"
          style={{ background: "var(--primary)", color: "#fff", border: "none", fontSize: 13, fontWeight: 500 }}
        >
          <Plus size={15} /> Add Product
        </button>
      </div>

      {/* Search + category filter bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-2"
          style={{ background: "var(--card)", border: "1px solid var(--border)", flex: "1 1 200px", minWidth: 0 }}
        >
          <Search size={14} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            className="flex-1 bg-transparent outline-none"
            style={{ fontSize: 13, color: "var(--foreground)", minWidth: 0 }}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
  key="All"
  onClick={() => setCategoryFilter("All")}
>
  All
</button>

{categories.map((c) => (
  <button
    key={c.id}
    onClick={() => setCategoryFilter(c.name)}
  >
    {c.name}
  </button>
))}
        </div>
      </div>

      {/* Product table */}
      <div className="rounded-lg overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {/* Column headers — clicking toggles sort direction */}
                {(
                  [
                    ["id", "#"],
                    ["name", "Name"],
                    ["category", "Category"],
                    ["price", "Price"],
                    ["stock", "Stock"],
                    ["status", "Status"],
                  ] as [keyof Product, string][]
                ).map(([f, label]) => (
                  <th
                    key={f}
                    onClick={() => toggleSort(f)}
                    className="text-left px-5 py-3 cursor-pointer select-none"
                    style={{ fontSize: 11, color: "var(--muted-foreground)", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", whiteSpace: "nowrap" }}
                  >
                    <span className="flex items-center gap-1">
                      {label}
                      <SortIcon field={f} sortField={sortField} sortDir={sortDir} />
                    </span>
                  </th>
                ))}
                {/* "Images" and "Actions" columns are not sortable */}
                <th className="text-left px-5 py-3" style={{ fontSize: 11, color: "var(--muted-foreground)", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>Images</th>
                <th className="text-left px-5 py-3" style={{ fontSize: 11, color: "var(--muted-foreground)", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  style={{ borderBottom: "1px solid var(--border)" }}
                  className="transition-colors hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-3" style={{ fontSize: 13, color: "var(--muted-foreground)" }}>{p.id}</td>

                  {/* Thumbnail + name */}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {p.images.length > 0 ? (
                        <img
                          src={p.images[0]}
  alt={p.name}
                          style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 6, flexShrink: 0, background: "var(--secondary)" }}
                        />
                      ) : (
                        // Placeholder when no images are set
                        <div
                          className="flex items-center justify-center rounded-md shrink-0"
                          style={{ width: 40, height: 40, background: "var(--secondary)", color: "var(--muted-foreground)" }}
                        >
                          <Images size={16} />
                        </div>
                      )}
                      <span style={{ fontSize: 13, color: "var(--foreground)", fontWeight: 500 }}>{p.name}</span>
                    </div>
                  </td>

                  <td className="px-5 py-3" style={{ fontSize: 13, color: "var(--muted-foreground)" }}>{p.category}</td>
                  <td className="px-5 py-3" style={{ fontSize: 13, color: "var(--foreground)" }}>${p.price.toFixed(2)}</td>

                  {/* Stock — color-coded: red = 0, yellow = low, white = ok */}
                  <td className="px-5 py-3">
                    <span style={{ fontSize: 13, color: p.stock === 0 ? "#ef4444" : p.stock < 20 ? "#f59e0b" : "var(--foreground)" }}>
                      {p.stock}
                    </span>
                  </td>

                  <td className="px-5 py-3">
                    <span
                      className="rounded-full px-2.5 py-0.5"
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        background: p.status === "Active" ? "#10b98120" : "#64748b20",
                        color: p.status === "Active" ? "#10b981" : "#64748b",
                      }}
                    >
                      {p.status}
                    </span>
                  </td>

                  {/* Image count badge — clicking opens the gallery */}
                  <td className="px-5 py-3">
                    <button
                      onClick={() => p.images.length > 0 && setGallery(p)}
                      disabled={p.images.length === 0}
                      className="flex items-center gap-1.5 rounded-full px-2.5 py-0.5 cursor-pointer transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-80"
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        background: p.images.length > 0 ? "#3b82f620" : "var(--secondary)",
                        color: p.images.length > 0 ? "#3b82f6" : "var(--muted-foreground)",
                        border: "none",
                      }}
                    >
                      <Images size={11} />
                      {p.images.length} photo{p.images.length !== 1 ? "s" : ""}
                    </button>
                  </td>

                  {/* Edit + Delete actions */}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="p-1.5 rounded cursor-pointer transition-colors hover:bg-white/10"
                        style={{ color: "var(--muted-foreground)", border: "none", background: "transparent" }}
                        title="Edit product"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(p.id)}
                        className="p-1.5 rounded cursor-pointer transition-colors hover:bg-red-500/10"
                        style={{ color: "#ef4444", border: "none", background: "transparent" }}
                        title="Delete product"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Empty state */}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center" style={{ color: "var(--muted-foreground)", fontSize: 13 }}>
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Image gallery lightbox ──────────────────────── */}
      {gallery && (
        <ImageGallery
          images={gallery.images}
          productName={gallery.name}
          onClose={() => setGallery(null)}
        />
      )}

      {/* ── Add / Edit Modal ───────────────────────────── */}
      {modal.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)" }}
        >
          <div
            className="w-full max-w-md rounded-xl flex flex-col overflow-hidden"
            style={{ background: "var(--card)", border: "1px solid var(--border)", maxHeight: "90vh" }}
          >
            {/* Modal header */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: "1px solid var(--border)", flexShrink: 0 }}
            >
              <h3 style={{ color: "var(--foreground)", margin: 0 }}>
                {modal.mode === "add" ? "Add Product" : "Edit Product"}
              </h3>
              <button
                onClick={closeModal}
                style={{ color: "var(--muted-foreground)", border: "none", background: "transparent", cursor: "pointer" }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable form body */}
            <div className="flex-1 overflow-y-auto px-6 py-5" style={{ scrollbarWidth: "none" }}>
              <div className="flex flex-col gap-4">

                {/* Text / number fields */}
                {[
                  { label: "Name", key: "name", type: "text" },
                  { label: "Price ($)", key: "price", type: "number" },
                  { label: "Stock", key: "stock", type: "number" },
                ].map(({ label, key, type }) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <label style={{ fontSize: 12, color: "var(--muted-foreground)", fontWeight: 500 }}>{label}</label>
                    <input
                      type={type}
                      value={(modal.data as Record<string, unknown>)[key] as string}
                      onChange={(e) =>
                        setModal((m) => ({
                          ...m,
                          data: { ...m.data, [key]: type === "number" ? +e.target.value : e.target.value },
                        }))
                      }
                      className="rounded-lg px-3 py-2 outline-none"
                      style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: 13 }}
                    />
                  </div>
                ))}

                {/* Category dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label style={{ fontSize: 12, color: "var(--muted-foreground)", fontWeight: 500 }}>Category</label>
                  <select
                    value={modal.data.category}
                    onChange={(e) => setModal((m) => ({ ...m, data: { ...m.data, category: e.target.value } }))}
                    className="rounded-lg px-3 py-2 outline-none"
                    style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: 13 }}
                  >
                    {categories.map((c) => (
  <option key={c.id} value={c.name}>
    {c.name}
  </option>
))}
                  </select>
                </div>

                {/* Status dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label style={{ fontSize: 12, color: "var(--muted-foreground)", fontWeight: 500 }}>Status</label>
                  <select
                    value={modal.data.status}
                    onChange={(e) => setModal((m) => ({ ...m, data: { ...m.data, status: e.target.value as "Active" | "Inactive" } }))}
                    className="rounded-lg px-3 py-2 outline-none"
                    style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: 13 }}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Multi-image URL inputs */}
                <div className="flex flex-col gap-1.5">
                  <label style={{ fontSize: 12, color: "var(--muted-foreground)", fontWeight: 500 }}>
                    Product Images <span style={{ fontWeight: 400 }}>(paste image URLs)</span>
                  </label>
                  <ImageUrlList
                    images={modal.data.images}
                    onChange={(imgs) => setModal((m) => ({ ...m, data: { ...m.data, images: imgs } }))}
                  />
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div
              className="flex gap-3 justify-end px-6 py-4"
              style={{ borderTop: "1px solid var(--border)", flexShrink: 0 }}
            >
              <button
                onClick={closeModal}
                className="rounded-lg px-4 py-2 cursor-pointer"
                style={{ background: "var(--secondary)", color: "var(--secondary-foreground)", border: "none", fontSize: 13 }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="rounded-lg px-4 py-2 cursor-pointer hover:opacity-90 transition-opacity"
                style={{ background: "var(--primary)", color: "#fff", border: "none", fontSize: 13, fontWeight: 500 }}
              >
                {modal.mode === "add" ? "Add Product" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete confirmation dialog ─────────────────── */}
      {deleteConfirm !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)" }}
        >
          <div
            className="w-full max-w-sm rounded-xl p-6 flex flex-col gap-5"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <h3 style={{ color: "var(--foreground)" }}>Delete Product</h3>
            <p style={{ color: "var(--muted-foreground)", fontSize: 13 }}>
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="rounded-lg px-4 py-2 cursor-pointer"
                style={{ background: "var(--secondary)", color: "var(--secondary-foreground)", border: "none", fontSize: 13 }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="rounded-lg px-4 py-2 cursor-pointer hover:opacity-90"
                style={{ background: "#ef4444", color: "#fff", border: "none", fontSize: 13, fontWeight: 500 }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
