import React, { useState } from 'react';
import { TutorProfile } from '../types';
import { 
  Check, 
  ShieldCheck, 
  Calendar, 
  Zap
} from 'lucide-react';

interface PricingPackagesProps {
  tutorProfile: TutorProfile;
  onBookLesson: (lessonTypeId: string) => void;
}

type Currency = 'USD' | 'EUR' | 'GBP';

export const PricingPackages: React.FC<PricingPackagesProps> = ({
  tutorProfile,
  onBookLesson
}) => {
  const [currency, setCurrency] = useState<Currency>('USD');

  // Currency multiplier & symbols
  const currencyMeta = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.79 }
  };

  const formatPrice = (usdAmount: number) => {
    const converted = Math.round(usdAmount * currencyMeta[currency].rate);
    return `${currencyMeta[currency].symbol}${converted.toLocaleString()}`;
  };

  const hourly = tutorProfile.hourlyRateUsd || 14;

  const t = {
    badge: 'TRANSPARENT PRICING & PACKAGES',
    title: 'Invest in your speaking confidence',
    subtitle: 'Choose individual lessons or bundled lesson packages with up to 20% discount.',
    trialTitle: 'Trial Diagnostic Lesson',
    trialSub: '30 minutes • Level audit + Roadmap',
    packages: [
      {
        id: 'single',
        title: 'Single Session',
        lessonsCount: 1,
        pricePerLessonUsd: hourly,
        totalPriceUsd: hourly,
        discount: null,
        popular: false,
        desc: 'Great for urgent interview prep, resume polishing, or conversational tune-up.',
        features: [
          '50 minutes of 1-on-1 speaking',
          'Structured Notion workspace materials',
          'Real-time error correction & feedback'
        ]
      },
      {
        id: 'pack5',
        title: 'Starter Pack',
        lessonsCount: 5,
        pricePerLessonUsd: Math.round(hourly * 0.92),
        totalPriceUsd: Math.round(hourly * 0.92) * 5,
        discount: '8% Savings',
        popular: false,
        desc: 'Quick sprint to eliminate fear and build structured speaking reflexes.',
        features: [
          '5 lessons of 50 minutes',
          'Personal Notion study dashboard',
          'WhatsApp & Telegram homework review',
          'Valid for 2 months'
        ]
      },
      {
        id: 'pack10',
        title: 'Fluency Accelerator',
        lessonsCount: 10,
        pricePerLessonUsd: Math.round(hourly * 0.85),
        totalPriceUsd: Math.round(hourly * 0.85) * 10,
        discount: '15% Off • Most Popular',
        popular: true,
        desc: 'Targeted prep for IELTS/TOEIC, global job interviews, or steady level upgrade.',
        features: [
          '10 lessons of 50 minutes',
          'Full mock interviews & test scoring',
          'Audio voice feedback 24/7',
          'Personalized milestone tracker',
          'Valid for 4 months'
        ]
      },
      {
        id: 'pack20',
        title: 'Complete Mastery',
        lessonsCount: 20,
        pricePerLessonUsd: Math.round(hourly * 0.78),
        totalPriceUsd: Math.round(hourly * 0.78) * 20,
        discount: '22% Off • Best Value',
        popular: false,
        desc: 'Comprehensive transformation from hesitant speaker to natural, confident fluency.',
        features: [
          '20 lessons of 50 minutes',
          'Priority calendar slot booking',
          'Bespoke Miro & Notion curriculum',
          'Unlimited teacher chat support',
          'Valid for 8 months'
        ]
      }
    ],
    bookBtn: 'Select in Calendar',
    guaranteeTitle: '100% Money-Back Guarantee',
    guaranteeText: 'If after your first trial lesson you feel the teaching approach is not 100% right for you, you receive a full refund within 24 hours with zero hassle.',
    paymentMethodsTitle: 'Accepted Payment Methods:',
    paymentMethods: 'Preply Official • International Cards (Visa / Mastercard) • Stripe • Revolut • PayPal • Crypto (USDT)'
  };

  return (
    <section id="pricing-section" className="py-16 sm:py-24 bg-[#FDFCFB] border-b border-gray-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold tracking-wider uppercase mb-3">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1A1A] tracking-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-base text-gray-600">
            {t.subtitle}
          </p>

          {/* Currency Toggle */}
          <div className="inline-flex items-center bg-white p-1 rounded-full border border-gray-200 shadow-2xs mt-6 text-xs font-bold">
            {(['USD', 'EUR', 'GBP'] as Currency[]).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  currency === curr
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-gray-600 hover:text-[#1A1A1A]'
                }`}
              >
                {curr} ({currencyMeta[curr].symbol})
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {t.packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-6 flex flex-col justify-between transition-all relative ${
                pkg.popular
                  ? 'bg-white border-2 border-blue-600 ring-4 ring-blue-500/10 shadow-lg scale-102 z-10'
                  : 'bg-white border border-gray-200 shadow-2xs hover:shadow-md'
              }`}
            >
              {pkg.discount && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-blue-600 text-white text-[11px] font-bold rounded-full uppercase tracking-wider shadow-xs whitespace-nowrap">
                  {pkg.discount}
                </div>
              )}

              <div>
                <h3 className="font-display font-bold text-[#1A1A1A] text-lg mb-1">
                  {pkg.title}
                </h3>
                <p className="text-xs text-gray-500 min-h-[36px] mb-4">
                  {pkg.desc}
                </p>

                {/* Price Display */}
                <div className="border-y border-gray-100 py-4 mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#1A1A1A]">
                      {formatPrice(pkg.totalPriceUsd)}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      / {pkg.lessonsCount} les.
                    </span>
                  </div>
                  {pkg.lessonsCount > 1 && (
                    <span className="text-xs font-semibold text-blue-700 block mt-1">
                      {formatPrice(pkg.pricePerLessonUsd)} per lesson
                    </span>
                  )}
                </div>

                {/* Features list */}
                <ul className="space-y-2.5 text-xs text-gray-700 mb-6">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                id={`btn-pricing-book-${pkg.id}`}
                onClick={() => onBookLesson('standard')}
                className={`w-full py-3 px-4 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  pkg.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20'
                    : 'bg-gray-100 hover:bg-gray-200 text-[#1A1A1A]'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{t.bookBtn}</span>
              </button>

            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-2xs flex flex-col sm:flex-row items-center gap-6 max-w-4xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="text-center sm:text-left space-y-1">
            <h4 className="font-display font-bold text-[#1A1A1A] text-base sm:text-lg">
              {t.guaranteeTitle}
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {t.guaranteeText}
            </p>
          </div>
        </div>

        {/* Payment Methods Bar */}
        <div className="text-center mt-8 text-xs text-gray-500 max-w-2xl mx-auto">
          <strong className="text-gray-700 block mb-1">{t.paymentMethodsTitle}</strong>
          <span>{t.paymentMethods}</span>
        </div>

      </div>
    </section>
  );
};
