import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  TutorProfile, 
  LessonType, 
  TimeSlot, 
  Booking 
} from '../types';
import { DEFAULT_LESSON_TYPES, TIMEZONES } from '../data/defaultTutorData';
import { 
  getAvailableSlotsForDate, 
  createGoogleCalendarUrl, 
  downloadIcsFile 
} from '../utils/calendar';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Globe, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  User, 
  Mail, 
  Phone, 
  Video, 
  Download, 
  ExternalLink,
  Send
} from 'lucide-react';

interface CalendarBookingProps {
  tutorProfile: TutorProfile;
  onBookingComplete: (newBooking: Booking) => void;
  preselectedLessonTypeId?: string;
}

export const CalendarBooking: React.FC<CalendarBookingProps> = ({
  tutorProfile,
  onBookingComplete,
  preselectedLessonTypeId
}) => {
  // Calendar state
  const today = new Date();
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));
  
  // Format YYYY-MM-DD
  const formatIsoDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return formatIsoDate(d);
  });

  const [selectedSlot, setSelectedSlot] = useState<string | null>('11:00');
  const [selectedTimezone, setSelectedTimezone] = useState<string>('America/New_York');
  const [slotPeriodFilter, setSlotPeriodFilter] = useState<'all' | 'morning' | 'afternoon' | 'evening'>('all');
  
  // Lesson Type state
  const [selectedLessonType, setSelectedLessonType] = useState<LessonType>(() => {
    if (preselectedLessonTypeId) {
      const found = DEFAULT_LESSON_TYPES.find(l => l.id === preselectedLessonTypeId);
      if (found) return found;
    }
    return DEFAULT_LESSON_TYPES[0]; // Trial by default
  });

  // Step in booking: 1 = choose slot & lesson, 2 = student form, 3 = confirmed
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form state
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentContact, setStudentContact] = useState('');
  const [studentLevel, setStudentLevel] = useState('Intermediate (B1-B2)');
  const [studentGoal, setStudentGoal] = useState('Conversational Fluency / Break Barrier');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastBooking, setLastBooking] = useState<Booking | null>(null);

  // Booked slots tracker
  const [bookedSlotKeys, setBookedSlotKeys] = useState<string[]>([]);

  // Compute month days
  const calendarDays = useMemo(() => {
    const year = currentMonthDate.getFullYear();
    const month = currentMonthDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Day of week index (Monday = 0, Sunday = 6)
    let startDayOfWeek = firstDay.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6; // Sunday fix

    const days: { dateStr: string; dayNumber: number; isCurrentMonth: boolean; isPast: boolean; isToday: boolean }[] = [];

    // Previous month padding days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month - 1, prevMonthLastDay - i);
      const dateStr = formatIsoDate(prevDate);
      days.push({
        dateStr,
        dayNumber: prevDate.getDate(),
        isCurrentMonth: false,
        isPast: prevDate < new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        isToday: dateStr === formatIsoDate(today)
      });
    }

    // Current month days
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const thisDate = new Date(year, month, day);
      const dateStr = formatIsoDate(thisDate);
      days.push({
        dateStr,
        dayNumber: day,
        isCurrentMonth: true,
        isPast: thisDate < new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        isToday: dateStr === formatIsoDate(today)
      });
    }

    // Next month padding days to complete 35 or 42 grid
    const remaining = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      const nextDate = new Date(year, month + 1, i);
      const dateStr = formatIsoDate(nextDate);
      days.push({
        dateStr,
        dayNumber: i,
        isCurrentMonth: false,
        isPast: false,
        isToday: false
      });
    }

    return days;
  }, [currentMonthDate]);

  // Available slots for selected date
  const availableSlots = useMemo(() => {
    return getAvailableSlotsForDate(selectedDate, bookedSlotKeys);
  }, [selectedDate, bookedSlotKeys]);

  const filteredSlots = useMemo(() => {
    if (slotPeriodFilter === 'all') return availableSlots;
    return availableSlots.filter(s => s.period === slotPeriodFilter);
  }, [availableSlots, slotPeriodFilter]);

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1));
  };

  const handleSlotSelect = (slotTime: string) => {
    setSelectedSlot(slotTime);
  };

  const handleProceedToForm = () => {
    if (!selectedDate || !selectedSlot) return;
    setStep(2);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentEmail.trim() || !studentContact.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newBooking: Booking = {
        id: 'bk_' + Math.random().toString(36).substring(2, 9),
        studentName: studentName.trim(),
        studentEmail: studentEmail.trim(),
        studentPhoneOrTelegram: studentContact.trim(),
        lessonTypeId: selectedLessonType.id,
        lessonTitle: selectedLessonType.title,
        date: selectedDate,
        time: selectedSlot || '11:00',
        timezone: selectedTimezone,
        duration: selectedLessonType.duration,
        price: selectedLessonType.price,
        studentLevel,
        studentGoal,
        notes: notes.trim(),
        createdAt: new Date().toISOString(),
        meetLink: `https://meet.google.com/${Math.random().toString(36).substring(2, 5)}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 5)}`,
        status: 'confirmed'
      };

      setBookedSlotKeys(prev => [...prev, `${selectedDate}_${selectedSlot}`]);
      setLastBooking(newBooking);
      onBookingComplete(newBooking);
      setIsSubmitting(false);
      setStep(3);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe fallback
      }
    }, 450);
  };

  const t = {
    sectionBadge: 'LIVE CALENDAR & BOOKING',
    sectionTitle: 'Select a time for your trial lesson',
    sectionDesc: 'Automatic timezone conversion, Google Calendar sync, and instant meeting confirmation.',
    step1Title: '1. Lesson type & slot',
    step2Title: '2. Your details & goals',
    step3Title: '3. Booking Confirmed!',
    selectLessonType: 'Select lesson format:',
    selectDate: 'Select date:',
    selectSlot: 'Select lesson time:',
    timezoneLabel: 'Your timezone:',
    morning: 'Morning (09:00 - 12:00)',
    afternoon: 'Afternoon (12:00 - 17:00)',
    evening: 'Evening (17:00 - 21:00)',
    allSlots: 'All slots',
    noSlots: 'All slots are booked for this date. Please select an adjacent day.',
    proceedBtn: 'Continue with ' + (selectedSlot || '') + ' on ' + selectedDate,
    backBtn: '← Back to calendar',
    nameLabel: 'Your full name',
    namePlaceholder: 'e.g. Alex Morgan',
    emailLabel: 'Email address for meeting link & study materials',
    emailPlaceholder: 'alex@example.com',
    contactLabel: 'Telegram (@username) or WhatsApp for quick contact',
    contactPlaceholder: '@alex_dev or +1 415 555 2671',
    levelLabel: 'Your current level estimate:',
    goalLabel: 'Primary goal:',
    notesLabel: 'Notes or specific questions for the tutor (optional):',
    confirmBookingBtn: 'Confirm Booking & Get Meet Link',
    freeTrialBadge: '30-min Trial Lesson',
    gcalBtn: 'Add to Google Calendar',
    icsBtn: 'Download .ICS (Apple / Outlook)',
    telegramBtn: 'Message Tutor on Telegram',
    whatsappBtn: 'Message on WhatsApp',
    meetLinkText: 'Google Meet room link:',
    confirmedHeading: 'Lesson Confirmed Successfully!',
    confirmedSub: 'We sent the meeting invite and preparatory notes to your email. See you in class!',
    bookAnotherBtn: 'Book another lesson',
    levels: [
      'Beginner / Elementary (A1-A2)',
      'Intermediate (B1-B2) - Understand, but struggle to speak',
      'Upper-Intermediate (B2) - Want fluency & professional tone',
      'Advanced (C1) - IELTS 7.5+ / Global Job Interview'
    ],
    goals: [
      'Conversational Fluency / Break Barrier',
      'Global Job Interview Preparation',
      'IELTS Academic or General Band 7.5+',
      'Relocation & Daily Life in English',
      'Business English & Executive Presentations'
    ]
  };

  const monthNamesEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthName = `${monthNamesEn[currentMonthDate.getMonth()]} ${currentMonthDate.getFullYear()}`;
  const weekDayHeaders = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <section id="calendar-section" className="py-16 sm:py-24 bg-[#FDFCFB] border-b border-gray-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold tracking-wider uppercase mb-3">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>{t.sectionBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1A1A] tracking-tight">
            {t.sectionTitle}
          </h2>
          <p className="mt-3 text-base text-gray-600">
            {t.sectionDesc}
          </p>
        </div>

        {/* Multi-step Container */}
        <div className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-8 shadow-sm">
          
          {/* Step Indicator */}
          <div className="flex items-center justify-between max-w-xl mx-auto mb-8 text-xs sm:text-sm font-semibold text-gray-500">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-700 font-bold' : ''}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <span className="hidden sm:inline">{t.step1Title}</span>
            </div>
            <div className={`h-0.5 flex-1 mx-3 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-700 font-bold' : ''}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <span className="hidden sm:inline">{t.step2Title}</span>
            </div>
            <div className={`h-0.5 flex-1 mx-3 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            <div className={`flex items-center gap-2 ${step === 3 ? 'text-blue-700 font-bold' : ''}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step === 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                3
              </div>
              <span className="hidden sm:inline">{t.step3Title}</span>
            </div>
          </div>

          {/* STEP 1: Lesson Type, Calendar & Time Slot */}
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in">
              
              {/* Lesson Format Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                  {t.selectLessonType}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {DEFAULT_LESSON_TYPES.map((lt) => {
                    const isSelected = selectedLessonType.id === lt.id;
                    return (
                      <div
                        key={lt.id}
                        onClick={() => setSelectedLessonType(lt)}
                        className={`relative rounded-2xl p-4 cursor-pointer transition-all border ${
                          isSelected
                            ? 'bg-blue-50/50 border-blue-600 ring-2 ring-blue-600/20 shadow-2xs'
                            : 'bg-gray-50/50 hover:bg-gray-50 border-gray-200'
                        }`}
                      >
                        {lt.popular && (
                          <span className="absolute -top-2.5 right-3 px-2.5 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                            Popular
                          </span>
                        )}
                        <div className="flex items-start justify-between">
                          <h4 className="font-bold text-[#1A1A1A] text-sm">
                            {lt.title}
                          </h4>
                          <span className="font-display font-extrabold text-blue-600 text-base">
                            ${lt.price}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {lt.description}
                        </p>
                        <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                          <Clock className="w-3.5 h-3.5 text-blue-600" />
                          <span>{lt.duration} mins</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Timezone Switcher Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-200 text-xs">
                <div className="flex items-center gap-2 text-gray-700 font-medium">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span>{t.timezoneLabel}</span>
                </div>
                <select
                  value={selectedTimezone}
                  onChange={(e) => setSelectedTimezone(e.target.value)}
                  className="bg-white border border-gray-200 rounded-full px-3 py-1.5 font-medium text-gray-800 focus:outline-blue-600 text-xs"
                >
                  {TIMEZONES.map(tz => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Calendar & Slots Split View */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left: Interactive Month Calendar */}
                <div className="lg:col-span-6 bg-[#FDFCFB] rounded-2xl p-5 border border-gray-200 shadow-2xs">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display font-bold text-[#1A1A1A] text-base">
                      {monthName}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={handlePrevMonth}
                        className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
                        title="Previous month"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNextMonth}
                        className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
                        title="Next month"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Days of week header */}
                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-400 mb-2">
                    {weekDayHeaders.map((dh, i) => (
                      <div key={i} className="py-1">
                        {dh}
                      </div>
                    ))}
                  </div>

                  {/* Days grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((d, idx) => {
                      const isSelected = selectedDate === d.dateStr;
                      const isDisabled = d.isPast;

                      return (
                        <button
                          key={idx}
                          disabled={isDisabled}
                          onClick={() => setSelectedDate(d.dateStr)}
                          className={`h-10 rounded-xl text-xs font-medium flex flex-col items-center justify-center relative transition-all cursor-pointer ${
                            isDisabled 
                              ? 'text-gray-300 cursor-not-allowed bg-gray-50/50' 
                              : isSelected
                                ? 'bg-blue-600 text-white font-bold shadow-2xs'
                                : d.isCurrentMonth
                                  ? 'text-gray-800 hover:bg-blue-50 hover:text-blue-700'
                                  : 'text-gray-400 hover:bg-gray-50'
                          }`}
                        >
                          <span>{d.dayNumber}</span>
                          {d.isToday && (
                            <span className={`w-1 h-1 rounded-full mt-0.5 ${isSelected ? 'bg-white' : 'bg-blue-600'}`} />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      Available dates
                    </span>
                    <span>Selected: <strong className="text-gray-900">{selectedDate}</strong></span>
                  </div>
                </div>

                {/* Right: Time Slots Selection */}
                <div className="lg:col-span-6 bg-[#FDFCFB] rounded-2xl p-5 border border-gray-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-display font-bold text-[#1A1A1A] text-sm">
                        {t.selectSlot}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {selectedDate} ({selectedTimezone.split('/')[1] || selectedTimezone})
                      </p>
                    </div>

                    {/* Period filters */}
                    <div className="flex items-center bg-gray-100 p-0.5 rounded-full text-[11px] font-semibold text-gray-600">
                      <button
                        onClick={() => setSlotPeriodFilter('all')}
                        className={`px-2.5 py-1 rounded-full cursor-pointer ${slotPeriodFilter === 'all' ? 'bg-white shadow-2xs text-gray-900 font-bold' : ''}`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setSlotPeriodFilter('morning')}
                        className={`px-2.5 py-1 rounded-full cursor-pointer ${slotPeriodFilter === 'morning' ? 'bg-white shadow-2xs text-gray-900 font-bold' : ''}`}
                      >
                        AM
                      </button>
                      <button
                        onClick={() => setSlotPeriodFilter('evening')}
                        className={`px-2.5 py-1 rounded-full cursor-pointer ${slotPeriodFilter === 'evening' ? 'bg-white shadow-2xs text-gray-900 font-bold' : ''}`}
                      >
                        PM
                      </button>
                    </div>
                  </div>

                  {/* Slot grid */}
                  {filteredSlots.length === 0 ? (
                    <div className="py-8 text-center text-xs text-gray-500">
                      {t.noSlots}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-64 overflow-y-auto p-0.5">
                      {filteredSlots.map((slot, i) => {
                        const isSelected = selectedSlot === slot.time;
                        return (
                          <button
                            key={i}
                            disabled={!slot.available}
                            onClick={() => handleSlotSelect(slot.time)}
                            className={`py-3 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                              !slot.available
                                ? 'bg-gray-100 text-gray-300 line-through cursor-not-allowed border border-dashed border-gray-200'
                                : isSelected
                                  ? 'bg-blue-600 text-white shadow-xs scale-102 ring-2 ring-blue-600/30'
                                  : 'bg-white hover:bg-blue-50 text-gray-800 border border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-600'}`} />
                            <span>{slot.time}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Proceed Button */}
                  <div className="pt-2">
                    <button
                      id="calendar-proceed-btn"
                      disabled={!selectedSlot}
                      onClick={handleProceedToForm}
                      className="w-full py-3.5 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{t.proceedBtn}</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* STEP 2: Student Details Form */}
          {step === 2 && (
            <form onSubmit={handleSubmitBooking} className="max-w-2xl mx-auto space-y-6 animate-in fade-in">
              <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-gray-500 block">Selected session:</span>
                  <strong className="text-[#1A1A1A] font-bold">{selectedLessonType.title}</strong>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 block">Date & time:</span>
                  <strong className="text-blue-700 font-bold">{selectedDate} at {selectedSlot}</strong>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                    {t.nameLabel} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder={t.namePlaceholder}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-blue-600 text-gray-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      {t.emailLabel} *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        placeholder={t.emailPlaceholder}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-blue-600 text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      {t.contactLabel} *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={studentContact}
                        onChange={(e) => setStudentContact(e.target.value)}
                        placeholder={t.contactPlaceholder}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-blue-600 text-gray-900"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      {t.levelLabel}
                    </label>
                    <select
                      value={studentLevel}
                      onChange={(e) => setStudentLevel(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-blue-600 text-gray-900"
                    >
                      {t.levels.map((lvl, idx) => (
                        <option key={idx} value={lvl}>{lvl}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      {t.goalLabel}
                    </label>
                    <select
                      value={studentGoal}
                      onChange={(e) => setStudentGoal(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-blue-600 text-gray-900"
                    >
                      {t.goals.map((g, idx) => (
                        <option key={idx} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                    {t.notesLabel}
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g., preparing for global job interview in 2 weeks..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-blue-600 text-gray-900 resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3.5 rounded-full text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {t.backBtn}
                </button>
                <button
                  id="submit-booking-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Booking...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t.confirmBookingBtn}</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-xs text-gray-400">
                🔒 No spam. Details are strictly used to coordinate your lesson.
              </p>
            </form>
          )}

          {/* STEP 3: Confirmed & Calendar Export Actions */}
          {step === 3 && lastBooking && (
            <div className="max-w-xl mx-auto text-center space-y-6 animate-in zoom-in-95 duration-300">
              
              {/* Success Header */}
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1A1A1A]">
                  {t.confirmedHeading}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {t.confirmedSub}
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="bg-[#FDFCFB] p-5 rounded-2xl border border-gray-200 text-left space-y-3 shadow-2xs">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <span className="text-xs font-bold text-gray-500 uppercase">Student</span>
                  <span className="text-sm font-bold text-gray-900">{lastBooking.studentName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <span className="text-xs font-bold text-gray-500 uppercase">Date & Time</span>
                  <span className="text-sm font-bold text-blue-700">{lastBooking.date} at {lastBooking.time} ({lastBooking.timezone.split('/')[1] || lastBooking.timezone})</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <span className="text-xs font-bold text-gray-500 uppercase">Format</span>
                  <span className="text-sm font-bold text-gray-800">{lastBooking.lessonTitle}</span>
                </div>
                
                {/* Meeting Link */}
                <div className="pt-2">
                  <span className="text-xs font-bold text-gray-500 block mb-1.5">{t.meetLinkText}</span>
                  <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-gray-200">
                    <Video className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-xs font-mono font-medium text-gray-800 truncate flex-1">
                      {lastBooking.meetLink}
                    </span>
                    <a
                      href={lastBooking.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <span>Join</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Add to Google Calendar & Download .ICS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  id="btn-add-gcal"
                  href={createGoogleCalendarUrl(lastBooking, tutorProfile.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-full text-xs font-bold text-gray-800 bg-white hover:bg-gray-50 border border-gray-200 shadow-2xs flex items-center justify-center gap-2 transition-colors"
                >
                  <CalendarIcon className="w-4 h-4 text-red-500" />
                  <span>{t.gcalBtn}</span>
                </a>

                <button
                  id="btn-download-ics"
                  onClick={() => downloadIcsFile(lastBooking, tutorProfile.name)}
                  className="py-3 px-4 rounded-full text-xs font-bold text-gray-800 bg-white hover:bg-gray-50 border border-gray-200 shadow-2xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-blue-600" />
                  <span>{t.icsBtn}</span>
                </button>
              </div>

              {/* Direct Messenger Confirmation */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  id="btn-notify-telegram"
                  href={`https://t.me/${tutorProfile.telegramUsername}?text=${encodeURIComponent(
                    `Hello ${tutorProfile.name}! I booked an English lesson for ${lastBooking.date} at ${lastBooking.time}. My name is ${lastBooking.studentName}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-full text-xs font-bold text-white bg-[#229ED9] hover:bg-[#1e8ec3] flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.telegramBtn}</span>
                </a>

                <a
                  id="btn-notify-whatsapp"
                  href={`https://wa.me/${tutorProfile.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello ${tutorProfile.name}! I booked an English lesson for ${lastBooking.date} at ${lastBooking.time}. My name is ${lastBooking.studentName}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-full text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{t.whatsappBtn}</span>
                </a>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setStep(1);
                    setStudentName('');
                    setStudentEmail('');
                  }}
                  className="text-xs font-bold text-gray-500 hover:text-gray-800 underline cursor-pointer"
                >
                  {t.bookAnotherBtn}
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
};
