"use client";

import { cn } from "@/lib/utils";

interface BankLogoProps {
  provider: string;
  className?: string;
}

const renderLogo = (provider: string) => {
    const providerId = provider.toLowerCase().replace(/\s/g, '');
    switch(providerId) {
        case 'bankofamerica':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[#E31837]">
                    <path d="M4 12h16" />
                    <path d="M7 7l5 10 5-10" />
                </svg>
            )
        case 'chase':
            return (
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[#117ACA]">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v8h-2zm-3 4h8v2h-8z" />
                </svg>
            )
        case 'allybank':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[#6F42C1]">
                    <path d="M12 2l-10 6 10 6 10-6-10-6z" />
                    <path d="M2 14l10 6 10-6" />
                </svg>
            )
         case 'paypal':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[#0070BA]">
                    <path d="M8 6h8c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2z" />
                    <path d="M10 10v4" />
                    <path d="M14 10v4" />
                    <path d="M12 10v4" />
                </svg>
            )
        default:
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M2 2v20h20V2H2zm18 18H4V4h16v16z" />
                    <path d="M9 9h6v6H9z" />
                </svg>
            )
    }
}

export function BankLogo({ provider, className }: BankLogoProps) {
  return (
    <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg bg-muted", className)}>
      {renderLogo(provider)}
    </div>
  );
}
