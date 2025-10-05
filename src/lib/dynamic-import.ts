'use client';

import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@/components/ui/loading';

interface DynamicImportProps {
  loading?: React.ReactNode;
}

export function createDynamicComponent<T>(
  importFunc: () => Promise<{ default: React.ComponentType<T> }>,
  options: DynamicImportProps = {}
) {
  return dynamic(importFunc, {
    loading: () => (
      <div className="flex items-center justify-center p-4">
        {options.loading || <LoadingSpinner />}
      </div>
    ),
  });
}