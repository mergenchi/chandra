import { Booking, TimeSlot } from '../types';

// Generate available slots for a given date (deterministic yet realistic)
export function getAvailableSlotsForDate(dateStr: string, bookedSlots: string[] = []): TimeSlot[] {
  const date = new Date(dateStr);
  const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday

  // Base schedule template
  const allSlots: { time: string; period: 'morning' | 'afternoon' | 'evening' }[] = [
    { time: '09:00', period: 'morning' },
    { time: '10:00', period: 'morning' },
    { time: '11:00', period: 'morning' },
    { time: '12:00', period: 'afternoon' },
    { time: '13:30', period: 'afternoon' },
    { time: '15:00', period: 'afternoon' },
    { time: '16:30', period: 'afternoon' },
    { time: '18:00', period: 'evening' },
    { time: '19:00', period: 'evening' },
    { time: '20:00', period: 'evening' },
  ];

  // If weekend (Sunday or Saturday evening), reduce slots
  return allSlots.map(slot => {
    // Generate a pseudo-random seed based on date and time
    const hash = (date.getDate() * 13 + slot.time.charCodeAt(0) * 7 + slot.time.charCodeAt(3) * 3) % 10;
    
    // Some slots are naturally booked or available
    let isAvailable = dayOfWeek === 0 ? hash > 6 : hash > 2;

    // Check if explicitly booked in our active state
    const slotKey = `${dateStr}_${slot.time}`;
    if (bookedSlots.includes(slotKey)) {
      isAvailable = false;
    }

    return {
      time: slot.time,
      period: slot.period,
      available: isAvailable
    };
  });
}

// Generate Google Calendar Link
export function createGoogleCalendarUrl(booking: Booking, tutorName: string): string {
  try {
    const [year, month, day] = booking.date.split('-').map(Number);
    const [hours, minutes] = booking.time.split(':').map(Number);

    const startDate = new Date(year, month - 1, day, hours, minutes);
    const endDate = new Date(startDate.getTime() + (booking.duration || 50) * 60 * 1000);

    const formatGCalDate = (d: Date) => {
      return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
    };

    const title = encodeURIComponent(`${booking.lessonTitle} with ${tutorName}`);
    const details = encodeURIComponent(
      `Private lesson with ${tutorName}.\n` +
      `Duration: ${booking.duration} minutes\n` +
      `Student: ${booking.studentName}\n` +
      `Join Link: ${booking.meetLink}\n` +
      `Goals: ${booking.studentGoal || 'General Speaking Practice'}\n\n` +
      `Manage or prepare materials in your student dashboard.`
    );
    const location = encodeURIComponent(booking.meetLink);
    const dates = `${formatGCalDate(startDate)}/${formatGCalDate(endDate)}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  } catch {
    return 'https://calendar.google.com';
  }
}

// Generate & download .ICS iCalendar file for Apple Calendar, Outlook, etc.
export function downloadIcsFile(booking: Booking, tutorName: string) {
  const [year, month, day] = booking.date.split('-').map(Number);
  const [hours, minutes] = booking.time.split(':').map(Number);

  const startDate = new Date(year, month - 1, day, hours, minutes);
  const endDate = new Date(startDate.getTime() + (booking.duration || 50) * 60 * 1000);

  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  const formatIcsDate = (d: Date) => {
    return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Preply Tutor Personal Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${booking.id}@tutor-booking.app`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(startDate)}`,
    `DTEND:${formatIcsDate(endDate)}`,
    `SUMMARY:${booking.lessonTitle} - ${tutorName}`,
    `DESCRIPTION:Lesson with ${tutorName}\\nStudent: ${booking.studentName}\\nMeeting link: ${booking.meetLink}`,
    `LOCATION:${booking.meetLink}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `lesson-${booking.date}-${booking.time.replace(':', '')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
