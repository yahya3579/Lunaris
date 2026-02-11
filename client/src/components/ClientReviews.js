import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ClientReviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [screenSize, setScreenSize] = useState("desktop");
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef(null);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const prevScreenSize = screenSize;
      const width = window.innerWidth;
      let newScreenSize;
      if (width < 768) {
        newScreenSize = "mobile"; // 1 card
      } else if (width < 992) {
        newScreenSize = "tablet"; // 2 cards
      } else {
        newScreenSize = "desktop"; // 3 cards
      }
      setScreenSize(newScreenSize);
      // Reset slide when switching between screen sizes
      if (prevScreenSize !== newScreenSize) {
        setCurrentSlide(0);
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [screenSize]);

  // Updated review data from user
  const reviews = [
    {
      id: 1,
      name: "Emilia Rossi",
      location: "Dubai Client",
      rating: 5,
      title: "Maximized Earnings & Friendly Team",
      review:
        "I had no idea I was undervaluing my property until Lunaris stepped in. They optimized everything, and now my monthly earnings have nearly doubled. On top of that, their team is incredibly approachable and easy to work with.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Ahmed Al Mansoori",
      location: "Dubai Client",
      rating: 5,
      title: "Luxury Property Partnership",
      review:
        "I've tried working with other co-hosts, but Lunaris truly feels like a partner. They are prompt, professional, and have a sharp understanding of managing luxury properties.",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Olivia Thompson",
      location: "US Client",
      rating: 5,
      title: "True Business Partner",
      review:
        "Lunaris transformed how I manage my property. Their insight and responsiveness make them more than just a co-host—they feel like a genuine partner in growing my business.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 4,
      name: "James Carter",
      location: "UK Client",
      rating: 4,
      title: "Proactive & Professional Co-host",
      review:
        "After collaborating with several co-hosts, I can confidently say Lunaris stands out. They're proactive, professional, and know exactly how to maximize a property's potential.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 5,
      name: "Sara Khalid",
      location: "Middle East Client",
      rating: 5,
      title: "Premium Listing Expertise",
      review:
        "I've worked with several property managers, but Lunaris is the first that truly understands the value of partnership. They are reliable, professional, and highly skilled in handling premium listings.",
      avatar:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 6,
      name: "Lukas Schneider",
      location: "European Client (Germany)",
      rating: 4,
      title: "Effortless Management & Revenue Growth",
      review:
        "Lunaris made managing my property effortless. Their insights increased my revenue and their team is always approachable and quick to help.",
      avatar:
        "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 7,
      name: "Emily Brooks",
      location: "Canadian Client",
      rating: 5,
      title: "Unmatched High-End Property Service",
      review:
        "I've worked with other co-hosts, but Lunaris feels like a real partner. Their professionalism, responsiveness, and knowledge of high-end properties are unmatched.",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    },
  ];

  // Calculate max slides based on screen size
  const getCardsToShow = () => {
    switch (screenSize) {
      case "mobile":
        return 1; // <768px
      case "tablet":
        return 2; // 768px-992px
      case "desktop":
        return 3; // ≥992px
      default:
        return 3;
    }
  };

  const cardsToShow = getCardsToShow();
  const maxSlide = Math.max(0, reviews.length - cardsToShow);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  }, [maxSlide]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  }, [maxSlide]);

  const goToSlide = (index) => {
    setCurrentSlide(Math.min(index, maxSlide));
  };

  // Autoplay effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Change slide every 4 seconds
    return () => clearInterval(interval);
  }, [currentSlide, screenSize, nextSlide]);

  // Function to check if card is in middle position
  const getCardPosition = (index) => {
    if (screenSize === "mobile") {
      return index === currentSlide ? "center" : "side";
    } else if (screenSize === "tablet") {
      const visibleCards = [currentSlide, currentSlide + 1];
      if (visibleCards.includes(index)) {
        return "center";
      }
      return "side";
    } else {
      // desktop
      const middleIndex = currentSlide + 1;
      if (index === middleIndex) {
        return "center";
      } else if (index === currentSlide || index === currentSlide + 2) {
        return "side";
      }
      return "hidden";
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
    setDragOffset(0);
    if (carouselRef.current) {
      carouselRef.current.style.cursor = "grabbing";
      carouselRef.current.style.userSelect = "none";
    }
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;

    e.preventDefault();
    setCurrentX(e.clientX);
    const offset = e.clientX - startX;
    setDragOffset(offset);
  }, [isDragging, startX]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);
    if (carouselRef.current) {
      carouselRef.current.style.cursor = "grab";
      carouselRef.current.style.userSelect = "auto";
    }

    const dragThreshold = 50; // Minimum drag distance to trigger slide change
    const dragDistance = currentX - startX;

    if (Math.abs(dragDistance) > dragThreshold) {
      if (dragDistance > 0) {
        // Dragged right - go to previous slide
        prevSlide();
      } else {
        // Dragged left - go to next slide
        nextSlide();
      }
    }

    setDragOffset(0);
  }, [isDragging, currentX, startX, prevSlide, nextSlide]);

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  // Touch drag handlers for mobile
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartX(e.touches[0].clientX);
      setCurrentX(e.touches[0].clientX);
      setDragOffset(0);
      if (carouselRef.current) {
        carouselRef.current.style.cursor = "grabbing";
        carouselRef.current.style.userSelect = "none";
      }
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    setCurrentX(e.touches[0].clientX);
    const offset = e.touches[0].clientX - startX;
    setDragOffset(offset);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (carouselRef.current) {
      carouselRef.current.style.cursor = "grab";
      carouselRef.current.style.userSelect = "auto";
    }
    const dragThreshold = 50;
    const dragDistance = currentX - startX;
    if (Math.abs(dragDistance) > dragThreshold) {
      if (dragDistance > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    setDragOffset(0);
  };

  // Add global mouse event listeners
  useEffect(() => {
    const handleGlobalMouseMove = (e) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, startX, currentX, handleMouseMove, handleMouseUp]);

  // Calculate transform with drag offset
  const getTransform = () => {
    const baseTransform = -currentSlide * (100 / cardsToShow);
    const dragTransform = isDragging
      ? (dragOffset / carouselRef.current?.offsetWidth) * 100
      : 0;
    return `translateX(${baseTransform + dragTransform}%)`;
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-orange-400 fill-current" : "text-gray-300"
          }`}
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ));
  };

  return (
    <motion.div
      className="client-reviews-section bg-gray-50 py-16"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center mb-8 w-full justify-center">
            {/* Left Arrow */}
            <svg
              width="32"
              height="12"
              viewBox="0 0 32 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path d="M12 6H0" stroke="#CBE9FF" strokeWidth="2" />
              <path d="M6 1L0 6L6 11" stroke="#CBE9FF" strokeWidth="2" />
            </svg>
            {/* Heading */}
            <h2
              className="text-[#1A2A49] font-bold text-2xl md:text-3xl tracking-wide"
              style={{
                fontFamily: "Orbitron, sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              CLIENT REVIEW
            </h2>
            {/* Right Line */}
            <div
              className="flex-1 ml-2 h-0.5 rounded-full"
              style={{ minWidth: "32px", background: "#CBE9FF" }}
            ></div>
          </div>
        </motion.div>

        {/* Reviews Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            className="overflow-hidden pt-12"
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              className={`flex ${isDragging
                ? ""
                : "transition-transform duration-300 ease-in-out"
                }`}
              style={{ transform: getTransform() }}
              initial={false}
              animate={isDragging ? {} : {}}
            >
              <AnimatePresence initial={false}>
                {reviews.map((review, index) => {
                  const cardPosition = getCardPosition(index);
                  const isCenter = cardPosition === "center";

                  return (
                    <motion.div
                      key={review.id}
                      className={`${screenSize === "mobile"
                        ? "w-full"
                        : screenSize === "tablet"
                          ? "w-1/2"
                          : "w-1/3"
                        } flex-shrink-0 px-4 ${isCenter ? "z-10" : "z-0"}`}
                      initial={{ opacity: 0, y: 40, scale: 0.95 }}
                      animate={{
                        opacity: 1,
                        y: isCenter ? -8 : 0,
                        scale: 1,
                      }}
                      exit={{ opacity: 0, y: 40, scale: 0.95 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.1 * index,
                        y: { duration: 0.3, ease: "easeOut" },
                      }}
                    >
                      <motion.div
                        className={`review-card bg-white rounded-lg p-6 border transition-all duration-300 ${isCenter
                          ? "shadow-lg border-blue-200 ring-2 ring-blue-100"
                          : "shadow-sm border-gray-100"
                          }`}
                        animate={{
                          scale: isCenter ? 1.08 : 1,
                          y: isCenter ? -12 : 0,
                        }}
                        whileHover={{
                          scale: isCenter ? 1.12 : 1.05,
                          y: isCenter ? -16 : -4,
                          boxShadow: isCenter
                            ? "0 20px 40px rgba(0,0,0,0.15)"
                            : "0 8px 32px rgba(0,0,0,0.10)",
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                        initial={false}
                      >
                        {/* User Info */}
                        <div className="flex items-center mb-4">
                          <motion.div
                            className="w-12 h-12 rounded-full bg-gray-200 mr-3 overflow-hidden"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                          >
                            <img
                              src={review.avatar}
                              alt={review.name}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm">
                              {review.name}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {review.location}
                            </p>
                          </div>
                        </div>
                        {/* Rating */}
                        <div className="flex items-center mb-3">
                          {renderStars(review.rating)}
                        </div>
                        {/* Review Title */}
                        <h5
                          className={`font-semibold mb-3 text-sm ${isCenter ? "text-blue-900" : "text-gray-900"
                            }`}
                        >
                          {review.title}
                        </h5>
                        {/* Review Text */}
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {review.review}
                        </p>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Pagination Dots with Arrows */}
          <motion.div
            className="flex justify-center items-center mt-8 space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Pagination Dots */}
            <div className="flex space-x-2">
              {[...Array(maxSlide + 1)].map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide
                    ? "bg-gray-800"
                    : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  whileHover={{ scale: 1.2 }}
                  initial={false}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClientReviews;