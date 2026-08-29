import React from 'react';
import { Booking, TutorProfile } from '../types';
import { createGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';
import { 
  X, 
  Calendar, 
  Video, 
  Download, 
  ExternalLink, 
  Trash2, 
  CheckCircle2, 
  Send
} from 'lucide-react';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  tutorProfile: TutorProfile;
  onCancelBooking: (bookingId: string) => void;
  onBookNew: () => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  tutorProfile,
  onCancelBooking,
  onBookNew
}) => {
  if (!isOpen) return null;

  const t = {
    title: 'My Scheduled Lessons',
    subtitle: 'Manage upcoming classes, sync with your calendar, and access Google Meet rooms',
    noBookings: 'You currently have no scheduled lessons.',
    bookFirstBtn: 'Schedule a lesson in the calendar',
    gcalBtn: 'Google Calendar',
    icsBtn: 'Download .ICS',
    joinBtn: 'Join Google Meet',
    cancelBtn: 'Cancel lesson',
    cancelConfirm: 'Are you sure you want to cancel this scheduled lesson?',
    statusConfirmed: 'Confirmed',
    statusCancelled: 'Cancelled',
    tutorContact: 'Message tutor on Telegram'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 p-6 sm:p-8 relative animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
          <div>
            <h3 className="font-display font-bold text-[#1A1A1A] text-xl flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
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

        {/* Content */}
        {bookings.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center">
              <Calendar className="w-8 h-8" />
            </div>
            <p className="text-sm font-medium text-gray-600">
              {t.noBookings}
            </p>
            <button
              onClick={() => {
                onClose();
                onBookNew();
              }}
              className="px-6 py-3 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
            >
              {t.bookFirstBtn}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-[#FDFCFB] rounded-2xl p-5 border border-gray-200 space-y-4 shadow-2xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-800 bg-blue-50 px-3 py-0.5 rounded-full mb-1.5 border border-blue-200">
                      <CheckCircle2 className="w-3 h-3 text-blue-600" />
                      {t.statusConfirmed}
                    </span>
                    <h4 className="font-display font-bold text-[#1A1A1A] text-base">
                      {booking.lessonTitle}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {booking.studentName} ({booking.studentPhoneOrTelegram})
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="font-display font-extrabold text-[#1A1A1A] text-base block">
                      {booking.time}
                    </span>
                    <span className="text-xs font-semibold text-blue-700 block">
                      {booking.date}
                    </span>
                  </div>
                </div>

                {/* Google Meet Link */}
                <div className="bg-white p-3 rounded-xl border border-gray-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-gray-700 truncate pr-2">
                    <Video className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="truncate font-mono">{booking.meetLink}</span>
                  </div>
                  <a
                    href={booking.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 shrink-0 transition-colors shadow-2xs"
                  >
                    <span>{t.joinBtn}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Integration Actions */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100 text-xs">
                  <div className="flex items-center gap-2">
                    <a
                      href={createGoogleCalendarUrl(booking, tutorProfile.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-full bg-white border border-gray-200 hover:bg-gray-100 font-medium text-gray-700 flex items-center gap-1.5 transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>{t.gcalBtn}</span>
                    </a>

                    <button
                      onClick={() => downloadIcsFile(booking, tutorProfile.name)}
                      className="px-3 py-1.5 rounded-full bg-white border border-gray-200 hover:bg-gray-100 font-medium text-gray-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-blue-600" />
                      <span>{t.icsBtn}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      if (window.confirm(t.cancelConfirm)) {
                        onCancelBooking(booking.id);
                      }
                    }}
                    className="text-xs text-rose-500 hover:text-rose-700 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{t.cancelBtn}</span>
                  </button>
                </div>

              </div>
            ))}

            <div className="pt-4 flex justify-between items-center">
              <a
                href={`https://t.me/${tutorProfile.telegramUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-gray-600 hover:text-[#1A1A1A] flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-[#229ED9]" />
                <span>{t.tutorContact}</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onBookNew();
                }}
                className="px-5 py-2 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
              >
                + Book Another
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
