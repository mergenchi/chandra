import React from 'react';
import { TutorProfile } from '../types';
import { Award, Users, BookOpen, Star, Zap } from 'lucide-react';

interface StatsBarProps {
  tutorProfile: TutorProfile;
}

export const StatsBar: React.FC<StatsBarProps> = ({ tutorProfile }) => {
  const stats = [
    { label: 'Lessons Taught', value: `${tutorProfile.totalLessons.toLocaleString()}+`, sub: 'on Preply & direct coaching', icon: BookOpen },
    { label: 'Review Rating', value: '5.0 / 5.0', sub: '48 verified student reviews', icon: Star },
    { label: 'Active Students', value: `${tutorProfile.activeStudents}`, sub: 'regular weekly learners', icon: Users },
    { label: 'Qualification', value: 'TEFL (120 Hours)', sub: 'Certified English Specialist', icon: Award },
    { label: 'Response Time', value: tutorProfile.responseTime, sub: '100% response rate', icon: Zap }
  ];

  return (
    <section className="bg-[#18181B] text-white py-8 border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center p-2">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2 border border-blue-500/30">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                  {item.value}
                </span>
                <span className="text-xs font-semibold text-gray-300 mt-0.5">
                  {item.label}
                </span>
                <span className="text-[11px] text-gray-400 mt-0.5">
                  {item.sub}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
