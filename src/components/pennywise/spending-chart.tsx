
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
  const monthlyData: { [key: string]: { balance: number } } = {};

  let runningBalance = 0;
  // Assuming transactions are sorted by date
  const sortedTransactions = [...transactions].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  sortedTransactions.forEach((transaction) => {
    const month = new Date(transaction.date).toLocaleString('default', { month: 'short' });
    if (transaction.type === "income") {
      runningBalance += transaction.amount;
    } else {
      runningBalance -= transaction.amount;
    }
    monthlyData[month] = { balance: runningBalance };
  });

  const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const chartData: { name: string, balance: number }[] = [];
  let lastKnownBalance = 0;

  monthOrder.forEach(month => {
    if (monthlyData[month]) {
      chartData.push({ name: month, balance: monthlyData[month].balance });
      lastKnownBalance = monthlyData[month].balance;
    } else {
      // If no data for a month, you could either carry over the last balance or show a gap
      // chartData.push({ name: month, balance: lastKnownBalance });
    }
  });

  return chartData;
};

export const SpendingChart: FC<SpendingChartProps> = ({ transactions }) => {
  const chartData = useMemo(() => processChartData(transactions), [transactions]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Balance History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
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
                tickFormatter={(value) => `$${Number(value).toLocaleString()}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Balance']}
              />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="hsl(var(--primary))"
                fill="url(#colorBalance)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
