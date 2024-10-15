// src/App.js
import React from 'react';
import './App.css'; 
import BrandingCard from './components/BrandingCard';
import WebDevelopmentCard from './components/WebDevCard';
import DigitalMarketingCard from './components/DigitalMarketingCard';
import MobileAppCard from './components/MobileAppCard';
import SeoCard from './components/SeoCard';
import UserTestingCard from './components/UserTestingCard';
import Testimonials from './components/Testimonials';

function App() {
  return (
    <div>
      <div className="bg-custom-black text-white py-16 px-8 min-h-screen">
        <div className="container mx-auto max-w-screen-xl">
          <h2 className="text-4xl mb-8 text-center" style={{ fontFamily: 'Roboto', fontSize: '40px', fontWeight: 'bold', color: '#FFFFFF' }}>
            We Offer
          </h2>
          <p className="text-center mb-12" style={{ fontFamily: 'Roboto', fontSize: '16px', color: '#9E9E9E' }}>
            Risus commodo id odio turpis pharetra elementum. Pulvinar porta porta
            feugiat
            <br /> scelerisque in elit. Morbi rhoncus, tellus, eros consequat magna
            semper orci a
            <br /> tincidunt.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <BrandingCard />
            <WebDevelopmentCard />
            <DigitalMarketingCard />
            <MobileAppCard />
            <SeoCard />
            <UserTestingCard />
          </div>
        </div>
      </div>

      <Testimonials />
    </div>
  );
}

export default App;