import React from "react";
import { X, FileSpreadsheet, Printer, Check, Plus, Trash2, HelpCircle } from "lucide-react";
import { DistrictDetail, districtsData } from "../data/districtsData";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparisonList: string[];
  onToggleComparison: (id: string) => void;
  onResetComparison: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  comparisonList,
  onToggleComparison,
  onResetComparison
}) => {
  if (!isOpen) return null;

  // Selected district entities
  const selectedDistricts = districtsData.filter(d => comparisonList.includes(d.id));

  // Calculate totals and averages for selected districts
  const totals = {
    count: selectedDistricts.length,
    area: selectedDistricts.reduce((sum, d) => sum + d.area, 0),
    population: selectedDistricts.reduce((sum, d) => sum + d.population, 0),
    avgLiteracy: selectedDistricts.length 
      ? Number((selectedDistricts.reduce((sum, d) => sum + d.literacyRate, 0) / selectedDistricts.length).toFixed(2))
      : 0,
    avgSexRatio: selectedDistricts.length
      ? Math.round(selectedDistricts.reduce((sum, d) => sum + d.sexRatio, 0) / selectedDistricts.length)
      : 0
  };

  // CSV Exporter
  const handleExportCSV = () => {
    if (selectedDistricts.length === 0) return;

    // Headers
    const headers = ["District Name", "Headquarters", "Region", "Area (sq km)", "Population (2011)", "Literacy Rate (%)", "Sex Ratio (F/1000M)", "Live GIS Web URL"];
    
    // Rows
    const rows = selectedDistricts.map(d => [
      d.name,
      d.headquarters,
      d.region,
      d.area,
      d.population,
      d.literacyRate,
      d.sexRatio,
      d.gisUrl
    ]);

    // Construct CSV content
    const csvContent = [headers, ...rows].map(e => e.map(val => `"${val}"`).join(",")).join("\n");
    
    // Download trigger
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Uttarakhand_GIS_Comparative_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print triggering for high fidelity PDF saving
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 no-print">
      
      {/* Modal Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-200">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950/20">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">Comparative District Report Executive Suite</h2>
            <p className="text-xs text-slate-500 mt-1">Compile data profiles and print customized dossiers comparing multiple districts side-by-side.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Body (Split column or grid) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col md:flex-row gap-6">
          
          {/* Left Column: District Checkbox select list */}
          <div className="w-full md:w-1/3 flex flex-col space-y-3 pr-2 border-r border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400">Select Districts</span>
              {comparisonList.length > 0 && (
                <button
                  onClick={onResetComparison}
                  className="text-[10px] text-red-500 hover:text-red-600 font-medium flex items-center gap-1 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Reset ({comparisonList.length})
                </button>
              )}
            </div>
            
            {/* Scroll list */}
            <div className="flex-1 max-h-[300px] md:max-h-none overflow-y-auto space-y-1.5 pr-1 no-scrollbar">
              {districtsData.map((d) => {
                const isSelected = comparisonList.includes(d.id);
                return (
                  <button
                    key={d.id}
                    onClick={() => onToggleComparison(d.id)}
                    className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between transition-all group ${
                      isSelected
                        ? "bg-sky-50/50 dark:bg-sky-950/20 border-sky-200 dark:border-sky-800 text-slate-900 dark:text-slate-100"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
                        isSelected 
                          ? "bg-sky-500 border-sky-500 text-white" 
                          : "border-slate-300 dark:border-slate-700"
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-semibold">{d.name}</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400">{d.region}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Comparative Metrics and Tabulated Summary */}
          <div className="flex-1 flex flex-col space-y-4">
            
            {selectedDistricts.length === 0 ? (
              /* No selection state */
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50/50 dark:bg-slate-950/10 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl border-dashed">
                <HelpCircle className="w-10 h-10 text-slate-300 mb-3" />
                <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300">No Districts Selected</h3>
                <p className="text-[11px] text-slate-400 max-w-xs mt-1">Select districts from the checklist on the left to instantly calculate comparisons and generate reporting aggregates.</p>
              </div>
            ) : (
              /* Statistics Overview and Tabulated report */
              <div className="space-y-4 flex flex-col flex-1">
                
                {/* Aggregate Summary Badges */}
                <div className="grid grid-cols-4 gap-2 bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800/50 p-3 rounded-xl font-mono text-[10px]">
                  <div>
                    <span className="block text-slate-400 uppercase text-[8px]">Selected</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5 block">{totals.count} districts</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 uppercase text-[8px]">Sum Area</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5 block">{totals.area.toLocaleString()} km²</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 uppercase text-[8px]">Sum Pop</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5 block">{(totals.population / 1000).toFixed(0)}k</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 uppercase text-[8px]">Avg Literacy</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5 block">{totals.avgLiteracy}%</span>
                  </div>
                </div>

                {/* Grid comparative Table */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex-1 max-h-[300px] overflow-y-auto no-scrollbar">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-50 dark:bg-slate-800 text-[10px] text-slate-400 font-mono sticky top-0 uppercase tracking-wider">
                      <tr>
                        <th className="p-2.5 font-bold">District</th>
                        <th className="p-2.5 font-bold">Region</th>
                        <th className="p-2.5 font-bold">Area (km²)</th>
                        <th className="p-2.5 font-bold">Population</th>
                        <th className="p-2.5 font-bold">Literacy</th>
                        <th className="p-2.5 font-bold">Sex Ratio</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {selectedDistricts.map((d) => (
                        <tr key={d.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="p-2.5 font-semibold text-slate-800 dark:text-slate-200">{d.name}</td>
                          <td className="p-2.5 font-medium text-slate-500">{d.region}</td>
                          <td className="p-2.5 font-mono text-slate-700 dark:text-slate-300">{d.area.toLocaleString()}</td>
                          <td className="p-2.5 font-mono text-slate-700 dark:text-slate-300">{d.population.toLocaleString()}</td>
                          <td className="p-2.5 font-mono text-slate-700 dark:text-slate-300">{d.literacyRate}%</td>
                          <td className="p-2.5 font-mono text-slate-700 dark:text-slate-300">{d.sexRatio}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Exporter buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 justify-end">
                  <button
                    onClick={handleExportCSV}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
                    Download CSV
                  </button>
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Printer className="w-4 h-4" />
                    Print PDF Dossier
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* PRINT-ONLY EMBEDDED DOSSIER PAGE (Visible ONLY during print layout) */}
      <div className="hidden print:block print-only absolute inset-0 bg-white text-black p-12 space-y-8 font-sans">
        
        {/* Print Header */}
        <div className="border-b-2 border-slate-300 pb-4 text-center">
          <h1 className="text-2xl font-bold uppercase tracking-wider">Uttarakhand State Boundary & Web GIS Comparative Report</h1>
          <p className="text-sm text-slate-500 mt-1">Generated dynamically on: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Selected Totals and Averages list */}
        <div className="grid grid-cols-4 gap-4 border border-slate-200 p-4 rounded-xl text-center">
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Aggegated Districts</span>
            <span className="text-lg font-bold text-slate-800 mt-1 block">{totals.count}</span>
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Aggregate Area</span>
            <span className="text-lg font-bold text-slate-800 mt-1 block">{totals.area.toLocaleString()} sq km</span>
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Aggregate Pop</span>
            <span className="text-lg font-bold text-slate-800 mt-1 block">{totals.population.toLocaleString()}</span>
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Literacy</span>
            <span className="text-lg font-bold text-slate-800 mt-1 block">{totals.avgLiteracy}%</span>
          </div>
        </div>

        {/* Tabulated District Profiles */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase border-b border-slate-300 pb-1">Tabulated Comparison Index</h3>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-400 text-[10px] uppercase font-bold text-slate-600">
                <th className="py-2">District Name</th>
                <th className="py-2">Headquarters</th>
                <th className="py-2">Region</th>
                <th className="py-2">Area (km²)</th>
                <th className="py-2">Population</th>
                <th className="py-2">Literacy Rate</th>
                <th className="py-2">Sex Ratio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {selectedDistricts.map((d) => (
                <tr key={d.id} className="py-1">
                  <td className="py-2 font-bold">{d.name}</td>
                  <td className="py-2">{d.headquarters}</td>
                  <td className="py-2">{d.region}</td>
                  <td className="py-2 font-mono">{d.area.toLocaleString()}</td>
                  <td className="py-2 font-mono">{d.population.toLocaleString()}</td>
                  <td className="py-2 font-mono">{d.literacyRate}%</td>
                  <td className="py-2 font-mono">{d.sexRatio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Brief Narrative/Legal Disclaimer */}
        <div className="pt-8 text-[10px] text-slate-400 space-y-1.5 border-t border-slate-200">
          <p><strong>Methodological Notes:</strong> Demographic boundaries and statistical indices correspond strictly to Census of India (2011) datasets.</p>
          <p><strong>Disclaimer:</strong> This executive dossier was generated automatically via the Uttarakhand District Unified GIS Portal. Boundaries are for administrative overview and analysis only.</p>
        </div>

      </div>

    </div>
  );
};
