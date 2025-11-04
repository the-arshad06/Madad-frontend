
import { useNavigate } from "react-router-dom";

export default function ProviderCard({ provider }) {
  const Navigate = useNavigate()
  return (
    <div className="flex items-center bg-white shadow-sm rounded-2xl p-3 mb-3">
      {/* <img
        src={provider.image}
        alt={provider.name}
        className="w-14 h-14 rounded-full object-cover"
      /> */}
      <div className="flex-1 ml-3" onClick={() => Navigate(`/provider/${provider._id}`)}>
        <h3 className="font-semibold text-gray-800">Name :{provider.name}</h3>
        <p className="text-gray-500 text-sm">Title : {provider.title}</p>
        <div className="flex items-center text-yellow-400 text-sm">
          <span className="text-gray-600 ml-1">Average Rating :</span>
          {"⭐".repeat(Math.round(provider.averageRating))}{" "} {provider.averageRating}
        </div>
        <p className="text-gray-500 text-sm">KM : {provider.distanceInKm}</p>
      </div>
    </div>
  );
}
