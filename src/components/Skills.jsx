import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import '../styles/Skills.css';

const SKILLS_DATA = [
    {
        command: 'stack --frontend',
        output: 'HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS, SCSS, Bootstrap'
    },
    {
        command: 'stack --backend',
        output: 'Node.js, Express.js, REST API Design, JWT Authentication, MVC Architecture, CRUD Operations'
    },
    {
        command: 'stack --languages-db',
        output: 'Java, SQL (MySQL), NoSQL (MongoDB), Firebase Firestore'
    },
    {
        command: 'stack --tools-deploy',
        output: 'Git, GitHub, VS Code, Figma, Vercel, Netlify, Render'
    }
];

const Skills = React.memo(() => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    const outputVariants = {
        hidden: { opacity: 0, y: 5 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: "easeOut" }
        }
    };

    return (
        <section className="skills-section" id="skills">
            <div className="skills-container">
                <motion.div
                    className="section-heading-tag"
                    data-label="SKILLS"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="tag-text">&lt;skills /&gt;</span>
                    <div className="tag-gradient-line"></div>
                </motion.div>

                <motion.div
                    className="terminal-window"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={containerVariants}
                >
                    <div className="terminal-header">
                        <div className="terminal-dots">
                            <span className="dot close"></span>
                            <span className="dot minimize"></span>
                            <span className="dot expand"></span>
                        </div>
                        <div className="terminal-title">terminal — skills</div>
                    </div>

                    <div className="terminal-body">
                        {SKILLS_DATA.map((item, i) => (
                            <motion.div 
                                key={i} 
                                className="terminal-group"
                                variants={itemVariants}
                            >
                                <div className="command-line">
                                    <span className="prompt">&gt;</span>
                                    <span className="command-text">{item.command}</span>
                                </div>
                                <motion.div
                                    className="output-text"
                                    variants={outputVariants}
                                >
                                    {item.output}
                                </motion.div>
                            </motion.div>
                        ))}

                        {/* Final blinking cursor */}
                        <motion.div className="terminal-group" variants={itemVariants}>
                            <div className="command-line">
                                <span className="prompt">&gt;</span>
                                <span className="terminal-cursor"></span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
});

export default Skills;
