'use client';

import { useEffect } from 'react';
import { statsAnimation, numberCounter } from '@/lib/gsap-animations';
import { Users, BadgeDollarSign, Star } from 'lucide-react';

const stats = [
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    value: '50K+',
    label: 'Active Users',
    counter: 50000
  },
  {
    icon: <BadgeDollarSign className="h-6 w-6 text-primary" />,
    value: '$2M+',
    label: 'Monthly Transactions',
    counter: 2000000
  },
  {
    icon: <Star className="h-6 w-6 text-primary" />,
    value: '4.9/5',
    label: 'User Rating',
    counter: 4.9
  }
];

export function AnimatedStats() {
  useEffect(() => {
    statsAnimation();
    stats.forEach((stat, index) => {
      numberCounter(`.stat-number-${index}`, stat.counter);
    });
  }, []);

  return (
    <section className="stats-section container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="stat-item group flex flex-col items-center p-6 rounded-xl bg-card hover:bg-primary/5 transition-all duration-300"
          >
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4 group-hover:scale-110 transition-transform duration-300">
              {stat.icon}
            </div>
            <span className={`text-3xl font-bold text-primary stat-number-${index}`}>
              {stat.value}
            </span>
            <span className="text-sm text-muted-foreground mt-1">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}