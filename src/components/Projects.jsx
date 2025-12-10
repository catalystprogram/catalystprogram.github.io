import React from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
    return (
        <section id="projects" style={{ padding: '100px 0', backgroundColor: 'white' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center', color: 'var(--color-primary)' }}>
                        Our Projects
                    </h2>
                    <motion.div
                        whileHover={{ y: -5, boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.05), 0 10px 20px rgba(0,0,0,0.05)' }}
                        transition={{ duration: 0.3 }}
                        style={{
                            background: 'linear-gradient(135deg, var(--color-surface) 0%, #e0f2f7 50%, var(--color-surface) 100%)',
                            minHeight: '350px',
                            borderRadius: 'var(--radius-lg)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)',
                            border: '1px solid var(--color-border)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Decorative elements */}
                        <div style={{
                            position: 'absolute',
                            top: '-50px',
                            right: '-50px',
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(42, 123, 155, 0.1) 0%, transparent 70%)'
                        }} />
                        <div style={{
                            position: 'absolute',
                            bottom: '-30px',
                            left: '-30px',
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(42, 123, 155, 0.08) 0%, transparent 70%)'
                        }} />

                        {/* Badge */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            style={{
                                padding: '0.5rem 1.5rem',
                                backgroundColor: 'var(--color-primary)',
                                borderRadius: '50px',
                                marginBottom: '1.5rem'
                            }}
                        >
                            <span style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.5px' }}>
                                SP2026 COHORT
                            </span>
                        </motion.div>

                        {/* Main text */}
                        <h3 style={{
                            color: 'var(--color-primary)',
                            fontSize: '1.8rem',
                            fontWeight: 600,
                            marginBottom: '0.75rem',
                            textAlign: 'center'
                        }}>
                            Projects Coming Soon
                        </h3>
                        <p style={{
                            color: 'var(--color-text-muted)',
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            maxWidth: '400px'
                        }}>
                            New project partnerships for Spring 2026 will be announced shortly.
                        </p>

                        {/* Subtle animation dots */}
                        <div style={{ display: 'flex', gap: '8px', marginTop: '2rem' }}>
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                    style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        backgroundColor: 'var(--color-primary)'
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
