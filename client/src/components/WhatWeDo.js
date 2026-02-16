import React from 'react';
import { motion } from 'framer-motion';

const pillars = [
    {
        title: 'Revenue Growth',
        description: 'Data-driven pricing strategies and market analysis to maximize your property\'s earning potential consistently.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        ),
    },
    {
        title: 'Operational Excellence',
        description: 'End-to-end property operations with meticulous attention to guest experience, maintenance, and quality control.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
    },
    {
        title: 'Brand Authority',
        description: 'Strategic positioning, listing optimization, and brand growth to help your property stand out in competitive markets.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
        ),
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
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

const WhatWeDo = () => {
    return (
        <section className="section-padding bg-white" id="what-we-do">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
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
                        <span className="text-sm font-medium text-blue-700 tracking-wide">What We Do</span>
                    </motion.div>

                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight"
                        style={{ color: 'var(--color-text-dark)' }}
                    >
                        More Than Management.{' '}
                        <span style={{ color: 'var(--color-primary-light)' }}>
                            We Build Scalable STR Businesses.
                        </span>
                    </h2>

                    <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--color-text-medium)' }}>
                        At Lunaris Management & Co., we don't just manage listings — we{' '}
                        <strong style={{ color: 'var(--color-text-dark)' }}>engineer performance</strong>.
                        Our systems combine revenue optimization, hospitality operations, and brand
                        positioning to transform short‑term rentals into consistent, high‑yield assets.
                    </p>
                </motion.div>

                {/* Pillars subtitle */}
                <motion.p
                    className="text-center text-sm font-semibold tracking-widest uppercase mb-10"
                    style={{ color: 'var(--color-primary-light)' }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    We focus on three core pillars
                </motion.p>

                {/* Pillar Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className="relative bg-white rounded-2xl p-8 border border-gray-100 text-center group card-hover-lift"
                            style={{ boxShadow: 'var(--shadow-md)' }}
                        >
                            {/* Icon */}
                            <motion.div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                                style={{
                                    background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-light) 100%)',
                                    color: 'var(--color-primary)',
                                }}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                {pillar.icon}
                            </motion.div>

                            {/* Title */}
                            <h3
                                className="text-xl font-bold mb-3"
                                style={{ color: 'var(--color-text-dark)' }}
                            >
                                {pillar.title}
                            </h3>

                            {/* Accent line */}
                            <div
                                className="w-10 h-1 rounded-full mx-auto mb-4"
                                style={{ background: 'var(--color-primary-light)' }}
                            ></div>

                            {/* Description */}
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-medium)' }}>
                                {pillar.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default WhatWeDo;
