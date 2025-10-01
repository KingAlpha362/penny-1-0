
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
  CircleDollarSign,
  Target,
  Landmark,
  FileText,
  Briefcase,
} from 'lucide-react';
import { PennywiseLogo } from '@/components/icons/pennywise-logo';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/transactions', icon: ScrollText, label: 'Transactions' },
  { href: '/accounts', icon: Landmark, label: 'Accounts' },
  { href: '/investments', icon: Briefcase, label: 'Investments' },
  { href: '/invoicing', icon: FileText, label: 'Invoicing' },
  { href: '/budgets', icon: Wallet, label: 'Budgets' },
  { href: '/reports', icon: BarChart3, label: 'Reports' },
  { href: '/subscriptions', icon: CreditCard, label: 'Subscriptions' },
  { href: '/cash-flow', icon: TrendingUp, label: 'Cash Flow' },
  { href: '/debt', icon: CircleDollarSign, label: 'Debt' },
  { href: '/goals', icon: Target, label: 'Goals' },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-card border-r flex flex-col p-4">
      <div className="p-4 flex items-center gap-3">
        <PennywiseLogo className="w-8 h-8 text-primary" />
        <h1 className="text-xl font-bold font-headline">PennyWise</h1>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary hover:bg-primary/10',
                    active && 'font-semibold text-primary bg-primary/10'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="py-2">
         <Link
            href="/settings"
            className={cn(
                'flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary hover:bg-primary/10',
                pathname === '/settings' && 'font-semibold text-primary bg-primary/10'
            )}
            >
            <Settings className="w-5 h-5" />
            Settings
        </Link>
      </div>
    </aside>
  );
}
