import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { StickyCTA } from './StickyCTA';
import { GlobalStyles } from './GlobalStyles';
import { SpiderWeb } from './SpiderWeb';
import { PrivacyPolicy, TermsOfService, ContactUs } from './LegalViews';

/**
 * Main Layout Wrapper
 * Handles global navigation, legal modals, and state.
 */
export const MainLayout = ({ children }) => {
  const { stars, versionData, trackDownload } = useApp();
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Sticky CTA Scroll Logic
  useEffect(() => {
    const handleScrollEvent = () => {
      const scrollY = window.scrollY;
      setShowStickyCTA(scrollY > 600);
    };

    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-orange-500 selection:text-white overflow-x-hidden">
      <GlobalStyles />
      <SpiderWeb />

      {/* Main Navigation */}
      <Navbar 
        stars={stars} 
        versionData={versionData} 
        onDownload={trackDownload} 
      />

      {children}

      {/* Footer & Global Actions */}
      <Footer 
        versionData={versionData} 
        onDownload={trackDownload}
        setShowPrivacy={setShowPrivacy}
        setShowTerms={setShowTerms}
        setShowContact={setShowContact}
      />

      {/* Floating Action Button (Mobile) */}
      <StickyCTA 
        showStickyCTA={showStickyCTA}
        versionData={versionData}
        onDownload={trackDownload}
      />

      {/* Full-Screen Service Views (Legal & Support) */}
      {showPrivacy && <PrivacyPolicy setShowPrivacy={setShowPrivacy} />}
      {showContact && <ContactUs setShowContact={setShowContact} />}
      {showTerms && <TermsOfService setShowTerms={setShowTerms} />}
    </div>
  );
};
