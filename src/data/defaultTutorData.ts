import { TutorProfile, Review, LessonType, QuizQuestion } from '../types';

export const DEFAULT_TUTOR_PROFILE: TutorProfile = {
  id: '5832494',
  preplyUrl: 'https://preply.com/en/tutor/5832494',
  name: 'Chandra Torrefiel',
  title: 'Certified TEFL English Tutor (5+ yrs). Expert in Conversational Fluency, Business English, Accent Refinement & IELTS/TOEIC/TOEFL Prep.',
  avatar: 'https://avatars.preply.com/i/logos/i/logos/avatar_k4ecagvjg7k.jpg',
  videoThumbnail: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
  videoUrl: 'https://www.youtube.com/embed/v9QcZQCGTyw?autoplay=1',
  languagesSpoken: [
    { language: 'English', level: 'Native / Proficient' },
    { language: 'Tagalog (Filipino)', level: 'Native' },
    { language: 'Spanish', level: 'Conversational' }
  ],
  subjects: [
    'Conversational English & Natural Accent Refinement',
    'Business English & Workplace Communication',
    'IELTS, TOEFL & TOEIC Exam Preparation',
    'English Job Interview Prep (STAR Method & CV Review)',
    'English for Travel & Daily Fluency',
    'English for Beginners & Confidence Building'
  ],
  hourlyRateUsd: 14,
  trialPriceUsd: 8,
  rating: 5.0,
  totalReviews: 48,
  totalLessons: 3450,
  activeStudents: 32,
  responseRate: '100%',
  responseTime: '< 15 min',
  country: 'Philippines 🇵🇭',
  location: 'Manila, Philippines (GMT+8 / PHT)',
  experienceYears: 5,
  bio: `Hello! I'm Chandra Torrefiel, a certified English tutor with over 5 years of international teaching experience both online and offline.

My teaching philosophy is built around student passion and active speaking time (80% student talk). I believe learning happens best when you're relaxed, engaged, and discussing topics you truly care about.

🎯 How I help you achieve fluency:
• Conversational English — expand vocabulary, master natural intonation, reduce accent tension, and learn real idioms & phrasal verbs.
• Business English & Career Prep — write persuasive emails, master meeting discussions, polish your CV, and ace high-stakes job interviews.
• Exam Preparation (IELTS, TOEFL, TOEIC) — proven test strategies, scoring rubric breakdowns, and mock interview practice.
• English for Beginners & Travelers — supportive, judgment-free environment to build a rock-solid foundation.

Beyond teaching, I am an avid reader (classics by Jane Austen & F. Scott Fitzgerald, fantasy & modern fiction like Harry Potter and A Song of Ice and Fire) and love outdoor activities like hiking, running, fishing, photography, gardening, cooking, and traveling. Let's make English your superpower!`,
  telegramUsername: 'teacher_chandra_preply',
  whatsappNumber: '+639171234567',
  email: 'chandra.torrefiel.tutor@gmail.com',
  certifications: [
    { title: '120-Hour Professional TEFL (Teaching English as a Foreign Language) Certificate', issuer: 'International TEFL Academy', year: '2019' },
    { title: 'Preply Certified Conversational & Business English Specialist', issuer: 'Preply Platform Certification', year: '2020' },
    { title: 'Bachelor of Arts in Communication & Education', issuer: 'State University', year: '2018' },
    { title: 'Specialized Certification: IELTS, TOEFL & TOEIC Preparation Methodologies', issuer: 'Language Assessment Institute', year: '2021' }
  ]
};

export const DEFAULT_LESSON_TYPES: LessonType[] = [
  {
    id: 'trial',
    title: 'Trial Diagnostic Lesson (30 min)',
    duration: 30,
    price: 8,
    popular: true,
    description: 'Accurate level placement test, bottleneck analysis, custom study roadmap, and methodology test with Chandra Torrefiel.',
    features: [
      '30 minutes of live 1-on-1 speaking with Chandra',
      'Grammar & pronunciation audit',
      'Speaking barrier diagnosis & anxiety reduction',
      'Personal step-by-step roadmap to your fluency goal',
      '15% discount on your first lesson package'
    ]
  },
  {
    id: 'standard',
    title: 'Standard 1-on-1 Lesson (50 min)',
    duration: 50,
    price: 14,
    popular: false,
    description: 'Comprehensive 1-on-1 conversational session tailored to your goals with interactive digital materials.',
    features: [
      '50 minutes of high-density practice (80% student speaking time)',
      'Personal Notion workspace with curated vocabulary and audio notes',
      'Real-world topics: articles, TED talks, literature & business cases',
      'Immediate, supportive pronunciation & grammar feedback',
      'Homework review & continuous messaging support'
    ]
  },
  {
    id: 'ielts_interview',
    title: 'IELTS / TOEFL or Job Interview Prep (50 min)',
    duration: 50,
    price: 18,
    popular: false,
    description: 'High-impact prep: mock interviews with STAR method coaching or IELTS/TOEIC/TOEFL scoring criteria.',
    features: [
      'Full mock interview simulation with STAR method coaching',
      'IELTS band 7.5+ scoring rubric breakdown and vocabulary',
      'Targeted behavioral interview answer frameworks',
      'CV / Resume & cover letter phrasing review',
      'Session recap notes with marked transcripts'
    ]
  }
];

