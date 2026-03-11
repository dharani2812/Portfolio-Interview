import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import challengesData from '../data/challengesData';
import '../styles/Challenges.scss';

const Challenges = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section id="challenges" className="challenges-section">
            <div className="title-glow"></div>
            <div className="section-heading-tag" data-label="CHALLENGES">
                <span className="tag-text">Engineering Insights</span>
            </div>

            <header className="challenges-header">
                <h2 className="section-title">Engineering Challenges I Solved</h2>
                <p className="section-description">
                    During the development of my projects, I encountered several technical challenges across both frontend and backend. Below are some real problems I faced and how I approached solving them.
                </p>
            </header>

            <div
                className="challenges-accordion"
                onMouseLeave={() => setActiveIndex(null)}
            >
                <div className="timeline-guide"></div>
                {challengesData.map((challenge, index) => (
                    <motion.div
                        key={index}
                        className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
                        onMouseEnter={() => setActiveIndex(index)}
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                        <div className="timeline-dot"></div>
                        <div className="accordion-header">
                            <div className="header-left">
                                <h3 className="challenge-title">{challenge.title}</h3>
                            </div>
                            <motion.div
                                className="expand-icon"
                                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronDown size={20} />
                            </motion.div>
                        </div>

                        <AnimatePresence initial={false}>
                            {activeIndex === index && (
                                <motion.div
                                    className="accordion-content"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{
                                        height: { type: "spring", stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.2 }
                                    }}
                                >
                                    <motion.div
                                        className="content-inner"
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.1, duration: 0.2 }}
                                    >
                                        <div className="challenge-tags">
                                            {challenge.tags.map(tag => (
                                                <span key={tag} className="tech-tag">{tag}</span>
                                            ))}
                                        </div>
                                        <p>{challenge.description}</p>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Challenges;
