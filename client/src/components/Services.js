import React from 'react';
import { motion } from 'framer-motion';

const services = [
    {
        number: '01',
        title: 'Revenue Management',
        description: 'Dynamic pricing strategies powered by market data and demand forecasting. We continuously optimize ADR, occupancy, and RevPAR to increase profitability.',
        includes: [
            'Dynamic pricing tools',
            'Competitor tracking',
            'Market analysis',
            'Performance reporting',
        ],
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        number: '02',
        title: 'Full Property Management',
        description: 'Complete end‑to‑end management covering operations, guest experience, and asset performance.',
        includes: [
            '24/7 guest communication',
            'Cleaning coordination',
            'Maintenance oversight',
            'Quality control',
            'Monthly reporting',
        ],
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
    },
    {
        number: '03',
        title: 'Co‑Hosting',
        description: 'Professional support for hosts who want to scale without operational stress.',
        includes: [
            'Listing optimization',
            'Guest messaging',
            'Booking management',
            'Review management',
        ],
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
    },
    {
        number: '04',
        title: 'Brand & Listing Optimization',
        description: 'We position your property to stand out in competitive markets.',
        includes: [
            'Listing copywriting',
            'SEO optimization',
            'Professional photography direction',
            'Social media growth strategy',
        ],
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
        ),
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

const Services = () => {
    return (
        <section className="section-padding-lg" id="services-section" style={{ backgroundColor: 'var(--color-bg-light)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium text-blue-700 tracking-wide">Our Expertise</span>
                    </motion.div>

                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                        style={{ color: 'var(--color-text-dark)' }}
                    >
                        Our Services
                    </h2>
                    <p className="text-base sm:text-lg" style={{ color: 'var(--color-text-medium)' }}>
                        Comprehensive solutions designed to maximize your property's performance
                    </p>
                </motion.div>

                {/* Service Cards Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className="group rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:-translate-y-2 cursor-default"
                            style={{
                                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
                                boxShadow: 'var(--shadow-lg)',
                            }}
                            whileHover={{ boxShadow: '0 20px 50px rgba(11, 29, 53, 0.3)' }}
                        >
                            <div className="flex items-start gap-5">
                                {/* Icon Container */}
                                <div
                                    className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.15)',
                                        color: '#FFFFFF',
                                    }}
                                >
                                    {service.icon}
                                </div>

                                <div className="flex-1">
                                    {/* Number & Title */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <span
                                            className="text-xs font-bold tracking-wider"
                                            style={{ color: 'rgba(255, 255, 255, 0.45)' }}
                                        >
                                            {service.number}
                                        </span>
                                        <h3
                                            className="text-xl font-bold"
                                            style={{ color: '#FFFFFF' }}
                                        >
                                            {service.title}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <p
                                        className="text-sm leading-relaxed mb-4"
                                        style={{ color: 'rgba(255, 255, 255, 0.75)' }}
                                    >
                                        {service.description}
                                    </p>

                                    {/* Includes List */}
                                    <div>
                                        <span
                                            className="text-xs font-semibold tracking-wider uppercase mb-2 block"
                                            style={{ color: 'var(--color-accent)' }}
                                        >
                                            Includes:
                                        </span>
                                        <ul className="space-y-1.5">
                                            {service.includes.map((item, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                                                    <svg className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
