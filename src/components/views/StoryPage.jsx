import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import diningRoomImg from '../../assets/spaces/dining-room.png';
import coffeeBarImg from '../../assets/spaces/coffee-bar.png';
import pizzaBurrataImg from '../../assets/food/pizza-burrata.png';
import { ArrowRight, Compass, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export function StoryPage() {
  const { navigateTo, startReservation } = useNavigation();

  return (
    <div className="min-h-screen bg-[#D6BD98] text-[#1A3636] pt-28 sm:pt-36 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-20">
        {/* Story Hero */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1A3636]" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#40534C] uppercase font-ui">
              Our Journey & Heritage
            </span>
          </div>
          <h1 className="hero-title text-[#1A3636] font-normal leading-[0.98]">
            Born from <br />
            Obsession
          </h1>
          <p className="text-base sm:text-lg text-[#40534C] font-ui leading-relaxed max-w-xl">
            In 2021, we set out to build a culinary sanctuary in Singapore where specialty coffee roasters, artisanal pasta extruders, and wood-fired sourdough hearths live under one roof.
          </p>
        </div>

        {/* Visual Moment 1: The Sourdough & Hearth */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#FBF8F3] rounded-3xl p-8 sm:p-12 border border-[#1A3636]/10 shadow-lg">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs uppercase tracking-widest text-[#40534C] font-semibold font-ui">
              01 · The Craft
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#1A3636]">
              48-Hour Wild Fermentation
            </h2>
            <p className="text-sm sm:text-base text-[#40534C] font-ui leading-relaxed">
              Every pizza crust and loaf begins with our heritage starter, cold-fermented over two full days for maximum digestibility, aroma, and delicate leopard blistered crusts.
            </p>
            <div className="flex items-center gap-6 pt-2 font-ui text-xs font-semibold text-[#1A3636]">
              <div>• 100% Organic Heritage Flour</div>
              <div>• 450°C Lava Stone Hearth</div>
            </div>
          </div>
          <div className="lg:col-span-6 rounded-2xl overflow-hidden aspect-[4/3] bg-[#E7D7C1]/30">
            <img
              src={pizzaBurrataImg}
              alt="Artisanal Pizza Craft"
              className="w-full h-full object-contain p-4"
            />
          </div>
        </div>

        {/* Visual Moment 2: Sourcing & Integrity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#1A3636] text-[#FBF8F3] rounded-3xl p-8 sm:p-12 shadow-xl border border-[#677D6A]/30">
          <div className="lg:col-span-6 order-2 lg:order-1 rounded-2xl overflow-hidden aspect-[4/3]">
            <img
              src={coffeeBarImg}
              alt="Specialty Coffee Roasting"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
            <span className="text-xs uppercase tracking-widest text-[#D6BD98] font-semibold font-ui">
              02 · Honest Provenance
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#FBF8F3]">
              Direct-Trade Roasting
            </h2>
            <p className="text-sm sm:text-base text-[#D6BD98]/90 font-ui leading-relaxed">
              We partner directly with family-run micro-lots in Ethiopia, Colombia, and Sumatra, paying above fair-trade premiums for hand-picked cherries roasted in small weekly batches.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('menu')}
                className="btn-primary bg-[#D6BD98] text-[#1A3636] hover:bg-[#FBF8F3] text-xs sm:text-sm px-6 py-3"
              >
                <span>Taste Our Roasts</span>
                <ArrowRight className="w-4 h-4 ml-2 inline" />
              </button>
            </div>
          </div>
        </div>

        {/* Team & Community */}
        <div className="text-center max-w-2xl mx-auto space-y-6 pt-4">
          <h3 className="font-display text-3xl font-bold text-[#1A3636]">
            More Than Just a Meal
          </h3>
          <p className="text-sm sm:text-base text-[#40534C] font-ui leading-relaxed">
            We believe that hospitality is the art of making someone feel deeply considered. We cannot wait to welcome you to our table.
          </p>
          <button
            onClick={() => startReservation()}
            className="btn-primary text-sm px-8 py-3.5 inline-flex items-center gap-2"
          >
            <span>Reserve Your Table</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
