
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { DashboardSkeleton } from './pennywise/dashboard-skeleton';
import { ErrorBoundary } from './error-boundary';

export default function AuthenticatedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading, userError } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  if (userError) {
    throw userError;
  }

  if (isUserLoading) {
    return <DashboardSkeleton />;
  }

  return <ErrorBoundary>{children}</ErrorBoundary>;
}
