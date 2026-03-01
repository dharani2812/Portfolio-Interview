import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('Home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Scroll Spy Logic based on viewport position
            const sections = ['home', 'skills', 'projects', 'about'];
            let currentSection = 'Home'; // default

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If the section's top is above the middle of the screen
                    // and its bottom is below the top quarter of the screen
                    if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
                        currentSection = sectionId === 'home' ? 'Home' :
                            sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
                    }
                }
            }

            // Force "Home" if we're at the very top (safeguard)
            if (window.scrollY < 100) {
                setActiveSection('Home');
            } else {
                setActiveSection(currentSection);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Trigger once on mount

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'About', href: '#about' },
    ];

    // Framer Motion Variants for Staggered Mobile Menu
    const menuVariants = {
        closed: {
            opacity: 0,
            scale: 0.95,
            y: -20,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1, // Reverse stagger on exit
                when: "afterChildren" // Wait for items to disappear before hiding card
            }
        },
        open: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                bounce: 0,
                duration: 0.4,
                delayChildren: 0.1, // Wait for card to start appearing before popping links
                staggerChildren: 0.08 // Time gap between each link popping in
            }
        }
    };

    const itemVariants = {
        closed: { opacity: 0, y: 15 },
        open: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        }
    };

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
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        {/* Glow Orbs behind the glass */}
                        <div className="hologram-orb orb-1"></div>
                        <div className="hologram-orb orb-2"></div>

                        <div className="mobile-menu-glass">
                            {navLinks.map((link) => (
                                <motion.a
                                    variants={itemVariants}
                                    key={link.name}
                                    href={link.href}
                                    className={`mobile-nav-link ${activeSection === link.name ? 'active' : ''}`}
                                    onClick={() => {
                                        setActiveSection(link.name);
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <motion.a
                                variants={itemVariants}
                                href="#contact"
                                className="mobile-btn-contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
