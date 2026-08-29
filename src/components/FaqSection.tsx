import React, { useState } from 'react';
import { TutorProfile } from '../types';
import { FAQS } from '../data/defaultTutorData';
import { 
  HelpCircle, 
  ChevronDown, 
  Send, 
  Phone 
} from 'lucide-react';

interface FaqSectionProps {
  tutorProfile: TutorProfile;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ tutorProfile }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const t = {
    badge: 'FREQUENTLY ASKED QUESTIONS',
    title: 'Everything you need to know before starting',
    subtitle: 'Honest answers to the most common questions from prospective learners.',
    stillQuestionsTitle: 'Have a specific request or question?',
    stillQuestionsSub: 'Send me a direct message on Telegram or WhatsApp — I will reply quickly.',
    telegramBtn: 'Chat on Telegram',
    whatsappBtn: 'Chat on WhatsApp'
  };

  return (
    <section id="faq-section" className="py-16 sm:py-24 bg-white border-b border-gray-200 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold tracking-wider uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1A1A] tracking-tight">
            {t.title}
          </h2>
          <p className="mt-2.5 text-base text-gray-600">
            {t.subtitle}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3.5 mb-12">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            const question = faq.question;
            const answer = faq.answer;

            return (
              <div
                key={idx}
                className="bg-[#FDFCFB] rounded-2xl border border-gray-200 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-display font-bold text-[#1A1A1A] text-base flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-100/70 transition-colors"
                >
                  <span>{question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-200/60 pt-3 animate-in fade-in">
                    <p>{answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Contact Callout */}
        <div className="bg-[#18181B] text-white rounded-3xl p-6 sm:p-8 text-center space-y-4 border border-gray-800 shadow-lg">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
            {t.stillQuestionsTitle}
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto">
            {t.stillQuestionsSub}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              id="faq-telegram-btn"
              href={`https://t.me/${tutorProfile.telegramUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold text-white bg-[#229ED9] hover:bg-[#1e8ec3] flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span>{t.telegramBtn} (@{tutorProfile.telegramUsername})</span>
            </a>

            <a
              id="faq-whatsapp-btn"
              href={`https://wa.me/${tutorProfile.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <Phone className="w-4 h-4" />
              <span>{t.whatsappBtn} ({tutorProfile.whatsappNumber})</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
