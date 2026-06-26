export default function CategoryFilter({ current, onChange }) {
  const categories = [
    { id: "all", label: "All ✨" },
    { id: "T-Shirts", label: "T-Shirts 👕" },
    { id: "Jeans", label: "Jeans 👖" },
    { id: "Hoodies", label: "Hoodies" },
    { id: "Streetwear", label: "Streetwear 🧥" },
    { id: "Accessories", label: "Accessories 🧢" },
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center py-8">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`px-6 py-3 rounded-full font-medium border-2 transition-all
            ${
              current === cat.id
                ? "bg-orange-500 text-black border-orange-500"
                : "border-white/30 hover:border-white"
            }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
