import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, MapPin, Clock, Phone, Mail, Check } from 'lucide-react';

export function FooterSection() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setIsSubscribed(false), 4000);
  };

  const footerLinks = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/story', label: 'Our Story' },
    { path: '/experience', label: 'Experience' },
    { path: '/reservations', label: 'Reservations' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="relative bg-[#D6BD98] text-[#1A3636] pt-16 sm:pt-20 pb-12 border-t border-[#1A3636]/15 z-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 sm:space-y-16">
        {/* Top Row: Brand & Quick Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold tracking-tight text-[#1A3636]">
                MORROW HOUSE
              </span>
              <span className="text-xs tracking-[0.2em] font-semibold text-[#40534C] uppercase font-ui">
                SINGAPORE
              </span>
            </div>
            <p className="text-xs text-[#1A3636]/70 uppercase tracking-widest font-semibold font-ui">
              Food · Coffee · Experiences
            </p>
            <p className="text-sm text-[#40534C] font-ui leading-relaxed max-w-sm">
              An architectural culinary sanctuary combining Michelin-standard gastronomy, artisanal coffee craft, and warm hospitality in the heart of Singapore.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A3636] font-ui">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-[#40534C] font-ui">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-[#1A3636] transition-colors cursor-pointer no-underline text-inherit"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A3636] font-ui">
              Visit & Hours
            </h4>
            <div className="space-y-2 text-sm text-[#40534C] font-ui">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#1A3636] flex-shrink-0 mt-0.5" />
                <span>30 Jalan Hang Lekir, Downtown Core, Singapore 049712</span>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-[#1A3636] flex-shrink-0 mt-0.5" />
                <div>
                  <div>Mon – Fri: 8:00 AM – 10:30 PM</div>
                  <div>Sat – Sun: 8:30 AM – 11:30 PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter / Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A3636] font-ui">
              Stay Connected
            </h4>
            <p className="text-xs text-[#40534C] font-ui">
              Receive seasonal menu previews and private dining invitations.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-[#FBF8F3] border border-[#1A3636]/20 rounded-full px-4 py-2.5 text-xs text-[#1A3636] placeholder-[#40534C]/60 focus:outline-none focus:border-[#1A3636] font-ui pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 w-7 h-7 rounded-full bg-[#1A3636] text-[#D6BD98] flex items-center justify-center hover:bg-[#122424] transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {isSubscribed && (
                <div className="flex items-center gap-1.5 text-xs text-[#40534C] font-medium font-ui animate-fade-in">
                  <Check className="w-3.5 h-3.5" />
                  <span>Thank you for joining our inner circle.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 border-t border-[#1A3636]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#40534C] font-ui">
          <div>
            &copy; {new Date().getFullYear()} MORROW HOUSE SINGAPORE. All rights reserved.
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#1A3636] transition-colors flex items-center gap-1"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Instagram</span>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#1A3636] transition-colors flex items-center gap-1"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
              </svg>
              <span>Facebook</span>
            </a>
            <Link
              to="/contact"
              className="hover:text-[#1A3636] transition-colors cursor-pointer no-underline text-inherit"
            >
              Contact Desk
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
