// Filename: Bookings.jsx

import { useEffect, useState } from "react";
import BookingCard from "../components/Bookingcard";
import Logo from "../assets/Logo.png"; // ADDED

async function userBooking(setUserBooking) {
    const url = "http://localhost:4000"
    try {
        const res = await fetch(`${url}/booking/user`, { credentials: "include" })
        const data = await res.json()
        setUserBooking(data.bookings)
    } catch (error) {
        console.log(error);
    }
}

export default function Bookings() {
    const [userbooking, setUserBooking] = useState([])
    useEffect(() => {
        userBooking(setUserBooking)
    }, [])

    // FIX: Increased bottom padding to pb-32 (p-8 = 32px, pb-32 = 128px)
    // This clears the floating BottomNav with padding/margin.
    return (// ADDED main container
        <div className="flex flex-col min-h-screen bg-gray-50">

            {/* 1. MOBILE-ONLY HEADER - Copied from Home.jsx */}
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
                <p className="text-sm text-blue-400">📅</p>
            </header>

            {/* 2. DESKTOP-ONLY HEADER - Copied from Home.jsx */}
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
                <p className="text-sm text-blue-400 font-medium">View & Manage</p>
            </header>

            {/* Content Container - Ensure content is scrollable */}
            <div className="flex-1 overflow-y-auto">
                <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 pb-32">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-2xl font-bold text-gray-900 mb-8 border-b border-indigo-200 pb-3">
                            My Bookings History
                        </h1>
                        {userbooking.length === 0 ? (
                            <div className="text-center p-10 bg-white rounded-xl shadow-lg border border-gray-100">
                                <p className="text-xl font-medium text-gray-500">
                                    You have no active bookings.
                                </p>
                                <p className="text-sm text-gray-400 mt-2">
                                    Check out the home page to find services!
                                </p>
                            </div>
                        ) : (
                            // Assuming BookingCard handles the list display inside
                            <BookingCard provider={userbooking} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}