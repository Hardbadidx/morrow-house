import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../ui/Navbar';
import { FooterSection } from '../ui/FooterSection';
import { CustomCursor } from '../ui/CustomCursor';
import { ScrollProgress } from '../ui/ScrollProgress';
import { ScrollToTop } from './ScrollToTop';
import { PageMeta } from './PageMeta';

/**
 * Layout
 * Shared shell across all pages of Morrow House.
 * Maintains consistent branding, navigation, custom cursor, and progress indicator.
 */
export function Layout() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#D6BD98] text-[#1A3636] font-ui antialiased selection:bg-[#1A3636] selection:text-[#D6BD98]">
      {/* Route change scroll reset */}
      <ScrollToTop />

      {/* Dynamic SEO Document Title */}
      <PageMeta />

      {/* Refined Desktop Custom Micro Cursor */}
      <CustomCursor />

      {/* 2px Direct DOM Scroll Progress Bar */}
      <ScrollProgress />

      {/* Main Navigation Bar */}
      <Navbar />

      {/* Main Page Routed View */}
      <main className="relative z-10 flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Global Hospitality Footer */}
      <FooterSection />
    </div>
  );
}
