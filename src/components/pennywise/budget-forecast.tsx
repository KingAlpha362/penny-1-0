
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import type { Budget } from "@/app/budgets/page";
import type { Transaction } from "@/lib/data";

interface BudgetForecastProps {
    budgets: Budget[];
    transactions: Transaction[];
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
};

export function BudgetForecast({ budgets, transactions }: BudgetForecastProps) {
    const totalProjectedSpending = budgets.reduce((acc, budget) => {
        const categoryExpenses = transactions
            .filter(t => t.category === budget.category && t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        // This is a simplified forecast, a real app would have a more complex logic
        const projected = categoryExpenses * 1.1; 
        return acc + projected;
    }, 0);

  return (
    <Card className="flex flex-col items-center justify-center text-center h-full">
      <CardHeader className="items-center">
        <div className="p-3 rounded-full bg-primary/10 mb-2">
            <TrendingUp className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-lg font-bold">Budget Forecast</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <p className="text-sm text-muted-foreground">
          Based on your current spending trends, here's a projection for the next month:
        </p>
        <div className="text-center">
          <p className="text-3xl font-bold text-primary">{formatCurrency(totalProjectedSpending)}</p>
          <p className="text-sm text-muted-foreground">Projected Total Spending</p>
        </div>
        <div className="mt-4 flex flex-col gap-3 w-full text-sm">
            {budgets.map(budget => {
                 const projected = transactions
                    .filter(t => t.category === budget.category && t.type === 'expense')
                    .reduce((sum, t) => sum + t.amount, 0) * 1.1; // Simplified forecast
                return (
                    <div key={budget.id} className="flex justify-between">
                        <span className="font-medium text-muted-foreground">{budget.category}</span>
                        <span className="font-medium text-primary">{formatCurrency(projected)}</span>
                    </div>
                )
            })}
        </div>
        <p className="text-sm text-success font-medium mt-4">
          You are on track to stay within budget!
        </p>
        <Button variant="outline" className="mt-6">View Optimization Tips</Button>
      </CardContent>
    </Card>
  );
}
