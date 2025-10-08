
'use client';

import type { FC } from 'react';
import { Bell, PlusCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/pennywise/user-nav';
import { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';

interface HeaderProps {
  onAddTransaction: () => void;
}

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {return 'Good morning';}
    if (hour < 18) {return 'Good afternoon';}
    return 'Good evening';
};

export const Header: FC<HeaderProps> = ({ onAddTransaction }) => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <Card className="p-4 m-6 mb-0">
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold">{greeting}, Jane 👋</h2>
                <p className="text-muted-foreground text-sm">Here is your financial overview for today.</p>
            </div>
            <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="Search..." className="pl-10 w-64" />
                </div>
                <Button onClick={onAddTransaction} className="hidden sm:inline-flex">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Transaction
                </Button>
                <Button variant="ghost" size="icon" className="relative rounded-full">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
                    <span className="sr-only">Notifications</span>
                </Button>
                <UserNav />
            </div>
        </div>
    </Card>
  );
};
