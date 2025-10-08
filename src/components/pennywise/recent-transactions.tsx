
import type { FC } from 'react';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { transactionSchema } from '@/lib/validations';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Transaction } from '@/app/lib/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

type ValidatedTransaction = z.infer<typeof transactionSchema> & { id: string };

interface RecentTransactionsProps {
  transactions: ValidatedTransaction[];
  isLoading?: boolean;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
};

const formatDate = (timestamp: Date | string) => {
  try {
    if (typeof timestamp === 'string') {
      return format(new Date(timestamp), 'MMM dd, yyyy');
    }
    return format(timestamp, 'MMM dd, yyyy');
  } catch (error) {
    console.error('Invalid date format:', error);
    return 'Invalid date';
  }
};

export const RecentTransactions: FC<RecentTransactionsProps> = ({ transactions: rawTransactions, isLoading }) => {
  // Validate transactions at runtime
  const transactions = rawTransactions.filter(transaction => {
    try {
      // Omit id before validation since it's added after schema
      const { id, ...transactionData } = transaction;
      transactionSchema.parse(transactionData);
      return true;
    } catch (error) {
      console.error('Invalid transaction data:', error);
      return false;
    }
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <>
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={`loading-${index}`}>
                    <TableCell><div className="h-4 w-24 bg-muted rounded animate-pulse" /></TableCell>
                    <TableCell><div className="h-4 w-32 bg-muted rounded animate-pulse" /></TableCell>
                    <TableCell><div className="h-4 w-20 bg-muted rounded animate-pulse" /></TableCell>
                    <TableCell><div className="h-4 w-16 bg-muted rounded animate-pulse ml-auto" /></TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              transactions.slice(0, 5).map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{formatDate(transaction.date)}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{transaction.category}</Badge>
                  </TableCell>
                  <TableCell
                    className={cn(
                      'text-right font-semibold',
                      transaction.type === 'income'
                        ? 'text-success'
                        : 'text-destructive'
                    )}
                  >
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
