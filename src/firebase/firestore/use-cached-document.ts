'use client';

import { useEffect, useState } from 'react';
import { DocumentReference, DocumentData, DocumentSnapshot, onSnapshot } from 'firebase/firestore';

interface CacheEntry<T> {
  data: T | null;
  timestamp: number;
  path: string;
}

const cache = new Map<string, CacheEntry<any>>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function generateDocKey(docRef: DocumentReference<DocumentData>): string {
  return docRef.path;
}

function isCacheValid<T>(entry: CacheEntry<T>): boolean {
  return Date.now() - entry.timestamp < CACHE_TTL;
}

export function useCachedDocument<T = DocumentData>(docRef: DocumentReference<DocumentData> | null) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!docRef) {
      setData(null);
      setIsLoading(false);
      return;
    }

    const docKey = generateDocKey(docRef);
    const cachedData = cache.get(docKey);

    // Use cached data if available and valid
    if (cachedData && isCacheValid(cachedData)) {
      setData(cachedData.data);
      setIsLoading(false);
    }

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot: DocumentSnapshot<DocumentData>) => {
        try {
          const item = snapshot.exists()
            ? { id: snapshot.id, ...snapshot.data() } as T
            : null;

          // Update cache
          cache.set(docKey, {
            data: item,
            timestamp: Date.now(),
            path: docKey
          });

          setData(item);
          setError(null);
        } catch (err) {
          console.error('Error processing Firestore document:', err);
          setError(err instanceof Error ? err : new Error('Unknown error'));
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        console.error('Firestore subscription error:', err);
        setError(err);
        setIsLoading(false);
      }
    );

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, [docRef]);

  return { data, isLoading, error };
}

// Cache maintenance - remove expired entries periodically
setInterval(() => {
  for (const [key, entry] of cache.entries()) {
    if (!isCacheValid(entry)) {
      cache.delete(key);
    }
  }
}, CACHE_TTL);