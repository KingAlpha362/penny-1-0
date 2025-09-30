
"use client";

import type { FC } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Transaction } from "@/lib/data";
import { useMemo } from "react";

interface SpendingChartProps {
  transactions: Transaction[];
}

const processChartData = (transactions: Transaction[]) => {
  const monthlyData: { [key: string]: { income: number; expenses: number } } = {};

  transactions.forEach((transaction) => {
    const month = new Date(transaction.date).toLocaleString('default', { month: 'short' });
    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expenses: 0 };
    }
    if (transaction.type === "income") {
      monthlyData[month].income += transaction.amount;
    } else {
      monthlyData[month].expenses += transaction.amount;
    }
  });

  const sortedMonths = Object.keys(monthlyData).sort((a, b) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months.indexOf(a) - months.indexOf(b);
  });

  return sortedMonths.map(month => ({
    name: month,
    income: monthlyData[month].income,
    expenses: monthlyData[month].expenses,
  }));
};

export const SpendingChart: FC<SpendingChartProps> = ({ transactions }) => {
  const chartData = useMemo(() => processChartData(transactions), [transactions]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Income vs Expenses Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Area
                type="monotone"
                dataKey="income"
                stroke="hsl(var(--success))"
                fill="url(#colorIncome)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="hsl(var(--destructive))"
                fill="url(#colorExpenses)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
