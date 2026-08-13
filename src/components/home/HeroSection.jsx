import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom'; 


gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef(null);
  const navigate = useNavigate(); 

  useGSAP(() => {
    const textTl = gsap.timeline();

    // 1. The Entrance Reveal
    textTl.from(".char", {
      y: 150,
      duration: 1,
      stagger: 0.03,
      ease: "power4.out",
      delay: 0.2
    })
    // 2. Remove the clipping mask 
    .set(".word-wrapper", { overflow: "visible" })
    // 3. The Infinite Wave Loop
    .to(".char", {
      y: -15, 
      duration: 1.2, 
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.08 
    });

    // 4. Fade in the subtext and button
    gsap.from(".fade-up", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      delay: 1.5 
    });

    // 5. ScrollTrigger Vanish Animation
    gsap.to(containerRef.current, {
      opacity: 0,         
      scale: 0.95,         
      y: -100,            
      ease: "none",        
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",   
        end: "bottom top",   
        scrub: true,        
      }
    });

  }, { scope: containerRef });

  const headingWords = "Find What Moves You.".split(" ");

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-between bg-neutral-900 origin-top  ">
      
      {/* Background Video Layer */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-black/60 z-10" />
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover scale-105"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Main Typography */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center justify-center grow mt-24">
        
        <h1 className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-5xl sm:text-7xl md:text-8xl lg:text-[100px] font-semibold tracking-tighter leading-none text-white mb-12">
          {headingWords.map((word, wordIndex) => (
            <span key={wordIndex} className="word-wrapper overflow-hidden inline-flex pb-4">
              {word.split("").map((char, charIndex) => (
                <span key={charIndex} className="char inline-block transform">
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>
        
        <p className="fade-up text-lg sm:text-xl md:text-2xl text-neutral-300 font-normal max-w-2xl tracking-wide">
          Expert agents. Real guidance. A clear path to finding what's next.
        </p>
      </div>

      {/* Action Button */}
      <div className="fade-up relative z-20 pb-16 sm:pb-24">
        <button 
          onClick={() => navigate('/buy')} // <-- 3. Added click event to navigate to listings page
          className="bg-white text-black hover:bg-yellow-300 text-xs sm:text-sm font-semibold tracking-wide px-8 py-4 rounded-full transition-all shadow-lg flex items-center gap-2 cursor-pointer"
        >
          Find Properties 
          <span className="text-lg leading-none">→</span>
        </button>
      </div>

    </section>
  );
}