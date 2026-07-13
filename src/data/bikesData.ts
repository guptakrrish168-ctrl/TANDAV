/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BikeModel, RideEvent, RiderChapter, ForumPost } from "../types";

export const BIKES_DATA: BikeModel[] = [
  {
    id: "apex-r-900",
    name: "Tandav Apex-Rage 990",
    tagline: "Unleash Pure Tarmac Violence.",
    category: "Street",
    basePrice: 789000,
    engine: "988cc, Inline 3-Cylinder Screamer, Liquid-Cooled",
    power: "135 BHP @ 11,250 RPM",
    torque: "108 Nm @ 9,000 RPM",
    weight: 179,
    tankCapacity: "16 Liters",
    seatHeight: "830 mm",
    description: "An asphalt-shredding weapon designed to terrify your nervous system. The Apex-Rage 990 features a hyper-aggressive, forward-thrusting frame, exposed carbon-titanium bodyworks, and a screaming race-derived triple-cylinder motor that transforms every commute into an absolute adrenaline-fueled riot.",
    engineeringStory: "Forged in our high-voltage Pune Core Lab, the Apex-Rage 990 strips away all pleasantries. We engineered a laser-welded hyper-trellis chassis coupled with a razor-thin single-sided swingarm. The result? A power-to-weight ratio that triggers immediate panic-mode excitement and turns mountain hairpins into personal playgrounds.",
    terrainTags: ["Race Tracks", "Western Ghats Slopes", "City Overpasses"],
    colors: [
      {
        name: "Inferno Neon Orange",
        hex: "#FF3E00",
        bgClass: "bg-[#FF3E00] shadow-[0_0_10px_rgba(255,62,0,0.5)]",
        accentColor: "rgba(255, 62, 0, 0.3)",
        imageUrls: {
          side: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200",
          front: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1200",
          rear: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200"
        }
      },
      {
        name: "Blood-Red Forge",
        hex: "#D50000",
        bgClass: "bg-[#D50000] shadow-[0_0_10px_rgba(213,0,0,0.5)]",
        accentColor: "rgba(213, 0, 0, 0.3)",
        imageUrls: {
          side: "https://images.unsplash.com/photo-1615887137264-0017246a63f1?auto=format&fit=crop&q=80&w=1200",
          front: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1200",
          rear: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200"
        }
      },
      {
        name: "Toxic Radioactive Lime",
        hex: "#CCFF00",
        bgClass: "bg-[#CCFF00] text-zinc-950 shadow-[0_0_10px_rgba(204,255,0,0.5)]",
        accentColor: "rgba(204, 255, 0, 0.3)",
        imageUrls: {
          side: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&q=80&w=1200",
          front: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1200",
          rear: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200"
        }
      }
    ],
    accessories: [
      { id: "exhaust-akrapovic", name: "Tandav Inferno Full Titanium Pipe", category: "exhaust", price: 78000, weightChange: -4.5, desc: "Raw, unbaffled titanium full-system exhaust. Unleashes a bone-rattling 122-decibel growl and unlocks an extra 6 BHP." },
      { id: "protection-sliders", name: "Anarchy CNC Dual Slider Armor", category: "protection", price: 14500, weightChange: 0.9, desc: "Impact-absorbing aircraft-grade billet alloy sliders to guard the violent engine core." },
      { id: "carbon-fender", name: "Carbon-Rage Autoclave Mudguard", category: "performance", price: 26000, weightChange: -1.4, desc: "Pure carbon weave replacing stock plastic. Keeps front end ultra-light for endless power wheelies." },
      { id: "tank-pad", name: "Viper Grip Thigh Gripper Pads", category: "ergonomics", price: 3900, weightChange: 0.1, desc: "Traction-engineered heavy-duty rubber for locking in your thighs during brutal 50-degree cornering leans." }
    ],
    specs: [
      { label: "Displacement", value: "988 cc" },
      { label: "Bore x Stroke", value: "79 mm x 67.2 mm" },
      { label: "Compression Ratio", value: "13.2:1" },
      { label: "Transmission", value: "6-Speed with Bi-Directional Quickshifter (Tuned for violent shifts)" },
      { label: "Suspension Front", value: "Öhlins NIX30 43mm Fully Adjustable USD Racing Forks" },
      { label: "Suspension Rear", value: "Öhlins TTX36 Track Monoshock, fully adjustable" },
      { label: "Brakes Front", value: "Dual 330mm heavy-metal discs, Brembo Stylema Monobloc calipers" },
      { label: "Brakes Rear", value: "Single 250mm disc, Brembo 2-piston savage caliper" }
    ]
  },
  {
    id: "nomad-850",
    name: "Tandav Nomad-Hellhound 900",
    tagline: "Vandalize Every Horizon.",
    category: "Adventure",
    basePrice: 860000,
    engine: "899cc, Parallel-Twin, 270-degree Savage Fire Order",
    power: "108 BHP @ 9,250 RPM",
    torque: "98 Nm @ 7,000 RPM",
    weight: 198,
    tankCapacity: "22 Liters",
    seatHeight: "860 mm",
    description: "Built to brutally conquer the high-altitude death roads of Spiti, deep river crossings of Ladakh, and muddy ruts of the Western Ghats. The Nomad-Hellhound features insane ground clearance, long-travel trophy-truck style suspension, and low-end torque that crawls up vertical walls.",
    engineeringStory: "We built the Nomad-Hellhound specifically to ignore road rules. High-positioned snorkel intakes let you submerge the bike up to the gas tank during river runs, while our automatic Altitude-Rage ECU remaps fuel-air structures on the fly as oxygen drops above 15,000 feet.",
    terrainTags: ["Ladakh Water Crossings", "Spiti Silt Tracks", "Sahyadri Cliff Trails"],
    colors: [
      {
        name: "Apocalypse Sandstorm",
        hex: "#C2A679",
        bgClass: "bg-[#C2A679]",
        accentColor: "rgba(194, 166, 121, 0.3)",
        imageUrls: {
          side: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200",
          front: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1200",
          rear: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1200"
        }
      },
      {
        name: "Wild Jungle Chaos",
        hex: "#223E26",
        bgClass: "bg-[#223E26]",
        accentColor: "rgba(34, 62, 38, 0.3)",
        imageUrls: {
          side: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1200",
          front: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1200",
          rear: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200"
        }
      },
      {
        name: "Steel Destroyer",
        hex: "#7B8186",
        bgClass: "bg-[#7B8186]",
        accentColor: "rgba(123, 129, 134, 0.3)",
        imageUrls: {
          side: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1200",
          front: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200",
          rear: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1200"
        }
      }
    ],
    accessories: [
      { id: "pannier-aluminum", name: "Tandav Panzer 3-Box Cargo System", category: "luggage", price: 46000, weightChange: 13.8, desc: "Aero-grade hard-anodized cargo boxes (115L combined) designed to survive high-speed crashes and keep water completely out." },
      { id: "aux-lights", name: "Hellfire Quad-LED Searchlights", category: "performance", price: 19800, weightChange: 1.1, desc: "Explosive 6,000-lumen auxiliary pods to turn dark mountain trails into broad daylight." },
      { id: "tall-windshield", name: "Hurricane Wind Shield", category: "ergonomics", price: 6800, weightChange: 0.6, desc: "High-angle shield designed to redirect gravel, bugs, and high-velocity wind streams over your helmet." },
      { id: "sump-guard", name: "Rock-Crusher Heavy Bash Plate", category: "protection", price: 10500, weightChange: 2.8, desc: "4mm hardened alloy undertray that absorbs direct impact from boulders without denting." }
    ],
    specs: [
      { label: "Displacement", value: "899 cc" },
      { label: "Ground Clearance", value: "260 mm (Insane height)" },
      { label: "Suspension Travel", value: "240mm Front / 235mm Rear" },
      { label: "Electronics", value: "6-Axis Savage IMU, Slide Control, Off-Road Drift Mode ABS" },
      { label: "Wheels Front/Rear", value: "21-inch Front / 18-inch Rear Heavy-Spoked Tubeless Alloys" },
      { label: "Riding Modes", value: "Rain, Tarmac, Mud, Beast Mode (Custom Rally map)" }
    ]
  },
  {
    id: "ronin-1200",
    name: "Tandav Ronin-Anarchist 1300",
    tagline: "Rule the Highways. No Compromise.",
    category: "Cruiser",
    basePrice: 1249000,
    engine: "1280cc, Liquid-cooled, Savage 8-Valve V-Twin Engine",
    power: "115 BHP @ 7,500 RPM",
    torque: "125 Nm @ 3,200 RPM",
    weight: 229,
    tankCapacity: "18 Liters",
    seatHeight: "695 mm",
    description: "Low, blacked-out, and packing ridiculous grunt. The Ronin-Anarchist is a brutal cruiser combining extreme low-end torque with zero-compromise style. Rip through open highway lanes with immediate presence and an exhaust rumble that sets off car alarms.",
    engineeringStory: "At its core beats a high-torque V-twin engine fitted with custom magnesium castings and low-inertia pistons. We ditched heavy chrome trim for raw, shot-peened metals and a carbon-fiber drive belt system to handle rapid throttle dumps.",
    terrainTags: ["Golden Quadrilateral Highways", "Coastal Expressways", "Midnight Runs"],
    colors: [
      {
        name: "Anarchy Bronze",
        hex: "#2D1D18",
        bgClass: "bg-[#2D1D18]",
        accentColor: "rgba(45, 29, 24, 0.35)",
        imageUrls: {
          side: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200",
          front: "https://images.unsplash.com/photo-1558981420-87aa9dad1c89?auto=format&fit=crop&q=80&w=1200",
          rear: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&q=80&w=1200"
        }
      },
      {
        name: "Shadow Black Out",
        hex: "#09090A",
        bgClass: "bg-[#09090A] border border-zinc-800",
        accentColor: "rgba(15, 15, 15, 0.4)",
        imageUrls: {
          side: "https://images.unsplash.com/photo-1558981420-87aa9dad1c89?auto=format&fit=crop&q=80&w=1200",
          front: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200",
          rear: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&q=80&w=1200"
        }
      }
    ],
    accessories: [
      { id: "cruise-exhaust", name: "Tandav Shotgun Dual Pipes", category: "exhaust", price: 82000, weightChange: -3.2, desc: "Slashed dual titanium pipes designed with zero exhaust restriction for maximum noise and peak throttle response." },
      { id: "pillion-backrest", name: "Anarchy Comfort Backrest", category: "ergonomics", price: 15500, weightChange: 3.1, desc: "Reinforced high-back rest with premium water-resistant distressed leather." },
      { id: "side-bags", name: "Heavy Military Canvas Saddlebags", category: "luggage", price: 19000, weightChange: 3.8, desc: "Military-spec waxed canvas bags with ultra-rugged quick-lock steel frames." }
    ],
    specs: [
      { label: "Engine Type", value: "60-degree V-Twin monster, 4 valves per cylinder" },
      { label: "Final Drive", value: "Carbon-Kevlar High-Strength Belt Drive" },
      { label: "Seat Height", value: "695 mm (Incredibly Low & Mean)" },
      { label: "Tire Sizes", value: "140/90-19 Front, 200/60-16 Savage Rear" },
      { label: "Brakes", value: "Brembo dual-disk front with Performance Cornering ABS" }
    ]
  },
  {
    id: "chronos-ev",
    name: "Tandav Chronos-Shockwave",
    tagline: "Silence has Never Been So Violent.",
    category: "Electric",
    basePrice: 1499000,
    engine: "Tandav Axial-Flux Liquid-Cooled Hyper-Electric Motor",
    power: "165 BHP (Instant Output)",
    torque: "240 Nm (0 - 7,000 RPM Flat)",
    weight: 209,
    tankCapacity: "23.5 kWh Battery Pack",
    seatHeight: "815 mm",
    description: "The peak of hyper-electric aggression. The Chronos-Shockwave delivers a mind-bending 240 Nm of torque directly from zero RPM. Rocketing from 0 to 100 km/h in an earth-shattering 2.4 seconds, it leaves everything else breathing ozone.",
    engineeringStory: "By combining an ultra-high-density Axial-Flux motor with a cutting-edge 850V Silicon Carbide power inverter, we bypassed thermal throttling. Charges from empty to 80% in an unbelievable 15 minutes, with a carbon-wrapped frame that keeps weight down.",
    terrainTags: ["Smart Speedways", "Quarter-Mile Drags", "High-Tech Circuits"],
    colors: [
      {
        name: "Electric Plasma Saffron",
        hex: "#FF3E00",
        bgClass: "bg-[#FF3E00] shadow-[0_0_10px_rgba(255,62,0,0.5)]",
        accentColor: "rgba(255, 62, 0, 0.3)",
        imageUrls: {
          side: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200",
          front: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=1200",
          rear: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1200"
        }
      },
      {
        name: "Toxic Radiation Cyan",
        hex: "#00F0FF",
        bgClass: "bg-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.5)]",
        accentColor: "rgba(0, 240, 255, 0.3)",
        imageUrls: {
          side: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=1200",
          front: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200",
          rear: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1200"
        }
      }
    ],
    accessories: [
      { id: "charger-home", name: "Tandav Hyper-Grid 22kW Home Charger", category: "performance", price: 92000, weightChange: 7.5, desc: "High-voltage home charging station. Recharges the beast to full power in 1.2 hours." },
      { id: "ev-paddock", name: "Autoclave Carbon Pit Stands", category: "protection", price: 16000, weightChange: 1.4, desc: "Carbon fiber paddock stands designed specifically for race-day fast track setups." }
    ],
    specs: [
      { label: "Battery Unit", value: "23.5 kWh Lithium-Metal with Active Thermal Spraying" },
      { label: "Real World Range", value: "340 km (City) / 230 km (Hyper Highway)" },
      { label: "Launch Speed", value: "0 - 100 km/h in 2.4 seconds flat" },
      { label: "Top Speed", value: "235 km/h (Savage high-speed limit)" },
      { label: "Motor Architecture", value: "Axial-Flux PMSM Hyper-motor" }
    ]
  }
];

