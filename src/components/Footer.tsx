import React from 'react';
import { TutorProfile } from '../types';
import { Star, ExternalLink, Mail, Send, Phone, Award } from 'lucide-react';

interface FooterProps {
  tutorProfile: TutorProfile;
  onScrollTo: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  tutorProfile,
  onScrollTo
}) => {
  const t = {
    schedule: 'Schedule & Booking',
    reviews: 'Student Reviews',
    methodology: 'Methodology',
    levelTest: 'Level Diagnostic',
    pricing: 'Pricing & Bundles',
    faq: 'FAQ',
    preplyNote: 'Official certified English tutor on the Preply educational platform.',
    rights: 'All rights reserved.'
  };

  return (
    <footer className="bg-[#18181B] text-white border-t border-gray-800 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-gray-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={tutorProfile.avatar}
                alt={tutorProfile.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/50"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="font-display font-bold text-white text-lg block">
                  {tutorProfile.name}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-amber-400 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  5.0 Preply Super Tutor (ID: {tutorProfile.id})
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
              {t.preplyNote} {tutorProfile.title}
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={tutorProfile.preplyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <span>preply.com/tutor/{tutorProfile.id}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium text-gray-300">
              <li>
                <button
                  onClick={() => onScrollTo('calendar-section')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {t.schedule}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('reviews-section')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {t.reviews}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('methodology-section')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {t.methodology}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('quiz-section')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {t.levelTest}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('pricing-section')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {t.pricing}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('faq-section')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {t.faq}
                </button>
              </li>
            </ul>
          </div>

          {/* Certifications */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Certifications
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              {tutorProfile.certifications.map((cert, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <Award className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>{cert.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Contact
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <a
                  href={`https://t.me/${tutorProfile.telegramUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-[#229ED9]" />
                  <span>@{tutorProfile.telegramUsername}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${tutorProfile.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>{tutorProfile.whatsappNumber}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${tutorProfile.email}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  <span>{tutorProfile.email}</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} {tutorProfile.name}. {t.rights}</p>
          <p className="flex items-center gap-1">
            <span>Powered by Preply Profile {tutorProfile.id} & Cambridge English Standards</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
