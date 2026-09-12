import React, { createContext, useContext, useState, useEffect } from 'react';

const SceneContext = createContext(null);

export function SceneProvider({ children }) {
  const [activeSection, setActiveSection] = useState('hero');
  const [activeZone, setActiveZone] = useState('dining');
  const [hoveredMenuItem, setHoveredMenuItem] = useState(null);
  const [activeCameraOverride, setActiveCameraOverride] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Subtle ambient audio synthesizer via Web Audio API (graceful, no external MP3 dependencies)
  useEffect(() => {
    let audioCtx = null;
    let brownNoiseNode = null;
    let filterNode = null;
    let gainNode = null;

    if (isAudioPlaying) {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContextClass();

        // Create warm room tone ambient pink-brown noise
        const bufferSize = audioCtx.sampleRate * 2;
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          output[i] *= 0.035;
          b6 = white * 0.115926;
        }

        const whiteNoise = audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        filterNode = audioCtx.createBiquadFilter();
        filterNode.type = 'lowpass';
        filterNode.frequency.setValueAtTime(380, audioCtx.currentTime);

        gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0.045, audioCtx.currentTime);

        whiteNoise.connect(filterNode);
        filterNode.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        whiteNoise.start(0);

        brownNoiseNode = whiteNoise;
      } catch (err) {
        console.warn('Ambient audio could not initialize:', err);
      }
    }

    return () => {
      if (brownNoiseNode) {
        try { brownNoiseNode.stop(); } catch (_) {}
      }
      if (audioCtx) {
        try { audioCtx.close(); } catch (_) {}
      }
    };
  }, [isAudioPlaying]);

  const toggleAudio = () => {
    setIsAudioPlaying(prev => !prev);
  };

  return (
    <SceneContext.Provider
      value={{
        activeSection,
        setActiveSection,
        activeZone,
        setActiveZone,
        hoveredMenuItem,
        setHoveredMenuItem,
        activeCameraOverride,
        setActiveCameraOverride,
        isAudioPlaying,
        toggleAudio,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
}

export function useScene() {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error('useScene must be used within a SceneProvider');
  }
  return context;
}
