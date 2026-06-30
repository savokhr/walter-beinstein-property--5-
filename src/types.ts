export interface Property {
  id: string;
  title: string;
  tagline: string;
  description: string;
  location: string;
  pricePerNight: number;
  currency: string;
  image: string;
  vibe: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  features: string[];
}

export interface Material {
  id: string;
  name: string;
  category: string;
  description: string;
  vibe: string;
  image: string;
}

export interface JournalPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
}

export const PROPERTIES_DATA: Property[] = [
  {
    id: "casa-di-pietra",
    title: "Case di Pietra",
    tagline: "An ancestral stone barn re-imagined as a raw sanctuary.",
    description: "Nestled among ancient cork oaks, this Portuguese retreat marries rough lime plaster walls with hand-hewn oak rafters. A dialogue between historic weight and minimalist weightlessness.",
    location: "Alentejo, Portugal",
    pricePerNight: 650,
    currency: "€",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85",
    vibe: "Rustic Minimalist",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    features: ["Local limestone baths", "Sartorial linen sheets", "Saltwater infinity pool", "Olive grove path"]
  },
  {
    id: "villa-dei-cipressi",
    title: "Villa dei Cipressi",
    tagline: "Light, stone, and the gentle sigh of old olive orchards.",
    description: "A monolithic lime-washed villa in Puglia. Designed around an internal courtyard, featuring antique flagstones underfoot and bespoke brass fixtures that oxidize beautifully over time.",
    location: "Puglia, Italy",
    pricePerNight: 950,
    currency: "€",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    vibe: "Sanctuary",
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 8,
    features: ["Private walled gardens", "Restored open hearth", "Oxidized brass accents", "Outdoor chef kitchen"]
  },
  {
    id: "komorebi-house",
    title: "Komorebi House",
    tagline: "Bespoke cedarwood framing the quiet dance of forest light.",
    description: "A contemplative retreat overlooking the bamboo hills of Arashiyama. Features modular washi screens, heated cedar plank floors, and an onsen-inspired hinoki wood bath.",
    location: "Kyoto, Japan",
    pricePerNight: 820,
    currency: "€",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    vibe: "Zen Retreat",
    bedrooms: 1,
    bathrooms: 1.5,
    maxGuests: 2,
    features: ["Hinoki wood soak tub", "Woven tatami room", "Moss garden overlook", "Handmade ceramic service"]
  },
  {
    id: "cove-house",
    title: "Cove House",
    tagline: "Tactile board-marked concrete mirroring wild slate cliffs.",
    description: "Perched above a private cove, this house is a shelter of raw concrete, structural steel, and deep-toned oak. Large openings draw the shifting Atlantic light directly onto the textured linen drapes.",
    location: "Cornwall, UK",
    pricePerNight: 580,
    currency: "€",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
    vibe: "Coastal Monolith",
    bedrooms: 3,
    bathrooms: 2.5,
    maxGuests: 6,
    features: ["Board-marked concrete walls", "Wood burning stove", "Panoramic sea views", "Bespoke wool blankets"]
  },
  {
    id: "mira-limon",
    title: "Villa Limón",
    tagline: "Sun-dappled clay terraces perfumed with citrus and sea breeze.",
    description: "A cliffside haven in Peloponnese constructed entirely from local sand-toned clay. Soft, curved corridors lead to quiet rooms overlooking the Aegean, styled with raw linen and hand-woven rush chairs.",
    location: "Peloponnese, Greece",
    pricePerNight: 740,
    currency: "€",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    vibe: "Earth & Sea",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    features: ["Terracotta tiled terraces", "Outdoor shower in stone", "Curated antique urns", "Private cove access"]
  }
];

export const MATERIALS_DATA: Material[] = [
  {
    id: "oak",
    name: "Brushed White Oak",
    category: "Wood",
    description: "Sourced from sustainably managed European forests. Stained with organic oils and wire-brushed by hand to emphasize the deep, tactile grain that warms under morning light.",
    vibe: "Warming, grounding, and structural.",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "brass",
    name: "Unlacquered Brass",
    category: "Hardware",
    description: "Left raw and unlacquered to invite the physical imprint of time. Over months of use, it shifts from golden brilliance to a deep, dark brown-bronze patina, telling the story of touch.",
    vibe: "Living finish, honest, and elegant.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "linen",
    name: "Belgian Looped Linen",
    category: "Textiles",
    description: "Woven on traditional looms in Flanders. Retains the natural irregular slubs of the flax plant, creating an exquisite drape that diffuses harsh afternoon sun into a soft, hazy glow.",
    vibe: "Breathable, comforting, and organic.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "forest-plaster",
    name: "Lapis Lime Plaster",
    category: "Finishes",
    description: "Hand-applied lime and marble dust tinted with earth pigments to an organic deep forest shade. Captures shifting shadows with a velvety, stone-like texture that regulates humidity naturally.",
    vibe: "Rich, velvety, and depth-giving.",
    image: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "sandstone",
    name: "Honed Gault Stone",
    category: "Masonry",
    description: "Sawn from local coastal quarries and finished with a fine matte hone. Rich with microscopic fossil shells, cool to the bare sole in summer and warm with underfloor heating in winter.",
    vibe: "Ancestral, massive, and soothing.",
    image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=600&q=80"
  }
];

export const JOURNAL_DATA: JournalPost[] = [
  {
    id: "post-1",
    title: "The Architecture of Silence",
    category: "Philosophy",
    excerpt: "How we utilize void, deep shadows, and slow materials to create spaces that actively quiet the overstimulated nervous system.",
    date: "June 12, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: "post-2",
    title: "Honest Detailing: Living Finishes",
    category: "Curation",
    excerpt: "An exploration into why we banish protective lacquers, opting for materials like copper, brass, and stone that register the beautiful patina of life.",
    date: "May 28, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: "post-3",
    title: "Refining the Morning Ritual",
    category: "The Collection",
    excerpt: "Designing bathrooms around the quiet light of dawn. The tactile choreography of slate, warm water, and hand-loomed towels.",
    date: "April 15, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=85"
  }
];
