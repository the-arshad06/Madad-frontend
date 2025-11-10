// ProviderCard.jsx - ENHANCED UI
import { useNavigate } from "react-router-dom";
import { Star, MapPin, ChevronRight, Briefcase } from "lucide-react"; // Briefcase for category icon

export default function ProviderCard({ provider }) {
  const navigate = useNavigate();

  // Helper function to handle navigation (Logic remains unchanged)
  const handleCardClick = () => {
    navigate(`/provider/${provider._id}`);
  };

  const rating = provider.averageRating?.toFixed(1) || "0.0";
  const reviewCount = provider.reviewCount || 0;

  return (
    <div
      onClick={handleCardClick}
      // Enhanced card container styling
      className="relative flex bg-white rounded-2xl p-4 shadow-xl shadow-blue-100/50 
                 hover:shadow-2xl hover:shadow-blue-200/60 
                 transition-all duration-300 cursor-pointer 
                 border border-gray-100 hover:border-blue-400 
                 group hover:translate-y-[-2px] sm:p-5" // Subtle lift on hover, slightly more rounded
    >
      
      {/* 1. Profile Image/Badge */}
      <div className="relative flex-shrink-0 mr-4 sm:mr-5">
        <img
          src={
            provider.image ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="Profile"
          // Image border and size enhanced
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-4 border-blue-100 group-hover:border-blue-500 transition-all duration-300"
        />
        {/* Status/Active Indicator */}
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-lg"></div>
      </div>

      {/* 2. Provider Info & Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-1">
              <div className="min-w-0">
                  <h3 className="font-extrabold text-gray-900 text-lg sm:text-xl truncate group-hover:text-blue-600 transition-colors duration-200">
                      {provider.name.charAt(0).toUpperCase() + provider.name.slice(1)}
                  </h3>
              </div>
              
              {/* Category Tag Badge */}
              <div className="flex-shrink-0 ml-3 hidden sm:flex items-center text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
                  <Briefcase size={14} className="mr-1" />
                  {provider.category || 'Service'}
              </div>
          </div>
          

          {/* 3. Rating & Distance Section - More Prominent */}
          <div className="flex items-center text-sm sm:text-base mb-2 space-x-3 text-gray-600">
              {/* Rating */}
              <div className="flex items-center space-x-1 bg-yellow-50 text-yellow-800 font-bold px-3 py-1 rounded-lg">
                  <Star size={16} className="text-yellow-500 fill-yellow-500 drop-shadow-sm" />
                  <span>{rating}</span>
                  <span className="text-gray-500 font-normal">({reviewCount})</span>
              </div>

              {/* Distance */}
              <div className="flex items-center space-x-1 text-blue-600">
                  <MapPin size={16} className="text-blue-400" />
                  <span className="font-medium">{provider.distanceInKm || 'N/A'} km</span>
              </div>
          </div>
          
          {/* Title and Mobile Tag */}
          <div className="flex items-center justify-between">
             <p className="text-blue-500 text-sm font-semibold truncate">{provider.title}</p>
             <div className="flex-shrink-0 sm:hidden flex items-center text-xs font-semibold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
                  {provider.category || 'Service'}
              </div>
          </div>
      </div>
      
      {/* 4. Action Indicator (Arrow) */}
      <div className="flex-shrink-0 ml-4 flex items-center">
          <ChevronRight size={24} className="text-blue-400 group-hover:text-blue-600 transition-colors duration-200" />
      </div>

    </div>
  );
}