import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Preloader.css';

const INIT_STEPS = [
    "INITIALIZING CORE SYSTEMS...",
    "OPTIMIZING RENDER ENGINE...",
    "LOADING ARCHITECTURAL MAPS...",
    "ESTABLISHING NEURAL LINK...",
    "SYSTEMS READY."
];

const Preloader = ({ onLoadingComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [showContent, setShowContent] = useState(true);

    useEffect(() => {
        // Step progression
        const stepInterval = setInterval(() => {
            setCurrentStep(prev => {
                if (prev < INIT_STEPS.length - 1) return prev + 1;
                clearInterval(stepInterval);
                return prev;
            });
        }, 800);

        // Progress bar simulation
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                const next = prev + Math.random() * 12;
                if (next >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(() => {
                        setShowContent(false);
                        setTimeout(onLoadingComplete, 600);
                    }, 500);
                    return 100;
                }
                return next;
            });
        }, 300);

        return () => {
            clearInterval(stepInterval);
            clearInterval(progressInterval);
        };
    }, [onLoadingComplete]);

    return (
        <AnimatePresence>
            {showContent && (
                <motion.div
                    className="preloader-overlay"
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Background elements to match the site */}
                    <div className="loader-bg-elements">
                        <div className="l-blob l-blob-1"></div>
                        <div className="l-blob l-blob-2"></div>
                        <div className="l-grid"></div>
                    </div>

                    <div className="preloader-content">
                        <motion.div
                            className="loader-terminal"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <span className="loader-prompt">❯</span>
                            <span className="loader-text">{INIT_STEPS[currentStep]}</span>
                            <span className="loader-cursor"></span>
                        </motion.div>

                        <div className="loader-progress-container">
                            <motion.div
                                className="loader-progress-bar"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: "easeOut" }}
                            ></motion.div>
                        </div>

                        <div className="loader-status-row">
                            <span className="loader-percent">{Math.round(progress)}%</span>
                            <span className="loader-status">BOOTING_SEQUENCE</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
