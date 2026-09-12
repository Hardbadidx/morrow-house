import React from 'react';
import { HeroSection } from '../components/ui/HeroSection';
import { CategoriesSection } from '../components/ui/CategoriesSection';
import { SignatureSection } from '../components/ui/SignatureSection';
import { OurSpaceSection } from '../components/ui/OurSpaceSection';
import { StorySection } from '../components/ui/StorySection';
import { ReservationSection } from '../components/ui/ReservationSection';
import { PageTransition } from '../components/layout/PageTransition';

/**
 * Home Page
 * Preserves 100% of approved Phase 1 interactive hero, iced coffee showcase,
 * scroll velocity momentum, parallax, and section choreography.
 */
export function Home() {
  return (
    <PageTransition>
      <HeroSection />
      <CategoriesSection />
      <SignatureSection />
      <OurSpaceSection />
      <StorySection />
      <ReservationSection />
    </PageTransition>
  );
}
