import { ArrowRight, Loader2 } from "lucide-react";

export default function BtnComponent({ text, onClick, disabled, loading = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold py-2 rounded-full transition-all duration-200 shadow-md ${
        disabled || loading
          ? "opacity-60 cursor-not-allowed"
          : "hover:opacity-90 hover:shadow-lg"
      }`}
    >
      {/* Optional Loading Spinner */}
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <ArrowRight size={18} className="text-white" />
      )}
      <span>{text}</span>
    </button>
  );
}
