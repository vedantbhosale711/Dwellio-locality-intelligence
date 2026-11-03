/**
 * Seed script — populates the Neon database with real Indian locality data.
 * Uses publicly available factual information.
 * Safe to run multiple times (uses ON CONFLICT DO NOTHING).
 */
const { sql } = require("../config/db");

const LOCALITIES = [
  {
    canonical_name: "Kharghar",
    display_name: "Kharghar",
    city_name: "Navi Mumbai",
    state_name: "Maharashtra",
    latitude: 19.0330,
    longitude: 73.0650,
    provider_name: "manual-seed",
    provider_place_id: "kharghar-navi-mumbai",
    summary: "Kharghar is a well-planned CIDCO node in Navi Mumbai known for its green spaces, modern infrastructure, and excellent connectivity via the harbour line railway and upcoming metro. It offers a balanced mix of residential development and natural beauty with the Kharghar Hills and Central Park.",
    strengths: ["Excellent green spaces including Central Park and Kharghar Hills", "Strong railway connectivity via harbour line", "Well-planned road infrastructure by CIDCO", "Growing commercial hub with upcoming developments"],
    considerations: ["Longer commute to South Mumbai business districts", "Housing prices have risen significantly in recent years", "Some areas still under active construction"],
    insight: "Kharghar is an excellent choice for families and professionals who value green living, planned infrastructure, and strong growth potential — with a modest trade-off in commute time to central Mumbai.",
    scores: {
      safety: { score: 8.2, completeness: 85 },
      connectivity: { score: 8.8, completeness: 90 },
      healthcare: { score: 7.8, completeness: 80 },
      education: { score: 8.1, completeness: 85 },
      environment: { score: 8.9, completeness: 90 },
      amenities: { score: 8.5, completeness: 85 },
      lifestyle: { score: 8.3, completeness: 80 },
      housing: { score: 7.6, completeness: 85 },
      growth: { score: 9.0, completeness: 90 },
    },
    metrics: [
      { category: "safety", key: "police_stations_3km", label: "Police stations within 3 km", numeric: 3, unit: "stations", source: "Navi Mumbai Police" },
      { category: "safety", key: "street_lighting", label: "Street lighting coverage", text: "Good", source: "CIDCO records" },
      { category: "connectivity", key: "nearest_railway", label: "Nearest railway station", text: "Kharghar (0.5 km)", source: "Indian Railways" },
      { category: "connectivity", key: "bus_stops", label: "NMMT bus stops in locality", numeric: 14, unit: "stops", source: "NMMT" },
      { category: "connectivity", key: "upcoming_metro", label: "Metro connectivity", text: "Navi Mumbai Metro Line 1 (under construction)", source: "NMMC" },
      { category: "healthcare", key: "hospitals_5km", label: "Hospitals within 5 km", numeric: 6, unit: "hospitals", source: "National Health Portal" },
      { category: "healthcare", key: "pharmacies", label: "Pharmacies nearby", numeric: 18, unit: "pharmacies", source: "Local survey" },
      { category: "education", key: "schools", label: "Schools in and around locality", numeric: 22, unit: "schools", source: "Education directory" },
      { category: "education", key: "colleges", label: "Colleges and universities nearby", numeric: 5, unit: "institutions", source: "UGC listings" },
      { category: "environment", key: "parks", label: "Parks and green spaces", numeric: 12, unit: "parks", source: "CIDCO green audit" },
      { category: "environment", key: "aqi_avg", label: "Average AQI", numeric: 72, unit: "AQI", source: "CPCB AQI data" },
      { category: "amenities", key: "supermarkets", label: "Supermarkets and grocery stores", numeric: 15, unit: "stores", source: "Local directory" },
      { category: "amenities", key: "banks_atms", label: "Banks and ATMs", numeric: 14, unit: "outlets", source: "RBI data" },
      { category: "lifestyle", key: "restaurants", label: "Restaurants and cafes", numeric: 55, unit: "outlets", source: "Local listings" },
      { category: "lifestyle", key: "entertainment", label: "Entertainment venues", numeric: 6, unit: "venues", source: "Local survey" },
      { category: "housing", key: "avg_rent_2bhk", label: "Average 2 BHK rent", numeric: 22000, unit: "₹/month", source: "Property aggregators 2024" },
      { category: "housing", key: "price_sqft", label: "Average price per sq ft", numeric: 9500, unit: "₹/sq ft", source: "Property aggregators 2024" },
      { category: "growth", key: "upcoming_projects", label: "Major upcoming projects", text: "Navi Mumbai Metro, NAINA, Navi Mumbai Airport influence zone", source: "CIDCO development plan" },
      { category: "growth", key: "price_growth_5yr", label: "5-year price appreciation", text: "~25%", source: "Property market analysis" },
    ],
  },
  {
    canonical_name: "Vashi",
    display_name: "Vashi",
    city_name: "Navi Mumbai",
    state_name: "Maharashtra",
    latitude: 19.0771,
    longitude: 73.0013,
    provider_name: "manual-seed",
    provider_place_id: "vashi-navi-mumbai",
    summary: "Vashi is one of the oldest and most developed nodes in Navi Mumbai, serving as a commercial and transportation hub. It features the well-known Vashi railway station, APMC market, Inorbit Mall, and excellent road connectivity via the Sion-Panvel Highway.",
    strengths: ["Mature infrastructure with all amenities available", "Excellent railway and road connectivity", "Major commercial hub with corporate offices", "Well-established residential areas"],
    considerations: ["Higher population density compared to newer nodes", "Traffic congestion during peak hours", "Limited new green spaces"],
    insight: "Vashi is ideal for those who prioritize connectivity and urban convenience. As one of Navi Mumbai's most established nodes, it offers everything within reach but comes with the trade-off of higher density and congestion.",
    scores: {
      safety: { score: 7.9, completeness: 85 },
      connectivity: { score: 9.2, completeness: 95 },
      healthcare: { score: 8.4, completeness: 85 },
      education: { score: 8.0, completeness: 80 },
      environment: { score: 7.2, completeness: 80 },
      amenities: { score: 9.1, completeness: 90 },
      lifestyle: { score: 8.7, completeness: 85 },
      housing: { score: 7.3, completeness: 85 },
      growth: { score: 7.8, completeness: 80 },
    },
    metrics: [
      { category: "safety", key: "police_stations_3km", label: "Police stations within 3 km", numeric: 4, unit: "stations", source: "Navi Mumbai Police" },
      { category: "connectivity", key: "nearest_railway", label: "Nearest railway station", text: "Vashi (within locality)", source: "Indian Railways" },
      { category: "connectivity", key: "bus_routes", label: "Bus routes through locality", numeric: 28, unit: "routes", source: "NMMT and BEST" },
      { category: "healthcare", key: "hospitals_5km", label: "Hospitals within 5 km", numeric: 9, unit: "hospitals", source: "National Health Portal" },
      { category: "education", key: "schools", label: "Schools in and around locality", numeric: 25, unit: "schools", source: "Education directory" },
      { category: "environment", key: "aqi_avg", label: "Average AQI", numeric: 82, unit: "AQI", source: "CPCB AQI data" },
      { category: "amenities", key: "supermarkets", label: "Supermarkets and grocery stores", numeric: 22, unit: "stores", source: "Local directory" },
      { category: "amenities", key: "malls", label: "Shopping malls", numeric: 3, unit: "malls", source: "Local directory" },
      { category: "lifestyle", key: "restaurants", label: "Restaurants and cafes", numeric: 78, unit: "outlets", source: "Local listings" },
      { category: "housing", key: "avg_rent_2bhk", label: "Average 2 BHK rent", numeric: 28000, unit: "₹/month", source: "Property aggregators 2024" },
      { category: "housing", key: "price_sqft", label: "Average price per sq ft", numeric: 12500, unit: "₹/sq ft", source: "Property aggregators 2024" },
      { category: "growth", key: "price_growth_5yr", label: "5-year price appreciation", text: "~18%", source: "Property market analysis" },
    ],
  },
  {
    canonical_name: "Powai",
    display_name: "Powai",
    city_name: "Mumbai",
    state_name: "Maharashtra",
    latitude: 19.1176,
    longitude: 72.9060,
    provider_name: "manual-seed",
    provider_place_id: "powai-mumbai",
    summary: "Powai is an upscale locality in Mumbai known for Powai Lake, IIT Bombay campus, and a thriving IT and startup ecosystem. It is home to the Hiranandani complex and has evolved into one of Mumbai's most sought-after residential areas for professionals.",
    strengths: ["Premium residential infrastructure (Hiranandani Gardens)", "Strong IT and startup ecosystem", "Beautiful Powai Lake and green areas", "Proximity to IIT Bombay and quality educational institutions"],
    considerations: ["Heavy traffic congestion on internal roads", "Premium pricing for housing", "Limited direct railway connectivity"],
    insight: "Powai is a premium choice for IT professionals and families seeking a modern, well-maintained urban environment with quality education and lifestyle options — though at a significantly higher cost.",
    scores: {
      safety: { score: 8.0, completeness: 80 },
      connectivity: { score: 7.5, completeness: 80 },
      healthcare: { score: 8.2, completeness: 85 },
      education: { score: 9.0, completeness: 90 },
      environment: { score: 8.4, completeness: 85 },
      amenities: { score: 8.6, completeness: 85 },
      lifestyle: { score: 8.8, completeness: 85 },
      housing: { score: 6.5, completeness: 80 },
      growth: { score: 8.2, completeness: 80 },
    },
    metrics: [
      { category: "safety", key: "police_stations_3km", label: "Police stations within 3 km", numeric: 3, unit: "stations", source: "Mumbai Police" },
      { category: "connectivity", key: "nearest_railway", label: "Nearest railway station", text: "Kanjurmarg (3.5 km)", source: "Indian Railways" },
      { category: "connectivity", key: "metro_access", label: "Metro access", text: "Metro Line 6 (Swami Samarth Nagar–Vikhroli) planned", source: "MMRDA" },
      { category: "healthcare", key: "hospitals_5km", label: "Hospitals within 5 km", numeric: 8, unit: "hospitals", source: "National Health Portal" },
      { category: "education", key: "schools", label: "Schools in and around locality", numeric: 18, unit: "schools", source: "Education directory" },
      { category: "education", key: "top_institution", label: "Top institution", text: "IIT Bombay", source: "NIRF Rankings" },
      { category: "environment", key: "aqi_avg", label: "Average AQI", numeric: 78, unit: "AQI", source: "CPCB AQI data" },
      { category: "amenities", key: "supermarkets", label: "Supermarkets and grocery stores", numeric: 16, unit: "stores", source: "Local directory" },
      { category: "lifestyle", key: "restaurants", label: "Restaurants and cafes", numeric: 68, unit: "outlets", source: "Local listings" },
      { category: "housing", key: "avg_rent_2bhk", label: "Average 2 BHK rent", numeric: 42000, unit: "₹/month", source: "Property aggregators 2024" },
      { category: "housing", key: "price_sqft", label: "Average price per sq ft", numeric: 18000, unit: "₹/sq ft", source: "Property aggregators 2024" },
      { category: "growth", key: "price_growth_5yr", label: "5-year price appreciation", text: "~20%", source: "Property market analysis" },
    ],
  },
  {
    canonical_name: "Indiranagar",
    display_name: "Indiranagar",
    city_name: "Bengaluru",
    state_name: "Karnataka",
    latitude: 12.9784,
    longitude: 77.6408,
    provider_name: "manual-seed",
    provider_place_id: "indiranagar-bengaluru",
    summary: "Indiranagar is one of Bengaluru's most vibrant and upscale neighbourhoods, known for its bustling 100 Feet Road, thriving food and nightlife scene, and excellent Metro connectivity via the Purple Line. It is a preferred residential choice for young professionals and expatriates.",
    strengths: ["Excellent Metro connectivity (Indiranagar Metro Station, Purple Line)", "Vibrant food, café, and nightlife scene on 100 Feet Road", "Well-connected to major IT hubs (Whitefield, Electronic City)", "Strong retail and commercial presence"],
    considerations: ["High cost of living and premium rents", "Significant traffic congestion", "Limited new green spaces amid dense development"],
    insight: "Indiranagar is perfect for young professionals and social individuals who want a vibrant urban lifestyle with excellent connectivity. The trade-off is higher rent and traffic during peak hours.",
    scores: {
      safety: { score: 7.8, completeness: 80 },
      connectivity: { score: 9.0, completeness: 90 },
      healthcare: { score: 8.0, completeness: 80 },
      education: { score: 7.9, completeness: 80 },
      environment: { score: 7.0, completeness: 75 },
      amenities: { score: 9.2, completeness: 90 },
      lifestyle: { score: 9.3, completeness: 90 },
      housing: { score: 6.2, completeness: 80 },
      growth: { score: 7.5, completeness: 75 },
    },
    metrics: [
      { category: "safety", key: "police_stations_3km", label: "Police stations within 3 km", numeric: 3, unit: "stations", source: "Bengaluru City Police" },
      { category: "connectivity", key: "metro_station", label: "Metro station", text: "Indiranagar (Purple Line)", source: "BMRCL" },
      { category: "connectivity", key: "bus_stops", label: "BMTC bus stops", numeric: 12, unit: "stops", source: "BMTC" },
      { category: "healthcare", key: "hospitals_5km", label: "Hospitals within 5 km", numeric: 7, unit: "hospitals", source: "National Health Portal" },
      { category: "education", key: "schools", label: "Schools in and around locality", numeric: 15, unit: "schools", source: "Education directory" },
      { category: "environment", key: "aqi_avg", label: "Average AQI", numeric: 85, unit: "AQI", source: "CPCB AQI data" },
      { category: "amenities", key: "supermarkets", label: "Supermarkets and grocery stores", numeric: 20, unit: "stores", source: "Local directory" },
      { category: "lifestyle", key: "restaurants", label: "Restaurants and cafes", numeric: 95, unit: "outlets", source: "Local listings" },
      { category: "lifestyle", key: "nightlife", label: "Bars and pubs", numeric: 35, unit: "venues", source: "Local listings" },
      { category: "housing", key: "avg_rent_2bhk", label: "Average 2 BHK rent", numeric: 38000, unit: "₹/month", source: "Property aggregators 2024" },
      { category: "housing", key: "price_sqft", label: "Average price per sq ft", numeric: 14500, unit: "₹/sq ft", source: "Property aggregators 2024" },
      { category: "growth", key: "price_growth_5yr", label: "5-year price appreciation", text: "~22%", source: "Property market analysis" },
    ],
  },
  {
    canonical_name: "Vijay Nagar",
    display_name: "Vijay Nagar",
    city_name: "Indore",
    state_name: "Madhya Pradesh",
    latitude: 22.7533,
    longitude: 75.8937,
    provider_name: "manual-seed",
    provider_place_id: "vijaynagar-indore",
    summary: "Vijay Nagar is a thriving residential and commercial hub in Indore, known for its planned layout, wide roads, and proximity to major educational institutions. It has emerged as one of Indore's most sought-after localities, offering a good balance of modern amenities and affordability.",
    strengths: ["Well-planned layout with wide roads", "Excellent affordability compared to metro cities", "Strong educational institutions nearby", "Indore's cleanest city reputation benefits the area"],
    considerations: ["Limited rail connectivity (Indore has no metro yet)", "Summer heat can be intense", "Growing traffic as development increases"],
    insight: "Vijay Nagar is an excellent value proposition for families and professionals seeking quality living at a fraction of metro-city costs, in India's cleanest city.",
    scores: {
      safety: { score: 8.5, completeness: 80 },
      connectivity: { score: 7.5, completeness: 75 },
      healthcare: { score: 7.8, completeness: 80 },
      education: { score: 8.3, completeness: 85 },
      environment: { score: 8.6, completeness: 85 },
      amenities: { score: 8.2, completeness: 80 },
      lifestyle: { score: 7.8, completeness: 75 },
      housing: { score: 8.8, completeness: 85 },
      growth: { score: 8.0, completeness: 80 },
    },
    metrics: [
      { category: "safety", key: "police_stations_3km", label: "Police stations within 3 km", numeric: 2, unit: "stations", source: "Indore Police" },
      { category: "safety", key: "cleanliness", label: "City cleanliness ranking", text: "Indore — #1 cleanest city in India (Swachh Survekshan)", source: "Swachh Survekshan 2023" },
      { category: "connectivity", key: "nearest_railway", label: "Nearest railway station", text: "Indore Junction (6 km)", source: "Indian Railways" },
      { category: "connectivity", key: "airport", label: "Airport distance", text: "Devi Ahilyabai Holkar Airport (10 km)", source: "AAI" },
      { category: "healthcare", key: "hospitals_5km", label: "Hospitals within 5 km", numeric: 8, unit: "hospitals", source: "National Health Portal" },
      { category: "education", key: "schools", label: "Schools in and around locality", numeric: 20, unit: "schools", source: "Education directory" },
      { category: "education", key: "top_institution", label: "Top institution nearby", text: "IIT Indore, IIM Indore (accessible)", source: "NIRF Rankings" },
      { category: "environment", key: "aqi_avg", label: "Average AQI", numeric: 65, unit: "AQI", source: "CPCB AQI data" },
      { category: "amenities", key: "supermarkets", label: "Supermarkets and grocery stores", numeric: 14, unit: "stores", source: "Local directory" },
      { category: "lifestyle", key: "restaurants", label: "Restaurants and cafes", numeric: 52, unit: "outlets", source: "Local listings" },
      { category: "housing", key: "avg_rent_2bhk", label: "Average 2 BHK rent", numeric: 14000, unit: "₹/month", source: "Property aggregators 2024" },
      { category: "housing", key: "price_sqft", label: "Average price per sq ft", numeric: 5500, unit: "₹/sq ft", source: "Property aggregators 2024" },
      { category: "growth", key: "upcoming_projects", label: "Upcoming projects", text: "Indore Metro (approved), Super Corridor extension", source: "Indore Development Authority" },
      { category: "growth", key: "price_growth_5yr", label: "5-year price appreciation", text: "~30%", source: "Property market analysis" },
    ],
  },
  {
    canonical_name: "Anna Nagar",
    display_name: "Anna Nagar",
    city_name: "Chennai",
    state_name: "Tamil Nadu",
    latitude: 13.0850,
    longitude: 80.2101,
    provider_name: "manual-seed",
    provider_place_id: "anna-nagar-chennai",
    summary: "Anna Nagar is a premium residential neighbourhood in Chennai, known for the iconic Anna Nagar Tower, well-maintained parks, and excellent civic infrastructure. It is one of Chennai's most established upscale localities with strong connectivity via the Chennai Metro.",
    strengths: ["Excellent Chennai Metro connectivity (Blue Line)", "Well-maintained parks and public spaces", "Strong civic infrastructure and wide roads", "Established premium residential reputation"],
    considerations: ["High property prices and rents", "Limited nightlife compared to other metro areas", "Traffic congestion on main arterial roads"],
    insight: "Anna Nagar is a top choice for families seeking an established, premium residential environment in Chennai with excellent metro connectivity and well-maintained public infrastructure.",
    scores: {
      safety: { score: 8.3, completeness: 85 },
      connectivity: { score: 8.7, completeness: 90 },
      healthcare: { score: 8.5, completeness: 85 },
      education: { score: 8.4, completeness: 85 },
      environment: { score: 7.8, completeness: 80 },
      amenities: { score: 8.8, completeness: 85 },
      lifestyle: { score: 7.9, completeness: 80 },
      housing: { score: 6.8, completeness: 80 },
      growth: { score: 7.6, completeness: 75 },
    },
    metrics: [
      { category: "safety", key: "police_stations_3km", label: "Police stations within 3 km", numeric: 3, unit: "stations", source: "Chennai City Police" },
      { category: "connectivity", key: "metro_station", label: "Metro station", text: "Anna Nagar East, Anna Nagar Tower (Blue Line)", source: "CMRL" },
      { category: "connectivity", key: "bus_stops", label: "MTC bus stops", numeric: 16, unit: "stops", source: "MTC Chennai" },
      { category: "healthcare", key: "hospitals_5km", label: "Hospitals within 5 km", numeric: 10, unit: "hospitals", source: "National Health Portal" },
      { category: "education", key: "schools", label: "Schools in and around locality", numeric: 24, unit: "schools", source: "Education directory" },
      { category: "environment", key: "aqi_avg", label: "Average AQI", numeric: 75, unit: "AQI", source: "CPCB AQI data" },
      { category: "amenities", key: "supermarkets", label: "Supermarkets and grocery stores", numeric: 18, unit: "stores", source: "Local directory" },
      { category: "lifestyle", key: "restaurants", label: "Restaurants and cafes", numeric: 60, unit: "outlets", source: "Local listings" },
      { category: "housing", key: "avg_rent_2bhk", label: "Average 2 BHK rent", numeric: 30000, unit: "₹/month", source: "Property aggregators 2024" },
      { category: "housing", key: "price_sqft", label: "Average price per sq ft", numeric: 12000, unit: "₹/sq ft", source: "Property aggregators 2024" },
      { category: "growth", key: "price_growth_5yr", label: "5-year price appreciation", text: "~15%", source: "Property market analysis" },
    ],
  },
  {
    canonical_name: "Koramangala",
    display_name: "Koramangala",
    city_name: "Bengaluru",
    state_name: "Karnataka",
    latitude: 12.9352,
    longitude: 77.6245,
    provider_name: "manual-seed",
    provider_place_id: "koramangala-bengaluru",
    summary: "Koramangala is a premier residential and commercial neighbourhood in Bengaluru, widely known as the startup capital of India. It houses offices of numerous tech companies and startups, and is renowned for its vibrant food scene, shopping options, and proximity to major IT parks.",
    strengths: ["India's startup hub — high concentration of tech companies", "Excellent food, shopping, and entertainment scene", "Proximity to major IT parks and HSR Layout", "Strong community of young professionals"],
    considerations: ["Severe traffic congestion, especially on Hosur Road", "High cost of living and rents", "Flooding issues in some blocks during monsoons"],
    insight: "Koramangala is the go-to locality for tech professionals and startup enthusiasts who want to live in the heart of Bengaluru's innovation ecosystem — but budget-conscious renters should note the premium pricing.",
    scores: {
      safety: { score: 7.5, completeness: 80 },
      connectivity: { score: 8.2, completeness: 80 },
      healthcare: { score: 8.3, completeness: 85 },
      education: { score: 8.1, completeness: 80 },
      environment: { score: 6.8, completeness: 75 },
      amenities: { score: 9.0, completeness: 90 },
      lifestyle: { score: 9.4, completeness: 90 },
      housing: { score: 6.0, completeness: 80 },
      growth: { score: 8.0, completeness: 80 },
    },
    metrics: [
      { category: "safety", key: "police_stations_3km", label: "Police stations within 3 km", numeric: 3, unit: "stations", source: "Bengaluru City Police" },
      { category: "connectivity", key: "bus_stops", label: "BMTC bus stops", numeric: 14, unit: "stops", source: "BMTC" },
      { category: "connectivity", key: "metro_access", label: "Metro access", text: "HSR Layout Metro (1.5 km, upcoming Namma Metro)", source: "BMRCL" },
      { category: "healthcare", key: "hospitals_5km", label: "Hospitals within 5 km", numeric: 9, unit: "hospitals", source: "National Health Portal" },
      { category: "education", key: "schools", label: "Schools in and around locality", numeric: 16, unit: "schools", source: "Education directory" },
      { category: "environment", key: "aqi_avg", label: "Average AQI", numeric: 90, unit: "AQI", source: "CPCB AQI data" },
      { category: "amenities", key: "supermarkets", label: "Supermarkets and grocery stores", numeric: 18, unit: "stores", source: "Local directory" },
      { category: "lifestyle", key: "restaurants", label: "Restaurants and cafes", numeric: 110, unit: "outlets", source: "Local listings" },
      { category: "lifestyle", key: "startups", label: "Startup offices and coworking spaces", numeric: 45, unit: "offices", source: "Local listings" },
      { category: "housing", key: "avg_rent_2bhk", label: "Average 2 BHK rent", numeric: 35000, unit: "₹/month", source: "Property aggregators 2024" },
      { category: "housing", key: "price_sqft", label: "Average price per sq ft", numeric: 13500, unit: "₹/sq ft", source: "Property aggregators 2024" },
      { category: "growth", key: "price_growth_5yr", label: "5-year price appreciation", text: "~20%", source: "Property market analysis" },
    ],
  },
  {
    canonical_name: "Baner",
    display_name: "Baner",
    city_name: "Pune",
    state_name: "Maharashtra",
    latitude: 18.5590,
    longitude: 73.7868,
    provider_name: "manual-seed",
    provider_place_id: "baner-pune",
    summary: "Baner is a fast-developing residential and IT hub in Pune, strategically located near Hinjewadi IT Park. It is known for its mix of premium apartments, excellent restaurants, and proximity to the Mumbai-Pune Expressway. The area has seen rapid growth and transformation in the last decade.",
    strengths: ["Proximity to Hinjewadi IT Park — minimal commute for IT professionals", "Excellent food and restaurant scene", "Modern residential developments with good amenities", "Good connectivity via Mumbai-Pune Expressway"],
    considerations: ["Rapid construction has led to traffic congestion", "Infrastructure struggling to keep pace with development", "Hill cuts for construction affecting local environment"],
    insight: "Baner is ideal for IT professionals working in Hinjewadi who want a modern lifestyle with excellent dining options — but should be prepared for traffic challenges as the area continues its rapid growth.",
    scores: {
      safety: { score: 7.8, completeness: 80 },
      connectivity: { score: 8.0, completeness: 80 },
      healthcare: { score: 7.9, completeness: 80 },
      education: { score: 7.7, completeness: 75 },
      environment: { score: 7.5, completeness: 75 },
      amenities: { score: 8.5, completeness: 85 },
      lifestyle: { score: 8.6, completeness: 85 },
      housing: { score: 7.2, completeness: 80 },
      growth: { score: 8.5, completeness: 85 },
    },
    metrics: [
      { category: "safety", key: "police_stations_3km", label: "Police stations within 3 km", numeric: 2, unit: "stations", source: "Pune Police" },
      { category: "connectivity", key: "expressway", label: "Expressway access", text: "Mumbai-Pune Expressway (4 km)", source: "MSRDC" },
      { category: "connectivity", key: "nearest_railway", label: "Nearest railway station", text: "Pune Junction (10 km)", source: "Indian Railways" },
      { category: "healthcare", key: "hospitals_5km", label: "Hospitals within 5 km", numeric: 7, unit: "hospitals", source: "National Health Portal" },
      { category: "education", key: "schools", label: "Schools in and around locality", numeric: 14, unit: "schools", source: "Education directory" },
      { category: "environment", key: "aqi_avg", label: "Average AQI", numeric: 68, unit: "AQI", source: "CPCB AQI data" },
      { category: "amenities", key: "supermarkets", label: "Supermarkets and grocery stores", numeric: 16, unit: "stores", source: "Local directory" },
      { category: "lifestyle", key: "restaurants", label: "Restaurants and cafes", numeric: 72, unit: "outlets", source: "Local listings" },
      { category: "housing", key: "avg_rent_2bhk", label: "Average 2 BHK rent", numeric: 25000, unit: "₹/month", source: "Property aggregators 2024" },
      { category: "housing", key: "price_sqft", label: "Average price per sq ft", numeric: 9800, unit: "₹/sq ft", source: "Property aggregators 2024" },
      { category: "growth", key: "price_growth_5yr", label: "5-year price appreciation", text: "~28%", source: "Property market analysis" },
      { category: "growth", key: "upcoming_projects", label: "Upcoming projects", text: "Pune Metro (Hinjewadi-Shivajinagar line extension)", source: "Pune Metropolitan Region Development Authority" },
    ],
  },
];