export const UPCOMING_RIDES: RideEvent[] = [
  {
    id: "ride-ladakh",
    title: "TANDAV Ladakh Death-Loop Expedition",
    route: "Manali - Sarchu - Leh - Khardung La",
    date: "August 12 - 20, 2026",
    region: "North",
    difficulty: "Extreme",
    distance: "980 km",
    duration: "9 Days",
    description: "The ultimate testing ground for machines and men. Climb the world's highest, oxygen-starved mountain passes, slide through loose silt riverbeds, and watch the sun rise over Pangong Tso with your fellow fearless tribe.",
    rsvpCount: 57,
    userRsvped: false,
    imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "ride-ghats",
    title: "Western Ghats Hairpin Monsoon Madness",
    route: "Pune - Mahabaleshwar - Amboli - Goa",
    date: "September 04 - 06, 2026",
    region: "West",
    difficulty: "Challenging",
    distance: "550 km",
    duration: "3 Days",
    description: "Throw your screaming sports bikes into the misty, wet asphalt hairpins of the Sahyadri ranges. Expect heavy rain, insane waterfalls, spectacular cliff edges, and high-speed coastal tarmac leading to Goa.",
    rsvpCount: 89,
    userRsvped: false,
    imageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "ride-coastal",
    title: "The Great Coromandel Speed Runway Run",
    route: "Chennai - Pondicherry - Chidambaram",
    date: "October 10, 2026",
    region: "South",
    difficulty: "Easy",
    distance: "180 km",
    duration: "1 Day",
    description: "A high-speed, sun-drenched coastal blast along the East Coast Road. Perfect for carving open high-speed sweepers, smelling ocean salt, and sharing aggressive riding stories over beachside breakfasts.",
    rsvpCount: 142,
    userRsvped: false,
    imageUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800"
  }
];

