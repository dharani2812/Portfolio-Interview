import React from 'react';

// Native CSS smooth scrolling — no library, no touch interception
const ScrollProvider = ({ children }) => {
    return <>{children}</>;
};

export default ScrollProvider;
