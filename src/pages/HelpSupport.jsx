import { Mail, Clock } from "lucide-react";

export default function HelpSupport() {
  const supportEmail = "support@example.com"; // ✅ replace with your real email

  const handleEmailClick = () => {
    window.location.href = `mailto:${supportEmail}`;
    console.log("User clicked to send email to:", supportEmail);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-3 text-gray-800">
          Help & Support
        </h1>
        <p className="text-gray-600 mb-6">
          Need assistance? We're here to help you.  
          Please reach out to us anytime via email.
        </p>

        <button
          onClick={handleEmailClick}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-teal-400 hover:opacity-90 text-white font-semibold py-2 px-6 rounded-full transition duration-200 shadow-md"
        >
          <Mail className="w-5 h-5" />
          Contact Us at {supportEmail}
        </button>

        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mt-6">
          <Clock className="w-4 h-4" />
          <span>We usually respond within 24 hours.</span>
        </div>
      </div>
    </div>
  );
}
