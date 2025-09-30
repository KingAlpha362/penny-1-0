
'use client';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Skeleton} from '@/components/ui/skeleton';
import type {Transaction} from '@/lib/data';
import {Lightbulb} from 'lucide-react';
import {useEffect, useState, useTransition} from 'react';

interface FinancialTipClientProps {
  transactions: Transaction[];
  income: number;
  expenses: number;
}

export default function FinancialTipClient({
  transactions,
  income,
  expenses,
}: FinancialTipClientProps) {
  const [tip, setTip] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const response = await fetch('/api/financial-tip', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({transactions, income, expenses}),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch tip');
        }
        const data = await response.json();
        setTip(
          data.tip ||
            'Start tracking your expenses to find savings opportunities!'
        );
      } catch (error) {
        console.error('Error fetching financial tip:', error);
        setTip('Start tracking your expenses to find savings opportunities!');
      }
    });
  }, [transactions, income, expenses]);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <Lightbulb className="w-6 h-6 text-primary" />
        <CardTitle className="font-headline">Personalized Tip</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {isPending ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : (
          <p className="text-muted-foreground leading-relaxed">{tip}</p>
        )}
      </CardContent>
    </Card>
  );
}
