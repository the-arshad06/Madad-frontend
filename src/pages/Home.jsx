// Home.jsx - FULL CODE: Professionally styled, Blue/White theme, and scrollable service list. (NO CHANGES MADE)

import { useContext, useEffect, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import CategoryTabs from "../components/CategoryTabs";
import ProviderCard from "../components/ProviderCard";
import MapView from "../components/MapView";
import BottomNav from "../components/BottomNav";
import { context } from "../App";
import { onMessageListener, requestPermission } from "../../firebase";

// IMPORTANT: Verify this relative path or use src="/Logo.png" if using the public folder
import Logo from "../assets/Logo.png"; 

export default function Home() {
  const { providerData } = useContext(context);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [activeTab, setActiveTab] = useState("Home");

  // --- LOGIC REMAINS UNCHANGED ---
  useEffect(() => {
    requestPermission();
    onMessageListener().then((payload) => {
      console.log("Message received:", payload);
      alert(payload.notification.title);
    });
  }, []);

  const filteredProviders = useMemo(() => {
    if (!Array.isArray(providerData)) return [];
    return providerData.filter((p) => {
      const matchCategory =
        !activeCategory ||
        p.category?.toLowerCase() === activeCategory.toLowerCase();
      const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [providerData, activeCategory, search]);
  // --- END LOGIC ---

  return (
    // Main Wrapper: Sets theme background and smooth scrolling
    <div className="flex flex-col min-h-screen bg-gray-50 bg-gradient-to-br from-blue-100/30 via-white to-white scroll-smooth"> 
      
      {/* 1. MOBILE-ONLY HEADER */}
      <header className="flex md:hidden justify-between items-center px-4 py-3 bg-white shadow-md z-30 border-b border-blue-50">
        <div className="flex items-center">
          <img 
            src={Logo} 
            alt="Madad Logo" 
            className="h-8 w-auto mr-2 object-contain"
          />
          <h1 className="text-xl font-bold text-blue-600"> 
            Madad Service Locator
          </h1>
        </div>
        <p className="text-sm text-blue-400">👋</p>
      </header>
      
      {/* 2. DESKTOP-ONLY HEADER */}
      <header className="hidden md:flex justify-between items-center px-8 py-4 bg-white shadow-lg z-30 border-b border-blue-100">
        <div className="flex items-center">
          <img 
            src={Logo} 
            alt="Madad Logo" 
            className="h-10 w-auto mr-3 object-contain" 
          />
          <h1 className="text-2xl font-bold text-black-600">
            Madad Service Locator
          </h1>
        </div>
        <p className="text-sm text-blue-400 font-medium">Welcome👋</p>
      </header>

      {/* 3. MAIN CONTENT CONTAINER (Responsive Split) */}
      <div className="flex flex-1 flex-col md:flex-row gap-8 p-4 md:p-8 pb-20 md:pb-8"> 
        
        {/* Left: Map Container (Fixed Mobile Height, Full Desktop Height) */}
        <div className="md:flex-1 w-full relative h-80 md:h-auto md:min-h-[calc(100vh-8rem)] bg-white rounded-2xl overflow-hidden shadow-2xl shadow-blue-400/30 border border-blue-50">
          <MapView
            providers={filteredProviders}
            className="absolute inset-0 w-full h-full z-0"
          />
        </div>

        {/* Right: Content Panel - This entire column fills remaining height */}
        <div className="md:flex-1 w-full flex flex-col gap-6 p-0 md:p-4 bg-white md:bg-transparent rounded-2xl md:shadow-none"> 
          
          {/* Sticky Search and Filters Container */}
          <div className="sticky top-[4rem] md:top-0 bg-white/95 backdrop-blur-sm z-20 pt-4 pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:pt-0 md:pb-0 space-y-4">
              <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
              <CategoryTabs active={activeCategory} onSelect={setActiveCategory} />
              <hr className="md:hidden border-blue-100 mt-3" />
          </div>
          
          {/* List Container - Scrollable area (flex-1 + overflow-y-auto ensures only this section scrolls) */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 -mr-2"> 
            {filteredProviders.length > 0 ? (
              <>
                <h2 className="text-lg font-semibold text-gray-700 pt-2 pb-1 border-b border-gray-100">
                  Showing {filteredProviders.length} Providers
                </h2>
                <div className="space-y-4"> 
                  {filteredProviders.map((p, i) => <ProviderCard key={i} provider={p} />)}
                </div>
              </>
            ) : (
              <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-blue-200/50">
                  <p className="text-lg font-semibold text-blue-600">
                    🔍 No services found.
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Try adjusting your search or filter settings.
                  </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Bottom Navigation (Fixed) */}
      <div className=" bottom-0 left-0 w-full z-50">
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}