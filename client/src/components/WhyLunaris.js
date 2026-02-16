import React from 'react';
import { motion } from 'framer-motion';

const advantages = [
    {
        title: 'Strategic revenue focus, not just operations',
        description: 'We prioritize driving measurable revenue growth through intelligent pricing and market positioning.',
    },
    {
        title: 'Transparent reporting and financial clarity',
        description: 'Full visibility into your property\'s performance with detailed monthly reports.',
    },
    {
        title: 'Premium guest experience standards',
        description: 'Every guest interaction is handled with professionalism that drives 5-star reviews.',
    },
    {
        title: 'Scalable systems built for long-term growth',
        description: 'Our processes and technology scale with your portfolio, from one property to many.',
    },
    {
        title: 'Dedicated management oversight',
        description: 'A hands-on team ensuring your property receives focused attention and strategic care.',
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
};

const WhyLunaris = () => {
    return (
        <section className="section-padding bg-white" id="why-lunaris">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7 }}
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            <span className="text-sm font-medium text-blue-700 tracking-wide">Why Choose Us</span>
                        </motion.div>

                        <h2
                            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight"
                            style={{ color: 'var(--color-text-dark)' }}
                        >
                            Why Property Owners{' '}
                            <span style={{ color: 'var(--color-primary-light)' }}>Choose Lunaris</span>
                        </h2>

                        <p
                            className="text-base sm:text-lg leading-relaxed mb-8"
                            style={{ color: 'var(--color-text-medium)' }}
                        >
                            We operate with a <strong style={{ color: 'var(--color-text-dark)' }}>performance-first mindset</strong>.
                            Every decision is guided by data, and every strategy is designed to deliver measurable results
                            for property owners who demand more than average management.
                        </p>

                        {/* Closing Statement */}
                        <motion.div
                            className="p-5 rounded-xl border-l-4"
                            style={{
                                borderColor: 'var(--color-primary-light)',
                                backgroundColor: 'var(--color-accent-light)',
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <p
                                className="text-base font-semibold italic"
                                style={{ color: 'var(--color-primary)' }}
                            >
                                "We treat every property as a growth asset, not just a listing."
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Right Content – Advantages List */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <div className="space-y-5">
                            {advantages.map((advantage, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 border border-gray-100 group hover:bg-white transition-all duration-300 card-hover-lift"
                                >
                                    {/* Check Icon */}
                                    <div
                                        className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mt-0.5"
                                        style={{
                                            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
                                        }}
                                    >
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>

                                    {/* Text */}
                                    <div>
                                        <h4
                                            className="font-semibold text-base mb-1"
                                            style={{ color: 'var(--color-text-dark)' }}
                                        >
                                            {advantage.title}
                                        </h4>
                                        <p className="text-sm" style={{ color: 'var(--color-text-medium)' }}>
                                            {advantage.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WhyLunaris;
