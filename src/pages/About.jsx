import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. HERO ENTRANCE
    tl.from(".hero-reveal", {
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      delay: 0.2
    })
    // 2. HERO IMAGE LANDING
    .from(".hero-image", {
      scale: 1.1,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out"
    }, "-=0.8");

    // 3. PHILOSOPHY SECTION
    gsap.from(".scroll-philosophy", {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".philosophy-section",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // 4. TRANSITION DIVIDER
    gsap.from(".gap-reveal", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".gap-animation-section",
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });

    // NOTE: Core pillars animation removed entirely so they render statically and instantly!

    // 5. LEADERSHIP SECTION
    gsap.from(".leadership-reveal", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".leadership-section",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-stone-50 text-neutral-900 pt-40 pb-32 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        
        {/* 1. HERO STATEMENT */}
        <div className="mb-24 max-w-5xl">
          <span className="hero-reveal text-xs font-bold tracking-widest uppercase mb-4 text-neutral-500 block">
            Established 2018 • Jaipur
          </span>
          <h1 className="hero-reveal text-5xl sm:text-7xl md:text-[100px] font-bold tracking-tighter leading-[0.9] mb-8 text-black">
            Crafting Spaces, <br />
            <span className="text-neutral-400">Honoring Heritage.</span>
          </h1>
          <p className="hero-reveal text-xl sm:text-2xl text-neutral-700 font-light leading-relaxed max-w-3xl">
            EVER.ARCH is an avant-garde architectural and real estate studio based in Jaipur. We bridge the timeless vernacular of Rajasthan with uncompromising contemporary minimalism.
          </p>
        </div>

        {/* 2. LARGE HERO IMAGE BANNER */}
        <div className="hero-image relative w-full aspect-21/9 rounded-3xl overflow-hidden mb-28 bg-neutral-200 shadow-2xl">
          <div 
            className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-1000 hover:scale-100"
            style={{ backgroundImage: `url('/About-1.avif')` }}
          />
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </div>

        {/* 3. PHILOSOPHY & STORY SPLIT SECTION */}
        <div className="philosophy-section grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-20">
          
          <div className="scroll-philosophy lg:col-span-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Our Philosophy</h2>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-black leading-snug">
              Architecture as an extension of the land.
            </h3>
          </div>

          <div className="scroll-philosophy lg:col-span-7 flex flex-col gap-8 text-lg sm:text-xl font-light text-neutral-700 leading-relaxed">
            <p>
              Rooted in the Pink City, our work draws inspiration from Jaipur's profound architectural legacy—from the precision of Jantar Mantar to the organic layouts of ancient fortresses. Yet, our execution looks firmly toward the future.
            </p>
            <p>
              We believe true luxury is found in spatial clarity, profound thermal comfort, and raw material honesty. Every residence or commercial space we curate is designed to age gracefully alongside its environment.
            </p>
          </div>

        </div>

        {/* 4. ANIMATED DIVIDER IN THE GAP */}
        <div className="gap-animation-section w-full py-16 mb-20 border-y border-neutral-300 flex flex-col items-center justify-center text-center">
          <span className="gap-reveal text-xs font-bold tracking-[0.3em] uppercase text-neutral-400 mb-3 block">
            The Standard of Excellence
          </span>
          <p className="gap-reveal text-2xl sm:text-3xl font-light text-neutral-800 tracking-tight max-w-2xl">
            Precision blueprints engineered for timeless living across Rajasthan.
          </p>
        </div>

        {/* 5. CORE PILLARS GRID (Animations completely removed, visible instantly) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-36">
          
          <div className="bg-white p-10 rounded-3xl border border-neutral-200 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
            <div>
              <span className="text-xs font-bold tracking-widest text-neutral-400 uppercase mb-6 block">01 / Approach</span>
              <h4 className="text-2xl font-bold text-black mb-4">Contextual Modernism</h4>
              <p className="text-neutral-600 font-light leading-relaxed">
                We design with local climate, natural light paths, and regional stone palettes at the absolute core of our blueprints.
              </p>
            </div>
          </div>

          <div className="bg-white p-10 rounded-3xl border border-neutral-200 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
            <div>
              <span className="text-xs font-bold tracking-widest text-neutral-400 uppercase mb-6 block">02 / Execution</span>
              <h4 className="text-2xl font-bold text-black mb-4">Master Craftsmanship</h4>
              <p className="text-neutral-600 font-light leading-relaxed">
                Collaborating closely with master artisans across Rajasthan to deliver bespoke joinery, stonemasonry, and finishes.
              </p>
            </div>
          </div>

          <div className="bg-white p-10 rounded-3xl border border-neutral-200 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
            <div>
              <span className="text-xs font-bold tracking-widest text-neutral-400 uppercase mb-6 block">03 / Curation</span>
              <h4 className="text-2xl font-bold text-black mb-4">Exclusive Portfolios</h4>
              <p className="text-neutral-600 font-light leading-relaxed">
                Handling private acquisitions and bespoke real estate developments across Jaipur’s most coveted residential neighborhoods.
              </p>
            </div>
          </div>

        </div>

        {/* 6. LEADERSHIP SECTION */}
        <div className="leadership-section border-t border-neutral-300 pt-24">
          <div className="leadership-reveal flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase mb-3 text-neutral-500 block">Leadership</span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-black">Studio Principals</h2>
            </div>
            <p className="text-neutral-600 font-light max-w-md">
              Led by veteran architects and interior designers committed to design excellence in Northern India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 max-w-4xl">
            
            <div className="leadership-reveal flex flex-col group">
              <div 
                className="w-full aspect-4/5 rounded-2xl bg-neutral-200 mb-6 bg-cover bg-center shadow-md overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800')` }} 
              />
              <h4 className="text-2xl font-bold text-black">Aarav Singhal</h4>
              <span className="text-sm text-neutral-500 font-light mt-1">Principal Architect</span>
            </div>

            <div className="leadership-reveal flex flex-col group">
              <div 
                className="w-full aspect-4/5 rounded-2xl bg-neutral-200 mb-6 bg-cover bg-center shadow-md overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800')` }} 
              />
              <h4 className="text-2xl font-bold text-black">Vikramaditya Rathore</h4>
              <span className="text-sm text-neutral-500 font-light mt-1">Director of Real Estate Development</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}