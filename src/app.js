// walterbeinsteinproperty - Quiet Luxury US Real Estate Client Engine

// --- Properties & Catalog Schema ---
const PROPERTIES_DATA = [
  {
    id: "aspen-ridge-lodge",
    title: "The Aspen Ridge Lodge",
    tagline: "High alpine sanctuary clad in hand-hewn cedar and raw granite.",
    description: "Perched majestically in Aspen, Colorado, this exclusive lodge is a celebration of vertical space and geological form. It features sweeping double-height glass framing snow-capped peaks, a natural stone wood-burning hearth, and a curated wellness deck with an open-air cedar tub.",
    location: "Aspen, Colorado",
    state: "Colorado",
    price: 4850000,
    priceStr: "$4,850,000",
    status: "For Sale",
    type: "Lodge",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=85",
    beds: 5,
    baths: 6,
    sqft: 6200,
    vibe: "Alpine Sanctuary"
  },
  {
    id: "palm-springs-oasis",
    title: "The Palm Springs Oasis",
    tagline: "Tactile mid-century masonry blending into desert horizons.",
    description: "An architectural masterpiece nestled in Palm Springs, California. Structured with iconic breeze block partitions and raw board-marked concrete, this single-level retreat prioritizes seamless indoor-outdoor flows around a central saltwater pool and native cactus garden.",
    location: "Palm Springs, California",
    state: "California",
    price: 2450000,
    priceStr: "$2,450,000",
    status: "Sold",
    type: "Villa",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
    beds: 4,
    baths: 4.5,
    sqft: 4100,
    vibe: "Mid-Century Modern"
  },
  {
    id: "pacific-heights-villa",
    title: "Pacific Heights Villa",
    tagline: "Elegant Edwardian framework featuring slaked lime finishes.",
    description: "An exceptionally quiet residence in San Francisco, California. The home combines timeless bay windows with modern interior weightlessness. Finished with high-purity slaked lime plaster, hand-oiled white oak flooring, and custom cast-bronze hardware that matures with age.",
    location: "San Francisco, California",
    state: "California",
    price: 12000,
    priceStr: "$12,000 / mo",
    status: "For Rent",
    type: "Villa",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    beds: 3,
    baths: 3.5,
    sqft: 3400,
    vibe: "San Francisco Classic"
  },
  {
    id: "chelsea-penthouse",
    title: "The Chelsea Penthouse",
    tagline: "Industrial steel and polished concrete high above Manhattan.",
    description: "Perched above Chelsea in New York City, this exceptional penthouse features solid board-marked concrete columns, exposed industrial steel framing, and a private terraced wrap-around garden. Double glazing shields the interior from the urban drone to preserve perfect acoustic silence.",
    location: "New York, New York",
    state: "New York",
    price: 18500,
    priceStr: "$18,500 / mo",
    status: "For Rent",
    type: "Penthouse",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=85",
    beds: 3,
    baths: 3,
    sqft: 2800,
    vibe: "Manhattan Industrial"
  },
  {
    id: "biscayne-bay-estate",
    title: "Biscayne Bay Estate",
    tagline: "Monolithic lime-washed sculpture tracing the quiet Atlantic waves.",
    description: "A breathtaking coastal estate in Miami, Florida. Positioned with direct deep-water access, this monolithic structure utilizes local shell-rich limestone and custom glass expanses that frame shifting maritime shadows. Includes private courtyard patios and an elevated infinity lap pool.",
    location: "Miami, Florida",
    state: "Florida",
    price: 8900000,
    priceStr: "$8,900,000",
    status: "Featured",
    type: "Estate",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85",
    beds: 6,
    baths: 7,
    sqft: 8500,
    vibe: "Coastal Monolith"
  },
  {
    id: "austin-glass-pavilion",
    title: "The Austin Glass Pavilion",
    tagline: "Bespoke structural glazing merging into rolling oak forests.",
    description: "Overlooking the tranquil hills of Austin, Texas, this modernist pavilion rests lightly on the topography. Hand-stacked fieldstone walls anchor a minimalist steel roof, creating a sheltered glass volume where light and nature serve as the primary decoration.",
    location: "Austin, Texas",
    state: "Texas",
    price: 3150000,
    priceStr: "$3,150,000",
    status: "For Sale",
    type: "Villa",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    beds: 4,
    baths: 4,
    sqft: 4800,
    vibe: "Modernist Forest"
  }
];

