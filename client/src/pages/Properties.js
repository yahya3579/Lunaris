import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProperties } from '../store/slices/propertySlice';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import lunarisLogo from '../assets/images/Lunaris-management-logo.png';
import Footer from '../components/Footer';

const Properties = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    guests: ''
  });
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  // Autoplay for image slider
  useEffect(() => {
    const interval = setInterval(() => {
      filteredProperties.forEach(property => {
        if (property.images && property.images.length > 1) {
          setCurrentImageIndex(prev => ({
            ...prev,
            [property._id]: ((prev[property._id] || 0) + 1) % property.images.length
          }));
        }
      });
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, [filteredProperties]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Redux integration
  const dispatch = useAppDispatch();
  const { properties, loading } = useAppSelector(state => state.property);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  const handleSearch = () => {
    let filtered = properties;
    const locationInput = searchFilters.location.trim().toLowerCase();
    const guestsInput = searchFilters.guests.trim();
    const guestsNum = parseInt(guestsInput, 10);

    filtered = filtered.filter(p => {
      let locationMatch = true;
      let guestsMatch = true;
      // Location filter
      if (locationInput) {
        locationMatch = p.address && p.address.toLowerCase().includes(locationInput);
      }
      // Guests filter
      if (guestsInput && !isNaN(guestsNum)) {
        if (typeof p.guests !== 'undefined' && p.guests !== null) {
          guestsMatch = Number(p.guests) >= guestsNum;
        } else if (typeof p.maxGuests !== 'undefined' && p.maxGuests !== null) {
          guestsMatch = Number(p.maxGuests) >= guestsNum;
        } else if (p.details && typeof p.details.maxGuests !== 'undefined' && p.details.maxGuests !== null) {
          guestsMatch = Number(p.details.maxGuests) >= guestsNum;
        } else {
          guestsMatch = false;
        }
      }
      // If both filters are provided, both must match. If only one is provided, only that must match.
      if (locationInput && guestsInput && !isNaN(guestsNum)) {
        return locationMatch && guestsMatch;
      } else if (locationInput) {
        return locationMatch;
      } else if (guestsInput && !isNaN(guestsNum)) {
        return guestsMatch;
      }
      return true;
    });
    setFilteredProperties(filtered);
  };

  const nextImage = (propertyId, totalImages) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (propertyId, totalImages) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const goToImage = (propertyId, imageIndex) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [propertyId]: imageIndex
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="relative z-20 px-4 sm:px-6 lg:px-8 py-3 sm:py-4" style={{ backgroundColor: '#121b2d' }}>
        <div className="flex items-center justify-between">
          {/* Logo - Using actual logo image */}
          <div className="flex items-center space-x-3">
            <Link to="/">
              <img
                src={lunarisLogo}
                alt="Lunaris Management & Co."
                className="h-12 w-24 sm:h-16 sm:w-32 lg:h-20 lg:w-48"
              />
            </Link>
          </div>

          {/* Navigation Links - Exact match to design */}
          <div className="hidden md:flex items-center space-x-8 text-white text-sm">
            <Link to="/" className="hover:text-blue-300 transition-colors font-medium">
              Home
            </Link>
            <Link to="/about" className="hover:text-blue-300 transition-colors font-medium">
              About
            </Link>
            <Link to="/properties" className="hover:text-blue-300 transition-colors font-medium">
              Properties
            </Link>
            <Link to="/contact" className="hover:text-blue-300 transition-colors font-medium">
              Contact us
            </Link>
            <a
              href="https://calendly.com/lunarismanagement14/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border border-white/60 px-5 py-2 rounded-full hover:bg-white hover:text-slate-900 transition-all font-medium"
            >
              Book a Meeting
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
        <div className={`md:hidden fixed inset-0 bg-slate-900/95 backdrop-blur-sm transition-all duration-300 z-40 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}>
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-white text-lg">
            <Link
              to="/"
              className="hover:text-blue-300 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-blue-300 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/properties"
              className="hover:text-blue-300 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Properties
            </Link>
            <Link
              to="/contact"
              className="hover:text-blue-300 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact us
            </Link>
            <a
              href="https://calendly.com/lunarismanagement14/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border border-white/60 px-5 py-2 rounded-full hover:bg-white hover:text-slate-900 transition-all font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book a Meeting
            </a>
          </div>
        </div>
      </nav>

      {/* Page Header with Curvy/Wavy Background Design */}
      <motion.div
        className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
        style={{ backgroundColor: '#121b2d' }}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Wavy Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Primary Wave */}
          <div className="absolute inset-0">
            <svg
              viewBox="0 0 1200 800"
              className="w-full h-full absolute inset-0"
              style={{ transform: 'scale(1.1) sm:scale(1.2)' }}
            >
              <defs>
                <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'rgba(59, 130, 246, 0.15)', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: 'rgba(147, 51, 234, 0.15)', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: 'rgba(59, 130, 246, 0.15)', stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'rgba(147, 51, 234, 0.12)', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: 'rgba(59, 130, 246, 0.12)', stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'rgba(16, 185, 129, 0.08)', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: 'rgba(59, 130, 246, 0.08)', stopOpacity: 1 }} />
                </linearGradient>
              </defs>

              {/* Big Curly Wave Paths - Static */}
              <path
                d="M0,300 C200,150 400,450 600,200 C800,50 1000,400 1200,250 L1200,800 L0,800 Z"
                fill="url(#waveGradient1)"
              />
              <path
                d="M0,450 C150,250 350,650 550,350 C750,150 950,550 1200,400 L1200,800 L0,800 Z"
                fill="url(#waveGradient2)"
              />
              <path
                d="M0,550 C250,300 450,750 650,450 C850,250 1050,650 1200,500 L1200,800 L0,800 Z"
                fill="url(#waveGradient3)"
              />
              <path
                d="M0,650 C300,400 500,850 700,550 C900,350 1100,750 1200,600 L1200,800 L0,800 Z"
                fill="rgba(59, 130, 246, 0.06)"
              />
            </svg>
          </div>

          {/* Static Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-blue-400 opacity-20"
                style={{
                  width: Math.random() * 4 + 2 + 'px',
                  height: Math.random() * 4 + 2 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%'
                }}
              />
            ))}
          </div>

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(18, 27, 45, 0.1) 0%, rgba(18, 27, 45, 0.9) 100%)'
            }}
          />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6" style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.05em' }}>
            PROPERTIES
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto leading-relaxed px-4">
            Discover your perfect property with our curated selection of premium accommodations
          </p>
        </motion.div>

        {/* Bottom Curvy/Wavy Border */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            viewBox="0 0 1200 160"
            className="w-full h-24 sm:h-28 md:h-32"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="bottomWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'rgba(248, 250, 252, 0.9)', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: 'rgba(248, 250, 252, 1)', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'rgba(248, 250, 252, 0.9)', stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="bottomWaveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'rgba(248, 250, 252, 0.8)', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: 'rgba(248, 250, 252, 0.9)', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'rgba(248, 250, 252, 0.8)', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <path
              d="M0,80 C200,20 400,140 600,60 C800,10 1000,120 1200,80 L1200,160 L0,160 Z"
              fill="url(#bottomWaveGradient)"
            />
            <path
              d="M0,100 C150,40 350,160 550,80 C750,20 950,140 1200,100 L1200,160 L0,160 Z"
              fill="url(#bottomWaveGradient2)"
            />
            <path
              d="M0,120 C300,60 500,180 700,100 C900,40 1100,160 1200,120 L1200,160 L0,160 Z"
              fill="rgba(248, 250, 252, 0.6)"
            />
          </svg>
        </div>
      </motion.div>

      {/* Search Filters - Location and Guests only */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center rounded-2xl sm:rounded-full shadow-md border border-gray-200 overflow-hidden" style={{ background: 'linear-gradient(135deg, #C3DFED 0%, #E7EDEF 100%)' }}>
          {/* Location */}
          <div className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border-b sm:border-b-0 sm:border-r border-gray-200">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-900 uppercase tracking-wide">Location</label>
              <input
                type="text"
                placeholder="Where are you going?"
                className="w-full text-sm text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent font-medium"
                value={searchFilters.location}
                onChange={(e) => setSearchFilters({ ...searchFilters, location: e.target.value })}
              />
            </div>
          </div>

          {/* Guests */}
          <div className="flex-1 px-4 sm:px-6 py-3 sm:py-4">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-900 uppercase tracking-wide">Guests</label>
              <input
                type="text"
                placeholder="Add guests"
                className="w-full text-sm text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent font-medium"
                value={searchFilters.guests}
                onChange={(e) => setSearchFilters({ ...searchFilters, guests: e.target.value })}
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="px-2 py-2 sm:py-0 flex justify-center">
            <button
              onClick={handleSearch}
              className="bg-[#172c3e] hover:bg-[#325d83] text-white p-3 rounded-full transition-colors duration-200 flex items-center justify-center shadow-lg w-full sm:w-auto"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Properties Grid - Matching the exact layout from image */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12,
            },
          },
        }}
      >
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {loading ? (
            <div className="text-center col-span-4 py-8">Loading properties...</div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center col-span-4 py-8">No properties found.</div>
          ) : filteredProperties.map((property, idx) => {
            const currentIndex = currentImageIndex[property._id] || 0;
            return (
              <motion.div
                key={property._id}
                className="group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: idx * 0.08 }}
              >
                {/* Property Image Slider */}
                <motion.div
                  className="relative overflow-hidden rounded-xl mb-3"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                >
                  <motion.img
                    src={property.images && property.images.length > 0
                      ? (property.images[currentIndex].startsWith('http')
                        ? property.images[currentIndex]
                        : `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/public/images/properties/${property.images[currentIndex]}`)
                      : '/default-property.jpg'}
                    alt={property.title}
                    className="w-full h-64 object-cover"
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  />
                  {/* Navigation Arrows */}
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage(property._id, property.images.length);
                        }}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
                      >
                        <FaChevronLeft className="w-3 h-3 text-gray-800" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage(property._id, property.images.length);
                        }}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
                      >
                        <FaChevronRight className="w-3 h-3 text-gray-800" />
                      </button>
                    </>
                  )}
                  {/* Image Dots Indicator */}
                  {property.images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10">
                      {property.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            goToImage(property._id, index);
                          }}
                          className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                              ? 'bg-white'
                              : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                            }`}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
                {/* Property Details */}
                <Link to={`/property/${property._id}`}>
                  <div className="space-y-1 px-2 py-2 md:px-0 md:py-0">
                    {/* Property Name */}
                    <h2 className="font-bold text-gray-900 text-base mb-2">
                      {property.title}
                    </h2>
                    {/* Location and Rating */}
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {property.address}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <svg
                          className="w-4 h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-900">
                          {property.rating && typeof property.rating === 'object' ? property.rating.average : property.rating}
                        </span>
                      </div>
                    </div>
                    {/* Distance */}
                    <p className="text-sm text-gray-600">
                      {property.distance}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Properties;
