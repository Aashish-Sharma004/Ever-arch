import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SecondaryServices() {
  const containerRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // --------------------------------------------------
    // DESKTOP & TABLET (Min-width: 768px)
    // --------------------------------------------------
    mm.add("(min-width: 768px)", () => {
      // 1. Entrance Reveal
      gsap.from(".support-element", {
        y: 80,
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

      // 2. Vanish on scroll up
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

    // --------------------------------------------------
    // MOBILE SCREENS (Max-width: 767px)
    // --------------------------------------------------
    mm.add("(max-width: 767px)", () => {
      // ONLY apply the entrance animation. 
      // No vanish animation means the cards will stay visible while scrolling.
      gsap.from(".support-element", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%", // Triggers slightly earlier so it doesn't get stuck hidden
          toggleActions: "play none none reverse"
        }
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-neutral-900 text-white py-16 sm:py-24 origin-top overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          
          <div className="lg:col-span-1 flex flex-col justify-between support-element">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] mb-6">
                Support <br />
                <span className="text-neutral-500">Beyond</span> <br />
                Buying and <br />
                Selling
              </h2>
            </div>
            
            <button className="self-start mt-4 lg:mt-0 border border-white/20 hover:border-white text-xs sm:text-sm font-semibold tracking-wide px-8 py-4 rounded-full transition-all flex items-center gap-2">
              Explore Services 
              <span className="text-lg leading-none">→</span>
            </button>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <div className="support-element group relative h-300px sm:h-450px rounded-xl overflow-hidden cursor-pointer bg-neutral-800">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: "url('/ser-1.avif')" }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full">
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white group-hover:text-neutral-300 transition-colors">
                  Property Management
                </h3>
              </div>
            </div>

            <div className="support-element group relative h-300px sm:h-450px rounded-xl overflow-hidden cursor-pointer bg-neutral-800">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: "url('/ass5.jpg')" }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full">
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white group-hover:text-neutral-300 transition-colors">
                  Architecture & <br/> Interior Design
                </h3>
              </div>
            </div>

            <div className="support-element group relative h-300px sm:h-450px rounded-xl overflow-hidden cursor-pointer bg-neutral-800">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: "url('/ass3.webp')" }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full">
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white group-hover:text-neutral-300 transition-colors">
                  Construction & <br/> Real Estate Development
                </h3>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}