export const RIDER_CHAPTERS: RiderChapter[] = [
  {
    id: "chap-bengaluru",
    name: "Bengaluru Outpost (Nandi Screamer Rangers)",
    city: "Bengaluru",
    memberCount: 420,
    description: "The corner-craving tech rebels. Known for pre-dawn high-rpm runs to Nandi Hills and intense multiday blasts to Ooty and Kodaikanal.",
    coverImage: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=600",
    leader: "Abhishek Rao"
  },
  {
    id: "chap-delhi",
    name: "Delhi Outpost (Himalayan Chaos Sentinels)",
    city: "Delhi NCR",
    memberCount: 445,
    description: "Our gateway to mountain insanity. Weekend high-speed runs on the Yamuna Expressway and high-elevation Himalayan epics.",
    coverImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600",
    leader: "Kabir Singh"
  },
  {
    id: "chap-mumbai",
    name: "Mumbai-Pune Outpost (Ghat Ripper Syndicate)",
    city: "Mumbai & Pune",
    memberCount: 588,
    description: "Riders who live in the mountain switchbacks. Weekly dawn runs up the Bhor Ghat and relentless monsoon storm-chasing tours.",
    coverImage: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=600",
    leader: "Pooja Sawant"
  }
];

export const FORUM_POSTS: ForumPost[] = [
  {
    id: "post-1",
    authorName: "Vikram Malhotra",
    authorTitle: "Hellhound Master",
    avatarSeed: "vikram",
    title: "Nomad-Hellhound Ladakh Silt Run: Spiti Loops Decimated",
    content: "Just back from a brutal 11-day solo run across Spiti. The automatic Altitude-Rage ECU mapped oxygen perfectly at 15,200 ft. Pro-tip for fellow tribe riders: Carry steel-reinforced ties for the panzers and bleed front suspension valves daily to prevent high-altitude pressure locks. Let's conquer the world!",
    category: "rides",
    likes: 142,
    repliesCount: 45,
    date: "July 10, 2026"
  },
  {
    id: "post-2",
    authorName: "Rohan Devan",
    authorTitle: "Apex Hell-Rider",
    avatarSeed: "rohan",
    title: "Apex-Rage 990: Screaming at 12k RPM on SC Titanium Pipe",
    content: "Fitted the full-system titanium exhaust last week. The weight-drop of nearly 4.5kg makes the bike transition like a hummingbird on speed, and the exhaust note past 8,500 RPM is pure acoustic violence. Absolutely hair-raising! Mid-range gain is almost 6 BHP.",
    category: "tech",
    likes: 98,
    repliesCount: 29,
    date: "July 08, 2026"
  },
  {
    id: "post-3",
    authorName: "Ananya Iyer",
    authorTitle: "Shockwave Rider",
    avatarSeed: "ananya",
    title: "Chronos-Shockwave Hyper-Electric Daily Cost Analysis",
    content: "Bengaluru riders: Charging the Chronos-Shockwave from 0 to 100% takes about 23 units. That's under ₹200 for 340 km of pure, brutal hyper-performance street riding. The instant 240 Nm torque makes modern city commutes feel like riding a high-tech lightning bolt. Try it and be converted!",
    category: "customs",
    likes: 185,
    repliesCount: 41,
    date: "July 05, 2026"
  }
];

