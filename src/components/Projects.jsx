import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Github, ExternalLink, ArrowRight, Braces, Code2, Layout, Grid, Maximize2, X } from 'lucide-react';
import '../styles/Projects.css';


/* 3D Mouse-Tracking Tilt Image (matches About page) */
const TiltProjectImage = React.memo(({ src, alt, onClick }) => {
    const ref = useRef(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);

    const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

    const handleMouse = (e) => {
        const rect = ref.current.getBoundingClientRect();
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleLeave = () => { mx.set(0); my.set(0); };

    return (
        <motion.div
            ref={ref}
            className="fe-visual-3d"
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            onClick={onClick}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                cursor: 'zoom-in',
                willChange: "transform"
            }}
        >
            <img src={src} alt={alt} className="fe-spotlight-img" />
        </motion.div>
    );
});

TiltProjectImage.displayName = 'TiltProjectImage';

const Projects = React.memo(() => {
    const [activeTab, setActiveTab] = useState('fullstack');
    const [activeProjectIndex, setActiveProjectIndex] = useState(0);
    const [frontendFilter, setFrontendFilter] = useState('All');
    const [frontendView, setFrontendView] = useState('spotlight'); // 'spotlight' or 'grid'
    const [activeFrontendIndex, setActiveFrontendIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);



    // Responsive Controller: Force Grid view on mobile
    useEffect(() => {
        const checkMobile = () => {
            if (window.innerWidth <= 768 && frontendView === 'spotlight') {
                setFrontendView('grid');
            }
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [frontendView]);

    // Full Stack Projects Data
    const fullStackProjects = [
        {
            id: 'excess-food',
            tabLabel: 'Excess Food',
            title: "Excess Food Redistribution Platform",
            value: "Real-time MERN platform connecting food donors with receivers using authenticated workflows.",
            tech: "React · Node · Express · MongoDB · JWT",
            problem: "Food waste with no real-time redistribution tracking.",
            solution: "Built a role-based MERN system with request workflow and notifications.",
            buttons: { demo: "https://dharani2812.github.io/Food-App-Frontend/", github: "https://github.com/dharani2812/Food-App-Frontend" },
            flow: ["UI", "API", "DB", "Auth"],
            image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=2070&auto=format&fit=crop",
            features: [
                "JWT Authentication",
                "Role-based Access",
                "Image Upload",
                "Email Notifications"
            ]
        },
        {
            id: 'hemato',
            tabLabel: 'Hemato',
            title: "Hemato – Blood Donation Platform",
            value: "Full stack donor–recipient matching system with secure authentication and availability tracking.",
            tech: "React · Firebase",
            problem: "Difficulty finding verified donors quickly.",
            solution: "Developed searchable donor registry with secure login and filtering.",
            buttons: { demo: "https://hemato-26.web.app/", github: "https://github.com/dharani2812/Hemato" },
            flow: ["UI", "API", "DB", "Auth"],
            image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1883&auto=format&fit=crop",
            features: [
                "Donor Registration",
                "Blood Group Search",
                "JWT Authentication",
                "MongoDB Storage"
            ]
        },
        {
            id: 'gym-saas',
            tabLabel: 'Gym SaaS',
            title: "Gym Booking SaaS",
            value: "SaaS-based gym slot booking system with user authentication and time-slot management.",
            tech: "React · Node · Express · MongoDB · JWT",
            problem: "Manual gym scheduling causing booking conflicts.",
            solution: "Implemented authenticated slot booking with real-time availability.",
            buttons: { demo: "https://gym-saas-booking.vercel.app/", github: "https://github.com/dharani2812/gym-booking-saas" },
            flow: ["UI", "API", "DB", "Auth"],
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
            features: [
                "Slot Booking Logic",
                "User Dashboard",
                "JWT Authentication",
                "REST APIs"
            ]
        }
    ];

    const currentProject = fullStackProjects[activeProjectIndex];

    // Frontend Projects Data
    const frontendProjects = [
        {
            id: 'beauty',
            title: "Beauty Salon",
            type: "Landing Page",
            category: "Landing",
            theme: "bento-violet",
            tech: "React · SCSS",
            description: "A luxury salon landing page featuring service highlights and an elegant appointment booking flow.",
            image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop",
            github: "https://github.com/dharani2812/beauty-saloon",
            live: "https://beauty-saloon-page.netlify.app/"
        },
        {
            id: 'construction',
            title: "Construction Site",
            type: "Business Website",
            category: "Business",
            theme: "bento-amber",
            tech: "React · SCSS",
            description: "Modern business website for architectural firms, showcasing past projects and expertise in real-estate.",
            image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2031&auto=format&fit=crop",
            github: "https://github.com/dharani2812/real-estate",
            live: "https://real-estate-landing-page1.netlify.app/"
        },
        {
            id: 'builders',
            title: "Property Builders",
            type: "Corporate UI",
            category: "Business",
            theme: "bento-blue",
            tech: "React · SCSS",
            description: "Corporate portfolio for property developers with a focus on real estate investment and urban development.",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
            github: "https://github.com/dharani2812/property-builders-landing-page",
            live: "https://property-builder-landing-page.netlify.app/"
        },
        {
            id: 'photo',
            title: "Photo Studio",
            type: "Portfolio Website",
            category: "Personal",
            theme: "bento-emerald",
            tech: "React · SCSS",
            description: "High-end photography portfolio designed to showcase high-resolution work with a minimalist aesthetic.",
            image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
            github: "https://github.com/dharani2812/photostudio-landing-page",
            live: "https://photostudio-landing-page-13.netlify.app/"
        },
        {
            id: 'gym',
            title: "Gym",
            type: "Fitness Landing Page",
            category: "Landing",
            theme: "bento-violet",
            tech: "React · SCSS",
            description: "High-energy fitness landing page with membership plans, group class schedules, and trainer profiles.",
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
            github: "https://github.com/dharani2812/gym-landing-page",
            live: "https://gym-landing-page13.netlify.app/"
        },
        {
            id: 'animated-ui',
            title: "Animated Portfolio",
            category: "Personal",
            theme: "bento-blue",
            tech: "React · SCSS · Framer Motion",
            description: "A visually stunning personal portfolio featuring complex Framer Motion animations and interactive layouts.",
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
            github: "https://github.com/dharani2812/animated-portfolio",
            live: "https://dharani2812.github.io/animated-portfolio/"
        }
    ];



    const miniProjects = [
        {
            id: 'expense-tracker',
            name: "Expense Tracker",
            desc: "Track income and expenses with real-time balance calculation",
            tech: "JavaScript",
            github: "https://github.com/dharani2812/Expense-Tracker",
            live: "https://expensetrackers-app.netlify.app/"
        },
        {
            id: 'weather-app',
            name: "Weather App",
            desc: "Dynamic weather forecasting using OpenWeather API integration",
            tech: "JavaScript · API",
            github: "https://github.com/dharani2812/weather-app",
            live: "https://weather-app-1328.netlify.app/"
        },
        {
            id: 'temperature-conversion',
            name: "Temperature Conversion",
            desc: "Convert units dynamically with instant output",
            tech: "HTML · CSS · JavaScript",
            github: "https://github.com/dharani2812/temperature-conversion",
            live: "https://temperature-conversionn.netlify.app/"
        },
        {
            id: 'rock-paper-scissor',
            name: "Rock Paper Scissor",
            desc: "Interactive game with score tracking logic",
            tech: "JavaScript",
            github: "https://github.com/dharani2812/rock-paper-scissor",
            live: "https://rockpaperrscissorr.netlify.app/"
        },
        {
            id: 'digital-clock',
            name: "Digital Clock",
            desc: "Live time display using JavaScript intervals",
            tech: "HTML · CSS · JavaScript",
            github: "https://github.com/dharani2812/Digital-Clock",
            live: "https://dharani-digital-clock-ui.netlify.app/"
        },
        {
            id: 'password-gen',
            name: "Password Generator",
            desc: "Secure, randomized password creation with customizable criteria",
            tech: "JavaScript",
            github: "#",
            live: "#"
        },
        {
            id: 'dice-roller',
            name: "Dice Roller",
            desc: "Random dice generator with dynamic UI update",
            tech: "JavaScript",
            github: "https://github.com/dharani2812/Dice-roller",
            live: "https://diceroler.netlify.app/"
        },
        {
            id: 'calculator',
            name: "Calculator",
            desc: "Basic arithmetic calculator with input handling",
            tech: "HTML · CSS · JavaScript",
            github: "https://github.com/dharani2812/Responsive-calculator",
            live: "https://responsive-calculatorr.netlify.app/"
        },
        {
            id: 'world-clock',
            name: "World Clock",
            desc: "Track multiple timezones with modular clock logic",
            tech: "JavaScript",
            github: "https://github.com/dharani2812/World-Clock",
            live: "https://world-clock-13.netlify.app/"
        }
    ];

    // Animation Variants
    const contentVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
        exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
    };

    const projectSlideVariants = {
        hidden: { opacity: 0, x: 10 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
        exit: { opacity: 0, x: -10, transition: { duration: 0.2 } }
    };

    return (
        <section className="projects-section" id="projects">
            <div className="projects-container">
                {/* Section Header */}
                <div className="projects-header">
                    <div className="section-heading-tag" data-label={activeTab === 'frontend' ? 'FRONTEND' : activeTab === 'mini' ? 'MINI' : 'PROJECTS'}>
                        <span className="tag-text">
                            &lt;{activeTab === 'frontend' ? 'frontend' :
                                activeTab === 'mini' ? 'mini' : 'projects'} /&gt;
                        </span>
                        <div className="tag-gradient-line"></div>
                    </div>

                    {/* Tab Switcher */}
                    <div className="tabs-container">
                        {['fullstack', 'frontend', 'mini'].map((tab) => (
                            <button
                                key={tab}
                                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab === 'fullstack' ? 'Full Stack' :
                                    tab === 'frontend' ? 'Frontend' : 'Mini'}
                                {activeTab === tab && (
                                    <motion.div
                                        className="tab-underline"
                                        layoutId="underline"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="projects-content">
                    <AnimatePresence mode='wait'>
                        {/* Full Stack Tab */}
                        {activeTab === 'fullstack' && (
                            <motion.div
                                key="fullstack"
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="tab-pane fullstack-pane"
                            >
                                {/* Project Selector */}
                                <div className="project-selector">
                                    {fullStackProjects.map((project, index) => (
                                        <button
                                            key={project.id}
                                            className={`project-tab ${activeProjectIndex === index ? 'active' : ''}`}
                                            onClick={() => setActiveProjectIndex(index)}
                                        >
                                            {project.tabLabel}
                                            {activeProjectIndex === index && (
                                                <motion.div
                                                    className="project-underline"
                                                    layoutId="projectUnderline"
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {/* Split Layout */}
                                <AnimatePresence mode='wait'>
                                    <motion.div
                                        key={currentProject.id}
                                        variants={projectSlideVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="fs-layout"
                                    >
                                        {/* Left Side: Content */}
                                        <div className="fs-info">
                                            <div className="fs-header-group">
                                                <h3 className="fs-title">{currentProject.title}</h3>
                                                <p className="fs-value">{currentProject.value}</p>
                                                <p className="fs-tech-inline">{currentProject.tech}</p>
                                            </div>

                                            <div className="fs-actions">
                                                <a href={currentProject.buttons.demo} target="_blank" rel="noopener noreferrer" className="btn-action primary">
                                                    Live Demo <ExternalLink size={16} />
                                                </a>
                                                <a href={currentProject.buttons.github} target="_blank" rel="noopener noreferrer" className="btn-action secondary">
                                                    GitHub <Github size={16} />
                                                </a>
                                            </div>

                                            <div className="fs-problem-solution">
                                                <div className="ps-item">
                                                    <span className="ps-label">Problem:</span> {currentProject.problem}
                                                </div>
                                                <div className="ps-item">
                                                    <span className="ps-label">Solution:</span> {currentProject.solution}
                                                </div>
                                            </div>

                                            <div className="fs-flow-compact">
                                                {currentProject.flow.map((step, i) => (
                                                    <React.Fragment key={i}>
                                                        <span className="flow-step">{step}</span>
                                                        {i < currentProject.flow.length - 1 && (
                                                            <span className="flow-arrow">→</span>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Right Side: Visuals */}
                                        <div className="fs-visuals">
                                            <div className="fs-preview">
                                                <div className="preview-frame">
                                                    <TiltProjectImage
                                                        src={currentProject.image}
                                                        alt={currentProject.title}
                                                        onClick={() => setSelectedImage(currentProject.image)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="fs-features-grid">
                                                {currentProject.features.map((feature, i) => (
                                                    <div key={i} className="feature-chip">
                                                        {feature}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </motion.div>
                        )}

                        {/* Frontend Tab - 3D Spotlight Showcase */}
                        {activeTab === 'frontend' && (
                            <motion.div
                                key="frontend"
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="tab-pane frontend-pane spotlight-mode"
                            >
                                {/* Global Theme Aura */}
                                {frontendProjects[activeFrontendIndex] && (
                                    <div className={`fe-theme-aura ${frontendProjects[activeFrontendIndex].theme}`}></div>
                                )}

                                {/* Filter Bar & View Toggle */}
                                <div className="fe-controls spotlight-controls">
                                    <div className="fe-filters">
                                        {['All', 'Landing', 'Business', 'Personal'].map(cat => (
                                            <button
                                                key={cat}
                                                className={`fe-filter-btn ${frontendFilter === cat ? 'active' : ''}`}
                                                onClick={() => {
                                                    setFrontendFilter(cat);
                                                    setActiveFrontendIndex(0);
                                                }}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="fe-view-toggle">
                                        <button
                                            className={`view-btn ${frontendView === 'spotlight' ? 'active' : ''}`}
                                            onClick={() => setFrontendView('spotlight')}
                                            title="Spotlight Showcase"
                                        >
                                            <div className="view-btn-inner">
                                                <Layout size={18} />
                                                <span>Spotlight</span>
                                            </div>
                                        </button>
                                        <button
                                            className={`view-btn ${frontendView === 'grid' ? 'active' : ''}`}
                                            onClick={() => setFrontendView('grid')}
                                            title="Modern Grid"
                                        >
                                            <div className="view-btn-inner">
                                                <Grid size={18} />
                                                <span>Grid</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div className={`fe-display-container ${frontendView}`}>
                                    {frontendView === 'spotlight' ? (
                                        /* Spotlight Layout */
                                        <div className="fe-spotlight-wrapper">
                                            {frontendProjects
                                                .filter(p => frontendFilter === 'All' || p.category === frontendFilter)
                                                .map((project, index) => {
                                                    if (index !== activeFrontendIndex) return null;
                                                    return (
                                                        <motion.div
                                                            key={project.id}
                                                            className={`fe-spotlight-card ${project.theme}`}
                                                            initial={{ opacity: 0, x: 20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ duration: 0.5 }}
                                                        >
                                                            <div className="fe-spotlight-visual">
                                                                <TiltProjectImage
                                                                    src={project.image}
                                                                    alt={project.title}
                                                                    onClick={() => setSelectedImage(project.image)}
                                                                />
                                                                <div className="fe-visual-underglow"></div>
                                                            </div>

                                                            <div className="fe-spotlight-details">
                                                                <div className="details-header">
                                                                    <span className="fe-category-badge">{project.category}</span>
                                                                    <h3 className="fe-project-title-glitch" data-text={project.title}>
                                                                        {project.title}
                                                                    </h3>
                                                                </div>

                                                                <div className="technical-specs">
                                                                    <div className="spec-row">
                                                                        <span className="spec-label">TECH_STACK //</span>
                                                                        <span className="spec-value">{project.tech}</span>
                                                                    </div>
                                                                    <div className="spec-row">
                                                                        <span className="spec-label">ARCH_TYPE //</span>
                                                                        <span className="spec-value">{project.type || "Modern UI"}</span>
                                                                    </div>
                                                                </div>

                                                                <p className="fe-spotlight-desc">{project.description}</p>

                                                                <div className="fe-spotlight-actions">
                                                                    <motion.a
                                                                        href={project.github}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="fe-spotlight-btn"
                                                                        whileHover={{ scale: 1.1 }}
                                                                        whileTap={{ scale: 0.9 }}
                                                                        title="View Source"
                                                                    >
                                                                        <Github size={20} />
                                                                    </motion.a>
                                                                    <motion.a
                                                                        href={project.live}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="fe-spotlight-btn"
                                                                        whileHover={{ scale: 1.1 }}
                                                                        whileTap={{ scale: 0.9 }}
                                                                        title="Live Demo"
                                                                    >
                                                                        <ExternalLink size={20} />
                                                                    </motion.a>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    );
                                                })}

                                            {/* Navigation Strip */}
                                            <div className="fe-nav-strip">
                                                {frontendProjects
                                                    .filter(p => frontendFilter === 'All' || p.category === frontendFilter)
                                                    .map((project, index) => (
                                                        <motion.button
                                                            key={project.id}
                                                            className={`fe-nav-thumb ${activeFrontendIndex === index ? 'active' : ''} ${project.theme}`}
                                                            onClick={() => setActiveFrontendIndex(index)}
                                                            whileHover={{ y: -5 }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            <img src={project.image} alt="" />
                                                            <div className="thumb-indicator"></div>
                                                        </motion.button>
                                                    ))}
                                            </div>
                                        </div>
                                    ) : (
                                        /* Frontend Uniform Grid (Standardized width and height) */
                                        <div className="fe-uniform-grid">
                                            {frontendProjects
                                                .filter(p => frontendFilter === 'All' || p.category === frontendFilter)
                                                .map((project, index) => {
                                                    return (
                                                        <motion.div
                                                            key={project.id}
                                                            className={`fe-uniform-card ${project.theme}`}
                                                            layout
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ duration: 0.4, delay: index * 0.05 }}
                                                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                                        >
                                                            <div className="bento-glow"></div>
                                                            <div className="fe-bento-visual" onClick={() => setSelectedImage(project.image)}>
                                                                <img src={project.image} alt={project.title} />
                                                                <div className="fe-bento-overlay">
                                                                    <span className="fe-bento-cat">{project.category}</span>
                                                                </div>
                                                            </div>

                                                            <div className="bento-body fe-bento-body">
                                                                <h4 className="bento-title">{project.title}</h4>
                                                                <p className="bento-desc">{project.description}</p>
                                                            </div>

                                                            <div className="bento-footer">
                                                                <span className="bento-tech-tag">{project.tech}</span>
                                                                <div className="fe-grid-actions">
                                                                    <motion.a
                                                                        href={project.github}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="fe-spotlight-btn small"
                                                                        whileHover={{ scale: 1.1 }}
                                                                        whileTap={{ scale: 0.9 }}
                                                                        title="View Source"
                                                                    >
                                                                        <Github size={16} />
                                                                    </motion.a>
                                                                    <motion.a
                                                                        href={project.live}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="fe-spotlight-btn small"
                                                                        whileHover={{ scale: 1.1 }}
                                                                        whileTap={{ scale: 0.9 }}
                                                                        title="Live Demo"
                                                                    >
                                                                        <ExternalLink size={16} />
                                                                    </motion.a>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    );
                                                })}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Mini Tab */}
                        {activeTab === 'mini' && (
                            <motion.div
                                key="mini"
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="tab-pane mini-pane"
                            >
                                <div className="mini-bento-container">
                                    <div className="bento-grid-bg"></div>
                                    <div className="mini-bento-grid">
                                        {miniProjects.map((project, index) => {
                                            const Icon = project.tech === 'JavaScript' ? Braces : Code2;
                                            // Assign varied grid sizes (Standard & Wide only) for a compact compact bento feel
                                            const gridSizes = ['bento-wide', 'bento-standard', 'bento-standard', 'bento-wide', 'bento-wide', 'bento-standard', 'bento-standard', 'bento-standard', 'bento-standard'];
                                            const gridSize = gridSizes[index % gridSizes.length];

                                            // Dynamic theme cycling
                                            const themes = ['bento-amber', 'bento-blue', 'bento-violet', 'bento-emerald'];
                                            const themeClass = themes[index % themes.length];

                                            return (
                                                <motion.div
                                                    key={project.id}
                                                    className={`bento-tile ${gridSize} ${themeClass}`}
                                                    transition={{
                                                        duration: 0.4,
                                                        delay: index * 0.05,
                                                        ease: [0.23, 1, 0.32, 1]
                                                    }}
                                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                                >
                                                    <div className="bento-glow"></div>
                                                    <div className="bento-header">
                                                        <div className="bento-status">
                                                            <span className="status-dot"></span>
                                                            <span className="status-label">v1.0 Stable</span>
                                                        </div>
                                                        <div className="bento-icon">
                                                            <Icon size={18} />
                                                        </div>
                                                    </div>

                                                    <div className="bento-body">
                                                        <h4 className="bento-title">{project.name}</h4>
                                                        <p className="bento-desc">{project.desc}</p>
                                                    </div>

                                                    <div className="bento-footer">
                                                        <span className="bento-tech-tag">{project.tech}</span>
                                                        <div className="bento-actions">
                                                            <motion.a
                                                                href={project.github}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="bento-action-pill source"
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                title="View Source"
                                                            >
                                                                <Github size={14} />
                                                                <span>Source</span>
                                                            </motion.a>
                                                            <motion.a
                                                                href={project.live}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="bento-action-pill deploy"
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                title="Live View"
                                                            >
                                                                <ExternalLink size={14} />
                                                                <span>Deploy</span>
                                                            </motion.a>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            {/* Image Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="fe-lightbox-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.button
                            className="fe-lightbox-close"
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={24} />
                        </motion.button>
                        <motion.img
                            src={selectedImage}
                            className="fe-lightbox-img"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
});

export default Projects;
