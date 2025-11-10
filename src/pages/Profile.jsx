import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import { User, Edit, History, HelpCircle, LogOut } from "lucide-react"; // Imported icons
import Logo from "../assets/Logo.png"; // ADDED

export default function Profile() {
    const [user, setUser] = useState(null);
    const [showPopup, setShowPopup] = useState(false)
    const [message, setmessage] = useState()

    const navigate = useNavigate()
    const url = "http://localhost:4000"
    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch(`${url}/user/profile`, { credentials: "include" });
                const data = await res.json();
                setUser({ data });
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        }
        fetchUser();
    }, []);

    const handleClick = async (btnName) => {
        console.log(btnName);
        if (btnName === "Edit Profile") {
            navigate("/" + btnName.split(" ")[0])
        } else if (btnName === "Bookings History") {
            navigate("/" + btnName.split(" ")[0])
        } else if (btnName === "Help & Support") {
            navigate("/" + btnName.split(" ")[0])
        } else if (btnName === "LogOut") {
            setShowPopup(true)
        } else if (btnName === "Confirm") {
            try {
                const res = await fetch(`${url}/user/logout`, { credentials: "include" })
                const data = await res.json()
                setmessage(data)
                setTimeout(() => {
                    navigate("/login")
                }, 1500);

            } catch (error) {
                console.log(error);
            }
        }
    };
    if (!user) return <p className="text-center mt-10 text-gray-600">Loading...</p>;

    const userdata = user?.data?.user


    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* 1. MOBILE-ONLY HEADER - Fixed Top */}
            <header className="flex md:hidden justify-between items-center px-4 py-3 bg-white shadow-md z-30 border-b border-blue-50">
                <div className="flex items-center">
                    <img 
                        src={Logo} 
                        alt="Logo" 
                        className="h-8 w-auto mr-2 object-contain"
                    />
                    <h1 className="text-xl font-bold text-black-600"> 
                        Madad Service Locator
                    </h1>
                </div>
                <p className="text-sm text-blue-400">👤</p>
            </header>
            
            {/* 2. DESKTOP-ONLY HEADER - Fixed Top */}
            <header className="hidden md:flex justify-between items-center px-8 py-4 bg-white shadow-lg z-30 border-b border-blue-100">
                <div className="flex items-center">
                    <img 
                        src={Logo} 
                        alt="Logo" 
                        className="h-10 w-auto mr-3 object-contain" 
                    />
                    <h1 className="text-2xl font-bold text-black-600">
                        Madad Service Locator
                    </h1>
                </div>
                <p className="text-sm text-blue-400 font-medium">Manage Account</p>
            </header>
            
            {/* Content Container - Scrollable area */}
            <div className="flex-1 overflow-y-auto">
                {/* Original content wrapper. Removed min-h-screen class. */}
                <div className="flex justify-center py-12 bg-gray-50 p-4">
                    {/* Profile Card - Apply blur/opacity when modal is open */}
                    <div className={`bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm flex flex-col items-center border border-gray-100 ${showPopup ? 'opacity-50 blur-sm pointer-events-none' : ''}`}>
                        
                        {/* Profile Header Section */}
                        <div className="relative mb-5 flex flex-col items-center">
                            {/* Professional Avatar */}
                            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-3 border-4 border-white shadow-md">
                                <User className="w-10 h-10 text-indigo-600"/>
                            </div>
                            <h1 className="text-2xl font-extrabold text-gray-900">{userdata.name}</h1>
                            <p className="text-gray-500 text-sm">{userdata.email}</p>
                        </div>
                        
                        <hr className="w-full border-gray-200 my-6" />

                        {/* Buttons Section - New Menu Styling */}
                        <div className="flex flex-col gap-4 w-full">
                            {/* Standard Button Style (justify-between for arrow) */}
                            <button
                                onClick={() => handleClick("Edit Profile")}
                                className="flex items-center justify-between px-4 bg-gray-50 hover:bg-indigo-50 text-gray-800 hover:text-indigo-600 font-medium py-3 rounded-xl transition duration-150 border border-gray-200"
                            >
                                <div className="flex items-center gap-3">
                                    <Edit className="w-5 h-5" />
                                    <span>Edit Profile</span>
                                </div>
                                <span className="text-gray-400">{' > '}</span>
                            </button>

                            <button
                                onClick={() => handleClick("Bookings History")}
                                className="flex items-center justify-between px-4 bg-gray-50 hover:bg-indigo-50 text-gray-800 hover:text-indigo-600 font-medium py-3 rounded-xl transition duration-150 border border-gray-200"
                            >
                                <div className="flex items-center gap-3">
                                    <History className="w-5 h-5" />
                                    <span>Booking History</span>
                                </div>
                                <span className="text-gray-400">{' > '}</span>
                            </button>

                            <button
                                onClick={() => handleClick("Help & Support")}
                                className="flex items-center justify-between px-4 bg-gray-50 hover:bg-indigo-50 text-gray-800 hover:text-indigo-600 font-medium py-3 rounded-xl transition duration-150 border border-gray-200"
                            >
                                <div className="flex items-center gap-3">
                                    <HelpCircle className="w-5 h-5" />
                                    <span>Help & Support</span>
                                </div>
                                <span className="text-gray-400">{' > '}</span>
                            </button>
                            
                            {/* LogOut Button - Danger style */}
                            <button
                                onClick={() => handleClick("LogOut")}
                                className="flex items-center justify-between px-4 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-md transition duration-150 mt-4"
                            >
                                <div className="flex items-center gap-3">
                                    <LogOut className="w-5 h-5" />
                                    <span>Log Out</span>
                                </div>
                            </button>
                        </div>
                    </div>
                    
                    {/* Logout Confirmation Modal - Enhanced Design */}
                    {showPopup && (
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-40 flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm text-center transform scale-100 animate-in fade-in duration-300">
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                    {message ? 'Action Complete' : 'Confirm Logout'}
                                </h2>
                                <p className="text-gray-600 mb-8">
                                    {!message 
                                        ? `Are you sure you want to sign out, ${userdata.name}?` 
                                        : message.message || "Logout successful!"}
                                </p>

                                <div className="flex justify-between space-x-4">
                                    {!message && <button
                                        onClick={() => {
                                            setShowPopup(false);
                                            handleClick("Confirm"); 
                                        }}
                                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-3 rounded-xl w-1/2 transition duration-150"
                                    >
                                        Sign Out
                                    </button>}
                                    <button
                                        onClick={() => setShowPopup(false)}
                                        className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-3 rounded-xl ${!message ? 'w-1/2' : 'w-full' } transition duration-150`}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}