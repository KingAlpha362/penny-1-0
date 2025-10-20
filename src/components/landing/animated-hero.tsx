'use client';

import { useEffect, useRef } from 'react';
import { heroAnimation } from '@/lib/gsap-animations';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PennywiseLogo } from '@/components/icons/pennywise-logo';

export function AnimatedHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      console.log('AnimatedHero: containerRef.current is defined, initializing animation');
      heroAnimation('.hero-container');
    } else {
      console.log('AnimatedHero: containerRef.current is null');
    }
  }, []);

  return (
    <section 
      ref={containerRef}
      className="hero-container container mx-auto px-6 py-24 md:py-32 text-center relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-blue-500/5 to-purple-500/10 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-primary/10 opacity-10"></div>
      </div>
      
      <div className="relative">
        <div className="hero-logo flex items-center justify-center gap-2 mb-8">
          {/* Use the app's SVG React component for a consistent logo */}
          <PennywiseLogo className="h-12 w-auto text-primary" aria-label="PennyWise" />
        </div>
        
        <h1 className="hero-title text-4xl md:text-7xl font-extrabold tracking-tighter text-foreground leading-tight mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-500">
            Effortless Money Management for a Brighter Future
          </span>
        </h1>
        
        <p className="hero-description mt-6 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          Take control of your finances with our intuitive tools. Track spending, create budgets, and achieve your financial goals with ease.
        </p>
        
        <div className="hero-cta mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="h-12 px-8 text-base font-semibold shadow-lg bg-gradient-to-r from-primary to-blue-500 hover:to-purple-500 transition-all duration-300 w-full sm:w-auto"
          >
            <Link href="/signup" className="text-white">Get Started Free</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 text-base font-semibold w-full sm:w-auto group"
          >
            <Link href="#features" className="flex items-center gap-2">
              Learn More
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </Link>
          </Button>
        </div>
        
        <div className="trust-badges mt-16">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-sm font-medium">
                4.9 ★★★★★
              </div>
              <span className="text-sm text-muted-foreground">App Store</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-sm font-medium">
                4.8 ★★★★★
              </div>
              <span className="text-sm text-muted-foreground">Google Play</span>
            </div>
            <Image 
              src="/badges/trustpilot.svg"
              alt="Trustpilot Rating"
              width={120}
              height={30}
              className="h-8 w-auto"
            />
            <div className="flex items-center gap-6">
              <Image 
                src="/badges/forbes.svg"
                alt="Featured in Forbes"
                width={100}
                height={30}
                className="h-6 w-auto grayscale opacity-70 hover:opacity-100 transition-opacity"
              />
              <Image 
                src="/badges/techcrunch.svg"
                alt="Featured in TechCrunch"
                width={120}
                height={30}
                className="h-6 w-auto grayscale opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}