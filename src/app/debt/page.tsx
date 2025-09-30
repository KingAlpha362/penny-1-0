
"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { debts as initialDebts, debtGoals } from "@/lib/data";
import { cn } from "@/lib/utils";
import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
};

const debtReductionData = [
  { name: 'Year 0', debt: 12500 },
  { name: 'Year 1', debt: 10625 },
  { name: 'Year 2', debt: 7500 },
  { name: 'Year 3', debt: 4000 },
];

type RepaymentStrategy = "snowball" | "avalanche" | "custom";

export default function DebtTrackerPage() {

    const [repaymentStrategy, setRepaymentStrategy] = useState<RepaymentStrategy>("snowball");

    const sortedDebts = useMemo(() => {
        const debtsCopy = [...initialDebts];
        if (repaymentStrategy === 'snowball') {
            return debtsCopy.sort((a, b) => a.balance - b.balance);
        } else if (repaymentStrategy === 'avalanche') {
            return debtsCopy.sort((a, b) => b.interestRate - a.interestRate);
        }
        return debtsCopy;
    }, [repaymentStrategy]);

    const totalDebt = initialDebts.reduce((acc, debt) => acc + debt.balance, 0);
    const minMonthlyPayment = initialDebts.reduce((acc, debt) => acc + debt.minPayment, 0);

  return (
    <div className="flex flex-col flex-1 bg-muted/40">
      <header className="flex items-center justify-between p-6 border-b bg-card">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">Debt Tracker</h2>
          <p className="text-muted-foreground mt-1">Manage and visualize your debt repayment progress.</p>
        </div>
      </header>
      <main className="flex-1 p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Debt</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{formatCurrency(totalDebt)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Minimum Monthly Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{formatCurrency(minMonthlyPayment)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Estimated Payoff Date</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">2y 6m</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Debt Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Debt Type</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead className="text-right">Interest Rate</TableHead>
                  <TableHead className="text-right">Min. Payment</TableHead>
                  <TableHead className="text-right">Payoff Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedDebts.map((debt) => (
                  <TableRow key={debt.id}>
                    <TableCell className="font-medium">{debt.type}</TableCell>
                    <TableCell className="text-right">{formatCurrency(debt.balance)}</TableCell>
                    <TableCell className="text-right">{debt.interestRate.toFixed(1)}%</TableCell>
                    <TableCell className="text-right">{formatCurrency(debt.minPayment)}</TableCell>
                    <TableCell className="text-right">{debt.payoffDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Repayment Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-3">
                        <label className="flex-1 cursor-pointer">
                            <input 
                                checked={repaymentStrategy === 'snowball'} 
                                className="sr-only peer" 
                                name="repayment_strategy" 
                                type="radio"
                                value="snowball"
                                onChange={(e) => setRepaymentStrategy(e.target.value as RepaymentStrategy)}
                            />
                            <div className="text-center py-3 px-4 rounded-lg border border-border peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary peer-checked:bg-primary/10 transition-all">
                                Snowball
                            </div>
                        </label>
                        <label className="flex-1 cursor-pointer">
                             <input 
                                checked={repaymentStrategy === 'avalanche'} 
                                className="sr-only peer" 
                                name="repayment_strategy" 
                                type="radio"
                                value="avalanche"
                                onChange={(e) => setRepaymentStrategy(e.target.value as RepaymentStrategy)}
                            />
                            <div className="text-center py-3 px-4 rounded-lg border border-border peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary peer-checked:bg-primary/10 transition-all">
                                Avalanche
                            </div>
                        </label>
                        <label className="flex-1 cursor-pointer">
                            <input 
                                checked={repaymentStrategy === 'custom'} 
                                className="sr-only peer" 
                                name="repayment_strategy" 
                                type="radio"
                                value="custom"
                                onChange={(e) => setRepaymentStrategy(e.target.value as RepaymentStrategy)}
                            />
                            <div className="text-center py-3 px-4 rounded-lg border border-border peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary peer-checked:bg-primary/10 transition-all">
                                Custom
                            </div>
                        </label>
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>Debt Reduction Progress</CardTitle>
                            <p className="text-sm text-muted-foreground">Next 3 years</p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold">{formatCurrency(totalDebt)}</p>
                            <p className="text-sm font-medium text-destructive">-15% this year</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={debtReductionData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => formatCurrency(value as number)} />
                            <Tooltip formatter={(value) => formatCurrency(value as number)} />
                            <Line type="monotone" dataKey="debt" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>

         <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4 font-headline">Debt Reduction Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {debtGoals.map((goal) => (
              <Card key={goal.id}>
                <CardContent className="p-6">
                    <h3 className="text-lg font-bold">{goal.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">Target date: {goal.targetDate}</p>
                    <div className="mt-4">
                        <div className="flex justify-between mb-1">
                            <span className="text-xs font-medium text-muted-foreground">{(goal.currentAmount / goal.totalAmount * 100).toFixed(0)}% Complete</span>
                             <span className="text-xs font-medium text-muted-foreground">
                                {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.totalAmount)}
                            </span>
                        </div>
                        <Progress value={(goal.currentAmount / goal.totalAmount) * 100} />
                    </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
