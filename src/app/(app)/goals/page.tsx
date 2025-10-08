

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PlusCircle } from 'lucide-react';

const goals = [
  {
    id: 1,
    title: 'Save for Vacation',
    current: 1200,
    target: 3000,
    icon: '✈️',
  },
  {
    id: 2,
    title: 'Emergency Fund',
    current: 5000,
    target: 10000,
    icon: '🚑',
  },
  {
    id: 3,
    title: 'New Laptop',
    current: 800,
    target: 1500,
    icon: '💻',
  },
  {
    id: 4,
    title: 'Down Payment for House',
    current: 25000,
    target: 50000,
    icon: '🏠',
  },
];

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
};


export default function GoalsPage() {
  return (
    <div className="flex flex-col flex-1">
      <header className="flex items-center justify-between p-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">Financial Goals</h2>
          <p className="text-muted-foreground mt-1">
            Track your progress towards your financial ambitions.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Goal
        </Button>
      </header>
      <main className="flex-1 p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <Card key={goal.id} className="bg-card/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{goal.title}</CardTitle>
                <div className="text-2xl">{goal.icon}</div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold">{formatCurrency(goal.current)}</span>
                    <span className="text-sm text-muted-foreground">/ {formatCurrency(goal.target)}</span>
                  </div>
                  <Progress value={(goal.current / goal.target) * 100} />
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{((goal.current / goal.target) * 100).toFixed(0)}% Complete</span>
                    <span>{formatCurrency(goal.target - goal.current)} remaining</span>
                </div>
              </CardContent>
            </Card>
          ))}
           <Card className="flex items-center justify-center border-dashed bg-card/50 backdrop-blur-sm">
                <Button variant="ghost" className="flex flex-col h-full w-full items-center justify-center text-muted-foreground">
                    <PlusCircle className="h-8 w-8 mb-2"/>
                    <span className="font-semibold">Add New Goal</span>
                </Button>
            </Card>
        </div>
      </main>
    </div>
  );
}
