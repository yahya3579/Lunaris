import React from 'react';
import { motion } from 'framer-motion';

const steps = [
    {
        number: 1,
        title: 'Asset Evaluation',
        description: "We assess your property's potential, pricing range, and positioning in the market.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
        ),
    },
    {
        number: 2,
        title: 'Strategic Setup',
        description: 'Listing optimization, pricing configuration, and brand positioning tailored to your property.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
    {
        number: 3,
        title: 'Operational Launch',
        description: 'Guest communication systems, cleaning structure, and automation setup go live.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    {
        number: 4,
        title: 'Continuous Optimization',
        description: 'Monthly performance reviews and revenue strategy adjustments to ensure growth.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
        ),
    },
];

const ManagementProcess = () => {
    return (
        <section className="section-padding" id="process-section" style={{ backgroundColor: 'var(--color-bg-light)' }}>
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
                        <span className="text-sm font-medium text-blue-700 tracking-wide">Our Process</span>
                    </motion.div>

                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                        style={{ color: 'var(--color-text-dark)' }}
                    >
                        Our Management{' '}
                        <span style={{ color: 'var(--color-primary-light)' }}>Process</span>
                    </h2>
                    <p className="text-base sm:text-lg" style={{ color: 'var(--color-text-medium)' }}>
                        A structured approach to transforming your property into a high-performing asset
                    </p>
                </motion.div>

                {/* Desktop: Horizontal Timeline */}
                <div className="hidden lg:block">
                    <div className="relative">
                        {/* Connecting Line */}
                        <motion.div
                            className="absolute top-12 left-0 right-0 h-0.5"
                            style={{ background: 'linear-gradient(90deg, var(--color-accent), var(--color-primary-light), var(--color-accent))' }}
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                        ></motion.div>

                        <div className="grid grid-cols-4 gap-8 relative z-10">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    className="flex flex-col items-center text-center"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.15 }}
                                >
                                    {/* Step Number Circle */}
                                    <motion.div
                                        className="process-step-dot mb-6"
                                        whileHover={{ scale: 1.15 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        {step.number}
                                    </motion.div>

                                    {/* Icon */}
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                        style={{
                                            background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-light) 100%)',
                                            color: 'var(--color-primary)',
                                        }}
                                    >
                                        {step.icon}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text-dark)' }}>
                                        {step.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-medium)' }}>
                                        {step.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile/Tablet: Vertical Timeline */}
                <div className="lg:hidden">
                    <div className="relative">
                        {/* Vertical Line */}
                        <div
                            className="absolute left-6 top-0 bottom-0 w-0.5"
                            style={{ background: 'linear-gradient(180deg, var(--color-accent), var(--color-primary-light), var(--color-accent))' }}
                        ></div>

                        <div className="space-y-8">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    className="flex gap-6 relative"
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    {/* Step Dot */}
                                    <div className="flex-shrink-0 process-step-dot text-sm" style={{ width: '48px', height: '48px' }}>
                                        {step.number}
                                    </div>

                                    {/* Content Card */}
                                    <div
                                        className="flex-1 p-5 rounded-xl border border-gray-100 bg-white"
                                        style={{ boxShadow: 'var(--shadow-sm)' }}
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div
                                                className="w-9 h-9 rounded-lg flex items-center justify-center"
                                                style={{
                                                    background: 'var(--color-accent-light)',
                                                    color: 'var(--color-primary)',
                                                }}
                                            >
                                                {step.icon}
                                            </div>
                                            <h3 className="text-base font-bold" style={{ color: 'var(--color-text-dark)' }}>
                                                {step.title}
                                            </h3>
                                        </div>
                                        <p className="text-sm" style={{ color: 'var(--color-text-medium)' }}>
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ManagementProcess;
