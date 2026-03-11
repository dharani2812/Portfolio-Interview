import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const ScrollProvider = ({ children }) => {
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.1, // Responsiveness vs smoothness (lower is smoother)
            duration: 1.0, // Used if lerp is not provided, but lerp is often better
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.1, // Slightly snappier wheel
            smoothTouch: false,
            touchMultiplier: 1.5,
            infinite: false,
            syncTouch: true // Helps with mobile feel if touch is enabled later
        });

        lenisRef.current = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Handle anchor links
        const handleAnchorClick = (e) => {
            const target = e.target.closest('a');
            if (target && target.hash && target.origin === window.location.origin) {
                e.preventDefault();
                lenis.scrollTo(target.hash);
            }
        };

        window.addEventListener('click', handleAnchorClick);

        return () => {
            lenis.destroy();
            window.removeEventListener('click', handleAnchorClick);
        };
    }, []);

    return <>{children}</>;
};

export default ScrollProvider;
