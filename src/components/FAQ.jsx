import React from 'react';
import { motion } from 'framer-motion';

const FAQ = () => {
    const faqs = [
        { q: "Who can apply to Catalyst?", a: "We accept undergraduate students from our partner universities (Berkeley, Purdue, UChicago) from all majors." },
        { q: "What is the time commitment?", a: "Expect roughly 5-10 hours per week, including team meetings, client calls, and independent work." },
        { q: "Do I need consulting experience?", a: "No! We look for problem-solving ability and passion for impact. We provide training for all new consultants." },
        { q: "How do organizations partner with you?", a: "Organizations can submit an inquiry through our 'Partner' application below. We select projects based on impact potential and scope." },
    ];

    return (
        <section id="faq" style={{ padding: '100px 0', backgroundColor: 'var(--color-surface)', position: 'relative' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-20%" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center', color: 'var(--color-primary)' }}>
                        Frequently Asked Questions
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {faqs.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false }}
                                transition={{ delay: index * 0.1 }}
                                style={{
                                    backgroundColor: 'white',
                                    padding: '2rem',
                                    borderRadius: 'var(--radius-md)',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                }}
                            >
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>{item.q}</h3>
                                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{item.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Wave Transition (Surface -> Blue) */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', overflow: 'hidden', lineHeight: 0 }}>
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ position: 'relative', display: 'block', width: 'calc(100% + 1.3px)', height: '60px' }}>
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,2.92V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="var(--color-primary)"></path>
                </svg>
            </div>
        </section>
    );
};

export default FAQ;
