import React from 'react';
import { motion } from 'framer-motion';
import LandingPage from '../components/LandingPage';
import WhatWeDo from '../components/WhatWeDo';
import Services from '../components/Services';
import PerformanceMetrics from '../components/PerformanceMetrics';
import WhyLunaris from '../components/WhyLunaris';
import ManagementProcess from '../components/ManagementProcess';
import ClientReviews from '../components/ClientReviews';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      {/* Section 1: Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <LandingPage />
      </motion.div>

      {/* Section 2: What We Do */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
      >
        <WhatWeDo />
      </motion.div>

      {/* Section 3: Our Services */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
      >
        <Services />
      </motion.div>

      {/* Section 4: Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
      >
        <PerformanceMetrics />
      </motion.div>

      {/* Section 5: Why Lunaris */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
      >
        <WhyLunaris />
      </motion.div>

      {/* Section 6: Management Process */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
      >
        <ManagementProcess />
      </motion.div>

      {/* Section 7: Client Reviews */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
      >
        <ClientReviews />
      </motion.div>

      {/* Section 8: Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
      >
        <CTASection />
      </motion.div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
