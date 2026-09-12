import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wine, X } from 'lucide-react';
import { MENU_CATEGORIES, MENU_SECTIONS } from '../../data/menuData';
import { useScene } from '../../context/SceneContext';

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedDish, setSelectedDish] = useState(null);
  const { setHoveredMenuItem } = useScene();

  const displayedSections = activeCategory === 'all'
    ? MENU_SECTIONS
    : MENU_SECTIONS.filter(sec => sec.id === activeCategory);

  const handleMouseEnter = (dish) => {
    // Only trigger hover state on desktop devices
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      setHoveredMenuItem(dish);
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      setHoveredMenuItem(null);
    }
  };

  return (
    <section id="menu" className="relative min-h-screen py-28 sm:py-36 px-6 sm:px-12 md:px-20 z-10 font-ui">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 max-w-2xl">
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#bfa37c] font-ui font-medium block mb-3">
            02 / MENU
          </span>
          <h2 className="section-title text-[#f5f0eb] mb-4">
            A seasonal progression, composed with restraint.
          </h2>
          <p className="text-base text-[#a3978c] font-light leading-relaxed">
            Wild coastal provenance and charcoal hearth technique. An eight-course blind tasting is served nightly at the chef&apos;s counter.
          </p>
        </div>

        {/* Compact Category Navigation */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-4 mb-14 hairline no-scrollbar">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-[11px] sm:text-[12px] uppercase tracking-[0.2em] font-ui font-medium whitespace-nowrap px-3.5 py-1.5 transition-colors cursor-pointer relative ${
                  isActive
                    ? 'text-[#f5f0eb] after:content-[""] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[1px] after:bg-[#bfa37c]'
                    : 'text-[#786e65] hover:text-[#a3978c]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Clean Editorial Menu Rows */}
        <div className="space-y-16">
          {displayedSections.map((sec) => (
            <div key={sec.id} className="space-y-3">
              {/* Category Subhead */}
              <div className="flex items-baseline justify-between pb-2 hairline">
                <h3 className="font-display text-xl text-[#f5f0eb] tracking-wide">
                  {sec.title}
                </h3>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#786e65]">
                  {sec.subtitle}
                </span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-[rgba(245,240,235,0.06)]">
                {sec.items.map((dish) => (
                  <div
                    key={dish.id}
                    onMouseEnter={() => handleMouseEnter(dish)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => setSelectedDish(dish)}
                    className="group py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 cursor-pointer transition-colors duration-200 hover:bg-[#161311]/40 px-2 rounded"
                  >
                    {/* Number + Title + Ingredients */}
                    <div className="flex items-baseline gap-4 sm:gap-6 max-w-2xl">
                      <span className="text-[11px] tracking-[0.2em] text-[#786e65] shrink-0 font-mono">
                        {dish.number}
                      </span>
                      <div>
                        <h4 className="font-display text-xl sm:text-2xl text-[#f5f0eb] group-hover:text-[#bfa37c] transition-colors duration-200">
                          {dish.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#a3978c] font-light leading-relaxed mt-1">
                          {dish.ingredients}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline justify-between sm:justify-end gap-3 shrink-0 pl-8 sm:pl-0">
                      <span className="text-base sm:text-lg text-[#e8dfd5] font-ui font-medium">
                        ${dish.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tasting & Sommelier Notes Modal */}
      <AnimatePresence>
        {selectedDish && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#120f0d]/90 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-md w-full bg-[#161311] border border-[#f5f0eb]/12 rounded-xl p-7 sm:p-8 shadow-2xl"
            >
              <button
                onClick={() => setSelectedDish(null)}
                className="absolute top-5 right-5 p-2 text-[#786e65] hover:text-[#f5f0eb] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-5">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#bfa37c] font-medium block mb-1">
                  COURSE {selectedDish.number} &bull; {selectedDish.category.toUpperCase()}
                </span>
                <h3 className="font-display text-2xl text-[#f5f0eb] mb-1">
                  {selectedDish.name}
                </h3>
                <span className="text-xl text-[#bfa37c] font-medium">
                  ${selectedDish.price}
                </span>
              </div>

              <div className="space-y-4 text-xs font-light text-[#a3978c] mb-7">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#786e65] block mb-1">
                    Composition
                  </span>
                  <p className="leading-relaxed">{selectedDish.ingredients}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#786e65] block mb-1">
                    Provenance
                  </span>
                  <p className="leading-relaxed">{selectedDish.notes}</p>
                </div>
                <div className="pt-3 hairline-t flex items-center gap-2.5 text-[#e8dfd5]">
                  <Wine className="w-4 h-4 text-[#bfa37c] shrink-0" />
                  <span>{selectedDish.pairing}</span>
                </div>
              </div>

              <a
                href="#reservation"
                onClick={() => setSelectedDish(null)}
                className="w-full py-3 rounded-full bg-[#f5f0eb] text-[#120f0d] text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center transition-colors hover:bg-[#bfa37c]"
              >
                Reserve To Experience
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
