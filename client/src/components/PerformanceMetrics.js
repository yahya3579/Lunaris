import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Animated Counter Hook
const useCountUp = (target, duration = 2000, isInView) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const end = parseInt(target);
        if (end === 0) return;
        const stepTime = Math.max(Math.floor(duration / end), 15);
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

    return count;
};

const metrics = [
    {
        value: 30,
        prefix: '+',
        suffix: '%',
        label: 'Average Revenue Increase',
        description: 'Across all managed properties',
    },
    {
        value: 20,
        prefix: '+',
        suffix: '%',
        label: 'Occupancy Growth',
        description: 'Year-over-year improvement',
    },
    {
        value: 95,
        prefix: '',
        suffix: '%',
        label: 'Client Retention',
        description: 'Long-term partnerships',
    },
    {
        value: 5,
        prefix: '',
        suffix: '‑Star',
        label: 'Guest Experience Standard',
        description: 'Consistent quality delivery',
    },
];

const PerformanceMetrics = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section
            ref={sectionRef}
            className="section-padding-lg relative overflow-hidden"
            id="performance-section"
            style={{
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-medium) 50%, var(--color-primary-light) 100%)',
            }}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-32 h-32 border border-white rounded-full"></div>
                <div className="absolute bottom-20 right-10 w-24 h-24 border border-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
                <div className="absolute bottom-1/3 right-1/3 w-20 h-20 border border-white rounded-full"></div>
                <div className="absolute top-1/4 right-1/4 w-12 h-12 border border-white rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-blue-100 tracking-wide">Our Track Record</span>
                    </motion.div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Driven by Data.{' '}
                        <span style={{ color: 'var(--color-accent)' }}>Proven by Results.</span>
                    </h2>

                    <p className="text-base sm:text-lg text-blue-100/80 leading-relaxed">
                        Every strategy we implement is backed by performance metrics.
                        We monitor pricing trends, demand shifts, and guest behavior to continuously
                        improve asset performance.
                    </p>
                </motion.div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={index}
                            className="text-center p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 group hover:bg-white/10 transition-all duration-300"
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -4, scale: 1.02 }}
                        >
                            {/* Counter */}
                            <div className="mb-3">
                                <span
                                    className="text-3xl sm:text-4xl md:text-5xl font-bold"
                                    style={{ color: 'var(--color-accent)' }}
                                >
                                    <MetricCounter
                                        value={metric.value}
                                        prefix={metric.prefix}
                                        suffix={metric.suffix}
                                        isInView={isInView}
                                    />
                                </span>
                            </div>

                            {/* Label */}
                            <h3 className="text-white font-semibold text-sm sm:text-base mb-1">
                                {metric.label}
                            </h3>

                            {/* Description */}
                            <p className="text-blue-200/60 text-xs sm:text-sm">
                                {metric.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom accent line */}
                <motion.div
                    className="flex justify-center mt-12"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <div className="w-24 h-1 rounded-full" style={{ background: 'var(--color-accent)' }}></div>
                </motion.div>
            </div>
        </section>
    );
};

// Individual Metric Counter Component
const MetricCounter = ({ value, prefix, suffix, isInView }) => {
    const count = useCountUp(value, 2000, isInView);

    return (
        <>
            {prefix}{count}{suffix}
        </>
    );
};

export default PerformanceMetrics;
