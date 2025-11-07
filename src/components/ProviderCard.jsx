import { useNavigate } from "react-router-dom";
import { Star, MapPin, User } from "lucide-react"; // ✅ Lucide icons

export default function ProviderCard({ provider }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex my-5 items-center bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 p-4 cursor-pointer"
      onClick={() => navigate(`/provider/${provider._id}`)}
    >
      {/* Profile Image */}
      <div className="relative">
        <img
          src={provider.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          alt="Profile"
          className="w-14 h-14 rounded-full object-cover border-2 border-blue-100"
        />
        <User
          size={14}
          className="absolute bottom-1 right-1 bg-blue-500 text-white rounded-full p-[2px]"
        />
      </div>

      {/* Provider Info */}
      <div className="flex-1 ml-4">
        <h3 className="font-semibold text-gray-800">
          {provider.name.charAt(0).toUpperCase() + provider.name.slice(1)}
        </h3>
        <p className="text-gray-500 text-sm">{provider.title}</p>

        {/* Rating & Distance */}
        <div className="flex items-center text-sm mt-1">
          <Star size={16} className="text-yellow-500 mr-1 fill-yellow-500" />
          <span className="text-gray-700">
            {provider.averageRating?.toFixed(1) || "0.0"}
          </span>
          <span className="text-gray-400 mx-2">•</span>
          <MapPin size={14} className="text-gray-500 mr-1" />
          <span className="text-gray-700">{provider.distanceInKm} km</span>
        </div>
      </div>
    </div>
  );
}
