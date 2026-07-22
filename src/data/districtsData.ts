export interface DistrictDetail {
  id: string;
  name: string;
  geojsonName: string; // matches "district" field in GeoJSON
  headquarters: string;
  region: "Garhwal" | "Kumaon";
  area: number; // sq km
  population: number; // 2011 Census
  literacyRate: number; // %
  sexRatio: number; // females per 1000 males
  gisUrl: string;
  githubUrl: string;
  centroid: [number, number]; // [lat, lng]
  description: string;
  keyFeatures: string[];
}

export const districtsData: DistrictDetail[] = [
  {
    id: "almora",
    name: "Almora",
    geojsonName: "Almora",
    headquarters: "Almora",
    region: "Kumaon",
    area: 3139,
    population: 622506,
    literacyRate: 80.47,
    sexRatio: 1139,
    gisUrl: "https://district-almora.onrender.com/",
    githubUrl: "https://github.com/RawatGitLab/District-Almora",
    centroid: [29.5971, 79.6591],
    description: "Known for its rich cultural heritage, unique handicrafts, delicious sweets like Bal Mithai, and panoramic views of the Himalayas. It is a major cultural hub of the Kumaon region.",
    keyFeatures: ["Kasar Devi Temple", "Katarmal Sun Temple", "Jageshwar Dham", "Binsar Wildlife Sanctuary"]
  },
  {
    id: "bageshwar",
    name: "Bageshwar",
    geojsonName: "Bageshwar",
    headquarters: "Bageshwar",
    region: "Kumaon",
    area: 2246,
    population: 259898,
    literacyRate: 80.01,
    sexRatio: 1090,
    gisUrl: "https://district-bageshwar.onrender.com/",
    githubUrl: "https://github.com/RawatGitLab/District-Bageshwar",
    centroid: [29.8404, 79.7694],
    description: "Situated at the confluence of Saryu and Gomti rivers, Bageshwar is a place of extreme religious and historic significance, famously known for the Bagnath Temple.",
    keyFeatures: ["Bagnath Temple", "Kausani", "Pindari Glacier Trek", "Baijnath Temple Complex"]
  },
  {
    id: "chamoli",
    name: "Chamoli",
    geojsonName: "Chamoli",
    headquarters: "Gopeshwar",
    region: "Garhwal",
    area: 8030,
    population: 391605,
    literacyRate: 82.65,
    sexRatio: 1019,
    gisUrl: "https://district-chamoli.onrender.com/",
    githubUrl: "https://github.com/RawatGitLab/District-Chamoli",
    centroid: [30.2937, 79.5603],
    description: "The birthplace of the historic Chipko Movement. Chamoli is home to beautiful valleys, majestic mountain peaks, and highly revered Hindu pilgrimage destinations.",
    keyFeatures: ["Badrinath Temple", "Valley of Flowers", "Hemkund Sahib", "Auli Ski Resort", "Vasudhara Falls"]
  },
  {
    id: "champawat",
    name: "Champawat",
    geojsonName: "Champawat",
    headquarters: "Champawat",
    region: "Kumaon",
    area: 1766,
    population: 259648,
    literacyRate: 79.83,
    sexRatio: 980,
    gisUrl: "https://district-champawat.onrender.com/",
    githubUrl: "https://github.com/RawatGitLab/District-Champawat",
    centroid: [29.3374, 80.0911],
    description: "The ancient capital of the Chand Rulers. Champawat is blessed with diverse flora and fauna, sacred temples, and stunning fort ruins dating back centuries.",
    keyFeatures: ["Kranteshwar Mahadev", "Baleshwar Temple", "Ek Hathiya Ka Naula", "Abbott Mount"]
  },
  {
    id: "dehradun",
    name: "Dehradun",
    geojsonName: "Dehradun",
    headquarters: "Dehradun",
    region: "Garhwal",
    area: 3088,
    population: 1696694,
    literacyRate: 84.25,
    sexRatio: 902,
    gisUrl: "https://district-dehradun.onrender.com/",
    githubUrl: "https://github.com/RawatGitLab/District-Dehradun",
    centroid: [30.3165, 78.0322],
    description: "The capital city of Uttarakhand, nestled in the Doon Valley. Dehradun is a major educational and institutional hub, and home to scenic tourist spots.",
    keyFeatures: ["Robber's Cave (Guchhupani)", "Sahastradhara", "Mindrolling Monastery", "Forest Research Institute (FRI)", "Mussoorie"]
  },
  {
    id: "haridwar",
    name: "Haridwar",
    geojsonName: "Hardwar",
    headquarters: "Haridwar",
    region: "Garhwal",
    area: 2360,
    population: 1890422,
    literacyRate: 73.43,
    sexRatio: 880,
    gisUrl: "https://district-haridwar.onrender.com/",
    githubUrl: "https://github.com/RawatGitLab/District-Haridwar",
    centroid: [29.9457, 78.1642],
    description: "The gateway to the Gods. Located where the holy Ganges emerges from the Himalayas, Haridwar is one of the most sacred pilgrimage places in India.",
    keyFeatures: ["Har Ki Pauri", "Chandi Devi Temple", "Mansa Devi Temple", "Daksheswara Mahadev Temple", "Ganga Aarti"]
  },
  {
    id: "nainital",
    name: "Nainital",
    geojsonName: "Nainital",
    headquarters: "Nainital",
    region: "Kumaon",
    area: 4251,
    population: 954605,
    literacyRate: 83.88,
    sexRatio: 934,
    gisUrl: "https://district-nainital.onrender.com/",
    githubUrl: "https://github.com/RawatGitLab/District-Nainital",
    centroid: [29.3803, 79.4636],
    description: "The Lake District of India. Nainital is a famous hill station built around a pear-shaped emerald lake, surrounded by high mountains and lush forests.",
    keyFeatures: ["Naini Lake", "Naina Devi Temple", "Snow View Point", "Tiffin Top", "Bhimtal & Naukuchiatal"]
  },
  {
    id: "pauri",
    name: "Pauri Garhwal",
    geojsonName: "Garhwal",
    headquarters: "Pauri",
    region: "Garhwal",
    area: 5329,
    population: 687271,
    literacyRate: 82.02,
    sexRatio: 1103,
    gisUrl: "https://district-pauri.onrender.com/",
    githubUrl: "https://github.com/RawatGitLab/District-Pauri",
    centroid: [29.8680, 78.7303],
    description: "Offering magnificent snow-capped Himalayan views. Pauri Garhwal is rich in natural beauty, dense forests of pine and oak, and pristine spiritual locations.",
    keyFeatures: ["Khirsu", "Lansdowne", "Kanvashram", "Kyunkaleshwar Mahadev Temple"]
  },
  {
    id: "pithoragarh",
    name: "Pithoragarh",
    geojsonName: "Pithoragarh",
    headquarters: "Pithoragarh",
    region: "Kumaon",
    area: 7090,
    population: 483439,
    literacyRate: 82.25,
    sexRatio: 1020,
    gisUrl: "https://district-pithoragarh.onrender.com/",
    githubUrl: "https://github.com/RawatGitLab/District-Pithoragarh",
    centroid: [29.5800, 80.2100],
    description: "Known as 'Little Kashmir'. Pithoragarh is a beautiful valley bordered by Tibet and Nepal, serving as a gateway to Kailash Mansarovar pilgrimage.",
    keyFeatures: ["Pithoragarh Fort", "Chandak Hills", "Munsiyari (Milam Glacier Gateway)", "Askot Musk Deer Sanctuary"]
  },
  {
    id: "rudraprayag",
    name: "Rudraprayag",
    geojsonName: "Rudraprayag",
    headquarters: "Rudraprayag",
    region: "Garhwal",
    area: 1984,
    population: 242285,
    literacyRate: 81.30,
    sexRatio: 1114,
    gisUrl: "https://district-rudraprayag.onrender.com/",
    githubUrl: "https://github.com/RawatGitLab/District-Rudraprayag",
    centroid: [30.2858, 78.9818],
    description: "Named after Lord Shiva's Rudra avatar. It marks the holy confluence of the Alaknanda and Mandakini rivers, leading towards Kedarnath.",
    keyFeatures: ["Kedarnath Temple", "Madmaheshwar Temple", "Tungnath Temple (Highest Shiva Temple)", "Deoria Tal", "Chopta Valley"]
  },
  {
    id: "tehri",
    name: "Tehri Garhwal",
    geojsonName: "Tehri Garhwal",
    headquarters: "New Tehri",
    region: "Garhwal",
    area: 3642,
    population: 618931,
    literacyRate: 76.36,
    sexRatio: 1077,
    gisUrl: "https://district-tehri.onrender.com/",
    githubUrl: "https://github.com/RawatGitLab/District-Tehri",
    centroid: [30.3800, 78.4800],
    description: "Famous for the massive Tehri Dam, one of the world's tallest hydroelectric projects. The district offers stunning lake vistas and thrilling water sports.",
    keyFeatures: ["Tehri Dam & Reservoir", "Surkanda Devi Temple", "Khatling Glacier Trek", "Chamba", "Tehri Lake Water Sports"]
  },
  {
    id: "usnagar",
    name: "Udham Singh Nagar",
    geojsonName: "Udham Singh Nagar",
    headquarters: "Rudrapur",
    region: "Kumaon",
    area: 2542,
    population: 1648902,
    literacyRate: 73.10,
    sexRatio: 920,
    gisUrl: "https://district-udham-singh-nagar.onrender.com/",
    githubUrl: "https://github.com/RawatGitLab/District-Udham-Singh-Nagar",
    centroid: [28.9800, 79.4000],
    description: "The food bowl of Uttarakhand. Known for industrial growth, agricultural prosperity, and vibrant multi-cultural communities from diverse backgrounds.",
    keyFeatures: ["Atariya Temple", "Giri Sarovar", "Nanakmatta Sahib Gurudwara", "Chaiti Temple"]
  },
  {
    id: "uttarkashi",
    name: "Uttarkashi",
    geojsonName: "Uttarkashi",
    headquarters: "Uttarkashi",
    region: "Garhwal",
    area: 8016,
    population: 330086,
    literacyRate: 75.81,
    sexRatio: 958,
    gisUrl: "https://district-uttarkashi.onrender.com/",
    githubUrl: "https://github.com/RawatGitLab/District-Uttarkashi",
    centroid: [31.0000, 78.5000],
    description: "The source region of India's most sacred rivers, Ganga (from Gangotri) and Yamuna (from Yamunotri). It is a land of extreme high altitudes, spirituality, and adventure.",
    keyFeatures: ["Gangotri Temple", "Yamunotri Temple", "Dayara Bugyal", "Har Ki Dun Valley", "Gangotri National Park", "Nachiketa Tal"]
  }
];

export const getDistrictById = (id: string): DistrictDetail | undefined => {
  return districtsData.find(d => d.id === id);
};

export const getDistrictByGeojsonName = (geojsonName: string): DistrictDetail | undefined => {
  return districtsData.find(d => d.geojsonName.toLowerCase() === geojsonName.toLowerCase());
};

// Calculate State totals
export const stateTotals = {
  name: "Uttarakhand",
  totalArea: districtsData.reduce((acc, d) => acc + d.area, 0),
  totalPopulation: districtsData.reduce((acc, d) => acc + d.population, 0),
  avgLiteracyRate: Number((districtsData.reduce((acc, d) => acc + d.literacyRate, 0) / districtsData.length).toFixed(2)),
  avgSexRatio: Math.round(districtsData.reduce((acc, d) => acc + d.sexRatio, 0) / districtsData.length)
};
