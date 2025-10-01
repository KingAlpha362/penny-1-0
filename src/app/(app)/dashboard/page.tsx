
'use client';

import AuthenticatedPage from '@/components/AuthenticatedPage';
import type { FC } from "react";
import React, { useState, useMemo } from "react";
import { Header } from "@/components/pennywise/header";
import { OverviewCards } from "@/components/pennywise/overview-cards";
import { SpendingChart } from "@/components/pennywise/spending-chart";
import { AddTransactionDialog } from "@/components/pennywise/add-transaction-dialog";
import { RecentTransactions } from "@/components/pennywise/recent-transactions";
import { DashboardSkeleton } from "@/components/pennywise/dashboard-skeleton";
import { useUser, useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking } from '@/firebase';
import { collection, serverTimestamp, query, orderBy, limit } from 'firebase/firestore';
import type { Transaction } from '@/lib/types';


const DashboardPage: FC = () => {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [isAddTransactionOpen, setAddTransactionOpen] = useState(false);

  const transactionsQuery = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return query(
      collection(firestore, `users/${user.uid}/transactions`), 
      orderBy('date', 'desc'), 
      limit(100)
    );
  }, [firestore, user?.uid]);

  const { data: transactions, isLoading: isTransactionsLoading } = useCollection<Transaction>(transactionsQuery);

  const { income, expenses, balance } = useMemo(() => {
    if (!transactions) return { income: 0, expenses: 0, balance: 0 };
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);
    const balance = income - expenses;
    return { income, expenses, balance };
  }, [transactions]);
  
  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id' | 'userId'>) => {
    if (!firestore || !user?.uid) return;
    
    const transactionRef = collection(firestore, `users/${user.uid}/transactions`);
    addDocumentNonBlocking(transactionRef, {
      ...newTransaction,
      userId: user.uid,
      date: serverTimestamp() // Use server timestamp for consistency
    });
  };

  const loading = isUserLoading || isTransactionsLoading;

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <AuthenticatedPage>
      <div className="flex flex-col flex-1 bg-background">
        <Header onAddTransaction={() => setAddTransactionOpen(true)} />
        <main className="flex-1 space-y-6 p-6">
          <OverviewCards income={income} expenses={expenses} balance={balance} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SpendingChart transactions={transactions || []} />
            </div>
            <div className="lg:col-span-1">
              <RecentTransactions transactions={transactions || []} />
            </div>
          </div>
        </main>
        <AddTransactionDialog 
          isOpen={isAddTransactionOpen}
          onOpenChange={setAddTransactionOpen}
          onTransactionAdded={handleAddTransaction}
        />
      </div>
    </AuthenticatedPage>
  );
};

export default DashboardPage;
