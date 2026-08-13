import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// Upgraded mock data with descriptions for the new split layout
const projectData = [
  { 
    id: 1, 
    title: "Aravalli Horizon", 
    category: "Architecture", 
    location: "Jaipur, Rajasthan", 
    image: "/p-1.avif",
    description: "A stunning architectural marvel nestled in the Aravalli hills, seamlessly blending minimalist concrete structures with the raw natural landscape."
  },
  { 
    id: 2, 
    title: "The Azure Penthouse", 
    category: "Interior Design", 
    location: "Worli, Mumbai", 
    image: "/p-2.avif",
    description: "An expansive sea-facing residence featuring panoramic ocean views, automated climate environments, and bespoke Italian furnishings."
  },
  { 
    id: 3, 
    title: "Desert Oasis Villa", 
    category: "Real Estate", 
    location: "Jodhpur, Rajasthan", 
    image: "/p-3.avif",
    description: "A luxurious re-imagining of traditional Rajasthani courtyard homes, updated with modern amenities, solar integration, and private infinity pools."
  },
  { 
    id: 4, 
    title: "The Glass Pavilion", 
    category: "Architecture", 
    location: "New Delhi", 
    image: "/p-4.avif",
    description: "A bold commercial space designed with floor-to-ceiling smart glass, maximizing natural light while providing total thermal insulation."
  },
  { 
    id: 5, 
    title: "Heritage Estate", 
    category: "Real Estate", 
    location: "Udaipur, Rajasthan", 
    image: "/ass5.jpg",
    description: "Meticulous restoration of a 19th-century noble estate. We preserved the historic frescoes while completely modernizing the underlying infrastructure."
  },
  { 
    id: 6, 
    title: "Minimalist Loft", 
    category: "Interior Design", 
    location: "Bandra West, Mumbai", 
    image: "/p-6.avif",
    description: "Stripping a high-rise apartment down to its structural columns to create an open-plan, gallery-like living space for a contemporary art collector."
  }
];

