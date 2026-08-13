import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // 1. Clean up existing triggers
    ScrollTrigger.getAll().forEach(st => {
      if (st.vars.trigger === footerRef.current) st.kill();
    });

    // 2. Ensure initial visible fallback state so text never stays permanently invisible
    gsap.set(".footer-reveal", { y: 0, opacity: 1 });

    // 3. Create the ScrollTrigger animation
    const animation = gsap.from(".footer-reveal", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%", // Trigger slightly earlier to be safe
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      }
    });

    // 4. Multiple staggered refreshes to catch heavy pages like Listings (/buy) 
    // as their images and grid components finish loading into the DOM
    const timers = [100, 300, 600, 1000].map(delay => 
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, delay)
    );

    return () => {
      timers.forEach(timer => clearTimeout(timer));
      animation.kill();
    };
  }, [location.pathname]);

  return (
    <footer ref={footerRef} className="w-full bg-neutral-950 text-white pt-24 sm:pt-32 pb-8 overflow-hidden border-t border-neutral-900">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        
        {/* Top Section: Newsletter & Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24 sm:mb-32">
          
          {/* Left: Newsletter & Contact Info */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            
            {/* Newsletter */}
            <div className="footer-reveal mb-16 lg:mb-0">
              <h3 className="text-xl sm:text-2xl font-medium tracking-tight mb-8">
                Subscribe to our Newsletter!
              </h3>
              <form className="flex items-end gap-4 max-w-md" onSubmit={(e) => e.preventDefault()}>
                <div className="grow">
                  <label htmlFor="email" className="sr-only">Enter email address</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="Enter email address" 
                    className="w-full bg-transparent border-b border-neutral-600 pb-3 text-sm focus:outline-none focus:border-white transition-colors text-white placeholder-neutral-600"
                  />
                </div>
                <button type="submit" className="text-2xl hover:translate-x-2 transition-transform duration-300">
                  →
                </button>
              </form>
            </div>

            {/* Contact Details Grid */}
            <div className="footer-reveal grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 text-sm text-neutral-400 font-light">
              <div>
                <span className="block font-bold text-white mb-3">Head Office</span>
                <p>Level 4, Aravalli Horizon</p>
                <p>C-Scheme, Jaipur</p>
                <p>Rajasthan 302001, India</p>
              </div>
              <div>
                <span className="block font-bold text-white mb-3">Email Us</span>
                <a href="mailto:hello@everarch.com" className="hover:text-white transition-colors">
                  hello@everarch.com
                </a>
              </div>
              <div>
                <span className="block font-bold text-white mb-3">Call Us</span>
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>

          {/* Right: Navigation & Socials */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 lg:justify-items-end">
            
            {/* Main Links */}
            <div className="footer-reveal flex flex-col gap-4 text-sm font-medium tracking-wide">
              <Link to="/projects" className="hover:text-neutral-400 transition-colors">Projects</Link>
              <Link to="/buy" className="hover:text-neutral-400 transition-colors">Listings</Link>
              <Link to="/about" className="hover:text-neutral-400 transition-colors">About Us</Link>
              <Link to="/contact" className="hover:text-neutral-400 transition-colors">Contact</Link>
              <Link to="/agent-portal" className="hover:text-neutral-400 transition-colors mt-4 text-neutral-500">Agent Portal</Link>
            </div>

            {/* Social Links */}
            <div className="footer-reveal flex flex-col gap-4 text-sm font-medium tracking-wide lg:items-end">
              <a href="#" className="hover:text-neutral-400 transition-colors">Facebook</a>
              <a href="#" className="hover:text-neutral-400 transition-colors">Instagram</a>
              <a href="#" className="hover:text-neutral-400 transition-colors">YouTube</a>
              <a href="#" className="hover:text-neutral-400 transition-colors">LinkedIn</a>
            </div>
          </div>

        </div>

        {/* Bottom Section: Massive Brand Text */}
        <div className="footer-reveal w-full flex flex-col items-center border-t border-neutral-800 pt-8">
          <h1 className="text-[16vw] font-bold tracking-tighter leading-none text-white select-none">
            EVER.ARCH
          </h1>
          
          <div className="w-full flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-600 mt-8 gap-4">
            <span>© 2026 Ever.arch. All Rights Reserved.</span>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-neutral-300 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-neutral-300 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}