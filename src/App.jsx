import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { NavigationProvider } from './context/NavigationContext';
import { Layout } from './components/layout/Layout';

import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { DishDetails } from './pages/DishDetails';
import { Story } from './pages/Story';
import { Experience } from './pages/Experience';
import { Reservations } from './pages/Reservations';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

import './App.css';

function MainApp() {
  // Desktop-only smooth physical inertia scroll (preserves 100% native mobile touch scrolling)
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || !isFinePointer || prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      syncTouch: false,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:dish" element={<DishDetails />} />
        <Route path="/story" element={<Story />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <NavigationProvider>
        <MainApp />
      </NavigationProvider>
    </BrowserRouter>
  );
}
