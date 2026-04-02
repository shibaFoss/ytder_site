import React, { useState } from 'react';

// Hooks
import { useCountUp } from '../hooks/useCountUp';
import { useApp } from '../context/AppContext';

// Components
import { MainLayout } from '../components/MainLayout';
import { Hero } from '../components/Hero';
import { SupportSection } from '../components/SupportSection';
import { CounterSection } from '../components/CounterSection';
import { WhySection } from '../components/WhySection';
import { InstallGuide } from '../components/InstallGuide';
import { LatestBlogs } from '../components/LatestBlogs';
import { Testimonials } from '../components/Testimonials';

/**
 * Home Page Component
 */
export default function Home() {
  const { versionData, trackDownload } = useApp();

  // --- Local States ---
  const [featureIndex, setFeatureIndex] = useState(0);
  const [screenshotIndex, setScreenshotIndex] = useState(0);

  // --- Custom Hooks ---
  const { ref: counterRef, count } = useCountUp(587324, 2500);

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

  return (
    <MainLayout>
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

        {/* User Reviews */}
        <Testimonials />

        <div className="premium-divider-orange" />

        {/* Latest Blog Insights */}
        <LatestBlogs />

        <div className="premium-divider-orange" />
      </main>
    </MainLayout>
  );
}
