export default function InputField({ label, type = "text", placeholder, value, onChange, name }) {
    return (
        <div className="flex flex-col w-full mb-4">
            <label className="text-gray-700 font-medium mb-1">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
        </div>
    );
}
