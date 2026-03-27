import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const ScrollProvider = ({ children }) => {
    const lenisRef = useRef(null);
    const rafIdRef = useRef(null);

    useEffect(() => {
        // Guarantee native touch scrolling works everywhere
        document.documentElement.style.touchAction = 'pan-y';
        document.body.style.touchAction = 'pan-y';
        document.documentElement.style.overflowY = 'auto';
        document.body.style.overflowY = 'auto';

        const lenis = new Lenis({
            lerp: 0.1,
            duration: 1.2,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            // Only smooth the mouse wheel — touch is left to the browser
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            syncTouch: false,
            infinite: false,
            autoResize: true,
            // Prevent Lenis from calling preventDefault on touch events
            prevent: (node) => {
                // Never intercept touch on any element
                return false;
            },
        });

        lenisRef.current = lenis;

        function raf(time) {
            lenis.raf(time);
            rafIdRef.current = requestAnimationFrame(raf);
        }

        rafIdRef.current = requestAnimationFrame(raf);

        // Handle anchor links with smooth scroll
        const handleAnchorClick = (e) => {
            const target = e.target.closest('a');
            if (target && target.hash && target.origin === window.location.origin) {
                e.preventDefault();
                lenis.scrollTo(target.hash, {
                    offset: 0,
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });
            }
        };

        window.addEventListener('click', handleAnchorClick);

        return () => {
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
            lenis.destroy();
            window.removeEventListener('click', handleAnchorClick);
        };
    }, []);

    return <>{children}</>;
};

export default ScrollProvider;
