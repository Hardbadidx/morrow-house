import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getDishById } from '../data/menuData';
import { PageTransition } from '../components/layout/PageTransition';
import { MagneticButton } from '../components/ui/MagneticButton';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  UtensilsCrossed,
  GlassWater,
  ChefHat,
  AlertCircle,
  Leaf
} from 'lucide-react';

export function DishDetails() {
  const { dish: dishId } = useParams();
  const navigate = useNavigate();
  const dish = getDishById(dishId);

  if (!dish) {
    return (
      <PageTransition>
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-24">
          <div className="w-16 h-16 rounded-full bg-[#1A3636]/10 flex items-center justify-center mb-4 text-[#1A3636]">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="font-display text-3xl font-bold text-[#1A3636]">Dish Not Found</h1>
          <p className="text-sm text-[#40534C] font-ui mt-2 max-w-sm leading-relaxed">
            We couldn't locate this culinary offering. It may be a seasonal creation or the link may be outdated.
          </p>
          <Link
            to="/menu"
            className="btn-primary mt-6 text-sm px-6 py-3 flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Menu</span>
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#D6BD98] text-[#1A3636] pt-28 sm:pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
          {/* Top Breadcrumb / Back Link */}
          <div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1A3636]/80 hover:text-[#1A3636] transition-colors font-ui"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Full Menu</span>
            </Link>
          </div>

          {/* Main Asymmetrical Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Column: Food Protagonist Presentation & Craft Note */}
            <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-28">
              <div className="relative aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden bg-[#FBF8F3] border border-[#1A3636]/15 shadow-xl flex items-center justify-center p-4 sm:p-6">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
                {dish.signature && (
                  <div className="absolute top-6 left-6 bg-[#1A3636] text-[#D6BD98] text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full font-ui flex items-center gap-1.5 shadow-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Signature Dish</span>
                  </div>
                )}
              </div>

              {/* Chef's Note Card */}
              {dish.chefNote && (
                <div className="bg-[#FBF8F3] rounded-2xl p-6 border border-[#1A3636]/15 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#1A3636] font-ui">
                    <ChefHat className="w-4 h-4 text-[#40534C]" />
                    <span>Chef's Craft & Technique</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#40534C] font-ui leading-relaxed italic">
                    "{dish.chefNote}"
                  </p>
                </div>
              )}
            </div>

            {/* Right Column: Culinary Details & Booking Affordance */}
            <div className="lg:col-span-6 space-y-8">
              {/* Heading & Category */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1A3636]" />
                  <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#40534C] uppercase font-ui">
                    {dish.category}
                  </span>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A3636] leading-[1.05]">
                  {dish.name}
                </h1>

                <div className="font-mono text-xl sm:text-2xl font-bold text-[#1A3636]">
                  SGD {dish.price.toFixed(2)}
                </div>

                <p className="text-sm sm:text-base text-[#40534C] font-ui leading-relaxed pt-2">
                  {dish.fullDescription || dish.description}
                </p>
              </div>

              {/* Dietary Tags & Allergens */}
              <div className="space-y-3 pt-4 border-t border-[#1A3636]/15">
                <div className="text-xs font-bold uppercase tracking-wider text-[#1A3636] font-ui">
                  Dietary & Allergens
                </div>
                <div className="flex flex-wrap gap-2">
                  {dish.dietaryTags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-[#1A3636] text-[#D6BD98] font-semibold px-3 py-1 rounded-full font-ui flex items-center gap-1.5"
                    >
                      <Leaf className="w-3 h-3" />
                      <span>{tag}</span>
                    </span>
                  ))}
                  {dish.allergens?.length > 0 ? (
                    dish.allergens.map((alg) => (
                      <span
                        key={alg}
                        className="text-xs bg-[#FBF8F3] text-[#40534C] font-semibold px-3 py-1 rounded-full border border-[#1A3636]/15 font-ui"
                      >
                        Contains: {alg}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs bg-[#FBF8F3] text-[#40534C] font-semibold px-3 py-1 rounded-full border border-[#1A3636]/15 font-ui">
                      No common allergens declared
                    </span>
                  )}
                </div>
              </div>

              {/* Primary Ingredients Breakdown */}
              {dish.ingredients?.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-[#1A3636]/15">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3636] font-ui">
                    <UtensilsCrossed className="w-3.5 h-3.5 text-[#40534C]" />
                    <span>Primary Ingredients</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#40534C] font-ui">
                    {dish.ingredients.map((ing, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1A3636] mt-1.5 flex-shrink-0" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pairing Recommendation */}
              {dish.pairing && (
                <div className="space-y-2 pt-4 border-t border-[#1A3636]/15">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3636] font-ui">
                    <GlassWater className="w-3.5 h-3.5 text-[#40534C]" />
                    <span>Pairing Recommendation</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#40534C] font-ui leading-relaxed">
                    {dish.pairing}
                  </p>
                </div>
              )}

              {/* Call to Action */}
              <div className="pt-6 border-t border-[#1A3636]/15 flex flex-wrap items-center gap-4">
                <MagneticButton
                  onClick={() => navigate('/reservations?experience=dining-room')}
                  data-cursor="reserve"
                  className="btn-primary flex items-center gap-2.5 text-sm sm:text-base px-7 py-3.5 shadow-md cursor-pointer"
                >
                  <span>Reserve a Table to Taste</span>
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>

                <Link
                  to="/menu"
                  className="text-xs sm:text-sm font-semibold text-[#1A3636] hover:text-[#40534C] transition-colors font-ui px-4 py-3"
                >
                  Browse Other Offerings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