// --- Top Locations Directory ---
const LOCATIONS_DATA = [
  { name: "Colorado", count: 2, image: "https://images.unsplash.com/photo-1484186139897-d5fc6b908812?auto=format&fit=crop&w=500&q=80" },
  { name: "California", count: 3, image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=500&q=80" },
  { name: "New York", count: 4, image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=500&q=80" },
  { name: "Florida", count: 3, image: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=500&q=80" },
  { name: "Texas", count: 2, image: "https://images.unsplash.com/photo-1531088009183-509a207cbdfb?auto=format&fit=crop&w=500&q=80" }
];

// --- State Variables ---
let activeSearchTab = "All"; // All / For Sale / For Rent
let selectedSearchLocation = "All";
let selectedSearchType = "All";
let selectedGridFilter = "All";

// --- Initialize Event Handlers & Layouts on DOM Load ---
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initHeroSearch();
  initCounters();
  renderListingGrid();
  renderLocationTiles();
  initStagingSlider();
  initApplicationForm();
  initContactForm();
  initRevealOnScroll();
});

// 1. Sticky Navigation & Smooth Scroll Setup
function initNavbar() {
  const header = document.querySelector("header");
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenuClose = document.getElementById("mobile-menu-close");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  // Border and background visibility shifts on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("bg-cream/95", "backdrop-blur-md", "py-3", "border-b", "border-sand/60", "shadow-sm");
      header.classList.remove("bg-transparent", "py-5");
    } else {
      header.classList.remove("bg-cream/95", "backdrop-blur-md", "py-3", "border-b", "border-sand/60", "shadow-sm");
      header.classList.add("bg-transparent", "py-5");
    }
  });

  // Smooth scroll delegation
  document.querySelectorAll("[data-scroll-to]").forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = button.getAttribute("data-scroll-to");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
        // Close mobile drawer if open
        if (mobileDrawer) {
          mobileDrawer.classList.add("hidden");
        }
      }
    });
  });

  // Mobile Menu Controls
  if (mobileMenuToggle && mobileDrawer) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileDrawer.classList.remove("hidden");
    });
  }
  if (mobileMenuClose && mobileDrawer) {
    mobileMenuClose.addEventListener("click", () => {
      mobileDrawer.classList.add("hidden");
    });
  }
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (mobileDrawer) mobileDrawer.classList.add("hidden");
    });
  });
}

