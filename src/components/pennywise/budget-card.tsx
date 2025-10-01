
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import type { Budget } from "@/app/(app)/budgets/page";
import { Skeleton } from "@/components/ui/skeleton";

interface BudgetCardProps {
  budget: Budget;
  spent: number;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export function BudgetCard({ budget, spent }: BudgetCardProps) {
  const { category, limit } = budget;
  const percentage = (spent / limit) * 100;
  const remaining = limit - spent;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-bold">{category}</CardTitle>
        <Button variant="ghost" size="icon">
          <Pencil className="w-4 h-4 text-muted-foreground" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-muted-foreground">{formatCurrency(spent)} Spent</span>
          <span className="font-medium">{formatCurrency(limit)}</span>
        </div>
        <Progress value={percentage} />
        <p className="text-sm text-muted-foreground">{formatCurrency(remaining)} left</p>
      </CardContent>
    </Card>
  );
}

BudgetCard.Skeleton = function BudgetCardSkeleton() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-8 w-8" />
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-1/4" />
                </div>
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-4 w-1/2" />
            </CardContent>
        </Card>
    );
};
