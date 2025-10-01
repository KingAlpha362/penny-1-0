
"use client";

import type { FC } from 'react';
import { Bell, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/pennywise/user-nav';

interface HeaderProps {
  onAddTransaction: () => void;
}

export const Header: FC<HeaderProps> = ({ onAddTransaction }) => {

  return (
    <header className="flex items-center justify-between p-6 bg-background border-b">
      <div>
        <h2 className="text-2xl font-bold">Welcome, Jane</h2>
        <p className="text-muted-foreground text-sm">Here is your financial overview.</p>
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
