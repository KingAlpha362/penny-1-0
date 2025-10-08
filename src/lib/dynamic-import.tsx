'use client';

import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@/components/ui/loading';
import type { ComponentType, ReactNode } from 'react';

interface DynamicImportProps {
  loading?: ReactNode;
}

export function createDynamicComponent<T extends object>(
  importFunc: () => Promise<{ default: ComponentType<T> }>,
  options: DynamicImportProps = {}
) {
  return dynamic(() => importFunc(), {
    loading: () => (
      <div className="flex items-center justify-center p-4">
        {options?.loading || <LoadingSpinner />}
      </div>
    ),
    ssr: false
  });
}