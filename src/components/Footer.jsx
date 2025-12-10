import React from 'react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '40px 0' }}>
            <div className="container" style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1.5rem'
            }}>
                <div style={{ textAlign: 'center', flex: '1 1 auto', minWidth: '200px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Catalyst Program</div>
                    <p style={{ color: 'rgba(255,255,255,0.7)' }}>Empowering students aimed at high impact.</p>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flex: '1 1 auto' }}>
                    <a href="https://www.linkedin.com/company/catalyst-projects-program/" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>LinkedIn</a>
                    <a href="mailto:catalyst.program.board@gmail.com" style={{ color: 'white' }}>Contact</a>
                </div>
            </div>
            <div className="container" style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.2)', textAlign: 'center', fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>
                © {new Date().getFullYear()} Catalyst Program. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
