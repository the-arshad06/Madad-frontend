import { Mail, Clock } from "lucide-react";

export default function HelpSupport() {
  const supportEmail = "support@example.com"; // ✅ replace with your real email (Logic untouched)

  const handleEmailClick = () => {
    window.location.href = `mailto:${supportEmail}`;
    console.log("User clicked to send email to:", supportEmail);
  };

  return (
    // REDESIGN: Smoother background, more padding
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 sm:p-8">
      {/* REDESIGN: Enhanced Card Look */}
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-lg text-center border border-gray-100">
        
        {/* REDESIGN: Icon and Title Styling */}
        <div className="flex justify-center mb-4">
            <Mail className="w-12 h-12 text-indigo-500"/>
        </div>

        <h1 className="text-3xl font-extrabold mb-3 text-gray-900">
          Help & Support
        </h1>
        <p className="text-gray-500 mb-8 max-w-xs mx-auto">
          Need assistance? We're here to help you.  
          Please reach out to us anytime via email.
        </p>

        <button
          onClick={handleEmailClick}
          // REDESIGN: Deeper gradient button for a premium feel
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.01] w-full"
        >
          <Mail className="w-5 h-5" />
          Contact Us at {supportEmail}
        </button>

        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mt-8">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>We usually respond within 24 hours.</span>
        </div>
      </div>
    </div>
  );
}