import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { PageTransition } from '../components/layout/PageTransition';
import { SectionReveal } from '../components/ui/SectionReveal';
import { Search, ArrowRight, Sparkles, X, Utensils } from 'lucide-react';

export function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = (searchParams.get('category') || 'all').toLowerCase();

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState('');

  // Synchronize category state when searchParams changes (e.g. browser back/forward or direct link)
  useEffect(() => {
    const cat = (searchParams.get('category') || 'all').toLowerCase();
    setActiveCategory(cat);
  }, [searchParams]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catId);
    }
    setSearchParams(newParams);
  };

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category.toLowerCase() === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.ingredients?.some((ing) => ing.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#D6BD98] text-[#1A3636] pt-28 sm:pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          {/* Editorial Intro / Header */}
          <SectionReveal distance={20}>
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1A3636]" />
                <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#1A3636]/80 uppercase font-ui">
                  Culinary Collection
                </span>
              </div>

              <h1 className="hero-title text-[#1A3636] font-normal leading-[0.96]">
                Crafted for <br className="hidden sm:inline" />
                Every Craving
              </h1>

              <p className="text-base sm:text-lg text-[#40534C] font-ui leading-relaxed max-w-xl">
                A thoughtful dialogue between slow wood-fired sourdough traditions, single-origin roasts, hand-extruded bronze-die pastas, and comforting simmered broths. Crafted daily with seasonal integrity.
              </p>
            </div>
          </SectionReveal>

          {/* Category Navigation & Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#1A3636]/15">
            {/* Horizontally Scrollable Category Rail */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2.5 menu-category-scrollbar flex-nowrap">
              {MENU_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`relative px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 cursor-pointer font-ui flex items-center gap-2 flex-shrink-0 min-h-[44px] ${
                      isActive
                        ? 'text-[#D6BD98]'
                        : 'text-[#1A3636] bg-[#FBF8F3]/70 hover:bg-[#FBF8F3]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryPill"
                        className="absolute inset-0 bg-[#1A3636] rounded-full shadow-md z-0"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{cat.icon}</span>
                    <span className="relative z-10">{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Editorial Search Box */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#40534C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What are you craving?"
                aria-label="Search dishes or ingredients"
                className="w-full bg-[#FBF8F3] border border-[#1A3636]/20 rounded-full pl-10 pr-9 py-2.5 text-xs sm:text-sm text-[#1A3636] placeholder-[#40534C]/60 focus:outline-none focus:border-[#1A3636] font-ui shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#40534C] hover:text-[#1A3636] p-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Menu Grid / Empty State */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-20 px-6 bg-[#FBF8F3]/60 rounded-3xl border border-[#1A3636]/10 max-w-xl mx-auto space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#1A3636]/10 text-[#1A3636] flex items-center justify-center mx-auto">
                <Utensils className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-2xl font-bold text-[#1A3636]">
                  Nothing on the table yet.
                </h3>
                <p className="text-xs sm:text-sm text-[#40534C] font-ui leading-relaxed">
                  {searchQuery
                    ? `We couldn't find any dishes matching "${searchQuery}". Try adjusting your search or explore our full collection.`
                    : "We couldn't find any dishes in this selection. Clear your filters to browse the full culinary collection."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  handleCategoryChange('all');
                  setSearchQuery('');
                }}
                className="btn-primary text-xs px-6 py-3 cursor-pointer inline-flex items-center gap-2"
              >
                <span>Reset Filters & View All</span>
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout="position"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full"
                  >
                    <Link
                      to={`/menu/${item.id}`}
                      data-cursor="view"
                      className="group bg-[#FBF8F3] rounded-3xl overflow-hidden p-5 sm:p-6 flex flex-col justify-between border border-[#1A3636]/12 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
                    >
                      {/* Image Showcase (Protagonist) */}
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-[#E7D7C1]/25 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                        {item.signature && (
                          <div className="absolute top-3.5 left-3.5 bg-[#1A3636] text-[#D6BD98] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full font-ui flex items-center gap-1.5 shadow-sm">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>Signature</span>
                          </div>
                        )}
                      </div>

                      {/* Dish Info */}
                      <div className="space-y-2.5 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-display text-lg sm:text-xl font-bold text-[#1A3636] group-hover:text-[#40534C] transition-colors leading-tight">
                            {item.name}
                          </h3>
                          <span className="font-mono text-sm sm:text-base font-bold text-[#1A3636] flex-shrink-0 pt-0.5">
                            SGD {item.price.toFixed(2)}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-[#40534C] font-ui leading-relaxed line-clamp-2">
                          {item.description}
                        </p>

                        {item.dietaryTags?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {item.dietaryTags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] bg-[#E7D7C1]/45 text-[#1A3636] font-semibold px-2.5 py-0.5 rounded-full font-ui tracking-wide"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* View Details CTA Affordance */}
                      <div className="pt-4 border-t border-[#1A3636]/10 mt-5 flex items-center justify-between text-xs font-semibold text-[#1A3636] font-ui">
                        <span className="group-hover:text-[#40534C] transition-colors">
                          View Details & Notes
                        </span>
                        <div className="w-8 h-8 rounded-full bg-[#1A3636] text-[#D6BD98] flex items-center justify-center transform transition-transform duration-200 ease-out group-hover:translate-x-1">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
