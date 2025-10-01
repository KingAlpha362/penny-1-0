
"use client";

import type { FC } from "react";
import React, { useState, useMemo, useEffect } from "react";
import { Header } from "@/components/pennywise/header";
import { OverviewCards } from "@/components/pennywise/overview-cards";
import { SpendingChart } from "@/components/pennywise/spending-chart";
import { transactions as initialTransactions, Transaction } from "@/lib/data";
import { AddTransactionDialog } from "@/components/pennywise/add-transaction-dialog";
import { RecentTransactions } from "@/components/pennywise/recent-transactions";
import { DashboardSkeleton } from "@/components/pennywise/dashboard-skeleton";


const DashboardPage: FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isAddTransactionOpen, setAddTransactionOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTransactions(initialTransactions);
      setLoading(false);
    }, 1500); // Simulate a 1.5 second loading time
    return () => clearTimeout(timer);
  }, []);

  const { income, expenses, balance } = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);
    const balance = income - expenses;
    return { income, expenses, balance };
  }, [transactions]);
  
  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    setTransactions(prev => [
        { ...newTransaction, id: crypto.randomUUID() }, 
        ...prev
    ]);
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="flex flex-col flex-1 bg-background">
      <Header onAddTransaction={() => setAddTransactionOpen(true)} />
      <main className="flex-1 space-y-6 p-6">
        <OverviewCards income={income} expenses={expenses} balance={balance} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SpendingChart transactions={transactions} />
          </div>
          <div className="lg:col-span-1">
            <RecentTransactions transactions={transactions} />
          </div>
        </div>
      </main>
      <AddTransactionDialog 
        isOpen={isAddTransactionOpen}
        onOpenChange={setAddTransactionOpen}
        onTransactionAdded={handleAddTransaction}
      />
    </div>
  );
};

export default DashboardPage;