export const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Kenji Takahashi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    country: 'Japan (Tokyo)',
    countryCode: 'JP',
    rating: 5,
    date: 'February 20, 2026',
    goal: 'Business English & Client Meetings',
    tag: 'career',
    resultBadge: '💼 Promoted to Global Account Lead',
    verifiedPreply: true,
    text: 'Chandra is an exceptional tutor! Before our lessons, I was always nervous when presenting to US clients. Chandra has such a warm and encouraging style that makes speaking English completely natural. We practiced business emails, idioms, and meeting expressions. My confidence has skyrocketed!'
  },
  {
    id: 'rev-2',
    author: 'Anna Weber',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    country: 'Germany (Munich)',
    countryCode: 'DE',
    rating: 5,
    date: 'February 12, 2026',
    goal: 'IELTS Academic Exam Preparation',
    tag: 'ielts',
    resultBadge: '🎯 Scored 8.0 on IELTS (Speaking 8.5!)',
    verifiedPreply: true,
    text: 'I studied with Chandra for 3 months specifically for the IELTS exam. She knew every single trick and scoring detail for the Speaking module. She helped me expand my vocabulary with natural collocations and idioms. I achieved an 8.0 overall with an 8.5 on Speaking! Thank you so much, Chandra!'
  },
  {
    id: 'rev-3',
    author: 'Carlos Mendes',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    country: 'Spain (Madrid)',
    countryCode: 'ES',
    rating: 5,
    date: 'January 28, 2026',
    goal: 'Conversational Fluency & Accent Refinement',
    tag: 'speaking',
    resultBadge: '🗣️ Overcame speaking anxiety in 6 weeks',
    verifiedPreply: true,
    text: 'Chandra has the friendliest personality of any teacher I have met online. She gives you 80% of the speaking time and gently corrects your pronunciation without interrupting your flow. Our conversations about books, hiking, and travel are always fascinating!'
  },
  {
    id: 'rev-4',
    author: 'Min-jun Kim',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    country: 'South Korea (Seoul)',
    countryCode: 'KR',
    rating: 5,
    date: 'January 15, 2026',
    goal: 'Tech Job Interview Preparation',
    tag: 'career',
    resultBadge: '🚀 Passed interview at Singapore FinTech',
    verifiedPreply: true,
    text: 'I needed urgent mock interview practice for a software engineering role in Singapore. Chandra structured all my answers with the STAR method, eliminated repetitive filler words, and helped me sound natural and professional. I received the job offer!'
  },
  {
    id: 'rev-5',
    author: 'Daria Nowak',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    country: 'Poland (Warsaw)',
    countryCode: 'PL',
    rating: 5,
    date: 'December 22, 2025',
    goal: 'English from Scratch to B1',
    tag: 'beginner',
    resultBadge: '🌟 From A1 beginner to confident conversational B1',
    verifiedPreply: true,
    text: 'Starting English as an adult was intimidating, but Chandra made every single lesson fun and stress-free. She explains grammar rules so clearly and with real examples. Now I can travel abroad, order food, and chat with international friends easily.'
  },
  {
    id: 'rev-6',
    author: 'Lucas Silva',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    country: 'Brazil (São Paulo)',
    countryCode: 'BR',
    rating: 5,
    date: 'December 05, 2025',
    goal: 'TOEIC Exam & International Relocation',
    tag: 'ielts',
    resultBadge: '📈 TOEIC score 920 / 990',
    verifiedPreply: true,
    text: 'Chandra is super organized and passionate. She sends great lesson summaries and audio notes so you can review anytime. 100% recommended for anyone wanting rapid, measurable results.'
  }
];

