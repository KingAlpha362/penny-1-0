
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { BudgetCard } from '@/components/pennywise/budget-card';
import { AddBudgetCard } from '@/components/pennywise/add-budget-card';
import { CreateBudgetDialog } from '@/components/pennywise/create-budget-dialog';
import { BudgetForecast } from '@/components/pennywise/budget-forecast';
import { useUser, useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking } from '@/firebase';
import { collection, query, serverTimestamp } from 'firebase/firestore';
import type { Transaction } from '@/lib/types';

export type Budget = {
  id: string;
  category: string;
  limit: number;
  userId: string;
};

export default function BudgetsPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const [isCreateBudgetOpen, setCreateBudgetOpen] = useState(false);

  const budgetsQuery = useMemoFirebase(() => {
    if (!firestore || !user?.uid) {return null;}
    return query(collection(firestore, `users/${user.uid}/budgets`));
  }, [firestore, user?.uid]);

  const { data: budgets, isLoading: isBudgetsLoading } = useCollection<Budget>(budgetsQuery);

  const transactionsQuery = useMemoFirebase(() => {
    if (!firestore || !user?.uid) {return null;}
    return query(collection(firestore, `users/${user.uid}/transactions`));
  }, [firestore, user?.uid]);

  const { data: transactions, isLoading: isTransactionsLoading } = useCollection<Transaction>(transactionsQuery);

  const handleCreateBudget = (newBudget: Omit<Budget, 'id' | 'userId'>) => {
    if (!firestore || !user?.uid) {return;}
    const budgetRef = collection(firestore, `users/${user.uid}/budgets`);
    addDocumentNonBlocking(budgetRef, {
      ...newBudget,
      userId: user.uid,
    });
  };

  const getSpentAmount = (category: string) => {
    if (!transactions) {return 0;}
    return transactions
      .filter(t => t.category === category && t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
  };
  
  const isLoading = isBudgetsLoading || isTransactionsLoading;
  
  return (
    <div className="flex flex-col flex-1">
       <header className="flex items-center justify-between p-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">Budgets & Forecasting</h2>
          <p className="text-muted-foreground mt-1">
            Set and manage your spending limits.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={() => setCreateBudgetOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Budget
          </Button>
        </div>
      </header>
      <main className="flex-1 space-y-8 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {isLoading && (
                <>
                  <BudgetCard.Skeleton />
                  <BudgetCard.Skeleton />
                  <BudgetCard.Skeleton />
                </>
              )}
              {budgets && budgets.map(budget => (
                <BudgetCard 
                  key={budget.id}
                  budget={budget}
                  spent={getSpentAmount(budget.category)}
                />
              ))}
               <AddBudgetCard onClick={() => setCreateBudgetOpen(true)} />
            </div>
            <div className="lg:col-span-1">
              <BudgetForecast budgets={budgets || []} transactions={transactions || []} />
            </div>
        </div>
        <CreateBudgetDialog
            isOpen={isCreateBudgetOpen}
            onOpenChange={setCreateBudgetOpen}
            onCreateBudget={handleCreateBudget}
        />
      </main>
    </div>
  );
}
