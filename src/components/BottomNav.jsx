import { Link } from "react-router-dom";

export default function BottomNav({ activeTab, onTabChange }) {
    const tabs = [
        { name: "Home", icon: "fa fa-home" },
        { name: "Bookings", icon: "fa fa-calendar" },
        { name: "Profile", icon: "fa fa-user" },
    ];

    return (
        <div className="fixed bottom-0 w-full h-13 bg-white border-t flex justify-around content-center py-2 text-gray-500 text-sm shadow-md z-50">
            {tabs.map((tab) => (
                <button
                    key={tab.name}
                    onClick={() => onTabChange(tab.name)}
                    className={`flex flex-col items-center transition ${activeTab === tab.name ? "text-blue-500 font-semibold" : "text-gray-500"
                        }`}
                >
                    <i className={`${tab.icon} text-lg mb-1`}></i>
                   <Link to={tab.name === "Home" ? "/" : "/"+tab.name}> {tab.name}</Link>
                </button>
            ))}
        </div>
    );
}
