import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SPACES_DATA, EXPERIENCE_GALLERY } from '../data/ambianceData';
import { PageTransition } from '../components/layout/PageTransition';
import { SectionReveal } from '../components/ui/SectionReveal';
import { MagneticButton } from '../components/ui/MagneticButton';
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Clock,
  Sparkles,
  Maximize2,
  X,
  Compass,
  Utensils,
  Calendar
} from 'lucide-react';

export function Experience() {
  const navigate = useNavigate();
  const [selectedSpaceId, setSelectedSpaceId] = useState(SPACES_DATA[0].id);
  const [activeModalItem, setActiveModalItem] = useState(null);
  const lastFocusedTriggerRef = useRef(null);

  const activeSpace = SPACES_DATA.find((s) => s.id === selectedSpaceId) || SPACES_DATA[0];

  // Prevent body scroll when lightbox is open and restore focus on close
  useEffect(() => {
    if (activeModalItem) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          closeLightbox();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [activeModalItem]);

  const openLightbox = (item, triggerElement) => {
    lastFocusedTriggerRef.current = triggerElement || document.activeElement;
    setActiveModalItem(item);
  };

  const closeLightbox = () => {
    setActiveModalItem(null);
    if (lastFocusedTriggerRef.current && typeof lastFocusedTriggerRef.current.focus === 'function') {
      lastFocusedTriggerRef.current.focus();
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#D6BD98] text-[#1A3636] pt-28 sm:pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-20">
          {/* Section 1: Editorial Header */}
          <SectionReveal distance={20}>
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1A3636]" />
                <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#40534C] uppercase font-ui">
                  Atmospheres & Spaces
                </span>
              </div>
              <h1 className="hero-title text-[#1A3636] font-normal leading-[0.96]">
                Four Spaces. <br className="hidden sm:inline" />
                One Philosophy.
              </h1>
              <p className="text-base sm:text-lg text-[#40534C] font-ui leading-relaxed max-w-2xl">
                Four distinct dining environments crafted with natural lime-wash, curved velvet banquettes, honed black stone, and acoustic warmth. Designed for presence and connection.
              </p>
            </div>
          </SectionReveal>

          {/* Section 2: Interactive Numbered Experience Navigation Rail */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 no-scrollbar flex-nowrap">
              {SPACES_DATA.map((space) => {
                const isSelected = selectedSpaceId === space.id;
                return (
                  <button
                    key={space.id}
                    type="button"
                    onClick={() => setSelectedSpaceId(space.id)}
                    className={`relative px-4 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 cursor-pointer font-ui flex items-center gap-2.5 flex-shrink-0 min-h-[46px] ${
                      isSelected
                        ? 'text-[#D6BD98]'
                        : 'text-[#1A3636] bg-[#FBF8F3]/70 hover:bg-[#FBF8F3]'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeSpaceIndicator"
                        className="absolute inset-0 bg-[#1A3636] rounded-full shadow-md z-0"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 font-mono text-[11px] opacity-75">
                      {space.number}
                    </span>
                    <span className="relative z-10">{space.title}</span>
                    <span
                      className={`relative z-10 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-ui ${
                        isSelected ? 'bg-[#D6BD98]/20 text-[#D6BD98]' : 'bg-[#1A3636]/10 text-[#40534C]'
                      }`}
                    >
                      {space.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Immersive Active Space Feature (Asymmetrical Protagonist Showcase) */}
          <SectionReveal distance={24}>
            <div className="bg-[#FBF8F3] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#1A3636]/12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left Column: Visual Protagonist */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#E7D7C1]/30 border border-[#1A3636]/10 shadow-inner group">
                  <img
                    src={activeSpace.image}
                    alt={activeSpace.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  {/* Space Tag & Number Overlay */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="bg-[#1A3636] text-[#D6BD98] text-[10px] font-mono font-bold px-2.5 py-1 rounded-full shadow-sm">
                      {activeSpace.number}
                    </span>
                    <span className="bg-[#1A3636]/90 backdrop-blur-sm text-[#FBF8F3] text-xs font-semibold px-3 py-1 rounded-full font-ui shadow-sm">
                      {activeSpace.tag}
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-[#FBF8F3] text-[11px] font-ui font-semibold px-3 py-1 rounded-full shadow-sm">
                    {activeSpace.capacity}
                  </div>
                </div>

                {/* Subtle Architecture Footnote */}
                <div className="text-[11px] text-[#40534C] font-ui italic text-center sm:text-left">
                  "{activeSpace.atmosphere}"
                </div>
              </div>

              {/* Right Column: Editorial Storytelling & Details */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-3">
                  <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#40534C] font-ui">
                    {activeSpace.number} · {activeSpace.tag}
                  </div>

                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A3636] leading-[1.05]">
                    {activeSpace.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#1A3636] font-semibold font-ui italic">
                    "{activeSpace.subtitle}"
                  </p>

                  <p className="text-sm text-[#40534C] font-ui leading-relaxed pt-1">
                    {activeSpace.description}
                  </p>
                </div>

                {/* Key Details Grid */}
                <div className="bg-[#E7D7C1]/30 rounded-2xl p-4 border border-[#1A3636]/10 space-y-3 text-xs font-ui">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[#40534C] flex-shrink-0">Ideal Occasion</span>
                    <span className="font-semibold text-[#1A3636] text-right">
                      {activeSpace.idealOccasion}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-2 pt-2 border-t border-[#1A3636]/10">
                    <span className="text-[#40534C] flex-shrink-0">Signature Detail</span>
                    <span className="font-semibold text-[#1A3636] text-right">
                      {activeSpace.signatureDetail}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-2 pt-2 border-t border-[#1A3636]/10">
                    <span className="text-[#40534C] flex-shrink-0">Capacity</span>
                    <span className="font-semibold text-[#1A3636] text-right font-mono">
                      {activeSpace.capacity}
                    </span>
                  </div>
                </div>

                {/* Highlights List */}
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#1A3636] font-ui">
                    Notable Features
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#40534C] font-ui">
                    {activeSpace.features?.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1A3636] flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Controls */}
                <div className="pt-3 border-t border-[#1A3636]/10 flex flex-wrap items-center gap-4">
                  <MagneticButton
                    onClick={() => navigate(`/reservations?experience=${activeSpace.id}`)}
                    data-cursor="reserve"
                    className="btn-primary text-xs sm:text-sm px-6 py-3.5 flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Reserve in {activeSpace.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>

                  <Link
                    to="/menu"
                    className="text-xs sm:text-sm font-semibold text-[#1A3636] hover:text-[#40534C] transition-colors font-ui px-3 py-2"
                  >
                    Explore Culinary Menu
                  </Link>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Section 4: Curated Interactive Gallery ("Moments in Presence") */}
          <div className="space-y-8 pt-4">
            <SectionReveal distance={20}>
              <div className="max-w-2xl space-y-2">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1A3636]" />
                  <span className="text-xs font-semibold tracking-[0.25em] text-[#40534C] uppercase font-ui">
                    Curated Perspectives
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1A3636]">
                  Moments in Presence
                </h3>
                <p className="text-xs sm:text-sm text-[#40534C] font-ui leading-relaxed">
                  A glimpse into our daily rhythms — from morning single-origin cuppings to hearthside plating and evening cellar tastings. Click any moment to inspect.
                </p>
              </div>
            </SectionReveal>

            {/* Editorial Asymmetrical Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {EXPERIENCE_GALLERY.map((item, idx) => (
                <SectionReveal key={item.id} delay={Math.min(idx * 0.05, 0.25)} distance={16}>
                  <div
                    role="button"
                    tabIndex={0}
                    data-cursor="view"
                    onClick={(e) => openLightbox(item, e.currentTarget)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openLightbox(item, e.currentTarget);
                      }
                    }}
                    className="group bg-[#FBF8F3] rounded-2xl overflow-hidden p-3 border border-[#1A3636]/12 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between h-full focus:outline-none focus:ring-2 focus:ring-[#1A3636]"
                  >
                    {/* Image Frame */}
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#E7D7C1]/30 mb-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-[#1A3636]/90 backdrop-blur-sm text-[#D6BD98] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full font-ui">
                        {item.category}
                      </div>
                      <div className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 text-[#FBF8F3] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-1 flex-1">
                      <div className="text-[10px] font-semibold text-[#40534C] uppercase tracking-wider font-ui">
                        {item.spaceName}
                      </div>
                      <h4 className="font-display text-sm font-bold text-[#1A3636] group-hover:text-[#40534C] transition-colors line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#40534C] font-ui line-clamp-2 leading-relaxed">
                        {item.caption}
                      </p>
                    </div>

                    <div className="pt-2 mt-2 border-t border-[#1A3636]/10 flex items-center justify-between text-[11px] font-semibold text-[#1A3636] font-ui">
                      <span className="text-[#40534C] group-hover:text-[#1A3636] transition-colors">Inspect Moment</span>
                      <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>

          {/* Section 5: Four Environments Comparison & Closing Invitation */}
          <div className="pt-8 space-y-12 border-t border-[#1A3636]/15">
            <div className="space-y-4 text-center max-w-xl mx-auto">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1A3636]">
                Every Table Tells a Story
              </h3>
              <p className="text-xs sm:text-sm text-[#40534C] font-ui leading-relaxed">
                Whether you seek front-row kitchen energy or an intimate velvet booth, our team prepares each space for your arrival.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <MagneticButton
                  onClick={() => navigate('/reservations')}
                  data-cursor="reserve"
                  className="btn-primary text-xs sm:text-sm px-7 py-3 flex items-center gap-2 shadow-md cursor-pointer"
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
            </div>
          </div>
        </div>
      </div>

      {/* Lightweight Accessible Lightbox Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FBF8F3] text-[#1A3636] rounded-3xl overflow-hidden max-w-3xl w-full border border-[#1A3636]/20 shadow-2xl flex flex-col md:flex-row relative"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close image details"
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#1A3636]/80 hover:bg-[#1A3636] text-[#FBF8F3] flex items-center justify-center transition-all cursor-pointer shadow-md"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Photo View */}
              <div className="md:w-1/2 aspect-[4/3] md:aspect-auto bg-[#E7D7C1]/30 relative flex items-center justify-center">
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#1A3636] text-[#D6BD98] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full font-ui shadow-sm">
                  {activeModalItem.category}
                </div>
              </div>

              {/* Content Panel */}
              <div className="p-6 sm:p-8 md:w-1/2 flex flex-col justify-between space-y-6">
                <div className="space-y-2.5">
                  <div className="text-xs font-semibold text-[#40534C] uppercase tracking-wider font-ui flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#1A3636]" />
                    <span>{activeModalItem.spaceName}</span>
                  </div>

                  <h3
                    id="lightbox-title"
                    className="font-display text-2xl font-bold text-[#1A3636] leading-tight"
                  >
                    {activeModalItem.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#40534C] font-ui leading-relaxed">
                    {activeModalItem.caption}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#1A3636]/10">
                  <MagneticButton
                    onClick={() => {
                      closeLightbox();
                      navigate(`/reservations?experience=${activeModalItem.spaceId}`);
                    }}
                    data-cursor="reserve"
                    className="btn-primary w-full text-xs sm:text-sm px-6 py-3.5 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Reserve in {activeModalItem.spaceName}</span>
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>

                  <button
                    type="button"
                    onClick={closeLightbox}
                    className="w-full text-center text-xs text-[#40534C] hover:text-[#1A3636] py-1 cursor-pointer font-ui transition-colors"
                  >
                    Close Window (or press ESC)
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
