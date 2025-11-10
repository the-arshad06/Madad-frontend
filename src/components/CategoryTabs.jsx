// CategoryTabs.jsx - REVISED PROFESSIONAL STYLING
import { useContext } from "react";
import { context } from "../App";
import { Wrench, Zap, Paintbrush, Hammer, HelpCircle } from "lucide-react";

export default function CategoryTabs({ active, onSelect }) {
  const { providerData } = useContext(context);

  const uniqueCategories = [
    ...new Set((providerData || []).map((p) => p.category || "Unknown")),
  ];

  const categoryIcons = {
    Plumber: <Wrench size={16} className="mr-2" />,
    Electrician: <Zap size={16} className="mr-2" />,
    Painter: <Paintbrush size={16} className="mr-2" />,
    Carpenter: <Hammer size={16} className="mr-2" />,
    Maid: <Wrench size={16} className="mr-2" />,
    Unknown: <HelpCircle size={16} className="mr-2" />,
  };

  return (
    // Ensured classes for horizontal scroll, fixed width for smooth scrolling
    <div className="flex overflow-x-auto space-x-3 pb-2 -mx-4 px-4 md:mx-0 md:px-0"> 
      {uniqueCategories.map((cat, i) => {
        const normalized =
          cat?.charAt(0).toUpperCase() + cat?.slice(1)?.toLowerCase() ||
          "Unknown";
        const Icon = categoryIcons[normalized] || categoryIcons.Unknown;

        const isActive = active === cat;

        return (
          <button
            key={i}
            onClick={() => onSelect(isActive ? "" : cat)}
            // ENHANCED PROFESSIONAL STYLING
            className={`
              flex-shrink-0 flex items-center whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold 
              transition-all duration-300 shadow-md group-hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500
              ${
                isActive
                  // Active: Stronger blue gradient, prominent shadow, slight lift
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-400/50 scale-[1.02]"
                  // Inactive: White background, subtle border, themed text/hover
                  : "bg-white text-gray-700 border border-gray-200 hover:border-blue-400 hover:text-blue-600 hover:shadow-md"
              }
            `}
          >
            {Icon}
            {normalized}
          </button>
        );
      })}
    </div>
  );
}