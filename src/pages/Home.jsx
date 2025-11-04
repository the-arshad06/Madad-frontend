import { useContext, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import CategoryTabs from "../components/CategoryTabs";
import ProviderCard from "../components/ProviderCard";
import MapView from "../components/MapView";
import BottomNav from "../components/BottomNav";
import { context } from "../App";

export default function Home() {
  const { providerData } = useContext(context);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [activeTab, setActiveTab] = useState("Home");

  // ✅ Filter providers
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <MapView providers={filteredProviders} />

      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />

      <CategoryTabs active={activeCategory} onSelect={setActiveCategory} />

      <div className="p-4 overflow-y-auto flex-1">
        {filteredProviders.length > 0 ? (
          filteredProviders.map((p, i) => (
            <ProviderCard key={i} provider={p} />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">No providers found.</p>
        )}
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
