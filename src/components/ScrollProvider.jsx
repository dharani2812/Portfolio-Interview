import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

const isTouchDevice = () => {
    if (typeof window === 'undefined') return false;
    return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
    );
};

const ScrollProvider = ({ children }) => {
    const lenisRef = useRef(null);
    const rafIdRef = useRef(null);

    useEffect(() => {
        // On touch/mobile devices: skip Lenis entirely and ensure native scrolling works
        if (isTouchDevice()) {
            // Force-enable native scrolling (undo any Lenis CSS side effects)
            document.documentElement.style.overflowY = 'auto';
            document.body.style.overflowY = 'auto';
            document.documentElement.classList.remove('lenis', 'lenis-smooth', 'lenis-stopped');
            return;
        }

        // Desktop only: import Lenis CSS and initialize
        import('lenis/dist/lenis.css');

        const lenis = new Lenis({
            lerp: 0.1,
            duration: 1.2,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            syncTouch: false,
            infinite: false,
            autoResize: true,
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
