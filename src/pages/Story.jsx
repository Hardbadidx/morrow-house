import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';
import { SectionReveal } from '../components/ui/SectionReveal';
import { MagneticButton } from '../components/ui/MagneticButton';
import diningRoomImg from '../assets/spaces/dining-room.png';
import coffeeBarImg from '../assets/spaces/coffee-bar.png';
import pizzaBurrataImg from '../assets/food/pizza-burrata.png';
import categoryPastaImg from '../assets/food/category-pasta.png';
import tableReservedImg from '../assets/spaces/table-reserved.png';
import { ArrowRight, Sparkles, Compass, Flame, Coffee, Heart, Calendar, Utensils } from 'lucide-react';

export function Story() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#D6BD98] text-[#1A3636] pt-28 sm:pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-20 sm:space-y-28">
          {/* Header */}
          <SectionReveal distance={20}>
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1A3636]" />
                <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#40534C] uppercase font-ui">
                  Our Story & Heritage
                </span>
              </div>
              <h1 className="hero-title text-[#1A3636] font-normal leading-[0.96]">
                Born from <br className="hidden sm:inline" />
                Obsession
              </h1>
              <p className="text-base sm:text-lg text-[#40534C] font-ui leading-relaxed max-w-xl">
                Morrow House was conceived as a multi-disciplinary culinary sanctuary where specialty coffee, wood-fired sourdough, and hand-extruded pasta coexist with unhurried hospitality.
              </p>
            </div>
          </SectionReveal>

          {/* Chapter 01: The Philosophy of Presence */}
          <SectionReveal distance={24}>
            <div className="bg-[#FBF8F3] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#1A3636]/12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 rounded-2xl overflow-hidden aspect-[16/10] bg-[#E7D7C1]/30 border border-[#1A3636]/10 relative group">
                <img
                  src={diningRoomImg}
                  alt="Morrow House Dining Sanctuary"
                  className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute top-4 left-4 bg-[#1A3636] text-[#D6BD98] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full font-ui shadow-sm">
                  01 · Philosophy
                </div>
              </div>

              <div className="lg:col-span-5 space-y-5">
                <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#40534C] font-ui">
                  The Core Tenet
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A3636] leading-tight">
                  Made with Intention
                </h2>
                <p className="text-xs sm:text-sm text-[#1A3636] font-semibold font-ui italic">
                  "True hospitality is not about pretension. It is about precision, acoustic calm, and generous time."
                </p>
                <p className="text-sm text-[#40534C] font-ui leading-relaxed">
                  Every material is chosen to soothe: lime-plastered almond walls that absorb ambient noise, curved velvet banquettes that invite lingering, and warm amber lighting calibrated for presence.
                </p>
                <div className="flex flex-wrap gap-2 pt-2 text-xs font-semibold text-[#1A3636] font-ui">
                  <span className="bg-[#E7D7C1]/50 px-3 py-1 rounded-full border border-[#1A3636]/10">Acoustic Warmth</span>
                  <span className="bg-[#E7D7C1]/50 px-3 py-1 rounded-full border border-[#1A3636]/10">Natural Light Archways</span>
                  <span className="bg-[#E7D7C1]/50 px-3 py-1 rounded-full border border-[#1A3636]/10">Unhurried Dining</span>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Chapter 02: Agricultural Provenance */}
          <SectionReveal distance={24}>
            <div className="bg-[#1A3636] text-[#FBF8F3] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-[#677D6A]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 space-y-5 order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#D6BD98] font-ui">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>02 · Agricultural Provenance</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FBF8F3] leading-tight">
                  Respect for the Source
                </h2>
                <p className="text-xs sm:text-sm text-[#D6BD98] font-semibold font-ui italic">
                  "Great cooking starts before the flame is ever struck."
                </p>
                <p className="text-sm text-[#D6BD98]/85 font-ui leading-relaxed">
                  We celebrate direct agricultural partnerships: sweet San Marzano plum tomatoes harvested at peak ripeness, cold-pressed Ligurian extra virgin olive oil, and fresh Pugliese burrata flown in weekly.
                </p>
                <div className="flex flex-wrap gap-2 pt-2 text-xs font-semibold text-[#D6BD98] font-ui">
                  <span className="bg-[#243E38] px-3 py-1 rounded-full border border-[#677D6A]/40">San Marzano D.O.P.</span>
                  <span className="bg-[#243E38] px-3 py-1 rounded-full border border-[#677D6A]/40">Ligurian EVOO</span>
                  <span className="bg-[#243E38] px-3 py-1 rounded-full border border-[#677D6A]/40">Fresh Pugliese Burrata</span>
                </div>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2 rounded-2xl overflow-hidden aspect-[4/3] bg-[#243E38] border border-[#677D6A]/40 relative group flex items-center justify-center p-4 sm:p-6 shadow-inner">
                <img
                  src={pizzaBurrataImg}
                  alt="Truffle Burrata Pizza Provenance"
                  className="w-full h-full object-contain transform transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute top-4 right-4 bg-[#1A3636] text-[#D6BD98] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full font-ui shadow-sm">
                  Handcrafted
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Chapter 03: The Roastery Ritual */}
          <SectionReveal distance={24}>
            <div className="bg-[#FBF8F3] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#1A3636]/12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 rounded-2xl overflow-hidden aspect-[16/11] bg-[#E7D7C1]/30 border border-[#1A3636]/10 relative group">
                <img
                  src={coffeeBarImg}
                  alt="Artisanal Coffee Bar Extraction"
                  className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute top-4 left-4 bg-[#1A3636] text-[#D6BD98] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full font-ui shadow-sm">
                  03 · Coffee Craft
                </div>
              </div>

              <div className="lg:col-span-6 space-y-5">
                <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#40534C] font-ui">
                  The Morning Anchor
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A3636] leading-tight">
                  Single-Origin Precision
                </h2>
                <p className="text-xs sm:text-sm text-[#1A3636] font-semibold font-ui italic">
                  "Every harvest tells a geographic story of soil, elevation, and rain."
                </p>
                <p className="text-sm text-[#40534C] font-ui leading-relaxed">
                  From floral Ethiopian Yirgacheffe batch brews to slow 18-hour Bourbon vanilla cold drips, our baristas dial in extraction variables daily on custom brushed brass Synesso stations.
                </p>
                <div className="pt-2">
                  <Link
                    to="/menu?category=coffee"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3636] hover:text-[#40534C] transition-colors font-ui"
                  >
                    <span>Explore Coffee Roasts</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Chapter 04: The 450°C Hearth & Hand Extrusion */}
          <SectionReveal distance={24}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Hearth Card */}
              <div className="bg-[#FBF8F3] rounded-3xl p-6 sm:p-8 border border-[#1A3636]/12 shadow-lg space-y-5 flex flex-col justify-between">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-[#E7D7C1]/30 border border-[#1A3636]/10">
                  <img
                    src={tableReservedImg}
                    alt="Wood-Fired Stone Oven"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#40534C] font-ui">
                    04 · The Hearth
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#1A3636]">
                    450°C Stone Hearth
                  </h3>
                  <p className="text-sm text-[#40534C] font-ui leading-relaxed">
                    Naturally fermented for 48 hours, our sourdough dough rests until light and digestible, baking in seconds under intense stone heat to produce crisp, airy cornicione.
                  </p>
                </div>
              </div>

              {/* Hand Extrusion Card */}
              <div className="bg-[#FBF8F3] rounded-3xl p-6 sm:p-8 border border-[#1A3636]/12 shadow-lg space-y-5 flex flex-col justify-between">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-[#E7D7C1]/30 border border-[#1A3636]/10">
                  <img
                    src={categoryPastaImg}
                    alt="Handmade Bronze Die Pasta"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#40534C] font-ui">
                    05 · The Pasta Room
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#1A3636]">
                    Bronze-Die Extrusion
                  </h3>
                  <p className="text-sm text-[#40534C] font-ui leading-relaxed">
                    Crafted daily using organic stone-milled semolina and golden free-range yolks, drawn slowly through bronze dies to create a porous texture that grips glossy pan emulsions.
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Chapter 05: A Sanctuary for the City */}
          <SectionReveal distance={20}>
            <div className="bg-[#E7D7C1]/35 rounded-3xl p-8 sm:p-12 border border-[#1A3636]/15 text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#40534C] font-ui">
                <Heart className="w-3.5 h-3.5 text-[#1A3636]" />
                <span>Our Community</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#1A3636]">
                A Quiet Harbor in Downtown Core
              </h3>
              <p className="text-sm sm:text-base text-[#40534C] font-ui leading-relaxed max-w-xl mx-auto">
                Designed as a welcoming haven where neighbors, travelers, and culinary enthusiasts can slow down and celebrate the simple pleasure of an extraordinary meal.
              </p>
            </div>
          </SectionReveal>

          {/* Closing Hospitality Invitation */}
          <SectionReveal distance={20}>
            <div className="text-center max-w-2xl mx-auto space-y-6 pt-6 border-t border-[#1A3636]/15">
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#1A3636]">
                Experience Our Story
              </h3>
              <p className="text-sm sm:text-base text-[#40534C] font-ui leading-relaxed">
                Join us at 30 Jalan Hang Lekir for an unhurried culinary journey.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <MagneticButton
                  onClick={() => navigate('/reservations')}
                  data-cursor="reserve"
                  className="btn-primary text-xs sm:text-sm px-8 py-3.5 flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve a Table</span>
                </MagneticButton>

                <Link
                  to="/menu"
                  className="text-xs sm:text-sm font-semibold text-[#1A3636] hover:text-[#40534C] transition-colors font-ui px-4 py-3 flex items-center gap-1.5"
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>View Full Menu</span>
                </Link>
              </div>

              {/* Fictional Brand Disclaimer */}
              <div className="text-[11px] text-[#40534C]/70 font-ui pt-4">
                Demonstration preview · Sourcing, technique, and architectural details are part of a fictional hospitality portfolio concept.
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </PageTransition>
  );
}
