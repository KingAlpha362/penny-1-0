
'use client';

import { cn } from '@/lib/utils';
import { Apple, Bitcoin, Landmark } from 'lucide-react';

const iconMap = {
  'AAPL': <Apple className="h-6 w-6" />,
  'BTC': <Bitcoin className="h-6 w-6" />,
  'TSLA': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M15 12h-6l-2-4h10l-2 4z" />
      <path d="M12 12v-2" />
      <path d="M12 12v6" />
      <path d="M12 18l-2 4h4l-2-4z" />
    </svg>
  ),
  'VOO': <Landmark className="h-6 w-6" />,
  'default': <Landmark className="h-6 w-6" />,
};

interface InvestmentLogoProps {
  symbol: string;
  className?: string;
}

export function InvestmentLogo({ symbol, className }: InvestmentLogoProps) {
  const Icon = iconMap[symbol as keyof typeof iconMap] || iconMap['default'];
  return (
    <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg bg-muted', className)}>
      {Icon}
    </div>
  );
}
