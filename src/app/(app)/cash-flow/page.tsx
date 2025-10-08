

'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Calendar as CalendarIcon,
  Receipt,
  ShoppingCart,
  Home,
  HelpCircle,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { transactions } from '@/lib/data';
import Link from 'next/link';
import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export default function CashFlowPage() {
  const { income, expenses, balance } = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
    const balance = income - expenses;
    return { income, expenses, balance };
  }, []);

  const safeToSpend = balance * 0.4; // Simplified calculation

  const cashFlowData = useMemo(() => {
    const data: { [key: string]: number } = {};
    transactions.forEach(t => {
      const month = new Date(t.date).toLocaleString('default', {
        month: 'short',
      });
      if (!data[month]) {data[month] = 0;}
      data[month] += t.type === 'income' ? t.amount : -t.amount;
    });

    let accumulatedFlow = 0;
    return Object.entries(data)
      .sort(
        (a, b) =>
          new Date(Date.parse(a[0] + ' 1, 2022')).getTime() -
          new Date(Date.parse(b[0] + ' 1, 2022')).getTime()
      )
      .map(([name, value]) => {
        accumulatedFlow += value;
        return { name, netFlow: accumulatedFlow };
      });
  }, []);

  const spendingBreakdown = useMemo(() => {
    const categorySpending: { [key: string]: number } = {};
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        if (!categorySpending[t.category]) {
          categorySpending[t.category] = 0;
        }
        categorySpending[t.category] += t.amount;
      });
    return Object.entries(categorySpending).map(([name, value]) => ({
      name,
      value,
    }));
  }, []);

  const upcomingBills = [
    {
      icon: Receipt,
      name: 'Electricity Bill',
      dueDate: 'July 25th',
      amount: -150.0,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      date: new Date(2024, 6, 25)
    },
    {
      icon: ShoppingCart,
      name: 'Groceries',
      dueDate: 'July 28th',
      amount: -200.0,
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      date: new Date(2024, 6, 28)
    },
    {
      icon: Home,
      name: 'Rent Payment',
      dueDate: 'August 1st',
      amount: -800.0,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-500/10',
      date: new Date(2024, 7, 1)
    },
    {
      icon: TrendingUp,
      name: 'Payday',
      dueDate: 'August 1st',
      amount: 2500.0,
      iconColor: 'text-success',
      bgColor: 'bg-success/10',
      date: new Date(2024, 7, 1)
    }
  ];

  return (
    <div className="flex flex-col flex-1">
      <header className="flex items-center justify-between p-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">Cash Flow</h2>
          <p className="text-muted-foreground mt-1">
            An overview of your financial health.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <HelpCircle className="mr-2 h-4 w-4" /> Help
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Income</CardTitle>
              <TrendingUp className="h-5 w-5 text-success" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-success">
                {formatCurrency(income)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Expenses</CardTitle>
              <TrendingDown className="h-5 w-5 text-destructive" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-destructive">
                {formatCurrency(expenses)}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-primary/10 border-primary/20 col-span-1 md:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-primary">Safe to Spend</CardTitle>
              <Wallet className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(safeToSpend)}
              </p>
              <p className="text-xs text-primary/80 mt-1">Discretionary spending after bills.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Net Flow</CardTitle>
              <CalendarIcon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className={cn('text-2xl font-bold', balance >=0 ? 'text-success' : 'text-destructive')}>
                {formatCurrency(balance)}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Bills and paydays on your calendar.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Calendar
                        mode="multiple"
                        selected={upcomingBills.map(bill => bill.date)}
                        className="p-0"
                        classNames={{
                            day_selected: 'bg-primary/10 text-primary hover:bg-primary/20',
                        }}
                        components={{
                            DayContent: (props) => {
                                const dayBills = upcomingBills.filter(bill => bill.date.getDate() === props.date.getDate() && bill.date.getMonth() === props.date.getMonth());
                                return (
                                    <div className="relative">
                                        {props.date.getDate()}
                                        {dayBills.length > 0 && <div className={cn('absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full', dayBills.some(b => b.amount < 0) ? 'bg-destructive' : 'bg-success')}></div>}
                                    </div>
                                );
                            }
                        }}
                    />
                </CardContent>
            </Card>
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Upcoming Bills</CardTitle>
              <Button variant="link" asChild>
                <Link href="/subscriptions" className="text-primary">View All</Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingBills.filter(b => b.amount < 0).map(bill => (
                <div
                  key={bill.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'p-2 rounded-lg',
                        bill.bgColor
                      )}
                    >
                      <bill.icon className={cn('h-5 w-5', bill.iconColor)} />
                    </div>
                    <div>
                      <p className="font-medium">{bill.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {bill.dueDate}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-destructive">
                    {formatCurrency(bill.amount)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                <CardTitle>Cash Flow Trend</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cashFlowData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={value => formatCurrency(Number(value))} />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Line
                        type="monotone"
                        dataKey="netFlow"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ r: 4, fill: 'hsl(var(--primary))' }}
                        />
                    </LineChart>
                    </ResponsiveContainer>
                </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle>Spending Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="h-48 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                        data={spendingBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        paddingAngle={5}
                        >
                        {spendingBreakdown.map((entry, index) => (
                            <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
                    {spendingBreakdown.map((item, index) => (
                        <div key={item.name} className="flex items-center gap-2 text-sm">
                            <div className="h-2 w-2 rounded-full" style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
                </CardContent>
            </Card>
        </div>
        
      </main>
    </div>
  );
}
