export default function BtnComponent({ text, onClick, disabled }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold py-2 rounded-full transition ${disabled ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
                }`}
        >
            {text}
        </button>
    );
}