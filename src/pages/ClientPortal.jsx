import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function ClientPortal() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('project');
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".portal-reveal", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out"
    });
  }, { scope: containerRef, dependencies: [activeTab] });

  // Mock Data for Saved Properties
  const [savedProperties, setSavedProperties] = useState([
    {
      id: 1,
      title: "The Aravalli Estate",
      location: "C-Scheme, Jaipur",
      price: "₹25.5 Cr",
      image: "/l-1.avif"
    },
    {
      id: 2,
      title: "Civil Lines Penthouse",
      location: "Civil Lines, Jaipur",
      price: "₹15.0 Cr",
      image: "/l-2.avif"
    }
  ]);

  const removeSaved = (id) => {
    setSavedProperties(savedProperties.filter(p => p.id !== id));
  };

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-neutral-950 text-white flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 bg-neutral-900 border-r border-neutral-800 p-8 flex flex-col justify-between">
        <div>
          <div className="mb-12 py-10 px-5">
            
            <span className="text-[10px] tracking-widest text-neutral-400 uppercase mt-1 block">Private Client Portal</span>
          </div>

          <nav className="flex flex-col gap-2">
            <button 
              onClick={() => setActiveTab('project')}
              className={`text-left text-xs font-bold tracking-widest uppercase py-3 px-4 rounded-xl transition-all ${
                activeTab === 'project' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              Active Project
            </button>
            <button 
              onClick={() => setActiveTab('saved')}
              className={`text-left text-xs font-bold tracking-widest uppercase py-3 px-4 rounded-xl transition-all ${
                activeTab === 'saved' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              Saved Listings ({savedProperties.length})
            </button>
            <button 
              onClick={() => setActiveTab('documents')}
              className={`text-left text-xs font-bold tracking-widest uppercase py-3 px-4 rounded-xl transition-all ${
                activeTab === 'documents' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              Blueprints & Docs
            </button>
            <button 
              onClick={() => setActiveTab('concierge')}
              className={`text-left text-xs font-bold tracking-widest uppercase py-3 px-4 rounded-xl transition-all ${
                activeTab === 'concierge' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              Studio Concierge
            </button>
          </nav>
        </div>

        <div className="pt-8 border-t border-neutral-800">
          <div className="mb-4">
            <p className="text-xs font-bold text-white">Aarav Sharma</p>
            <p className="text-[11px] text-neutral-400">aarav@example.com</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="text-left text-xs font-bold tracking-widest uppercase text-red-400 hover:text-red-300 transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-16 overflow-y-auto">
        
        {/* TAB 1: ACTIVE PROJECT */}
        {activeTab === 'project' && (
          <div className="portal-reveal max-w-5xl">
            <div className="mb-10">
              <span className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-2 block">Current Commission</span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">The Aravalli Residence</h1>
              <p className="text-neutral-400 text-sm mt-1">Bespoke private estate • Bani Park, Jaipur</p>
            </div>

            {/* Project Status Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-2">Current Phase</span>
                <p className="text-xl font-bold text-white">Stonemasonry & Joinery</p>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-2">Estimated Completion</span>
                <p className="text-xl font-bold text-white">Q4 2026</p>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-2">Lead Architect</span>
                <p className="text-xl font-bold text-white">Aarav Singhal</p>
              </div>
            </div>

            {/* Recent Site Updates */}
            <h3 className="text-xl font-bold tracking-tight mb-6">Recent Site Progress</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800')` }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">June 2026</span>
                    <h4 className="font-bold text-lg">Main Pavilion Quartzite Cladding</h4>
                  </div>
                </div>
              </div>

              <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800')` }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">May 2026</span>
                    <h4 className="font-bold text-lg">Courtyard Water Feature Foundation</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SAVED LISTINGS */}
        {activeTab === 'saved' && (
          <div className="portal-reveal max-w-5xl">
            <div className="mb-10">
              <h1 className="text-3xl font-bold tracking-tight mb-2">Saved Acquisitions</h1>
              <p className="text-neutral-400 text-sm">Properties you have shortlisted for potential private acquisition.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {savedProperties.map((property) => (
                <div key={property.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col">
                  <div className="h-48 overflow-hidden relative">
                    <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex flex-col grow justify-between">
                    <div>
                      <span className="text-xs font-bold text-neutral-400 block mb-1">{property.location}</span>
                      <h3 className="text-xl font-bold mb-2">{property.title}</h3>
                      <p className="text-lg font-semibold text-white mb-6">{property.price}</p>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 bg-white text-black text-xs font-bold uppercase tracking-widest py-3 rounded-xl hover:bg-neutral-200 transition-colors">
                        Inquire
                      </button>
                      <button 
                        onClick={() => removeSaved(property.id)}
                        className="bg-neutral-800 hover:bg-red-500/10 hover:text-red-400 text-neutral-400 text-xs font-bold uppercase tracking-widest px-4 py-3 rounded-xl transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {savedProperties.length === 0 && (
                <div className="col-span-full py-20 text-center border border-dashed border-neutral-800 rounded-2xl">
                  <p className="text-neutral-500 font-light">No saved listings in your portfolio.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: DOCUMENTS & BLUEPRINTS */}
        {activeTab === 'documents' && (
          <div className="portal-reveal max-w-4xl">
            <div className="mb-10">
              <h1 className="text-3xl font-bold tracking-tight mb-2">Project Documents</h1>
              <p className="text-neutral-400 text-sm">Secure downloads for blueprints, structural reports, and material palettes.</p>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { name: "Master Architectural Blueprint - Rev 4", type: "PDF", size: "24.2 MB", date: "June 12, 2026" },
                { name: "Structural Engineering & Seismic Report", type: "PDF", size: "8.5 MB", date: "May 28, 2026" },
                { name: "Interior Material & Stone Palette Specification", type: "PDF", size: "14.1 MB", date: "May 10, 2026" },
                { name: "Contract & Milestone Agreement", type: "PDF", size: "3.2 MB", date: "April 02, 2026" },
              ].map((doc, idx) => (
                <div key={idx} className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h4 className="font-bold text-base mb-1">{doc.name}</h4>
                    <p className="text-xs text-neutral-400">{doc.type} • {doc.size} • Uploaded {doc.date}</p>
                  </div>
                  <button className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-xl transition-colors cursor-pointer">
                    Download PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CONCIERGE */}
        {activeTab === 'concierge' && (
          <div className="portal-reveal max-w-3xl">
            <div className="mb-10">
              <h1 className="text-3xl font-bold tracking-tight mb-2">Studio Concierge</h1>
              <p className="text-neutral-400 text-sm">Direct priority communication channel with your project managers and architects.</p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Subject / Inquiry Type</label>
                <select className="bg-neutral-950 border border-neutral-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white transition-all text-sm">
                  <option>Design & Finish Modification</option>
                  <option>Schedule a Site Walkthrough</option>
                  <option>Billing & Milestone Payment</option>
                  <option>General Concierge</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Message</label>
                <textarea 
                  rows="5"
                  placeholder="Type your message to the studio principals here..."
                  className="bg-neutral-950 border border-neutral-800 rounded-xl px-5 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-all text-sm"
                ></textarea>
              </div>

              <button className="bg-white text-black text-xs uppercase tracking-widest py-4 rounded-xl hover:bg-neutral-200 transition-all font-bold">
                Send Direct Message
              </button>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}