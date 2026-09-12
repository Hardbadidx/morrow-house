import React, { useState, useMemo } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { MENU_CATEGORIES, MENU_ITEMS } from '../../data/menuData';
import { Search, ArrowRight, Sparkles, Filter } from 'lucide-react';

export function MenuPage() {
  const { openDishModal, startReservation } = useNavigation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#D6BD98] text-[#1A3636] pt-28 sm:pt-36 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Page Hero Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1A3636]" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#1A3636]/80 uppercase font-ui">
              Culinary Collection
            </span>
          </div>

          <h1 className="hero-title text-[#1A3636] font-normal leading-[0.98]">
            Crafted for <br />
            Every Craving
          </h1>

          <p className="text-base sm:text-lg text-[#40534C] font-ui leading-relaxed max-w-xl">
            From single-origin morning espresso to wood-fired sourdough pizzas, hand-extruded pastas, and comforting noodle broths.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#1A3636]/15">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer font-ui flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#1A3636] text-[#D6BD98] shadow-md'
                      : 'bg-[#FBF8F3]/65 text-[#1A3636] hover:bg-[#FBF8F3]'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#40534C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes or ingredients..."
              className="w-full bg-[#FBF8F3] border border-[#1A3636]/20 rounded-full pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#1A3636] placeholder-[#40534C]/60 focus:outline-none focus:border-[#1A3636] font-ui"
            />
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#FBF8F3]/50 rounded-3xl p-8 border border-[#1A3636]/10">
            <p className="text-lg font-display text-[#1A3636] font-bold">No dishes found</p>
            <p className="text-sm text-[#40534C] font-ui mt-1">Try another search term or select all categories.</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-4 btn-primary text-xs px-5 py-2.5"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => openDishModal(item)}
                className="group bg-[#FBF8F3] rounded-3xl overflow-hidden p-5 flex flex-col justify-between border border-[#1A3636]/10 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Image Showcase */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#E7D7C1]/40 mb-4 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  {/* Category Pill Over Image */}
                  <div className="absolute top-3 left-3 bg-[#1A3636]/80 backdrop-blur-sm text-[#D6BD98] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full font-ui">
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#1A3636] group-hover:text-[#40534C] transition-colors">
                        {item.name}
                      </h3>
                      <div className="font-display text-lg font-bold text-[#1A3636] whitespace-nowrap">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-[#40534C] font-ui leading-relaxed mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Dietary & Action Footer */}
                  <div className="pt-3 border-t border-[#1A3636]/10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {item.dietary?.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-semibold text-[#677D6A] font-ui bg-[#677D6A]/10 px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#1A3636] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-ui">
                      Details <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Reservation Callout */}
        <div className="bg-[#1A3636] text-[#FBF8F3] rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#FBF8F3]">
              Ready to Taste the Experience?
            </h3>
            <p className="text-sm text-[#D6BD98] font-ui max-w-md">
              Secure your table for today or reserve a private dining room for special celebrations.
            </p>
          </div>
          <button
            onClick={() => startReservation()}
            className="btn-primary bg-[#D6BD98] text-[#1A3636] hover:bg-[#FBF8F3] whitespace-nowrap text-sm px-7 py-3.5"
          >
            <span>Book a Table Now</span>
            <ArrowRight className="w-4 h-4 ml-2 inline" />
          </button>
        </div>
      </div>
    </div>
  );
}
