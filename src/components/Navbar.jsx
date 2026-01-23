import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ activeSection }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const links = [
        { id: 'about', label: 'About' },
        { id: 'projects', label: 'Projects' },
        { id: 'calendar', label: 'Calendar' },
        { id: 'testimonials', label: 'Past Partners' },
        { id: 'faq', label: 'FAQ' },
    ];

    const handleClick = (e, id) => {
        e.preventDefault();
        setMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const handleMobileClick = (e, id) => {
        e.preventDefault();
        setMenuOpen(false);
        // Small delay to let menu close first
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                const yOffset = -80; // Account for header height
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 150);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    backgroundColor: 'var(--color-background)',
                    height: 'var(--header-height)',
                    backgroundImage: 'url(/header-bg.png)',
                    backgroundRepeat: 'repeat',
                    backgroundSize: '150px auto',
                    borderBottom: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000
                }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <motion.a
                        href="#"
                        onClick={(e) => handleClick(e, 'hero')}
                        style={{
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            height: 'var(--header-height)',
                            overflow: 'hidden'
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <img
                            src="/full logo.png"
                            alt="Catalyst Program"
                            style={{ height: isMobile ? '120px' : '160px', width: 'auto' }}
                        />
                    </motion.a>

                    {/* Desktop Navigation */}
                    {!isMobile && (
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                            {links.map((link) => (
                                <motion.a
                                    key={link.id}
                                    href={`#${link.id}`}
                                    onClick={(e) => handleClick(e, link.id)}
                                    style={{
                                        fontWeight: 500,
                                        position: 'relative',
                                        color: activeSection === link.id ? 'var(--color-primary)' : 'var(--color-text-main)'
                                    }}
                                    whileHover={{ color: 'var(--color-primary)' }}
                                >
                                    {link.label}
                                    {activeSection === link.id && (
                                        <motion.div
                                            layoutId="underline"
                                            style={{
                                                position: 'absolute',
                                                bottom: '-4px',
                                                left: 0,
                                                right: 0,
                                                height: '2px',
                                                backgroundColor: 'var(--color-primary)'
                                            }}
                                        />
                                    )}
                                </motion.a>
                            ))}

                            <motion.a
                                href="#apply"
                                onClick={(e) => handleClick(e, 'apply')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'white',
                                    borderRadius: 'var(--radius-md)',
                                    fontWeight: 500,
                                    cursor: 'pointer'
                                }}
                            >
                                Apply Now
                            </motion.a>
                        </div>
                    )}

                    {/* Mobile Hamburger */}
                    {isMobile && (
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '5px',
                                padding: '8px',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                            aria-label="Toggle menu"
                        >
                            <motion.span
                                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
                                style={{ width: '24px', height: '2px', backgroundColor: 'var(--color-primary)', display: 'block' }}
                            />
                            <motion.span
                                animate={{ opacity: menuOpen ? 0 : 1 }}
                                style={{ width: '24px', height: '2px', backgroundColor: 'var(--color-primary)', display: 'block' }}
                            />
                            <motion.span
                                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
                                style={{ width: '24px', height: '2px', backgroundColor: 'var(--color-primary)', display: 'block' }}
                            />
                        </button>
                    )}
                </div>
            </motion.nav>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMobile && menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                            position: 'fixed',
                            top: 'var(--header-height)',
                            left: 0,
                            right: 0,
                            backgroundColor: 'var(--color-background)',
                            borderBottom: '1px solid var(--color-border)',
                            zIndex: 999,
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {links.map((link) => (
                                <a
                                    key={link.id}
                                    href={`#${link.id}`}
                                    onClick={(e) => handleMobileClick(e, link.id)}
                                    style={{
                                        display: 'block',
                                        padding: '12px 16px',
                                        fontWeight: 500,
                                        color: activeSection === link.id ? 'var(--color-primary)' : 'var(--color-text-main)',
                                        backgroundColor: activeSection === link.id ? 'var(--color-surface)' : 'transparent',
                                        borderRadius: 'var(--radius-md)',
                                        textDecoration: 'none'
                                    }}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="#apply"
                                onClick={(e) => handleMobileClick(e, 'apply')}
                                style={{
                                    display: 'block',
                                    padding: '12px 16px',
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'white',
                                    borderRadius: 'var(--radius-md)',
                                    fontWeight: 500,
                                    textAlign: 'center',
                                    marginTop: '0.5rem',
                                    textDecoration: 'none'
                                }}
                            >
                                Apply Now
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
