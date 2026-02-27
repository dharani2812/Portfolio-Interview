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
                    <motion.div
                        className="quantum-core-logo"
                        whileHover="hover"
                        initial="initial"
                        animate="animate"
                    >
                        <div className="qc-container">
                            {/* Outer Ring - Z axis rotation */}
                            <motion.div
                                className="qc-ring qc-ring-1"
                                variants={{
                                    initial: { rotateZ: 0 },
                                    animate: { rotateZ: 360, transition: { duration: 8, repeat: Infinity, ease: "linear" } },
                                    hover: { rotateZ: 180, scale: 1.1, borderColor: "rgba(6, 182, 212, 0.8)", transition: { duration: 0.8, ease: "backOut" } }
                                }}
                            />

                            {/* Middle Ring - Y & X axis complex rotation */}
                            <motion.div
                                className="qc-ring qc-ring-2"
                                variants={{
                                    initial: { rotateX: 60, rotateY: 0 },
                                    animate: { rotateX: 60, rotateY: 360, transition: { duration: 6, repeat: Infinity, ease: "linear" } },
                                    hover: { rotateX: 0, rotateY: 0, scale: 1.15, borderColor: "rgba(79, 70, 229, 0.9)", transition: { duration: 0.8, ease: "backOut" } }
                                }}
                            />

                            {/* Inner Ring - X & Y axis contrasting rotation */}
                            <motion.div
                                className="qc-ring qc-ring-3"
                                variants={{
                                    initial: { rotateY: 60, rotateX: 0 },
                                    animate: { rotateY: 60, rotateX: -360, transition: { duration: 5, repeat: Infinity, ease: "linear" } },
                                    hover: { rotateY: 0, rotateX: 0, scale: 0.9, borderColor: "rgba(139, 92, 246, 0.9)", transition: { duration: 0.8, ease: "backOut" } }
                                }}
                            />

                            {/* Glowing Center Core */}
                            <motion.div
                                className="qc-core"
                                variants={{
                                    initial: { scale: 0.8, opacity: 0.7 },
                                    animate: { scale: [0.8, 1, 0.8], opacity: [0.7, 1, 0.7], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } },
                                    hover: { scale: 1.5, opacity: 1, boxShadow: "0 0 20px 5px rgba(79, 70, 229, 0.6)", background: "linear-gradient(135deg, #06b6d4, #4f46e5)", transition: { duration: 0.4 } }
                                }}
                            />
                        </div>
                    </motion.div>
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
