'use client';

import { useEffect } from 'react';
import { featuresAnimation } from '@/lib/gsap-animations';
import { LayoutDashboard, Wallet, TrendingUp, Search, BrainCircuit, Coins, PieChart, Shield } from 'lucide-react';

const features = [
  {
    icon: <LayoutDashboard className="h-8 w-8 text-primary" />,
    title: 'AI-Powered Insights',
    description: 'AI analyzes your spending, finds savings, and predicts your financial future.',
  },
  {
    icon: <Search className="h-8 w-8 text-primary" />,
    title: 'Automated Bill Detection',
    description: 'Automatically track and manage your recurring bills to avoid late fees and wasted subscriptions.',
  },
  {
    icon: <Wallet className="h-8 w-8 text-primary" />,
    title: 'Multi-Currency Support',
    description: 'Manage your money in any currency with automatic conversion and real-time exchange rates.',
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: 'Investment Tracking',
    description: 'Monitor your portfolio performance across stocks, crypto, and funds in one place.',
  },
  {
    icon: <PieChart className="h-8 w-8 text-primary" />,
    title: 'Visual Analytics',
    description: 'Beautiful charts and reports that make understanding your finances intuitive.',
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: 'Bank-Grade Security',
    description: 'Your data is protected with enterprise-level security and encryption.',
  },
];

export function AnimatedFeatures() {
  useEffect(() => {
    featuresAnimation();
  }, []);

  return (
    <section className="features-section container mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <span className="text-primary text-sm font-semibold tracking-wider uppercase">Features</span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-2">
          Everything you need to succeed
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Powerful features designed to help you take control of your finances and achieve your goals faster.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="feature-card group p-8 rounded-xl border bg-card hover:bg-primary/5 transition-all duration-300"
          >
            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-6 group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {feature.title}
            </h3>
            <p className="text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}