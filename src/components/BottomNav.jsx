import { Link } from "react-router-dom";
import { Home, CalendarDays, User } from "lucide-react";

export default function BottomNav({ activeTab, onTabChange }) {
  const tabs = [
    { name: "Home", icon: Home },
    { name: "Bookings", icon: CalendarDays },
    { name: "Profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 w-full bg-white border-t flex justify-around items-center py-2 text-gray-500 text-sm shadow-md z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.name;

        return (
          <button
            key={tab.name}
            onClick={() => onTabChange(tab.name)}
            className={`flex flex-col items-center transition-all duration-200 ${
              isActive ? "text-blue-500 font-semibold" : "text-gray-500"
            }`}
          >
            <Icon
              size={22}
              className={`mb-1 ${isActive ? "stroke-blue-500" : "stroke-gray-500"}`}
            />
            <Link to={tab.name === "Home" ? "/" : "/" + tab.name}>
              {tab.name}
            </Link>
          </button>
        );
      })}
    </div>
  );
}
