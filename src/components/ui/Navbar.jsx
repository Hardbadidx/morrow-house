import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MagneticButton } from './MagneticButton';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/story', label: 'Our Story' },
    { path: '/experience', label: 'Experience' },
    { path: '/reservations', label: 'Reservations' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FBF8F3]/95 backdrop-blur-md py-2 sm:py-2.5 shadow-[0_4px_16px_-4px_rgba(26,54,54,0.08)] border-b border-[#1A3636]/12'
            : 'bg-[#FBF8F3]/88 backdrop-blur-md py-2.5 sm:py-3 shadow-[0_2px_12px_-3px_rgba(26,54,54,0.05)] border-b border-[#1A3636]/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Logo & Location */}
          <Link
            to="/"
            className="flex items-baseline gap-2.5 text-left group cursor-pointer bg-transparent border-none p-0 text-inherit no-underline"
            aria-label="Morrow House Home"
          >
            <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#1A3636] transition-opacity group-hover:opacity-80">
              MORROW HOUSE
            </span>
            <span className="text-[10px] sm:text-xs tracking-[0.2em] font-semibold text-[#40534C] uppercase font-ui">
              SINGAPORE
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path);

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors cursor-pointer py-1 relative font-ui no-underline ${
                    isActive
                      ? 'text-[#1A3636] font-semibold'
                      : 'text-[#1A3636]/75 hover:text-[#1A3636]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1A3636] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <MagneticButton
              onClick={() => navigate('/reservations')}
              data-cursor="reserve"
              className="hidden sm:inline-flex items-center gap-2 bg-[#1A3636] text-[#D6BD98] px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide hover:bg-[#122424] transition-all hover:gap-3 cursor-pointer shadow-sm active:scale-95 font-ui"
            >
              <span>Reserve a Table</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </MagneticButton>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 rounded-full bg-[#1A3636]/10 flex lg:hidden items-center justify-center text-[#1A3636] hover:bg-[#1A3636]/15 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#1A3636] text-[#D6BD98] flex flex-col justify-between px-8 py-24 lg:hidden animate-fade-in">
          <div className="space-y-6">
            <div className="text-xs uppercase tracking-[0.25em] text-[#677D6A] font-semibold mb-6">
              Navigation
            </div>
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-left font-display text-3xl font-bold tracking-tight text-[#FBF8F3] hover:text-[#D6BD98] transition-colors cursor-pointer py-1 no-underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-5 pt-8 border-t border-[#40534C]">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('/reservations');
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#D6BD98] text-[#1A3636] py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-[#FBF8F3] transition-colors cursor-pointer"
            >
              <span>Reserve a Table</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <div className="text-xs text-[#D6BD98]/60 text-center font-ui">
              30 Jalan Hang Lekir · Singapore · hello@morrowhouse.sg
            </div>
          </div>
        </div>
      )}
    </>
  );
}
