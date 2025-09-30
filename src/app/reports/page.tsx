
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { transactions, budgets } from "@/lib/data";

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
};

export default function ReportsPage() {
    
    const spendingByCategoryData = budgets.map(budget => {
        const spent = transactions
            .filter(t => t.category === budget.category && t.type === 'expense')
            .reduce((acc, t) => acc + t.amount, 0);
        return {
            name: budget.category,
            spent,
            budget: budget.amount,
        }
    });

  return (
    <div className="flex flex-col flex-1 bg-muted/40">
       <header className="flex items-center justify-between p-6 border-b bg-card">
        <div>
          <h2 className="text-2xl font-bold font-headline">Reports</h2>
          <p className="text-muted-foreground">
            Analyze your spending and financial trends.
          </p>
        </div>
      </header>
      <main className="flex-1 space-y-8 p-6">
        <Card>
            <CardHeader>
                <CardTitle>Spending vs Budget by Category</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={spendingByCategoryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => formatCurrency(Number(value))}/>
                        <Tooltip formatter={(value) => formatCurrency(Number(value))}/>
                        <Legend />
                        <Bar dataKey="spent" fill="hsl(var(--destructive))" name="Spent" />
                        <Bar dataKey="budget" fill="hsl(var(--primary))" name="Budget" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">More detailed reports and visualizations are coming soon to help you gain deeper insights into your finances!</p>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
