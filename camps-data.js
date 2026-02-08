// ============================================================
// Houston Camp Finder — Camp Data & Configuration
// Summer 2026 — 80s Neon Edition
// ============================================================

// ── School Districts & Private Schools ──
const SCHOOL_DISTRICTS = {
  "hisd":    { label: "Houston ISD (HISD)",              lastDay: "2026-06-04", firstDay: "2026-08-11" },
  "sbisd":   { label: "Spring Branch ISD",               lastDay: "2026-06-04", firstDay: "2026-08-17" },
  "fbisd":   { label: "Fort Bend ISD (Sugar Land)",      lastDay: "2026-05-29", firstDay: "2026-08-13" },
  "kisd":    { label: "Katy ISD",                        lastDay: "2026-05-28", firstDay: "2026-08-12" },
  "cfisd":   { label: "Cypress-Fairbanks ISD",           lastDay: "2026-06-04", firstDay: "2026-08-17" },
  "cisd":    { label: "Conroe ISD (The Woodlands)",      lastDay: "2026-05-28", firstDay: "2026-08-12" },
  "pisd":    { label: "Pearland ISD",                    lastDay: "2026-05-28", firstDay: "2026-08-13" },
  "ccisd":   { label: "Clear Creek ISD (Clear Lake)",    lastDay: "2026-06-04", firstDay: "2026-08-17" },
  "aisd":    { label: "Alief ISD",                       lastDay: "2026-06-04", firstDay: "2026-08-17" },

  // ── Private Schools ──
  "st-johns":         { label: "St. John's School",                lastDay: "2026-05-22", firstDay: "2026-08-19" },
  "kinkaid":          { label: "The Kinkaid School",               lastDay: "2026-05-22", firstDay: "2026-08-19" },
  "awty":             { label: "Awty International School",        lastDay: "2026-05-28", firstDay: "2026-08-19" },
  "village-school":   { label: "The Village School",               lastDay: "2026-05-22", firstDay: "2026-08-13" },
  "strake-jesuit":    { label: "Strake Jesuit College Prep",       lastDay: "2026-05-22", firstDay: "2026-08-13" },
  "st-agnes":         { label: "St. Agnes Academy",                lastDay: "2026-05-22", firstDay: "2026-08-13" },
  "episcopal-high":   { label: "Episcopal High School",            lastDay: "2026-05-22", firstDay: "2026-08-19" },
  "john-cooper":      { label: "The John Cooper School",           lastDay: "2026-05-20", firstDay: "2026-08-12" },
  "emery-weiner":     { label: "Emery/Weiner School",              lastDay: "2026-06-05", firstDay: "2026-08-19" },
  "fay-school":       { label: "The Fay School",                   lastDay: "2026-05-22", firstDay: "2026-08-13" },
  "lycee":            { label: "Lyc\u00e9e International de Houston",   lastDay: "2026-06-12", firstDay: "2026-08-25" },
  "st-thomas-high":   { label: "St. Thomas High School",           lastDay: "2026-05-22", firstDay: "2026-08-13" },
  "st-thomas-epis":   { label: "Saint Thomas' Episcopal School",   lastDay: "2026-05-20", firstDay: "2026-08-12" },
  "duchesne":         { label: "Duchesne Academy",                 lastDay: "2026-05-22", firstDay: "2026-08-13" },
  "river-oaks-baptist": { label: "River Oaks Baptist School",      lastDay: "2026-05-22", firstDay: "2026-08-19" },
  "second-baptist":   { label: "Second Baptist School",            lastDay: "2026-05-22", firstDay: "2026-08-13" },
  "annunciation":     { label: "Annunciation Orthodox School",     lastDay: "2026-05-22", firstDay: "2026-08-13" },
  "british-intl":     { label: "British International School",     lastDay: "2026-06-12", firstDay: "2026-08-25" },
  "school-of-woods":  { label: "School of the Woods",              lastDay: "2026-05-20", firstDay: "2026-08-12" },
  "houston-christian":{ label: "Houston Christian High School",     lastDay: "2026-05-22", firstDay: "2026-08-13" },

  "other":   { label: "Other (enter dates manually)",    lastDay: null, firstDay: null }
};

// ── Dynamic Summer Weeks Generation ──
let SUMMER_WEEKS = [];

function formatDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatShortDate(d) {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[d.getMonth()]} ${d.getDate()}`;
}

function formatWeekLabel(mon, fri) {
  const ms = formatShortDate(mon);
  const fs = formatShortDate(fri);
  if (mon.getMonth() === fri.getMonth()) {
    return `${ms}\u2013${fri.getDate()}`;
  }
  return `${ms}\u2013${fs}`;
}

function generateSummerWeeks(lastDayStr, firstDayStr) {
  if (!lastDayStr || !firstDayStr) {
    SUMMER_WEEKS = [];
    return SUMMER_WEEKS;
  }

  const lastDay = new Date(lastDayStr + "T00:00:00");
  const firstDay = new Date(firstDayStr + "T00:00:00");

  const dow = lastDay.getDay();
  let monday = new Date(lastDay);
  if (dow === 0) {
    monday.setDate(monday.getDate() + 1);
  } else if (dow === 5) {
    monday.setDate(monday.getDate() + 3);
  } else if (dow === 6) {
    monday.setDate(monday.getDate() + 2);
  } else {
    monday.setDate(monday.getDate() - (dow - 1));
  }

  const weeks = [];
  let weekNum = 1;

  while (monday < firstDay) {
    const fri = new Date(monday);
    fri.setDate(fri.getDate() + 4);

    const id = "w" + String(weekNum).padStart(2, "0");
    const label = formatWeekLabel(monday, fri);

    const week = { id, start: formatDate(monday), end: formatDate(fri), label };

    if (weekNum === 1) {
      week.note = "School ends " + formatShortDate(lastDay);
    }
    if (fri >= firstDay || (monday < firstDay && new Date(monday.getTime() + 7 * 86400000) >= firstDay)) {
      week.note = "School starts ~" + formatShortDate(firstDay);
    }
    if (weekNum === 1 && fri >= firstDay) {
      week.note = "School ends " + formatShortDate(lastDay) + " / starts ~" + formatShortDate(firstDay);
    }

    weeks.push(week);
    monday = new Date(monday);
    monday.setDate(monday.getDate() + 7);
    weekNum++;
  }

  SUMMER_WEEKS = weeks;
  return weeks;
}

// Initialize with default HISD dates
generateSummerWeeks("2026-06-04", "2026-08-11");

// ── Adjacency Map (for "New Things to Try") ──
const ADJACENCY_MAP = {
  "field-sports":      ["court-sports", "multi-sport"],
  "court-sports":      ["field-sports", "multi-sport"],
  "water-sports":      ["multi-sport", "nature-study"],
  "individual-combat": ["multi-sport", "court-sports"],
  "multi-sport":       ["field-sports", "court-sports", "water-sports"],
  "theater":           ["dance", "music", "digital-arts"],
  "dance":             ["theater", "music", "wellness"],
  "music":             ["theater", "dance", "digital-arts"],
  "visual-arts":       ["digital-arts", "theater", "maker"],
  "digital-arts":      ["coding", "visual-arts", "theater"],
  "coding":            ["engineering", "digital-arts"],
  "natural-sciences":  ["nature-study", "engineering"],
  "engineering":       ["coding", "natural-sciences", "maker"],
  "humanities":        ["theater", "leadership", "natural-sciences"],
  "outdoor-survival":  ["high-adrenaline", "nature-study", "sleepaway"],
  "high-adrenaline":   ["outdoor-survival", "water-sports", "individual-combat"],
  "nature-study":      ["natural-sciences", "water-sports", "equestrian"],
  "equestrian":        ["nature-study", "outdoor-survival"],
  "sleepaway":         ["nature-study", "multi-sport", "outdoor-survival"],
  "culinary":          ["visual-arts", "leadership", "wellness"],
  "leadership":        ["humanities", "culinary"],
  "maker":             ["visual-arts", "engineering"],
  "wellness":          ["culinary", "nature-study", "dance"],
  "special-needs":     ["multi-sport", "nature-study"]
};

// ── Neighborhood Areas ──
const NEIGHBORHOOD_AREAS = [
  {
    area: "Inner Loop",
    neighborhoods: [
      { id: "montrose", label: "Montrose" },
      { id: "heights", label: "Heights" },
      { id: "downtown", label: "Downtown" },
      { id: "midtown", label: "Midtown" },
      { id: "museum-district", label: "Museum District" },
      { id: "medical-center", label: "Medical Center" },
      { id: "eado", label: "EaDo" },
      { id: "river-oaks", label: "River Oaks" }
    ]
  },
  {
    area: "Central Houston",
    neighborhoods: [
      { id: "west-university", label: "West University" },
      { id: "rice-village", label: "Rice Village" },
      { id: "memorial", label: "Memorial" },
      { id: "spring-branch", label: "Spring Branch" },
      { id: "galleria", label: "Galleria" },
      { id: "bellaire", label: "Bellaire" },
      { id: "meyerland", label: "Meyerland" },
      { id: "garden-oaks", label: "Garden Oaks" },
      { id: "oak-forest", label: "Oak Forest" },
      { id: "sharpstown", label: "Sharpstown" }
    ]
  },
  {
    area: "Suburbs & Outlying",
    neighborhoods: [
      { id: "sugar-land", label: "Sugar Land" },
      { id: "katy", label: "Katy" },
      { id: "the-woodlands", label: "The Woodlands" },
      { id: "cypress", label: "Cypress" },
      { id: "pearland", label: "Pearland" },
      { id: "clear-lake", label: "Clear Lake" },
      { id: "kingwood", label: "Kingwood" },
      { id: "missouri-city", label: "Missouri City" },
      { id: "friendswood", label: "Friendswood" }
    ]
  }
];

// ── Main Categories (80s neon palette) ──
const CATEGORIES = [
  { id: "sports",    label: "Sports & Athletics",         icon: "\u26BD", color: "#ff2d95" },
  { id: "arts",      label: "Arts & Creative Expression", icon: "\uD83C\uDFA8", color: "#b537f2" },
  { id: "stem",      label: "STEM & Academic",            icon: "\uD83E\uDDEA", color: "#00f0ff" },
  { id: "adventure", label: "Adventure & Wilderness",     icon: "\uD83C\uDF32", color: "#39ff14" },
  { id: "life",      label: "Life Skills & Specialized",  icon: "\uD83D\uDEE0\uFE0F", color: "#ffe156" }
];

// ── Subcategories ──
const SUBCATEGORIES = {
  sports: [
    { id: "field-sports",      label: "Field Sports",       icon: "\u26BD" },
    { id: "court-sports",      label: "Court Sports",       icon: "\uD83C\uDFC0" },
    { id: "water-sports",      label: "Water Sports",       icon: "\uD83C\uDFCA" },
    { id: "individual-combat", label: "Individual & Combat", icon: "\uD83E\uDD4A" },
    { id: "multi-sport",       label: "Multi-Sport",        icon: "\uD83C\uDFC5" }
  ],
  arts: [
    { id: "theater",      label: "Theater",      icon: "\uD83C\uDFAD" },
    { id: "dance",        label: "Dance",         icon: "\uD83D\uDC83" },
    { id: "music",        label: "Music",         icon: "\uD83C\uDFB5" },
    { id: "visual-arts",  label: "Visual Arts",   icon: "\uD83D\uDD8C\uFE0F" },
    { id: "digital-arts", label: "Digital Arts",  icon: "\uD83C\uDFAC" }
  ],
  stem: [
    { id: "coding",           label: "Technology & Coding", icon: "\uD83D\uDCBB" },
    { id: "natural-sciences", label: "Natural Sciences",    icon: "\uD83D\uDD2C" },
    { id: "engineering",      label: "Engineering",         icon: "\u2699\uFE0F" },
    { id: "humanities",       label: "Humanities & Logic",  icon: "\u265F\uFE0F" }
  ],
  adventure: [
    { id: "outdoor-survival", label: "Outdoor Survival", icon: "\uD83D\uDD25" },
    { id: "high-adrenaline",  label: "High-Adrenaline",  icon: "\uD83E\uDDD7" },
    { id: "nature-study",     label: "Nature Study",      icon: "\uD83C\uDF3F" },
    { id: "equestrian",       label: "Equestrian",        icon: "\uD83D\uDC0E" },
    { id: "sleepaway",        label: "Sleepaway",         icon: "\uD83C\uDFD5\uFE0F" }
  ],
  life: [
    { id: "culinary",      label: "Culinary",              icon: "\uD83C\uDF73" },
    { id: "leadership",    label: "Leadership & Business",  icon: "\uD83D\uDCBC" },
    { id: "maker",         label: "Maker & Crafting",       icon: "\uD83E\uDDF5" },
    { id: "wellness",      label: "Wellness & Mindfulness", icon: "\uD83E\uDDD8" },
    { id: "special-needs", label: "Special Needs",          icon: "\uD83D\uDC9A" }
  ]
};

// ── All Subcategory Icons (flat lookup) ──
const SUBCATEGORY_MAP = {};
Object.values(SUBCATEGORIES).flat().forEach(sc => { SUBCATEGORY_MAP[sc.id] = sc; });

// ── Camp Catalog ──
const CAMPS = [

  // ===============================================
  //  SPORTS & ATHLETICS
  // ===============================================

  // — Field Sports —
  {
    id: "challenger-british-soccer",
    name: "British Soccer Camp",
    provider: "Challenger Sports",
    category: "sports",
    subcategory: "field-sports",
    tags: ["soccer"],
    neighborhood: "memorial",
    description: "The most popular soccer camp in North America, led by British and international coaches. Innovative curriculum develops skills, speed, and confidence through technical drills, tactical practices, small-sided games, and coached scrimmages for all ability levels.",
    sentiment: "Well-established national brand with authentic international coaching. Fun accent is a bonus for kids.",
    ageRange: "3-16",
    cost: "$150-$250/week",
    location: "Multiple Houston-area parks (Memorial, Katy, Sugar Land, The Woodlands)",
    url: "https://challengersports.com/",
    registrationDeadline: "Register early for preferred location",
    documents: ["Online registration", "Medical release"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08", "w09", "w10"]
  },
  {
    id: "dynamo-dash-soccer",
    name: "Houston Dynamo & Dash Youth Soccer Camp",
    provider: "Houston Dynamo Football Club",
    category: "sports",
    subcategory: "field-sports",
    tags: ["soccer"],
    neighborhood: "eado",
    description: "Youth soccer camps featuring training methodology inspired by the Dynamo and Dash playing style. Camp types include Seasonal, Development, and Fantasy camps. Registration includes team training shirt, branded soccer ball, and a ticket to a Houston Dynamo FC match.",
    sentiment: "Great connection to the professional teams. Kids love meeting players and getting MLS gear.",
    ageRange: "8-16",
    cost: "$150-$600/week",
    location: "Shell Energy Stadium, 2200 Texas Ave, Houston, TX 77003 and satellite locations",
    url: "https://www.houstondynamofc.com/youthprograms/camps",
    registrationDeadline: "Opens spring 2026",
    documents: ["Online registration", "Medical release"],
    weeks: ["w02", "w03", "w04", "w05", "w06", "w07"]
  },
  {
    id: "fc-barcelona-camp",
    name: "FC Barcelona Soccer Camp",
    provider: "Barca Academy USA",
    category: "sports",
    subcategory: "field-sports",
    tags: ["soccer"],
    neighborhood: "katy",
    description: "Train the Barca way with official FC Barcelona methodology. Five-day camp focused on technique, creativity, positional play, and sportsmanship. Camp uniform included. Early bird and sibling discounts available.",
    sentiment: "Premium experience with authentic Barca methodology. Kids love the official kit. Sells out quickly.",
    ageRange: "6-17",
    cost: "$400-$475/week",
    location: "British International School, 2203 N Westgreen Blvd, Katy, TX 77449",
    url: "https://fcbarcelona.us/locations/houston/",
    registrationDeadline: "Early bird pricing before April 1, 2026",
    documents: ["Online registration", "Medical form", "Photo waiver"],
    weeks: ["w04"]
  },
  {
    id: "texans-youth-football",
    name: "Houston Texans Youth Football Camp",
    provider: "Houston Texans / NFL",
    category: "sports",
    subcategory: "field-sports",
    tags: ["football"],
    neighborhood: "medical-center",
    description: "Official Houston Texans youth football camp presented by Chevron. USA Football-certified coaches lead instruction in offensive and defensive positions for beginners and experienced players. A Texans player visits for autographs and motivational messages.",
    sentiment: "Meeting an NFL player is the highlight. Well-organized with emphasis on safety and proper technique.",
    ageRange: "6-14",
    cost: "$75-$125/day",
    location: "NRG Stadium area, Houston, TX 77054",
    url: "https://www.houstontexans.com/community/youth-football/youth-football-camp",
    registrationDeadline: "Announced spring 2026 -- sign up for youth football newsletter",
    documents: ["Online registration", "Medical waiver"],
    weeks: ["w04"]
  },
  {
    id: "gamebreaker-lacrosse",
    name: "GameBreaker Lacrosse Camp",
    provider: "GameBreaker Lacrosse Camps",
    category: "sports",
    subcategory: "field-sports",
    tags: ["lacrosse"],
    neighborhood: "memorial",
    description: "Lacrosse camp developed to help athletes improve with coaching from top college and professional coaches. Stick skills, cradling, passing, shooting, defensive positioning, and game play. Equipment provided for beginners.",
    sentiment: "National lacrosse camp brand with strong coaching credentials. Great for both new and experienced players.",
    ageRange: "7-16",
    cost: "$300-$500/week",
    location: "Memorial Park area, Houston",
    url: "https://www.gamebreakercamp.com/",
    registrationDeadline: "Spring 2026",
    documents: ["Registration form", "Medical release"],
    weeks: ["w03", "w05"]
  },

  // — Court Sports —
  {
    id: "nike-basketball-gym",
    name: "Nike Basketball Camp at The Gym",
    provider: "US Sports Camps / Ultimate Champions Basketball Academy",
    category: "sports",
    subcategory: "court-sports",
    tags: ["basketball"],
    neighborhood: "galleria",
    description: "Complete Skills Camp led by Coach Everett White. Develop fundamental basketball skills at post, wing, and guard positions. Includes strength and conditioning, shooting drills, dribbling, gameplay tactics, and scrimmaging.",
    sentiment: "National Nike brand with strong local coaching. Great facility with air-conditioned courts.",
    ageRange: "7-15",
    cost: "$400-$550/week",
    location: "The Gym, Houston (Galleria area)",
    url: "https://www.ussportscamps.com/basketball/nike/nike-basketball-camp-the-gym-houston",
    registrationDeadline: "Register early -- sells out",
    documents: ["Online registration", "Medical form"],
    weeks: ["w02", "w04", "w06"]
  },
  {
    id: "nike-basketball-ust",
    name: "Nike Basketball Camp at University of St. Thomas",
    provider: "US Sports Camps / University of St. Thomas",
    category: "sports",
    subcategory: "court-sports",
    tags: ["basketball"],
    neighborhood: "montrose",
    description: "Train with Head Men's Basketball Coach Anthony Medina and staff. Youth basketball camp covering strength and conditioning, shooting drills, dribbling, gameplay tactics, and scrimmaging on a beautiful campus setting.",
    sentiment: "Excellent coaching staff and beautiful Montrose campus location. Well-organized program.",
    ageRange: "7-15",
    cost: "$400-$550/week",
    location: "University of St. Thomas, 3800 Montrose Blvd, Houston, TX 77006",
    url: "https://www.ussportscamps.com/basketball/nike/nike-basketball-camp-university-st-thomas",
    registrationDeadline: "Spring 2026",
    documents: ["Online registration", "Medical form"],
    weeks: ["w03", "w05", "w07"]
  },
  {
    id: "nike-tennis-uh",
    name: "Nike Tennis Camp at University of Houston",
    provider: "US Sports Camps / University of Houston",
    category: "sports",
    subcategory: "court-sports",
    tags: ["tennis"],
    neighborhood: "medical-center",
    description: "Tennis camp at the University of Houston with both Half Day and Full Day options. Learn proper strokes, footwork, and strategy with experienced coaching staff. Fun drills, games, and match play on university courts.",
    sentiment: "Great courts and coaching. UH campus location is convenient. Both half and full day options are flexible.",
    ageRange: "8-17",
    cost: "$350-$600/week",
    location: "University of Houston, 4800 Calhoun Rd, Houston, TX 77204",
    url: "https://www.ussportscamps.com/tennis",
    registrationDeadline: "Spring 2026",
    documents: ["Online registration", "Medical form"],
    weeks: ["w02", "w04", "w06", "w08"]
  },
  {
    id: "zj-tennis-academy",
    name: "ZJ Junior Tennis Academy Summer Camp",
    provider: "ZJ Junior Tennis Academy",
    category: "sports",
    subcategory: "court-sports",
    tags: ["tennis"],
    neighborhood: "west-university",
    description: "Tennis summer camp for all skill levels led by Coach Zeze de Moura and team. Players grouped by ability and age. Focus on proper stroke technique, footwork, match play strategy, and sportsmanship.",
    sentiment: "Coach Zeze is excellent with kids. Small group sizes ensure personal attention. Good for beginners.",
    ageRange: "5-16",
    cost: "$250-$400/week",
    location: "West University area courts, Houston",
    url: "https://www.zjuniortennisacademy.com/summertenniscamp",
    registrationDeadline: "Spring 2026",
    documents: ["Online registration"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08"]
  },
  {
    id: "nike-volleyball-camp",
    name: "Nike Volleyball Camp at The Gym",
    provider: "US Sports Camps",
    category: "sports",
    subcategory: "court-sports",
    tags: ["volleyball"],
    neighborhood: "galleria",
    description: "Volleyball camp for boys and girls developing foundational skills and techniques including passing, setting, serving, hitting, and defensive movement. Coached scrimmages daily.",
    sentiment: "Nike branding with quality instruction. Good for both beginners and club players looking for extra reps.",
    ageRange: "9-15",
    cost: "$350-$500/week",
    location: "The Gym, Houston (Galleria area)",
    url: "https://www.ussportscamps.com/volleyball/nike/nike-volleyball-camp-the-gym-houston",
    registrationDeadline: "Spring 2026",
    documents: ["Online registration", "Medical form"],
    weeks: ["w03", "w05", "w07"]
  },
  {
    id: "texas-tornados-volleyball",
    name: "Texas Tornados Volleyball Summer Camp",
    provider: "Texas Tornados Volleyball Club",
    category: "sports",
    subcategory: "court-sports",
    tags: ["volleyball"],
    neighborhood: "sugar-land",
    description: "Summer volleyball camp run by one of Houston's premier volleyball clubs. Focus on passing, setting, serving, attacking, and defensive skills. Scrimmage play and competitions throughout the week.",
    sentiment: "Top-tier Houston club volleyball program. Excellent for aspiring competitive players.",
    ageRange: "8-14",
    cost: "$200-$350/week",
    location: "Texas Tornados facility, Sugar Land area",
    url: "https://www.texastornados.org/program/ttvb-summer-camps/20007",
    registrationDeadline: "Spring 2026",
    documents: ["Online registration", "Medical waiver"],
    weeks: ["w02", "w04", "w06"]
  },
  {
    id: "houston-city-parks-tennis",
    name: "City of Houston NJTL Free Tennis Program",
    provider: "City of Houston Parks & Recreation",
    category: "sports",
    subcategory: "court-sports",
    tags: ["tennis", "free"],
    neighborhood: "sharpstown",
    description: "FREE beginner and intermediate tennis lessons for Houston youth through the National Junior Tennis & Learning (NJTL) program. Offered at three city tennis centers and various neighborhood courts. Equipment provided.",
    sentiment: "Completely free tennis instruction is an amazing city resource. Great equalizer for access to the sport.",
    ageRange: "4-18",
    cost: "FREE",
    location: "Homer Ford Tennis Center and other city parks across Houston",
    url: "https://www.houstontx.gov/parks/youthtennis.html",
    registrationDeadline: "Check city website for session dates",
    documents: ["City registration"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08", "w09", "w10"]
  },

  // — Water Sports —
  {
    id: "houston-yacht-club-sailing",
    name: "Ragnot Summer Sailing Camp",
    provider: "Houston Yacht Club",
    category: "sports",
    subcategory: "water-sports",
    tags: ["sailing"],
    neighborhood: "clear-lake",
    description: "Week-long, all-day sailing program in its 67th year. US Sailing certified instructors teach youth to sail, improve technique, and learn to race. Classes for first-time beginners through advanced racers. Non-members welcome.",
    sentiment: "Legendary 67-year program. Incredible on-the-water instruction. Kids learn real seamanship and independence.",
    ageRange: "6-18",
    cost: "$400-$600/week",
    location: "Houston Yacht Club, 3620 Miramar Dr, Shoreacres, TX 77571",
    url: "https://houstonyachtclub.com/summer-camps",
    registrationDeadline: "Spring 2026 -- fills quickly",
    documents: ["Registration form", "Medical form", "Swim test required"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08", "w09"]
  },
  {
    id: "uh-swim-camp",
    name: "Cougar Swim Camp at University of Houston",
    provider: "US Sports Camps / University of Houston",
    category: "sports",
    subcategory: "water-sports",
    tags: ["swimming"],
    neighborhood: "medical-center",
    description: "Competitive swimming camp for ages 8-18 at the University of Houston. Focus on stroke technique, starts, turns, and race strategy. Coached by UH swimming staff in Olympic-caliber facilities.",
    sentiment: "World-class pool facility. Ideal for competitive swimmers looking to improve technique.",
    ageRange: "8-18",
    cost: "$400-$700/week",
    location: "University of Houston Natatorium, Houston, TX 77204",
    url: "https://www.ussportscamps.com/swim/nike/houston-swim-camp-texas",
    registrationDeadline: "Spring 2026",
    documents: ["Online registration", "Medical form"],
    weeks: ["w03", "w05"]
  },
  {
    id: "houston-swim-club",
    name: "Houston Swim Club Summer Camp",
    provider: "Houston Swim Club",
    category: "sports",
    subcategory: "water-sports",
    tags: ["swimming"],
    neighborhood: "spring-branch",
    description: "Summer swim camp at Houston's premier swim school. Daily swim lessons combined with water safety instruction, games, and activities. Ideal for building water confidence and stroke proficiency.",
    sentiment: "Trusted local swim school. Heated indoor pools mean comfortable swimming regardless of weather.",
    ageRange: "4-12",
    cost: "$200-$350/week",
    location: "Multiple Houston Swim Club locations (Spring Branch, Sharpstown, Pearland, Cypress)",
    url: "https://www.houstonswimclub.com/summer-swim-camps",
    registrationDeadline: "Ongoing enrollment",
    documents: ["Online registration"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08", "w09", "w10"]
  },

  // — Individual & Combat Sports —
  {
    id: "gpg-golf-camp",
    name: "GPG Junior Golf Camp",
    provider: "Golf Professionals Group Houston",
    category: "sports",
    subcategory: "individual-combat",
    tags: ["golf"],
    neighborhood: "cypress",
    description: "Three-day junior golf camp at Timber Creek Golf Club. PGA professionals teach fundamentals including grip, stance, swing, short game, putting, and course etiquette. Ages 5-13, grouped by skill level.",
    sentiment: "Excellent PGA instruction in a real course setting. Kids love hitting on the range and putting green.",
    ageRange: "5-13",
    cost: "$275/session (3 days)",
    location: "Timber Creek Golf Club, Cypress, TX",
    url: "https://gpghouston.com/kids-golf-camps-houston/",
    registrationDeadline: "Sessions fill -- register early",
    documents: ["Online registration"],
    weeks: ["w02", "w04", "w06", "w08"]
  },
  {
    id: "hermann-park-golf",
    name: "Hermann Park Junior Golf Clinics",
    provider: "Hermann Park Golf Course",
    category: "sports",
    subcategory: "individual-combat",
    tags: ["golf"],
    neighborhood: "museum-district",
    description: "Three-day junior golf clinic sessions at the historic Hermann Park Golf Course. Learn grip, stance, swing mechanics, short game, and putting. Eight clinic sessions throughout the summer.",
    sentiment: "Iconic Houston location in Hermann Park. Affordable way to introduce kids to golf.",
    ageRange: "6-15",
    cost: "$150-$225/session (3 days)",
    location: "Hermann Park Golf Course, 2155 N MacGregor Dr, Houston, TX 77004",
    url: "https://hermannparkgc.com/summer-junior-golf-clinics/",
    registrationDeadline: "Registration opens May 1",
    documents: ["Online registration"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08"]
  },
  {
    id: "houston-gymnastics-academy",
    name: "Houston Gymnastics Academy Summer Camp",
    provider: "Houston Gymnastics Academy",
    category: "sports",
    subcategory: "individual-combat",
    tags: ["gymnastics"],
    neighborhood: "spring-branch",
    description: "High-energy summer camp with open gym sessions, event training on vault, bars, beam, and floor, team games, arts and crafts, and themed activities. No experience needed -- open to members and non-members.",
    sentiment: "Energetic and fun atmosphere. Great for kids who love to flip, tumble, and stay active.",
    ageRange: "3-14",
    cost: "$284-$355/week",
    location: "Houston Gymnastics Academy, Spring Branch area, Houston",
    url: "https://houstongymnastics.com/",
    registrationDeadline: "Ongoing enrollment",
    documents: ["Online registration", "Waiver"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08", "w09"]
  },
  {
    id: "rise-warehouse-camp",
    name: "Camp RISE at The Warehouse",
    provider: "RISE At The Warehouse",
    category: "sports",
    subcategory: "individual-combat",
    tags: ["gymnastics", "ninja", "dance"],
    neighborhood: "heights",
    description: "Weeklong day camp combining gymnastics, dance, music, and ninja warrior training. Keeps kids moving with a variety of movement arts. Also offers Princess Camp for younger children.",
    sentiment: "Unique combination of gymnastics and ninja. Kids love the variety and high-energy environment.",
    ageRange: "5-12",
    cost: "$275-$375/week",
    location: "The Warehouse, Heights area, Houston",
    url: "https://risewarehouse.com/camp/",
    registrationDeadline: "Spring 2026",
    documents: ["Online registration", "Waiver"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08", "w09"]
  },
  {
    id: "alliance-fencing",
    name: "Alliance Fencing Academy Summer Camp",
    provider: "Alliance Fencing Academy",
    category: "sports",
    subcategory: "individual-combat",
    tags: ["fencing"],
    neighborhood: "galleria",
    description: "Olympic fencing summer camp exploring one of the foundational Olympic sports. Learn foil and epee techniques, footwork, bladework, and competitive bout strategy. Equipment provided. Locations in Houston, Katy, and The Woodlands.",
    sentiment: "Premier fencing academy with multiple locations. Excellent coaches and safe, structured environment.",
    ageRange: "6-17",
    cost: "$300-$450/week",
    location: "1117 Upland Dr, Houston, TX 77043 (also Katy and The Woodlands locations)",
    url: "https://alliance-fencing-academy.com/fencing-camps/",
    registrationDeadline: "Register early for preferred week",
    documents: ["Online registration", "Medical waiver"],
    weeks: ["w01", "w04", "w06", "w08", "w09"]
  },
  {
    id: "millennium-martial-arts",
    name: "Millennium Martial Arts Summer Camp",
    provider: "Millennium Martial Arts",
    category: "sports",
    subcategory: "individual-combat",
    tags: ["martial arts", "karate"],
    neighborhood: "pearland",
    description: "Martial arts summer camp combining karate, self-defense techniques, discipline training, fitness exercises, and character development. Daily structured martial arts instruction plus games and activities.",
    sentiment: "Teaches discipline and respect alongside physical skills. Kids gain confidence quickly.",
    ageRange: "5-13",
    cost: "$200-$350/week",
    location: "Millennium Martial Arts, 12152 Gulf Freeway, Houston, TX 77034",
    url: "https://www.millenniumma.com/",
    registrationDeadline: "Ongoing enrollment",
    documents: ["Registration form", "Medical waiver"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08"]
  },

  // — Multi-Sport —
  {
    id: "ymca-day-camp",
    name: "YMCA Summer Day Camp",
    provider: "YMCA of Greater Houston",
    category: "sports",
    subcategory: "multi-sport",
    tags: ["multi-sport", "swimming", "arts", "STEM", "outdoor"],
    neighborhood: "heights",
    description: "Mix of indoor and outdoor activities at YMCA locations across Greater Houston. Core activities include STEM, creative and performing arts, water safety skills, group games, team building, service learning, and mindfulness practices.",
    sentiment: "Trusted community organization with locations everywhere. Inclusive, affordable, and reliably well-run.",
    ageRange: "5-15",
    cost: "$175-$300/week",
    location: "Multiple YMCA locations across Greater Houston",
    url: "https://ymcahouston.org/programs/childcare-and-camps/summer-camp",
    registrationDeadline: "Registration open now for 2026",
    documents: ["Online registration", "Medical form"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08", "w09", "w10"]
  },
  {
    id: "kidventure-camp",
    name: "Kidventure Summer Camp",
    provider: "Kidventure Camps",
    category: "sports",
    subcategory: "multi-sport",
    tags: ["multi-sport", "outdoor", "adventure"],
    neighborhood: "memorial",
    description: "Houston's premier multi-activity day camp for 32+ years. Three programs by age: Discoverers (ages 3-5), Explorers (grades 1-5), and Leads (grades 6-9). Wide range of outdoor adventure activities, sports, arts, and more.",
    sentiment: "Houston institution with 30+ year track record. Families come back year after year. Fills up fast.",
    ageRange: "3-15",
    cost: "$350-$500/week",
    location: "Memorial area, Houston (multiple sites)",
    url: "https://kidventure.com/houston-summer-camps/",
    registrationDeadline: "Registration opens February 4, 2026 at 9 AM",
    documents: ["Online registration", "Medical form"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08", "w09"]
  },
  {
    id: "elite-summer-camps",
    name: "Elite University Summer Camps",
    provider: "Elite University",
    category: "sports",
    subcategory: "multi-sport",
    tags: ["multi-sport", "STEM", "arts", "adventure", "fencing", "archery"],
    neighborhood: "midtown",
    description: "Award-winning Houston summer camp offering outdoor nature, STEM, fine arts, and exploration camps. Activities include archery, fencing, robotics, gymnastics, rock wall climbing, aerospace engineering, karate, water sports, and veterinary science.",
    sentiment: "Incredible variety of activities under one umbrella. Kids can try new things every week. Well-organized.",
    ageRange: "3-13",
    cost: "$300-$400/week",
    location: "Multiple Houston locations (Midtown, Memorial, Meyerland, Medical Center)",
    url: "https://www.elitesummercamps.com/",
    registrationDeadline: "Early registration open -- payment plans available",
    documents: ["Online registration", "Medical form"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08", "w09"]
  },
  {
    id: "jc-sports-houston",
    name: "JC Sports Houston Summer Camps",
    provider: "JC Sports Houston",
    category: "sports",
    subcategory: "multi-sport",
    tags: ["multi-sport", "soccer", "basketball", "flag football"],
    neighborhood: "bellaire",
    description: "Multi-sport summer camps offering a variety of athletics including soccer, basketball, flag football, and more. Focus on fundamentals, teamwork, sportsmanship, and fun competition.",
    sentiment: "Well-run local multi-sport program. Great for kids who want to sample different sports each week.",
    ageRange: "4-12",
    cost: "$200-$350/week",
    location: "Bellaire / West Houston area",
    url: "https://www.jcsportshouston.com/summer-camps-2026",
    registrationDeadline: "Spring 2026",
    documents: ["Online registration"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08"]
  },

  // ===============================================
  //  ARTS & CREATIVE EXPRESSION
  // ===============================================

  // — Theater —
  {
    id: "alley-play-makers",
    name: "Alley Play Makers Camp",
    provider: "Alley Theatre",
    category: "arts",
    subcategory: "theater",
    tags: ["acting", "theater", "storytelling"],
    neighborhood: "downtown",
    description: "Immersive theater camp at Houston's Tony Award-winning Alley Theatre. Each session explores ideas connected to classic children's books with rotations in Acting/Storytelling, Movement, and Makers' Space. Culminates in a celebratory performance. Scholarships available.",
    sentiment: "World-class theater offering an incredible kids' program. The final performance is magical for families.",
    ageRange: "6-14 (rising grades 1-8)",
    cost: "$350-$500/session",
    location: "Alley Theatre, 615 Texas Ave, Houston, TX 77002",
    url: "https://www.alleytheatre.org/education/for-youth/alley-play-makers/",
    registrationDeadline: "Spring 2026 -- camp preview nights available",
    documents: ["Online registration", "Medical form"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08", "w09"]
  },
  {
    id: "alley-teen-acting",
    name: "Alley Teen Acting Camp",
    provider: "Alley Theatre",
    category: "arts",
    subcategory: "theater",
    tags: ["acting", "theater", "teen"],
    neighborhood: "downtown",
    description: "Intensive acting camp for high school students at Houston's Alley Theatre. Five-week Alley Conservatory program for rising freshmen through recent graduates. Audition required. Professional-level training in acting technique.",
    sentiment: "Prestigious conservatory program. Outstanding for serious young actors. Audition-based ensures dedicated cohort.",
    ageRange: "14-18",
    cost: "$500-$800/session",
    location: "Alley Theatre, 615 Texas Ave, Houston, TX 77002",
    url: "https://www.alleytheatre.org/education/for-youth/alley-teen-acting-camp/",
    registrationDeadline: "Audition deadline March 20, 2026",
    documents: ["Audition application", "Registration form"],
    weeks: ["w04", "w05", "w06", "w07", "w08"]
  },

  // — Dance —
  {
    id: "houston-ballet-workshop",
    name: "Houston Ballet Summer Workshops",
    provider: "Houston Ballet Academy",
    category: "arts",
    subcategory: "dance",
    tags: ["ballet", "dance"],
    neighborhood: "downtown",
    description: "Week-long dance workshops for young dancers ages 4-8 based on popular story ballets. Led by Houston Ballet Academy artistic staff. A magical introduction to ballet in a professional setting.",
    sentiment: "Houston Ballet is world-renowned. Workshops are beautifully designed for young dancers. Inspiring environment.",
    ageRange: "4-8",
    cost: "$200-$350/week",
    location: "Houston Ballet Center for Dance, 601 Preston St, Houston, TX 77002",
    url: "https://www.houstonballet.org/about/academy/summer-intensive-program/",
    registrationDeadline: "Spring 2026 -- fills quickly",
    documents: ["Online registration"],
    weeks: ["w01"]
  },
  {
    id: "houston-ballet-intensive",
    name: "Houston Ballet Summer Intensive Program",
    provider: "Houston Ballet Academy",
    category: "arts",
    subcategory: "dance",
    tags: ["ballet", "dance", "intensive"],
    neighborhood: "downtown",
    description: "Five-week intensive summer program with 6-8 hours of dance daily, 6 days per week. Curriculum includes ballet technique, pointe, partnering, repertory, modern, contemporary, jazz, musical theater, and more. Audition required.",
    sentiment: "Elite program for serious dancers. World-class instruction from HB company dancers. Transformative experience.",
    ageRange: "10-18",
    cost: "$2,000-$4,000/program",
    location: "Houston Ballet Center for Dance, 601 Preston St, Houston, TX 77002",
    url: "https://www.houstonballet.org/about/academy/summer-intensive-program/six-week-intensive/",
    registrationDeadline: "Video submissions Jan 5 - Feb 15, 2026; in-person auditions Jan/Feb 2026",
    documents: ["Audition video or in-person audition", "Application form"],
    weeks: ["w04", "w05", "w06", "w07", "w08"]
  },
  {
    id: "city-ballet-houston",
    name: "City Ballet of Houston Summer Camp",
    provider: "City Ballet of Houston",
    category: "arts",
    subcategory: "dance",
    tags: ["ballet", "dance"],
    neighborhood: "katy",
    description: "Ballet summer camp introducing young dancers to the art of ballet through creative movement, basic technique, themed activities, and performance preparation. Fun and nurturing environment for beginners.",
    sentiment: "Warm, supportive environment for young dancers. Great first ballet experience for kids.",
    ageRange: "3-12",
    cost: "$175-$300/week",
    location: "City Ballet of Houston, Katy, TX",
    url: "https://cityballetofhouston.com/ballet-summer-camp/",
    registrationDeadline: "Spring 2026",
    documents: ["Online registration"],
    weeks: ["w02", "w03", "w04", "w05", "w06", "w07"]
  },

  // — Music —
  {
    id: "school-of-rock",
    name: "School of Rock Summer Camp",
    provider: "School of Rock (West Houston / Heights)",
    category: "arts",
    subcategory: "music",
    tags: ["music", "rock", "band", "guitar", "drums"],
    neighborhood: "heights",
    description: "Week-long rock music camps where kids learn guitar, bass, drums, keys, or vocals and form a band. Each week has a theme (e.g., Green Day, Classic Rock). Camps culminate in a live performance for friends and family. Ages 7-17.",
    sentiment: "Kids absolutely love performing live at the end of the week. Builds confidence and musical chops fast.",
    ageRange: "7-17",
    cost: "$550/week",
    location: "School of Rock, Heights and West Houston locations",
    url: "https://www.schoolofrock.com/locations/westhouston/music-camps",
    registrationDeadline: "2026 camps now open for registration",
    documents: ["Online registration"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08", "w09"]
  },
  {
    id: "afa-music-festival",
    name: "AFA Summer Music Festival",
    provider: "AFA (Arts for All)",
    category: "arts",
    subcategory: "music",
    tags: ["music", "orchestra", "chamber music", "piano", "strings"],
    neighborhood: "museum-district",
    description: "Intensive music festival for musicians finishing grades 3-12. Programs include Orchestra & Chamber Music Intensive, String Institute, Piano Arts Workshop, and Piano Arts Intensive. 2-5 week sessions with ensemble participation, studio classes, theory, and performances.",
    sentiment: "Outstanding classical music training. Supportive community of young musicians. Multiple program levels.",
    ageRange: "8-18 (grades 3-12)",
    cost: "$500-$1,500/session",
    location: "Museum District area, Houston",
    url: "https://afatexas.org/programs/summer/",
    registrationDeadline: "Audition required -- check website for dates",
    documents: ["Audition", "Application form"],
    weeks: ["w02", "w03", "w04", "w05", "w06", "w07"]
  },
  {
    id: "high-voltage-rock-camp",
    name: "High Voltage Rock Camp & Music Lab",
    provider: "High Voltage Music Lab",
    category: "arts",
    subcategory: "music",
    tags: ["music", "rock", "band", "songwriting"],
    neighborhood: "garden-oaks",
    description: "Rock music camp where kids learn covers and write original music, then perform at live Houston music venues. Students meet weekly to prepare for events. Summer intensives focus on band formation and live performance skills.",
    sentiment: "Real-world performing experience at actual Houston venues. Kids learn what it's like to be in a real band.",
    ageRange: "8-17",
    cost: "$300-$500/week",
    location: "Garden Oaks / Oak Forest area, Houston",
    url: "https://highvoltagerockcamp.com/",
    registrationDeadline: "Spring 2026",
    documents: ["Online registration"],
    weeks: ["w02", "w04", "w06", "w08"]
  },
  {
    id: "cyfair-music-arts",
    name: "Cy-Fair Music and Arts Summer Camp",
    provider: "Cy-Fair Music and Arts",
    category: "arts",
    subcategory: "music",
    tags: ["music", "instruments", "arts"],
    neighborhood: "cypress",
    description: "Summer music and arts camps in the Cypress area. Five-lesson 'Beginner Sampler' camp lets students explore different instruments in small groups. Tuition includes music books and a free instrument to take home.",
    sentiment: "Free instrument to take home is an incredible value. Great for discovering which instrument your child loves.",
    ageRange: "5-15",
    cost: "$150-$300/week",
    location: "Cy-Fair Music and Arts, Cypress, TX",
    url: "https://www.cyfairmusicandarts.com/2025-summer-camps-music-arts-houston-cypress",
    registrationDeadline: "Spring 2026",
    documents: ["Online registration"],
    weeks: ["w02", "w03", "w04", "w05", "w06", "w07"]
  },

  // — Visual Arts —
  {
    id: "glassell-junior-school",
    name: "Glassell Junior School Summer Camp",
    provider: "Museum of Fine Arts, Houston (MFAH)",
    category: "arts",
    subcategory: "visual-arts",
    tags: ["painting", "drawing", "ceramics", "sculpture", "mixed media"],
    neighborhood: "museum-district",
    description: "Year-round art classes and summer camp workshops at the MFAH for ages 4-14. Summer program covers drawing, painting, ceramics, animation, fashion design, and mixed media. Back-to-back classes with supervised lunch breaks and museum screenings.",
    sentiment: "World-class art museum setting. Professional instruction in stunning facilities. Truly inspiring for young artists.",
    ageRange: "4-14",
    cost: "$125-$300/week",
    location: "Glassell Junior School, MFAH, 5101 Montrose Blvd, Houston, TX 77006",
    url: "https://www.mfah.org/learn/glassell-junior-school",
    registrationDeadline: "Spring 2026 -- member priority registration",
    documents: ["Online registration"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08"]
  },
  {
    id: "kidcreate-studio",
    name: "Kidcreate Studio Art Camp",
    provider: "Kidcreate Studio",
    category: "arts",
    subcategory: "visual-arts",
    tags: ["painting", "drawing", "sculpture", "crafts"],
    neighborhood: "heights",
    description: "Art camp programs for Kidartists (3-5), Kidcreators (5-9), and Kidmasters (9-14). Projects include painting, sculpting, drawing, mixed media, and themed creative challenges. Small class sizes ensure personal attention.",
    sentiment: "Fun, low-pressure art environment. Kids come home with amazing projects. Convenient Heights location.",
    ageRange: "3-14",
    cost: "$200-$350/week",
    location: "Kidcreate Studio, Greater Heights area, Houston",
    url: "https://kidcreate.com/houston/classes/camps",
    registrationDeadline: "Fills quickly -- register early",
    documents: ["Online registration"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08", "w09"]
  },
  {
    id: "craft-houston-camp",
    name: "Summer Craft Camp at Houston Center for Contemporary Craft",
    provider: "Houston Center for Contemporary Craft",
    category: "arts",
    subcategory: "visual-arts",
    tags: ["ceramics", "jewelry", "weaving", "crafts"],
    neighborhood: "museum-district",
    description: "Hands-on contemporary craft camp for ages 5-9. Projects include ceramic self-portraits, jewelry making, natural fabric dyeing, weaving, and exploring the Craft Garden. Limited to 16 kids per session for personalized instruction.",
    sentiment: "Unique craft-focused camp in the Museum District. Small class sizes are a huge plus. Creative and tactile.",
    ageRange: "5-9",
    cost: "$200-$300/session",
    location: "Houston Center for Contemporary Craft, 4848 Main St, Houston, TX 77002",
    url: "https://crafthouston.org/learn/families/",
    registrationDeadline: "Spring 2026",
    documents: ["Online registration"],
    weeks: ["w03", "w04", "w06", "w07"]
  },
  {
    id: "art-league-houston",
    name: "Art League Houston Summer Intensive for Teens",
    provider: "Art League Houston",
    category: "arts",
    subcategory: "visual-arts",
    tags: ["painting", "drawing", "portfolio", "teen"],
    neighborhood: "montrose",
    description: "Summer studio art intensive for high school students. Develop skills in drawing, painting, and mixed media with professional artists. Build portfolio pieces and prepare for college art programs.",
    sentiment: "Outstanding for serious young artists. Portfolio development is invaluable for college applications.",
    ageRange: "14-18",
    cost: "$300-$500/session",
    location: "Art League Houston, 1953 Montrose Blvd, Houston, TX 77006",
    url: "https://www.artleaguehouston.org/summer-high-school-studio-art-intensive",
    registrationDeadline: "Spring 2026",
    documents: ["Application form"],
    weeks: ["w03", "w04", "w05"]
  },

  // — Digital Arts —
  {
    id: "creator-camp",
    name: "Creator Camp",
    provider: "Creator Camp (Shark Tank featured)",
    category: "arts",
    subcategory: "digital-arts",
    tags: ["filmmaking", "animation", "YouTube", "game design"],
    neighborhood: "sugar-land",
    description: "Shark Tank-featured digital arts camps offering filmmaking, animation, YouTube creation, content production, music production, and game development. Hands-on tech and creative camps with professional-grade equipment.",
    sentiment: "Kids love the Shark Tank connection. Real-world digital media skills. Equipment and instruction are top-notch.",
    ageRange: "5-13",
    cost: "$300-$450/week",
    location: "Multiple Houston-area locations (Sugar Land, Katy, The Woodlands)",
    url: "https://creatorcamp.org/",
    registrationDeadline: "Early bird 10% off until March 31, 2026",
    documents: ["Online registration"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08"]
  },
  {
    id: "houston-school-art-design",
    name: "Houston School of Art & Design Digital Camp",
    provider: "Houston School of Art & Design",
    category: "arts",
    subcategory: "digital-arts",
    tags: ["digital art", "animation", "photography", "graphic design"],
    neighborhood: "galleria",
    description: "Summer camps with age-appropriate, individualized instruction in digital art, animation, photography, graphic design, and illustration. Step-by-step demonstrations of professional techniques using industry-standard software.",
    sentiment: "Professional-grade instruction for aspiring digital artists. Individualized attention is a standout.",
    ageRange: "8-17",
    cost: "$250-$400/week",
    location: "Houston School of Art & Design, Galleria area, Houston",
    url: "https://artschoolhouston.com/houston-camps/",
    registrationDeadline: "Spring 2026",
    documents: ["Online registration"],
    weeks: ["w02", "w03", "w05", "w06", "w08"]
  },

  // ===============================================
  //  STEM & ACADEMIC
  // ===============================================

  // — Technology & Coding —
  {
    id: "id-tech-rice",
    name: "iD Tech Camp at Rice University",
    provider: "iD Tech",
    category: "stem",
    subcategory: "coding",
    tags: ["coding", "game design", "AI", "Python", "Minecraft"],
    neighborhood: "rice-village",
    description: "Week-long STEM camps at Rice University for ages 7-17. Courses include coding in Python and JavaScript, AI and machine learning, game design, app development, and data science. Experience a week at one of the nation's top universities.",
    sentiment: "National leader in tech education. Rice campus is a bonus. Curriculum is constantly updated with latest tech.",
    ageRange: "7-17",
    cost: "$375-$1,100/week",
    location: "Rice University, 6100 Main St, Houston, TX 77005",
    url: "https://www.idtech.com/locations/texas-summer-camps/rice-university",
    registrationDeadline: "2026 registration live -- payment plans available",
    documents: ["Online registration", "Medical form"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08", "w09"]
  },
  {
    id: "id-tech-robotics",
    name: "iD Tech Robotics Camp (BattleBots) at Rice University",
    provider: "iD Tech",
    category: "stem",
    subcategory: "coding",
    tags: ["robotics", "BattleBots", "VEX", "C++", "engineering"],
    neighborhood: "rice-village",
    description: "Robotics camps at Rice University featuring BattleBots Jr. (ages 7-9) and VEX Robotics with C++ for teens. Design, build, and program robots, then compete in BattleBots-style robot showdowns against peers.",
    sentiment: "The BattleBots theme is incredibly engaging. Kids learn real engineering while having a blast competing.",
    ageRange: "7-17",
    cost: "$375-$1,100/week",
    location: "Rice University, 6100 Main St, Houston, TX 77005",
    url: "https://www.idtech.com/robotics-summer-camps/houston",
    registrationDeadline: "2026 registration live -- seats fill quickly",
    documents: ["Online registration", "Medical form"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08", "w09"]
  },
  {
    id: "lavner-camps-rice",
    name: "Lavner Tech Revolution Camps at Rice University",
    provider: "Lavner Camps & Programs",
    category: "stem",
    subcategory: "coding",
    tags: ["coding", "robotics", "Minecraft", "Roblox", "3D printing", "AI"],
    neighborhood: "rice-village",
    description: "Award-winning tech camps with 60+ weekly options at Rice University. Topics include robotics, coding (Scratch, Python, Java, C++), Minecraft, Roblox, AI, 3D printing, game design, app development, and YouTube production. Beginner through advanced levels.",
    sentiment: "Incredible variety of tech topics. Proprietary curriculum with clear progression. Rice campus is a great setting.",
    ageRange: "6-14",
    cost: "$400-$700/week",
    location: "Rice University, 6100 Main St, Houston, TX 77005",
    url: "https://www.lavnercampsandprograms.com/location/houston-tx-summer-camps-tech-camps-rice-university/",
    registrationDeadline: "2026 enrollment open",
    documents: ["Online registration"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08", "w09"]
  },
  {
    id: "code-ninjas",
    name: "Code Ninjas Summer Camp",
    provider: "Code Ninjas",
    category: "stem",
    subcategory: "coding",
    tags: ["coding", "app development", "drones", "robotics", "game design"],
    neighborhood: "katy",
    description: "Themed summer tech camps where kids build apps, fly drones, construct robots, create video games, and code websites. Multiple themed weeks available throughout summer. Interactive, game-based learning approach.",
    sentiment: "Fun ninja theme keeps kids engaged. Multiple locations across Houston suburbs. Good for coding beginners.",
    ageRange: "5-14",
    cost: "$250-$400/week",
    location: "Multiple locations: Katy, Sugar Land, The Woodlands, Cypress, Pearland",
    url: "https://www.codeninjas.com/",
    registrationDeadline: "Spring 2026",
    documents: ["Online registration"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08"]
  },

  // — Engineering —
  {
    id: "rice-stem-letics",
    name: "Rice University STEM-Letics Academy",
    provider: "Rice University Office of STEM Engagement",
    category: "stem",
    subcategory: "engineering",
    tags: ["STEM", "engineering", "athletics"],
    neighborhood: "rice-village",
    description: "Week-long day camp combining STEM activities with athletics for current 3rd-5th graders. Hands-on engineering challenges, science experiments, and physical activities on the Rice University campus. $599 per week.",
    sentiment: "Unique STEM-plus-athletics combo at a world-class university. Outstanding value for the Rice experience.",
    ageRange: "8-11 (grades 3-5)",
    cost: "$599/week",
    location: "Rice University, 6100 Main St, Houston, TX 77005",
    url: "https://research.rice.edu/rstem/stem-letics",
    registrationDeadline: "Application deadline April 18, 2026",
    documents: ["Application form"],
    weeks: ["w04"]
  },
  {
    id: "club-scikidz",
    name: "Club SciKidz Houston",
    provider: "Club SciKidz",
    category: "stem",
    subcategory: "engineering",
    tags: ["science", "robotics", "engineering", "rocketry", "chemistry"],
    neighborhood: "bellaire",
    description: "Over 70 STEM camp themes for grades PK-7th including Robotics, Rocketry, Chemistry, Engineering, Stop Motion Animation, Veterinary Medicine, Oceanography, and Special Effects. Hands-on experiments and projects daily.",
    sentiment: "Massive variety of themes means kids can attend multiple weeks without repeating. Hands-on and engaging.",
    ageRange: "4-13 (grades PK-7)",
    cost: "$275-$400/week",
    location: "Multiple Houston locations (Bellaire, West U, Memorial, Katy)",
    url: "https://houston.clubscikidz.com/",
    registrationDeadline: "Spring 2026",
    documents: ["Online registration"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08", "w09"]
  },
  {
    id: "snapology-camp",
    name: "Snapology STEM Camp",
    provider: "Snapology",
    category: "stem",
    subcategory: "engineering",
    tags: ["LEGO", "robotics", "engineering", "Minecraft"],
    neighborhood: "the-woodlands",
    description: "LEGO-based STEM programs focusing on robotics, engineering, and coding using LEGO bricks and other building systems. Fun themes like Minecraft and Star Wars keep kids engaged while learning STEM concepts through hands-on building.",
    sentiment: "LEGO-based learning is perfect for young builders. Engaging themes maintain interest all week.",
    ageRange: "4-14",
    cost: "$200-$350/week",
    location: "Multiple Houston-area locations (The Woodlands, Katy, Sugar Land)",
    url: "https://www.snapology.com/",
    registrationDeadline: "Spring 2026",
    documents: ["Online registration"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08"]
  },
  {
    id: "rice-elite-tech",
    name: "Rice ELITE Tech Camps",
    provider: "Rice Center for Engineering Leadership",
    category: "stem",
    subcategory: "engineering",
    tags: ["engineering", "technology", "leadership", "innovation"],
    neighborhood: "rice-village",
    description: "Engineering and technology leadership camps at Rice University. Students engage in hands-on engineering design challenges, innovation workshops, and technology projects mentored by Rice engineering students and faculty.",
    sentiment: "Direct connection to Rice engineering school. Mentorship from Rice students adds a personal touch.",
    ageRange: "10-17",
    cost: "$400-$700/week",
    location: "Rice University, 6100 Main St, Houston, TX 77005",
    url: "https://www.rcelconnect.org/elitecamp/",
    registrationDeadline: "Spring 2026",
    documents: ["Application form"],
    weeks: ["w03", "w04", "w05"]
  },
  {
    id: "rice-tapia-stem",
    name: "Rice Tapia STEM Camps",
    provider: "Rice University Tapia Center",
    category: "stem",
    subcategory: "engineering",
    tags: ["STEM", "math", "engineering", "coding"],
    neighborhood: "rice-village",
    description: "STEM camps at Rice University's Tapia Center focusing on computational thinking, coding, engineering design, and mathematics. Programs designed to increase diversity in STEM fields with hands-on projects and mentorship.",
    sentiment: "Mission-driven STEM program at a top university. Focus on inclusivity and representation in STEM is outstanding.",
    ageRange: "8-16",
    cost: "$300-$500/week",
    location: "Rice University, 6100 Main St, Houston, TX 77005",
    url: "https://tapiacenter.rice.edu/tapia-stem-camps",
    registrationDeadline: "Spring 2026",
    documents: ["Application form"],
    weeks: ["w03", "w04", "w05", "w06"]
  },

  // — Natural Sciences —
  {
    id: "hmns-main-camp",
    name: "HMNS Summer Camp",
    provider: "Houston Museum of Natural Science",
    category: "stem",
    subcategory: "natural-sciences",
    tags: ["science", "paleontology", "biology", "chemistry", "coding"],
    neighborhood: "museum-district",
    description: "Week-long, hands-on science camps for ages 6-12 at the Houston Museum of Natural Science. Topics include Junior Paleontologist, Mummies & Mysteries, Crazy for Coding, Minecraft Mania, Master Spy Camp, Ecology Engineers, and Movie Monster Maker. Camp runs Mon-Fri 10am-3pm.",
    sentiment: "Houston institution with incredible museum access. Themes are creative and kids love the hands-on approach.",
    ageRange: "6-12",
    cost: "$300-$400/week",
    location: "HMNS, 5555 Hermann Park Dr, Houston, TX 77030",
    url: "https://www.hmns.org/education/families/summer-camp/",
    registrationDeadline: "Member priority; general public registration March 2, 2026",
    documents: ["Online registration"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08", "w09"]
  },
  {
    id: "hmns-sugar-land",
    name: "HMNS Summer Camp at Sugar Land",
    provider: "Houston Museum of Natural Science at Sugar Land",
    category: "stem",
    subcategory: "natural-sciences",
    tags: ["science", "paleontology", "biology", "chemistry"],
    neighborhood: "sugar-land",
    description: "Same award-winning HMNS summer camp experience at the Sugar Land satellite location. Hands-on science camps covering dinosaurs, space, chemistry, ecology, and more. Convenient for Fort Bend County families.",
    sentiment: "All the HMNS quality without the Inner Loop commute. Great for Sugar Land and Missouri City families.",
    ageRange: "6-12",
    cost: "$300-$400/week",
    location: "HMNS at Sugar Land, 13016 University Blvd, Sugar Land, TX 77479",
    url: "https://sugarland.hmns.org/education/youth-family-opportunities/summer-camp/",
    registrationDeadline: "Spring 2026 -- member priority",
    documents: ["Online registration"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08", "w09"]
  },
  {
    id: "houston-zoo-camp",
    name: "Camp Zoofari at Houston Zoo",
    provider: "Houston Zoo",
    category: "stem",
    subcategory: "natural-sciences",
    tags: ["animals", "wildlife", "conservation", "biology"],
    neighborhood: "museum-district",
    description: "Immersive week-long camps at the Houston Zoo for ages 6-12. Camp themes include Awesome Adaptations (camouflage, mimicry), Wildlife Science (research and conservation), and Ultimate Zoofari (behind-the-scenes tours). Daily animal encounters and interactive lessons.",
    sentiment: "Behind-the-scenes zoo access is unbeatable. Kids connect with animals and conservation in a meaningful way.",
    ageRange: "6-12",
    cost: "$390+/week",
    location: "Houston Zoo, 6200 Hermann Park Dr, Houston, TX 77030",
    url: "https://www.houstonzoo.org/make-memories/kids-families/camp-zoofari/",
    registrationDeadline: "Spring 2026 -- scholarships available",
    documents: ["Online registration"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08", "w09", "w10"]
  },
  {
    id: "space-center-explorer",
    name: "Space Center Houston Explorer Camps",
    provider: "Space Center Houston / NASA Johnson Space Center",
    category: "stem",
    subcategory: "natural-sciences",
    tags: ["space", "NASA", "rocketry", "robotics", "engineering"],
    neighborhood: "clear-lake",
    description: "STEM camps at the official visitor center of NASA Johnson Space Center. Children explore space science through hands-on activities, planetarium shows, rover challenges, coding, rocketry, and astronaut training simulations. Pre-K through age 11.",
    sentiment: "NASA connection is unmatched. Kids are inspired by real space exploration. Hands-on activities are exceptional.",
    ageRange: "4-11",
    cost: "$265-$400/week",
    location: "Space Center Houston, 1601 E NASA Pkwy, Houston, TX 77058",
    url: "https://spacecenter.org/education-programs/explorer-camps/",
    registrationDeadline: "Member pre-registration; general registration opens Jan 20, 2026",
    documents: ["Online registration"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08", "w09"]
  },
  {
    id: "mad-science-houston",
    name: "Mad Science Houston STEM Camp",
    provider: "Mad Science of Houston",
    category: "stem",
    subcategory: "natural-sciences",
    tags: ["science", "chemistry", "physics", "biology", "experiments"],
    neighborhood: "spring-branch",
    description: "Interactive science camps covering chemistry, physics, and biology through hands-on experiments, demonstrations, and take-home projects. Each week explores a different science theme. Available at multiple partner locations across Houston.",
    sentiment: "Kids love the 'mad scientist' theme. Every day brings new experiments. Take-home projects extend the learning.",
    ageRange: "5-12",
    cost: "$225-$350/week",
    location: "Multiple partner locations across Houston (also virtual options)",
    url: "https://houston.madscience.org/",
    registrationDeadline: "Spring 2026",
    documents: ["Online registration"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08"]
  },
  {
    id: "cmh-camp-adventure",
    name: "Children's Museum Houston Camp Adventure",
    provider: "Children's Museum Houston",
    category: "stem",
    subcategory: "natural-sciences",
    tags: ["STEM", "literacy", "science", "crafts"],
    neighborhood: "museum-district",
    description: "FREE summer camp combining literacy and hands-on STEM learning for Pre-K through 5th grade. Funded by Barbara Bush Houston Literacy Foundation and United Way. Occupationally focused activities including STEM experiments, literacy enrichment, creative crafts, and interactive games.",
    sentiment: "Incredible free resource for Houston families. High-quality programming at no cost. A true community treasure.",
    ageRange: "4-11 (Pre-K to 5th grade)",
    cost: "FREE",
    location: "Children's Museum Houston partner sites across Greater Houston, 1500 Binz St, Houston, TX 77004",
    url: "https://www.cmhouston.org/outreach-programs/camp-adventure",
    registrationDeadline: "Spring 2026 -- limited spots",
    documents: ["Application form"],
    weeks: ["w02", "w03", "w04", "w05", "w06", "w07"]
  },
  {
    id: "uhcl-kidsu",
    name: "KidsU Summer Camps at UH-Clear Lake",
    provider: "University of Houston-Clear Lake",
    category: "stem",
    subcategory: "natural-sciences",
    tags: ["STEM", "science", "nature", "space"],
    neighborhood: "clear-lake",
    description: "STEM-focused summer camps at the University of Houston-Clear Lake campus. Programs include hands-on science experiments, nature exploration, space science, and engineering challenges near NASA Johnson Space Center.",
    sentiment: "Great Clear Lake location with proximity to NASA. University setting inspires young learners.",
    ageRange: "6-14",
    cost: "$200-$350/week",
    location: "University of Houston-Clear Lake, 2700 Bay Area Blvd, Houston, TX 77058",
    url: "https://www.uhcl.edu/education/centers-initiatives/center-educational-programs/kids-u/summer-camps-clear-lake",
    registrationDeadline: "Spring 2026",
    documents: ["Online registration"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08"]
  },

  // — Humanities & Logic —
  {
    id: "knight-school-chess",
    name: "The Knight School Chess Camp",
    provider: "The Knight School",
    category: "stem",
    subcategory: "humanities",
    tags: ["chess", "strategy", "logic"],
    neighborhood: "west-university",
    description: "High-energy chess camp celebrating a new tactic each day with videos, music-driven puzzlers, TactixBands, tournaments, and party-bead scoring. All skill levels welcome from beginners to advanced. Half-day and full-day options at most locations.",
    sentiment: "Not your typical quiet chess camp -- high energy and fun. Kids learn strategy without realizing it. Love the prizes.",
    ageRange: "5-14",
    cost: "$200-$400/week",
    location: "Multiple Houston locations (West U, Bellaire, Memorial, Katy, Sugar Land)",
    url: "https://www.theknightschool.com/summer-chess-camps",
    registrationDeadline: "Enrollment open",
    documents: ["Online registration"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08", "w09"]
  },
  {
    id: "chess-wizards",
    name: "Chess Wizards Summer Camp",
    provider: "Chess Wizards",
    category: "stem",
    subcategory: "humanities",
    tags: ["chess", "strategy", "logic"],
    neighborhood: "sugar-land",
    description: "Interactive chess camp for children ages 5-12. Day camps feature an engaging chess curriculum with physical activities, strategy-themed games, tournaments, and team chess opportunities. Builds critical thinking and problem-solving skills.",
    sentiment: "Fun blend of chess instruction and physical activity. Kids stay engaged with the interactive approach.",
    ageRange: "5-12",
    cost: "$200-$350/week",
    location: "Sugar Land and Houston-area locations",
    url: "https://chesswizards.com/camps-registration/",
    registrationDeadline: "Spring 2026",
    documents: ["Online registration"],
    weeks: ["w02", "w04", "w06", "w08"]
  },
  {
    id: "hot-chess-academy",
    name: "HOT Chess Academy Summer Camp",
    provider: "HOT Chess Academy",
    category: "stem",
    subcategory: "humanities",
    tags: ["chess", "strategy", "competition"],
    neighborhood: "sugar-land",
    description: "Chess summer camps at Sugar Land's dedicated chess academy. Programs for all levels from absolute beginners to competitive tournament players. Daily instruction, puzzle solving, and tournament play.",
    sentiment: "Dedicated chess facility with strong competitive program. Great for kids who want to take chess seriously.",
    ageRange: "5-17",
    cost: "$200-$350/week",
    location: "HOT Chess Academy, 104 Industrial Blvd Suite I, Sugar Land, TX 77478",
    url: "https://hot-chess.com/summer-camps/",
    registrationDeadline: "Spring 2026",
    documents: ["Online registration"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08"]
  },

  // ===============================================
  //  ADVENTURE & WILDERNESS
  // ===============================================

  // — Nature Study —
  {
    id: "houston-arboretum",
    name: "Houston Arboretum Nature Summer Camp",
    provider: "Houston Arboretum & Nature Center",
    category: "adventure",
    subcategory: "nature-study",
    tags: ["nature", "outdoor", "ecology", "wildlife"],
    neighborhood: "memorial",
    description: "Week-long nature camps exploring the natural world through hands-on indoor and outdoor adventures at this 155-acre nature sanctuary inside Memorial Park. Curriculum-based education with nature walks, games, Nature Playscape time, crafts, and group activities. Ages 4-12 grouped by age.",
    sentiment: "155 acres of nature in the heart of Houston. Curriculum is thoughtful and engaging. Kids love the playscape.",
    ageRange: "4-12",
    cost: "$250-$460/week (member discounts available)",
    location: "Houston Arboretum, 4501 Woodway Dr, Houston, TX 77024",
    url: "https://houstonarboretum.org/programs-trips/childrens-programs/camps/summer/",
    registrationDeadline: "Member registration Feb 3, 2026; nonmember Feb 10, 2026",
    documents: ["Online registration"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08", "w09"]
  },

  // — Sleepaway —
  {
    id: "camp-olympia",
    name: "Camp Olympia",
    provider: "Camp Olympia",
    category: "adventure",
    subcategory: "sleepaway",
    tags: ["overnight", "water skiing", "horseback riding", "adventure", "multi-sport"],
    neighborhood: "the-woodlands",
    description: "Private overnight camp for boys and girls on Lake Livingston in Trinity, TX (est. 1968). Over 40 activities including water skiing, golf, horseback riding, ropes courses, and more. ACA-accredited with 1:4 staff-to-camper ratio. 1-3 week sessions.",
    sentiment: "One of Texas's most iconic overnight camps. 50+ years of tradition. Life-changing experiences and lifelong friendships.",
    ageRange: "6-16",
    cost: "$2,500-$5,500/session (1-3 weeks)",
    location: "Camp Olympia, 723 Olympia Dr, Trinity, TX 75862 (bus service from Houston)",
    url: "https://www.campolympia.com/",
    registrationDeadline: "$500 deposit to reserve; balance due April 1, 2026",
    documents: ["Registration form", "Medical form", "Physician physical"],
    weeks: ["w04", "w05", "w06", "w07", "w08", "w09"]
  },
  {
    id: "ymca-camp-cullen",
    name: "YMCA Camp Cullen (Overnight)",
    provider: "YMCA of Greater Houston",
    category: "adventure",
    subcategory: "sleepaway",
    tags: ["overnight", "horseback riding", "archery", "water sports", "adventure"],
    neighborhood: "the-woodlands",
    description: "500-acre overnight camp near Trinity, TX with 50 years of adventure. Activities include horseback riding, climbing towers, arts and crafts, water sports, zip lines, archery, ropes courses, and teen leadership adventures. Ages 7-17.",
    sentiment: "Affordable overnight camp with incredible facilities. YMCA values shine through. Builds independence and confidence.",
    ageRange: "7-17",
    cost: "$600-$1,200/session",
    location: "YMCA Camp Cullen, Trinity, TX (bus service from Houston YMCA locations)",
    url: "https://ymcahouston.org/programs/childcare-and-camps/summer-camp",
    registrationDeadline: "Registration open for 2026",
    documents: ["Online registration", "Medical form", "Physician physical"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08", "w09"]
  },

  // ===============================================
  //  LIFE SKILLS & SPECIALIZED
  // ===============================================

  // — Culinary —
  {
    id: "taste-buds-kitchen",
    name: "Taste Buds Kitchen Cooking Camp",
    provider: "Taste Buds Kitchen",
    category: "life",
    subcategory: "culinary",
    tags: ["cooking", "baking", "culinary"],
    neighborhood: "rice-village",
    description: "Week-long cooking camps where kids learn to prepare recipes from scratch including pasta, sushi, pastries, and global cuisine. Hands-on instruction in a professional kitchen with take-home recipes. Themed weeks keep it fresh all summer.",
    sentiment: "Kids love eating what they make! Professional kitchen setting makes them feel like real chefs. Great variety of themes.",
    ageRange: "5-14",
    cost: "$350-$500/week",
    location: "Taste Buds Kitchen, Rice Village area, Houston",
    url: "https://tastebudskitchen.com/houston/camps/",
    registrationDeadline: "Spring 2026",
    documents: ["Online registration"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08"]
  },
  {
    id: "young-chefs-academy",
    name: "Young Chefs Academy Summer Camp",
    provider: "Young Chefs Academy",
    category: "life",
    subcategory: "culinary",
    tags: ["cooking", "baking", "nutrition"],
    neighborhood: "katy",
    description: "Culinary summer camps teaching kids cooking fundamentals, food safety, nutrition, and kitchen skills. Each week features a different cuisine or cooking theme. Kids prepare full meals and desserts to share with families.",
    sentiment: "Teaches real life skills in a fun environment. Kids gain confidence and independence in the kitchen.",
    ageRange: "4-14",
    cost: "$275-$400/week",
    location: "Young Chefs Academy, Katy, TX",
    url: "https://youngchefsacademy.com/katy/summer-camps",
    registrationDeadline: "Spring 2026",
    documents: ["Online registration"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08"]
  },

  // — Maker & Crafting —
  {
    id: "snapology-maker",
    name: "Snapology Maker Camp",
    provider: "Snapology",
    category: "life",
    subcategory: "maker",
    tags: ["building", "crafts", "LEGO", "3D printing"],
    neighborhood: "sugar-land",
    description: "Maker-focused camp using LEGO, K'Nex, and other building systems to create original projects. Kids design, prototype, and build inventions with hands-on materials. 3D printing and engineering design challenges included.",
    sentiment: "Perfect for kids who love to build things. The maker approach encourages creativity and problem-solving.",
    ageRange: "5-12",
    cost: "$200-$350/week",
    location: "Snapology locations (Sugar Land, Katy, The Woodlands)",
    url: "https://www.snapology.com/",
    registrationDeadline: "Spring 2026",
    documents: ["Online registration"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08"]
  },

  // — Special Needs —
  {
    id: "camp-for-all",
    name: "Camp For All",
    provider: "Camp For All Foundation",
    category: "life",
    subcategory: "special-needs",
    tags: ["special needs", "adaptive", "inclusive", "overnight"],
    neighborhood: "the-woodlands",
    description: "Barrier-free camp serving children and adults with challenging illnesses and special needs. Fully accessible facilities with trained staff providing adaptive programming. Activities include horseback riding, fishing, arts and crafts, swimming, and nature trails.",
    sentiment: "Truly life-changing for families with special needs children. Staff training and adaptive facilities are exceptional.",
    ageRange: "5-17",
    cost: "Varies by partner organization (many sessions free)",
    location: "Camp For All, 6301 Rehburg Rd, Burton, TX 77835 (bus from Houston)",
    url: "https://www.campforall.org/",
    registrationDeadline: "Varies by partner -- check website",
    documents: ["Application through partner organization"],
    weeks: ["w02", "w03", "w04", "w05", "w06", "w07", "w08"]
  },
  {
    id: "easter-seals-camp",
    name: "Easter Seals Greater Houston Day Camp",
    provider: "Easter Seals Greater Houston",
    category: "life",
    subcategory: "special-needs",
    tags: ["special needs", "adaptive", "inclusive", "day camp"],
    neighborhood: "bellaire",
    description: "Inclusive summer day camp for children with disabilities and special needs. Structured activities include arts, sports, swimming, field trips, and social skills development. Trained staff maintain low camper-to-counselor ratios.",
    sentiment: "Inclusive and welcoming environment. Staff genuinely care about each child's experience and growth.",
    ageRange: "5-14",
    cost: "$250-$400/week (scholarships available)",
    location: "Easter Seals Greater Houston, Bellaire area",
    url: "https://www.eastersealshouston.org/",
    registrationDeadline: "Spring 2026",
    documents: ["Application form", "Medical form"],
    weeks: ["w01", "w02", "w03", "w04", "w05", "w06", "w07", "w08"]
  }
];
