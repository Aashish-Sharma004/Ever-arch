import React from 'react';
import HeroSection from '../components/home/HeroSection';
import MissionStatement from '../components/home/MissionStatement';
import ServicesGrid from '../components/home/ServicesGrid';
import SecondaryServices from '../components/home/SecondaryServices';
import MarketInsights from '../components/home/MarketInsights';
import ContactCTA from '../components/home/ContactCTA';

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <MissionStatement />
      <ServicesGrid />
      <SecondaryServices />
      <MarketInsights />
      <ContactCTA />
    </div>
  );
}