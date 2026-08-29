import React, { useState, useEffect } from 'react';
import { 
  TutorProfile, 
  Review, 
  Booking 
} from './types';
import { 
  DEFAULT_TUTOR_PROFILE, 
  DEFAULT_REVIEWS 
} from './data/defaultTutorData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBar } from './components/StatsBar';
import { CalendarBooking } from './components/CalendarBooking';
import { ReviewsSection } from './components/ReviewsSection';
import { Methodology } from './components/Methodology';
import { LevelQuiz } from './components/LevelQuiz';
import { PricingPackages } from './components/PricingPackages';
import { FaqSection } from './components/FaqSection';
import { VideoModal } from './components/VideoModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { WriteReviewModal } from './components/WriteReviewModal';
import { FloatingContact } from './components/FloatingContact';
import { Footer } from './components/Footer';

export default function App() {
  // Tutor profile
  const tutorProfile: TutorProfile = DEFAULT_TUTOR_PROFILE;

  // Reviews (persisted)
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('tutor_reviews_5832494');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]?.author === 'Kenji Takahashi') {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return DEFAULT_REVIEWS;
  });

  // Active bookings (persisted)
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('tutor_bookings_5832494');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [];
  });

  // Preselected lesson type for calendar
  const [preselectedLessonTypeId, setPreselectedLessonTypeId] = useState<string>('trial');

  // Modal open states
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);
  const [isWriteReviewModalOpen, setIsWriteReviewModalOpen] = useState(false);

  // Success toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save to LocalStorage effects
  useEffect(() => {
    try {
      localStorage.setItem('tutor_reviews_5832494', JSON.stringify(reviews));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('tutor_bookings_5832494', JSON.stringify(bookings));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [bookings]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBookingComplete = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    showToast(`Lesson scheduled for ${newBooking.date} at ${newBooking.time}!`);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    showToast('Lesson booking cancelled');
  };

  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
    showToast('Thank you! Your review has been published!');
  };

  const handleApplyPromoAndBook = (promoCode: string, level: string, goal: string) => {
    setPreselectedLessonTypeId('trial');
    scrollToSection('calendar-section');
    showToast(`Promo code ${promoCode} applied! Select your slot in calendar`);
  };

  const handleBookLessonType = (lessonTypeId: string) => {
    setPreselectedLessonTypeId(lessonTypeId);
    scrollToSection('calendar-section');
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#1A1A1A] text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-2 animate-in slide-in-from-top-4 duration-300">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        tutorProfile={tutorProfile}
        bookings={bookings}
        onOpenBookings={() => setIsBookingsModalOpen(true)}
        onScrollTo={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Presentation */}
        <Hero
          tutorProfile={tutorProfile}
          onBookClick={() => scrollToSection('calendar-section')}
          onWatchVideo={() => setIsVideoModalOpen(true)}
          onOpenQuiz={() => scrollToSection('quiz-section')}
        />

        {/* 2. Key Metrics Bar */}
        <StatsBar
          tutorProfile={tutorProfile}
        />

        {/* 3. Interactive Calendar & Booking Integration */}
        <CalendarBooking
          tutorProfile={tutorProfile}
          onBookingComplete={handleBookingComplete}
          preselectedLessonTypeId={preselectedLessonTypeId}
        />

        {/* 4. Student Reviews from Preply */}
        <ReviewsSection
          reviews={reviews}
          onOpenWriteReview={() => setIsWriteReviewModalOpen(true)}
          preplyUrl={tutorProfile.preplyUrl}
        />

        {/* 5. Teaching Methodology & Comparison */}
        <Methodology
          onBookClick={() => scrollToSection('calendar-section')}
        />

        {/* 6. Level & Goals Diagnostic Quiz */}
        <LevelQuiz
          onApplyPromoAndBook={handleApplyPromoAndBook}
        />

        {/* 7. Pricing & Packages */}
        <PricingPackages
          tutorProfile={tutorProfile}
          onBookLesson={handleBookLessonType}
        />

        {/* 8. FAQ */}
        <FaqSection
          tutorProfile={tutorProfile}
        />
      </main>

      {/* Footer */}
      <Footer
        tutorProfile={tutorProfile}
        onScrollTo={scrollToSection}
      />

      {/* Floating Messenger / Contact Widget */}
      <FloatingContact
        tutorProfile={tutorProfile}
        onBookClick={() => scrollToSection('calendar-section')}
      />

      {/* MODALS */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        tutorProfile={tutorProfile}
        onBookTrial={() => scrollToSection('calendar-section')}
      />

      <MyBookingsModal
        isOpen={isBookingsModalOpen}
        onClose={() => setIsBookingsModalOpen(false)}
        bookings={bookings}
        tutorProfile={tutorProfile}
        onCancelBooking={handleCancelBooking}
        onBookNew={() => scrollToSection('calendar-section')}
      />

      <WriteReviewModal
        isOpen={isWriteReviewModalOpen}
        onClose={() => setIsWriteReviewModalOpen(false)}
        onAddReview={handleAddReview}
      />

    </div>
  );
}
