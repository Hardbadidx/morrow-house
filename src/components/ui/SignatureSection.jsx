import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { SIGNATURE_DISH } from '../../data/menuData';
import { SectionReveal } from './SectionReveal';
import { MagneticButton } from './MagneticButton';
import { ArrowRight, Sparkles } from 'lucide-react';

export function SignatureSection() {
  const { openDishModal } = useNavigation();

  return (
    <section
      id="signature"
      className="relative bg-[#1A3636] text-[#FBF8F3] pt-16 sm:pt-24 pb-28 sm:pb-36 overflow-hidden z-20"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#677D6A]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column: Signature Dish Copy */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8 max-w-xl">
          <SectionReveal distance={24}>
            <div className="space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D6BD98]" />
                <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#D6BD98] uppercase font-ui">
                  {SIGNATURE_DISH.eyebrow}
                </span>
              </div>

              <h2 className="hero-title text-[#FBF8F3] font-normal leading-[0.98]">
                Truffle <br />
                Burrata Pizza
              </h2>

              <p className="text-base sm:text-lg text-[#D6BD98]/90 font-ui leading-relaxed max-w-md">
                {SIGNATURE_DISH.description}
              </p>

              <div className="pt-2">
                <MagneticButton
                  onClick={() => openDishModal(SIGNATURE_DISH)}
                  data-cursor="view"
                  className="inline-flex items-center gap-2.5 bg-[#D6BD98] text-[#1A3636] font-semibold text-sm sm:text-base px-7 py-3.5 rounded-full hover:bg-[#FBF8F3] transition-all hover:gap-3.5 cursor-pointer shadow-lg active:scale-95 font-ui"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </div>
            </div>
          </SectionReveal>
        </div>

        {/* Right Column: Giant Breakout Food Showcase */}
        <div className="lg:col-span-7 relative flex items-center justify-center">
          <SectionReveal distance={20} delay={0.12}>
            <div className="relative w-full flex items-center justify-center">
              {/* Handwritten Editorial Accent */}
              <div className="absolute -top-4 right-0 sm:right-6 z-20 text-right select-none pointer-events-none">
                <div className="font-script text-2xl sm:text-3xl text-[#D6BD98] font-bold leading-tight rotate-[-3deg]">
                  Real Ingredients. <br />
                  Extraordinary Moments.
                </div>
                {/* SVG Hand-Drawn Curved Arrow */}
                <svg
                  className="w-14 h-14 ml-auto text-[#D6BD98]/80 -rotate-12 mt-1"
                  viewBox="0 0 60 60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M48 8 C 36 26, 22 22, 22 48" />
                  <path d="M14 40 L 22 48 L 30 42" />
                </svg>
              </div>

              {/* Section Indicator Counter */}
              <div className="absolute top-2 right-2 hidden sm:flex items-center gap-2 text-xs font-mono font-semibold text-[#D6BD98]/60">
                <span>01</span>
                <span className="w-4 h-[1px] bg-[#D6BD98]/30" />
                <span>02</span>
                <span className="w-4 h-[1px] bg-[#D6BD98]/30" />
                <span>03</span>
                <span className="w-4 h-[1px] bg-[#D6BD98]/30" />
                <span>04</span>
              </div>

              {/* Monumental Truffle Burrata Pizza Visual with Soft Radial Blend */}
              <div
                data-cursor="view"
                onClick={() => openDishModal(SIGNATURE_DISH)}
                className="relative w-full max-w-[540px] sm:max-w-[620px] aspect-square flex items-center justify-center group cursor-pointer"
              >
                <img
                  src={SIGNATURE_DISH.image}
                  alt="Truffle Burrata Pizza"
                  className="w-full h-full object-cover rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.7)] [mask-image:radial-gradient(circle,black_66%,transparent_78%)] transform transition-transform duration-700 ease-out group-hover:scale-104 group-hover:rotate-1"
                  loading="lazy"
                />
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>

      {/* Organic Wave Transition into Almond "Our Space" Below */}
      <div className="wave-divider-bottom z-30 pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 sm:h-16 md:h-20 text-[#D6BD98] preserve-3d"
        >
          <path
            d="M0,35 C360,75 720,15 1080,55 C1240,75 1380,25 1440,35 L1440,80 L0,80 Z"
            fill="#D6BD98"
          />
        </svg>
      </div>
    </section>
  );
}
