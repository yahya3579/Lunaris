import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import houseImage from "../assets/images/landing-section.png"; // replace with your image path
import { useNavigate } from "react-router-dom";
import TextType from "./TextType";


export default function PropertyHero({ onSearch }) {
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState("");
  const navigate = useNavigate();

  // Scroll animation hooks
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ location, guests });
    }
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (guests) params.append("guests", guests);
    navigate(`/properties?${params.toString()}`);
  };

  // Animation variants
  const mainVariant = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring" } },
  };

  return (
    <motion.div
      ref={ref}
      variants={mainVariant}
      initial="hidden"
      animate={controls}
      className="bg-white py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="bg-white p-3 sm:p-4 md:p-6 lg:p-8 rounded-lg">
          {/* ...existing code... */}
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6 lg:gap-8 xl:gap-12">
            {/* Left Image */}
            <motion.div
              className="flex-shrink-0 rounded-3xl overflow-hidden w-full lg:w-1/2 xl:w-auto"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <motion.img
                src={houseImage}
                alt="House"
                className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px] h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] xl:h-[320px] object-cover rounded-3xl mx-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              />
            </motion.div>

            {/* Right Content */}
            <motion.div
              className="flex flex-col justify-between h-full w-full lg:w-1/2 xl:flex-1"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
            >
              {/* Top Text */}
              <motion.div
                className="text-center lg:text-left"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold tracking-wider uppercase text-gray-800 leading-tight">
                  Be a Co-Landlord <br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>Brick by Brick
                </h2>
                <p className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-base xl:text-lg mt-2 sm:mt-3 md:mt-4 leading-relaxed max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto lg:mx-0">
                  At Lunaris, we build trusted relationships with property owners through cutting-edge technology and personalized service. With 100+ managed properties and an average 20% revenue uplift, we deliver consistent growth and long-term value.
                </p>
              </motion.div>

              {/* Listed Properties */}
              <motion.h1
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mt-4 sm:mt-6 md:mt-8 text-center lg:text-left leading-tight"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <TextType 
                  text={["250+ LISTED", "PROPERTIES"]}
                  typingSpeed={50}
                  pauseDuration={2000}
                  showCursor={true}
                  cursorCharacter="|"
                  cursorClassName="text-gray-400"
                  as="div"
                  className="block"
                />
              </motion.h1>
            </motion.div>
          </div>

          {/* Search Bar */}
          <motion.div
            className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl lg:rounded-full p-3 sm:p-4 flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4 shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-3 sm:gap-4">
              <motion.div
                className="flex flex-col items-start w-full lg:w-auto lg:border-r border-gray-300 lg:pr-4 lg:flex-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <label className="text-xs sm:text-sm text-gray-500 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="bg-transparent border-none outline-none text-gray-700 font-medium placeholder-gray-500 w-full text-sm sm:text-base"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                />
              </motion.div>

              <motion.div
                className="flex flex-col items-start w-full lg:w-auto lg:flex-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <label className="text-xs sm:text-sm text-gray-500 mb-1">
                  Guests
                </label>
                <input
                  type="number"
                  placeholder="Add guests"
                  min="1"
                  className="bg-transparent border-none outline-none text-gray-700 font-medium placeholder-gray-500 w-full text-sm sm:text-base"
                  value={guests}
                  onChange={e => setGuests(e.target.value)}
                />
              </motion.div>

              <motion.button
                onClick={handleSearch}
                className="bg-[#172c3e] hover:bg-[#325d83] text-white p-2 sm:p-3 rounded-full transition duration-200 w-full lg:w-auto flex items-center justify-center"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <FiSearch size={16} className="sm:hidden" />
                <FiSearch size={20} className="hidden sm:block" />
                <span className="ml-2 lg:hidden text-sm sm:text-base">
                  Search
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
