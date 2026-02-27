import React from 'react';
import { motion } from 'framer-motion';
import './Capabilities.css';

const CAPABILITIES = [
    "SECURE AUTH SYSTEMS",
    "REST API DEVELOPMENT",
    "DATABASE SCHEMA DESIGN",
    "IMAGE UPLOAD PIPELINES",
    "AUTOMATED EMAIL INTEGRATION",
    "WORKFLOW LOGIC",
    "RESPONSIVE ARCHITECTURE",
    "COMPONENT-BASED UI",
    "PRODUCTION DEPLOYMENT",
    "MODULAR CODE ARCHITECTURE"
];

const Capabilities = () => {
    const allCaps = [...CAPABILITIES, ...CAPABILITIES];

    return (
        <section className="capabilities-section" id="capabilities">
            <motion.div
                className="section-heading-tag"
                data-label="CAPABILITIES"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <span className="tag-text">&lt;capabilities /&gt;</span>
                <div className="tag-gradient-line"></div>
            </motion.div>

            <div className="ticker-track">
                <div className="ticker-scroll">
                    {allCaps.map((cap, i) => (
                        <div key={i} className="cap-pill">
                            <span className="cap-title">{cap}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Capabilities;