export const DEALERS_DATA = [
  { id: "dl-blr", name: "Tandav Bengaluru Outpost", city: "Bengaluru", address: "82, Lavelle Road, Near Richmond Circle, Bengaluru, 560001", phone: "+91 98845 23001" },
  { id: "dl-mum", name: "Tandav Mumbai Warzone", city: "Mumbai", address: "A-5, Annie Besant Road, Worli, Mumbai, 400018", phone: "+91 98201 11442" },
  { id: "dl-del", name: "Tandav Delhi Ridge Core", city: "Delhi NCR", address: "Commercial Plaza, Vasant Kunj, New Delhi, 110070", phone: "+91 98110 55800" },
  { id: "dl-pne", name: "Tandav Pune Factory Core Lab", city: "Pune", address: "12, Senapati Bapat Road, Shivajinagar, Pune, 411016", phone: "+91 97654 44321" },
  { id: "dl-chn", name: "Tandav Chennai Speedport", city: "Chennai", address: "204, East Coast Road, Injambakkam, Chennai, 600115", phone: "+91 99401 22330" },
  { id: "dl-koc", name: "Tandav Kochi Edge Outpost", city: "Kochi", address: "Door No. 39/2910, Bypass Road, Palarivattom, Kochi, 682025", phone: "+91 98460 77110" }
];