// 2. Hero Property Search Logic
function initHeroSearch() {
  const tabs = document.querySelectorAll(".search-tab-btn");
  const locationSelect = document.getElementById("hero-search-location");
  const typeSelect = document.getElementById("hero-search-type");
  const searchBtn = document.getElementById("hero-search-submit");

  // Handle Search Tab Clicks
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => {
        t.classList.remove("bg-forest", "text-cream");
        t.classList.add("bg-cream/50", "text-charcoal/70");
      });
      tab.classList.add("bg-forest", "text-cream");
      tab.classList.remove("bg-cream/50", "text-charcoal/70");
      activeSearchTab = tab.getAttribute("data-tab");
    });
  });

  // Execute Search Filter Trigger
  if (searchBtn) {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      selectedSearchLocation = locationSelect ? locationSelect.value : "All";
      selectedSearchType = typeSelect ? typeSelect.value : "All";
      
      // Update Grid filters to match search query
      selectedGridFilter = activeSearchTab; // "All", "For Sale", "For Rent"
      
      // Select corresponding grid filter button visually
      document.querySelectorAll(".grid-filter-btn").forEach(btn => {
        if (btn.getAttribute("data-status") === selectedGridFilter) {
          btn.classList.add("bg-forest", "text-cream");
          btn.classList.remove("bg-cream/40", "text-charcoal/70");
        } else {
          btn.classList.remove("bg-forest", "text-cream");
          btn.classList.add("bg-cream/40", "text-charcoal/70");
        }
      });

      renderListingGrid(true); // Render with filters applied
      
      // Smooth scroll to Exclusive Listings catalog
      const catalogSection = document.getElementById("collection");
      if (catalogSection) {
        catalogSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

// 3. Incrementing Animated Stats Counters
function initCounters() {
  const counters = document.querySelectorAll(".stat-counter-value");
  
  const rollUpCounters = () => {
    counters.forEach(counter => {
      const isAnimated = counter.getAttribute("data-animated") === "true";
      if (isAnimated) return;

      const target = parseFloat(counter.getAttribute("data-target"));
      const isCurrency = counter.getAttribute("data-type") === "currency";
      const isPlain = counter.getAttribute("data-type") === "plain";
      
      let count = 0;
      const speed = 40; // lower is faster
      const increment = target / speed;

      const updateCount = () => {
        count += increment;
        if (count < target) {
          if (isCurrency) {
            counter.textContent = "$" + count.toFixed(1) + "B+";
          } else if (isPlain) {
            counter.textContent = Math.floor(count).toLocaleString() + "+";
          } else {
            counter.textContent = Math.floor(count) + "+";
          }
          setTimeout(updateCount, 25);
        } else {
          if (isCurrency) {
            counter.textContent = "$" + target.toFixed(1) + "B+";
          } else if (isPlain) {
            counter.textContent = target.toLocaleString() + "+";
          } else {
            counter.textContent = target + "+";
          }
          counter.setAttribute("data-animated", "true");
        }
      };
      updateCount();
    });
  };

  // Trigger when visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        rollUpCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const statsSection = document.getElementById("stats-trigger-box");
  if (statsSection) {
    observer.observe(statsSection);
  } else {
    rollUpCounters(); // Fallback if no specific section
  }
}

// 4. Exclusive Listings Catalog Rendering
function renderListingGrid(applyHeroSearchFilters = false) {
  const gridContainer = document.getElementById("exclusive-listings-grid");
  if (!gridContainer) return;

  // Render Grid Filtering Buttons behavior if not already initialized
  const filterButtons = document.querySelectorAll(".grid-filter-btn");
  filterButtons.forEach(btn => {
    // Prevent duplicated event attachment
    if (!btn.getAttribute("data-bound")) {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => {
          b.classList.remove("bg-forest", "text-cream");
          b.classList.add("bg-cream/40", "text-charcoal/70");
        });
        btn.classList.add("bg-forest", "text-cream");
        btn.classList.remove("bg-cream/40", "text-charcoal/70");
        
        selectedGridFilter = btn.getAttribute("data-status");
        renderListingGrid(false); // Render using the standard filters
      });
      btn.setAttribute("data-bound", "true");
    }
  });

  // Filter Algorithm
  const filtered = PROPERTIES_DATA.filter(p => {
    // 1. Grid filter button logic (All, For Sale, For Rent, Sold, Featured)
    let matchesStatus = true;
    if (selectedGridFilter !== "All") {
      if (selectedGridFilter === "For Sale") {
        matchesStatus = p.status === "For Sale" || p.status === "Featured";
      } else if (selectedGridFilter === "For Rent") {
        matchesStatus = p.status === "For Rent";
      } else {
        matchesStatus = p.status === selectedGridFilter;
      }
    }

    // 2. Hero Search overlay parameters if requested
    if (applyHeroSearchFilters) {
      const matchesSearchTab = activeSearchTab === "All" || 
        (activeSearchTab === "For Sale" && (p.status === "For Sale" || p.status === "Featured")) ||
        (activeSearchTab === "For Rent" && p.status === "For Rent");
      
      const matchesLocation = selectedSearchLocation === "All" || p.state === selectedSearchLocation;
      const matchesType = selectedSearchType === "All" || p.type === selectedSearchType;

      return matchesSearchTab && matchesLocation && matchesType;
    }

    return matchesStatus;
  });

  // Render Cards
  if (filtered.length === 0) {
    gridContainer.innerHTML = `
      <div class="col-span-full text-center py-20 bg-sand/10 border border-dashed border-sand/60 rounded-xl p-8 max-w-lg mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="mx-auto text-sage mb-4"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        <h3 class="font-serif text-2xl text-charcoal mb-2">No Matching Listings Found</h3>
        <p class="font-sans text-xs text-charcoal/60 leading-relaxed mb-6">
          Consider loosening your filters or resetting properties to explore our complete United States luxury collection.
        </p>
        <button id="reset-listings-btn" class="bg-forest text-cream font-sans text-xs tracking-widest uppercase px-6 py-3 rounded-xl cursor-pointer">
          Show All Listings
        </button>
      </div>
    `;

    const resetBtn = document.getElementById("reset-listings-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        selectedGridFilter = "All";
        activeSearchTab = "All";
        selectedSearchLocation = "All";
        selectedSearchType = "All";

        // Reset visual filters
        filterButtons.forEach(b => {
          if (b.getAttribute("data-status") === "All") {
            b.classList.add("bg-forest", "text-cream");
            b.classList.remove("bg-cream/40", "text-charcoal/70");
          } else {
            b.classList.remove("bg-forest", "text-cream");
            b.classList.add("bg-cream/40", "text-charcoal/70");
          }
        });

        const locationSelect = document.getElementById("hero-search-location");
        const typeSelect = document.getElementById("hero-search-type");
        if (locationSelect) locationSelect.value = "All";
        if (typeSelect) typeSelect.value = "All";

        document.querySelectorAll(".search-tab-btn").forEach(tab => {
          if (tab.getAttribute("data-tab") === "All") {
            tab.classList.add("bg-forest", "text-cream");
            tab.classList.remove("bg-cream/50", "text-charcoal/70");
          } else {
            tab.classList.remove("bg-forest", "text-cream");
            tab.classList.add("bg-cream/50", "text-charcoal/70");
          }
        });

        renderListingGrid(false);
      });
    }
    return;
  }

  gridContainer.innerHTML = filtered.map((p, idx) => {
    // Visual badge styles based on status
    let badgeClass = "bg-forest/90 text-cream";
    if (p.status === "Featured") {
      badgeClass = "bg-sage text-cream";
    } else if (p.status === "Sold") {
      badgeClass = "bg-charcoal/80 text-cream/70";
    }

    return `
      <div class="flex flex-col group rounded-2xl bg-cream border border-sand/40 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-500 fade-in-up active">
        <!-- Photo Container -->
        <div class="relative aspect-[16/11] overflow-hidden bg-sand/30">
          <img
            src="${p.image}"
            alt="${p.title}"
            class="w-full h-full object-cover transition-transform duration-[4s] ease-out group-hover:scale-[1.04]"
            referrerpolicy="no-referrer"
          />
          <div class="absolute top-4 left-4 ${badgeClass} backdrop-blur-sm px-3.5 py-1.5 rounded-[4px] border border-white/10 shadow-xs">
            <span class="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-xs">
              ${p.status}
            </span>
          </div>
          <div class="absolute bottom-4 left-4 bg-cream/95 backdrop-blur-sm px-3.5 py-1.5 rounded-[4px] shadow-sm">
            <span class="font-sans text-[10px] tracking-wider text-charcoal uppercase font-bold">
              ${p.priceStr}
            </span>
          </div>
        </div>

        <!-- Meta Content -->
        <div class="p-6 md:p-8 flex-grow flex flex-col justify-between space-y-4 text-left">
          <div class="space-y-2">
            <div class="flex items-center space-x-1.5 text-sage text-[10px] tracking-[0.2em] uppercase font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>${p.location}</span>
            </div>
            
            <h3 class="font-serif text-2xl md:text-3xl text-charcoal leading-tight group-hover:text-forest transition-colors duration-300">
              ${p.title}
            </h3>
            
            <p class="font-sans font-light text-xs text-charcoal/70 leading-relaxed line-clamp-2">
              ${p.tagline}
            </p>
          </div>

          <!-- Spec Badges & CTA -->
          <div class="pt-4 border-t border-sand/50 flex items-center justify-between">
            <div class="flex items-center space-x-3.5 text-charcoal/50 font-mono text-[10px]">
              <span class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mr-1"><path d="M2 4v16M2 8h20M2 12h20M22 4v16"/></svg> ${p.beds} Beds</span>
              <span>&bull;</span>
              <span class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mr-1"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM2 14h12"/></svg> ${p.baths} Baths</span>
              <span>&bull;</span>
              <span>${p.sqft.toLocaleString()} Sqft</span>
            </div>
            
            <button
              data-id="${p.id}"
              class="view-listing-detail-btn flex items-center space-x-1.5 font-sans text-[10px] tracking-[0.18em] uppercase text-forest font-bold cursor-pointer hover:underline"
            >
              <span>Detail</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  // Bind Detail Modal trigger buttons
  document.querySelectorAll(".view-listing-detail-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const pid = btn.getAttribute("data-id");
      const match = PROPERTIES_DATA.find(p => p.id === pid);
      if (match) {
        showPropertyDetailModal(match);
      }
    });
  });
}

// 5. Render Clickable Location Tiles Row
function renderLocationTiles() {
  const container = document.getElementById("location-tiles-row");
  if (!container) return;

  container.innerHTML = LOCATIONS_DATA.map(loc => `
    <button
      data-state="${loc.name}"
      class="location-tile-card relative flex-shrink-0 w-64 aspect-[4/5] rounded-2xl overflow-hidden group shadow-xs focus:outline-none focus:ring-2 focus:ring-forest cursor-pointer"
    >
      <img
        src="${loc.image}"
        alt="${loc.name}"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
        referrerpolicy="no-referrer"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent pointer-events-none"></div>
      
      <!-- Label Details -->
      <div class="absolute bottom-6 left-6 right-6 text-left space-y-1 z-10">
        <h4 class="font-serif text-2xl text-cream font-medium tracking-tight">${loc.name}</h4>
        <span class="block font-sans text-[9px] uppercase tracking-[0.2em] text-cream/70">
          ${loc.count} Active listings
        </span>
      </div>
    </button>
  `).join("");

  // Bind click trigger to filter listings by location state
  document.querySelectorAll(".location-tile-card").forEach(tile => {
    tile.addEventListener("click", () => {
      const state = tile.getAttribute("data-state");
      
      // Update Hero Location select dropdown visually
      const heroLocationSelect = document.getElementById("hero-search-location");
      if (heroLocationSelect) {
        heroLocationSelect.value = state;
      }
      
      selectedSearchLocation = state;
      selectedGridFilter = "All"; // Reset tab filters on direct location click

      // Set grid filter button visually back to "All"
      document.querySelectorAll(".grid-filter-btn").forEach(btn => {
        if (btn.getAttribute("data-status") === "All") {
          btn.classList.add("bg-forest", "text-cream");
          btn.classList.remove("bg-cream/40", "text-charcoal/70");
        } else {
          btn.classList.remove("bg-forest", "text-cream");
          btn.classList.add("bg-cream/40", "text-charcoal/70");
        }
      });

      renderListingGrid(true); // Render with hero search logic enabled

      // Scroll to Exclusive Listings catalog
      const catalogSection = document.getElementById("collection");
      if (catalogSection) {
        catalogSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// 6. Detailed Property Modal Dialog Box
function showPropertyDetailModal(p) {
  const modal = document.getElementById("property-detail-modal");
  const modalContent = document.getElementById("property-modal-content");
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="space-y-8">
      <!-- Feature Photo -->
      <div class="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-sand/30">
        <img
          src="${p.image}"
          alt="${p.title}"
          class="w-full h-full object-cover"
          referrerpolicy="no-referrer"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent pointer-events-none" />
      </div>

      <!-- Detail Info Header -->
      <div class="space-y-3">
        <div class="flex items-center space-x-1.5 text-sage text-xs tracking-widest uppercase font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-sage"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>${p.location}</span>
          <span class="text-sand/60">&bull;</span>
          <span class="text-forest font-medium uppercase font-mono text-[10px] tracking-wider">${p.status}</span>
        </div>
        
        <h3 class="font-serif text-3xl md:text-5xl text-charcoal">
          ${p.title}
        </h3>
        
        <p class="font-serif text-lg text-forest italic font-light">
          &ldquo;${p.tagline}&rdquo;
        </p>
      </div>

      <!-- Features Specifications -->
      <div class="grid grid-cols-3 gap-4 py-4 border-y border-sand/40">
        <div class="text-center">
          <span class="block font-sans text-[10px] tracking-wider text-charcoal/40 uppercase">Bedrooms</span>
          <span class="font-serif text-xl md:text-2xl text-charcoal font-medium">${p.beds}</span>
        </div>
        <div class="text-center border-x border-sand/30">
          <span class="block font-sans text-[10px] tracking-wider text-charcoal/40 uppercase">Bathrooms</span>
          <span class="font-serif text-xl md:text-2xl text-charcoal font-medium">${p.baths}</span>
        </div>
        <div class="text-center">
          <span class="block font-sans text-[10px] tracking-wider text-charcoal/40 uppercase">Property Area</span>
          <span class="font-serif text-xl md:text-2xl text-charcoal font-medium">${p.sqft.toLocaleString()} Sqft</span>
        </div>
      </div>

      <!-- Narratives block -->
      <div class="space-y-4">
        <span class="font-sans text-[10px] tracking-[0.2em] uppercase text-charcoal/50 font-semibold block">
          The Volume &amp; Space
        </span>
        <p class="font-sans font-light text-sm md:text-base text-charcoal/80 leading-relaxed">
          ${p.description}
        </p>
      </div>

      <div class="space-y-4">
        <span class="font-sans text-[10px] tracking-[0.2em] uppercase text-charcoal/50 font-semibold block">
          Specialized Client Benefits
        </span>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <li class="flex items-center space-x-2 text-xs md:text-sm text-charcoal/80 font-sans font-light">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-sage"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            <span>Verified clean title deed &amp; safety standards</span>
          </li>
          <li class="flex items-center space-x-2 text-xs md:text-sm text-charcoal/80 font-sans font-light">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-sage"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            <span>Strategic high-privacy neighborhood locale</span>
          </li>
          <li class="flex items-center space-x-2 text-xs md:text-sm text-charcoal/80 font-sans font-light">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-sage"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            <span>Full-service staging, cleaning and concierge alignment</span>
          </li>
          <li class="flex items-center space-x-2 text-xs md:text-sm text-charcoal/80 font-sans font-light">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-sage"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            <span>Flexible buying or long-term leasing options available</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Booking CTA Footer -->
    <div class="mt-12 pt-6 border-t border-sand/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
      <div>
        <span class="block font-sans text-[10px] tracking-wider text-charcoal/40 uppercase">Listing Value</span>
        <span class="font-serif text-2xl md:text-3xl text-charcoal font-semibold">
          ${p.priceStr}
        </span>
      </div>

      <button
        id="modal-apply-cta-btn"
        class="bg-forest text-cream font-sans text-xs tracking-widest uppercase px-8 py-4 rounded-xl cursor-pointer text-center font-bold shadow-lg hover:scale-[1.02] hover:bg-forest/90 transition-all"
      >
        Apply For This Property
      </button>
    </div>
  `;

  // Show Modal
  modal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");

  // Dismiss Modal Handlers
  const closeModal = () => {
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  };

  const closeBtn = document.getElementById("close-property-modal");
  if (closeBtn) closeBtn.onclick = closeModal;

  // Bind booking redirect action to anchor form with pre-filled parameter
  const applyCta = document.getElementById("modal-apply-cta-btn");
  if (applyCta) {
    applyCta.onclick = () => {
      closeModal();
      
      // Focus application form and highlight property select
      const formIntentSelect = document.getElementById("property-intent-dropdown");
      const bedsInput = document.getElementById("app-beds");
      const bathsInput = document.getElementById("app-baths");
      const commentsTextarea = document.getElementById("app-reason");

      if (bedsInput) bedsInput.value = p.beds;
      if (bathsInput) bathsInput.value = p.baths;
      
      // Set buy or rent intent toggle dynamically based on status
      const rentTab = document.getElementById("intent-rent-tab");
      const buyTab = document.getElementById("intent-buy-tab");
      const intentInput = document.getElementById("app-intent-type");

      if (p.status === "For Rent") {
        if (rentTab) rentTab.click();
      } else {
        if (buyTab) buyTab.click();
      }

      if (commentsTextarea) {
        commentsTextarea.value = `Applying specifically for "${p.title}" located in ${p.location}.`;
      }

      // Scroll smoothly to application segment
      const targetElement = document.getElementById("apply");
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    };
  }
}

// 7. Staging Before/After Slider Interaction Block
function initStagingSlider() {
  const wrapper = document.getElementById("staging-slider-wrapper");
  const range = document.getElementById("before-after-range");
  const clip = document.getElementById("after-image-clip");
  const bar = document.getElementById("before-after-bar");
  const afterImg = document.getElementById("after-img-element");

  if (!wrapper || !range || !clip || !bar || !afterImg) return;

  const updateDimensions = () => {
    const wrapperWidth = wrapper.clientWidth;
    afterImg.style.width = `${wrapperWidth}px`;
  };

  const handleSliderUpdate = () => {
    const value = range.value;
    clip.style.width = `${value}%`;
    bar.style.left = `${value}%`;
  };

  // Bind listeners
  range.addEventListener("input", handleSliderUpdate);
  window.addEventListener("resize", () => {
    updateDimensions();
    handleSliderUpdate();
  });

  // Initial update call
  setTimeout(() => {
    updateDimensions();
    handleSliderUpdate();
  }, 200);
}

// 8. Application Form Section logic (Toggle Tabs & Client-Side Verification)
function initApplicationForm() {
  const rentTab = document.getElementById("intent-rent-tab");
  const buyTab = document.getElementById("intent-buy-tab");
  const intentInput = document.getElementById("app-intent-type"); // Hidden input tracking intent type
  const appForm = document.getElementById("luxury-app-form");

  const leaseSection = document.getElementById("field-lease-duration");
  const incomeLabel = document.getElementById("field-income-label");

  // Toggle Tab Actions
  if (rentTab && buyTab && intentInput) {
    rentTab.addEventListener("click", () => {
      // Style updates
      rentTab.classList.add("bg-forest", "text-cream");
      rentTab.classList.remove("bg-sand/40", "text-charcoal/60");
      buyTab.classList.remove("bg-forest", "text-cream");
      buyTab.classList.add("bg-sand/40", "text-charcoal/60");

      intentInput.value = "Rent";
      
      // Pre-fill or change dynamic fields
      if (leaseSection) leaseSection.classList.remove("hidden");
      if (incomeLabel) incomeLabel.textContent = "Estimated Monthly Income (USD)";
    });

    buyTab.addEventListener("click", () => {
      // Style updates
      buyTab.classList.add("bg-forest", "text-cream");
      buyTab.classList.remove("bg-sand/40", "text-charcoal/60");
      rentTab.classList.remove("bg-forest", "text-cream");
      rentTab.classList.add("bg-sand/40", "text-charcoal/60");

      intentInput.value = "Buy";

      // Pre-fill or hide dynamic fields
      if (leaseSection) leaseSection.classList.add("hidden");
      if (incomeLabel) incomeLabel.textContent = "Estimated Liquid Funds / Budget (USD)";
    });
  }

  // Payment Method Selection Grid Highlight Action
  const paymentTiles = document.querySelectorAll(".payment-method-tile");
  const paymentSelectedInput = document.getElementById("app-payment-method-input");

  paymentTiles.forEach(tile => {
    tile.addEventListener("click", () => {
      paymentTiles.forEach(t => {
        t.classList.remove("border-forest", "bg-sand/30");
        t.classList.add("border-sand/60", "bg-cream/40");
        // Hide small checked checkmark if present inside tiles
        const chk = t.querySelector(".tile-checkmark");
        if (chk) chk.classList.add("hidden");
      });

      tile.classList.add("border-forest", "bg-sand/30");
      tile.classList.remove("border-sand/60", "bg-cream/40");
      const chk = tile.querySelector(".tile-checkmark");
      if (chk) chk.classList.remove("hidden");

      if (paymentSelectedInput) {
        paymentSelectedInput.value = tile.getAttribute("data-method");
      }
    });
  });

  // Handle Form Submission
  if (appForm) {
    appForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Basic field checks
      const firstName = document.getElementById("app-first-name").value;
      const lastName = document.getElementById("app-last-name").value;
      const email = document.getElementById("app-email").value;
      const phone = document.getElementById("app-phone").value;
      
      // Select single checkbox for credit score
      const checkedCredit = document.querySelector('input[name="credit_score"]:checked');
      if (!checkedCredit) {
        alert("Please select your current Credit Score Range.");
        return;
      }

      const intent = intentInput ? intentInput.value : "Rent";
      const paymentMethod = paymentSelectedInput ? paymentSelectedInput.value : "";
      if (!paymentMethod) {
        alert("Please select a preferred payment method to handle the application verification fee.");
        return;
      }

      const submitBtn = document.getElementById("app-submit-btn");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin text-cream/80 h-4 w-4 mr-2 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          <span>Reviewing Dossier...</span>
        `;
      }

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `${firstName} ${lastName}`,
            email: email,
            phone: phone,
            reason: `Tenant Application (${intent})`,
            message: `Credit Score Range: ${checkedCredit.value}. Preferred Verification Fee Payment Method: ${paymentMethod}.`,
          }),
        });

        if (!response.ok) {
          throw new Error("SMTP server communication failure");
        }

        // Trigger verification modal
        const modal = document.getElementById("submission-confirmation-modal");
        const clientEmailPlaceholder = document.getElementById("confirm-client-email");
        
        if (clientEmailPlaceholder) {
          clientEmailPlaceholder.textContent = email;
        }

        if (modal) {
          modal.classList.remove("hidden");
          document.body.classList.add("overflow-hidden");
        }
      } catch (error) {
        console.error("Application transmission failed:", error);
        alert("There was an issue transmitting your tenant application dossier. Please try again.");
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = "<span>Submit Application</span>";
        }
      }
    });
  }

  // Handle Close confirmation modal event (DO NOT RESET form entries, as requested!)
  const closeConfirmBtn = document.getElementById("close-confirm-modal-btn");
  if (closeConfirmBtn) {
    closeConfirmBtn.addEventListener("click", () => {
      const modal = document.getElementById("submission-confirmation-modal");
      if (modal) {
        modal.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
      }
    });
  }
}

// 9. Simple Contact Form Submission Feedback
function initContactForm() {
  const form = document.getElementById("direct-contact-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn ? submitBtn.innerHTML : "Send Message";

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = "Transmission Sent...";
    }

    try {
      const name = document.getElementById("contact-name").value;
      const email = document.getElementById("contact-email").value;
      const phone = document.getElementById("contact-phone").value;
      const reason = document.getElementById("contact-reason")?.value || "General Representation Advisory";
      const message = document.getElementById("contact-msg")?.value || "";

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, reason, message }),
      });

      if (!response.ok) {
        throw new Error("SMTP server communication failure");
      }

      alert("Thank you. Your inquiry has been routed straight to our executive desk. A senior representative will contact you shortly.");
      form.reset();
    } catch (error) {
      console.error("Contact submission failed:", error);
      alert("There was an issue transmitting your secret message. Please try again.");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    }
  });
}

// 10. Scroll Reveal Animation triggers
function initRevealOnScroll() {
  const reveals = document.querySelectorAll(".fade-in-up, .fade-in");
  
  const revealActive = () => {
    const triggerBottom = window.innerHeight * 0.95;
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < triggerBottom) {
        el.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealActive);
  setTimeout(revealActive, 400); // Initial check
}
