import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const drawerRef = useRef(null);
  const tl = useRef(null);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40); 
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true })
      .to(drawerRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power4.inOut"
      })
      .from(".mobile-nav-link", {
        y: 20,
        opacity: 0,
        duration: 0.3,
        stagger: 0.08,
        ease: "power2.out"
      }, "-=0.2");
  }, { scope: drawerRef });

  useEffect(() => {
    if (isDrawerOpen) tl.current.play();
    else tl.current.reverse();
  }, [isDrawerOpen]);

  return (
    <>
      {/* Top Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 px-4 sm:px-10 py-3 flex justify-between items-center transition-all duration-500 ${
          isScrolled
            ? 'bg-black/70 backdrop-blur-md shadow-lg py-2'
            : 'bg-transparent mix-blend-difference py-2'
        }`}
      >
        {/* Logo */}
        <Link to="/" className="text-2xl sm:text-2xl font-extrabold tracking-tighter uppercase text-white">
          EVER.ARCH
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm uppercase tracking-widest font-medium text-white">
          <Link to="/projects" className="hover:text-white transition-opacity">Projects</Link>
          <Link to="/buy" className="hover:text-white transition-opacity">Listings</Link>
          <Link to="/about" className="hover:text-white transition-opacity">About</Link>
          <Link to="/contact" className="hover:text-white transition-opacity">Contact</Link>
        </nav>

        {/* Right CTA / Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            to="/auth"
            className="hidden sm:inline-block bg-white text-black text-xs uppercase font-bold tracking-wider px-5 py-2.5 rounded-full hover:bg-neutral-200 transition-all text-center"
          >
            Sign In
          </Link>

          <button
            onClick={toggleDrawer}
            className="lg:hidden text-white text-xs uppercase tracking-widest font-bold px-3 py-1 border border-white/40 rounded-full"
          >
            Menu
          </button>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-md z-50 transition-opacity duration-300 lg:hidden ${
          isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleDrawer}
      />

      {/* Mobile Slide-Out Drawer */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-full max-w-sm bg-neutral-950 text-white z-50 shadow-2xl flex flex-col px-8 py-10 transform translate-x-full lg:hidden border-l border-white/10"
      >
        <div className="flex justify-between items-center mb-12">
          <span className="text-xs uppercase tracking-widest text-neutral-400">Navigation</span>
          <button onClick={toggleDrawer} className="text-xs uppercase tracking-widest font-bold text-white hover:text-neutral-400">
            Close ✕
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex flex-col gap-6 text-3xl font-light tracking-tight">
          <Link to="/" onClick={toggleDrawer} className="mobile-nav-link hover:translate-x-2 transition-transform">Home</Link>
          <Link to="/projects" onClick={toggleDrawer} className="mobile-nav-link hover:translate-x-2 transition-transform">Projects</Link>
          <Link to="/buy" onClick={toggleDrawer} className="mobile-nav-link hover:translate-x-2 transition-transform">Listings</Link>
          <Link to="/about" onClick={toggleDrawer} className="mobile-nav-link hover:translate-x-2 transition-transform">About Us</Link>
          <Link to="/contact" onClick={toggleDrawer} className="mobile-nav-link hover:translate-x-2 transition-transform">Contact</Link>
        </nav>

        <div className="mt-auto pt-8 border-t border-white/10">
          <Link
            to="/auth"
            onClick={toggleDrawer}
            className="block w-full bg-white text-black text-xs uppercase font-bold tracking-wider py-4 rounded-full text-center"
          >
            Sign In
          </Link>
        </div>
      </div>
    </>
  );
}