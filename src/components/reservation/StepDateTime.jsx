import React, { useState, useMemo } from 'react';
import { Calendar, Clock, Info } from 'lucide-react';

export function StepDateTime({ selectedDate, onSelectDate, selectedTime, onSelectTime }) {
  const [activeWeekTab, setActiveWeekTab] = useState('this-week');

  // Generate a 21-day rolling booking window starting from today
  const allAvailableDates = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 21 }).map((_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      return {
        iso,
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' }),
        fullDate: d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
        weekIndex: Math.floor(i / 7),
      };
    });
  }, []);

  const weekTabs = [
    { id: 'this-week', label: 'This Week', rangeIndex: 0 },
    { id: 'next-week', label: 'Next Week', rangeIndex: 1 },
    { id: 'following-week', label: 'Following Week', rangeIndex: 2 },
  ];

  const displayedDates = useMemo(() => {
    const activeTab = weekTabs.find((t) => t.id === activeWeekTab);
    const targetRange = activeTab ? activeTab.rangeIndex : 0;
    return allAvailableDates.filter((d) => d.weekIndex === targetRange);
  }, [allAvailableDates, activeWeekTab]);

  // Handle switching week tabs
  const handleTabSwitch = (tabId, rangeIndex) => {
    setActiveWeekTab(tabId);
    const firstDateOfRange = allAvailableDates.find((d) => d.weekIndex === rangeIndex);
    if (firstDateOfRange && !displayedDates.some((d) => d.iso === selectedDate)) {
      onSelectDate(firstDateOfRange.iso);
    }
  };

  const timeServiceGroups = [
    {
      period: 'Lunch & Afternoon',
      slots: [
        { time: '12:00 PM', status: 'standard' },
        { time: '12:30 PM', status: 'popular' },
        { time: '1:00 PM', status: 'standard' },
        { time: '1:30 PM', status: 'standard' },
        { time: '2:00 PM', status: 'limited' },
        { time: '2:30 PM', status: 'standard' },
        { time: '3:00 PM', status: 'standard' },
      ],
    },
    {
      period: 'Dinner Service',
      slots: [
        { time: '6:00 PM', status: 'standard' },
        { time: '6:30 PM', status: 'popular' },
        { time: '7:00 PM', status: 'popular' },
        { time: '7:30 PM', status: 'popular' },
        { time: '8:00 PM', status: 'unavailable' },
        { time: '8:30 PM', status: 'limited' },
        { time: '9:00 PM', status: 'standard' },
        { time: '9:30 PM', status: 'standard' },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1A3636]" />
          <span className="text-xs font-semibold tracking-[0.2em] text-[#40534C] uppercase font-ui">
            Step 2 of 4
          </span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1A3636]">
          Date & Service Time
        </h2>
        <p className="text-xs sm:text-sm text-[#40534C] font-ui leading-relaxed">
          Select your preferred dining date and arrival time.
        </p>
      </div>

      {/* Date Picker Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#1A3636] font-ui">
            <Calendar className="w-4 h-4 text-[#40534C]" />
            <span>Select Date</span>
          </div>

          {/* Week Window Navigation Tabs */}
          <div className="inline-flex p-1 bg-[#E7D7C1]/40 rounded-full border border-[#1A3636]/10 self-start sm:self-auto">
            {weekTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabSwitch(tab.id, tab.rangeIndex)}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer font-ui ${
                  activeWeekTab === tab.id
                    ? 'bg-[#1A3636] text-[#D6BD98] shadow-sm'
                    : 'text-[#1A3636] hover:text-[#40534C]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Date Rail */}
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {displayedDates.map((item) => {
            const isSelected = selectedDate === item.iso;
            return (
              <button
                key={item.iso}
                type="button"
                onClick={() => onSelectDate(item.iso)}
                className={`py-3.5 px-2 rounded-2xl text-center border transition-all duration-200 cursor-pointer flex flex-col items-center justify-center min-h-[76px] ${
                  isSelected
                    ? 'bg-[#1A3636] text-[#D6BD98] border-[#1A3636] shadow-md scale-[1.02]'
                    : 'bg-[#FBF8F3] text-[#1A3636] border-[#1A3636]/15 hover:border-[#1A3636]/40 hover:bg-[#FBF8F3]/90'
                }`}
              >
                <span className="text-[11px] uppercase font-semibold tracking-wider font-ui opacity-75">
                  {item.dayName}
                </span>
                <span className="font-display text-xl font-bold mt-0.5 leading-none">
                  {item.dayNum}
                </span>
                <span className="text-[10px] uppercase font-ui opacity-75 mt-0.5">
                  {item.month}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots Section */}
      <div className="space-y-4 pt-6 border-t border-[#1A3636]/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#1A3636] font-ui">
            <Clock className="w-4 h-4 text-[#40534C]" />
            <span>Select Service Time</span>
          </div>
        </div>

        <div className="space-y-5">
          {timeServiceGroups.map((group) => (
            <div key={group.period} className="space-y-2.5">
              <div className="text-xs uppercase font-semibold tracking-wider text-[#40534C] font-ui">
                {group.period}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {group.slots.map((slotItem) => {
                  const isSelected = selectedTime === slotItem.time;
                  const isUnavailable = slotItem.status === 'unavailable';

                  if (isUnavailable) {
                    return (
                      <div
                        key={slotItem.time}
                        aria-disabled="true"
                        className="py-2.5 px-3 rounded-xl text-xs font-semibold font-ui border border-[#1A3636]/10 bg-[#E7D7C1]/20 text-[#40534C]/40 flex items-center justify-between cursor-not-allowed select-none"
                      >
                        <span>{slotItem.time}</span>
                        <span className="text-[9px] uppercase tracking-wider font-bold">Filled</span>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={slotItem.time}
                      type="button"
                      onClick={() => onSelectTime(slotItem.time)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold font-ui transition-all duration-150 cursor-pointer border flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#1A3636] text-[#D6BD98] border-[#1A3636] shadow-sm font-bold scale-[1.01]'
                          : 'bg-[#FBF8F3] text-[#1A3636] border-[#1A3636]/15 hover:border-[#1A3636]/40 hover:bg-[#FBF8F3]/90'
                      }`}
                    >
                      <span>{slotItem.time}</span>
                      {slotItem.status === 'popular' && (
                        <span
                          className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded ${
                            isSelected ? 'bg-[#D6BD98]/25 text-[#D6BD98]' : 'bg-[#1A3636]/10 text-[#40534C]'
                          }`}
                        >
                          Popular
                        </span>
                      )}
                      {slotItem.status === 'limited' && (
                        <span
                          className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded ${
                            isSelected ? 'bg-[#D6BD98]/25 text-[#D6BD98]' : 'bg-[#1A3636]/10 text-[#40534C]'
                          }`}
                        >
                          Few Left
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Tasteful Demo Notice */}
        <div className="flex items-center gap-2 text-[11px] text-[#40534C]/80 font-ui pt-2">
          <Info className="w-3.5 h-3.5 flex-shrink-0 text-[#40534C]" />
          <span>
            Demonstration preview · Table inventory and service timeslots are simulated for this prototype.
          </span>
        </div>
      </div>
    </div>
  );
}
