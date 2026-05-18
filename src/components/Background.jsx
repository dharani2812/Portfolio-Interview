import React from 'react';
import '../styles/Background.css';

const Background = () => {
  return (
    <div className="background-container">
      {/* Subtle gradient blobs — pure CSS animations, no JS overhead */}
      <div className="gradient-blob blob-1"></div>
      <div className="gradient-blob blob-2"></div>
      <div className="gradient-blob blob-3"></div>

      {/* SVG Noise Texture Overlay — reduced octaves for less CPU */}
      <svg
        className="noise-overlay"
        width="100%"
        height="100%"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Grid — pure CSS, no framer-motion animation */}
      <div className="grid-layer" />

      {/* Light Sweep — pure CSS animation */}
      <div className="light-sweep" />

      {/* Vignette Overlay */}
      <div className="vignette" />
    </div>
  );
};

export default Background;
