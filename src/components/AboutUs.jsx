import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
    return (
        <section id="about" style={{ padding: '100px 0', backgroundColor: 'var(--color-background)' }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center' }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--color-primary)' }}>
                        About Catalyst Program
                    </h2>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', marginBottom: '3rem', lineHeight: 1.8 }}>
                        We are a collective of ambitious students from top universities dedicated to driving social impact.
                        By bridging the gap between student talent and impactful non-profits, we give students valuable opportunities and enhance the capacity of organizations.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', textAlign: 'left' }}>
                        {[
                            { title: "Mission", text: "To give non-profits greater capacity to achieve their mission through student volunteers." },
                            { title: "Vision", text: "A world where organizations have access to a expansive pool of volunteer talent." },
                            { title: "Values", text: "Impact-first, evidence-based, and collaborative growth." }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                style={{
                                    backgroundColor: 'white',
                                    padding: '2rem',
                                    borderRadius: 'var(--radius-md)',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                                    borderTop: '4px solid var(--color-primary)'
                                }}
                            >
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--color-text-main)' }}>{item.title}</h3>
                                <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutUs;
