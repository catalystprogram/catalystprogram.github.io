import React from 'react';
import { motion } from 'framer-motion';

const ApplySection = () => {
    return (
        <section id="apply" style={{
            padding: '120px 0',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decorative Circles */}
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'white', opacity: 0.1 }}
            />
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
                transition={{ duration: 7, repeat: Infinity, delay: 1 }}
                style={{ position: 'absolute', bottom: '-80px', right: '-20px', width: '300px', height: '300px', borderRadius: '50%', background: 'white', opacity: 0.1 }}
            />

            <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', color: '#FFFFFF', position: 'relative', zIndex: 10 }}>
                        Work with us
                    </h2>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {/* Student Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-20%" }}
                        transition={{ duration: 0.6 }}
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            padding: '3rem',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'white' }}>For Students</h3>
                        <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
                            Apply to be a participant and gain real-world experience.
                        </p>
                        <motion.a
                            href="https://forms.gle/db9Qrv3sCVh4kPwdA"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }} 
                            style={{
                                backgroundColor: 'white',
                                color: 'var(--color-primary)',
                                border: '2px solid white',
                                padding: '14px 32px',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                display: 'inline-block',
                                textDecoration: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                            }}
                        >
                            Apply Now
                        </motion.a>
                    </motion.div>

                    {/* Org Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-20%" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            backgroundColor: 'white',
                            padding: '3rem',
                            borderRadius: 'var(--radius-lg)',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>For Organizations</h3>
                        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                            In need of volunteer support? Get in touch to explore a partnership.
                        </p>
                        <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', color: 'var(--color-text-muted)' }}>
                            Please contact us at:
                        </p>
                        <motion.a
                            href="mailto:catalyst.program.board@gmail.com"
                            whileHover={{ scale: 1.02 }}
                            style={{
                                display: 'block',
                                backgroundColor: 'var(--color-primary)',
                                color: 'white',
                                padding: '14px 16px',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: 600,
                                fontSize: '0.85rem',
                                textDecoration: 'none',
                                textAlign: 'center',
                                lineHeight: 1.4
                            }}
                        >
                            📧 catalyst.program.board<wbr />@gmail.com
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ApplySection;
