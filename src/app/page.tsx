
"use client";

import type { FC } from "react";
import React, { useState, useMemo } from "react";
import { Header } from "@/components/pennywise/header";
import { OverviewCards } from "@/components/pennywise/overview-cards";
import { SpendingChart } from "@/components/pennywise/spending-chart";
import { RecentTransactions } from "@/components/pennywise/recent-transactions";
import FinancialTip from "@/components/pennywise/financial-tip";
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
    <div className="flex flex-col flex-1 bg-muted/40">
      <Header onAddTransaction={() => setAddTransactionOpen(true)} balance={balance} />
      <main className="flex-1 space-y-6 p-6">
        <OverviewCards income={income} expenses={expenses} balance={balance} />
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          <div className="xl:col-span-3">
            <SpendingChart transactions={transactions} />
          </div>
          <div className="xl:col-span-2">
            <FinancialTip transactions={transactions} income={income} expenses={expenses} />
          </div>
        </div>
        <RecentTransactions transactions={transactions} />
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
