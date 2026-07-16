import React, { useState, useRef, useEffect } from "react";
import { 
  Building2, Users, Maximize, BarChart3, ArrowRight,
  TrendingUp, Award, ExternalLink, Github, Map, BookOpen, HeartPulse, FileSpreadsheet, PlusCircle, CheckCircle2, RotateCcw
} from "lucide-react";
import { DistrictDetail, districtsData, stateTotals } from "../data/districtsData";

interface RightPanelProps {
  selectedDistrict: DistrictDetail | null;
  onSelectDistrict: (district: DistrictDetail | null) => void;
  onOpenReportModal: () => void;
  comparisonList: string[];
  onToggleComparison: (id: string) => void;
  onResetComparison: () => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  selectedDistrict,
  onSelectDistrict,
  onOpenReportModal,
  comparisonList,
  onToggleComparison,
  onResetComparison
}) => {
  const [activeTab, setActiveTab] = useState<"profile" | "gis">("profile");
  const [activeChartMetric, setActiveChartMetric] = useState<"population" | "area">("population");
  const [isFullscreenGis, setIsFullscreenGis] = useState(false);

  const fullscreenContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreenGis(isCurrentlyFullscreen);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  const handleEnterFullscreen = () => {
    const element = fullscreenContainerRef.current;
    if (element) {
      if (element.requestFullscreen) {
        element.requestFullscreen().catch(() => {
          // Fallback if browser blocks it or inside iframe constraints
          setIsFullscreenGis(true);
        });
      } else if ((element as any).webkitRequestFullscreen) {
        (element as any).webkitRequestFullscreen();
      } else if ((element as any).msRequestFullscreen) {
        (element as any).msRequestFullscreen();
      } else {
        setIsFullscreenGis(true);
      }
    } else {
      setIsFullscreenGis(true);
    }
  };

  const handleExitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {
        setIsFullscreenGis(false);
      });
    } else {
      setIsFullscreenGis(false);
    }
  };

  // Sorting districts for comparison charts
  const sortedDistrictsForChart = [...districtsData].sort((a, b) => b[activeChartMetric] - a[activeChartMetric]);
  const maxChartVal = Math.max(...districtsData.map(d => d[activeChartMetric]));

  return (
    <div className="flex flex-col h-full bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-black dark:border-black rounded-2xl overflow-hidden shadow-sm">
      
      {/* Detail View (No Selected District) */}
      {!selectedDistrict ? (
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar p-6 space-y-6">
          
          {/* State overview header */}
          <div className="border-b border-slate-200/50 dark:border-white/10 pb-5">
            <span className="text-[10px] bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 font-mono font-semibold uppercase px-2.5 py-1 rounded-full">
              State Analytics Overview
            </span>
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50 mt-2">Uttarakhand Geoportal</h1>
            <p className="text-xs text-slate-500 mt-1">A unified portal consolidating high-fidelity GIS layers, boundaries, and statistical profiles across all 13 administrative districts of Uttarakhand.</p>
          </div>

          {/* State totals grid cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-slate-50/30 dark:bg-slate-950/10 rounded-xl border border-slate-200/50 dark:border-white/10">
              <span className="text-[10px] text-slate-400 font-mono block">TOTAL AREA</span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-200 mt-1 block font-mono">
                {stateTotals.totalArea.toLocaleString()} km²
              </span>
              <p className="text-[9px] text-slate-400 mt-1">Garhwal + Kumaon divisions</p>
            </div>
            
            <div className="p-4 bg-slate-50/30 dark:bg-slate-950/10 rounded-xl border border-slate-200/50 dark:border-white/10">
              <span className="text-[10px] text-slate-400 font-mono block">TOTAL POPULATION</span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-200 mt-1 block font-mono">
                {stateTotals.totalPopulation.toLocaleString()}
              </span>
              <p className="text-[9px] text-slate-400 mt-1">Census of India (2011)</p>
            </div>

            <div className="p-4 bg-slate-50/30 dark:bg-slate-950/10 rounded-xl border border-slate-200/50 dark:border-white/10">
              <span className="text-[10px] text-slate-400 font-mono block">AVG LITERACY RATE</span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-200 mt-1 block font-mono">
                {stateTotals.avgLiteracyRate}%
              </span>
              <p className="text-[9px] text-slate-400 mt-1">National average: 74.04%</p>
            </div>

            <div className="p-4 bg-slate-50/30 dark:bg-slate-950/10 rounded-xl border border-slate-200/50 dark:border-white/10">
              <span className="text-[10px] text-slate-400 font-mono block">AVG SEX RATIO</span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-200 mt-1 block font-mono">
                {stateTotals.avgSexRatio}
              </span>
              <p className="text-[9px] text-slate-400 mt-1">Females per 1000 males</p>
            </div>
          </div>

          {/* District Comparison Charts Section */}
          <div className="bg-slate-50/20 dark:bg-slate-950/5 border border-slate-200/50 dark:border-white/10 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-4 border-b border-slate-200/50 dark:border-white/10 pb-2">
              <h2 className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-sky-500" />
                District Comparison Rank
              </h2>
              {/* Metric Toggle */}
              <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-md text-[10px]">
                <button
                  onClick={() => setActiveChartMetric("population")}
                  className={`px-2 py-0.5 font-medium rounded-sm ${
                    activeChartMetric === "population"
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  Population
                </button>
                <button
                  onClick={() => setActiveChartMetric("area")}
                  className={`px-2 py-0.5 font-medium rounded-sm ${
                    activeChartMetric === "area"
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  Area
                </button>
              </div>
            </div>

            {/* Custom SVG/CSS Bar Chart */}
            <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
              {sortedDistrictsForChart.map((dist, idx) => {
                const pct = (dist[activeChartMetric] / maxChartVal) * 100;
                return (
                  <div key={dist.id} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {idx + 1}. {dist.name}
                      </span>
                      <span className="text-slate-500 font-semibold">
                        {activeChartMetric === "population" 
                          ? dist.population.toLocaleString() 
                          : `${dist.area.toLocaleString()} km²`}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${pct}%` }}
                        className={`h-full rounded-full transition-all duration-1000 ${
                          activeChartMetric === "population" 
                            ? "bg-sky-500 dark:bg-sky-600" 
                            : "bg-emerald-500 dark:bg-emerald-600"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Comparative Reporting Box */}
          <div className="p-4 bg-sky-50/40 dark:bg-sky-950/10 border border-sky-100 dark:border-sky-900/40 rounded-xl space-y-3">
            <h3 className="text-xs font-semibold text-sky-900 dark:text-sky-300 flex items-center gap-1.5">
              <FileSpreadsheet className="w-4 h-4 text-sky-500" />
              Comparative Report Builder
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-sky-200/60">
              Aggregate customized metrics across multiple districts. Save summaries, download a tabulated **CSV report**, or compile a printable **PDF executive dossier**.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenReportModal}
                className="px-3.5 py-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
              >
                Configure Executive Report
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              {comparisonList.length > 0 && (
                <button
                  onClick={onResetComparison}
                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
                  title="Clear report selection"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  ({comparisonList.length})
                </button>
              )}
            </div>
          </div>

        </div>
      ) : (
        /* Selected District Profile Panel */
        <div className="flex flex-col h-full overflow-hidden">
          
          {/* Header Tab selectors */}
          <div className="flex border-b border-slate-200/50 dark:border-white/10 p-2 bg-slate-50/50 dark:bg-slate-950/20 justify-between items-center">
            <div className="flex gap-1.5">
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "profile"
                    ? "bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 shadow-xs border border-slate-200/50 dark:border-white/10"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                }`}
              >
                Profile & Datasets
              </button>
              <button
                onClick={() => setActiveTab("gis")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activeTab === "gis"
                    ? "bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 shadow-xs border border-slate-200/50 dark:border-white/10"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                }`}
              >
                Live Web GIS
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </button>
            </div>

            {/* Back button */}
            <button
              onClick={() => onSelectDistrict(null)}
              className="text-[10px] font-mono text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Close Profile
            </button>
          </div>

          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-5">
              
              {/* Title Header */}
              <div className="flex items-start justify-between border-b border-slate-200/50 dark:border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono font-semibold uppercase px-2 py-0.5 rounded-md">
                      {selectedDistrict.region} Region
                    </span>
                    <button
                      onClick={() => onToggleComparison(selectedDistrict.id)}
                      className={`text-[9px] font-mono flex items-center gap-1 px-2 py-0.5 rounded-md border transition-all ${
                        comparisonList.includes(selectedDistrict.id)
                          ? "bg-emerald-50 border-emerald-200/50 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-400"
                          : "bg-white/50 border-slate-200/50 text-slate-500 hover:border-slate-300 dark:bg-slate-800/50 dark:border-white/10 dark:text-slate-400"
                      }`}
                    >
                      {comparisonList.includes(selectedDistrict.id) ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          In Report
                        </>
                      ) : (
                        <>
                          <PlusCircle className="w-3 h-3" />
                          Add to Report
                        </>
                      )}
                    </button>
                  </div>
                  <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50 mt-1.5 flex items-center gap-1.5">
                    {selectedDistrict.name}
                  </h1>
                  <span className="text-xs text-slate-400 mt-1 block">Headquarters: <strong className="text-slate-600 dark:text-slate-300">{selectedDistrict.headquarters}</strong></span>
                </div>

                <div className="flex flex-col gap-1">
                  <a 
                    href={selectedDistrict.gisUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 rounded-lg border border-slate-200/50 dark:border-white/10 inline-flex items-center justify-center"
                    title="Launch Web GIS applet in new window"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a 
                    href={selectedDistrict.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 rounded-lg border border-slate-200/50 dark:border-white/10 inline-flex items-center justify-center"
                    title="Inspect district source repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Brief description */}
              <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic border-l-2 border-slate-300 dark:border-slate-700 pl-3">
                "{selectedDistrict.description}"
              </div>

              {/* Key Census Dataset Info */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider font-mono">
                  Administrative Indicators
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3.5 bg-slate-50/30 dark:bg-slate-950/10 rounded-xl border border-slate-200/50 dark:border-white/10 flex items-start gap-3">
                    <Map className="w-4 h-4 text-emerald-500 mt-0.5" />
                    <div>
                      <span className="block text-[8px] text-slate-400 font-mono uppercase">Landed Area</span>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 font-mono mt-0.5 block">
                        {selectedDistrict.area.toLocaleString()} km²
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50/30 dark:bg-slate-950/10 rounded-xl border border-slate-200/50 dark:border-white/10 flex items-start gap-3">
                    <Users className="w-4 h-4 text-sky-500 mt-0.5" />
                    <div>
                      <span className="block text-[8px] text-slate-400 font-mono uppercase">Population (2011)</span>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 font-mono mt-0.5 block">
                        {selectedDistrict.population.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50/30 dark:bg-slate-950/10 rounded-xl border border-slate-200/50 dark:border-white/10 flex items-start gap-3">
                    <BookOpen className="w-4 h-4 text-purple-500 mt-0.5" />
                    <div>
                      <span className="block text-[8px] text-slate-400 font-mono uppercase">Literacy Rate</span>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 font-mono mt-0.5 block">
                        {selectedDistrict.literacyRate}%
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50/30 dark:bg-slate-950/10 rounded-xl border border-slate-200/50 dark:border-white/10 flex items-start gap-3">
                    <HeartPulse className="w-4 h-4 text-pink-500 mt-0.5" />
                    <div>
                      <span className="block text-[8px] text-slate-400 font-mono uppercase">Sex Ratio (F/1000M)</span>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 font-mono mt-0.5 block">
                        {selectedDistrict.sexRatio}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Landmark Key features list */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider font-mono">
                  Prominent Geographical Landmarks
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDistrict.keyFeatures.map((feat) => (
                    <span 
                      key={feat}
                      className="px-2.5 py-1 text-[10px] bg-slate-100/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200/50 dark:border-white/10 font-medium"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Embedded GIS Banner */}
              <div className="p-4 bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/40 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">Interact with Web GIS App</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Access custom thematic map layers and shapefiles.</p>
                </div>
                <button
                  onClick={() => setActiveTab("gis")}
                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-[10px] font-medium transition-colors"
                >
                  Load App
                </button>
              </div>

            </div>
          )}

          {/* LIVE WEB GIS EMBED TAB */}
          {activeTab === "gis" && (
            <div 
              ref={fullscreenContainerRef} 
              className={`flex-1 bg-slate-100 dark:bg-slate-950 flex flex-col relative ${
                isFullscreenGis ? "fixed inset-0 z-[9999] bg-slate-950 w-screen h-screen" : ""
              }`}
            >
              
              {/* Embed warning/instruction */}
              {isFullscreenGis ? (
                <div className="bg-slate-900 text-white p-3.5 flex justify-between items-center px-6 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="p-1 bg-emerald-500 rounded-md text-white font-mono text-xs">LIVE</span>
                    <h2 className="text-sm font-semibold">Unified Web GIS Workspace: {selectedDistrict.name} District</h2>
                  </div>
                  <button
                    onClick={handleExitFullscreen}
                    className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-semibold transition-all text-white border border-slate-700 cursor-pointer"
                  >
                    Exit Workspace
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-amber-500/10 border-b border-amber-500/20 text-[10px] text-amber-700 dark:text-amber-400 flex items-center justify-between shrink-0">
                  <span>Rendering Live GIS App for <strong>{selectedDistrict.name}</strong>. Drag, click, and inspect layers directly.</span>
                  <button 
                    onClick={handleEnterFullscreen}
                    className="px-2 py-0.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 flex items-center gap-1 font-medium font-sans cursor-pointer"
                  >
                    <Maximize className="w-3 h-3" />
                    Full Embed
                  </button>
                </div>
              )}

              {/* Iframe element */}
              <div className="flex-1 w-full relative">
                <iframe
                  src={selectedDistrict.gisUrl}
                  title={`${selectedDistrict.name} GIS App`}
                  className="w-full h-full border-0 bg-white"
                  allow="geolocation; camera; microphone; fullscreen"
                  referrerPolicy="no-referrer"
                />
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};
