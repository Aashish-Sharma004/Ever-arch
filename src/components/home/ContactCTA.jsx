import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
  const containerRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Entrance Animation
      gsap.from(".cta-element", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // No vanish animation here! 
      // We want this to solidly meet the Footer as you scroll to the absolute bottom.
    });

    mm.add("(max-width: 767px)", () => {
      gsap.from(".cta-element", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-neutral-200 text-neutral-900 py-32 sm:py-40">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col items-center text-center">
        
        <span className="cta-element text-xs font-bold tracking-widest uppercase mb-6 text-neutral-500">
          Your Next Chapter
        </span>
        
        <h2 className="cta-element text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-[0.95] mb-12 max-w-4xl">
          Let's build <br className="hidden sm:block" /> something exceptional.
        </h2>
        
        <div className="cta-element">
          <Link 
            to="/contact" 
            className="inline-flex items-center justify-center bg-black text-white hover:bg-neutral-800 text-sm sm:text-base font-semibold tracking-wide px-10 py-5 rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 duration-300 gap-3"
          >
            Get in Touch
            <span className="text-xl leading-none">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}