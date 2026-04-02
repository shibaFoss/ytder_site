import React, { useState, useEffect } from 'react';

// Hooks
import { useCountUp } from '../hooks/useCountUp';

// Components
import { SpiderWeb } from '../components/SpiderWeb';
import { GlobalStyles } from '../components/GlobalStyles';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { SupportSection } from '../components/SupportSection';
import { CounterSection } from '../components/CounterSection';
import { WhySection } from '../components/WhySection';
import { InstallGuide } from '../components/InstallGuide';
import { LatestBlogs } from '../components/LatestBlogs';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';
import { StickyCTA } from '../components/StickyCTA';
import { PrivacyPolicy, TermsOfService, ContactUs } from '../components/LegalViews';

/**
 * Home Page Component
 */
export default function Home() {
  // --- States ---
  const [stars, setStars] = useState(0);
  const [featureIndex, setFeatureIndex] = useState(0);
  const [screenshotIndex, setScreenshotIndex] = useState(0);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [versionData, setVersionData] = useState({
    latest_version: 'v2.5.0',
    latest_apk_url: '#',
  });

  // --- Custom Hooks ---
  const { ref: counterRef, count } = useCountUp(587324, 2500);

  /**
   * Track APK Download clicks via Google Analytics
   */
  const trackDownload = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'download_click', {
        'event_category': 'Engagement',
        'event_label': 'APK Download',
        'value': 1,
        'version': versionData.latest_version
      });
    }
  };

  /**
   * Utility for scroll-based pagination/indexing
   */
  const handleHorizontalScroll = (e, setIndex) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.offsetWidth;
    const newIndex = Math.round(scrollLeft / width);
    setIndex(newIndex);
  };

  /**
   * Scroll to the installation guide section
   */
  const scrollToInstall = () => {
    const element = document.getElementById('install-guide');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- Effects ---
  useEffect(() => {
    // 1. Fetch GitHub Stars
    fetch('https://api.github.com/repos/shibaFoss/AIO-Video-Downloader')
      .then(res => res.json())
      .then(data => {
        if (data.stargazers_count) setStars(data.stargazers_count);
      })
      .catch(err => console.error('Error fetching stars:', err));

    // 2. Fetch Version Info
    fetch('https://raw.githubusercontent.com/shibaFoss/AIO-Video-Downloader/refs/heads/master/others/version_info.txt')
      .then(res => res.text())
      .then(text => {
        const lines = text.split('\n');
        const data = {};
        lines.forEach(line => {
          const [key, value] = line.split('=');
          if (key && value) data[key.trim()] = value.trim();
        });
        if (data.latest_version) setVersionData(data);
      })
      .catch(err => console.error('Error fetching version info:', err));

    // 3. Sticky CTA Scroll Logic
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

      <main>
        {/* Hero Section & Screenshot Slider */}
        <Hero 
          versionData={versionData} 
          onDownload={trackDownload}
          scrollToInstall={scrollToInstall}
          screenshotIndex={screenshotIndex}
          setScreenshotIndex={setScreenshotIndex}
          handleScroll={handleHorizontalScroll}
        />

        <SupportSection />

        <div className="premium-divider-orange" />

        {/* Dynamic Download Counter */}
        <CounterSection 
          count={count} 
          counterRef={counterRef} 
        />

        <div className="premium-divider-orange" />

        {/* Feature Highlights */}
        <WhySection 
          featureIndex={featureIndex}
          setFeatureIndex={setFeatureIndex}
          handleScroll={handleHorizontalScroll}
        />

        <div className="premium-divider-orange" />

        {/* Step-by-Step Install Guide */}
        <InstallGuide />

        <div className="premium-divider-orange" />

        {/* Latest Blog Insights */}
        <LatestBlogs />

        <div className="premium-divider-orange" />

        {/* User Reviews */}
        <Testimonials />
      </main>

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
}
