import React from 'react';
import { motion } from 'framer-motion';

const SideNav = ({ activeSection }) => {
    const sections = [
        { id: 'hero', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'projects', label: 'Projects' },
        { id: 'calendar', label: 'Calendar' },
        { id: 'testimonials', label: 'Past Partners' },
        { id: 'faq', label: 'FAQ' },
        { id: 'apply', label: 'Apply' }
    ];

    const handleClick = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    // The 'apply' section has a dark background, so we need light text/dots there.
    const isDarkBackground = activeSection === 'apply';
    const baseColor = isDarkBackground ? 'rgba(255, 255, 255, 0.5)' : 'var(--color-text-muted)';
    const activeColor = isDarkBackground ? 'white' : 'var(--color-primary)';

    return (
        <div className="side-nav" style={{
            position: 'fixed',
            right: '40px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            zIndex: 100
        }}>
            {sections.map((section) => (
                <div
                    key={section.id}
                    style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', cursor: 'pointer', gap: '12px' }}
                    onClick={() => handleClick(section.id)}
                >
                    {/* Label (only visible on hover or active) */}
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                            opacity: activeSection === section.id ? 1 : 0,
                            x: 0 // Reset x transform since we use flex gap now
                        }}
                        whileHover={{ opacity: 1, x: 0 }}
                        style={{
                            whiteSpace: 'nowrap',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: activeColor,
                            pointerEvents: activeSection === section.id ? 'auto' : 'none'
                        }}
                    >
                        {section.label}
                    </motion.div>

                    {/* Dot */}
                    <motion.div
                        animate={{
                            scale: activeSection === section.id ? 1.5 : 1,
                            backgroundColor: activeSection === section.id ? activeColor : baseColor,
                            opacity: activeSection === section.id ? 1 : 0.5
                        }}
                        whileHover={{ scale: 1.5, opacity: 1, backgroundColor: activeColor }}
                        style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            transition: 'background-color 0.2s',
                            border: isDarkBackground ? '1px solid rgba(255,255,255,0.2)' : 'none'
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default SideNav;
