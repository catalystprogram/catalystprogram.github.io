import React from 'react';
import { motion } from 'framer-motion';

const TimelineDot = ({ label, date, active }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 100 }}>
        <div
            aria-hidden
            style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: active ? 'var(--color-primary)' : 'transparent',
                border: `2px solid ${active ? 'var(--color-primary)' : 'rgba(0,0,0,0.12)'}`,
                boxShadow: active ? '0 6px 12px rgba(36,86,255,0.12)' : 'none'
            }}
        />
        <div style={{ marginTop: 8, textAlign: 'center' }}>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-primary)' }}>{label}</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{date}</div>
        </div>
    </div>
);

const Calendar = () => {
    return (
        <section id="calendar" style={{ padding: '80px 0', backgroundColor: 'var(--color-surface)', position: 'relative', overflow: 'hidden' }}>
            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20%' }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', textAlign: 'center', color: 'var(--color-primary)', letterSpacing: '-0.01em' }}>
                        Calendar Overview
                    </h2>

                    <motion.div
                        whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                        transition={{ duration: 0.3 }}
                        style={{
                            backgroundColor: 'white',
                            minHeight: '420px',
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
                        {/* Decorative background */}
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.03, backgroundImage: `
                                linear-gradient(var(--color-primary) 1px, transparent 1px),
                                linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)
                            `, backgroundSize: '60px 60px' }} />

                        {/* Calendar icon */}
                        <motion.div initial={{ y: 10, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.15, duration: 0.5 }} style={{ width: 84, height: 84, borderRadius: 16, backgroundColor: 'var(--color-surface)', border: '2px solid var(--color-primary)', display: 'flex', flexDirection: 'column', overflow: 'hidden', marginBottom: '1rem' }}>
                            <div style={{ backgroundColor: 'var(--color-primary)', height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ color: 'white', fontSize: '0.75rem', fontWeight: 700 }}>2026</span>
                            </div>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ color: 'var(--color-primary)', fontSize: '1.15rem', fontWeight: 800 }}>Projects</span>
                            </div>
                        </motion.div>

                        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem', textAlign: 'center' }}>Important Dates</h3>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', textAlign: 'center', maxWidth: 720, marginTop: 6, marginBottom: 18 }}>
                            Complete the project selection form by <strong>February 6, 2026</strong>. Projects run for <strong>10 weeks</strong> — <strong>February 8, 2026</strong> through <strong>April 18, 2026</strong>.
                        </p>

                        {/* Timeline */}
                        <div style={{ width: '100%', maxWidth: 760, marginTop: 12, marginBottom: 12, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
                            <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12 }}>
                                {/* left spacer */}
                                <div style={{ flex: 1 }} />

                                <div style={{ flex: 8, display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <div style={{ height: 8, background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary) 100%)', borderRadius: 8, position: 'relative', overflow: 'hidden' }}>
                                        {/* progress indicator for visual only: full bar (10-week span) */}
                                        <div aria-hidden style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '100%', background: 'rgba(36,86,255,0.08)' }} />
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <TimelineDot label="Form due" date="Feb 6, 2026" active={true} />
                                        <TimelineDot label="Start" date="Feb 8, 2026" active={true} />
                                        <TimelineDot label="End" date="Apr 18, 2026" active={false} />
                                    </div>
                                </div>

                                <div style={{ flex: 1 }} />
                            </div>
                        </div>

                        {/* Actions: buttons (no anchors) */}
                        <div style={{ marginTop: 10, display: 'flex', gap: 12, zIndex: 1 }}>
                            <button type="button" onClick={() => { /* placeholder - no external link */ }} style={{ padding: '0.6rem 1rem', borderRadius: 10, backgroundColor: 'var(--color-primary)', color: 'white', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                                Open Project Form
                            </button>
                            <button type="button" onClick={() => { /* placeholder: open modal or similar */ }} style={{ padding: '0.6rem 1rem', borderRadius: 10, backgroundColor: 'transparent', border: '1px solid rgba(0,0,0,0.06)', color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer' }}>
                                Learn More
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Calendar;