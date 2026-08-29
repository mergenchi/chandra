import React, { useState } from 'react';
import { Review } from '../types';
import { X, Star, MessageSquarePlus } from 'lucide-react';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReview: (review: Review) => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  onAddReview
}) => {
  const [author, setAuthor] = useState('');
  const [country, setCountry] = useState('');
  const [rating, setRating] = useState(5);
  const [goal, setGoal] = useState('Conversational Fluency & Confidence');
  const [tag, setTag] = useState<'speaking' | 'ielts' | 'career' | 'beginner'>('speaking');
  const [resultBadge, setResultBadge] = useState('');
  const [text, setText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;

    const newRev: Review = {
      id: 'rev-user-' + Date.now(),
      author: author.trim(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(author.trim())}`,
      country: country.trim() || 'Student',
      countryCode: 'UN',
      rating,
      date: 'Just now',
      goal,
      tag,
      resultBadge: resultBadge.trim() ? resultBadge.trim() : undefined,
      verifiedPreply: true,
      text: text.trim()
    };

    onAddReview(newRev);
    onClose();
  };

  const t = {
    title: 'Write a Student Review',
    subtitle: 'Share your feedback and learning milestones with future students',
    nameLabel: 'Your name *',
    namePlaceholder: 'e.g. Sarah Jenkins',
    countryLabel: 'Location / Country',
    countryPlaceholder: 'e.g. Germany (Berlin)',
    ratingLabel: 'Lesson Rating:',
    tagLabel: 'Topic Category:',
    resultBadgeLabel: 'Key result or milestone (optional):',
    resultBadgePlaceholder: 'e.g. Scored 8.0 on IELTS or Passed Interview',
    textLabel: 'Your review text *',
    textPlaceholder: 'Describe your experience, teaching style highlights, and progress made...',
    submitBtn: 'Submit Review',
    cancelBtn: 'Cancel'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
          <div>
            <h3 className="font-display font-bold text-[#1A1A1A] text-xl flex items-center gap-2">
              <MessageSquarePlus className="w-5 h-5 text-blue-600" />
              <span>{t.title}</span>
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {t.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                {t.nameLabel}
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#FDFCFB] text-sm focus:outline-blue-600 text-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                {t.countryLabel}
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder={t.countryPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#FDFCFB] text-sm focus:outline-blue-600 text-[#1A1A1A]"
              />
            </div>
          </div>

          {/* Rating Stars Selection */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
              {t.ratingLabel}
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-xs font-bold text-gray-700">{rating} / 5</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                {t.tagLabel}
              </label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#FDFCFB] text-sm focus:outline-blue-600 text-[#1A1A1A]"
              >
                <option value="speaking">Fluency & Speaking</option>
                <option value="career">IT & Job Interviews</option>
                <option value="ielts">IELTS & Exams</option>
                <option value="beginner">Beginner from scratch</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                {t.resultBadgeLabel}
              </label>
              <input
                type="text"
                value={resultBadge}
                onChange={(e) => setResultBadge(e.target.value)}
                placeholder={t.resultBadgePlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#FDFCFB] text-sm focus:outline-blue-600 text-[#1A1A1A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
              {t.textLabel}
            </label>
            <textarea
              required
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t.textPlaceholder}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FDFCFB] text-sm focus:outline-blue-600 text-[#1A1A1A] resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {t.cancelBtn}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 transition-all shadow-xs cursor-pointer"
            >
              {t.submitBtn}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
