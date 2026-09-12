import React from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';
import { ArrowLeft, Utensils } from 'lucide-react';

export function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 bg-[#D6BD98] text-[#1A3636]">
        <div className="w-16 h-16 rounded-full bg-[#1A3636] text-[#D6BD98] flex items-center justify-center mb-6 shadow-md">
          <Utensils className="w-7 h-7" />
        </div>

        <span className="text-xs font-mono font-bold tracking-widest text-[#40534C] uppercase">
          Error 404
        </span>

        <h1 className="hero-title text-[#1A3636] font-normal leading-[0.98] mt-2">
          Table Not <br />
          Found
        </h1>

        <p className="text-sm sm:text-base text-[#40534C] font-ui leading-relaxed mt-4 max-w-md">
          The course you're looking for doesn't seem to be on our menu. Please return to the dining room or browse our full collection.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <Link
            to="/"
            className="btn-primary text-xs sm:text-sm px-6 py-3 flex items-center gap-2 shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/menu"
            className="btn-secondary text-xs sm:text-sm px-6 py-3 font-ui"
          >
            <span>Explore Menu</span>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
