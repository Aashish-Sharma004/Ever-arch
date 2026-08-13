import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

 
  const [properties, setProperties] = useState([
    { 
      id: 1, 
      title: "The Aravalli Estate", 
      location: "C-Scheme, Jaipur", 
      price: "₹25.5 Cr", 
      specs: { beds: 5, baths: 6, sqft: "8,500" },
      image: "/l-1.avif",
      status: "New to Market"
    },
    { 
      id: 2, 
      title: "Civil Lines Penthouse", 
      location: "Civil Lines, Jaipur", 
      price: "₹15.0 Cr", 
      specs: { beds: 4, baths: 5, sqft: "6,200" },
      image: "/l-2.avif",
      status: "Exclusive"
    },
    { 
      id: 3, 
      title: "Mansagar Lakefront Haven", 
      location: "Amer Road, Jaipur", 
      price: "₹18.0 Cr", 
      specs: { beds: 6, baths: 7, sqft: "12,000" },
      image: "/l-3.avif",
      status: "Available" // Defaulted from "" to show it's active
    },
    { 
      id: 4, 
      title: "Heritage Villa Revive", 
      location: "Bani Park, Jaipur", 
      price: "₹12.5 Cr", 
      specs: { beds: 4, baths: 4, sqft: "5,800" },
      image: "/l-4.avif",
      status: "Price Drop"
    },
    { 
      id: 5, 
      title: "Modern Palace Bungalow", 
      location: "Vaishali Nagar, Jaipur", 
      price: "₹22.0 Cr", 
      specs: { beds: 7, baths: 8, sqft: "15,500" },
      image: "/l-5.avif",
      status: "Exclusive"
    },
    { 
      id: 6, 
      title: "Minimalist Glass Loft", 
      location: "Malviya Nagar, Jaipur", 
      price: "₹8.5 Cr", 
      specs: { beds: 3, baths: 3, sqft: "3,200" },
      image: "/l-6.avif",
      status: "Available" // Defaulted from ""
    }
  ]);

  // Remove a property
  const handleDelete = (id) => {
    const updatedProperties = properties.filter(prop => prop.id !== id);
    setProperties(updatedProperties);
  };

  // Toggle property status to 'Sold'
  const toggleStatus = (id) => {
    const updatedProperties = properties.map(prop => {
      if (prop.id === id) {
        return { 
          ...prop, 
          status: prop.status === "Sold" ? "Available" : "Sold" 
        };
      }
      return prop;
    });
    setProperties(updatedProperties);
  };

  return (
    <div className="w-full min-h-screen bg-neutral-950 text-white flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-neutral-900 border-r border-neutral-800 p-6 flex flex-col">
        <div className="mb-12 py-10 px-5">
          
          <span className="text-xs tracking-widest text-neutral-500 uppercase mt-1 block">Admin Portal</span>
        </div>

        <nav className="flex flex-col gap-4 grow">
          <button className="text-left text-sm font-bold tracking-widest uppercase text-white bg-neutral-800 py-3 px-4 rounded-xl">
            Listings
          </button>
          <button className="text-left text-sm font-bold tracking-widest uppercase text-neutral-500 hover:text-white transition-colors py-3 px-4">
            Messages
          </button>
          <button className="text-left text-sm font-bold tracking-widest uppercase text-neutral-500 hover:text-white transition-colors py-3 px-4">
            Settings
          </button>
        </nav>

        <button 
          onClick={() => navigate('/')}
          className="text-left text-xs font-bold tracking-widest uppercase text-red-400 hover:text-red-300 transition-colors mt-auto pt-8 border-t border-neutral-800"
        >
          Logout / Exit
        </button>
      </aside>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        
        {/* Header Area */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
          <div className="py-6 px-4 ">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Property Management</h1>
            <p className="text-neutral-400 text-sm">Add, edit, or remove premium listings from your portfolio.</p>
          </div>
          <button className="bg-white text-black text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-neutral-200 transition-all shadow-lg cursor-pointer">
            + Add New Listing
          </button>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-col sm:flex-row gap-6 items-center hover:border-neutral-700 transition-colors">
              
              {/* Property Image */}
              <div className="w-full sm:w-48 h-40 sm:h-full rounded-xl overflow-hidden shrink-0 bg-neutral-800 relative">
                <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                {property.status === "Sold" && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white font-bold tracking-widest uppercase text-sm border-2 border-white px-4 py-1 rounded">Sold</span>
                  </div>
                )}
              </div>

              {/* Property Details */}
              <div className="flex-1 w-full py-2">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                    property.status === 'Sold' ? 'bg-neutral-800 text-neutral-500' : 'bg-green-500/10 text-green-400'
                  }`}>
                    {property.status}
                  </span>
                  <span className="text-lg font-bold">{property.price}</span>
                </div>
                
                <h3 className="text-xl font-bold tracking-tight mb-1">{property.title}</h3>
                <p className="text-sm text-neutral-400 mb-3">{property.location}</p>
                
                {/* Specs Row Added Here */}
                <div className="flex items-center gap-4 text-xs font-medium text-neutral-500 mb-6">
                  <span className="flex items-center gap-1">🛏 {property.specs.beds} Beds</span>
                  <span className="flex items-center gap-1">🚿 {property.specs.baths} Baths</span>
                  <span className="flex items-center gap-1">📐 {property.specs.sqft} Sq.Ft.</span>
                </div>

                {/* Admin Actions */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => toggleStatus(property.id)}
                    className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase tracking-widest py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    {property.status === 'Sold' ? 'Relist' : 'Mark Sold'}
                  </button>
                  <button 
                    onClick={() => handleDelete(property.id)}
                    className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>

            </div>
          ))}

          {properties.length === 0 && (
            <div className="col-span-full py-20 text-center border border-dashed border-neutral-800 rounded-2xl">
              <p className="text-neutral-500 font-light text-lg">No properties listed in your portfolio.</p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}