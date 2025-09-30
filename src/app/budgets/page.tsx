
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { budgets as initialBudgets, transactions } from "@/lib/data";
import { BudgetCard } from "@/components/pennywise/budget-card";
import { AddBudgetCard } from "@/components/pennywise/add-budget-card";
import { CreateBudgetForm } from "@/components/pennywise/create-budget-form";
import { BudgetForecast } from "@/components/pennywise/budget-forecast";

export type Budget = {
  id: string;
  category: string;
  amount: number;
};

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState(initialBudgets);

  const handleCreateBudget = (newBudget: Omit<Budget, 'id'>) => {
    setBudgets(prev => [...prev, { ...newBudget, id: crypto.randomUUID() }]);
  };

  const getSpentAmount = (category: string) => {
    return transactions
      .filter(t => t.category === category && t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
  };
  
  return (
    <div className="flex flex-col flex-1 bg-muted/40">
       <header className="flex items-center justify-between p-6 border-b bg-card">
        <div>
          <h2 className="text-2xl font-bold font-headline">Budgets & Forecasting</h2>
          <p className="text-muted-foreground">
            Set and manage your spending limits.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Budget
          </Button>
        </div>
      </header>
      <main className="flex-1 space-y-8 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {budgets.map(budget => (
                <BudgetCard 
                  key={budget.id}
                  budget={budget}
                  spent={getSpentAmount(budget.category)}
                />
              ))}
               <AddBudgetCard />
            </div>
            <div className="lg:col-span-1">
              <BudgetForecast budgets={budgets} transactions={transactions} />
            </div>
        </div>
        <div>
          <CreateBudgetForm onCreateBudget={handleCreateBudget} />
        </div>
      </main>
    </div>
  );
}
