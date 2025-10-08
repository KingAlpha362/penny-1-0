
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMemo, useState, useEffect } from 'react';
import { subDays, format, parseISO } from 'date-fns';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import type { Transaction } from '@/app/lib/types';
import { getSpendingSummary } from '@/ai/flows/spending-summary-flow';
import { Sparkles } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
};

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

type TimeRange = '30' | '90' | '180' | '365';

type SerializableTransaction = Omit<Transaction, 'date'> & { date: string };

function AISummary({ transactions }: { transactions: SerializableTransaction[] }) {
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (transactions.length > 0) {
            setIsLoading(true);

            getSpendingSummary(transactions)
                .then(setSummary)
                .catch(err => {
                    console.error('Error getting AI summary:', err);
                    setSummary("Sorry, I couldn't generate a summary right now.");
                })
                .finally(() => setIsLoading(false));
        } else {
            setSummary('Not enough data to generate a summary. Add some transactions first!');
        }
    }, [transactions]);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Sparkles className="text-primary w-5 h-5" />
                    <CardTitle>AI Summary</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">{summary}</p>
                )}
            </CardContent>
        </Card>
    );
}


export default function ReportsPage() {
    const [timeRange, setTimeRange] = useState<TimeRange>('30');
    const { user } = useUser();
    const firestore = useFirestore();

    const transactionsQuery = useMemoFirebase(() => {
      if (!firestore || !user?.uid) {return null;}
      return query(collection(firestore, `users/${user.uid}/transactions`));
    }, [firestore, user?.uid]);

    const { data: allTransactions, isLoading: isLoadingTransactions } = useCollection<Transaction>(transactionsQuery);
    
    const timeRangeInDays = parseInt(timeRange, 10);
    const startDate = subDays(new Date(), timeRangeInDays);

    const filteredTransactions: SerializableTransaction[] = useMemo(() => {
      if (!allTransactions) {return [];}
      const filtered = allTransactions.filter(t => {
        const transactionDate = typeof t.date === 'object' && t.date !== null && 'toDate' in t.date && typeof (t.date as any).toDate === 'function'
          ? (t.date as { toDate: () => Date }).toDate()
          : new Date(t.date as string | Date);
        return transactionDate && transactionDate >= startDate;
      });

      return filtered.map(t => ({
          ...t,
          date:
            typeof t.date === 'object' &&
            t.date !== null &&
            'toDate' in t.date &&
            typeof (t.date as any).toDate === 'function'
              ? (t.date as { toDate: () => Date }).toDate().toISOString()
              : new Date(t.date as string | Date).toISOString(),
      }));
    }, [allTransactions, startDate]);


    const spendingByCategoryData = useMemo(() => {
        const categories: { [key: string]: number } = {};
        filteredTransactions
            .filter(t => t.type === 'expense')
            .forEach(t => {
                if (!categories[t.category]) {
                    categories[t.category] = 0;
                }
                categories[t.category] += t.amount;
            });
        return Object.entries(categories).map(([name, value]) => ({ name, value }));
    }, [filteredTransactions]);

    const totalSpent = useMemo(() => spendingByCategoryData.reduce((acc, item) => acc + item.value, 0), [spendingByCategoryData]);

    const incomeTrendsData = useMemo(() => {
        const data: {[key: string]: number} = {};
        
        filteredTransactions.forEach(t => {
            if (!t.date) {return;}
            const transactionDate = parseISO(t.date);

            if (t.type === 'income') {
                let key = '';
                if(timeRangeInDays <= 90) { // group by day for 30/90 days
                    key = format(transactionDate, 'MMM d');
                } else { // group by month for 6+ months
                    key = format(transactionDate, 'MMM yyyy');
                }
                
                if (!data[key]) {data[key] = 0;}
                data[key] += t.amount;
            }
        });
        
        const sortedKeys = Object.keys(data).sort((a,b) => {
             const dateA = timeRangeInDays <= 90 ? new Date(a + ', ' + new Date().getFullYear()) : new Date(a);
             const dateB = timeRangeInDays <= 90 ? new Date(b + ', ' + new Date().getFullYear()) : new Date(b);
             return dateA.getTime() - dateB.getTime();
        });
        
        return sortedKeys.map(key => ({
            name: key,
            income: data[key] || 0
        }));

    }, [filteredTransactions, timeRangeInDays]);

    const netWorthData = useMemo(() => {
        if (!allTransactions) {return [];}
        const data: {[key: string]: {income: number, expense: number}} = {};
        const twelveMonthsAgo = subDays(new Date(), 365);
        
        allTransactions.forEach(t => {
            const transactionDate =
                typeof t.date === 'object' &&
                t.date !== null &&
                'toDate' in t.date &&
                typeof (t.date as any).toDate === 'function'
                    ? (t.date as { toDate: () => Date }).toDate()
                    : new Date(t.date as string | Date);
            if (transactionDate && transactionDate > twelveMonthsAgo) {
                const month = format(transactionDate, 'yyyy-MMM');
                 if (!data[month]) {data[month] = { income: 0, expense: 0 };}
                 data[month][t.type as 'income' | 'expense'] += t.amount;
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
    }, [allTransactions]);

  return (
    <div className="flex flex-col flex-1">
       <header className="flex items-center justify-between p-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">Reports</h2>
          <p className="text-muted-foreground mt-1">
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
        
        <AISummary transactions={filteredTransactions} />

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
