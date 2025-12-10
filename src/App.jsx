import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import SideNav from './components/SideNav';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Projects from './components/Projects';
import Calendar from './components/Calendar';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import ApplySection from './components/ApplySection';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 0.8, // Snappier
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleScroll = () => {
      // Check if at bottom
      const totalHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.innerHeight + window.scrollY;
      // Relaxed threshold to ensure it catches the bottom
      setIsAtBottom(totalHeight - scrollPosition <= 50);

      // Failsafe: If at the very top, always activate 'hero'
      if (window.scrollY < 100) {
        if (activeSection !== 'hero') setActiveSection('hero');
        return; // Skip complex calculation
      }

      const sections = ['hero', 'about', 'projects', 'calendar', 'testimonials', 'faq', 'apply'];

      let currentSection = activeSection;
      let minDistance = Infinity;
      const viewportCenter = window.innerHeight / 2;

      // Find the section closest to the center of the viewport
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Calculate distance from section center to viewport center
          const elementCenter = rect.top + (rect.height / 2);
          const distance = Math.abs(elementCenter - viewportCenter);

          // Threshold: Only switch if the section is reasonably visible or close
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = sectionId;
          }
        }
      }

      // Update state only if changed
      // Priority: 1. Top (Hero) 2. Bottom (Apply) 3. ScrollSpy (Middle)
      if (document.documentElement.scrollHeight - (window.innerHeight + window.scrollY) <= 50) {
        if (activeSection !== 'apply') setActiveSection('apply');
      } else if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <div className="App">
      <SideNav activeSection={activeSection} />
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <AboutUs />
        <Projects />
        <Calendar />
        <Testimonials />
        <FAQ />
        <ApplySection />
      </main>
      <Footer />

      {/* Global Scroll Indicator */}
      <AnimatePresence>
        {!isAtBottom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.5 },
              y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{
              position: 'fixed',
              bottom: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 100,
              pointerEvents: 'none',
              color: 'var(--color-primary)'
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '50%',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(4px)'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
