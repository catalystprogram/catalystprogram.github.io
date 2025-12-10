import React from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ activeSection }) => {
    const links = [
        { id: 'about', label: 'About' },
        { id: 'projects', label: 'Projects' },
        { id: 'calendar', label: 'Calendar' },
        { id: 'testimonials', label: 'Past Partners' },
        { id: 'faq', label: 'FAQ' },
    ];

    const handleClick = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                backgroundColor: 'var(--color-background)',
                height: 'var(--header-height)',
                backgroundImage: 'url(/header-bg.png)',
                backgroundRepeat: 'repeat',
                backgroundSize: '150px auto', // Adjust size as needed
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
                        src="/logo.png"
                        alt="Catalyst Program"
                        style={{ height: '160px', width: 'auto' }}
                    />
                </motion.a>

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
            </div>
        </motion.nav>
    );
};

export default Navbar;
