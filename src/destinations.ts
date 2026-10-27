export type Destination = {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  description: string;
  chandigarh: number;
  delhi: number;
  distanceNote?: string;
  daysChandigarh: string;
  daysDelhi: string;
  season: string;
  highlights: string[];
  plan: string;
  note: string;
  source: string;
};

// Road distances are rounded planning estimates, not live navigation results.
// Durations are suggested round trips, including outward and return travel.
export const destinations: Destination[] = [
  {
    id: 'manali', name: 'Manali', subtitle: 'Snow peaks. Pine forests. A little adventure.', category: 'Mountain escape',
    description: 'Slow mornings in Old Manali, the Beas by your side and a day out in Solang Valley. A classic mountain holiday for families and friends.',
    chandigarh: 320, delhi: 570, daysChandigarh: '4–5 days', daysDelhi: '5–6 days', season: 'Mar–Jun · Oct–Feb',
    highlights: ['Solang Valley', 'Hadimba Temple', 'Old Manali', 'Vashisht'],
    plan: 'Travel in → explore Manali → take a Solang excursion → return. Add a day for a longer local outing.',
    note: 'Snow activities and access to Rohtang or higher passes depend on weather and permissions.',
    source: 'https://hptdc.hp.gov.in/access',
  },
  {
    id: 'shimla', name: 'Shimla & Kufri', subtitle: 'The hill-station classic, at your own pace.', category: 'Family favourite',
    description: 'Walk the Ridge, browse Mall Road and head out to Kufri for mountain views. Easy-going days with a little old-world charm.',
    chandigarh: 120, delhi: 370, daysChandigarh: '3–4 days', daysDelhi: '4–5 days', season: 'Mar–Jun · Oct–Feb',
    highlights: ['The Ridge', 'Mall Road', 'Kufri', 'Jakhu Temple'],
    plan: 'Travel to Shimla → explore the town → visit Kufri → return. Keep an extra day for a relaxed stay.',
    note: 'Distances are to Shimla. Kufri is a separate local excursion; winter road access can change.',
    source: 'https://hpshimla.nic.in/how-to-reach/',
  },
  {
    id: 'dharamshala', name: 'Dharamshala', subtitle: 'Dhauladhar views & Tibetan soul.', category: 'Culture & calm',
    description: 'A slower escape beneath the Dhauladhars. Pair Dharamshala with McLeod Ganj for monasteries, cafés and forest walks.',
    chandigarh: 255, delhi: 525, daysChandigarh: '3–4 days', daysDelhi: '4–5 days', season: 'Mar–Jun · Sep–Nov',
    highlights: ['McLeod Ganj', 'Bhagsu', 'Dalai Lama Temple', 'Naddi'],
    plan: 'Travel in → explore Dharamshala → spend a day around McLeod Ganj and Naddi → return.',
    note: 'Distances are to Dharamshala. Allow extra travel for McLeod Ganj; Triund trekking needs a separate day and planning.',
    source: 'https://hpkangra.nic.in/how-to-reach/',
  },
  {
    id: 'dalhousie', name: 'Dalhousie', subtitle: 'Deodar trails & unhurried hillside days.', category: 'Slow travel',
    description: 'Take the scenic road to a town of forest walks and quiet viewpoints. Add a Khajjiar day trip for a little more green.',
    chandigarh: 315, delhi: 560, daysChandigarh: '4–5 days', daysDelhi: '5–6 days', season: 'Mar–Jun · Sep–Nov',
    highlights: ['Panchpula', 'Subhash Baoli', 'Gandhi Chowk', 'Khajjiar outing'],
    plan: 'Travel in → discover Dalhousie → take an optional Khajjiar excursion → return at a comfortable pace.',
    note: 'Forest activities and higher roads may be affected by rain or snow. Local excursions add distance.',
    source: 'https://himachaltourism.gov.in/destination/dalhousie/',
  },
  {
    id: 'khajjiar', name: 'Khajjiar', subtitle: 'A meadow made for doing a little less.', category: 'Meadows & forests',
    description: 'A wide green meadow ringed by deodar forests. Make it a gentle addition to a Dalhousie trip, with time to sit and take it in.',
    chandigarh: 340, delhi: 585, distanceNote: 'Via Dalhousie', daysChandigarh: '4–5 days', daysDelhi: '5–6 days', season: 'Apr–Jun · Sep–Nov',
    highlights: ['Khajjiar meadow', 'Khajji Nag Temple', 'Forest views', 'Dalhousie'],
    plan: 'Base yourself in Dalhousie → enjoy a Khajjiar day outing → leave time for nearby sights → travel back.',
    note: 'Route estimates combine the Dalhousie approach with its roughly 22 km Khajjiar excursion. Snow can affect access.',
    source: 'https://hptdc.hp.gov.in/access',
  },
  {
    id: 'kasauli', name: 'Kasauli', subtitle: 'Your short break in the pines.', category: 'Weekend getaway',
    description: 'Forest air, gentle strolls and a small-town bazaar. An easy choice when you want a Himachal break without heading too far into the mountains.',
    chandigarh: 65, delhi: 325, daysChandigarh: '2–3 days', daysDelhi: '3–4 days', season: 'Mar–Jun · Sep–Nov',
    highlights: ['Gilbert Trail', 'Christ Church', 'Heritage bazaar', 'Sunset views'],
    plan: 'Drive in → enjoy the bazaar and viewpoints → take a morning forest walk → return.',
    note: 'Trail access and viewpoints depend on local conditions. Allow more time over busy holiday weekends.',
    source: 'https://hptdc.hp.gov.in/access',
  },
  {
    id: 'kasol', name: 'Kasol & Manikaran', subtitle: 'Riverside days in the Parvati Valley.', category: 'Riverside retreat',
    description: 'Follow the Parvati River to Kasol for cafés and village walks, with an outing to the pilgrimage town of Manikaran.',
    chandigarh: 295, delhi: 525, distanceNote: 'Via Bhuntar · to Kasol', daysChandigarh: '3–4 days', daysDelhi: '4–5 days', season: 'Mar–Jun · Sep–Nov',
    highlights: ['Parvati River', 'Chalal walk', 'Manikaran', 'Kasol cafés'],
    plan: 'Arrive in Kasol → explore the riverside and Chalal → visit Manikaran → return via Bhuntar.',
    note: 'Estimates include the Bhuntar–Kasol road. Tosh and longer treks need extra time; valley access can change during rain.',
    source: 'https://kasol.com/getting-to-kasol/',
  },
  {
    id: 'bir', name: 'Bir Billing', subtitle: 'Big skies & a softer landing.', category: 'Adventure & cafés',
    description: 'Discover Tibetan monasteries and relaxed cafés in Bir. Ask about a Billing excursion and weather-dependent paragliding with a local operator.',
    chandigarh: 280, delhi: 520, daysChandigarh: '3–4 days', daysDelhi: '4–5 days', season: 'Mar–May · Oct–Nov',
    highlights: ['Bir monasteries', 'Billing viewpoint', 'Café trail', 'Landing-site sunsets'],
    plan: 'Travel to Bir → explore the village → set aside a day for Billing or a local outing → return.',
    note: 'Distances are to Bir. Flights, activity costs and operator availability are separate and subject to weather.',
    source: 'https://www.himachaltourism.org/tourist-attractions/bir-billing/',
  },
  {
    id: 'palampur', name: 'Palampur', subtitle: 'Tea country beneath the Dhauladhars.', category: 'Nature & tea trails',
    description: 'A green Kangra Valley escape for tea-garden scenery, mountain views and a slower pace. Add Baijnath or Andretta to your local itinerary.',
    chandigarh: 260, delhi: 485, daysChandigarh: '3–4 days', daysDelhi: '4–5 days', season: 'Mar–Jun · Sep–Nov',
    highlights: ['Tea-garden views', 'Neugal Khad', 'Andretta', 'Baijnath outing'],
    plan: 'Travel in → enjoy Palampur and its tea scenery → choose a nearby village or temple outing → return.',
    note: 'Tea-estate entry depends on the property. Ask before entering gardens or arranging a factory visit.',
    source: 'https://hpkangra.nic.in/tourist-place/palampur-tea-garden/',
  },
  {
    id: 'tirthan', name: 'Tirthan Valley', subtitle: 'The river sets the pace here.', category: 'Offbeat escape',
    description: 'Stay close to the Tirthan River, explore around Gushaini and leave space for a Jibhi outing. A trip for people who like quieter corners.',
    chandigarh: 265, delhi: 480, distanceNote: 'Via Aut · valley estimates', daysChandigarh: '4–5 days', daysDelhi: '5–6 days', season: 'Mar–Jun · Sep–Nov',
    highlights: ['Gushaini', 'Riverside walks', 'Jibhi outing', 'Village scenery'],
    plan: 'Travel via Aut → enjoy a riverside day → plan a Jibhi or local village excursion → return.',
    note: 'Your final distance depends on the village and stay. Park treks and Jalori Pass need separate time and access checks.',
    source: 'https://tirthanvalley.org/how-to-reach-tirthan/',
  },
  {
    id: 'kinnaur', name: 'Kinnaur', subtitle: 'Orchards, mountain villages & open horizons.', category: 'Himalayan road trip',
    description: 'Plan a longer journey around Kalpa and the Kinnaur valleys. With extra days, extend your route to Sangla and Chitkul.',
    chandigarh: 350, delhi: 580, distanceNote: 'To Reckong Peo · not Chitkul', daysChandigarh: '6–7 days', daysDelhi: '7–8 days', season: 'Apr–Jun · Sep–Oct',
    highlights: ['Kalpa', 'Reckong Peo', 'Sangla extension', 'Chitkul extension'],
    plan: 'Break the outward drive → explore Kalpa → add Sangla and Chitkul if time allows → break the return journey.',
    note: 'Distances are tourism-board estimates to Reckong Peo. Kalpa, Sangla and Chitkul add road travel; allow buffer days.',
    source: 'https://himachaltourism.gov.in/destination/kinnaur/',
  },
  {
    id: 'spiti', name: 'Spiti Valley', subtitle: 'A different world, beyond the high passes.', category: 'High-altitude journey',
    description: 'Wide, stark landscapes and mountain villages around Kaza. This is a longer journey that deserves a carefully paced route and extra days.',
    chandigarh: 500, delhi: 730, distanceNote: 'To Kaza via Manali · seasonal road', daysChandigarh: '8–10 days', daysDelhi: '10–12 days', season: 'Jun–Sep · check pass opening',
    highlights: ['Kaza', 'Key Monastery', 'Langza', 'Tabo extension'],
    plan: 'Plan staged travel with time to adjust to altitude → explore around Kaza → allow a gradual return and buffer days.',
    note: 'These distances use the seasonal Manali approach. A route via Shimla is different; confirm road access and a suitable pace before travel.',
    source: 'https://himachaltourism.gov.in/destination/spiti-valley/',
  },
];
