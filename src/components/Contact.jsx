import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import './Contact.css';

const channels = [
    {
        id: 'email',
        cmd: 'mailto',
        target: 'dharanidharand28@gmail.com',
        href: 'mailto:dharanidharand28@gmail.com',
        copyText: 'dharanidharand28@gmail.com',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13 2 4" />
            </svg>
        )
    },
    {
        id: 'linkedin',
        cmd: 'connect',
        target: 'linkedin.com/in/dharanidharan',
        href: 'https://www.linkedin.com/in/dharaniharan/',
        copyText: 'https://www.linkedin.com/in/dharaniharan/',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        )
    },
    {
        id: 'github',
        cmd: 'explore',
        target: 'github.com/dharani2812',
        href: 'https://github.com/dharani2812',
        copyText: 'https://github.com/dharani2812',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
        )
    }
];

/* Live Clock Hook */
const useLiveClock = () => {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const t = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(t);
    }, []);
    return time;
};

const Contact = () => {
    const [copiedId, setCopiedId] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [formSent, setFormSent] = useState(false);
    const formRef = React.useRef();

    // Initialize EmailJS
    useEffect(() => {
        emailjs.init('_GnN7NY7Nl-Lmb-9i');
    }, []);
    const clock = useLiveClock();

    const timeStr = clock.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false, timeZone: 'Asia/Kolkata'
    });

    const handleCopy = async (ch) => {
        try {
            await navigator.clipboard.writeText(ch.copyText);
            setCopiedId(ch.id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch { /* fallback */ }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Disable button while sending
        setFormSent(true);

        try {
            await emailjs.send(
                'service_5zel7hc',
                'template_flo2709',
                {
                    donorEmail: 'dharanidharand28@gmail.com', // To Email
                    name: formData.name,                      // From Name
                    email: formData.email,                    // Reply To
                    user_name: formData.name,                 // Body: Name
                    user_email: formData.email,               // Body: Email
                    message: formData.message,                // Body: Message
                    time: new Date().toLocaleString()         // Body: Date
                },
                '_GnN7NY7Nl-Lmb-9i'
            );

            setFormData({ name: '', email: '', message: '' });
            // Keep 'formSent' true for a moment to show success message
            setTimeout(() => setFormSent(false), 3000);

        } catch (error) {
            console.error("EmailJS submission error:", error);
            alert("Failed to send message. Please try again or use the email link directly.");
            setFormSent(false); // Re-enable on failure
        }
    };

    return (
        <section className="contact-section" id="contact">
            <motion.div
                className="section-heading-tag"
                data-label="CONTACT"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <span className="tag-text">&lt;contact /&gt;</span>
                <div className="tag-gradient-line"></div>
            </motion.div>

            <motion.div
                className="transmission-panel"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: "spring", stiffness: 80, damping: 18 }}
            >
                {/* Grid Overlay */}
                <div className="tp-grid-overlay"></div>

                {/* Radar Ping */}
                <div className="tp-radar">
                    <div className="radar-ring radar-ring-1"></div>
                    <div className="radar-ring radar-ring-2"></div>
                    <div className="radar-ring radar-ring-3"></div>
                    <div className="radar-center"></div>
                </div>

                {/* Header Bar */}
                <div className="tp-header">
                    <div className="tp-signal">
                        <div className="tp-signal-dot"></div>
                        <span className="tp-signal-text">SIGNAL ACTIVE</span>
                    </div>
                    <span className="tp-header-label">TRANSMISSION PANEL</span>
                    <div className="tp-clock">
                        <span className="tp-clock-label">IST</span>
                        <span className="tp-clock-time">{timeStr}</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="tp-body">
                    {/* Left: Headline + CTA */}
                    <div className="tp-left">
                        <div className="tp-tagline">
                            <span className="tp-tag-pre">Ready to</span>
                            <h3 className="tp-tag-main">Build Something<br />Impactful?</h3>
                        </div>
                        <p className="tp-tag-sub">Open to full-time engineering roles & freelance product builds.</p>

                        <div className="tp-cta-group">
                            <motion.button
                                onClick={() => handleCopy(channels[0])} // channels[0] is the email object
                                className="tp-cta"
                                whileHover={{ y: -3, boxShadow: '0 0 30px rgba(79, 70, 229, 0.3)' }}
                                whileTap={{ scale: 0.97 }}
                                title="Copy email address"
                            >
                                <span className="tp-cta-icon">
                                    {copiedId === 'email' ? (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    ) : (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 2L11 13" /><path d="M22 2L15 22 11 13 2 9z" />
                                        </svg>
                                    )}
                                </span>
                                {copiedId === 'email' ? 'Email Copied!' : 'Copy Email'}
                            </motion.button>
                            <motion.a
                                href="/resume.pdf"
                                download
                                className="tp-cta tp-cta-secondary"
                                whileHover={{ y: -3, borderColor: 'rgba(129, 140, 248, 0.5)' }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <span className="tp-cta-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                        <polyline points="7 10 12 15 17 10" />
                                        <line x1="12" y1="15" x2="12" y2="3" />
                                    </svg>
                                </span>
                                Download CV
                            </motion.a>
                        </div>

                        <div className="tp-response-time">
                            <span className="tp-rt-label">AVG RESPONSE</span>
                            <span className="tp-rt-value">{"< 24h"}</span>
                        </div>
                    </div>

                    {/* Right: Channel Cards + Form */}
                    <div className="tp-right">
                        <span className="tp-channels-label">CHANNELS</span>
                        <div className="tp-channels">
                            {channels.map((ch, i) => (
                                <motion.div
                                    key={ch.id}
                                    className="tp-channel-card"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * i, duration: 0.4 }}
                                    whileHover={{ x: 4, borderColor: 'rgba(129, 140, 248, 0.4)' }}
                                >
                                    <a href={ch.href} target="_blank" rel="noopener noreferrer" className="tp-ch-link">
                                        <div className="tp-ch-icon">{ch.icon}</div>
                                        <div className="tp-ch-info">
                                            <span className="tp-ch-cmd">{ch.cmd}</span>
                                            <span className="tp-ch-target">{ch.target}</span>
                                        </div>
                                    </a>
                                    <button
                                        className={`tp-ch-copy ${copiedId === ch.id ? 'copied' : ''}`}
                                        onClick={() => handleCopy(ch)}
                                        title="Copy to clipboard"
                                    >
                                        {copiedId === ch.id ? (
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        ) : (
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                                            </svg>
                                        )}
                                    </button>
                                </motion.div>
                            ))}
                        </div>

                        {/* Quick Message Form */}
                        <div className="tp-form-section">
                            <span className="tp-channels-label">QUICK MESSAGE</span>
                            <form ref={formRef} className="tp-form" onSubmit={handleFormSubmit}>
                                {/* EmailJS needs name attributes */}
                                <input
                                    type="text"
                                    name="user_name"
                                    placeholder="Your name"
                                    className="tp-input"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                                <input
                                    type="email"
                                    name="user_email"
                                    placeholder="Your email"
                                    className="tp-input"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                                <textarea
                                    name="message"
                                    placeholder="Your message..."
                                    className="tp-textarea"
                                    rows={3}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                />
                                <motion.button
                                    type="submit"
                                    className="tp-form-submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    disabled={formSent}
                                >
                                    {formSent ? '✓ Message Sent' : 'Send Message'}
                                </motion.button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Copied Toast */}
                <AnimatePresence>
                    {copiedId && (
                        <motion.div
                            className="tp-toast"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Copied to clipboard
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer */}
                <div className="tp-footer">
                    <span className="tp-footer-text">Available for full-time opportunities</span>
                    <span className="tp-footer-dot">•</span>
                    <span className="tp-footer-text">India</span>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;
