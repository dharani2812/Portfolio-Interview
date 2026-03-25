import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const ScrollProvider = ({ children }) => {
    const lenisRef = useRef(null);
    const rafIdRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            // Slightly higher lerp = faster settling = less CPU per frame
            lerp: 0.1,
            duration: 1.2,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            // Desktop: smooth wheel only
            smoothWheel: true,
            wheelMultiplier: 1,
            // Mobile: let the browser handle touch natively
            // This is MUCH lighter on low-end phones than Lenis touch processing
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
