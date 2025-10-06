import Image from 'next/image';
import { useState } from 'react';

export const investmentLogos = {
  BTC: {
    name: 'Bitcoin',
    symbol: 'BTC'
  },
  AAPL: {
    name: 'Apple Inc.',
    symbol: 'AAPL'
  },
  TSLA: {
    name: 'Tesla, Inc.',
    symbol: 'TSLA'
  },
  GOOGL: {
    name: 'Alphabet Inc.',
    symbol: 'GOOGL'
  },
  AMZN: {
    name: 'Amazon.com, Inc.',
    symbol: 'AMZN'
  }
} as const;

interface InvestmentLogoProps {
  symbol: keyof typeof investmentLogos;
  size?: number;
  className?: string;
}

export function InvestmentLogo({ symbol, size = 24, className }: InvestmentLogoProps) {
  const [imageError, setImageError] = useState(false);
  const investment = investmentLogos[symbol];
  
  if (!investment) {
    return null;
  }

  const fallbackLogo = (
    <div 
      style={{ width: size, height: size }} 
      className={`relative bg-muted rounded-full flex items-center justify-center text-sm font-medium ${className || ''}`}
    >
      {symbol.charAt(0)}
    </div>
  );

  if (imageError) {
    return fallbackLogo;
  }

  return (
    <div style={{ width: size, height: size }} className={className}>
      <Image
        src={`/logos/investments/${symbol.toLowerCase()}.svg`}
        alt={investment.name}
        width={size}
        height={size}
        className="rounded-full"
        onError={() => setImageError(true)}
      />
    </div>
  );
}