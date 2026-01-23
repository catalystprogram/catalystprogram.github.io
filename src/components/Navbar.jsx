import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ activeSection }) => {
    const navRef = useRef(null);
    const resizeTimer = useRef(null);

    // Defaults safe for SSR
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(80); // px default
    const [logoHeight, setLogoHeight] = useState(64); // px default (80% of 80)

    // Single effect: compute sizes and isMobile, with debounce on resize
    useEffect(() => {
        const parseHeaderValue = (val) => {
            if (!val) return null;
            // val might be "80px", "5rem", etc. parseFloat handles px/rem numeric part.
            const parsed = parseFloat(val);
            if (isNaN(parsed)) return null;
            return parsed;
        };

        const updateSizes = () => {
            try {
                // isMobile
                setIsMobile(window.innerWidth <= 768);

                // Try reading CSS variable on :root first
                const rootStyle = getComputedStyle(document.documentElement);
                let headerValue = rootStyle.getPropertyValue('--header-height');

                // If root variable empty, try computed height of the nav element
                if (!headerValue || !headerValue.trim()) {
                    if (navRef.current) {
                        headerValue = getComputedStyle(navRef.current).height;
                    }
                }

                const parsed = parseHeaderValue(headerValue);
                if (parsed) {
                    // If CSS variable used relative units (rem), parseFloat still gives numeric
                    // We'll assume the value is in px after computed styles; for rem this numeric will be converted by the browser already if reading computedStyle of nav.
                    // Use 80% of header height for logo (keeps padding)
                    const calculatedLogo = Math.round(parsed * 0.8);
                    setHeaderHeight(Math.round(parsed));
                    setLogoHeight(calculatedLogo);
                } else if (navRef.current) {
                    // As a final fallback, measure the nav element's boundingClientRect
                    const measured = Math.round(navRef.current.getBoundingClientRect().height);
                    const calculatedLogo = Math.round(measured * 0.8);
                    setHeaderHeight(measured);
                    setLogoHeight(calculatedLogo);
                }
            } catch (err) {
                // keep defaults if anything fails
                // console.warn('Navbar sizing update failed', err);
            }
        };

        // Run once immediately (client-side)
        updateSizes();

        const handleResizeDebounced = () => {
            if (resizeTimer.current) clearTimeout(resizeTimer.current);
            resizeTimer.current = setTimeout(() => {
                updateSizes();
                resizeTimer.current = null;
            }, 120); // 120ms debounce
        };

        window.addEventListener('resize', handleResizeDebounced);
        return () => {
            window.removeEventListener('resize', handleResizeDebounced);
            if (resizeTimer.current) clearTimeout(resizeTimer.current);
        };
    }, []);

    const links = [
        { id: 'about', label: 'About' },
        { id: 'projects', label: 'Projects' },
        { id: 'calendar', label: 'Calendar' },
        { id: 'testimonials', label: 'Past Partners' },
        { id: 'faq', label: 'FAQ' },
    ];

    const scrollToElementWithOffset = (element) => {
        if (!element) return;
        // Use headerHeight as offset so the element lands just below the nav.
        // Add small extra padding (5% of header) so content isn't flush against the nav.
        const extraPadding = Math.round(headerHeight * 0.05);
        const y = element.getBoundingClientRect().top + window.pageYOffset - headerHeight + extraPadding;
        window.scrollTo({ top: y, behavior: 'smooth' });
    };

    const handleClick = (e, id) => {
        e.preventDefault();
        setMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            // For non-mobile, scroll taking header offset into account
            scrollToElementWithOffset(element);
        }
    };

    const handleMobileClick = (e, id) => {
        e.preventDefault();
        setMenuOpen(false);
        // Small delay to let menu close first for the animation
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                scrollToElementWithOffset(element);
            }
        }, 150);
    };

    return (
        <>
            <motion.nav
                ref={navRef}
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
                            srcSet="/full logo.png 1x, /full logo@2x.png 2x"
                            alt="Catalyst Program"
                            style={{
                                height: `${logoHeight}px`,
                                width: 'auto',
                                objectFit: 'contain'
                            }}
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
                            }
                            }
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