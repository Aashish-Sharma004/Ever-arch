import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// Upgraded mock data with Indian contexts, better date formats, categories, and read times
const reports = [
  {
    id: 1,
    date: "Aug 01, 2026",
    category: "Market Update",
    title: "Q3 2026 Jaipur Market Report: The Rise of Heritage Luxury",
    readTime: "5 min read",
    link: "/insights/jaipur-q3-2026"
  },
  {
    id: 2,
    date: "Jul 15, 2026",
    category: "Development",
    title: "How the Coastal Road is Reshaping Worli Real Estate Values",
    readTime: "8 min read",
    link: "/insights/mumbai-coastal-road"
  },
  {
    id: 3,
    date: "Jun 22, 2026",
    category: "Architecture",
    title: "Minimalist Architecture: Blending Function with Aravalli Landscapes",
    readTime: "4 min read",
    link: "/insights/minimalist-architecture"
  }
];

export default function MarketInsights() {
  const containerRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // The core entrance animations
    const runEntranceAnimations = () => {
      // 1. Animate the header text
      gsap.from(".header-element", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // 2. Draw the horizontal lines from left to right
      gsap.from(".line-divider", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      // 3. Slide up the row content
      gsap.from(".row-content", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2, // Wait slightly for the lines to start drawing
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });
    };

    // DESKTOP & TABLET
    mm.add("(min-width: 768px)", () => {
      runEntranceAnimations();
      
      // Vanish Animation on Scroll Up
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 0.98,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 10%",
          end: "bottom 30%",
          scrub: true
        }
      });
    });

    // MOBILE (No vanish animation to prevent clipping tall content)
    mm.add("(max-width: 767px)", () => {
      runEntranceAnimations();
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-stone-50 text-neutral-900 py-24 sm:py-32 origin-top overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24">
          
          {/* Left Side: Header */}
          <div className="lg:w-1/3 flex flex-col items-start">
            <span className="header-element text-xs font-bold tracking-widest uppercase mb-4 text-neutral-500">
              The Journal
            </span>
            <h2 className="header-element text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-tight mb-6">
              Market Insights <br /> & Reports
            </h2>
            <p className="header-element text-neutral-500 font-light max-w-sm mb-8 text-lg">
              In-depth analysis, architectural trends, and exclusive market reports to help you make informed decisions.
            </p>
            <button className="header-element bg-black text-white hover:bg-neutral-800 text-xs sm:text-sm font-semibold tracking-wide px-8 py-4 rounded-full transition-all flex items-center gap-2">
              View All Insights
            </button>
          </div>

          {/* Right Side: Article List */}
          <div className="lg:w-2/3 w-full flex flex-col">
            
            {/* Top Border */}
            <div className="line-divider w-full h-1px bg-neutral-300" />
            
            {reports.map((report) => (
              <Link 
                key={report.id} 
                to={report.link}
                className="group relative flex flex-col sm:flex-row sm:items-center justify-between py-8 sm:py-10 hover:bg-neutral-100/50 transition-colors duration-300 -mx-4 px-4 sm:mx-0 sm:px-4"
              >
                {/* The Animated Bottom Border */}
                <div className="line-divider absolute bottom-0 left-0 w-full h-1px bg-neutral-300 group-hover:bg-black transition-colors duration-300" />
                
                {/* Row Content */}
                <div className="row-content flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 w-full">
                  
                  {/* Fixed Date & Category Container */}
                  <div className="flex flex-row sm:flex-col justify-between sm:justify-start gap-2 sm:gap-1 shrink-0 sm:w-32">
                    <span className="text-sm font-semibold tracking-widest text-neutral-900 uppercase">
                      {report.date}
                    </span>
                    <span className="text-xs font-medium tracking-wider text-neutral-500 uppercase">
                      {report.category}
                    </span>
                  </div>
                  
                  {/* Title & Read Time */}
                  <div className="flex flex-col gap-2 grow">
                    <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-900 group-hover:translate-x-2 transition-transform duration-300 max-w-xl leading-tight">
                      {report.title}
                    </h3>
                    <span className="text-xs font-light text-neutral-400 uppercase tracking-widest">
                      {report.readTime}
                    </span>
                  </div>
                  
                  {/* Read More Arrow (Pushed to the right) */}
                  <div className="hidden sm:flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-neutral-400 group-hover:text-black transition-colors duration-300">
                    <span className="transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 text-xl leading-none">
                      →
                    </span>
                  </div>

                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}