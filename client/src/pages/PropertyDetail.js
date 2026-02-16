import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPropertyById } from '../store/slices/propertySlice';
import { FaStar, FaChevronLeft, FaChevronRight, FaHeart, FaShare, FaMapMarkerAlt } from 'react-icons/fa';
import lunarisLogo from '../assets/images/Lunaris-management-logo.png';
import lunarisColorfulLogo from '../assets/lunaris-logo.png';
import Footer from '../components/Footer';

const PropertyDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProperty, loading, error } = useSelector(state => state.property);
  console.log('Selected Property:', selectedProperty); // Debug log
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDates] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchPropertyById(id));
    }
  }, [id, dispatch]);

  // State for amenities see more
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  // Use property from Redux store
  const propertyData = selectedProperty && selectedProperty.property ? selectedProperty.property : {};

  // Helper: prepend image path for property images (same as AdminDashboard)
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const getImageUrl = (imgSrc) => {
    if (typeof imgSrc === 'string' && (imgSrc.startsWith('http://') || imgSrc.startsWith('https://'))) {
      return imgSrc;
    } else if (typeof imgSrc === 'string') {
      return `${API_BASE_URL}/public/images/properties/${imgSrc}`;
    } else {
      return '';
    }
  };

  const nextImage = () => {
    if (propertyData && Array.isArray(propertyData.images) && propertyData.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % propertyData.images.length);
    }
  };

  const prevImage = () => {
    if (propertyData && Array.isArray(propertyData.images) && propertyData.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + propertyData.images.length) % propertyData.images.length);
    }
  };

  const handleBooking = () => { // eslint-disable-line no-unused-vars
    console.log('Booking details:', selectedDates);
    // Implement booking functionality
  };

  const handleShare = async () => {
    const shareData = {
      title: propertyData.name,
      text: `Check out this amazing property: ${propertyData.name} in ${propertyData.location}`,
      url: window.location.href
    };

    try {
      // Check if Web Share API is supported
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Property link copied to clipboard!');
      }
    } catch (error) {
      // Additional fallback for older browsers
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Property link copied to clipboard!');
      } catch (clipboardError) {
        // Manual fallback - show the URL in a prompt
        prompt('Copy this link to share:', window.location.href);
      }
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }
  if (!propertyData) {
    return <div className="min-h-screen flex items-center justify-center">No property found.</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="relative z-20 px-4 sm:px-6 lg:px-8 py-3 sm:py-4" style={{ backgroundColor: '#121b2d' }}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src={lunarisLogo}
              alt="Lunaris Management & Co."
              className="h-12 w-24 sm:h-16 sm:w-32 lg:h-20 lg:w-48"
            />
          </div>

          {/* Navigation Links */}
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
              Book a Free Strategy Call
            </a>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/properties" className="hover:text-gray-800 transition-colors">Properties</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{propertyData.title || propertyData.name}</span>
        </div>
      </div>

      {/* Property Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {propertyData.title || propertyData.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center">
                <FaStar className="w-4 h-4 text-black mr-1" />
                <span className="font-semibold">{propertyData.rating && propertyData.rating.average ? propertyData.rating.average : '-'}</span>
                <span className="text-gray-600 ml-1">({propertyData.rating && propertyData.rating.count ? propertyData.rating.count : 0} reviews)</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                <span>{propertyData.address || propertyData.location}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FaShare className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <FaHeart className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 relative z-10">
        {/* Desktop View - Grid Layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-4 gap-2 h-96 overflow-hidden rounded-lg">
            {/* Main Image */}
            <div className="relative col-span-2 row-span-2">
              {Array.isArray(propertyData.images) && propertyData.images[0] && (
                <img
                  src={getImageUrl(propertyData.images[0])}
                  alt={propertyData.title || propertyData.name}
                  className="w-full h-full object-cover rounded-l-lg"
                />
              )}
            </div>

            {/* Grid Images */}
            {Array.isArray(propertyData.images) && propertyData.images.slice(1, 5).map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={getImageUrl(image)}
                  alt={`${propertyData.title || propertyData.name} ${index + 2}`}
                  className={`w-full h-full object-cover ${index === 1 ? 'rounded-tr-lg' :
                    index === 3 ? 'rounded-br-lg' : ''
                    }`}
                />
                {index === 3 && Array.isArray(propertyData.images) && propertyData.images.length > 5 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-br-lg z-20">
                    <span className="text-white font-semibold">+{propertyData.images.length - 5} more</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet View - Single Image with Thumbnails */}
        <div className="lg:hidden">
          {/* Main Image */}
          <div className="relative h-64 md:h-80 mb-4">
            {Array.isArray(propertyData.images) && propertyData.images[currentImageIndex] && (
              <img
                src={getImageUrl(propertyData.images[currentImageIndex])}
                alt={propertyData.title || propertyData.name}
                className="w-full h-full object-cover rounded-lg"
              />
            )}

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
            >
              <FaChevronLeft className="w-4 h-4 text-gray-800" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
            >
              <FaChevronRight className="w-4 h-4 text-gray-800" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              {Array.isArray(propertyData.images) ? currentImageIndex + 1 : 0} / {Array.isArray(propertyData.images) ? propertyData.images.length : 0}
            </div>
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {Array.isArray(propertyData.images) && propertyData.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 relative ${currentImageIndex === index ? 'ring-2 ring-blue-500' : ''
                  }`}
              >
                <img
                  src={getImageUrl(image)}
                  alt={`${propertyData.title || propertyData.name} thumbnail ${index + 1}`}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
                />
                {currentImageIndex === index && (
                  <div className="absolute inset-0 bg-blue-500/20 rounded-lg"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Info */}
            <div className="border-b border-gray-200 pb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex w-full items-center justify-between">
                  <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{propertyData.title || propertyData.name}</h2>
                      <p className="text-gray-600">
                        {propertyData.details && propertyData.details.maxGuests ? propertyData.details.maxGuests : '-'} guests • {propertyData.details && propertyData.details.bedrooms ? propertyData.details.bedrooms : '-'} bedrooms • {propertyData.details && propertyData.details.bathrooms ? propertyData.details.bathrooms : '-'} bathrooms
                      </p>
                    </div>
                    <a
                      href={`https://wa.me/923199911931?text=${encodeURIComponent(`Hello! I want to contact regarding the property "${propertyData.title || propertyData.name}" for details or booking.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow transition-colors sm:ml-4 w-full sm:w-auto justify-center"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <FaIcons.FaWhatsapp className="w-5 h-5" />
                      <span>Contact for details/booking</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Hosted by Lunaris Management */}
              <div className="border-t border-b border-gray-200 py:4 sm:py-6 mb-8 flex items-center gap-3">
                <img src={lunarisColorfulLogo} alt="Lunaris Management" className="h-6 w-auto ml-2" />
                <span className="font-medium text-gray-900">Listed by Lunaris Management</span>
              </div>
              {/* Property Features from DB */}
              <div className="space-y-6 my-8">
                {Array.isArray(propertyData.features) && propertyData.features.map((feature, idx) => {
                  const IconComp = feature.icon && FaIcons[feature.icon] ? FaIcons[feature.icon] : FaIcons.FaPlus;
                  return (
                    <div key={feature._id || idx} className="flex items-start space-x-4">
                      <div className="w-8 h-8 flex items-center justify-center">
                        <IconComp className="w-6 h-6 text-gray-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{feature.name}</h4>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="text-gray-700 leading-relaxed">{propertyData.description}</p>
            </div>

            {/* What this place offers */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">What this place offers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(() => {
                  const amenities = Array.isArray(propertyData.amenities) ? propertyData.amenities : [];
                  const visibleAmenities = showAllAmenities ? amenities : amenities.slice(0, 6);
                  return (
                    <>
                      {visibleAmenities.map((amenity, index) => {
                        const IconComp = amenity.icon && FaIcons[amenity.icon] ? FaIcons[amenity.icon] : FaIcons.FaPlus;
                        return (
                          <div key={amenity._id || index} className="flex items-center space-x-3">
                            <IconComp className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-700">{amenity.name}</span>
                          </div>
                        );
                      })}
                      {amenities.length > 6 && !showAllAmenities && (
                        <div className="col-span-full flex justify-center mt-4">
                          <button
                            className="px-4 py-1.5 bg-blue-100 border border-black text-black font-bold rounded-lg hover:bg-blue-200 transition-all text-base"
                            onClick={() => setShowAllAmenities(true)}
                          >
                            {`Show all ${amenities.length - 6} amenities`}
                          </button>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Reviews */}
            <div>
              {/* Reviews Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <FaStar className="w-6 h-6 text-yellow-400" />
                  <span className="text-2xl font-bold text-gray-900">{propertyData.rating && propertyData.rating.average ? propertyData.rating.average : '-'}</span>
                  <span className="text-xl font-semibold text-gray-700">• {propertyData.rating && propertyData.rating.count ? propertyData.rating.count : 0} reviews</span>
                </div>
              </div>
              {/* Reviews Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Array.isArray(propertyData.reviews) && propertyData.reviews.length > 0 ? (
                  propertyData.reviews.map((review, idx) => (
                    <div key={review._id || idx} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3 mb-4">
                        <img
                          src={review.photo ? getImageUrl(review.photo) : 'https://via.placeholder.com/48'}
                          alt={review.user}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{review.user}</p>
                          <p className="text-sm text-gray-500">
                            {review.date ? new Date(review.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : ''}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.review}</p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-gray-500">No reviews yet.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default PropertyDetail;
