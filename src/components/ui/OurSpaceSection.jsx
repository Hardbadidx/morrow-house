import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { SPACES_DATA } from '../../data/ambianceData';
import { SectionReveal } from './SectionReveal';
import { MagneticButton } from './MagneticButton';
import { ArrowRight, Play, Utensils, Coffee, Users, Flame } from 'lucide-react';

export function OurSpaceSection() {
  const { navigateTo, startReservation } = useNavigation();
  const [activeSpaceId, setActiveSpaceId] = useState('dining-room');

  const activeSpace = SPACES_DATA.find((s) => s.id === activeSpaceId) || SPACES_DATA[0];

  const getIcon = (id) => {
    switch (id) {
      case 'coffee-bar':
        return <Coffee className="w-5 h-5" />;
      case 'private-dining':
        return <Users className="w-5 h-5" />;
      case 'chefs-counter':
        return <Flame className="w-5 h-5" />;
      default:
        return <Utensils className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="our-space"
      className="relative bg-[#D6BD98] text-[#1A3636] pt-16 sm:pt-24 pb-28 sm:pb-36 overflow-hidden z-20"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Large Space Photo Window with "Step Inside" */}
          <div className="lg:col-span-5 relative group">
            <SectionReveal distance={20}>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-[#C4A77D]/30 border border-[#1A3636]/15">
                <img
                  src={activeSpace.image}
                  alt={activeSpace.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* "Step Inside" Floating Badge */}
                <button
                  onClick={() => navigateTo('experience')}
                  data-cursor="explore"
                  className="absolute inset-0 m-auto w-24 h-24 rounded-full flex flex-col items-center justify-center text-white cursor-pointer bg-black/25 backdrop-blur-sm border border-white/20 hover:scale-105 hover:bg-black/40 transition-all active:scale-95"
                  aria-label="Step Inside Virtual Experience"
                >
                  <div className="w-10 h-10 rounded-full bg-white text-[#1A3636] flex items-center justify-center mb-1 shadow-md">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                  <span className="text-[11px] font-semibold tracking-wider uppercase font-ui">
                    Step Inside
                  </span>
                </button>
              </div>
            </SectionReveal>
          </div>

          {/* Center Column: Section Copy */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6">
            <SectionReveal distance={20} delay={0.08}>
              <div className="space-y-4 sm:space-y-6">
                <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#40534C] uppercase font-ui">
                  Our Space
                </span>

                <h2 className="section-title text-[#1A3636] font-normal leading-[1.02]">
                  A Place to <br />
                  Belong
                </h2>

                <p className="text-sm sm:text-base text-[#40534C] font-ui leading-relaxed">
                  Warm interiors, thoughtful details, and a dining experience designed for meaningful moments.
                </p>

                <div className="pt-2">
                  <MagneticButton
                    onClick={() => navigateTo('experience')}
                    data-cursor="explore"
                    className="btn-primary group flex items-center gap-2.5 text-xs sm:text-sm px-6 py-3 cursor-pointer"
                  >
                    <span>Explore Our Space</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </MagneticButton>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Right Column: Stacked Space Selector Pills */}
          <div className="lg:col-span-3 flex flex-col gap-3.5">
            <SectionReveal distance={20} delay={0.16}>
              <div className="flex flex-col gap-3.5">
                {SPACES_DATA.slice(0, 3).map((space) => {
                  const isSelected = activeSpaceId === space.id;
                  return (
                    <button
                      key={space.id}
                      onClick={() => setActiveSpaceId(space.id)}
                      data-cursor="view"
                      className={`flex items-center gap-4 p-3.5 rounded-2xl text-left transition-all duration-200 cursor-pointer border ${
                        isSelected
                          ? 'bg-[#E7D7C1] border-[#1A3636]/30 shadow-sm translate-x-1.5'
                          : 'bg-[#FBF8F3]/50 border-[#1A3636]/10 hover:bg-[#FBF8F3]/80'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isSelected
                            ? 'bg-[#1A3636] text-[#D6BD98]'
                            : 'bg-[#40534C]/15 text-[#1A3636]'
                        }`}
                      >
                        {getIcon(space.id)}
                      </div>
                      <div>
                        <h4 className="font-display text-sm font-bold text-[#1A3636] tracking-tight">
                          {space.title}
                        </h4>
                        <p className="text-[11px] text-[#40534C] font-ui font-medium leading-snug">
                          {space.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>

      {/* Organic Wave Transition into Eclipse Reservations Section Below */}
      <div className="wave-divider-bottom z-30 pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 sm:h-16 md:h-20 text-[#1A3636] preserve-3d"
        >
          <path
            d="M0,50 C260,15 540,75 820,35 C1100,-5 1300,65 1440,50 L1440,80 L0,80 Z"
            fill="#1A3636"
          />
        </svg>
      </div>
    </section>
  );
}
