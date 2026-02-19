import React, { Suspense, useState } from 'react';
import { motion } from 'framer-motion';

const CatalystImpact = React.lazy(() => import('./CatalystImpact'));

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz3SBHd-02QrZQMG0piUO0ynNwa_hMAXl_07y-wM4u1c8DcsFJExZn-aZ47WRPTk3Uj/exec';

const Hero = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || status === 'loading') return;

        setStatus('loading');
        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            setStatus('success');
            setEmail('');
        } catch (error) {
            console.error('Error:', error);
            setStatus('error');
        }
    };

    return (
        <section id="hero" style={{
            padding: '80px 0',
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--color-surface)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Blobs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-5%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, var(--color-accent) 0%, rgba(255,255,255,0) 70%)',
                    zIndex: 0,
                    willChange: 'transform'
                }}
            />

            <div className="container hero-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem',
                alignItems: 'center',
                justifyContent: 'center',
                justifyItems: 'center',
                position: 'relative',
                zIndex: 1,
                maxWidth: '1000px',
                margin: '0 auto'
            }}>
                {/* Left Content */}
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        style={{
                            fontSize: '3.5rem',
                            marginBottom: '1.5rem',
                            color: 'var(--color-primary)',
                            letterSpacing: '-0.02em'
                        }}
                    >
                        Catalyst Program
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        style={{
                            fontSize: '1.25rem',
                            color: 'var(--color-text-muted)',
                            marginBottom: '2rem',
                            maxWidth: '500px',
                            lineHeight: 1.6
                        }}
                    >
                        A student-led projects program involving students from universities across the United States, including Berkeley, Purdue, and UChicago.
                    </motion.p>

                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        style={{ display: 'flex', gap: '1rem', maxWidth: '400px' }}
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === 'loading' || status === 'success'}
                            style={{
                                flex: 1,
                                padding: '12px 16px',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                                opacity: status === 'success' ? 0.6 : 1
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--color-primary-light)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                        />
                        <motion.button
                            whileHover={{ scale: status === 'success' ? 1 : 1.05 }}
                            whileTap={{ scale: status === 'success' ? 1 : 0.95 }}
                            type="submit"
                            disabled={status === 'loading' || status === 'success'}
                            style={{
                                backgroundColor: status === 'success' ? '#22c55e' : 'var(--color-primary)',
                                color: 'white',
                                padding: '12px 24px',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: 600,
                                fontSize: '1rem',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                cursor: status === 'success' ? 'default' : 'pointer',
                                minWidth: '80px'
                            }}
                        >
                            {status === 'loading' ? '...' : status === 'success' ? '✓' : 'Join'}
                        </motion.button>
                    </motion.form>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        style={{ fontSize: '0.875rem', color: status === 'success' ? '#22c55e' : 'var(--color-text-light)', marginTop: '1rem' }}
                    >
                        {status === 'success'
                            ? "Thanks! We'll be in touch soon."
                            : "Interested in joining? Leave your email to get updates."}
                    </motion.p>
                </motion.div>

                {/* Right Visual - Three.js Animation */}
                <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    style={{
                        position: 'relative',
                        width: '400px',
                        height: '400px',
                        minWidth: '400px',
                        minHeight: '400px',
                        maxWidth: '400px',
                        maxHeight: '400px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        flexShrink: 0
                    }}
                >
                    <Suspense fallback={
                        <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--color-text-muted)'
                        }}>
                            Loading...
                        </div>
                    }>
                        <CatalystImpact />
                    </Suspense>
                </motion.div>
            </div>

            {/* Wave Transition (Surface -> Cream) */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', overflow: 'hidden', lineHeight: 0 }}>
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ position: 'relative', display: 'block', width: 'calc(138% + 1.3px)', height: '128px' }}>
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="#FDFBF7"></path>
                </svg>
            </div>
        </section>
    );
};

export default Hero;
