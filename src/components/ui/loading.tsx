'use client';

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8'
};

export function LoadingSpinner({ className, size = 'md' }: LoadingSpinnerProps) {
  return (
    <Loader2 
      role="status"
      aria-label="Loading"
      className={cn('animate-spin', sizeClasses[size], className)} 
    />
  );
}

interface LoadingStateProps {
  children: React.ReactNode;
  loading: boolean;
  loadingText?: string;
  className?: string;
}

export function LoadingState({
  children,
  loading,
  loadingText = 'Loading...',
  className
}: LoadingStateProps) {
  if (loading) {
    return (
      <div className={cn('flex items-center justify-center p-4', className)}>
        <LoadingSpinner className="mr-2" />
        <span className="text-sm text-muted-foreground">{loadingText}</span>
      </div>
    );
  }

  return <>{children}</>;
}