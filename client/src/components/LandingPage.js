import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import lunarisLogo from '../assets/images/Lunaris-management-logo.png';
import landingPageBg from '../assets/images/landing-page.svg';
import landingBgJpeg from '../assets/images/landing-bg.jpeg';

// Animated Counter Component
const AnimatedCounter = ({ target, suffix = '', prefix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseInt(target);
    const stepTime = Math.max(Math.floor(duration / end), 20);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
};

const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1200);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1200);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: isLargeScreen ? `url(${landingPageBg})` : `url(${landingBgJpeg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark Overlay for readability */}
      <div className={`absolute inset-0 ${isLargeScreen ? 'bg-black/30' : 'bg-black/50'}`}></div>

      {/* Navigation */}
      <motion.nav
        className="relative z-20 px-6 sm:px-8 py-4"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/">
              <img
                src={lunarisLogo}
                alt="Lunaris Management & Co."
                className="h-16 w-32 sm:h-20 sm:w-40 lg:h-20 lg:w-48"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-white text-sm">
            <Link to="/" className="hover:text-blue-200 transition-colors duration-300 font-medium">
              Home
            </Link>
            <Link to="/about" className="hover:text-blue-200 transition-colors duration-300 font-medium">
              About
            </Link>
            <Link to="/properties" className="hover:text-blue-200 transition-colors duration-300 font-medium">
              Properties
            </Link>
            <Link to="/contact" className="hover:text-blue-200 transition-colors duration-300 font-medium">
              Contact us
            </Link>
            <a
              href="https://calendly.com/lunarismanagement14/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm border border-white/40 px-6 py-2.5 rounded-full hover:bg-white hover:text-slate-900 transition-all duration-300 font-semibold"
            >
              Book a Free Strategy Call
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white p-2 relative z-50"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="md:hidden fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-40"
            >
              <div className="flex flex-col items-center justify-center h-full space-y-8 text-white text-lg">
                <Link to="/" className="hover:text-blue-300 transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </Link>
                <Link to="/about" className="hover:text-blue-300 transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  About
                </Link>
                <Link to="/properties" className="hover:text-blue-300 transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Properties
                </Link>
                <Link to="/contact" className="hover:text-blue-300 transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Contact us
                </Link>
                <a
                  href="https://calendly.com/lunarismanagement14/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 border border-white/40 px-6 py-2.5 rounded-full hover:bg-white hover:text-slate-900 transition-all font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book a Free Strategy Call
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Content */}
      <div className="relative z-10 px-6 sm:px-8 pt-8 md:pt-4 pb-24 xl:pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-start justify-center min-h-[calc(100vh-220px)]">
            {/* Main Headline */}
            <motion.div
              className="text-white max-w-3xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white"
                style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em', color: '#FFFFFF' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                Turn Your Property Into a{' '}
                <span className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                  High‑Performing Asset.
                </span>
              </motion.h1>

              {/* Sub Headline */}
              <motion.p
                className="text-base sm:text-lg md:text-xl text-white font-semibold max-w-2xl leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                Strategic short‑term rental revenue management, professional co‑hosting, and full
                property operations built to maximize income and guest experience.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
                <a
                  href="https://calendly.com/lunarismanagement14/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-center"
                  id="hero-cta-primary"
                >
                  Book a Free Strategy Call
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <button
                  onClick={scrollToServices}
                  className="btn-secondary text-center"
                  id="hero-cta-secondary"
                >
                  See How We Increase Revenue
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </motion.div>

              {/* Trust Line */}
              <motion.div
                className="flex flex-wrap items-center text-sm sm:text-base text-blue-100/70 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.0 }}
              >
                <span>Data‑driven pricing</span>
                <span className="trust-separator"></span>
                <span>24/7 guest support</span>
                <span className="trust-separator"></span>
                <span>Performance reporting</span>
                <span className="trust-separator"></span>
                <span>Brand growth strategy</span>
              </motion.div>

              {/* Animated Revenue Counter */}
              <motion.div
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white font-bold text-lg sm:text-xl">
                  <AnimatedCounter target={32} prefix="+" suffix="%" duration={2000} />
                </span>
                <span className="text-blue-100/80 text-sm sm:text-base">Revenue Growth Average</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Smooth Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-white/50 text-xs mb-2 tracking-widest uppercase">Scroll</span>
        <motion.div
          className="animate-scroll-indicator"
        >
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LandingPage;