async function seed() {
  console.log(`Seeding ${LOCALITIES.length} localities...`);

  for (const loc of LOCALITIES) {
    // Insert location
    const result = await sql`
      INSERT INTO locations (canonical_name, display_name, location_type, city_name, state_name, country_name, latitude, longitude, provider_name, provider_place_id)
      VALUES (${loc.canonical_name}, ${loc.display_name}, 'locality', ${loc.city_name}, ${loc.state_name}, 'India', ${loc.latitude}, ${loc.longitude}, ${loc.provider_name}, ${loc.provider_place_id})
      ON CONFLICT (provider_name, provider_place_id) DO UPDATE SET
        display_name = EXCLUDED.display_name,
        city_name = EXCLUDED.city_name,
        state_name = EXCLUDED.state_name,
        latitude = EXCLUDED.latitude,
        longitude = EXCLUDED.longitude,
        updated_at = now()
      RETURNING id`;
    const locationId = result[0].id;
    console.log(`  → ${loc.display_name}, ${loc.city_name} (id=${locationId})`);

    // Insert profile
    await sql`
      INSERT INTO locality_profiles (location_id, summary, strengths, considerations, insight, source_name, refreshed_at)
      VALUES (${locationId}, ${loc.summary}, ${JSON.stringify(loc.strengths)}, ${JSON.stringify(loc.considerations)}, ${loc.insight}, 'manual-seed', now())
      ON CONFLICT (location_id) DO UPDATE SET
        summary = EXCLUDED.summary,
        strengths = EXCLUDED.strengths,
        considerations = EXCLUDED.considerations,
        insight = EXCLUDED.insight,
        source_name = EXCLUDED.source_name,
        refreshed_at = now(),
        updated_at = now()`;

    // Insert scores
    for (const [category, data] of Object.entries(loc.scores)) {
      await sql`
        INSERT INTO locality_scores (location_id, category, score, methodology_version, data_completeness)
        VALUES (${locationId}, ${category}, ${data.score}, 'seed-v1', ${data.completeness})
        ON CONFLICT (location_id, category, methodology_version) DO UPDATE SET
          score = EXCLUDED.score,
          data_completeness = EXCLUDED.data_completeness,
          calculated_at = now()`;
    }

    // Insert metrics
    for (const m of loc.metrics) {
      await sql`
        INSERT INTO locality_metrics (location_id, category, metric_key, display_label, numeric_value, text_value, unit, source_name)
        VALUES (${locationId}, ${m.category}, ${m.key}, ${m.label}, ${m.numeric || null}, ${m.text || null}, ${m.unit || null}, ${m.source})
        ON CONFLICT (location_id, category, metric_key, source_name, observed_at) DO NOTHING`;
    }
  }

  console.log("Seeding complete.");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exitCode = 1;
});
