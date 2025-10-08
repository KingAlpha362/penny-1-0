
'use client';

import type { FC } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Transaction } from '@/lib/types';
import { useMemo } from 'react';
import { format } from 'date-fns';

interface SpendingChartProps {
  transactions: Transaction[];
}

const processChartData = (transactions: Transaction[]) => {
  const monthlyData: { [key: string]: { balance: number } } = {};

  let runningBalance = 0;
  
  const sortedTransactions = [...transactions].sort((a,b) => {
    const getDate = (d: string | Date | any) => {
      if (!d) {return 0;}
      if (typeof d === 'string') {return new Date(d).getTime();}
      if (d instanceof Date) {return d.getTime();}
      if (typeof d.toDate === 'function') {return d.toDate().getTime();}
      return 0;
    };

    const dateA = getDate(a.date);
    const dateB = getDate(b.date);
    if (dateA > dateB) {return 1;}
    if (dateA < dateB) {return -1;}
    return 0;
  });

  sortedTransactions.forEach((transaction) => {
    const getDateObj = (d: string | Date | any): Date | null => {
      if (!d) {return null;}
      if (typeof d === 'string') {return new Date(d);}
      if (d instanceof Date) {return d;}
      if (typeof d.toDate === 'function') {return d.toDate();}
      return null;
    };

    const transactionDate = getDateObj(transaction.date);
    if (!transactionDate) {return;}

    const month = format(transactionDate, 'MMM');
    if (transaction.type === 'income') {
      runningBalance += transaction.amount;
    } else {
      runningBalance -= transaction.amount;
    }
    monthlyData[month] = { balance: runningBalance };
  });

  const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const chartData: { name: string, balance: number }[] = [];
  
  monthOrder.forEach(month => {
    if (monthlyData[month]) {
      chartData.push({ name: month, balance: monthlyData[month].balance });
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
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
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
