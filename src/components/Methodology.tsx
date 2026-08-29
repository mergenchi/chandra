import React from 'react';
import { 
  BookOpen, 
  Mic, 
  Layers, 
  Sparkles, 
  Check, 
  X,
  Brain,
  MessageSquare
} from 'lucide-react';

interface MethodologyProps {
  onBookClick: () => void;
}

export const Methodology: React.FC<MethodologyProps> = ({ onBookClick }) => {
  const t = {
    badge: 'TEACHING METHODOLOGY',
    title: 'How we reach your goals without robotic drills',
    subtitle: 'Communicative TEFL approach tailored for busy professionals, career milestones, and spontaneous speaking.',
    pillars: [
      {
        title: '80% Student Talk Time (STT)',
        desc: 'No teacher monologues. You speak for 80% of every lesson while I guide, clarify grammar in context, and refine your phrasing.',
        icon: MessageSquare
      },
      {
        title: 'Dedicated Notion Dashboard',
        desc: 'Your private digital hub featuring curated vocabulary, grammar cheat sheets, lesson transcripts, and audio snippets.',
        icon: Layers
      },
      {
        title: 'Spaced Repetition (Anki / Quizlet)',
        desc: 'Words stick forever: we feed high-frequency phrases into scientifically proven spaced repetition flashcard decks.',
        icon: Brain
      },
      {
        title: 'Voice Notes & Continuous Support',
        desc: 'Send quick pronunciation voice notes on Telegram/WhatsApp between lessons for ongoing momentum.',
        icon: Mic
      }
    ],
    comparisonTitle: 'Why private coaching delivers 4x faster results',
    comparisonUs: '1-on-1 Lessons with Chandra',
    comparisonThem: 'Traditional Group Schools / Generic Tutors',
    comparisonRows: [
      { feature: 'Student Speaking Time', us: '80% of every single lesson (1-on-1 focus)', them: '10-15 minutes shared across 10 students' },
      { feature: 'Custom Roadmap', us: '100% tailored to your job, IELTS or personal goals', them: 'Rigid textbook followed page by page' },
      { feature: 'Between-Lesson Support', us: 'Continuous audio feedback in Telegram / WhatsApp', them: 'No interaction until next scheduled class' },
      { feature: 'Scheduling Flexibility', us: 'Live online calendar & free 12h rescheduling', them: 'Forfeited lessons with rigid group schedules' },
      { feature: 'Risk Guarantee', us: '100% money-back guarantee on trial', them: 'Upfront lock-in contract for 6-12 months' }
    ],
    bookCta: 'Experience the methodology in a trial lesson'
  };

  return (
    <section id="methodology-section" className="py-16 sm:py-24 bg-white border-b border-gray-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold tracking-wider uppercase mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1A1A] tracking-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-base text-gray-600">
            {t.subtitle}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {t.pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="bg-[#FDFCFB] rounded-3xl p-6 border border-gray-200 hover:border-blue-300 hover:bg-white transition-all shadow-2xs hover:shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-100/70 text-blue-600 flex items-center justify-center mb-4 border border-blue-200/50">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-[#1A1A1A] text-base mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="bg-[#18181B] text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden border border-gray-800">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              {t.comparisonTitle}
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400">
                  <th className="pb-4 font-semibold w-1/3">Feature</th>
                  <th className="pb-4 font-bold text-blue-400 w-1/3">
                    <span className="inline-flex items-center gap-1.5 bg-blue-950/80 border border-blue-800 px-3.5 py-1 rounded-full">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      {t.comparisonUs}
                    </span>
                  </th>
                  <th className="pb-4 font-medium text-gray-400 w-1/3">
                    {t.comparisonThem}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {t.comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-800/40 transition-colors">
                    <td className="py-4 font-medium text-gray-300 pr-4">
                      {row.feature}
                    </td>
                    <td className="py-4 font-semibold text-blue-300 pr-4">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span>{row.us}</span>
                      </div>
                    </td>
                    <td className="py-4 text-gray-400">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span>{row.them}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <button
              id="methodology-cta-btn"
              onClick={onBookClick}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 transition-all shadow-md shadow-blue-600/25 cursor-pointer"
            >
              <span>{t.bookCta}</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
