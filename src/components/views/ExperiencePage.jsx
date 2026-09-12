import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { SPACES_DATA } from '../../data/ambianceData';
import { ArrowRight, CheckCircle2, Volume2, VolumeX } from 'lucide-react';

export function ExperiencePage() {
  const { startReservation } = useNavigation();
  const [selectedSpace, setSelectedSpace] = useState(SPACES_DATA[0]);

  return (
    <div className="min-h-screen bg-[#D6BD98] text-[#1A3636] pt-28 sm:pt-36 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1A3636]" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#40534C] uppercase font-ui">
              Atmospheres & Spaces
            </span>
          </div>
          <h1 className="hero-title text-[#1A3636] font-normal leading-[0.98]">
            Designed for <br />
            Presence
          </h1>
          <p className="text-base sm:text-lg text-[#40534C] font-ui leading-relaxed max-w-xl">
            Four distinct dining environments crafted with natural lime-wash, curved velvet, honed stone, and acoustic warmth.
          </p>
        </div>

        {/* Space Selector Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 no-scrollbar">
          {SPACES_DATA.map((space) => {
            const isSelected = selectedSpace.id === space.id;
            return (
              <button
                key={space.id}
                onClick={() => setSelectedSpace(space)}
                className={`px-5 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer font-ui flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#1A3636] text-[#D6BD98] shadow-md'
                    : 'bg-[#FBF8F3]/70 text-[#1A3636] hover:bg-[#FBF8F3]'
                }`}
              >
                <span>{space.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Space Hero Feature */}
        <div className="bg-[#FBF8F3] rounded-3xl p-6 sm:p-10 border border-[#1A3636]/10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Photo Showcase */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden aspect-[16/10] bg-[#E7D7C1]/40 shadow-inner relative group">
            <img
              src={selectedSpace.image}
              alt={selectedSpace.title}
              className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 bg-[#1A3636]/85 backdrop-blur-sm text-[#D6BD98] text-xs font-semibold px-3 py-1 rounded-full font-ui">
              {selectedSpace.tag}
            </div>
          </div>

          {/* Description & Features */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#40534C] font-semibold font-ui">
                {selectedSpace.capacity}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1A3636] tracking-tight">
                {selectedSpace.title}
              </h2>
              <p className="text-sm sm:text-base text-[#40534C] font-ui leading-relaxed">
                {selectedSpace.description}
              </p>
            </div>

            {/* Architectural Features */}
            <div className="space-y-2.5 pt-2 border-t border-[#1A3636]/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A3636] font-ui">
                Space Highlights
              </h4>
              <div className="space-y-2 text-xs text-[#40534C] font-ui">
                {selectedSpace.features?.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#677D6A] flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Reservation Action */}
            <div className="pt-3">
              <button
                onClick={() => startReservation(selectedSpace.title)}
                className="btn-primary text-xs sm:text-sm px-6 py-3 flex items-center gap-2"
              >
                <span>Reserve in {selectedSpace.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* All Spaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPACES_DATA.map((space) => (
            <div
              key={space.id}
              onClick={() => {
                setSelectedSpace(space);
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              className="bg-[#FBF8F3] rounded-3xl p-4 border border-[#1A3636]/10 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer shadow-sm group flex flex-col justify-between"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#E7D7C1]/30 mb-3">
                <img
                  src={space.image}
                  alt={space.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="px-1">
                <h3 className="font-display text-base font-bold text-[#1A3636] tracking-tight">
                  {space.title}
                </h3>
                <p className="text-xs text-[#40534C] font-ui mt-0.5">
                  {space.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
