import React from 'react';
import { Users, Minus, Plus, Sparkles } from 'lucide-react';

export function StepParty({ partySize, onSelectPartySize }) {
  // Parse numeric count from 'X Guests' or 'X Guest'
  const currentCount = parseInt(partySize, 10) || 2;

  const quickOptions = [
    { count: 1, label: '1 Guest' },
    { count: 2, label: '2 Guests' },
    { count: 4, label: '4 Guests' },
    { count: 6, label: '6 Guests' },
    { count: 8, label: '8 Guests' },
  ];

  const handleDecrement = () => {
    if (currentCount > 1) {
      const next = currentCount - 1;
      onSelectPartySize(`${next} ${next === 1 ? 'Guest' : 'Guests'}`);
    }
  };

  const handleIncrement = () => {
    if (currentCount < 14) {
      const next = currentCount + 1;
      onSelectPartySize(`${next} Guests`);
    }
  };

  const getSeatingNote = (count) => {
    if (count <= 2) {
      return 'Cozy intimate table or high bar seating with direct barista view.';
    }
    if (count <= 6) {
      return 'Spacious dining banquette arranged for conversation and sharing.';
    }
    return 'Large dining table. For parties larger than 8, our team prepares special table spacing.';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1A3636]" />
          <span className="text-xs font-semibold tracking-[0.2em] text-[#40534C] uppercase font-ui">
            Step 3 of 4
          </span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1A3636]">
          Party Size
        </h2>
        <p className="text-xs sm:text-sm text-[#40534C] font-ui leading-relaxed">
          How many guests will be dining with us?
        </p>
      </div>

      {/* Interactive Stepper Counter */}
      <div className="bg-[#FBF8F3] border border-[#1A3636]/15 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-bold uppercase tracking-wider text-[#40534C] font-ui">
            Selected Party Size
          </div>
          <div className="font-display text-3xl font-bold text-[#1A3636] flex items-center justify-center sm:justify-start gap-2">
            <Users className="w-6 h-6 text-[#1A3636]" />
            <span>{partySize}</span>
          </div>
        </div>

        {/* Counter Buttons */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={currentCount <= 1}
            aria-label="Decrease guest count"
            className="w-12 h-12 rounded-2xl border border-[#1A3636]/20 bg-[#FBF8F3] text-[#1A3636] flex items-center justify-center transition-all cursor-pointer hover:bg-[#1A3636] hover:text-[#D6BD98] disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
          >
            <Minus className="w-5 h-5" />
          </button>

          <span className="font-mono text-2xl font-bold text-[#1A3636] w-10 text-center select-none">
            {currentCount}
          </span>

          <button
            type="button"
            onClick={handleIncrement}
            disabled={currentCount >= 14}
            aria-label="Increase guest count"
            className="w-12 h-12 rounded-2xl border border-[#1A3636]/20 bg-[#FBF8F3] text-[#1A3636] flex items-center justify-center transition-all cursor-pointer hover:bg-[#1A3636] hover:text-[#D6BD98] disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick Select Buttons */}
      <div className="space-y-2">
        <div className="text-xs uppercase font-semibold tracking-wider text-[#40534C] font-ui">
          Quick Select
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
          {quickOptions.map((opt) => {
            const isSelected = currentCount === opt.count;
            return (
              <button
                key={opt.count}
                type="button"
                onClick={() => onSelectPartySize(opt.label)}
                className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold font-ui transition-all duration-150 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#1A3636] text-[#D6BD98] border-[#1A3636] shadow-sm font-bold scale-[1.01]'
                    : 'bg-[#FBF8F3] text-[#1A3636] border-[#1A3636]/15 hover:border-[#1A3636]/40 hover:bg-[#FBF8F3]/90'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Seating Insight */}
      <div className="bg-[#E7D7C1]/30 border border-[#1A3636]/10 rounded-2xl p-4 flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-[#1A3636] mt-0.5 flex-shrink-0" />
        <div className="text-xs text-[#40534C] font-ui leading-relaxed">
          {getSeatingNote(currentCount)}
        </div>
      </div>
    </div>
  );
}
