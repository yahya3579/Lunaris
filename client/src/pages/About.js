import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import lunarisLogo from '../assets/images/Lunaris-management-logo.png';
import aboutUsImg from '../assets/images/about3.jpg';
import landingBgJpeg from '../assets/images/landing-bg.jpeg';
import Footer from '../components/Footer';

// Animated counter helper
const AnimatedCounter = ({ target, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const About = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Parallax effect for hero
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 100]);

  const values = [
    {
      title: 'Pricing Intelligence',
      description: 'Data-driven pricing strategies that respond to market demand in real-time.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: 'Brand Clarity',
      description: 'Strategic positioning that makes your property stand out in competitive markets.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
    },
    {
      title: 'Operational Discipline',
      description: 'Systematic processes that ensure consistency, quality, and efficiency at every step.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'Guest Experience Control',
      description: 'Premium hospitality standards that drive 5-star reviews and repeat bookings.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-light)' }}>
      {/* Hero Section with Background */}
      <motion.div
        ref={heroRef}
        className="relative bg-cover bg-center bg-no-repeat min-h-[420px] flex flex-col"
        style={{
          backgroundImage: `url(${landingBgJpeg})`,
          y,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55"></div>

        {/* Navigation */}
        <nav className="relative z-20 px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img
                src={lunarisLogo}
                alt="Lunaris Management & Co."
                className="h-12 w-24 sm:h-16 sm:w-32 lg:h-20 lg:w-40"
              />
            </Link>

            {/* Mobile Menu Button */}
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

            {/* Mobile Menu Overlay */}
            <div className={`md:hidden fixed inset-0 bg-slate-900/95 backdrop-blur-sm transition-all duration-300 z-40 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
              <div className="flex flex-col items-center justify-center h-full space-y-8 text-white text-lg">
                <Link to="/" className="hover:text-blue-300 transition-colors font-medium" onClick={closeMobileMenu}>Home</Link>
                <Link to="/about" className="hover:text-blue-300 transition-colors font-medium" onClick={closeMobileMenu}>About</Link>
                <Link to="/properties" className="hover:text-blue-300 transition-colors font-medium" onClick={closeMobileMenu}>Properties</Link>
                <Link to="/contact" className="hover:text-blue-300 transition-colors font-medium" onClick={closeMobileMenu}>Contact us</Link>
                <a href="https://calendly.com/lunarismanagement14/30min" target="_blank" rel="noopener noreferrer" className="bg-white/10 border border-white/40 px-6 py-2.5 rounded-full hover:bg-white hover:text-slate-900 transition-all font-semibold" onClick={closeMobileMenu}>Book a Free Strategy Call</a>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8 text-white text-sm">
              <Link to="/" className="hover:text-blue-200 transition-colors duration-300 font-medium">
                Home
              </Link>
              <Link to="/about" className="text-blue-200 font-medium">
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
                className="bg-white/10 backdrop-blur-sm border border-white/40 px-5 py-2.5 rounded-full hover:bg-white hover:text-slate-900 transition-all duration-300 font-semibold text-xs lg:text-sm"
              >
                Book a Free Strategy Call
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center flex-1 px-4 sm:px-6 py-12">
          <motion.div
            className="text-center text-white max-w-3xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ color: '#FFFFFF' }}>
              Built on Strategy.{' '}
              <span style={{ color: 'var(--color-accent)' }}>Driven by Performance.</span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-100/85 max-w-2xl mx-auto leading-relaxed">
              Elevating short-term rental properties through structured revenue strategy and operational excellence.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="pt-0">
        {/* About Us Core Section */}
        <motion.section
          className="section-padding bg-white"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Left Content */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
              >
                <motion.div
                  className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-blue-700 tracking-wide">Who We Are</span>
                </motion.div>

                <h2 className="text-3xl sm:text-4xl font-bold leading-tight" style={{ color: 'var(--color-text-dark)' }}>
                  Our Story
                </h2>

                <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-medium)' }}>
                  Lunaris Management & Co. was founded with a single objective — to elevate short‑term
                  rental properties through <strong style={{ color: 'var(--color-text-dark)' }}>structured revenue strategy</strong> and{' '}
                  <strong style={{ color: 'var(--color-text-dark)' }}>operational excellence</strong>.
                </p>

                <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-medium)' }}>
                  We combine hospitality expertise with data-driven pricing systems to deliver
                  measurable financial growth. Our approach is structured, analytical, and performance-oriented.
                </p>

                <motion.div
                  className="p-5 rounded-xl border-l-4"
                  style={{
                    borderColor: 'var(--color-primary-light)',
                    backgroundColor: 'var(--color-accent-light)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <p className="text-base font-semibold" style={{ color: 'var(--color-primary)' }}>
                    We don't rely on luck. <span className="italic">We rely on systems.</span>
                  </p>
                </motion.div>
              </motion.div>

              {/* Right Content - Image */}
              <motion.div
                className="flex justify-center items-center mt-8 lg:mt-0"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 aspect-[4/3] w-full max-w-lg bg-white">
                  <img
                    src={aboutUsImg}
                    alt="Lunaris Management Team"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Our Philosophy Section */}
        <motion.section
          className="section-padding-lg relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-medium) 50%, var(--color-primary-light) 100%)',
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-32 h-32 border border-white rounded-full"></div>
            <div className="absolute bottom-20 right-10 w-24 h-24 border border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Header */}
            <div className="text-center mb-12 sm:mb-16">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto"
                style={{ backgroundColor: 'var(--color-accent)' }}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <svg className="w-8 h-8" style={{ color: 'var(--color-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </motion.div>

              <h2 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                Our Philosophy
              </h2>
              <div className="w-24 h-1 mx-auto rounded-full mb-8" style={{ background: 'var(--color-accent)' }}></div>

              <motion.p
                className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-medium mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Great hosting is not accidental.
              </motion.p>

              <motion.p
                className="text-base sm:text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                It is built through pricing intelligence, brand clarity, operational discipline,
                and guest experience control.
              </motion.p>
            </div>

            {/* Philosophy Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-accent) 0%, rgba(203, 233, 255, 0.5) 100%)',
                      color: 'var(--color-primary)',
                    }}
                  >
                    {value.icon}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-blue-100/70 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-accent)' }}></div>
                <span className="text-white font-medium text-sm sm:text-base">Built on Systems. Driven by Results.</span>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-accent)' }}></div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Impact / Stats Section */}
        <motion.section
          className="section-padding bg-white"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Content - What sets us apart */}
              <div className="space-y-6">
                <motion.div
                  className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-blue-700 tracking-wide">Our Approach</span>
                </motion.div>

                <h2 className="text-3xl sm:text-4xl font-bold leading-tight" style={{ color: 'var(--color-text-dark)' }}>
                  What Sets Us Apart
                </h2>

                <div className="space-y-4">
                  {[
                    'Strategic revenue focus, not just operations',
                    'Transparent reporting and financial clarity',
                    'Premium guest experience standards',
                    'Scalable systems built for long-term growth',
                    'Dedicated management oversight',
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div
                        className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: 'var(--color-accent-light)', color: 'var(--color-primary)' }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-base font-medium" style={{ color: 'var(--color-text-dark)' }}>
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Content - Stats */}
              <motion.div
                className="rounded-2xl p-6 sm:p-8 text-white mt-8 lg:mt-0"
                style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)' }}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center">Our Impact</h3>
                <div className="grid grid-cols-2 gap-6">
                  <motion.div
                    className="text-center p-4 rounded-xl bg-white/5 border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--color-accent)' }}>
                      <AnimatedCounter target={120} suffix="+" />
                    </div>
                    <div className="text-xs sm:text-sm text-blue-100/80">Properties Managed</div>
                  </motion.div>
                  <motion.div
                    className="text-center p-4 rounded-xl bg-white/5 border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--color-accent)' }}>
                      <AnimatedCounter target={95} suffix="%" />
                    </div>
                    <div className="text-xs sm:text-sm text-blue-100/80">Client Satisfaction</div>
                  </motion.div>
                  <motion.div
                    className="text-center p-4 rounded-xl bg-white/5 border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--color-accent)' }}>
                      <AnimatedCounter target={1000} suffix="+" duration={2500} />
                    </div>
                    <div className="text-xs sm:text-sm text-blue-100/80">Happy Guests</div>
                  </motion.div>
                  <motion.div
                    className="text-center p-4 rounded-xl bg-white/5 border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--color-accent)' }}>24/7</div>
                    <div className="text-xs sm:text-sm text-blue-100/80">Support Available</div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section
          className="section-padding"
          style={{ backgroundColor: 'var(--color-accent)' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-6" style={{ color: 'var(--color-primary)', fontFamily: 'Inter, sans-serif' }}>
              Ready to Transform Your Property?
            </h2>
            <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto" style={{ color: 'var(--color-text-medium)' }}>
              Join the growing number of property owners who trust Lunaris to maximize their investment returns while providing exceptional guest experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/lunarismanagement14/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Schedule Your Strategy Call
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <Link
                to="/contact"
                className="btn-outline-dark"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;