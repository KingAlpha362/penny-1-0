'use client';

import { cn } from '@/lib/utils';

interface SkeletonLoaderProps {
  className?: string;
  rows?: number;
  animate?: boolean;
}

export function SkeletonLoader({ className, rows = 1, animate = true }: SkeletonLoaderProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-4 bg-muted rounded',
            animate && 'animate-pulse',
            i === rows - 1 && rows > 1 && 'w-4/5'
          )}
        />
      ))}
    </div>
  );
}

interface ContentLoaderProps {
  className?: string;
  isLoading: boolean;
  loadingRows?: number;
  children: React.ReactNode;
  showLoadingText?: boolean;
  loadingText?: string;
}

export function ContentLoader({
  className,
  isLoading,
  loadingRows = 3,
  children,
  showLoadingText = false,
  loadingText = 'Loading...'
}: ContentLoaderProps) {
  if (isLoading) {
    return (
      <div className={className}>
        <SkeletonLoader rows={loadingRows} />
        {showLoadingText && (
          <p className="text-sm text-muted-foreground mt-2">{loadingText}</p>
        )}
      </div>
    );
  }

  return <>{children}</>;
}