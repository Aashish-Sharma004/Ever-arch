import React from 'react';
import Navbar from '../navigation/Navbar';
import Footer from '../navigation/Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans antialiased selection:bg-white selection:text-black flex flex-col">
      {/* Global Floating Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="w-full flex grow">
        {children}
      </main>

      {/* Global Footer (Now appears at the bottom of every page automatically) */}
      <Footer />
    </div>
  );
}