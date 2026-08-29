import React from 'react';
import { TutorProfile } from '../types';
import { X, Calendar, Star, CheckCircle2, ExternalLink } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutorProfile: TutorProfile;
  onBookTrial: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  tutorProfile,
  onBookTrial
}) => {
  if (!isOpen) return null;

  const t = {
    title: `Video Introduction: ${tutorProfile.name}`,
    subtitle: 'Get a sense of teaching style, clear accent, and friendly lesson energy',
    highlightsTitle: 'Key Highlights from the video:',
    highlights: [
      'Conversational focus with 80% student speaking time',
      'Interactive materials & structured study roadmap',
      'Proven experience in interview coaching & grammar confidence'
    ],
    bookTrialBtn: 'Book 30-min Trial Lesson',
    openPreply: 'View profile on Preply'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-gray-200 relative animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={tutorProfile.avatar}
              alt={tutorProfile.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/30"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="font-display font-bold text-[#1A1A1A] text-base">
                {t.title}
              </h3>
              <p className="text-xs text-gray-500">
                {t.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Box */}
        <div className="relative aspect-16/9 bg-black">
          <iframe
            src="https://www.youtube.com/embed/v9QcZQCGTyw?autoplay=1&mute=0"
            title="Tutor Introduction Video"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Modal Footer / Highlights */}
        <div className="p-5 sm:p-6 bg-[#FDFCFB] border-t border-gray-200 space-y-4">
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              {t.highlightsTitle}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-700">
              {t.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-1.5 bg-white p-3 rounded-2xl border border-gray-200 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <a
              href={tutorProfile.preplyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-gray-600 hover:text-gray-900 flex items-center gap-1.5"
            >
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{t.openPreply}</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={() => {
                onClose();
                onBookTrial();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.bookTrialBtn}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
