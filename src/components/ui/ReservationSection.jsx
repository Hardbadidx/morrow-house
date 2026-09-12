import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { SectionReveal } from './SectionReveal';
import { MagneticButton } from './MagneticButton';
import tableReservedImg from '../../assets/spaces/table-reserved.png';
import diningRoomImg from '../../assets/spaces/dining-room.png';
import privateDiningImg from '../../assets/spaces/private-dining.png';
import coffeeBarImg from '../../assets/spaces/coffee-bar.png';
import { ArrowRight, Calendar, Clock, Users } from 'lucide-react';

export function ReservationSection() {
  const { startReservation } = useNavigation();

  return (
    <section
      id="reservations"
      className="relative bg-[#1A3636] text-[#FBF8F3] pt-16 sm:pt-24 pb-28 sm:pb-36 overflow-hidden z-20"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Heading & Booking Trigger */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8 max-w-lg">
          <SectionReveal distance={24}>
            <div className="space-y-6 sm:space-y-8">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#D6BD98] uppercase font-ui">
                Reservations
              </span>

              <h2 className="hero-title text-[#FBF8F3] font-normal leading-[0.98]">
                Your Table <br />
                Awaits
              </h2>

              <p className="text-base sm:text-lg text-[#D6BD98]/90 font-ui leading-relaxed">
                Good food tastes better together. Whether an intimate dinner or a spirited gathering, reserve your table in advance.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-4 items-start">
                <MagneticButton
                  onClick={() => startReservation()}
                  data-cursor="reserve"
                  className="inline-flex items-center gap-2.5 bg-[#D6BD98] text-[#1A3636] font-semibold text-sm sm:text-base px-7 py-3.5 rounded-full hover:bg-[#FBF8F3] transition-all hover:gap-3.5 cursor-pointer shadow-lg active:scale-95 font-ui"
                >
                  <span>Make a Reservation</span>
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </div>
            </div>
          </SectionReveal>
        </div>

        {/* Right Column: Multi-Arch Architectural Vignette Composition */}
        <div className="lg:col-span-7 relative flex items-center justify-center">
          <SectionReveal distance={20} delay={0.12}>
            <div className="relative flex items-center justify-center w-full">
              {/* Handwritten Editorial Accent */}
              <div className="absolute -top-6 right-2 sm:right-6 z-20 text-right select-none pointer-events-none">
                <div className="font-script text-2xl sm:text-3xl text-[#D6BD98] font-bold leading-tight rotate-[3deg]">
                  Same Table <br />
                  New Stories.
                </div>
                {/* SVG Hand-Drawn Curved Arrow */}
                <svg
                  className="w-14 h-14 ml-auto text-[#D6BD98]/80 rotate-12 mt-1"
                  viewBox="0 0 60 60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M15 10 C 25 25, 40 20, 40 45" />
                  <path d="M48 38 L 40 45 L 32 40" />
                </svg>
              </div>

              {/* Arched Photo Montage */}
              <div className="flex items-center gap-4 sm:gap-6 w-full max-w-xl">
                {/* Main Arch: Table with "Reserved" brass sign */}
                <div
                  onClick={() => startReservation()}
                  data-cursor="reserve"
                  className="w-3/5 rounded-[42px] overflow-hidden shadow-2xl bg-[#2F3E39] border border-[#677D6A]/30 aspect-[3/4] relative group cursor-pointer"
                >
                  <img
                    src={tableReservedImg}
                    alt="Reserved Table at Morrow House"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-xs text-[#FBF8F3] font-ui font-medium">
                    Dining Room · Table 24
                  </div>
                </div>

                {/* Secondary Column: Arched Booth + Circular Vignettes */}
                <div className="w-2/5 flex flex-col gap-4">
                  <div className="rounded-[36px] overflow-hidden shadow-lg bg-[#2F3E39] border border-[#677D6A]/30 aspect-square group">
                    <img
                      src={diningRoomImg}
                      alt="Ambient Booth"
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Three Mini Circular Vignettes */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#D6BD98]/40 shadow-md">
                      <img src={coffeeBarImg} alt="Coffee Bar" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#D6BD98]/40 shadow-md">
                      <img src={privateDiningImg} alt="Private Dining" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#D6BD98]/40 shadow-md">
                      <img src={tableReservedImg} alt="Reserved" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>

      {/* Organic Wave Transition into Almond Footer Section Below */}
      <div className="wave-divider-bottom z-30 pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 sm:h-16 md:h-20 text-[#D6BD98] preserve-3d"
        >
          <path
            d="M0,35 C280,75 600,10 920,50 C1180,85 1360,20 1440,35 L1440,80 L0,80 Z"
            fill="#D6BD98"
          />
        </svg>
      </div>
    </section>
  );
}
