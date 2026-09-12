import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { SectionReveal } from './SectionReveal';
import { Sparkles, Heart, Compass, ArrowRight } from 'lucide-react';

export function StorySection() {
  const { navigateTo } = useNavigation();

  const principles = [
    {
      num: '01',
      title: 'Craft',
      desc: '48-hour sourdough fermentation and precision espresso extraction, mastered through repetition.',
      icon: <Compass className="w-5 h-5 text-[#40534C]" />,
    },
    {
      num: '02',
      title: 'Ingredients',
      desc: 'Sourced from regenerative direct-trade farms and European heritage mills.',
      icon: <Sparkles className="w-5 h-5 text-[#40534C]" />,
    },
    {
      num: '03',
      title: 'Community',
      desc: 'A welcoming sanctuary designed for heartfelt conversations and shared memories.',
      icon: <Heart className="w-5 h-5 text-[#40534C]" />,
    },
  ];

  return (
    <section
      id="story"
      className="relative bg-[#D6BD98] text-[#1A3636] pt-16 sm:pt-24 pb-28 sm:pb-36 overflow-hidden z-20"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-20">
        {/* Header */}
        <SectionReveal distance={20}>
          <div className="max-w-2xl space-y-4 mb-14">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#40534C] uppercase font-ui">
              Our Philosophy
            </span>

            <h2 className="section-title text-[#1A3636] font-normal leading-[1.02]">
              Made with <br />
              Intention
            </h2>

            <p className="text-base sm:text-lg text-[#40534C] font-ui leading-relaxed">
              Morrow House brings together specialty coffee, honest ingredients, and a space designed for people to slow down.
            </p>
          </div>
        </SectionReveal>

        {/* Three Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {principles.map((item, idx) => (
            <SectionReveal key={item.num} delay={idx * 0.08} distance={20}>
              <div
                className="bg-[#FBF8F3]/70 backdrop-blur-sm rounded-3xl p-7 sm:p-8 border border-[#1A3636]/10 space-y-4 hover:-translate-y-1.5 transition-transform duration-300 shadow-sm h-full"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#40534C]/60 tracking-wider">
                    {item.num}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-[#E7D7C1] flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold tracking-tight text-[#1A3636]">
                  {item.title}
                </h3>

                <p className="text-sm text-[#40534C] font-ui leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Read Full Story Link */}
        <SectionReveal distance={15} delay={0.25}>
          <div className="pt-10 flex justify-start">
            <button
              onClick={() => navigateTo('story')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#1A3636] hover:gap-3 transition-all cursor-pointer font-ui"
            >
              <span>Read Our Full Story</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </SectionReveal>
      </div>

      {/* Organic Wave Transition to Forest Roast Space Section Below */}
      <div className="wave-divider-bottom z-30 pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 sm:h-16 md:h-20 text-[#40534C] preserve-3d"
        >
          <path
            d="M0,40 C300,75 620,10 940,55 C1220,90 1360,25 1440,40 L1440,80 L0,80 Z"
            fill="#40534C"
          />
        </svg>
      </div>
    </section>
  );
}
