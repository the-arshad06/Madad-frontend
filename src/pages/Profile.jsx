import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Profile() {
    const [user, setUser] = useState(null);


    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch(`https://madad-c0ci.onrender.com/user/profile`, { credentials: "include" });
                const data = await res.json();
                setUser({ data });
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        }
        fetchUser();
    }, []);


    const userdata = user?.data?.user
    
    const providerIcon = new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854866.png",
        iconSize: [35, 35],
    });

    if (!user) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="flex justify-center py-10 bg-gray-100 min-h-100 relative">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
                {/* Profile Section */}
                <div className="flex flex-col items-center text-center">
                    <img
                        src={
                            user.image ||
                            "https://cdn-icons-png.flaticon.com/512/921/921071.png"
                        }
                        alt={user.name}
                        className="w-28 h-28 rounded-full mb-3"
                    />
                    <h1 className="text-xl font-bold underline my-2">Name : {userdata.name}</h1>
                    <h2 className="text-xl font-bold underline">Email : {userdata.email}</h2>
                </div>

                {/* Map Section */}
                {/* <div className="mt-6 w-full h-[250px] rounded-lg overflow-hidden shadow-md">
                    <MapContainer
                        center={[
                            user.location.coordinates[1],
                            user.location.coordinates[0],
                        ]}
                        zoom={14}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker
                            position={[
                                user?.location.coordinates[1],
                                user?.location.coordinates[0],
                            ]}
                            icon={providerIcon}
                        >
                            <Popup>{user.name}</Popup>
                        </Marker>
                    </MapContainer>
                </div> */}
                <p className="text-black-200 my-5">{ }</p>
            </div>
        </div>
    );
}
