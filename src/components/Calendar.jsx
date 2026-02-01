import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));

const CircularProgress = ({ size = 28, stroke = 3, progress = 0, color = 'var(--color-primary)' }) => {
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const dash = circumference;
    const offset = dash * (1 - clamp(progress, 0, 1));

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
            <g transform={`translate(${size / 2}, ${size / 2})`}>
                <circle
                    r={radius}
                    fill="transparent"
                    stroke="rgba(0,0,0,0.06)"
                    strokeWidth={stroke}
                />
                <circle
                    r={radius}
                    fill="transparent"
                    stroke={color}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={`${dash} ${dash}`}
                    strokeDashoffset={offset}
                    transform="rotate(-90)"
                />
            </g>
        </svg>
    );
};

const TimelineDot = ({ label, date, startDate, endDate, now }) => {
    const eventDate = useMemo(() => new Date(date), [date]);
    const start = useMemo(() => new Date(startDate), [startDate]);
    const end = useMemo(() => new Date(endDate), [endDate]);

    // progress toward this event from timeline start (0..1)
    const progress = useMemo(() => {
        const total = end - start;
        if (total <= 0) return eventDate <= now ? 1 : 0;
        const eventPos = eventDate - start;
        const currentPos = now - start;
        // fraction of distance from start to event that has elapsed
        return clamp(currentPos / Math.max(1, eventPos));
    }, [eventDate, start, end, now]);

    const filled = progress >= 1;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 100 }}>
            <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress size={36} stroke={3.5} progress={progress} />
            </div>
            <div style={{ marginTop: 8, textAlign: 'center' }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-primary)' }}>{label}</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
            </div>
        </div>
    );
};

const Calendar = () => {
    // timeline dates
    const formDue = '2026-02-06T00:00:00Z';
    const startDate = '2026-02-08T00:00:00Z';
    const endDate = '2026-04-18T23:59:59Z';

    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        // update every 30 seconds to reflect progress; keep interval small for responsiveness
        const id = setInterval(() => setNow(new Date()), 30 * 1000);
        return () => clearInterval(id);
    }, []);

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
                                <div style={{ flex: 1 }} />

                                <div style={{ flex: 8, display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <div style={{ height: 8, borderRadius: 8, position: 'relative', overflow: 'hidden', background: 'rgba(36,86,255,0.08)' }}>
                                        {/* Visual bar for entire span (background) */}
                                        <div aria-hidden style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '100%', background: 'rgba(36,86,255,0.08)' }} />

                                        {/* filled portion representing elapsed fraction from formDue -> endDate */}
                                        <div aria-hidden style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${Math.round(clamp((new Date(now) - new Date(formDue)) / (new Date(endDate) - new Date(formDue), 0) * 100))}%`, background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))', opacity: 0.12 }} />
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <TimelineDot label="Form due" date={formDue} startDate={formDue} endDate={endDate} now={now} />
                                        <TimelineDot label="Start" date={startDate} startDate={formDue} endDate={endDate} now={now} />
                                        <TimelineDot label="End" date={endDate} startDate={formDue} endDate={endDate} now={now} />
                                    </div>
                                </div>

                                <div style={{ flex: 1 }} />
                            </div>
                        </div>

                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Calendar;