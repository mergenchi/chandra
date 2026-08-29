export interface Review {
  id: string;
  author: string;
  avatar: string;
  country: string;
  countryCode: string;
  rating: number;
  date: string;
  goal: string;
  tag: 'speaking' | 'ielts' | 'career' | 'beginner' | 'general';
  text: string;
  resultBadge?: string;
  verifiedPreply: boolean;
}

export interface LessonType {
  id: string;
  title: string;
  duration: number; // minutes
  price: number; // in USD base
  popular?: boolean;
  description: string;
  features: string[];
}

export interface TimeSlot {
  time: string; // e.g. "10:00", "14:30"
  available: boolean;
  period: 'morning' | 'afternoon' | 'evening';
}

export interface Booking {
  id: string;
  studentName: string;
  studentEmail: string;
  studentPhoneOrTelegram: string;
  lessonTypeId: string;
  lessonTitle: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  timezone: string;
  duration: number;
  price: number;
  studentLevel: string;
  studentGoal: string;
  notes?: string;
  createdAt: string;
  meetLink: string;
  status: 'confirmed' | 'rescheduled' | 'cancelled';
}

export interface TutorProfile {
  id: string;
  preplyUrl: string;
  name: string;
  title: string;
  avatar: string;
  videoThumbnail: string;
  videoUrl: string;
  languagesSpoken: { language: string; level: string }[];
  subjects: string[];
  hourlyRateUsd: number;
  trialPriceUsd: number;
  rating: number;
  totalReviews: number;
  totalLessons: number;
  activeStudents: number;
  responseRate: string;
  responseTime: string;
  country: string;
  location: string;
  experienceYears: number;
  bio: string;
  telegramUsername: string;
  whatsappNumber: string;
  email: string;
  certifications: {
    title: string;
    issuer: string;
    year: string;
  }[];
}

export interface QuizAnswer {
  text: string;
  levelScore: number;
  goalCategory: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  description?: string;
  answers: QuizAnswer[];
}
