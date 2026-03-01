import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import profileImg from '../assets/profile.webp';
import '../styles/About.css';

const focusAreas = [
    "Full-Stack Development",
    "Interactive UI",
    "React Architecture",
    "Performance Tuning",
    "Responsive Systems",
    "REST APIs"
];



const terminalLines = [
    { type: 'cmd', text: 'echo $PHILOSOPHY' },
    { type: 'accent', text: '"Ship clean code. Build complete products."' },
    { type: 'cmd', text: 'echo $APPROACH' },
    { type: 'accent', text: '"Every project is a full product — planned, built, and polished."' },
    { type: 'cmd', text: 'echo $MISSION' },
    { type: 'accent', text: '"Create web experiences that feel alive and premium."' },
];

const metrics = [
    { label: "Projects", value: 15, suffix: "+" },
    { label: "Technologies", value: 10, suffix: "+" },
    { label: "Commits", value: 500, suffix: "+" }
];



// Animated Counter Hook
const useCounter = (target, duration = 2000) => {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (!started) return;
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [started, target, duration]);

    return [count, setStarted];
};

// Typing Animation Hook
const useTypingEffect = (text, speed = 30, startDelay = 0) => {
    const [displayed, setDisplayed] = useState("");
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (!started) return;
        let i = 0;
        const delayTimer = setTimeout(() => {
            const interval = setInterval(() => {
                setDisplayed(text.substring(0, i + 1));
                i++;
                if (i >= text.length) clearInterval(interval);
            }, speed);
            return () => clearInterval(interval);
        }, startDelay);
        return () => clearTimeout(delayTimer);
    }, [started, text, speed, startDelay]);

    return [displayed, setStarted];
};

// Spring animation config
const springConfig = { type: "spring", stiffness: 100, damping: 15 };

const About = () => {
    return (
        <section className="about-section" id="about">
            <motion.div
                className="about-label-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="section-heading-tag" data-label="ABOUT">
                    <span className="tag-text">&lt;about /&gt;</span>
                    <div className="tag-gradient-line"></div>
                </div>
            </motion.div>

            <div className="bento-grid">
                {/* Cell 1: Profile Image with 3D Tilt (spans 2 rows) */}
                <motion.div
                    className="bento-cell cell-image glow-border"
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ ...springConfig, delay: 0 }}
                >
                    <TiltImage />
                    <div className="profile-id">
                        <span className="id-name">Dharani Dharan</span>
                        <span className="id-role">Full Stack Developer</span>
                        <div className="availability-badge">
                            <div className="avail-dot"></div>
                            <span className="avail-text">Available for Work</span>
                        </div>
                    </div>
                </motion.div>



                {/* Terminal Bio (typing animation) */}
                <motion.div
                    className="bento-cell cell-terminal glow-border"
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ ...springConfig, delay: 0.1 }}
                >
                    <TerminalBio />
                </motion.div>

                {/* Focus Areas */}
                <motion.div
                    className="bento-cell cell-focus glow-border"
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ ...springConfig, delay: 0.15 }}
                >
                    <h3 className="cell-heading">Focus Areas</h3>
                    <div className="focus-pills">
                        {focusAreas.map((area, i) => (
                            <motion.span
                                key={i}
                                className="focus-pill"
                                initial={{ opacity: 0, scale: 0.7, y: 10 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ ...springConfig, delay: 0.05 * i }}
                                whileHover={{ y: -4, borderColor: 'var(--accent-indigo)', scale: 1.05 }}
                            >
                                {area}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                {/* Cell 5: Metrics / Achievement Stats */}
                <motion.div
                    className="bento-cell cell-metrics glow-border"
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ ...springConfig, delay: 0.2 }}
                >
                    <h3 className="cell-heading">Metrics</h3>
                    <div className="metrics-row">
                        {metrics.map((m, i) => (
                            <MetricCounter key={i} metric={m} />
                        ))}
                    </div>
                </motion.div>




            </div>
        </section>
    );
};

/* 3D Tilt Profile Image */
const TiltImage = () => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

    const handleMouse = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(px);
        y.set(py);
    };

    const handleLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div
            ref={ref}
            className="profile-frame"
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
            <img
                src={profileImg}
                alt="Dharani Dharan"
                className="profile-img"
            />
        </motion.div>
    );
};

/* Terminal Bio with Typing Effect */
const TerminalBio = () => {
    const [visibleLines, setVisibleLines] = useState(0);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        if (!inView) return;
        let i = 0;
        const timer = setInterval(() => {
            i++;
            setVisibleLines(i);
            if (i >= terminalLines.length) clearInterval(timer);
        }, 600);
        return () => clearInterval(timer);
    }, [inView]);

    return (
        <motion.div
            className="mini-terminal"
            onViewportEnter={() => setInView(true)}
        >
            <div className="term-header">
                <div className="term-dots">
                    <span className="td close"></span>
                    <span className="td minimize"></span>
                    <span className="td expand"></span>
                </div>
                <span className="term-title">dharani@portfolio ~</span>
            </div>
            <div className="term-body">
                {terminalLines.slice(0, visibleLines).map((line, i) => (
                    <div key={i} className={`term-line term-${line.type}`}>
                        {line.type === 'cmd' ? (
                            <div className="term-cmd">
                                <span className="term-prompt">❯</span>
                                <span className="term-command">{line.text}</span>
                            </div>
                        ) : (
                            <div className={`term-output term-output--${line.type}`}>
                                {line.text}
                            </div>
                        )}
                    </div>
                ))}
                <div className="term-cmd">
                    <span className="term-prompt">❯</span>
                    <span className="term-cursor"></span>
                </div>
            </div>
        </motion.div>
    );
};

/* Animated Counter for Metrics */
const MetricCounter = ({ metric }) => {
    const [count, setStarted] = useCounter(metric.value, 1500);
    return (
        <motion.div
            className="metric-item"
            onViewportEnter={() => setStarted(true)}
        >
            <span className="metric-value">{count}{metric.suffix}</span>
            <span className="metric-label">{metric.label}</span>
        </motion.div>
    );
};

export default About;
