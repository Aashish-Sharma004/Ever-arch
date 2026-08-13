import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link, useNavigate } from 'react-router-dom'; // 1. Imported useNavigate

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate(); // 2. Initialize navigate

  useGSAP(() => {
    gsap.from(".auth-reveal", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.2
    });
  }, { scope: containerRef, dependencies: [isSignUp] });

  // 3. Update the submit function to route to the portal
  const handleSubmit = (e) => {
    e.preventDefault();
    // Later, you will add actual password checking here. 
    // For now, clicking the button instantly takes them to the private portal!
    navigate('/portal');
  };

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-neutral-950 text-white flex pt-20">
      
      {/* Left Column: Cinematic Visual Panel (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-neutral-900 items-end p-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 scale-105"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600')` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
        
        <div className="relative z-10 max-w-xl">
          <span className="text-xs font-bold tracking-widest uppercase mb-4 text-neutral-400 block">
            EVER.ARCH Studio Portal
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-white">
            {isSignUp ? "Begin Your Architectural Journey." : "Welcome Back to Precision."}
          </h2>
          <p className="text-neutral-400 font-light text-base leading-relaxed">
            Access private client project portals, exclusive real estate acquisitions, and direct lines to our principal architects in Jaipur.
          </p>
        </div>
      </div>

      {/* Right Column: Interactive Form Panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-16 md:px-24 py-16 bg-neutral-950">
        <div className="max-w-md w-full mx-auto">
          
          {/* Header & Mode Switcher */}
          <div className="auth-reveal mb-10">
            <Link to="/" className="text-xs font-bold tracking-widest uppercase text-neutral-500 hover:text-white transition-colors mb-6 inline-block">
              ← Back to Studio
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
              {isSignUp ? "Create Account" : "Sign In"}
            </h1>
            <p className="text-neutral-400 font-light text-sm">
              {isSignUp ? "Enter your details to register your client portal." : "Please sign in to access your secure project dashboard."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-reveal flex flex-col gap-6">
            
            {isSignUp && (
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Full Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Aarav Sharma"
                  className="bg-neutral-900 border border-neutral-800 rounded-xl px-5 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-all text-sm"
                />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Email Address *</label>
              <input 
                type="email" 
                required
                placeholder="aarav@example.com"
                className="bg-neutral-900 border border-neutral-800 rounded-xl px-5 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-all text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Password *</label>
                {!isSignUp && (
                  <a href="#" className="text-xs text-neutral-500 hover:text-white transition-colors">Forgot?</a>
                )}
              </div>
              <input 
                type="password" 
                required
                placeholder="••••••••••••"
                className="bg-neutral-900 border border-neutral-800 rounded-xl px-5 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-all text-sm"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-white text-black hover:bg-neutral-200 text-xs font-bold uppercase tracking-widest py-5 rounded-xl transition-all shadow-2xl mt-2 cursor-pointer"
            >
              {isSignUp ? "Register Account" : "Sign In to Portal"}
            </button>

          </form>

          {/* Toggle between Sign In / Sign Up */}
          <div className="auth-reveal mt-8 text-center">
            <p className="text-sm text-neutral-400">
              {isSignUp ? "Already have an account?" : "Don't have a studio account?"}{" "}
              <button 
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-white font-medium hover:underline ml-1 cursor-pointer"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>

          {/* SECRET ADMIN LINK */}
          <div className="auth-reveal mt-16 text-center">
            <Link to="/admin" className="text-[10px] uppercase tracking-widest font-bold text-neutral-600 hover:text-white transition-colors">
              Secret Admin Access
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}