import React, { useState, useMemo } from 'react';
import { Review } from '../types';
import { 
  Star, 
  CheckCircle2, 
  MessageSquarePlus, 
  ExternalLink
} from 'lucide-react';

interface ReviewsSectionProps {
  reviews: Review[];
  onOpenWriteReview: () => void;
  preplyUrl: string;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onOpenWriteReview,
  preplyUrl
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'speaking' | 'ielts' | 'career' | 'beginner'>('all');

  const t = {
    badge: 'REAL RESULTS & VERIFIED REVIEWS',
    title: 'What students achieve in our lessons',
    subtitle: 'Over 48 verified 5-star reviews on the official Preply platform',
    all: 'All Reviews',
    career: '💼 Global Career & Interviews',
    ielts: '🎯 IELTS & Exam Prep',
    speaking: '🗣️ Fluency & Confidence',
    beginner: '🚀 Beginners & Grammar',
    verifiedPreply: 'Verified Preply Student',
    writeReviewBtn: 'Write a Review',
    viewAllPreply: 'View all reviews on Preply',
    ratingBreakdownTitle: '5.0 / 5.0 Rating on Preply',
    ratingBreakdownDesc: '100% of students recommend Chandra to colleagues and friends'
  };

  const filteredReviews = useMemo(() => {
    if (selectedFilter === 'all') return reviews;
    return reviews.filter(r => r.tag === selectedFilter);
  }, [reviews, selectedFilter]);

  return (
    <section id="reviews-section" className="py-16 sm:py-24 bg-[#FDFCFB] border-b border-gray-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold tracking-wider uppercase mb-3">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1A1A] tracking-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-base text-gray-600">
            {t.subtitle}
          </p>
        </div>

        {/* Rating Summary Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Big Score Box */}
            <div className="md:col-span-4 text-center md:border-r md:border-gray-200 md:pr-6">
              <span className="font-display font-extrabold text-5xl sm:text-6xl text-[#1A1A1A] block">
                5.0
              </span>
              <div className="flex items-center justify-center gap-1 mt-2 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2 font-medium">
                {reviews.length}+ verified reviews
              </p>
            </div>

            {/* Bars & Trust Notes */}
            <div className="md:col-span-8 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-gray-800">
                <span>{t.ratingBreakdownTitle}</span>
                <span className="text-blue-600">100% positive</span>
              </div>

              {/* Progress bars */}
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="w-16 text-[11px] font-medium text-gray-500">5 stars</span>
                  <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full w-[100%]" />
                  </div>
                  <span className="w-8 text-right text-[11px] font-bold text-gray-700">100%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-16 text-[11px] font-medium text-gray-500">4 stars</span>
                  <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full w-[0%]" />
                  </div>
                  <span className="w-8 text-right text-[11px] font-bold text-gray-700">0%</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-gray-500">
                  {t.ratingBreakdownDesc}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    id="btn-open-write-review"
                    onClick={onOpenWriteReview}
                    className="px-3.5 py-1.5 rounded-full text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquarePlus className="w-3.5 h-3.5 text-gray-600" />
                    <span>{t.writeReviewBtn}</span>
                  </button>

                  <a
                    href={preplyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-full text-xs font-bold text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors flex items-center gap-1.5"
                  >
                    <span>Preply</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'all', label: t.all },
            { id: 'career', label: t.career },
            { id: 'ielts', label: t.ielts },
            { id: 'speaking', label: t.speaking },
            { id: 'beginner', label: t.beginner }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === f.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-gray-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Result Badge */}
                {rev.resultBadge && (
                  <div className="mb-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold">
                    <span>{rev.resultBadge}</span>
                  </div>
                )}

                {/* Stars and verified badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {rev.verifiedPreply && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-600 bg-gray-50 px-2.5 py-0.5 rounded-full border border-gray-200">
                      <CheckCircle2 className="w-3 h-3 text-blue-600" />
                      <span>{t.verifiedPreply}</span>
                    </span>
                  )}
                </div>

                {/* Goal Tag */}
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  {rev.goal}
                </p>

                {/* Review Text */}
                <p className="text-sm text-gray-700 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-gray-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#1A1A1A]">{rev.author}</h4>
                    <p className="text-[11px] text-gray-500">{rev.country}</p>
                  </div>
                </div>
                <span className="text-[11px] text-gray-400">{rev.date}</span>
              </div>

            </div>
          ))}
        </div>

        {/* View on Preply Footer Link */}
        <div className="text-center mt-12">
          <a
            id="reviews-preply-cta"
            href={preplyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-gray-800 bg-white hover:bg-gray-50 border border-gray-200 shadow-2xs transition-colors"
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{t.viewAllPreply}</span>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </a>
        </div>

      </div>
    </section>
  );
};
