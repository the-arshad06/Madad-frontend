// BottomNav.jsx - COOLER PROFESSIONAL STYLING
import { Link } from "react-router-dom";
import { Home, CalendarDays, User } from "lucide-react";

export default function BottomNav({ activeTab, onTabChange }) {
  const tabs = [
    { name: "Home", icon: Home },
    { name: "Bookings", icon: CalendarDays },
    { name: "Profile", icon: User },
  ];

  return (
    // Stronger glassmorphism, larger shadow, subtle animation
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[95%] max-w-sm bg-white/70 backdrop-blur-xl rounded-3xl shadow-3xl shadow-blue-400/40 border border-white/90 flex justify-around px-4 py-4 z-50 animate-fade-in-up"> {/* Added animation */}
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.name;

        return (
          <Link
            key={tab.name}
            to={tab.name === "Home" ? "/" : "/" + tab.name}
            onClick={() => onTabChange(tab.name)}
            className={`flex flex-col items-center justify-center p-1 transition-all duration-300 group ${
              isActive
                ? "text-blue-700 scale-110 drop-shadow-lg" // More dramatic scale and shadow
                : "text-gray-600 hover:text-blue-600 transform hover:scale-105"
            }`}
          >
            <div className="relative">
              <Icon
                size={28} // Slightly larger icon size
                className={`transition-colors duration-300 ${
                  isActive ? "stroke-blue-700 fill-blue-100" : "stroke-gray-500 group-hover:stroke-blue-600"
                }`}
              />
              {/* Active glow dot enhancement */}
              {isActive && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/70 animate-pulse"></span>
              )}
            </div>
            <span className={`text-xs mt-1 font-bold truncate ${isActive ? "text-blue-700" : "text-gray-600 group-hover:text-blue-600"}`}>
              {tab.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}