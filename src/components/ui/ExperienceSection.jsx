import React from 'react';
import { AMBIANCE_ZONES } from '../../data/ambianceData';
import { useScene } from '../../context/SceneContext';

export function ExperienceSection() {
  const { activeZone, setActiveZone, setActiveCameraOverride } = useScene();

  const handleSelectZone = (zone) => {
    setActiveZone(zone.id);
    setActiveCameraOverride({
      pos: zone.cameraPosition,
      target: zone.cameraTarget,
    });
  };

  return (
    <section id="experience" className="relative min-h-screen py-28 sm:py-36 px-6 sm:px-12 md:px-20 z-10 font-ui">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#bfa37c] font-ui font-medium block mb-3">
            03 / SANCTUARIES
          </span>
          <h2 className="section-title text-[#f5f0eb] mb-4">
            Four spaces of acoustic warmth and shadow.
          </h2>
          <p className="text-base text-[#a3978c] font-light leading-relaxed">
            Select any room to guide the 3D perspective directly to that environment.
          </p>
        </div>

        {/* 4 Clean Sanctuary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {AMBIANCE_ZONES.map((zone, idx) => {
            const isSelected = activeZone === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => handleSelectZone(zone)}
                className={`text-left p-6 rounded-lg transition-all duration-300 font-ui cursor-pointer flex flex-col justify-between border ${
                  isSelected
                    ? 'border-[#bfa37c] bg-[#1a1513]'
                    : 'border-[#f5f0eb]/8 bg-[#161311]/60 hover:border-[#f5f0eb]/20 hover:bg-[#1a1513]'
                }`}
              >
                <div>
                  <span className="text-[10px] tracking-[0.2em] block text-[#786e65] mb-3 font-mono">
                    0{idx + 1}
                  </span>
                  <h3 className="font-display text-xl text-[#f5f0eb] mb-2 tracking-wide">
                    {zone.name}
                  </h3>
                  <p className="text-xs text-[#a3978c] font-light leading-relaxed">
                    {zone.tagline}
                  </p>
                </div>

                <div className="pt-6 mt-4 hairline-t">
                  <span
                    className={`text-[10px] tracking-[0.2em] uppercase font-medium transition-colors ${
                      isSelected ? 'text-[#bfa37c]' : 'text-[#786e65]'
                    }`}
                  >
                    {isSelected ? 'Viewing' : 'View space &rarr;'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
