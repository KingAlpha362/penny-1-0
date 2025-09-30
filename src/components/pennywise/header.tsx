
"use client";

import type { FC } from 'react';
import { Bell, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/pennywise/user-nav';

interface HeaderProps {
  onAddTransaction: () => void;
  balance: number;
}

export const Header: FC<HeaderProps> = ({ onAddTransaction, balance }) => {
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(balance);

  return (
    <header className="flex items-center justify-between p-6 border-b bg-card">
      <div>
        <h2 className="text-2xl font-bold font-headline">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back, John! Your current balance is {formattedBalance}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button onClick={onAddTransaction}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Transaction
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-primary ring-2 ring-card" />
          <span className="sr-only">Notifications</span>
        </Button>
        <UserNav />
      </div>
    </header>
  );
};
