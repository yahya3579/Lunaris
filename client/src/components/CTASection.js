import React from 'react';
import { motion } from 'framer-motion';

const CTASection = () => {
    return (
        <section className="section-padding-lg relative overflow-hidden" id="cta-section">
            {/* Background */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-medium) 40%, var(--color-primary-light) 100%)',
                }}
            ></div>

            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5"></div>
                <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-white/3"></div>
                <div className="absolute top-1/2 right-1/4 w-20 h-20 rounded-full border border-white/10"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                {/* Icon */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                </motion.div>

                {/* Headline */}
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Ready to Elevate Your{' '}
                    <span style={{ color: 'var(--color-accent)' }}>Rental Performance?</span>
                </motion.h2>

                {/* Description */}
                <motion.p
                    className="text-lg sm:text-xl text-blue-100/80 mb-10 max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Let's discuss how we can transform your property into a consistently high-performing asset.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <a
                        href="https://calendly.com/lunarismanagement14/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 sm:px-10 py-4 rounded-full font-bold text-base sm:text-lg hover:bg-blue-50 transition-all duration-300 hover:-translate-y-1"
                        style={{
                            boxShadow: '0 8px 30px rgba(255, 255, 255, 0.2)',
                            color: 'var(--color-primary)',
                        }}
                        id="cta-schedule-call"
                    >
                        Schedule Your Strategy Call
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                    className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-blue-200/60"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Free consultation</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>No obligations</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Results-driven approach</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;
