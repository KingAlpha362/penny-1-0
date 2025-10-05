"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface BankLogoProps {
  provider: string;
  className?: string;
}

const BANK_LOGOS: Record<string, { name: string, color: string }> = {
  'bankofamerica': { name: 'Bank of America', color: '#E31837' },
  'chase': { name: 'Chase', color: '#117ACA' },
  'wellsfargo': { name: 'Wells Fargo', color: '#D71E28' },
  'citibank': { name: 'Citibank', color: '#004B93' },
  'usbank': { name: 'U.S. Bank', color: '#0046AA' },
  'capitalone': { name: 'Capital One', color: '#004977' },
  'pnc': { name: 'PNC Bank', color: '#F58025' },
  'tdbank': { name: 'TD Bank', color: '#4BB543' },
  'allybank': { name: 'Ally Bank', color: '#6F42C1' },
  'discover': { name: 'Discover', color: '#FF6000' },
  'paypal': { name: 'PayPal', color: '#0070BA' },
  'americanexpress': { name: 'American Express', color: '#006FCF' },
  'venmo': { name: 'Venmo', color: '#3396CD' },
  'cashapp': { name: 'Cash App', color: '#00D632' }
};

const renderLogo = (provider: string) => {
  const providerId = provider.toLowerCase().replace(/[^a-z0-9]/g, '');
  const logoInfo = BANK_LOGOS[providerId];
  
  // Check if we have a custom SVG logo
  try {
    return (
      <Image
        src={`/logos/banks/${providerId}.svg`}
        alt={`${provider} logo`}
        width={24}
        height={24}
        className="h-6 w-6"
      />
    );
  } catch {
    // Fallback to generic bank icon with provider's color
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={logoInfo?.color || "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M3 22h18" />
        <path d="M3 10h18" />
        <path d="M12 2L2 10l10-3 10 3-10-8z" />
        <path d="M5 14v4" />
        <path d="M19 14v4" />
        <path d="M12 14v4" />
      </svg>
    );
  }
}

export function BankLogo({ provider, className }: BankLogoProps) {
  return (
    <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg bg-muted", className)}>
      {renderLogo(provider)}
    </div>
  );
}
