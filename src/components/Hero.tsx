import React from 'react';
import { TutorProfile } from '../types';
import { 
  Star, 
  Play, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Award, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface HeroProps {
  tutorProfile: TutorProfile;
  onBookClick: () => void;
  onWatchVideo: () => void;
  onOpenQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  tutorProfile,
  onBookClick,
  onWatchVideo,
  onOpenQuiz
}) => {
  const t = {
    badge: 'TOP PREPLY ENGLISH TUTOR (PHILIPPINES)',
    headlineStart: 'Master English with confidence for ',
    headlineAccent: 'career, global jobs & natural fluency',
    subhead: tutorProfile.title,
    bookCta: 'Choose Date & Book Lesson',
    trialSubtext: '30-min trial diagnostic • Custom study plan included',
    watchVideo: 'Watch Video Intro (1.5 min)',
    quizCta: 'Take 2-min Level Test & Get Plan',
    guarantee: '100% money-back guarantee if not satisfied',
    responseTime: 'Replies within 15 minutes',
    features: [
      '80% student speaking time',
      'Personal Notion workspace',
      'Global job & IELTS 7.5+ coaching'
    ],
    preplyVerified: 'Verified Preply Tutor Profile'
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-[#FDFCFB] border-b border-gray-200/80">
      {/* Background Subtle Geometric Mesh / Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-bold tracking-wide uppercase shadow-2xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span>{t.badge}</span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1 font-semibold text-gray-700">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                {tutorProfile.rating.toFixed(1)} ({tutorProfile.totalReviews} reviews)
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold text-[#1A1A1A] tracking-tight leading-[1.15]">
              {t.headlineStart}
              <span className="text-blue-600 inline-block">
                {t.headlineAccent}
              </span>
            </h1>

            {/* Subhead / Pitch */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              {t.subhead}
            </p>

            {/* Micro Feature Bullets */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-3 text-xs sm:text-sm font-medium text-gray-700">
              {t.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                id="hero-btn-book"
                onClick={onBookClick}
                className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 transition-all shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>{t.bookCta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-btn-quiz"
                onClick={onOpenQuiz}
                className="w-full sm:w-auto px-6 py-4 rounded-full text-sm font-bold text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{t.quizCta}</span>
              </button>
            </div>

            {/* Response Time and Guarantee */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-gray-500 font-medium pt-1">
              <span className="flex items-center gap-1 text-gray-600">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                {t.responseTime}
              </span>
              <span className="hidden sm:inline text-gray-300">•</span>
              <span className="flex items-center gap-1 text-gray-600">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                {t.guarantee}
              </span>
            </div>

          </div>

          {/* Right Column: Tutor Card with Video Preview & Live Stats */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-white rounded-3xl p-5 shadow-xl shadow-gray-200/60 border border-gray-200">
              
              {/* Image / Video Preview Container */}
              <div 
                id="hero-video-trigger"
                onClick={onWatchVideo}
                className="relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-900 group cursor-pointer shadow-inner"
              >
                <img 
                  src={tutorProfile.videoThumbnail} 
                  alt={tutorProfile.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-80"
                  referrerPolicy="no-referrer"
                />

                {/* Video Play Button Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/25 group-hover:bg-black/35 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-blue-500 transition-all">
                    <Play className="w-6 h-6 fill-white translate-x-0.5" />
                  </div>
                  <span className="mt-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-xs text-white text-xs font-semibold tracking-wide">
                    {t.watchVideo}
                  </span>
                </div>

                {/* Top Badge on Video */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-bold text-gray-800 flex items-center gap-1 shadow-2xs border border-gray-100">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>TEFL Certified (120h)</span>
                </div>
              </div>

              {/* Tutor Info Summary Bar */}
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-[#1A1A1A] text-lg">
                      {tutorProfile.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {tutorProfile.country} • {tutorProfile.experienceYears} years experience
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 block">Trial lesson</span>
                    <span className="font-display font-extrabold text-xl text-blue-600">
                      ${tutorProfile.trialPriceUsd}
                    </span>
                    <span className="text-xs text-gray-400"> / 30m</span>
                  </div>
                </div>

                {/* Language Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tutorProfile.languagesSpoken.map((lang, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-gray-100/80 text-gray-700 border border-gray-200">
                      {lang.language}: <strong className="text-gray-900">{lang.level}</strong>
                    </span>
                  ))}
                </div>

                {/* Preply Direct Link Button */}
                <a
                  id="hero-preply-profile-link"
                  href={tutorProfile.preplyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-full text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-blue-50 hover:text-blue-700 border border-gray-200 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{t.preplyVerified} (ID: {tutorProfile.id})</span>
                </a>
              </div>

            </div>

            {/* Floating Trust Pill */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white p-3.5 rounded-2xl shadow-lg border border-gray-200 items-center gap-3 animate-bounce-subtle">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold font-display text-sm border border-blue-100">
                5.0★
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#1A1A1A]">48 5-star reviews on Preply</p>
                <p className="text-gray-500">100% verified students worldwide</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
