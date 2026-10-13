import React from 'react';
import { Navbar, Hero, Programs, WhyUs, Team, Notices, Chairman, Contact, Footer } from './components/Site';

const WHATSAPP_URL = 'https://wa.me/9779765630131?text=Namaste%2C%20I%20would%20like%20to%20enquire%20about%20classes%20at%20Be%20Smart%20Coaching%20Center.';

export default function App() {
  const enquire = () => window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
  return (
    <>
      <Navbar onApply={enquire} />
      <main>
        <Hero onApply={enquire} />
        <Programs onApply={enquire} />
        <WhyUs />
        <Team />
        <Notices />
        <Chairman />
        <Contact onApply={enquire} />
      </main>
      <Footer />
    </>
  );
}
