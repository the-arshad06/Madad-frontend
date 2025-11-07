import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export default function Checkbox({ checked, onChange, name }) {
  return (
    <div className="flex items-start gap-2 mb-6 text-sm">
      {/* Checkbox input */}
      <input
        type="checkbox"
        id={name || "terms"}
        name={name}
        checked={checked}
        onChange={onChange}
        className="mt-1 w-4 h-4 accent-teal-500 cursor-pointer"
      />

      {/* Label with icon and link */}
      <label
        htmlFor={name || "terms"}
        className="text-gray-600 flex items-center gap-1"
      >
        <ShieldCheck size={16} className="text-teal-500" />
        I agree to the{" "}
        <Link
          to="/terms"
          className="text-blue-600 underline font-medium hover:text-blue-700"
        >
          Terms and Conditions
        </Link>
      </label>
    </div>
  );
}
