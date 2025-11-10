// MapView.jsx - No Logic or Significant Style Changes (Parent handles it)
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useContext } from "react";
import L from "leaflet";
import { context } from "../App";
import "leaflet/dist/leaflet.css";

export default function MapView({ providers, className }) {
  const { userLocation } = useContext(context);

  // ... (Icon definitions remain unchanged) ...

  const userIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    iconSize: [35, 35],
  });

  const providerIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854866.png",
    iconSize: [35, 35],
  });

  const center = userLocation || { lat: 19.076, lng: 72.8777 };

  return (
    // The class is now passed from Home.jsx with enhanced styling (rounded-2xl, shadow-2xl, etc.)
    <div className={`${className || ""} rounded-lg overflow-hidden`}>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        {/* ... (TileLayer and Markers remain unchanged) ... */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>You are here 🧍‍♂️</Popup>
          </Marker>
        )}

        {providers?.map((p) => (
          <Marker
            key={p._id}
            position={[p.location.coordinates[1], p.location.coordinates[0]]}
            icon={providerIcon}
          >
            <Popup>
              <b>{p.name}</b>
              <br />
              {p.category}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}