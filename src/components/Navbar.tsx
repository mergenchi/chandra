import React, { useState } from 'react';
import { TutorProfile, Booking } from '../types';
import { 
  Calendar, 
  Star, 
  BookOpen, 
  Sparkles, 
  ExternalLink,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  tutorProfile: TutorProfile;
  bookings: Booking[];
  onOpenBookings: () => void;
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  tutorProfile,
  bookings,
  onOpenBookings,
  onScrollTo
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = {
    schedule: 'Schedule & Booking',
    reviews: 'Reviews (48+)',
    methodology: 'Methodology',
    levelTest: 'Level Test',
    pricing: 'Pricing & Packages',
    faq: 'FAQ',
    myBookings: 'My Lessons',
    bookTrial: 'Book Lesson',
    preplyProfile: 'Preply Profile'
  };

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onScrollTo(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDFCFB]/95 backdrop-blur-md border-b border-gray-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Tutor Brand */}
          <div 
            id="nav-brand"
            className="flex items-center gap-3.5 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative">
              <img 
                src={tutorProfile.avatar} 
                alt={tutorProfile.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/30 group-hover:ring-blue-500 transition-all shadow-2xs"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-blue-600 border-2 border-white rounded-full" title="Online / Available" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-[#1A1A1A] text-lg tracking-tight group-hover:text-blue-600 transition-colors">
                  {tutorProfile.name}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  5.0 Preply Super Tutor
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium">
                TEFL Certified • 3,450+ lessons taught
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-gray-600">
            <button 
              id="nav-link-calendar"
              onClick={() => handleNavClick('calendar-section')}
              className="px-3.5 py-2 rounded-full hover:text-blue-600 hover:bg-blue-50/70 transition-colors cursor-pointer"
            >
              {t.schedule}
            </button>
            <button 
              id="nav-link-reviews"
              onClick={() => handleNavClick('reviews-section')}
              className="px-3.5 py-2 rounded-full hover:text-blue-600 hover:bg-blue-50/70 transition-colors cursor-pointer"
            >
              {t.reviews}
            </button>
            <button 
              id="nav-link-methodology"
              onClick={() => handleNavClick('methodology-section')}
              className="px-3.5 py-2 rounded-full hover:text-blue-600 hover:bg-blue-50/70 transition-colors cursor-pointer"
            >
              {t.methodology}
            </button>
            <button 
              id="nav-link-quiz"
              onClick={() => handleNavClick('quiz-section')}
              className="px-3.5 py-2 rounded-full hover:text-blue-700 hover:bg-blue-50/80 transition-colors flex items-center gap-1 text-amber-700 font-semibold cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {t.levelTest}
            </button>
            <button 
              id="nav-link-pricing"
              onClick={() => handleNavClick('pricing-section')}
              className="px-3.5 py-2 rounded-full hover:text-blue-600 hover:bg-blue-50/70 transition-colors cursor-pointer"
            >
              {t.pricing}
            </button>
            <button 
              id="nav-link-faq"
              onClick={() => handleNavClick('faq-section')}
              className="px-3.5 py-2 rounded-full hover:text-blue-600 hover:bg-blue-50/70 transition-colors cursor-pointer"
            >
              {t.faq}
            </button>
          </nav>

          {/* Actions & Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* My Bookings Button */}
            {bookings.length > 0 && (
              <button
                id="btn-my-bookings"
                onClick={onOpenBookings}
                className="relative inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-gray-700 bg-blue-50/80 hover:bg-blue-100 border border-blue-200/80 rounded-full transition-colors cursor-pointer"
                title={t.myBookings}
              >
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>{t.myBookings}</span>
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                  {bookings.length}
                </span>
              </button>
            )}

            {/* Preply Profile link */}
            <a
              id="btn-preply-external"
              href={tutorProfile.preplyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-semibold text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-full transition-colors"
              title="Official Preply Profile"
            >
              <span>Preply Profile</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Primary Action Button */}
            <button
              id="btn-nav-book-trial"
              onClick={() => handleNavClick('calendar-section')}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-sm shadow-blue-600/25 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.bookTrial}</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              id="btn-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-200 py-4 px-2 space-y-2 bg-[#FDFCFB] animate-in fade-in">
            <button 
              onClick={() => handleNavClick('calendar-section')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 flex items-center justify-between"
            >
              <span>{t.schedule}</span>
              <Calendar className="w-4 h-4 text-blue-600" />
            </button>
            <button 
              onClick={() => handleNavClick('reviews-section')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 flex items-center justify-between"
            >
              <span>{t.reviews}</span>
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            </button>
            <button 
              onClick={() => handleNavClick('methodology-section')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 flex items-center justify-between"
            >
              <span>{t.methodology}</span>
              <BookOpen className="w-4 h-4 text-gray-500" />
            </button>
            <button 
              onClick={() => handleNavClick('quiz-section')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 flex items-center justify-between"
            >
              <span>{t.levelTest}</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </button>
            <button 
              onClick={() => handleNavClick('pricing-section')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50"
            >
              {t.pricing}
            </button>
            <button 
              onClick={() => handleNavClick('faq-section')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50"
            >
              {t.faq}
            </button>

            <div className="pt-2 border-t border-gray-200 flex flex-col gap-2">
              {bookings.length > 0 && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBookings();
                  }}
                  className="w-full py-2.5 px-3.5 rounded-xl text-xs font-semibold text-gray-800 bg-blue-50 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    {t.myBookings}
                  </span>
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                    {bookings.length}
                  </span>
                </button>
              )}

              <button
                onClick={() => handleNavClick('calendar-section')}
                className="w-full py-3 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2 shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                {t.bookTrial}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
