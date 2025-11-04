import { Link } from "react-router-dom";

export default function Checkbox({ checked, onChange ,name }) {
  return (
    <div className="flex items-center mb-6 text-sm">
      <input
        type="checkbox"
        id="terms"
        name={name}
        checked={checked}
        onChange={onChange}
        className="mr-2 w-4 h-4 accent-teal-500"
      />
      <label htmlFor="terms" className="text-gray-600">
        I agree to the{" "}
        <Link to={"/terms"} className="text-blue-600 underline">
          Terms and Conditions
        </Link>
      </label>
    </div>
  );
}