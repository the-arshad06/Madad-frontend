import { ArrowRight, Loader2 } from "lucide-react";

export default function BtnComponent({ text, onClick, disabled, loading = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold 
                 py-3 rounded-xl transition-all duration-200 
                 shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/70 // ENHANCED SHADOW
                 ${
        disabled || loading
          ? "opacity-60 cursor-not-allowed"
          : "hover:opacity-90 hover:scale-[1.01]" // ADDED subtle scale on hover
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