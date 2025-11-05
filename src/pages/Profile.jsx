import { useEffect, useState } from "react";
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
    


    if (!user) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="flex justify-center py-10 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm flex flex-col items-center">
        {/* Profile Section */}
        <img
          src={userdata.image}
          alt={userdata.name}
          className="w-24 h-24 rounded-full mb-3"
        />
        <h1 className="text-2xl font-bold">{userdata.name}</h1>
        <p className="text-gray-500 mb-5">{userdata.email}</p>

        <hr className="w-full border-gray-200 mb-5" />

        {/* Buttons Section */}
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => handleClick("Edit Profile")}
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-full shadow-sm transition"
          >
            ✏️ Edit Profile
          </button>

          <button
            onClick={() => handleClick("Booking History")}
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-full shadow-sm transition"
          >
            📅 Booking History
          </button>

          <button
            onClick={() => handleClick("Help & Support")}
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-full shadow-sm transition"
          >
            ❓ Help & Support
          </button>
        </div>
      </div>
    </div>
    );
}
