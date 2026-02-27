import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('Home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Force "Home" if we're at the very top
            if (window.scrollY < 100) {
                setActiveSection('Home');
            }
        };

        // Scroll Spy Logic
        const sections = ['home', 'skills', 'projects', 'about'];
        const observerOptions = {
            root: null,
            // Section is active when it occupies the top part of the viewport
            rootMargin: '-15% 0px -70% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    const linkName = sectionId === 'home' ? 'Home' :
                        sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
                    setActiveSection(linkName);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'About', href: '#about' },
    ];

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Left Side: Logo */}
                <div className="navbar-logo">
                    <span>Dharani</span>
                </div>

                {/* Center: Glass Menu (Desktop) */}
                <div className="navbar-menu-desktop">
                    <div className="glass-pill">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`nav-link ${activeSection === link.name ? 'active' : ''}`}
                                onClick={() => setActiveSection(link.name)}
                            >
                                <span className="nav-link-text">{link.name}</span>
                                <span className="nav-link-underline"></span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Right Side: Contact Button (Desktop) */}
                <div className="navbar-actions-desktop">
                    <a href="#contact" className="btn-contact">
                        Contact
                    </a>
                </div>

                {/* Mobile Hamburger */}
                <div className="navbar-mobile-toggle">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="mobile-menu-overlay"
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        <div className="mobile-menu-glass">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`mobile-nav-link ${activeSection === link.name ? 'active' : ''}`}
                                    onClick={() => {
                                        setActiveSection(link.name);
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                className="mobile-btn-contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
