
'use client';

import AuthenticatedPage from '@/components/AuthenticatedPage';
import type { FC } from 'react';
import React, { useState, useMemo, useEffect } from 'react';
import { financialApi } from '@/services/financial-api';
import { Header } from '@/components/pennywise/header';
import { OverviewCards } from '@/components/pennywise/overview-cards';
import { SpendingChart } from '@/components/pennywise/spending-chart';
import { AddTransactionDialog } from '@/components/pennywise/add-transaction-dialog';
import { RecentTransactions } from '@/components/pennywise/recent-transactions';
import { DashboardCharts } from '@/components/pennywise/dashboard-charts';
import { DashboardSkeleton } from '@/components/pennywise/dashboard-skeleton';
import { InvestmentAnalysis } from '@/components/pennywise/investment-analysis';
import { useUser, useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking } from '@/firebase';
import { collection, serverTimestamp, query, orderBy, limit } from 'firebase/firestore';
import type { Transaction } from '@/app/lib/types';
import { transactionSchema } from '@/lib/validations';
import { z } from 'zod';


const DashboardPage: FC = () => {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [isAddTransactionOpen, setAddTransactionOpen] = useState(false);

  const transactionsQuery = useMemoFirebase(() => {
    if (!firestore || !user?.uid) {return null;}
    return query(
      collection(firestore, `users/${user.uid}/transactions`), 
      orderBy('date', 'desc'), 
      limit(100)
    );
  }, [firestore, user?.uid]);

  const { data: rawTransactions, isLoading: isTransactionsLoading } = useCollection<Transaction>(transactionsQuery);
  
  // Validate transactions at runtime
  const transactions = useMemo(() => {
    if (!rawTransactions) {return [];}
    return rawTransactions.filter(transaction => {
      try {
        // Omit id and userId before validation since they're added after schema
        const { id, userId, ...transactionData } = transaction;
        transactionSchema.parse(transactionData);
        return true;
      } catch (error) {
        console.error('Invalid transaction data:', error);
        return false;
      }
    });
  }, [rawTransactions]);

  const { income, expenses, balance } = useMemo(() => {
    if (!transactions) {return { income: 0, expenses: 0, balance: 0 };}
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
    const balance = income - expenses;
    return { income, expenses, balance };
  }, [transactions]);
  
  const handleAddTransaction = (newTransaction: z.infer<typeof transactionSchema>) => {
    if (!firestore || !user?.uid) {return;}
    
    const transactionRef = collection(firestore, `users/${user.uid}/transactions`);
    addDocumentNonBlocking(transactionRef, {
      ...newTransaction,
      userId: user.uid,
      date: serverTimestamp(), // Use server timestamp for consistency
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  };

  // Fetch real-time investment data
  const [investments, setInvestments] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchInvestmentData = async () => {
      const symbols = ['BTC', 'AAPL', 'TSLA', 'GOOGL', 'AMZN'];
      try {
        const results = await Promise.all(
          symbols.map(async (symbol) => {
            try {
              const marketData = symbol === 'BTC' 
                ? await financialApi.getCryptoData(symbol)
                : await financialApi.getMarketData(symbol);
              return {
                ...marketData,
                symbol
              };
            } catch (error) {
              console.error(`Error fetching data for ${symbol}:`, error);
              // Return a placeholder object for failed fetches
              return {
                symbol,
                price: 0,
                change: 0,
                changePercent: 0,
                volume: 0,
                marketCap: 0,
                error: true
              };
            }
          })
        );
        setInvestments(results);
      } catch (error) {
        console.error('Error fetching investment data:', error);
        setInvestments([]);
      }
    };

    fetchInvestmentData();
    // Refresh data every 5 minutes
    const interval = setInterval(fetchInvestmentData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

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
              <RecentTransactions 
                transactions={transactions.map(t => ({
                  ...t,
                  description: t.description || 'Untitled Transaction'
                }))} 
                isLoading={isTransactionsLoading}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DashboardCharts />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Investment Analytics</h2>
            <InvestmentAnalysis investments={investments} />
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
