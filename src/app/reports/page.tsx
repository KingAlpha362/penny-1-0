
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { transactions, budgets } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMemo, useState } from "react";
import { subDays, format, parseISO } from 'date-fns';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
};

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

type TimeRange = '30' | '90' | '180' | '365';

export default function ReportsPage() {
    const [timeRange, setTimeRange] = useState<TimeRange>('30');
    
    const timeRangeInDays = parseInt(timeRange, 10);
    const startDate = subDays(new Date(), timeRangeInDays);

    const filteredTransactions = useMemo(() => {
      return transactions.filter(t => parseISO(t.date) >= startDate);
    }, [startDate]);


    const spendingByCategoryData = useMemo(() => budgets.map(budget => {
        const spent = filteredTransactions
            .filter(t => t.category === budget.category && t.type === 'expense')
            .reduce((acc, t) => acc + t.amount, 0);
        return {
            name: budget.category,
            value: spent,
        }
    }), [filteredTransactions]);

    const totalSpent = useMemo(() => spendingByCategoryData.reduce((acc, item) => acc + item.value, 0), [spendingByCategoryData]);

    const incomeTrendsData = useMemo(() => {
        const data: {[key: string]: number} = {};
        
        filteredTransactions.forEach(t => {
            const transactionDate = parseISO(t.date);
            if (t.type === 'income') {
                let key = '';
                if(timeRangeInDays <= 90) { // group by day for 30/90 days
                    key = format(transactionDate, 'MMM d');
                } else { // group by month for 6+ months
                    key = format(transactionDate, 'MMM yyyy');
                }
                
                if (!data[key]) data[key] = 0;
                data[key] += t.amount;
            }
        });
        
        const sortedKeys = Object.keys(data).sort((a,b) => {
            if (timeRangeInDays <= 90) {
                return new Date(a).getTime() - new Date(b).getTime();
            }
            return new Date(a).getTime() - new Date(b).getTime();
        });
        
        return sortedKeys.map(key => ({
            name: key,
            income: data[key] || 0
        }));

    }, [filteredTransactions, timeRangeInDays]);

    const netWorthData = useMemo(() => {
        const data: {[key: string]: {income: number, expense: number}} = {};
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
        
        transactions.forEach(t => {
            const transactionDate = new Date(t.date);
            if (transactionDate > twelveMonthsAgo) {
                const month = format(transactionDate, 'yyyy-MMM');
                 if (!data[month]) data[month] = { income: 0, expense: 0 };
                 data[month][t.type] += t.amount;
            }
        });

        let netWorth = 10000; // Starting arbitrary net worth
        
        const monthOrder = Array.from({length: 12}, (_, i) => {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            return format(d, 'yyyy-MMM');
        }).reverse();

        return monthOrder.map(monthKey => {
            if (data[monthKey]) {
                netWorth += data[monthKey].income - data[monthKey].expense;
            }
            return { name: monthKey.split('-')[1], netWorth };
        });

    }, []);

  return (
    <div className="flex flex-col flex-1">
       <header className="flex items-center justify-between p-6">
        <div>
          <h2 className="text-2xl font-bold font-headline">Reports</h2>
          <p className="text-muted-foreground">
            Analyze your spending and financial trends.
          </p>
        </div>
         <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="30">Last 30 Days</SelectItem>
                    <SelectItem value="90">Last 3 Months</SelectItem>
                    <SelectItem value="180">Last 6 Months</SelectItem>
                    <SelectItem value="365">Last Year</SelectItem>
                </SelectContent>
            </Select>
            <Button>Export Report</Button>
        </div>
      </header>
      <main className="flex-1 space-y-8 p-6">
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
                 <CardDescription>
                    {`For the last ${timeRange} days`}
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={spendingByCategoryData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={120}
                                innerRadius={90}
                                fill="#8884d8"
                                dataKey="value"
                                stroke="hsl(var(--background))"
                                strokeWidth={4}
                            >
                                {spendingByCategoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                             <Tooltip formatter={(value) => formatCurrency(Number(value))}/>
                             <text
                                x="50%"
                                y="45%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-3xl font-bold fill-foreground"
                            >
                                {formatCurrency(totalSpent)}
                            </text>
                            <text
                                x="50%"
                                y="58%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-sm fill-muted-foreground"
                            >
                                Total Spent
                            </text>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                 <div className="grid grid-cols-2 gap-6">
                    {spendingByCategoryData.map((item, index) => (
                        <div key={item.name} className="flex items-center gap-3">
                            <div className="h-3 w-3 rounded-full" style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                            <div>
                                <p className="text-sm text-muted-foreground">{item.name}</p>
                                <p className="text-lg font-bold">{formatCurrency(item.value)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Income Trends</CardTitle>
                    <CardDescription>
                        {`For the last ${timeRange} days`}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-64">
                       <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={incomeTrendsData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => formatCurrency(Number(value))} />
                                <Tooltip formatter={(value) => formatCurrency(Number(value))} cursor={{ fill: 'hsl(var(--accent))', opacity: 0.5 }} />
                                <Bar dataKey="income" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                            </BarChart>
                       </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Net Worth</CardTitle>
                    <CardDescription>Last 12 months</CardDescription>
                </CardHeader>
                 <CardContent>
                    <div className="h-64">
                         <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={netWorthData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => formatCurrency(Number(value))} />
                                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                                <Line type="monotone" dataKey="netWorth" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
