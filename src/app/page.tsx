
"use client";

import type { FC } from "react";
import React, { useState, useMemo } from "react";
import { Header } from "@/components/pennywise/header";
import { OverviewCards } from "@/components/pennywise/overview-cards";
import { SpendingChart } from "@/components/pennywise/spending-chart";
import { transactions as initialTransactions, Transaction } from "@/lib/data";
import { AddTransactionDialog } from "@/components/pennywise/add-transaction-dialog";

const DashboardPage: FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [isAddTransactionOpen, setAddTransactionOpen] = useState(false);

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

  return (
    <div className="flex flex-col flex-1 bg-background">
      <Header onAddTransaction={() => setAddTransactionOpen(true)} />
      <main className="flex-1 space-y-6 p-6">
        <OverviewCards balance={balance} />
        <div className="grid grid-cols-1">
          <SpendingChart transactions={transactions} />
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