const categories = ["All", "Architecture", "Interior Design", "Real Estate"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const containerRef = useRef(null);

  const filteredProjects = activeCategory === "All" 
    ? projectData 
    : projectData.filter(project => project.category === activeCategory);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // Reset animations when filtering
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // 1. Filter Buttons Entrance
    gsap.to(".filter-btn", {
      opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.3 
    });

    // Animate the header text elements one by one
    gsap.from(".header-text-anim", {
     opacity: 0,
      x: -40,          // Starts 40px to the left
     duration: 0.9,
     stagger: 0.5,    // 0.1s delay between each element
     ease: "power3.out",
     delay: 0.4
   });

    // --------------------------------------------------
    // DESKTOP & TABLET ANIMATIONS
    // --------------------------------------------------
    mm.add("(min-width: 768px)", () => {
      
      // Header fades out and slides up on scroll
      gsap.to(".shrink-header", {
        opacity: 0, y: -100, ease: "none",
        scrollTrigger: {
          trigger: ".shrink-header",
          start: "top top", end: "bottom top", scrub: true
        }
      });

      // The background container expands slightly to frame the projects
      gsap.fromTo(".expand-container",
        { opacity: 0, y: 100, borderRadius: "40px" },
        {
          opacity: 1, y: 0, borderRadius: "0px", ease: "none",
          scrollTrigger: { trigger: ".expand-container", start: "top 95%", end: "top 15%", scrub: 1 }
        }
      );

      // SHRINK / EXPAND ON INDIVIDUAL PROJECT ROWS
      const rows = gsap.utils.toArray('.project-row');
      
      rows.forEach((row) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 90%",    // Starts entering screen
            end: "bottom 10%",   // Finishes leaving screen
            scrub: 1,            // Smooth tie to scrollbar
          }
        });

        // Phase 1: Starts shrunk and transparent, scales UP to full size
        tl.fromTo(row, 
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: "none", force3D: true }
        )
        // Phase 2: Holds full size while in the middle of the screen
        .to(row, 
          { scale: 1, opacity: 1, duration: 1, ease: "none" }
        )
        // Phase 3: Scales back DOWN as it scrolls up and away
        .to(row, 
          { scale: 0.85, opacity: 0, duration: 1, ease: "none", force3D: true }
        );
      });
    });

    // --------------------------------------------------
    // MOBILE ANIMATIONS
    // --------------------------------------------------
    mm.add("(max-width: 767px)", () => {
      const rows = gsap.utils.toArray('.project-row');
      rows.forEach((row) => {
        gsap.fromTo(row, 
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1, ease: "power2.out", force3D: true,
            scrollTrigger: { trigger: row, start: "top 90%", end: "top 40%", scrub: 1 }
          }
        );
      });
    });

    return () => mm.revert();
  }, { scope: containerRef, dependencies: [activeCategory] }); 

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-stone-50 text-neutral-900 pt-32 pb-40 overflow-hidden">
      
      {/* 1. HEADER */}
      <div className="shrink-header max-w-[1600px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24 will-change-transform">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12 border-b border-neutral-300 pb-12">
          <div className="max-w-2xl">
          <span className="header-text-anim text-xs font-bold tracking-widest uppercase mb-6     text-neutral-800 block">
            Portfolio
          </span>
            <h1 className="header-text-anim text-6xl sm:text-7xl md:text-[90px] font-bold tracking-tighter leading-[0.9] mb-8 text-black">
              Selected <br /> <span className="text-neutral-700">Works.</span>
             </h1>
           <p className="header-text-anim text-lg sm:text-xl text-neutral-800 font-normal max-w-lg">
             Explore our latest architectural designs, curated interior spaces, and exclusive real estate listings.
           </p>
    </div>

          <div className="flex flex-wrap lg:justify-end gap-3 sm:gap-4 w-full lg:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`filter-btn opacity-0 translate-x-8 text-sm sm:text-base font-semibold tracking-wide transition-all duration-300 px-5 py-2.5 rounded-full border hover:scale-105 active:scale-95 ${
                  activeCategory === category 
                    ? "bg-black text-white border-black shadow-lg" 
                    : "bg-transparent text-neutral-700 border-neutral-400 hover:border-black hover:text-black hover:shadow-md"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. ZIGZAG PROJECT LIST */}
      <div className="expand-container bg-white w-full py-24 will-change-transform">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col gap-32 lg:gap-48">
          
          {filteredProjects.map((project, index) => {
            // Determine if it is an odd or even row to create the Zigzag effect
            const isEven = index % 2 === 0;

            return (
              <div 
                key={project.id}
                className="project-row flex flex-col lg:flex-row items-center gap-12 lg:gap-24 w-full will-change-transform origin-center"
              >
                
                {/* IMAGE SIDE (Left on Even, Right on Odd) */}
                <Link 
                  to={`/projects/${project.id}`} 
                  className={`group block w-full lg:w-1/2 relative overflow-hidden rounded-2xl aspect-4/3 sm:aspect-16/10 bg-neutral-200 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  
                  {/* Hover Button */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-100 scale-90">
                    <span className="bg-white text-black text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full shadow-2xl">
                      View Project
                    </span>
                  </div>
                </Link>

                {/* TEXT SIDE (Right on Even, Left on Odd) */}
                <div className={`w-full lg:w-1/2 flex flex-col items-start ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  
                  <span className="text-xs font-bold tracking-widest text-neutral-500 uppercase mb-4">
                    {project.category}
                  </span>
                  
                  <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-black leading-[1.1] mb-6">
                    {project.title}
                  </h3>
                  
                  <p className="text-lg text-neutral-700 font-light max-w-lg mb-10 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Location & Arrow Container */}
                  <div className="w-full flex justify-between items-end border-t border-neutral-300 pt-6">
                    <span className="text-sm text-neutral-500 font-medium">
                      Location: <span className="text-black ml-1">{project.location}</span>
                    </span>
                    
                    <Link 
                      to={`/projects/${project.id}`}
                      className="text-2xl hover:translate-x-2 transition-transform duration-300 text-black"
                    >
                      →
                    </Link>
                  </div>

                </div>

              </div>
            );
          })}

          {filteredProjects.length === 0 && (
            <div className="w-full py-24 text-center text-neutral-400 font-light text-xl">
              No projects found in this category.
            </div>
          )}

        </div>
      </div>

    </div>
  );
}