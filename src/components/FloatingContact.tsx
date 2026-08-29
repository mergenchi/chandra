import React, { useState } from 'react';
import { TutorProfile } from '../types';
import { MessageCircle, Send, Phone, Calendar, Star, X } from 'lucide-react';

interface FloatingContactProps {
  tutorProfile: TutorProfile;
  onBookClick: () => void;
}

export const FloatingContact: React.FC<FloatingContactProps> = ({
  tutorProfile,
  onBookClick
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const t = {
    askQuestion: 'Ask tutor a quick question',
    onlineNow: 'Online • Quick replies',
    telegram: 'Telegram',
    whatsapp: 'WhatsApp',
    bookTrial: 'Pick a time in calendar',
    preplyProfile: `Preply Profile (ID: ${tutorProfile.id})`
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen ? (
        <div className="bg-white rounded-3xl p-4 shadow-2xl border border-gray-200 w-72 mb-3 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src={tutorProfile.avatar}
                  alt={tutorProfile.name}
                  className="w-9 h-9 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <h4 className="font-display font-bold text-[#1A1A1A] text-xs">{tutorProfile.name}</h4>
                <p className="text-[10px] text-blue-600 font-semibold">{t.onlineNow}</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            <a
              id="float-telegram-link"
              href={`https://t.me/${tutorProfile.telegramUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3.5 rounded-full text-xs font-bold text-white bg-[#229ED9] hover:bg-[#1e8ec3] flex items-center gap-2 transition-colors shadow-2xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t.telegram} (@{tutorProfile.telegramUsername})</span>
            </a>

            <a
              id="float-whatsapp-link"
              href={`https://wa.me/${tutorProfile.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3.5 rounded-full text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] flex items-center gap-2 transition-colors shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{t.whatsapp} ({tutorProfile.whatsappNumber})</span>
            </a>

            <button
              id="float-book-btn"
              onClick={() => {
                setIsOpen(false);
                onBookClick();
              }}
              className="w-full py-2.5 px-3.5 rounded-full text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.bookTrial}</span>
            </button>

            <a
              id="float-preply-link"
              href={tutorProfile.preplyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3.5 rounded-full text-[11px] font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Star className="w-3 3 text-amber-500 fill-amber-500" />
              <span>{t.preplyProfile}</span>
            </a>
          </div>
        </div>
      ) : null}

      {/* Floating Trigger Button */}
      <button
        id="btn-floating-contact-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-blue-600 text-white shadow-xl shadow-blue-600/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all hover:bg-blue-700 cursor-pointer relative group"
        title={t.askQuestion}
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 border-2 border-white"></span>
        </span>
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
};
