import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', interest: 'Custom Architecture', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // 1. Initial Load Animation for Subtitle & Details
    gsap.from(".fade-up", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.5,
      ease: "power3.out",
      delay: 0.2
    });
    

    

    // 2. DESKTOP ANIMATIONS (Title Only)
    mm.add("(min-width: 768px)", () => {
      gsap.to(".shrink-title", {
        scale: 0.85,
        opacity: 0.7,
        y: -40,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: ".shrink-title-wrapper",
          start: "top 25%",
          end: "bottom top",
          toggleActions: "play none none none",
        }
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-neutral-950 text-white pt-40 pb-40 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        
        {/* SHRINKING HEADER WRAPPER */}
        <div className="shrink-title-wrapper mb-24 will-change-transform">
          <span className="fade-up text-xs font-bold tracking-widest uppercase mb-4 text-neutral-400 block">
            Direct Communication
          </span>
          <h1 className="shrink-title fade-up text-5xl sm:text-7xl md:text-[100px] font-bold tracking-tighter leading-[0.9] text-white origin-left will-change-transform">
            Let's Shape <br />
            <span className="text-neutral-500">The Future.</span>
          </h1>
        </div>

        {/* Cinematic Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Fixed Studio Details */}
          <div className="fade-up lg:col-span-5 flex flex-col justify-between border-l border-neutral-800 pl-8 lg:pl-12 py-4">
            <div className="flex flex-col gap-12">
              
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">Studio Headquarters</h3>
                <p className="text-xl font-light text-white leading-relaxed">
                  Level 4, Aravalli Horizon <br />
                  C-Scheme, Jaipur, Rajasthan 302001
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">Direct Channels</h3>
                <p className="text-lg font-light text-neutral-300">Inquiries: <a href="mailto:hello@everarch.com" className="text-white hover:underline ml-1">hello@everarch.com</a></p>
                <p className="text-lg font-light text-neutral-300 mt-1">Direct: <a href="tel:+919876543210" className="text-white hover:underline ml-1">+91 98765 43210</a></p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">Operating Hours</h3>
                <p className="text-sm font-light text-neutral-400">Monday — Saturday: 09:30 — 18:30 IST</p>
              </div>

            </div>

            <div className="mt-20 pt-8 border-t border-neutral-900 flex gap-6 text-sm font-medium tracking-wide text-neutral-400">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">YouTube</a>
            </div>
          </div>

          {/* Right Column: STATIC FORM CARD (No scroll animations) */}
          <div className="lg:col-span-7 bg-neutral-900/80 backdrop-blur-2xl p-8 sm:p-14 rounded-3xl border border-neutral-800 shadow-2xl">
            {submitted ? (
              <div className="py-24 text-center flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center text-3xl mb-6 shadow-2xl">✓</div>
                <h3 className="text-3xl font-bold tracking-tight text-white mb-4">Inquiry Received</h3>
                <p className="text-neutral-400 font-light max-w-md text-base leading-relaxed">
                  Thank you. A principal architect from our Jaipur headquarters will review your submission and contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Your Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Aarav Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-neutral-950 border border-neutral-800 rounded-xl px-5 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-all text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="aarav@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-neutral-950 border border-neutral-800 rounded-xl px-5 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="bg-neutral-950 border border-neutral-800 rounded-xl px-5 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-all text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Scope of Interest</label>
                    <select 
                      value={formData.interest}
                      onChange={(e) => setFormData({...formData, interest: e.target.value})}
                      className="bg-neutral-950 border border-neutral-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white transition-all text-sm cursor-pointer"
                    >
                      <option value="Custom Architecture">Custom Architecture</option>
                      <option value="Interior Design">Interior Design</option>
                      <option value="Real Estate Acquisition">Listing Acquisition</option>
                      <option value="General Consultation">General Consultation</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Project Details or Inquiry *</label>
                  <textarea 
                    rows="5"
                    required
                    placeholder="Describe your vision, site location in Jaipur, or property requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="bg-neutral-950 border border-neutral-800 rounded-xl px-5 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-all resize-none text-sm"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-white text-black hover:bg-neutral-200 text-xs font-bold uppercase tracking-widest py-5 rounded-xl transition-all shadow-2xl mt-4"
                >
                  Submit Inquiry
                </button>

              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}