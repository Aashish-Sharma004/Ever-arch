import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// Mock Data for Luxury Listings
// Jaipur-Exclusive Luxury Listings
const listingsData = [
  { 
    id: 1, 
    title: "The Aravalli Estate", 
    location: "C-Scheme, Jaipur", 
    price: "₹25.5 Cr", 
    specs: { beds: 5, baths: 6, sqft: "8,500" },
    image: "/l-1.avif",
    status: "New to Market"
  },
  { 
    id: 2, 
    title: "Civil Lines Penthouse", 
    location: "Civil Lines, Jaipur", 
    price: "₹15.0 Cr", 
    specs: { beds: 4, baths: 5, sqft: "6,200" },
    image: "/l-2.avif",
    status: "Exclusive"
  },
  { 
    id: 3, 
    title: "Mansagar Lakefront Haven", 
    location: "Amer Road, Jaipur", 
    price: "₹18.0 Cr", 
    specs: { beds: 6, baths: 7, sqft: "12,000" },
    image: "/l-3.avif",
    status: ""
  },
  { 
    id: 4, 
    title: "Heritage Villa Revive", 
    location: "Bani Park, Jaipur", 
    price: "₹12.5 Cr", 
    specs: { beds: 4, baths: 4, sqft: "5,800" },
    image: "/l-4.avif",
    status: "Price Drop"
  },
  { 
    id: 5, 
    title: "Modern Palace Bungalow", 
    location: "Vaishali Nagar, Jaipur", 
    price: "₹22.0 Cr", 
    specs: { beds: 7, baths: 8, sqft: "15,500" },
    image: "/l-5.avif",
    status: "Exclusive"
  },
  { 
    id: 6, 
    title: "Minimalist Glass Loft", 
    location: "Malviya Nagar, Jaipur", 
    price: "₹8.5 Cr", 
    specs: { beds: 3, baths: 3, sqft: "3,200" },
    image: "/l-6.avif",
    status: ""
  }
];

// Updated the filter buttons to show Jaipur neighborhoods
const locations = ["All Locations", "C-Scheme", "Civil Lines", "Bani Park", "Vaishali Nagar"];

export default function Buy() {
  const [activeLocation, setActiveLocation] = useState("All Locations");
  const containerRef = useRef(null);

  // Filter listings based on location
  const filteredListings = activeLocation === "All Locations" 
    ? listingsData 
    : listingsData.filter(listing => listing.location.includes(activeLocation));

  useGSAP(() => {
    let mm = gsap.matchMedia();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // 1. Page Header Entrance Animation
    gsap.from(".header-reveal", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.2
    });

    // 2. Filter Bar Entrance
    gsap.from(".filter-bar", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.6
    });

    // 3. Staggered Grid Reveal on Scroll
    mm.add("(min-width: 768px)", () => {
      const cards = gsap.utils.toArray('.listing-card');
      
      //  use a batch trigger so rows animate together cleanly
      ScrollTrigger.batch(cards, {
        start: "top 85%",
        onEnter: (elements) => {
          gsap.fromTo(elements, 
            { opacity: 0, y: 60, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", force3D: true }
          );
        },
        once: true // Only animate in once
      });
    });

    // Mobile Animations
    mm.add("(max-width: 767px)", () => {
      const cards = gsap.utils.toArray('.listing-card');
      cards.forEach((card) => {
        gsap.fromTo(card, 
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power2.out", force3D: true,
            scrollTrigger: { trigger: card, start: "top 90%", once: true }
          }
        );
      });
    });

    return () => mm.revert();
  }, { scope: containerRef, dependencies: [activeLocation] }); 

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-stone-50 text-neutral-900 pt-32 pb-40">
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col mb-16">
          <span className="header-reveal text-xs font-bold tracking-widest uppercase mb-6 text-neutral-500">
            Current Listings
          </span>
          <h1 className="header-reveal text-5xl sm:text-7xl md:text-[80px] font-bold tracking-tighter leading-[0.9] mb-8 text-black">
            Find Your <br /> <span className="text-neutral-400">Next Chapter.</span>
          </h1>
          <p className="header-reveal text-lg sm:text-xl text-neutral-600 font-light max-w-xl">
            Browse our curated collection of India's most exceptional residential properties, heritage estates, and modern penthouses.
          </p>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="filter-bar w-full bg-white border border-neutral-200 rounded-full p-2 sm:p-4 mb-16 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm relative z-10">
          
          <div className="flex overflow-x-auto w-full sm:w-auto gap-2 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-none]">
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => setActiveLocation(loc)}
                className={`shrink-0 text-sm font-semibold tracking-wide transition-all duration-300 px-6 py-3 rounded-full ${
                  activeLocation === loc 
                    ? "bg-black text-white shadow-md" 
                    : "bg-transparent text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-auto px-2 pb-2 sm:pb-0">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-neutral-500 hover:text-black transition-colors px-6 py-3 border border-neutral-200 hover:border-black rounded-full">
              Filters
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
            </button>
          </div>
        </div>

        {/* LISTINGS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {filteredListings.map((listing) => (
            <Link 
              to={`/buy/${listing.id}`} 
              key={listing.id}
              className="listing-card group flex flex-col cursor-pointer opacity-0" // opacity-0 prevents flash before GSAP kicks in
            >
              
              {/* Image Box */}
              <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden mb-6 bg-neutral-200">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                  style={{ backgroundImage: `url(${listing.image})` }}
                />
                
                {/* Optional Status Badge */}
                {listing.status && (
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black">
                      {listing.status}
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>

              {/* Data Layout */}
              <div className="flex flex-col grow">
                
                {/* Price & Title */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold tracking-tight text-black mb-1">
                    {listing.price}
                  </h3>
                  <h4 className="text-lg font-medium text-neutral-800 leading-snug group-hover:text-neutral-500 transition-colors duration-300">
                    {listing.title}
                  </h4>
                  <span className="text-sm text-neutral-500 font-light mt-1 block">
                    {listing.location}
                  </span>
                </div>

                {/* Specs (Beds, Baths, Sqft) - Pushed to bottom */}
                <div className="mt-auto pt-4 border-t border-neutral-200 flex items-center justify-between text-sm">
                  <div className="flex gap-4 sm:gap-6">
                    <span className="flex items-center gap-1.5 font-medium text-neutral-900">
                      {listing.specs.beds} <span className="font-light text-neutral-500">Beds</span>
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-neutral-900">
                      {listing.specs.baths} <span className="font-light text-neutral-500">Baths</span>
                    </span>
                  </div>
                  <span className="font-medium text-neutral-900">
                    {listing.specs.sqft} <span className="font-light text-neutral-500">SqFt</span>
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="w-full py-32 text-center flex flex-col items-center">
            <span className="text-4xl mb-4 text-neutral-300">∅</span>
            <p className="text-neutral-500 font-light text-xl">
              No exclusive properties currently available in this location.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}