export const DEFAULT_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is your primary English learning goal right now?',
    answers: [
      {
        text: 'Break speaking barrier and speak fluently without hesitation',
        levelScore: 2,
        goalCategory: 'speaking'
      },
      {
        text: 'Pass international job interviews / Advance career & meetings',
        levelScore: 3,
        goalCategory: 'career'
      },
      {
        text: 'Score high on IELTS, TOEFL, or TOEIC (Band 7.5+ / 900+)',
        levelScore: 3,
        goalCategory: 'ielts'
      },
      {
        text: 'Learn from scratch / Rebuild solid foundation with confidence',
        levelScore: 1,
        goalCategory: 'beginner'
      }
    ]
  },
  {
    id: 2,
    question: 'How do you currently feel when speaking English?',
    answers: [
      {
        text: 'I understand what I hear, but I freeze up when I need to reply',
        levelScore: 2,
        goalCategory: 'speaking'
      },
      {
        text: 'I can express basic ideas, but struggle with vocabulary & tenses',
        levelScore: 2,
        goalCategory: 'speaking'
      },
      {
        text: 'Fluent in daily talk, but want advanced business & idiomatic phrasing',
        levelScore: 3,
        goalCategory: 'career'
      },
      {
        text: 'Beginner: want patient step-by-step guidance from the basics',
        levelScore: 1,
        goalCategory: 'beginner'
      }
    ]
  },
  {
    id: 3,
    question: 'How much time can you commit to lessons per week?',
    answers: [
      {
        text: '2-3 lessons per week + 15 min daily review (Optimal progress)',
        levelScore: 3,
        goalCategory: 'intensive'
      },
      {
        text: '1-2 lessons per week at a comfortable, steady pace',
        levelScore: 2,
        goalCategory: 'standard'
      },
      {
        text: 'Daily intensive sprint (Urgent goal / interview in 1-2 months)',
        levelScore: 4,
        goalCategory: 'intensive'
      }
    ]
  }
];

export const FAQS = [
  {
    question: 'How does the 30-minute trial lesson work?',
    answer: 'The trial lesson is a relaxed 30-minute session on Google Meet or Zoom. We get to know each other, conduct a friendly speaking diagnostic, identify your specific goals and bottlenecks, and outline a tailored roadmap for your future lessons.'
  },
  {
    question: 'What is Chandra Torrefiel’s teaching background and accent?',
    answer: 'Chandra is a certified TEFL educator from the Philippines with over 5 years of international teaching experience. She has a clear, neutral, and easy-to-understand accent with high proficiency in both American and British English conventions.'
  },
  {
    question: 'Where do lessons take place and what materials are provided?',
    answer: 'Lessons take place on Google Meet or Zoom. All interactive materials, Notion study guides, real-world case studies, and spaced-repetition flashcards are provided completely free with no extra textbook purchases needed.'
  },
  {
    question: 'What is the cancellation and rescheduling policy?',
    answer: 'You can easily reschedule or cancel a lesson with at least 12 hours notice via WhatsApp or Telegram with zero penalty.'
  },
  {
    question: 'How can I pay for lessons?',
    answer: 'You can book directly via Chandra’s official Preply profile, or pay via International Credit/Debit Cards (Visa/Mastercard), Stripe, PayPal, Revolut, or Crypto (USDT). Discounted bundles of 5, 10, and 20 lessons are available.'
  },
  {
    question: 'Is there a 100% satisfaction money-back guarantee?',
    answer: 'Yes! If for any reason you feel the trial lesson or teaching approach is not the right fit, you will receive a 100% full refund with zero questions asked.'
  }
];

export const TIMEZONES = [
  { value: 'Asia/Manila', label: 'Manila, Philippines (PHT / GMT+8 - Tutor Time)', offset: 8 },
  { value: 'Asia/Tokyo', label: 'Tokyo, Seoul (JST / KST / UTC+9)', offset: 9 },
  { value: 'Asia/Singapore', label: 'Singapore, Hong Kong, Taipei (SGT / UTC+8)', offset: 8 },
  { value: 'Europe/London', label: 'London, Dublin (GMT / UTC+0)', offset: 0 },
  { value: 'Europe/Berlin', label: 'Berlin, Paris, Madrid, Rome (CET / UTC+1)', offset: 1 },
  { value: 'Europe/Warsaw', label: 'Warsaw, Prague (CET / UTC+1)', offset: 1 },
  { value: 'Europe/Kyiv', label: 'Kyiv, Athens, Bucharest, Istanbul (EET / UTC+2)', offset: 2 },
  { value: 'Asia/Dubai', label: 'Dubai, Baku, Tbilisi (GST / UTC+4)', offset: 4 },
  { value: 'Asia/Almaty', label: 'Almaty, Tashkent (UTC+5)', offset: 5 },
  { value: 'America/New_York', label: 'New York, Toronto (EST / UTC-5)', offset: -5 },
  { value: 'America/Chicago', label: 'Chicago, Austin (CST / UTC-6)', offset: -6 },
  { value: 'America/Los_Angeles', label: 'Los Angeles, San Francisco (PST / UTC-8)', offset: -8 },
  { value: 'Australia/Sydney', label: 'Sydney, Melbourne (AEST / UTC+10)', offset: 10 }
];

