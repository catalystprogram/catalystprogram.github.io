import React from 'react';
import { motion } from 'framer-motion';
import './Testimonials.css';

const Partners = () => {
    const logos = [
        { name: "Healthy Futures Global", src: "/logos/healthyfutures.png" },
        { name: "Solar4Africa", src: "/logos/solar4africa.png" },
        { name: "ALLFED", src: "/logos/allfed.png" },
        { name: "Notify Health", src: "/logos/notifyhealth_logo.png" },
        { name: "UC Berkeley RAEL", src: "/logos/RAEL.png" }
    ];

    // Duplicate logos for seamless loop
    const marqueeLogos = [...logos, ...logos];

    return (
        <section id="testimonials" style={{ padding: '180px 0', backgroundColor: 'white', overflow: 'hidden' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '4rem', textAlign: 'center', color: 'var(--color-primary)' }}>
                        Previously Worked With
                    </h2>

                    <div
                        className="marquee-container"
                        style={{
                            display: 'flex',
                            overflow: 'hidden',
                            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
                        }}
                    >
                        <div className="marquee-track">
                            {marqueeLogos.map((logo, index) => (
                                <div
                                    key={index}
                                    className="marquee-item"
                                >
                                    <img
                                        src={logo.src}
                                        alt={logo.name}
                                        style={{
                                            height: '100px',
                                            width: 'auto',
                                            objectFit: 'contain',
                                            filter: 'grayscale(30%)',
                                            opacity: 0.85,
                                            transition: 'all 0.3s ease'
                                        }}
                                    />
                                    <span style={{
                                        fontSize: '1.5rem',
                                        fontWeight: 700,
                                        color: 'var(--color-text-muted)',
                                        opacity: 0.8
                                    }}>
                                        {logo.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Partners;
