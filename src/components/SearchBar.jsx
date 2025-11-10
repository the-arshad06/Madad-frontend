// SearchBar.jsx - FINAL PROFESSIONAL STYLING
import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full">
      {/* 🔍 Search Icon - Color adjusted for theme consistency */}
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none"
      />

      {/* Input Field - Polished Styling */}
      <input
        type="text"
        placeholder="Search services or providers..." // More descriptive placeholder
        value={value}
        onChange={onChange}
        className="w-full bg-white shadow-lg border border-gray-100 
                   focus:border-blue-500 rounded-full pl-11 pr-5 py-3 
                   text-gray-800 placeholder:text-gray-400 font-medium
                   focus:outline-none focus:ring-3 focus:ring-blue-200 
                   transition-all duration-300"
      />
    </div>
  );
}