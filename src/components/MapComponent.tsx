import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { Layers, Check, Compass, Globe, Map as MapIcon, Image } from "lucide-react";
import { DistrictDetail, districtsData } from "../data/districtsData";
import uttarakhandGeoJson from "../data/uttarakhand_district.json";

// Define basemap choices
const BASEMAPS = [
  {
    id: "auto",
    name: "Auto (Theme)",
    url: (theme: "light" | "dark") => theme === "dark" 
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    thumbnail: "bg-gradient-to-tr from-slate-900 via-slate-600 to-slate-200"
  },
  {
    id: "satellite",
    name: "Satellite",
    url: () => "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    thumbnail: "bg-gradient-to-tr from-emerald-950 via-emerald-800 to-sky-900"
  },
  {
    id: "terrain",
    name: "Terrain",
    url: () => "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community",
    thumbnail: "bg-gradient-to-tr from-stone-800 via-amber-800 to-emerald-600"
  },
  {
    id: "street",
    name: "OSM Street",
    url: () => "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    thumbnail: "bg-gradient-to-tr from-blue-100 via-slate-300 to-amber-100"
  },
  {
    id: "voyager",
    name: "Voyager",
    url: () => "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    thumbnail: "bg-gradient-to-tr from-sky-400 via-amber-200 to-emerald-400"
  }
];

interface MapComponentProps {
  selectedDistrict: DistrictDetail | null;
  onSelectDistrict: (district: DistrictDetail | null) => void;
  theme: "light" | "dark";
  choroplethMetric: "population" | "area" | "literacyRate" | "none";
}

// Color getters for choropleth rendering
const getPopulationColor = (pop: number): string => {
  return pop > 1500000 ? "#1e3a8a" : // slate blue-900
         pop > 1000000 ? "#2563eb" : // blue-600
         pop > 600000  ? "#3b82f6" : // blue-500
         pop > 400000  ? "#60a5fa" : // blue-400
         pop > 300000  ? "#93c5fd" : // blue-300
                         "#dbeafe";   // blue-100
};

const getAreaColor = (area: number): string => {
  return area > 7000 ? "#064e3b" : // emerald-900
         area > 5000 ? "#047857" : // emerald-700
         area > 3500 ? "#10b981" : // emerald-500
         area > 2500 ? "#34d399" : // emerald-400
         area > 1800 ? "#6ee7b7" : // emerald-300
                       "#a7f3d0";   // emerald-200
};

const getLiteracyColor = (lit: number): string => {
  return lit > 83.5 ? "#311042" : // purple-950
         lit > 81.5 ? "#581c87" : // purple-900
         lit > 80.0 ? "#7e22ce" : // purple-700
         lit > 76.0 ? "#a855f7" : // purple-500
         lit > 73.0 ? "#c084fc" : // purple-400
                      "#e9d5ff";   // purple-200
};

