import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { CATEGORY_CARDS } from '../../data/menuData';
import { SectionReveal } from './SectionReveal';
import { MagneticButton } from './MagneticButton';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CategoriesSection() {
  const { navigateTo } = useNavigation();

  return (
    <section
      id="categories"
      className="relative bg-[#40534C] text-[#FBF8F3] pt-16 sm:pt-24 pb-28 sm:pb-36 overflow-hidden z-20"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-20">
        {/* Top Header Row */}
        <SectionReveal distance={20}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#D6BD98] uppercase font-ui">
                A World of Flavours
              </span>
              <h2 className="section-title text-[#FBF8F3] font-normal">
                Something <br className="hidden sm:inline" />
                for Everyone
              </h2>
              <p className="text-sm sm:text-base text-[#D6BD98]/90 font-ui leading-relaxed max-w-lg">
                From artisanal coffee to wood-fired pizzas, handcrafted pastas, juicy burgers and more.
              </p>
            </div>

            <div>
              <MagneticButton
                onClick={() => navigateTo('menu')}
                data-cursor="explore"
                className="inline-flex items-center gap-2 bg-[#D6BD98] text-[#1A3636] font-semibold text-xs sm:text-sm px-6 py-3 rounded-full hover:bg-[#FBF8F3] transition-all hover:gap-3 cursor-pointer shadow-sm active:scale-95 font-ui"
              >
                <span>View Full Menu</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>
        </SectionReveal>

        {/* 5 Distinct Food Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
          {CATEGORY_CARDS.map((cat, idx) => (
            <SectionReveal key={cat.id} delay={idx * 0.06} distance={20}>
              <div
                onClick={() => navigateTo('menu')}
                data-cursor="view"
                className="group relative bg-[#F5EFEB] text-[#1A3636] rounded-3xl p-4 pt-3 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer overflow-hidden border border-[#D6BD98]/30 h-full"
              >
                {/* Category Food Image (Floating with Breakout Illusion) */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-[#E7D7C1]/40 flex items-center justify-center">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  {/* Subtle soft gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Card Meta */}
                <div className="flex items-center justify-between mt-auto pt-2 px-1">
                  <div>
                    <h3 className="font-display text-lg font-bold tracking-tight text-[#1A3636]">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#40534C] font-ui font-medium">
                      {cat.tagline}
                    </p>
                  </div>

                  {/* Circular Action Badge */}
                  <div className="w-8 h-8 rounded-full bg-[#1A3636] text-[#D6BD98] flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#122424]">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>

      {/* Organic Curved Wave Transition into Eclipse Signature Section Below */}
      <div className="wave-divider-bottom z-30 pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 sm:h-16 md:h-20 text-[#1A3636] preserve-3d"
        >
          <path
            d="M0,45 C320,10 640,75 960,30 C1200,-5 1360,60 1440,45 L1440,80 L0,80 Z"
            fill="#1A3636"
          />
        </svg>
      </div>
    </section>
  );
}
