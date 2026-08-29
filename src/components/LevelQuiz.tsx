import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { DEFAULT_QUIZ_QUESTIONS } from '../data/defaultTutorData';
import { 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Calendar, 
  Gift, 
  Zap,
  Award
} from 'lucide-react';

interface LevelQuizProps {
  onApplyPromoAndBook: (promoCode: string, level: string, goal: string) => void;
}

export const LevelQuiz: React.FC<LevelQuizProps> = ({ onApplyPromoAndBook }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = DEFAULT_QUIZ_QUESTIONS;
  const currentQ = questions[currentQuestionIdx];

  const handleSelectAnswer = (answerIdx: number) => {
    const updated = [...selectedAnswers, answerIdx];
    setSelectedAnswers(updated);

    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setSelectedAnswers([]);
    setCurrentQuestionIdx(0);
    setIsCompleted(false);
  };

  // Compute result profile
  const resultProfile = React.useMemo(() => {
    if (!isCompleted) return null;

    let scoreSum = 0;
    selectedAnswers.forEach((ansIdx, qIdx) => {
      const q = questions[qIdx];
      if (q && q.answers[ansIdx]) {
        scoreSum += q.answers[ansIdx].levelScore;
      }
    });

    if (scoreSum <= 4) {
      return {
        level: 'A1 - A2 (Elementary / Pre-Intermediate)',
        focus: 'Building fundamental grammar & erasing the fear of making mistakes with conversational drills.',
        timeframe: '2-3 months to comfortable travel English & everyday dialogues',
        promo: 'BOOST15'
      };
    } else if (scoreSum <= 7) {
      return {
        level: 'B1 - B2 (Intermediate - Upper Intermediate)',
        focus: 'Fluency coaching, thinking directly in English without mental translation, and active workplace vocabulary.',
        timeframe: '2 months to fluent business meetings & spontaneous discussions',
        promo: 'FLUENCY15'
      };
    } else {
      return {
        level: 'B2+ - C1 (Advanced & Exam Mastery)',
        focus: 'Idiomatic natural phrasing, IELTS 7.5+ band strategies, and FAANG tech interview coaching.',
        timeframe: '1-2 months intensive sprint to job offer or target band score',
        promo: 'PRO15'
      };
    }
  }, [isCompleted, selectedAnswers, questions]);

  const t = {
    badge: 'FREE 2-MIN DIAGNOSTIC',
    title: 'Check your level & get a custom roadmap',
    subtitle: 'Answer 3 quick questions to receive a personal study strategy and an exclusive 15% discount for your trial lesson.',
    questionProgress: `Question ${currentQuestionIdx + 1} of ${questions.length}`,
    resultTitle: 'Your Personal Learning Roadmap is Ready!',
    estimatedLevel: 'Estimated Level:',
    keyFocus: 'Strategic Focus:',
    targetTimeline: 'Timeline to Target Goal:',
    specialBonus: 'Your exclusive 15% discount code:',
    bookWithPromoBtn: 'Book Trial Lesson with 15% Off',
    retakeBtn: 'Retake Quiz'
  };

  return (
    <section id="quiz-section" className="py-16 sm:py-24 bg-[#FDFCFB] border-b border-gray-200 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1A1A] tracking-tight">
            {t.title}
          </h2>
          <p className="mt-2.5 text-base text-gray-600">
            {t.subtitle}
          </p>
        </div>

        {/* Quiz Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm relative overflow-hidden">
          
          {!isCompleted ? (
            <div className="space-y-6 animate-in fade-in">
              
              {/* Progress bar */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-2">
                  <span>{t.questionProgress}</span>
                  <span className="text-blue-600">{Math.round(((currentQuestionIdx + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="pt-2">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1A1A1A] leading-snug">
                  {currentQ.question}
                </h3>
              </div>

              {/* Answer options */}
              <div className="space-y-3 pt-2">
                {currentQ.answers.map((ans, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    className="w-full text-left p-4 sm:p-5 rounded-2xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50/40 transition-all flex items-center justify-between group cursor-pointer shadow-2xs hover:shadow-xs"
                  >
                    <span className="text-sm sm:text-base font-medium text-[#1A1A1A] group-hover:text-blue-950 pr-4">
                      {ans.text}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-blue-600 group-hover:text-white text-gray-400 flex items-center justify-center shrink-0 transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>

            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 mx-auto flex items-center justify-center shadow-xs border border-blue-200">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1A1A1A]">
                  {t.resultTitle}
                </h3>
              </div>

              {resultProfile && (
                <div className="bg-[#FDFCFB] p-6 rounded-3xl border border-gray-200 text-left space-y-4 text-sm">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                      {t.estimatedLevel}
                    </span>
                    <strong className="text-blue-800 font-display font-bold text-lg block">
                      {resultProfile.level}
                    </strong>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                      {t.keyFocus}
                    </span>
                    <p className="text-gray-700 font-medium">
                      {resultProfile.focus}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                      {t.targetTimeline}
                    </span>
                    <p className="text-gray-700 font-medium flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-blue-600" />
                      <span>{resultProfile.timeframe}</span>
                    </p>
                  </div>

                  {/* Promo Box */}
                  <div className="pt-2 border-t border-gray-200">
                    <span className="text-xs font-bold text-gray-500 block mb-1.5">
                      {t.specialBonus}
                    </span>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-900 font-mono font-bold text-base border border-blue-200">
                      <Gift className="w-4 h-4 text-blue-600" />
                      <span>{resultProfile.promo} (-15%)</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  id="quiz-apply-btn"
                  onClick={() => {
                    if (resultProfile) {
                      onApplyPromoAndBook(
                        resultProfile.promo,
                        resultProfile.level,
                        resultProfile.focus
                      );
                    }
                  }}
                  className="flex-1 py-4 px-6 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.bookWithPromoBtn}</span>
                </button>

                <button
                  onClick={handleReset}
                  className="py-3 px-5 rounded-full text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.retakeBtn}</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
};
