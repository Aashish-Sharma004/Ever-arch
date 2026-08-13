import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesGrid() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".service-card", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%", 
        toggleActions: "play none none reverse"
      }
    });

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
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-neutral-900 text-white py-24 origin-top">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        
        <div className="mb-16 service-card">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">
            How Ever.arch <br />
            <span className="text-neutral-500">Can Help You</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          
          {/* BUY CARD */}
          <Link to="/buy" className="service-card group relative flex flex-col justify-between bg-neutral-800/50 hover:bg-white transition-colors duration-500 p-8 sm:p-12 min-h-[300px] sm:min-h-[400px] rounded-xl overflow-hidden border border-white/5">
            <div>
              <h3 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-4 group-hover:text-black transition-colors duration-500">
                Buy
              </h3>
              {/* UPDATED: Added text-lg sm:text-xl and max-w-sm */}
              <p className="text-lg sm:text-xl text-neutral-400 group-hover:text-neutral-600 font-light tracking-wide max-w-sm transition-colors duration-500">
                Whether you are looking for a heritage estate in Jaipur or a modern high-rise, find a place that feels entirely yours.
              </p>
            </div>
            <div className="self-end overflow-hidden">
              <span className="block text-4xl group-hover:text-black transform translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-out">
                →
              </span>
            </div>
          </Link>

          {/* SELL CARD */}
          <Link to="/sell" className="service-card group relative flex flex-col justify-between bg-neutral-800/50 hover:bg-white transition-colors duration-500 p-8 sm:p-12 min-h-75 sm:min-h-100 rounded-xl overflow-hidden border border-white/5">
            <div>
              <h3 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-4 group-hover:text-black transition-colors duration-500">
                Sell
              </h3>
              {/* UPDATED: Added text-lg sm:text-xl and max-w-sm */}
              <p className="text-lg sm:text-xl text-neutral-400 group-hover:text-neutral-600 font-light tracking-wide max-w-sm transition-colors duration-500">
                Expert market positioning, dynamic pricing strategies, and an unmatched network of active buyers.
              </p>
            </div>
            <div className="self-end overflow-hidden">
              <span className="block text-4xl group-hover:text-black transform translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-out">
                →
              </span>
            </div>
          </Link>

          {/* RENT CARD */}
          <Link to="/rent" className="service-card group relative flex flex-col justify-between bg-neutral-800/50 hover:bg-white transition-colors duration-500 p-8 sm:p-12 min-h-75 sm:min-h-100 rounded-xl overflow-hidden border border-white/5">
            <div>
              <h3 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-4 group-hover:text-black transition-colors duration-500">
                Rent
              </h3>
              {/* UPDATED: Added text-lg sm:text-xl and max-w-sm */}
              <p className="text-lg sm:text-xl text-neutral-400 group-hover:text-neutral-600 font-light tracking-wide max-w-sm transition-colors duration-500">
                Discover premium rentals and flawless property management to keep your living experience completely seamless.
              </p>
            </div>
            <div className="self-end overflow-hidden">
              <span className="block text-4xl group-hover:text-black transform translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-out">
                →
              </span>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}