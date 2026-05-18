import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import '../styles/Architecture.css';

const workflowStages = [
    { title: "Planning & Strategy", description: "Scope and blueprinting.", icon: "📋" },
    { title: "UI/UX Design", description: "Visuals and prototypes.", icon: "🎨" },
    { title: "Architecture Setup", description: "Stack and hierarchy.", icon: "🏗️" },
    { title: "Core Development", description: "Components and logic.", icon: "💻" },
    { title: "Visual Refinement", description: "Polishing details.", icon: "✨" },
    { title: "Build Optimization", description: "Production bundling.", icon: "⚡" },
    { title: "Deployment & Launch", description: "Global edge delivery.", icon: "🚀" },
    { title: "Optimization & Stats", description: "Monitoring and tuning.", icon: "📈" }
];

const Architecture = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start center", "end center"]
    });

    const pathLength = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section className="architecture-section compact-zigzag" id="architecture" ref={sectionRef}>
            <div className="architecture-header">
                <div className="section-heading-tag" data-label="ARCHITECTURE">
                    <span className="tag-text">&lt;architecture /&gt;</span>
                    <div className="tag-gradient-line"></div>
                </div>
            </div>

            <div className="zigzag-container">
                {/* Centered Straight Vertical Path */}
                <div className="zigzag-line-wrapper">
                    <svg className="zigzag-svg" viewBox="0 0 2 100" preserveAspectRatio="none">
                        <line x1="1" y1="0" x2="1" y2="100" className="path-bg" />
                        <motion.line
                            x1="1" y1="0" x2="1" y2="100"
                            className="path-active"
                            style={{ pathLength }}
                        />
                    </svg>
                </div>

                <div className="zigzag-stages">
                    {workflowStages.map((stage, index) => (
                        <StageNode
                            key={index}
                            stage={stage}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const StageNode = ({ stage, index }) => {
    const isEven = index % 2 === 0;
    return (
        <motion.div
            className={`zigzag-node ${isEven ? 'left' : 'right'}`}
            initial={{ opacity: 0.2, x: isEven ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <div className="zigzag-pill">
                <div className="zigzag-icon">{stage.icon}</div>
                <div className="zigzag-content">
                    <h3 className="zigzag-title">{stage.title}</h3>
                    <p className="zigzag-desc">{stage.description}</p>
                </div>
            </div>
            {/* The dot anchors to the centered path */}
            <div className="zigzag-dot"></div>
        </motion.div>
    );
};

export default Architecture;
