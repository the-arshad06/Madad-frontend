export default function SearchBar({ value, onChange }) {
  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search here"
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
