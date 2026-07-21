import { useState, useEffect } from "react";
import { 
  Sun, Moon, Layers, FileSpreadsheet, Sparkles, TrendingUp, Compass, HelpCircle, ArrowRight,
  Globe, ChevronDown, ExternalLink, LogOut
} from "lucide-react";
import { DistrictDetail, districtsData, stateTotals } from "./data/districtsData";
import { MapComponent } from "./components/MapComponent";
import { DistrictList } from "./components/DistrictList";
import { RightPanel } from "./components/RightPanel";
import { ReportModal } from "./components/ReportModal";
import { LoginOverlay } from "./components/LoginOverlay";

export default function App() {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictDetail | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [choroplethMetric, setChoroplethMetric] = useState<"population" | "area" | "literacyRate" | "none">("none");
  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isGisDropdownOpen, setIsGisDropdownOpen] = useState(false);
  const [gisSearchQuery, setGisSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isCheckingSession, setIsCheckingSession] = useState<boolean>(true);

  // Verify session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const data = await response.json();
        if (data.authenticated) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("Session check failed:", err);
        setIsLoggedIn(false);
      } finally {
        setIsCheckingSession(false);
      }
    };
    checkSession();
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout request failed:", err);
    }
    setIsLoggedIn(false);
  };

  // Sync dark theme class on document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Click outside to close GIS dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#gis-dropdown-container")) {
        setIsGisDropdownOpen(false);
      }
    };
    if (isGisDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isGisDropdownOpen]);

  // Handle addition/removal from comparative reporting list
  const handleToggleComparison = (id: string) => {
    setComparisonList((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleResetComparison = () => {
    setComparisonList([]);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300 no-print">
      
      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-[500] w-full bg-white/60 dark:bg-slate-950/60 backdrop-blur-lg border-b border-slate-200/50 dark:border-white/10 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-gradient-to-tr from-sky-500 to-indigo-600 rounded-lg text-white shadow-md shadow-sky-500/20">
            <Compass className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 dark:text-slate-50 uppercase font-sans">
                Uttarakhand Geoportal
              </h1>
              <span className="text-[9px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded-full border border-emerald-500/10">
                v1.2 Aggregated
              </span>
            </div>
            <p className="text-[9px] text-slate-400 font-medium leading-none">Dashboard</p>
          </div>
        </div>

        {/* State-wide Quick Metrics Summary */}
        <div className="hidden lg:flex items-center gap-4 border-l border-r border-slate-200/50 dark:border-white/10 px-4 py-0.5 text-[10px] font-mono">
          <div>
            <span className="block text-purple-600 dark:text-purple-400 text-[8px] uppercase tracking-wider">State</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">Uttarakhand</span>
          </div>
          <div>
            <span className="block text-purple-600 dark:text-purple-400 text-[8px] uppercase tracking-wider">State HQ</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">Dehradun</span>
          </div>
          <div>
            <span className="block text-purple-600 dark:text-purple-400 text-[8px] uppercase tracking-wider">Districts</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">13 Covered</span>
          </div>
          <div>
            <span className="block text-purple-600 dark:text-purple-400 text-[8px] uppercase tracking-wider">Avg Literacy</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">78.8% Avg</span>
          </div>
          <div>
            <span className="block text-purple-600 dark:text-purple-400 text-[8px] uppercase tracking-wider">Census Year</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">2011 Dataset</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          
          {/* Web GIS App Dropdown */}
          <div id="gis-dropdown-container" className="relative">
            <button
              onClick={() => {
                setIsGisDropdownOpen(!isGisDropdownOpen);
                setGisSearchQuery("");
              }}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/10 cursor-pointer h-8"
              title="Open District Web GIS App"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Web GIS Apps</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isGisDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isGisDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl rounded-2xl p-2.5 z-[600] animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-1.5 pb-2 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider font-mono">
                    District GIS Gateways
                  </span>
                  <span className="text-[9px] font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded-full">
                    13 Portals
                  </span>
                </div>

                {/* Filter Search Input */}
                <div className="mt-2 mb-1.5 px-1">
                  <input
                    type="text"
                    placeholder="Search district portal..."
                    value={gisSearchQuery}
                    onChange={(e) => setGisSearchQuery(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-white/5 rounded-lg text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 font-medium"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                {/* Dropdown Scrollable Menu */}
                <div className="max-h-64 overflow-y-auto space-y-0.5 pr-0.5 scrollbar-thin">
                  {districtsData
                    .filter((d) =>
                      d.name.toLowerCase().includes(gisSearchQuery.toLowerCase())
                    )
                    .map((d) => (
                      <a
                        key={d.id}
                        href={d.gisUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between p-2 rounded-xl text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all text-xs font-semibold"
                        onClick={() => setIsGisDropdownOpen(false)}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse group-hover:bg-indigo-500" />
                          <span className="truncate max-w-[130px]">{d.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-mono ${
                            d.region === "Garhwal" 
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" 
                              : "bg-teal-500/10 text-teal-600 dark:text-teal-400"
                          }`}>
                            {d.region}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity text-slate-400 group-hover:text-indigo-500" />
                        </div>
                      </a>
                    ))}
                  {districtsData.filter((d) =>
                    d.name.toLowerCase().includes(gisSearchQuery.toLowerCase())
                  ).length === 0 && (
                    <div className="p-4 text-center text-[11px] text-slate-400">
                      No portals match search query
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Executive Report Modal Trigger */}
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-sky-500/10 cursor-pointer h-8"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Report Builder</span>
            {comparisonList.length > 0 && (
              <span className="ml-0.5 w-4 h-4 bg-white text-sky-600 text-[9px] rounded-full flex items-center justify-center font-bold font-mono">
                {comparisonList.length}
              </span>
            )}
          </button>

          {/* Theme Toggler */}
          <button
            onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
            className="px-2.5 py-1.5 bg-slate-100/50 hover:bg-slate-200/50 dark:bg-slate-850/50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 rounded-lg transition-all border border-slate-200/50 dark:border-white/10 cursor-pointer h-8 flex items-center justify-center"
            aria-label="Toggle visual contrast theme"
          >
            {theme === "light" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>

          {/* Secure Logout Button */}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="px-2.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 rounded-lg transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer h-8"
              title="Secure Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}

        </div>
      </header>

      {/* 2. Main Workspace Layout */}
      <main className="flex-1 p-5 grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-12 gap-5 overflow-hidden border border-black dark:border-black rounded-3xl m-4 bg-slate-50/10 dark:bg-slate-950/10 backdrop-blur-sm">
        
        {/* Left Column (Search, Filters, Indicators Checklist) */}
        <section className="lg:col-span-1 xl:col-span-3 h-[75vh] lg:h-[82vh] overflow-hidden flex flex-col">
          <DistrictList
            selectedDistrict={selectedDistrict}
            onSelectDistrict={setSelectedDistrict}
            choroplethMetric={choroplethMetric}
            setChoroplethMetric={setChoroplethMetric}
          />
        </section>

        {/* Center Column (Interactive Boundary Leaflet Map overlay) */}
        <section className="lg:col-span-2 xl:col-span-6 h-[55vh] lg:h-[82vh] overflow-hidden">
          <MapComponent
            selectedDistrict={selectedDistrict}
            onSelectDistrict={setSelectedDistrict}
            theme={theme}
            choroplethMetric={choroplethMetric}
          />
        </section>

        {/* Right Column (Detailed profile card, iframe live embeds, comparative stats) */}
        <section className="lg:col-span-1 xl:col-span-3 h-[75vh] lg:h-[82vh] overflow-hidden flex flex-col">
          <RightPanel
            selectedDistrict={selectedDistrict}
            onSelectDistrict={setSelectedDistrict}
            onOpenReportModal={() => setIsReportModalOpen(true)}
            comparisonList={comparisonList}
            onToggleComparison={handleToggleComparison}
            onResetComparison={handleResetComparison}
          />
        </section>

      </main>

      {/* 3. Global Modal for custom reports and prints */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        comparisonList={comparisonList}
        onToggleComparison={handleToggleComparison}
        onResetComparison={handleResetComparison}
      />

      {/* Transparent Secure Authorization Overlay */}
      {!isCheckingSession && !isLoggedIn && (
        <LoginOverlay onLoginSuccess={handleLoginSuccess} />
      )}

      {isCheckingSession && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="p-4 bg-gradient-to-tr from-sky-500 to-indigo-600 rounded-2xl text-white shadow-xl shadow-sky-500/20">
              <Compass className="w-8 h-8 animate-spin-slow text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-50 uppercase tracking-widest font-sans">
                UK Geoportal
              </p>
              <p className="text-[10px] text-slate-400 font-medium mt-1">Verifying Secure Session...</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
