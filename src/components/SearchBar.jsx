import { Search } from "lucide-react"; // ✅ Import Lucide icon

export default function SearchBar({ value, onChange }) {
  return (
    <div className="p-4 relative">
      {/* 🔍 Search Icon */}
      <Search
        size={18}
        className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400"
      />

      {/* Input Field */}
      <input
        type="text"
        placeholder="Search here"
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
