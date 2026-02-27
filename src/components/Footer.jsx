import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Footer.css';

/* Live Clock Hook */
const useLiveClock = () => {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const t = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(t);
    }, []);
    return time;
};

const techStack = [
    { name: 'React', icon: '⚛️' },
    { name: 'Vite', icon: '⚡' },
    { name: 'Framer Motion', icon: '🎞️' },
    { name: 'JavaScript', icon: '🟨' },
];

const Footer = () => {
    const clock = useLiveClock();
    const [clickCount, setClickCount] = useState(0);
    const [easterEgg, setEasterEgg] = useState(false);
    const [visitorCount, setVisitorCount] = useState(() => {
        const stored = localStorage.getItem('portfolio-visitors');
        return stored ? parseInt(stored) : 0;
    });

    // Increment only once per session
    useEffect(() => {
        const sessionKey = 'portfolio-session-counted';
        if (!sessionStorage.getItem(sessionKey)) {
            sessionStorage.setItem(sessionKey, 'true');
            setVisitorCount(prev => {
                const next = prev + 1;
                localStorage.setItem('portfolio-visitors', next.toString());
                return next;
            });
        }
    }, []);

    const timeStr = clock.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit',
        hour12: true, timeZone: 'Asia/Kolkata'
    });

    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLogoClick = () => {
        const next = clickCount + 1;
        setClickCount(next);
        if (next >= 5) {
            setEasterEgg(true);
            setClickCount(0);
            setTimeout(() => setEasterEgg(false), 4000);
        }
    };

    const taglines = [
        'Designed & Built with passion',
        '☕ Fueled by caffeine & curiosity',
        '🚀 Shipping pixels since day one',
        '✨ Crafted with obsessive attention to detail'
    ];

    return (
        <footer className="site-footer">
            {/* Animated Wave Divider */}
            <div className="footer-wave">
                <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
                    <path className="wave-path wave-1" d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z" />
                    <path className="wave-path wave-2" d="M0,35 C320,10 640,55 960,30 C1200,10 1360,45 1440,35 L1440,60 L0,60 Z" />
                </svg>
            </div>

            <div className="footer-container">
                {/* Current Status Line */}
                <motion.div
                    className="footer-status-line"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="fsl-dot"></span>
                    <span className="fsl-text">Currently: ☕ Coding from India</span>
                    <span className="fsl-divider">|</span>
                    <span className="fsl-time">{timeStr} IST</span>
                </motion.div>

                {/* Top row */}
                <div className="footer-top">
                    <div className="footer-brand" onClick={handleLogoClick}>
                        <span className="footer-logo">DD</span>
                        <span className="footer-name">Dharani Dharan</span>
                    </div>

                    <nav className="footer-nav">
                        <a href="#skills" className="footer-nav-link">Skills</a>
                        <a href="#projects" className="footer-nav-link">Projects</a>
                        <a href="#about" className="footer-nav-link">About</a>
                        <a href="#contact" className="footer-nav-link">Contact</a>
                    </nav>

                    <div className="footer-socials">
                        <a href="https://github.com/dharani2812" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="GitHub">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/dharaniharan/" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="LinkedIn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Tech Stack Badges */}
                <div className="footer-tech-row">
                    <span className="footer-tech-label">Built with</span>
                    {techStack.map((tech, i) => (
                        <motion.span
                            key={i}
                            className="footer-tech-badge"
                            whileHover={{ y: -2, borderColor: 'rgba(129, 140, 248, 0.3)' }}
                        >
                            <span className="ftb-icon">{tech.icon}</span>
                            <span className="ftb-name">{tech.name}</span>
                        </motion.span>
                    ))}
                </div>

                {/* Divider */}
                <div className="footer-divider"></div>

                {/* Bottom row */}
                <div className="footer-bottom">
                    <span className="footer-copy">© {currentYear} Dharani Dharan. All rights reserved.</span>

                    {/* Easter Egg Tagline */}
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={easterEgg ? 'egg' : 'normal'}
                            className={`footer-tagline ${easterEgg ? 'footer-tagline-egg' : ''}`}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            {easterEgg ? '🎉 You found the secret! You\'re awesome!' : taglines[0]}
                        </motion.span>
                    </AnimatePresence>

                    {/* Visitor Counter */}
                    <div className="footer-visitor">
                        <span className="fv-label">Visitor</span>
                        <span className="fv-count">#{visitorCount.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <motion.button
                className="back-to-top"
                onClick={scrollToTop}
                whileHover={{ y: -4, boxShadow: '0 6px 20px rgba(129, 140, 248, 0.3)' }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                aria-label="Back to top"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
            </motion.button>
        </footer>
    );
};

export default Footer;
