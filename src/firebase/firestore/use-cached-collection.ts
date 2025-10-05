'use client';

import { useEffect, useState } from 'react';
import { Query, DocumentData, QuerySnapshot, onSnapshot } from 'firebase/firestore';

interface CacheEntry<T> {
  data: T[];
  timestamp: number;
  query: string;
}

const cache = new Map<string, CacheEntry<any>>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function generateQueryKey(query: Query<DocumentData>): string {
  // Use the query's path and Firestore query constraints to generate a key.
  // Since Firestore's Query object does not expose filters/orderBy/limit publicly,
  // you can use the query's toString() method (if available) or fallback to path.
  // This is a best-effort approach for caching.
  return query.toString ? query.toString() : JSON.stringify({ path: (query as any)._queryPath?.segments?.join('/') || '' });
}

function isCacheValid<T>(entry: CacheEntry<T>): boolean {
  return Date.now() - entry.timestamp < CACHE_TTL;
}

export function useCachedCollection<T = DocumentData>(query: Query<DocumentData> | null) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!query) {
      setData([]);
      setIsLoading(false);
      return;
    }

    const queryKey = generateQueryKey(query);
    const cachedData = cache.get(queryKey);

    // Use cached data if available and valid
    if (cachedData && isCacheValid(cachedData)) {
      setData(cachedData.data);
      setIsLoading(false);
    }

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(
      query,
      (snapshot: QuerySnapshot<DocumentData>) => {
        try {
          const items = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as T[];

          // Update cache
          cache.set(queryKey, {
            data: items,
            timestamp: Date.now(),
            query: queryKey
          });

          setData(items);
          setError(null);
        } catch (err) {
          console.error('Error processing Firestore data:', err);
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
  }, [query]);

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