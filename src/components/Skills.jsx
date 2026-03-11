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
    const [displayState, setDisplayState] = useState({
        lines: [],        // completed command+output pairs
        typing: '',       // currently typing text
        phase: 'idle'     // idle | typing | done
    });

    const animStarted = useRef(false);
    const timersRef = useRef([]);

    const clearAllTimers = useCallback(() => {
        timersRef.current.forEach(t => clearTimeout(t));
        timersRef.current = [];
    }, []);

    const startAnimation = useCallback(() => {
        // Prevent double execution from React Strict Mode
        if (animStarted.current) return;
        animStarted.current = true;

        let itemIdx = 0;
        let charIdx = 0;

        const scheduleNext = (fn, delay) => {
            const id = setTimeout(fn, delay);
            timersRef.current.push(id);
        };

        const tick = () => {
            if (itemIdx >= SKILLS_DATA.length) {
                setDisplayState(prev => ({ ...prev, typing: '', phase: 'done' }));
                return;
            }

            const cmd = SKILLS_DATA[itemIdx].command;

            if (charIdx <= cmd.length) {
                setDisplayState(prev => ({
                    ...prev,
                    typing: cmd.slice(0, charIdx),
                    phase: 'typing'
                }));
                charIdx++;
                scheduleNext(tick, 18 + Math.random() * 12);
            } else {
                // Command fully typed — add to completed lines
                const completedItem = SKILLS_DATA[itemIdx];
                setDisplayState(prev => ({
                    lines: [...prev.lines, completedItem],
                    typing: '',
                    phase: 'typing'
                }));
                charIdx = 0;
                itemIdx++;
                scheduleNext(tick, 150);
            }
        };

        // Start after a short delay
        scheduleNext(tick, 250);
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => clearAllTimers();
    }, [clearAllTimers]);

    const { lines, typing, phase } = displayState;

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
                    onViewportEnter={startAnimation}
                    viewport={{ once: true, amount: 0.3 }}
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
                        {/* Completed commands */}
                        {lines.map((item, i) => (
                            <div key={i} className="terminal-group">
                                <div className="command-line">
                                    <span className="prompt">&gt;</span>
                                    <span className="command-text">{item.command}</span>
                                </div>
                                <motion.div
                                    className="output-text"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {item.output}
                                </motion.div>
                            </div>
                        ))}

                        {/* Currently typing */}
                        {phase === 'typing' && (
                            <div className="terminal-group">
                                <div className="command-line">
                                    <span className="prompt">&gt;</span>
                                    <span className="command-text">{typing}</span>
                                    <span className="terminal-cursor"></span>
                                </div>
                            </div>
                        )}

                        {/* Final blinking cursor */}
                        {phase === 'done' && (
                            <div className="terminal-group">
                                <div className="command-line">
                                    <span className="prompt">&gt;</span>
                                    <span className="terminal-cursor"></span>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
});

export default Skills;
