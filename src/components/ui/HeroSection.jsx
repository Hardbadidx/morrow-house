import React, { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useNavigation } from '../../context/NavigationContext';
import { HeroIcedCoffee } from './HeroIcedCoffee';
import { MagneticButton } from './MagneticButton';
import { useCursorParallax } from '../../hooks/useCursorParallax';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  const { navigateTo, startReservation } = useNavigation();
  const heroRef = useRef(null);
  const { smoothX, smoothY } = useCursorParallax();

  // Subtle floating parallax for editorial elements (hidden on mobile)
  const noteParallaxX = useTransform(smoothX, [-1, 1], [-4, 4]);
  const noteParallaxY = useTransform(smoothY, [-1, 1], [-3, 3]);
  const counterParallaxX = useTransform(smoothX, [-1, 1], [-2, 2]);
  const counterParallaxY = useTransform(smoothY, [-1, 1], [-1.5, 1.5]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] sm:min-h-screen bg-[#D6BD98] text-[#1A3636] pt-28 sm:pt-36 pb-20 flex flex-col justify-between overflow-hidden"
    >
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1">
        {/* Left Editorial Content */}
        <div className="lg:col-span-6 space-y-6 sm:space-y-8 max-w-xl z-20">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1A3636]" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#1A3636]/80 uppercase font-ui">
              Good Food · Better Company
            </span>
          </div>

          {/* Monumental Bold Rounded Headline */}
          <h1 className="hero-title text-[#1A3636] font-normal leading-[0.95]">
            More <br />
            Than Just <br />
            A Meal
          </h1>

          {/* Concise Supporting Copy */}
          <p className="text-base sm:text-lg text-[#40534C] font-normal leading-relaxed max-w-md font-ui">
            Crafted with care. Inspired by the world. Served in the heart of Singapore.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <MagneticButton
              onClick={() => navigateTo('menu')}
              data-cursor="explore"
              className="btn-primary group flex items-center gap-2.5 text-sm sm:text-base px-6 sm:px-7 py-3.5 shadow-md cursor-pointer"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </MagneticButton>

            <MagneticButton
              onClick={() => startReservation()}
              data-cursor="reserve"
              className="btn-secondary text-sm sm:text-base px-6 sm:px-7 py-3.5 cursor-pointer"
            >
              <span>Reserve a Table</span>
            </MagneticButton>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-4 flex items-center gap-3 text-xs tracking-wider uppercase text-[#1A3636]/70 font-semibold font-ui">
            <div className="w-5 h-9 rounded-full border-2 border-[#1A3636]/40 flex items-start justify-center p-1">
              <div className="w-1 h-2 bg-[#1A3636] rounded-full animate-bounce" />
            </div>
            <span>Scroll to explore</span>
          </div>
        </div>

        {/* Right Composition Space: Interactive 3D Iced Coffee Showcase */}
        <div className="lg:col-span-6 relative w-full h-[380px] sm:h-[480px] lg:h-[620px] flex items-center justify-center">
          {/* Large Editorial Handwritten Script Note with Curved Arrow */}
          <motion.div
            style={{ x: noteParallaxX, y: noteParallaxY }}
            className="absolute top-2 sm:top-6 left-0 sm:left-2 lg:-left-8 z-20 text-left select-none pointer-events-none hidden sm:block"
          >
            <div className="font-script text-2xl sm:text-3xl text-[#1A3636] font-bold leading-tight rotate-[-4deg]">
              Great Coffee <br />
              Brighter Days.
            </div>
            {/* SVG Hand-Drawn Curved Arrow pointing right toward the cup */}
            <svg
              className="w-12 sm:w-14 h-12 sm:h-14 text-[#1A3636]/70 mt-1 rotate-[15deg]"
              viewBox="0 0 60 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M12 15 C 22 10, 36 20, 44 36" />
              <path d="M36 36 L 44 36 L 43 27" />
            </svg>
          </motion.div>

          {/* Section Indicator Counter */}
          <motion.div
            style={{ x: counterParallaxX, y: counterParallaxY }}
            className="absolute top-2 right-2 hidden sm:flex items-center gap-2 text-xs font-mono font-semibold text-[#1A3636]/60 z-20"
          >
            <span>01</span>
            <span className="w-6 h-[1px] bg-[#1A3636]/30" />
            <span>05</span>
          </motion.div>

          {/* The Hero Iced Coffee Interactive Product */}
          <HeroIcedCoffee heroRef={heroRef} cursorX={smoothX} cursorY={smoothY} />
        </div>
      </div>

      {/* Organic Curved Wave Transition into Forest Roast Section Below */}
      <div className="wave-divider-bottom z-30 pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 sm:h-16 md:h-20 text-[#40534C] preserve-3d"
        >
          <path
            d="M0,32 C280,75 560,10 840,48 C1120,85 1320,25 1440,32 L1440,80 L0,80 Z"
            fill="#40534C"
          />
        </svg>
      </div>
    </section>
  );
}
