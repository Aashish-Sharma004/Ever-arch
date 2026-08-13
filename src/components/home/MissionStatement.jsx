import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function MissionStatement() {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useGSAP(() => {
    // 1. ENTRANCE ANIMATION (Slides in from the bottom)
    gsap.from(".scroll-reveal", {
      y: 80,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%", 
        toggleActions: "play none none reverse"
      }
    });

    // 2. EXIT VANISH ANIMATION (Fades out as it hits the Navbar)
    gsap.to(sectionRef.current, {
      opacity: 0,
      scale: 0.95, // Slight shrink for depth
      y: -50,      // Pushes it up slightly while fading
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 10%",  // Starts vanishing right as it nears the top (navbar area)
        end: "bottom 30%", // Fully invisible by the time it scrolls a bit further
        scrub: true        // Binds the disappearance entirely to your scrollbar
      }
    });

  }, { scope: sectionRef });

  return (
    // Added origin-top so it scales smoothly from the top center
    <section ref={sectionRef} className="w-full bg-stone-50 text-neutral-900 py-24 sm:py-32 lg:py-40 origin-top">
      {/* Strict screen padding maintained across layouts */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col lg:flex-row justify-between gap-16 lg:gap-8">
        
        {/* Left Column: Heading & Button */}
        <div className="lg:w-1/2 flex flex-col items-start scroll-reveal">
          <span className="text-xs font-bold tracking-widest uppercase mb-4 text-neutral-500">
            About Ever.arch
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-tight mb-8">
            Real Estate & Architecture, <br />
            <span className="text-neutral-400">Rewired.</span>
          </h2>
          

           
          <button onClick={() => navigate('/projects')} className="bg-black text-white hover:bg-neutral-800 text-xs sm:text-sm font-semibold tracking-wide px-8 py-4 rounded-full transition-all shadow-lg flex items-center gap-2">
            Start Your Search 
            <span className="text-lg leading-none">→</span>
          </button>
          
        </div>

        {/* Right Column: Steps/Mission Points */}
        <div className="lg:w-1/2 flex flex-col gap-12">
          
          <div className="scroll-reveal">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-3 flex items-center gap-4">
              <span className="text-neutral-300 font-light">01</span>
              Talk to a Real Human.
            </h3>
            <p className="text-neutral-600 font-light leading-relaxed max-w-md pl-11">
              We match you with an expert who actually listens to your architectural needs and property goals.
            </p>
          </div>

          <div className="scroll-reveal">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-3 flex items-center gap-4">
              <span className="text-neutral-300 font-light">02</span>
              Get Complete Clarity.
            </h3>
            <p className="text-neutral-600 font-light leading-relaxed max-w-md pl-11">
              We define what you really need, not just what's available in the current market.
            </p>
          </div>

          <div className="scroll-reveal">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-3 flex items-center gap-4">
              <span className="text-neutral-300 font-light">03</span>
              Move Forward.
            </h3>
            <p className="text-neutral-600 font-light leading-relaxed max-w-md pl-11">
              We find what fits your vision—and we do whatever it takes to make it happen smoothly.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}