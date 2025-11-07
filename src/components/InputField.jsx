import { Mail, Lock, User, Phone } from "lucide-react";

export default function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  icon, // 👈 New prop for Lucide icon name
}) {
  // Map icon name to actual Lucide icon component
  const icons = { mail: Mail, lock: Lock, user: User, phone: Phone };
  const IconComponent = icons[icon];

  return (
    <div className="flex flex-col w-full mb-4">
      {/* Label */}
      <label className="text-gray-700 font-medium mb-1">{label}</label>

      {/* Input Wrapper */}
      <div className="relative">
        {/* Icon on left */}
        {IconComponent && (
          <IconComponent
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        )}

        {/* Input */}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full ${
            IconComponent ? "pl-10" : "pl-4"
          } pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400`}
        />
      </div>
    </div>
  );
}
