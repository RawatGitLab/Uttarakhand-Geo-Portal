import React, { useState, useMemo } from "react";
import { Search, MapPin, Grid, Layers, ArrowUpDown, ExternalLink, ShieldAlert } from "lucide-react";
import { DistrictDetail, districtsData } from "../data/districtsData";

interface DistrictListProps {
  selectedDistrict: DistrictDetail | null;
  onSelectDistrict: (district: DistrictDetail | null) => void;
  choroplethMetric: "population" | "area" | "literacyRate" | "none";
  setChoroplethMetric: (metric: "population" | "area" | "literacyRate" | "none") => void;
}

export const DistrictList: React.FC<DistrictListProps> = ({
  selectedDistrict,
  onSelectDistrict,
  choroplethMetric,
  setChoroplethMetric
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<"All" | "Garhwal" | "Kumaon">("All");
  const [sortBy, setSortBy] = useState<"name" | "area" | "population" | "literacyRate">("name");

  // Filtering and sorting logic
  const filteredDistricts = useMemo(() => {
    return districtsData
      .filter((d) => {
        const matchesSearch = 
          d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.headquarters.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.keyFeatures.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesRegion = selectedRegion === "All" || d.region === selectedRegion;
        
        return matchesSearch && matchesRegion;
      })
      .sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        } else {
          return b[sortBy] - a[sortBy];
        }
      });
  }, [searchTerm, selectedRegion, sortBy]);

  return (
    <div className="flex flex-col h-full bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-black dark:border-black rounded-2xl overflow-hidden shadow-sm">
      
      <div className="flex flex-col h-full overflow-hidden">
        {/* Visual Header */}
        <div className="p-4 border-b border-slate-200/50 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/20">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-500" />
            District Geoportals
          </h2>
          <p className="text-xs text-slate-500 mt-1">Select districts from the map or list to overlay custom GIS layers and review datasets.</p>
        </div>


        {/* Search and Filters */}
        <div className="p-4 space-y-3 bg-slate-50/30 dark:bg-slate-950/5 border-b border-slate-200/50 dark:border-white/10">
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search districts, HQ, or landmarks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xs text-slate-950 dark:text-slate-50 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>

          {/* Region & Sort Selectors Row */}
          <div className="flex gap-2">
            
            {/* Region Tabs */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg w-full max-w-[170px]">
              {(["All", "Garhwal", "Kumaon"] as const).map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`flex-1 py-1 text-[10px] font-medium rounded-md transition-all ${
                    selectedRegion === reg
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs"
                      : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>

            {/* Sort Menu */}
            <div className="flex items-center gap-1 bg-slate-50/50 dark:bg-slate-800/30 px-2 py-0.5 rounded-lg border border-slate-200/50 dark:border-white/10 flex-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-[10px] font-medium text-slate-600 dark:text-slate-300 focus:outline-none w-full"
              >
                <option value="name">Sort: A-Z</option>
                <option value="population">Sort: Pop</option>
                <option value="area">Sort: Area</option>
                <option value="literacyRate">Sort: Lit. Rate</option>
              </select>
            </div>

          </div>
        </div>

        {/* District List Scrollable Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-slate-100/50 dark:divide-slate-800/30 p-2 space-y-1">
          {filteredDistricts.length > 0 ? (
            filteredDistricts.map((district) => {
              const isSelected = selectedDistrict?.id === district.id;
              return (
                <button
                  key={district.id}
                  onClick={() => onSelectDistrict(isSelected ? null : district)}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-start gap-3 relative overflow-hidden group ${
                    isSelected
                      ? "bg-sky-50 dark:bg-sky-950/40 border-l-4 border-l-sky-500 shadow-xs"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/60 border-l-4 border-l-transparent"
                  }`}
                >
                  {/* Micro Color indicator for regions */}
                  <div 
                    className={`absolute top-0 right-0 w-2 h-full opacity-30 ${
                      district.region === "Garhwal" ? "bg-sky-400" : "bg-amber-400"
                    }`} 
                  />

                  <div className={`p-1.5 rounded-lg ${
                    isSelected ? "bg-sky-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                  }`}>
                    <MapPin className="w-4 h-4" />
                  </div>

                  <div className="flex-1 pr-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        {district.name}
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-normal">
                          {district.region}
                        </span>
                      </h3>
                    </div>

                    <p className="text-[10px] text-slate-400 mt-0.5 font-mono">HQ: {district.headquarters}</p>
                    
                    {/* Grid stats */}
                    <div className="grid grid-cols-3 gap-2 mt-2 pt-1.5 border-t border-slate-200/50 dark:border-white/10">
                      <div>
                        <span className="block text-[8px] text-slate-400 font-mono">POPULATION</span>
                        <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 font-mono">
                          {(district.population / 1000).toFixed(0)}k
                        </span>
                      </div>
                      <div>
                        <span className="block text-[8px] text-slate-400 font-mono">AREA</span>
                        <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 font-mono">
                          {district.area.toLocaleString()} km²
                        </span>
                      </div>
                      <div>
                        <span className="block text-[8px] text-slate-400 font-mono">LITERACY</span>
                        <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 font-mono">
                          {district.literacyRate}%
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="p-8 text-center space-y-2">
              <ShieldAlert className="w-6 h-6 text-slate-400 mx-auto" />
              <p className="text-xs text-slate-400 font-medium">No districts matched your search criteria.</p>
            </div>
          )}
        </div>

        {/* Footer statistics */}
        <div className="p-3.5 border-t border-slate-200/50 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/10 text-center">
          <span className="text-[10px] text-slate-400 font-mono">Showing {filteredDistricts.length} of 13 Districts</span>
        </div>
      </div>

    </div>
  );
};
