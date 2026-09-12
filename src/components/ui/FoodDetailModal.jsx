import React, { useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { X, ArrowRight, Sparkles, Clock, CheckCircle2 } from 'lucide-react';

export function FoodDetailModal() {
  const { selectedDish, closeDishModal, startReservation } = useNavigation();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeDishModal();
    };
    if (selectedDish) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedDish, closeDishModal]);

  if (!selectedDish) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-md animate-fade-in">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={closeDishModal} />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#FBF8F3] text-[#1A3636] rounded-3xl overflow-hidden shadow-2xl border border-[#D6BD98]/40 z-10 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={closeDishModal}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-[#1A3636] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Dish Image */}
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#E7D7C1]/30 flex items-center justify-center shadow-inner">
            <img
              src={selectedDish.image}
              alt={selectedDish.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Dish Header Meta */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-1.5">
                <span className="text-xs font-semibold tracking-wider uppercase text-[#40534C] font-ui bg-[#D6BD98]/40 px-2.5 py-0.5 rounded-full">
                  {selectedDish.category || 'Specialty'}
                </span>
                {selectedDish.dietary?.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold text-[#677D6A] font-ui bg-[#677D6A]/10 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#1A3636]">
                {selectedDish.name}
              </h2>
            </div>

            <div className="font-display text-2xl sm:text-3xl font-bold text-[#1A3636]">
              ${selectedDish.price?.toFixed(2)}
              <span className="text-xs font-normal text-[#40534C] ml-1 font-ui">SGD</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#40534C] font-ui leading-relaxed">
            {selectedDish.fullDescription || selectedDish.description}
          </p>

          {/* Ingredients Breakdown */}
          {selectedDish.ingredients && (
            <div className="space-y-2 pt-2 border-t border-[#1A3636]/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A3636] font-ui">
                Key Ingredients & Provenance
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#40534C] font-ui">
                {selectedDish.ingredients.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#677D6A] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sommelier / Barista Pairing */}
          {selectedDish.pairing && (
            <div className="p-4 rounded-2xl bg-[#E7D7C1]/50 border border-[#D6BD98]/60 space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#1A3636] font-ui flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#40534C]" />
                <span>Pairing Suggestion</span>
              </div>
              <p className="text-xs sm:text-sm text-[#40534C] font-ui font-medium">
                {selectedDish.pairing}
              </p>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1A3636]/10">
            <div className="text-xs text-[#40534C] font-ui">
              Freshly prepared to order · Michelin standard execution
            </div>
            <button
              onClick={() => {
                closeDishModal();
                startReservation(selectedDish.name);
              }}
              className="w-full sm:w-auto btn-primary text-xs sm:text-sm px-6 py-3 flex items-center justify-center gap-2"
            >
              <span>Reserve Table for This Dish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
