import React from 'react';
import { motion } from 'framer-motion';

const Calendar = () => {
    return (
        <section id="calendar" style={{ padding: '80px 0', backgroundColor: 'var(--color-surface)', position: 'relative', overflow: 'hidden' }}>
            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center', color: 'var(--color-primary)', letterSpacing: '-0.01em' }}>
                        Calendar Overview
                    </h2>
                    <motion.div
                        whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                        transition={{ duration: 0.3 }}
                        style={{
                            backgroundColor: 'white',
                            minHeight: '380px',
                            borderRadius: 'var(--radius-lg)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                            position: 'relative',
                            overflow: 'hidden',
                            padding: '2rem'
                        }}
                    >
                        {/* Decorative calendar grid pattern */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            opacity: 0.03,
                            backgroundImage: `
                                linear-gradient(var(--color-primary) 1px, transparent 1px),
                                linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)
                            `,
                            backgroundSize: '60px 60px'
                        }} />

                        {/* Decorative circles */}
                        <div style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            border: '2px solid var(--color-accent)',
                            opacity: 0.5
                        }} />
                        <div style={{
                            position: 'absolute',
                            bottom: '30px',
                            left: '30px',
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            border: '2px solid var(--color-accent)',
                            opacity: 0.4
                        }} />

                        {/* Calendar icon */}
                        <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '16px',
                                backgroundColor: 'var(--color-surface)',
                                border: '2px solid var(--color-primary)',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden',
                                marginBottom: '1.25rem'
                            }}
                        >
                            <div style={{
                                backgroundColor: 'var(--color-primary)',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <span style={{ color: 'white', fontSize: '0.7rem', fontWeight: 600 }}>2026</span>
                            </div>
                            <div style={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <span style={{ color: 'var(--color-primary)', fontSize: '1.25rem', fontWeight: 700 }}>Projects</span>
                            </div>
                        </motion.div>

                        {/* Main text */}
                        <h3 style={{
                            color: 'var(--color-primary)',
                            fontSize: '1.6rem',
                            fontWeight: 600,
                            marginBottom: '0.5rem',
                            textAlign: 'center',
                            position: 'relative',
                            zIndex: 1,
                            letterSpacing: '-0.01em'
                        }}>
                            Important Dates
                        </h3>
                        <p style={{
                            color: 'var(--color-text-muted)',
                            fontSize: '1.05rem',
                            textAlign: 'center',
                            maxWidth: '720px',
                            position: 'relative',
                            zIndex: 1,
                            marginBottom: '0.5rem'
                        }}>
                            Please complete the project selection form by <strong>February 6, 2026</strong>.
                        </p>
                        <p style={{
                            color: 'var(--color-text-muted)',
                            fontSize: '1.05rem',
                            textAlign: 'center',
                            maxWidth: '720px',
                            position: 'relative',
                            zIndex: 1
                        }}>
                            Projects run for <strong>10 weeks</strong>, beginning <strong>February 8, 2026</strong> and concluding on <strong>April 18, 2026</strong>.
                        </p>

                        <div style={{
                            marginTop: '1rem',
                            display: 'flex',
                            gap: '0.75rem',
                            position: 'relative',
                            zIndex: 1
                        }}>
                            <a href="#" style={{
                                padding: '0.65rem 1.05rem',
                                borderRadius: '10px',
                                backgroundColor: 'var(--color-primary)',
                                color: 'white',
                                fontWeight: 700,
                                textDecoration: 'none',
                                boxShadow: '0 6px 12px rgba(36, 86, 255, 0.12)'
                            }}>Open Project Form</a>
                            <a href="#" style={{
                                padding: '0.65rem 1.05rem',
                                borderRadius: '10px',
                                backgroundColor: 'transparent',
                                border: '1px solid rgba(0,0,0,0.06)',
                                color: 'var(--color-primary)',
                                fontWeight: 700,
                                textDecoration: 'none'
                            }}>Learn More</a>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Calendar;