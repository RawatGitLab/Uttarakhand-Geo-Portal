# 🗻 Uttarakhand GEO-Portal

<div align="center">

### 🧭 A unified geo-dashboard for all 13 districts of Uttarakhand 🇮🇳

**Interactive maps 🗺️ · Live census stats 📊 · District GIS launchpad 🔗 · Comparative reports 📑**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Netlify-00C7B7?style=for-the-badge)](https://uttarakhand-geo-portal.netlify.app/)
[![Repo](https://img.shields.io/badge/📦_Repository-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/RawatGitLab/Uttarakhand-Geo-Portal)

[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=flat-square&logo=leaflet&logoColor=white)](https://leafletjs.com/)

</div>

---

## ✨ What is this?

The **Uttarakhand GEO-Portal** is a single-page dashboard 🖥️ that brings together the **13 independently-hosted District GIS applications** and **2011 Census data** of Uttarakhand into one slick, unified view.

Instead of bouncing between 13 separate district websites 😵‍💫, you get:

- 🗺️ One interactive map with every district boundary
- 📇 A searchable, sortable district directory
- 📈 Live population / area / literacy choropleth coloring
- 🔴 Embedded, live district GIS apps — right inside the dashboard
- 🧮 A comparison + report-export tool

Think of it as **mission control** 🛰️ for Uttarakhand's district-level geo-data.

---
## 🚀 Live Link : https://uttarakhand-geo-portal.netlify.app/
---

## 🎯 Features

### 🗺️ Interactive Boundary Map
- Built with **Leaflet** + a bundled GeoJSON of all 13 district boundaries
- 🖱️ Hover for a quick tooltip, click to select a district
- 🎨 **5 basemaps**: Auto (theme-synced) 🌗, Satellite 🛰️, Terrain ⛰️, OSM Street 🛣️, Voyager 🧭
- 🔴 Selected district always outlined in red so you never lose track

### 🎨 Choropleth Visualization
Color-code the whole map by:
- 👥 Population
- 📏 Area
- 📖 Literacy Rate

Six-step color ramps for each metric — the darker the shade, the higher the number! 🌈

### 📇 Smart District Directory
- 🔎 Search by name, HQ, or landmark
- 🏔️ Filter by region: All / Garhwal / Kumaon
- ↕️ Sort by name, population, area, or literacy rate
- 📌 Inline stats on every card (pop, area, literacy)

### 👤 District Profiles
Click any district to unlock:
- 📝 A short description & key landmarks 🏛️
- 📊 4 stat cards: Area, Population, Literacy, Sex Ratio
- 🖼️ A **live embedded iframe** of that district's own GIS app
- ⛶ Fullscreen mode for the embedded GIS app

### 📑 Comparative Report Builder
- ✅ Multi-select districts to compare
- 🧮 Auto-calculated totals & averages
- 📋 Side-by-side comparison table
- 💾 **Export to CSV** 
- 🖨️ **Print a formatted PDF dossier** (via browser print)

### 🌗 Light / Dark Mode
One click and the whole UI — including the map tiles and tooltips — flips theme. 🌞⇄🌙

### 🔗 Quick-Access GIS Directory
A header dropdown linking straight out to all **13 live district GIS apps**, searchable on the fly. 🚪

---

## 🛠️ Tech Stack

| Layer | Tech | Emoji |
|---|---|---|
| UI Framework | React 19 + TypeScript | ⚛️ |
| Build Tool | Vite 6 | ⚡ |
| Styling | Tailwind CSS 4 | 🎨 |
| Mapping | Leaflet + GeoJSON | 🗺️ |
| Icons | lucide-react | 🧩 |
| Animation | motion (Framer Motion) | 🎞️ |
| AI | Google Gemini API (`@google/genai`) | 🤖 |
| Hosting | Netlify | ☁️ |

---

## 🏙️ Districts Covered (13/13) ✅

| District | Region | HQ | Population | Literacy 
|---|---|---|---|---|
| 🏔️ Almora | Kumaon | Almora | 622,506 | 80.47% 
| 🏞️ Bageshwar | Kumaon | Bageshwar | 259,898 | 80.01% 
| 🌸 Chamoli | Garhwal | Gopeshwar | 391,605 | 82.65% 
| 🏰 Champawat | Kumaon | Champawat | 259,648 | 79.83% 
| 🏙️ Dehradun | Garhwal | Dehradun | 1,696,694 | 84.25% 
| 🕉️ Haridwar | Garhwal | Haridwar | 1,890,422 | 73.43% 
| 🏞️ Nainital | Kumaon | Nainital | 954,605 | 83.88% 
| ⛰️ Pauri Garhwal | Garhwal | Pauri | 687,271 | 82.02% 
| 🗻 Pithoragarh | Kumaon | Pithoragarh | 483,439 | 82.25% 
| 🛕 Rudraprayag | Garhwal | Rudraprayag | 242,285 | 81.30% 
| 💧 Tehri Garhwal | Garhwal | New Tehri | 618,931 | 76.36% 
| 🌾 Udham Singh Nagar | Kumaon | Rudrapur | 1,648,902 | 73.10% 
| 🏔️ Uttarkashi | Garhwal | Uttarkashi | 330,086 | 75.81% 

📚 Source: Census of India, 2011

---

## 🧩 Related Repositories

This portal is the 🧠 "brain" that sits on top of 13 sibling district apps, each deployed independently:

```
🏛️ Uttarakhand-Geo-Portal   (this repo — the aggregator, on Netlify ☁️)
   └── 🔗 District-Almora            (Railway 🚂)
   └── 🔗 District-Bageshwar         (Render 🎨)
   └── 🔗 District-Chamoli           (Render 🎨)
   └── 🔗 ... 10 more district apps  (Render 🎨)
```

Each district app is a separate, self-contained GIS project — this portal just gives them a shared front door 🚪.

---

## ⚙️ Getting Started

### ✅ Prerequisites
- 📦 Node.js (any recent LTS)

### 📥 Installation

```bash
# 1️⃣ Clone the repo
git clone https://github.com/RawatGitLab/Uttarakhand-Geo-Portal.git
cd Uttarakhand-Geo-Portal

# 2️⃣ Install dependencies
npm install

# 4️⃣ Fire it up! 🔥
npm run dev
```

🌐 Open **http://localhost:3000** and you're in!

### 📜 Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | 🔥 Start local dev server (hot reload) |
| `npm run build` | 📦 Build for production |
| `npm run preview` | 👀 Preview the production build |
| `npm run lint` | 🔍 Type-check with `tsc` |
| `npm run clean` | 🧹 Remove build artifacts |

---

## 📁 Project Structure

```
Uttarakhand-Geo-Portal/
├── 📄 index.html
├── 🗂️ metadata.json          # App metadata & capability flags
├── 📦 package.json
├── ⚙️ vite.config.ts
└── 📂 src/
    ├── 🚪 main.tsx             # Entry point
    ├── 🧠 App.tsx               # Root component & shared state
    ├── 🎨 index.css             # Tailwind + Leaflet theme overrides
    ├── 📂 components/
    │   ├── 🗺️ MapComponent.tsx      # Leaflet map + choropleth
    │   ├── 📇 DistrictList.tsx      # Searchable district directory
    │   ├── 📊 RightPanel.tsx        # Analytics + profile + GIS embed
    │   ├── 📑 ReportModal.tsx       # Comparison + CSV/PDF export
    │   └── 🔐 LoginOverlay.tsx      # Auth gate
    └── 📂 data/
        ├── 🧾 districtsData.ts      # Static census dataset
        └── 🌍 uttarakhand_district.json  # District boundary GeoJSON
```# 🗻 Uttarakhand GEO-Portal

<div align="center">

### 🧭 A unified geo-dashboard for all 13 districts of Uttarakhand 🇮🇳

**Interactive maps 🗺️ · Live census stats 📊 · District GIS launchpad 🔗 · Comparative reports 📑**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Netlify-00C7B7?style=for-the-badge)](https://uttarakhand-geo-portal.netlify.app/)
[![Repo](https://img.shields.io/badge/📦_Repository-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/RawatGitLab/Uttarakhand-Geo-Portal)

[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=flat-square&logo=leaflet&logoColor=white)](https://leafletjs.com/)

</div>

---

## ✨ What is this?

The **Uttarakhand GEO-Portal** is a single-page dashboard 🖥️ that brings together the **13 independently-hosted District GIS applications** and **2011 Census data** of Uttarakhand into one slick, unified view.

Instead of bouncing between 13 separate district websites 😵‍💫, you get:

- 🗺️ One interactive map with every district boundary
- 📇 A searchable, sortable district directory
- 📈 Live population / area / literacy choropleth coloring
- 🔴 Embedded, live district GIS apps — right inside the dashboard
- 🧮 A comparison + report-export tool

Think of it as **mission control** 🛰️ for Uttarakhand's district-level geo-data.

---
## 🚀 Live Link : https://uttarakhand-geo-portal.netlify.app/
---

## 🎯 Features

### 🗺️ Interactive Boundary Map
- Built with **Leaflet** + a bundled GeoJSON of all 13 district boundaries
- 🖱️ Hover for a quick tooltip, click to select a district
- 🎨 **5 basemaps**: Auto (theme-synced) 🌗, Satellite 🛰️, Terrain ⛰️, OSM Street 🛣️, Voyager 🧭
- 🔴 Selected district always outlined in red so you never lose track

### 🎨 Choropleth Visualization
Color-code the whole map by:
- 👥 Population
- 📏 Area
- 📖 Literacy Rate

Six-step color ramps for each metric — the darker the shade, the higher the number! 🌈

### 📇 Smart District Directory
- 🔎 Search by name, HQ, or landmark
- 🏔️ Filter by region: All / Garhwal / Kumaon
- ↕️ Sort by name, population, area, or literacy rate
- 📌 Inline stats on every card (pop, area, literacy)

### 👤 District Profiles
Click any district to unlock:
- 📝 A short description & key landmarks 🏛️
- 📊 4 stat cards: Area, Population, Literacy, Sex Ratio
- 🖼️ A **live embedded iframe** of that district's own GIS app
- ⛶ Fullscreen mode for the embedded GIS app

### 📑 Comparative Report Builder
- ✅ Multi-select districts to compare
- 🧮 Auto-calculated totals & averages
- 📋 Side-by-side comparison table
- 💾 **Export to CSV** 
- 🖨️ **Print a formatted PDF dossier** (via browser print)

### 🌗 Light / Dark Mode
One click and the whole UI — including the map tiles and tooltips — flips theme. 🌞⇄🌙

### 🔗 Quick-Access GIS Directory
A header dropdown linking straight out to all **13 live district GIS apps**, searchable on the fly. 🚪

---

## 🛠️ Tech Stack

| Layer | Tech | Emoji |
|---|---|---|
| UI Framework | React 19 + TypeScript | ⚛️ |
| Build Tool | Vite 6 | ⚡ |
| Styling | Tailwind CSS 4 | 🎨 |
| Mapping | Leaflet + GeoJSON | 🗺️ |
| Icons | lucide-react | 🧩 |
| Animation | motion (Framer Motion) | 🎞️ |
| AI | Google Gemini API (`@google/genai`) | 🤖 |
| Hosting | Netlify | ☁️ |

---

## 🏙️ Districts Covered (13/13) ✅

| District | Region | HQ | Population | Literacy 
|---|---|---|---|---|
| 🏔️ Almora | Kumaon | Almora | 622,506 | 80.47% 
| 🏞️ Bageshwar | Kumaon | Bageshwar | 259,898 | 80.01% 
| 🌸 Chamoli | Garhwal | Gopeshwar | 391,605 | 82.65% 
| 🏰 Champawat | Kumaon | Champawat | 259,648 | 79.83% 
| 🏙️ Dehradun | Garhwal | Dehradun | 1,696,694 | 84.25% 
| 🕉️ Haridwar | Garhwal | Haridwar | 1,890,422 | 73.43% 
| 🏞️ Nainital | Kumaon | Nainital | 954,605 | 83.88% 
| ⛰️ Pauri Garhwal | Garhwal | Pauri | 687,271 | 82.02% 
| 🗻 Pithoragarh | Kumaon | Pithoragarh | 483,439 | 82.25% 
| 🛕 Rudraprayag | Garhwal | Rudraprayag | 242,285 | 81.30% 
| 💧 Tehri Garhwal | Garhwal | New Tehri | 618,931 | 76.36% 
| 🌾 Udham Singh Nagar | Kumaon | Rudrapur | 1,648,902 | 73.10% 
| 🏔️ Uttarkashi | Garhwal | Uttarkashi | 330,086 | 75.81% 

📚 Source: Census of India, 2011

---

## 🧩 Related Repositories

This portal is the 🧠 "brain" that sits on top of 13 sibling district apps, each deployed independently:

```
🏛️ Uttarakhand-Geo-Portal   (this repo — the aggregator, on Netlify ☁️)
   └── 🔗 District-Almora            (Render 🚂)
   └── 🔗 District-Bageshwar         (Render 🎨)
   └── 🔗 District-Chamoli           (Render 🎨)
   └── 🔗 ... 10 more district apps  (Render 🎨)
```

Each district app is a separate, self-contained GIS project — this portal just gives them a shared front door 🚪.

---

## ⚙️ Getting Started

### ✅ Prerequisites
- 📦 Node.js (any recent LTS)

### 📥 Installation

```bash
# 1️⃣ Clone the repo
git clone https://github.com/RawatGitLab/Uttarakhand-Geo-Portal.git
cd Uttarakhand-Geo-Portal

# 2️⃣ Install dependencies
npm install

# 4️⃣ Fire it up! 🔥
npm run dev
```

🌐 Open **http://localhost:3000** and you're in!

### 📜 Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | 🔥 Start local dev server (hot reload) |
| `npm run build` | 📦 Build for production |
| `npm run preview` | 👀 Preview the production build |
| `npm run lint` | 🔍 Type-check with `tsc` |
| `npm run clean` | 🧹 Remove build artifacts |

---

## 📁 Project Structure

```
Uttarakhand-Geo-Portal/
├── 📄 index.html
├── 🗂️ metadata.json          # App metadata & capability flags
├── 📦 package.json
├── ⚙️ vite.config.ts
└── 📂 src/
    ├── 🚪 main.tsx             # Entry point
    ├── 🧠 App.tsx               # Root component & shared state
    ├── 🎨 index.css             # Tailwind + Leaflet theme overrides
    ├── 📂 components/
    │   ├── 🗺️ MapComponent.tsx      # Leaflet map + choropleth
    │   ├── 📇 DistrictList.tsx      # Searchable district directory
    │   ├── 📊 RightPanel.tsx        # Analytics + profile + GIS embed
    │   ├── 📑 ReportModal.tsx       # Comparison + CSV/PDF export
    │   └── 🔐 LoginOverlay.tsx      # Auth gate
    └── 📂 data/
        ├── 🧾 districtsData.ts      # Static census dataset
        └── 🌍 uttarakhand_district.json  # District boundary GeoJSON
```

---

## 🌱 Roadmap Ideas

- [ ] 🔐 Replace client-side login with real auth
- [ ] 🗃️ Move district data to a live data source instead of a static file
- [ ] 🎯 Add "fly to district" map animation on selection
- [ ] 🧪 Add automated tests
- [ ] 🩹 Add loading/error states for embedded district iframes
- [ ] 📅 Refresh stats beyond the 2011 Census

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 🎉 Feel free to check the [issues page](https://github.com/RawatGitLab/Uttarakhand-Geo-Portal/issues).

---

## 📜 License

This project is part of the `RawatGitLab` organization. 

---

<div align="center">

### 🏔️ Made with ❤️ for Uttarakhand INDIA.

**⭐ Star this repo if you found it useful! ⭐**

</div>


---

## 🌱 Roadmap Ideas

- [ ] 🔐 Replace client-side login with real auth
- [ ] 🗃️ Move district data to a live data source instead of a static file
- [ ] 🎯 Add "fly to district" map animation on selection
- [ ] 🧪 Add automated tests
- [ ] 🩹 Add loading/error states for embedded district iframes
- [ ] 📅 Refresh stats beyond the 2011 Census

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 🎉 Feel free to check the [issues page](https://github.com/RawatGitLab/Uttarakhand-Geo-Portal/issues).

---

## 📜 License

This project is part of the `RawatGitLab` organization. 

---

<div align="center">

### 🏔️ Made with ❤️ for Uttarakhand INDIA.

**⭐ Star this repo if you found it useful! ⭐**

</div>
