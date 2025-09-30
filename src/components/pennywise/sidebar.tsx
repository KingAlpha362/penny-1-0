"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ScrollText,
  Wallet,
  BarChart3,
  Settings,
  CreditCard,
  TrendingUp,
} from 'lucide-react';
import { PennywiseLogo } from '@/components/icons/pennywise-logo';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/transactions', icon: ScrollText, label: 'Transactions' },
  { href: '/budgets', icon: Wallet, label: 'Budgets' },
  { href: '/reports', icon: BarChart3, label: 'Reports' },
  { href: '/subscriptions', icon: CreditCard, label: 'Subscriptions' },
  { href: '/cash-flow', icon: TrendingUp, label: 'Cash Flow' },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-card border-r flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <PennywiseLogo className="w-8 h-8 text-primary" />
        <h1 className="text-xl font-bold font-headline">PennyWise</h1>
      </div>
      <nav className="flex-grow px-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.label}>
                <Button
                  asChild
                  variant={active ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    active && 'font-bold text-primary'
                  )}
                >
                  <Link href={item.href} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="px-4 py-6">
        <Button asChild variant={pathname === '/settings' ? 'secondary' : 'ghost'} className={cn('w-full justify-start', pathname === '/settings' && 'font-bold text-primary')}>
            <Link href="/settings" className="flex items-center gap-3">
                <Settings className="w-5 h-5" />
                Settings
            </Link>
        </Button>
      </div>
    </aside>
  );
}