export const MapComponent: React.FC<MapComponentProps> = ({
  selectedDistrict,
  onSelectDistrict,
  theme,
  choroplethMetric
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const geojsonLayerRef = useRef<L.GeoJSON | null>(null);

  const [activeBasemap, setActiveBasemap] = useState<string>("auto");
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);

  // Zoom map to the bounds of the Uttarakhand GIS layer
  const handleZoomToLayer = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    
    if (geojsonLayerRef.current) {
      map.fitBounds(geojsonLayerRef.current.getBounds(), {
        padding: [12, 12],
        animate: true,
        duration: 1.0
      });
    } else {
      map.flyTo([30.15, 79.15], 7.8, {
        animate: true,
        duration: 1.0
      });
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center map around central Uttarakhand (lat ~30.0668, lng ~79.0193)
    const map = L.map(mapContainerRef.current, {
      center: [30.15, 79.15],
      zoom: 7.8,
      zoomControl: false, // will place custom zoom control later or keep it cleaner
      minZoom: 6.5,
      maxZoom: 12,
      zoomSnap: 0.1,
    });

    L.control.zoom({ position: "topright" }).addTo(map);
    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle tile layer change on theme toggle or active basemap change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const currentConfig = BASEMAPS.find(b => b.id === activeBasemap) || BASEMAPS[0];
    const tileUrl = currentConfig.id === "auto" 
      ? currentConfig.url(theme)
      : currentConfig.url(theme); // will return the static URL for non-auto maps
    
    const attribution = currentConfig.attribution;

    tileLayerRef.current = L.tileLayer(tileUrl, { attribution }).addTo(map);
  }, [theme, activeBasemap]);

  // Update styles and load GeoJSON
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (geojsonLayerRef.current) {
      map.removeLayer(geojsonLayerRef.current);
    }

    // Define polygon styles based on metric
    const getStyle = (feature: any) => {
      const distName = feature.properties.district;
      // Find corresponding district in districtsData
      const distInfo = districtsData.find(d => d.geojsonName.toLowerCase() === distName.toLowerCase());

      let fillColor = "#cbd5e1"; // default gray
      let fillOpacity = 0.65;

      if (distInfo) {
        // Highlight active district
        const isActive = selectedDistrict && selectedDistrict.id === distInfo.id;
        
        if (choroplethMetric === "population") {
          fillColor = getPopulationColor(distInfo.population);
        } else if (choroplethMetric === "area") {
          fillColor = getAreaColor(distInfo.area);
        } else if (choroplethMetric === "literacyRate") {
          fillColor = getLiteracyColor(distInfo.literacyRate);
        } else {
          // default light-slate color
          fillColor = distInfo.region === "Garhwal" ? "#38bdf8" : "#fbbf24"; // sky blue vs amber
          fillOpacity = isActive ? 0.8 : 0.45;
        }

        if (isActive) {
          fillOpacity = 0.85;
        }
      }

      const isActive = selectedDistrict && distInfo && selectedDistrict.id === distInfo.id;

      return {
        fillColor,
        fillOpacity,
        color: isActive ? "#ef4444" : (theme === "dark" ? "#475569" : "#94a3b8"), // red border for active
        weight: isActive ? 3 : 1.5,
        dashArray: isActive ? "" : "3"
      };
    };

    // On hover effect
    const highlightFeature = (e: L.LeafletMouseEvent) => {
      const layer = e.target;
      layer.setStyle({
        weight: 3,
        color: selectedDistrict && selectedDistrict.geojsonName.toLowerCase() === layer.feature.properties.district.toLowerCase() ? "#ef4444" : (theme === "dark" ? "#f8fafc" : "#0f172a"),
        fillOpacity: 0.9,
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    };

    // Reset hover effect
    const resetHighlight = (e: L.LeafletMouseEvent) => {
      if (geojsonLayerRef.current) {
        geojsonLayerRef.current.resetStyle(e.target);
      }
    };

    // Click handler
    const onEachFeature = (feature: any, layer: L.Layer) => {
      const distName = feature.properties.district;
      const distInfo = districtsData.find(d => d.geojsonName.toLowerCase() === distName.toLowerCase());

      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: () => {
          if (distInfo) {
            onSelectDistrict(distInfo);
          }
        }
      });

      // Bind simple elegant popup or tooltip
      if (distInfo) {
        const titleClass = theme === "dark" ? "text-slate-100 border-slate-700/50" : "text-slate-900 border-slate-200";
        const textClass = theme === "dark" ? "text-slate-300" : "text-slate-800 font-medium";

        const tooltipContent = `
          <div class="text-xs">
            <div class="font-bold border-b pb-1 mb-1 ${titleClass}">${distInfo.name}</div>
            <div class="text-[10px] ${textClass}">HQ: ${distInfo.headquarters}</div>
            <div class="text-[10px] ${textClass}">Pop: ${distInfo.population.toLocaleString()}</div>
            <div class="text-[10px] ${textClass}">Area: ${distInfo.area.toLocaleString()} km²</div>
          </div>
        `;
        layer.bindTooltip(tooltipContent, {
          className: theme === "dark" ? "custom-tooltip" : "custom-tooltip-light",
          sticky: true,
          direction: "top"
        });
      }
    };

    // Create GeoJSON layer
    const geojson = L.geoJSON(uttarakhandGeoJson as any, {
      style: getStyle,
      onEachFeature
    }).addTo(map);

    geojsonLayerRef.current = geojson;
  }, [selectedDistrict, theme, choroplethMetric, onSelectDistrict]);

  // Auto-zoom and pan on selectedDistrict change has been disabled to keep map focus static and only update the visual highlighting.

  return (
    <div className="relative w-full h-full min-h-[350px] md:min-h-[500px] rounded-2xl overflow-hidden shadow-lg bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-black dark:border-black">
      {/* Map Container Element */}
      <div ref={mapContainerRef} className="w-full h-full" style={{ outline: "none" }} />

      {/* Floating Basemap Gallery & Zoom Control */}
      <div className="absolute top-4 left-4 z-[400] flex flex-col items-start gap-2 max-w-[280px]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsGalleryOpen(!isGalleryOpen)}
            className="bg-white/90 dark:bg-slate-900/95 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 p-2 rounded-xl border border-black dark:border-black shadow-md flex items-center gap-1.5 transition-all text-xs font-semibold cursor-pointer"
            title="Select Base Map Layer"
          >
            <Layers className="w-3.5 h-3.5 text-sky-500" />
            <span>Basemap Gallery</span>
          </button>

          <button
            onClick={handleZoomToLayer}
            className="bg-white/90 dark:bg-slate-900/95 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 p-2 rounded-xl border border-black dark:border-black shadow-md flex items-center gap-1.5 transition-all text-xs font-semibold cursor-pointer"
            title="Fit Map to Uttarakhand Boundaries"
          >
            <Compass className="w-3.5 h-3.5 text-emerald-500" />
            <span>Zoom to Layer</span>
          </button>
        </div>
        
        {isGalleryOpen && (
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border border-black dark:border-black shadow-xl p-3 w-64 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-200/50 dark:border-slate-800/50">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">Select Layer</span>
              <span className="text-[9px] text-slate-400 font-mono">Basemap</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {BASEMAPS.map((bm) => {
                const isActive = activeBasemap === bm.id;
                return (
                  <button
                    key={bm.id}
                    onClick={() => {
                      setActiveBasemap(bm.id);
                    }}
                    className={`flex flex-col items-stretch text-left rounded-lg overflow-hidden border p-1.5 transition-all relative cursor-pointer ${
                      isActive 
                        ? "border-sky-500 bg-sky-500/10 dark:bg-sky-500/10 shadow-xs" 
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 bg-slate-50/50 dark:bg-slate-950/25"
                    }`}
                  >
                    {/* Visual Thumbnail representative */}
                    <div className={`h-10 w-full rounded-md ${bm.thumbnail} relative flex items-center justify-center overflow-hidden border border-slate-200/20`}>
                      {isActive && (
                        <div className="absolute inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] font-semibold text-slate-700 dark:text-slate-300 mt-1 truncate block text-center">
                      {bm.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Floating Region Indicator / Small Info overlay */}
      <div className="absolute bottom-4 left-4 z-[400] bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-md rounded-lg px-3 py-1.5 text-[10px] font-mono border border-slate-200/50 dark:border-white/10">
        <span className="font-semibold text-slate-900 dark:text-slate-100">Center:</span> 30.15° N, 79.15° E
      </div>
    </div>
  );
};
