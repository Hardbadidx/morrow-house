import React from 'react';
import { SPACES_DATA } from '../../data/ambianceData';
import { Check, Utensils, Coffee, Users, Flame } from 'lucide-react';

export function StepExperience({ selectedExperience, onSelect }) {
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
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1A3636]" />
          <span className="text-xs font-semibold tracking-[0.2em] text-[#40534C] uppercase font-ui">
            Step 1 of 4
          </span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1A3636]">
          Choose Your Atmosphere
        </h2>
        <p className="text-xs sm:text-sm text-[#40534C] font-ui leading-relaxed">
          Select the dining setting that best suits your occasion.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SPACES_DATA.map((space) => {
          const isSelected = selectedExperience === space.id;
          return (
            <button
              key={space.id}
              type="button"
              onClick={() => onSelect(space.id)}
              className={`p-5 rounded-2xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                isSelected
                  ? 'bg-[#1A3636] text-[#FBF8F3] border-[#1A3636] shadow-lg scale-[1.01]'
                  : 'bg-[#FBF8F3] text-[#1A3636] border-[#1A3636]/15 hover:border-[#1A3636]/40 hover:bg-[#FBF8F3]/90'
              }`}
            >
              <div className="flex items-start justify-between gap-3 w-full">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-[#D6BD98] text-[#1A3636]'
                      : 'bg-[#E7D7C1]/50 text-[#1A3636] group-hover:bg-[#D6BD98]/60'
                  }`}
                >
                  {getIcon(space.id)}
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full font-ui ${
                      isSelected
                        ? 'bg-[#D6BD98]/20 text-[#D6BD98]'
                        : 'bg-[#1A3636]/10 text-[#40534C]'
                    }`}
                  >
                    {space.tag}
                  </span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#D6BD98] text-[#1A3636] flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 space-y-1">
                <div className="font-display text-lg font-bold tracking-tight">
                  {space.title}
                </div>
                <p
                  className={`text-xs font-ui leading-relaxed ${
                    isSelected ? 'text-[#D6BD98]' : 'text-[#40534C]'
                  }`}
                >
                  {space.subtitle}
                </p>
                <div
                  className={`text-[11px] pt-1 font-mono ${
                    isSelected ? 'text-[#D6BD98]/80' : 'text-[#40534C]/75'
                  }`}
                >
                  {space.capacity}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
