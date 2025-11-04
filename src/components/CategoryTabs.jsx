import { useContext } from "react";
import { context } from "../App";

export default function CategoryTabs({ active, onSelect }) {
  const { providerData } = useContext(context);

  const uniqueCategories = [
    ...new Set((providerData || []).map((p) => p.category || "Unknown")),
  ];

  return (
    <div className="flex justify-around px-2 pb-3 flex-wrap">
      {uniqueCategories.map((cat, i) => (
        <button
          key={i}
          onClick={() => onSelect(cat === active ? "" : cat)}
          className={`px-4 py-2 rounded-full font-medium text-sm transition ${
            active === cat
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
