import React from 'react';
import { motion } from 'framer-motion';

const Calendar = () => {
    return (
        <section id="calendar" style={{ padding: '100px 0', backgroundColor: 'var(--color-surface)' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center', color: 'var(--color-primary)' }}>
                        Calendar Overview
                    </h2>
                    <motion.div
                        whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                        transition={{ duration: 0.3 }}
                        style={{
                            backgroundColor: 'white',
                            minHeight: '400px',
                            borderRadius: 'var(--radius-lg)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                            position: 'relative',
                            overflow: 'hidden'
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
                                marginBottom: '1.5rem'
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
                                <span style={{ color: 'var(--color-primary)', fontSize: '1.5rem', fontWeight: 700 }}>SP</span>
                            </div>
                        </motion.div>

                        {/* Main text */}
                        <h3 style={{
                            color: 'var(--color-primary)',
                            fontSize: '1.8rem',
                            fontWeight: 600,
                            marginBottom: '0.75rem',
                            textAlign: 'center',
                            position: 'relative',
                            zIndex: 1
                        }}>
                            Schedule To Be Announced
                        </h3>
                        <p style={{
                            color: 'var(--color-text-muted)',
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            maxWidth: '450px',
                            position: 'relative',
                            zIndex: 1
                        }}>
                            Program timeline and key dates for the Spring 2026 cohort will be shared soon.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Calendar;
