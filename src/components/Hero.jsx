import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import './Hero.css';

const ROLES = [
    "React Developer",
    "Node.js Developer",
    "MERN Stack Developer"
];

const Hero = () => {
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayedRole, setDisplayedRole] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const handleTyping = () => {
            const fullText = ROLES[roleIndex];

            if (isDeleting) {
                // Deleting
                setDisplayedRole((prev) => prev.substring(0, prev.length - 1));
                setTypingSpeed(50); // Faster delete
            } else {
                // Typing
                setDisplayedRole((prev) => fullText.substring(0, prev.length + 1));
                setTypingSpeed(150); // Normal typing speed
            }

            // Check if word is complete
            if (!isDeleting && displayedRole === fullText) {
                // Pause at end
                setTimeout(() => setIsDeleting(true), 2000); // 2s pause
            } else if (isDeleting && displayedRole === "") {
                // Completely deleted, move to next
                setIsDeleting(false);
                setRoleIndex((prev) => (prev + 1) % ROLES.length);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [displayedRole, isDeleting, roleIndex, typingSpeed]);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Slightly slower stagger for elegance
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const nameVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } // Very smooth easing
        }
    };

    return (
        <section className="hero-section" id="home">
            <motion.div
                className="hero-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Availability Label */}
                <motion.div variants={itemVariants} className="availability-label">
                    <div className="pulsing-dot"></div>
                    <span>Available for Full-Time Roles</span>
                </motion.div>

                {/* Main Name - Luxury Serif */}
                <motion.h1 variants={nameVariants} className="hero-name">
                    DHARANI DHARAN
                </motion.h1>

                {/* Role Line with Real Typing Animation */}
                <motion.div variants={itemVariants} className="role-line">
                    <span className="static-text">Full Stack Developer | </span>
                    <span className="typing-container">
                        {displayedRole}
                        <span className="cursor-blink">|</span>
                    </span>
                </motion.div>

                {/* Tagline */}
                <motion.p variants={itemVariants} className="tagline">
                    I build scalable full-stack applications with clean UI and secure backend systems.
                </motion.p>

                {/* Tech Stack Pills */}
                <motion.div variants={itemVariants} className="tech-stack">
                    {["React.js", "Node.js", "Java", "MongoDB", "MySQL", "Tailwind CSS"].map((tech) => (
                        <motion.div
                            key={tech}
                            className="tech-pill"
                            whileHover={{ y: -4 }}
                        >
                            {tech}
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div variants={itemVariants} className="cta-buttons">
                    <motion.a
                        href="#projects"
                        className="btn btn-primary"
                        whileHover={{ y: -3, boxShadow: "0 10px 25px rgba(37, 99, 235, 0.4)" }}
                    >
                        <span>View Projects</span>
                        <ArrowRight className="icon-arrow" size={18} />
                    </motion.a>

                    <motion.a
                        href="/resume.pdf"
                        className="btn btn-secondary"
                        whileHover={{ y: -2 }}
                    >
                        <span>Download Resume</span>
                        <Download className="icon-download" size={18} />
                    </motion.a>
                </motion.div>

            </motion.div>
        </section>
    );
};

export default Hero;
