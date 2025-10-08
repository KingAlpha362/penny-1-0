
'use client';

import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  ChevronDown,
  PlusCircle,
  Search,
} from 'lucide-react';
import { transactionCategories } from '@/lib/data';
import { AddTransactionDialog } from '@/components/pennywise/add-transaction-dialog';
import { cn } from '@/lib/utils';
import { transactionSchema } from '@/lib/validations';
import type { z } from 'zod';
import { useUser, useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking } from '@/firebase';
import { collection, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { format } from 'date-fns';
import type { Transaction } from '@/lib/types';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
};

const formatDate = (timestamp: any) => {
  if (timestamp && typeof timestamp.toDate === 'function') {
    return format(timestamp.toDate(), 'MMM dd, yyyy');
  }
  // Fallback for strings or other types
  if (typeof timestamp === 'string') {
    return format(new Date(timestamp), 'MMM dd, yyyy');
  }
  return 'Invalid date';
};

export default function TransactionsPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const [isAddTransactionOpen, setAddTransactionOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const transactionsQuery = useMemoFirebase(() => {
    if (!firestore || !user?.uid) {return null;}
    return query(
      collection(firestore, `users/${user.uid}/transactions`),
      orderBy('date', sortOrder as 'desc' | 'asc')
    );
  }, [firestore, user?.uid, sortOrder]);
  
  const { data: transactions, isLoading } = useCollection<Transaction>(transactionsQuery);

  type TransactionForm = z.infer<typeof transactionSchema>;

  const handleAddTransaction = (newTransaction: Omit<TransactionForm, 'id' | 'userId'> & Partial<Pick<TransactionForm, 'date'>>) => {
    if (!firestore || !user?.uid) {return;}
    
    const transactionRef = collection(firestore, `users/${user.uid}/transactions`);
    addDocumentNonBlocking(transactionRef, {
      ...newTransaction,
      userId: user.uid,
      date: serverTimestamp()
    });
  };
  
  const filteredTransactions = useMemo(() => {
    if (!transactions) {return [];}

    let filtered = [...transactions];

  if (searchTerm) {
    filtered = filtered.filter(t => (t.description ?? '').toLowerCase().includes(searchTerm.toLowerCase()));
  }

    if (categoryFilter !== 'all') {
        filtered = filtered.filter(t => t.category === categoryFilter);
    }

    if (typeFilter !== 'all') {
        filtered = filtered.filter(t => t.type === typeFilter);
    }
    
    return filtered;

  }, [transactions, searchTerm, categoryFilter, typeFilter]);


  return (
    <div className="flex flex-col flex-1">
       <header className="flex items-center justify-between p-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">Transactions</h2>
          <p className="text-muted-foreground mt-1">
            View and manage your transactions.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={() => setAddTransactionOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Transaction
          </Button>
        </div>
      </header>
      <main className="flex-1 space-y-6 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
              A list of all your recent transactions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
              <div className="relative w-full md:flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex gap-2">
                      Date <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
                        <DropdownMenuRadioItem value="desc">Newest</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="asc">Oldest</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex gap-2">
                      Category <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuRadioGroup value={categoryFilter} onValueChange={setCategoryFilter}>
                        <DropdownMenuLabel>Categories</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                        {transactionCategories.map(cat => (
                            <DropdownMenuRadioItem key={cat} value={cat}>{cat}</DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex gap-2">
                      Type <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     <DropdownMenuRadioGroup value={typeFilter} onValueChange={setTypeFilter}>
                        <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="income">Income</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="expense">Expense</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">Loading transactions...</TableCell>
                  </TableRow>
                ) : filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {formatDate(transaction.date)}
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{transaction.category}</Badge>
                      </TableCell>
                       <TableCell>
                        <Badge variant={transaction.type === 'income' ? 'secondary' : 'destructive'} className={cn(transaction.type === 'income' && 'bg-success/10 text-success border-transparent', transaction.type === 'expense' && 'bg-destructive/10 text-destructive border-transparent' )}>
                          {transaction.type}
                        </Badge>
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
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">No transactions found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
       <AddTransactionDialog 
        isOpen={isAddTransactionOpen}
        onOpenChange={setAddTransactionOpen}
        onTransactionAdded={handleAddTransaction}
      />
    </div>
  );
}
