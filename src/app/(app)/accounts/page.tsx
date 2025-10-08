
'use client';

import AuthenticatedPage from '@/components/AuthenticatedPage';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { BankLogo } from '@/components/pennywise/bank-logo';
import { useUser, useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { useState, useMemo } from 'react';
import { AddAccountDialog } from '@/components/pennywise/add-account-dialog';

export type Account = {
  id: string;
  userId: string;
  name: string;
  type: 'Checking' | 'Savings' | 'Credit Card' | 'Wallet';
  provider: string;
  balance: number;
  lastFour?: string;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export default function AccountsPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const [isAddAccountOpen, setAddAccountOpen] = useState(false);

  const accountsQuery = useMemoFirebase(() => {
    if (!firestore || !user?.uid) {return null;}
    return query(collection(firestore, `users/${user.uid}/accounts`));
  }, [firestore, user?.uid]);

  const { data: accounts, isLoading } = useCollection<Account>(accountsQuery);

  const totalBalance = useMemo(() => {
    if (!accounts) {return 0;}
    return accounts.reduce((acc, account) => acc + account.balance, 0);
  }, [accounts]);

  const handleAddAccount = (newAccount: Omit<Account, 'id' | 'userId'>) => {
    if (!firestore || !user?.uid) {return;}
    const accountRef = collection(firestore, `users/${user.uid}/accounts`);
    addDocumentNonBlocking(accountRef, {
      ...newAccount,
      userId: user.uid,
    });
  };

  return (
    <AuthenticatedPage>
      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between p-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight font-headline">Accounts</h2>
            <p className="text-muted-foreground mt-1">
              Manage your connected bank accounts, wallets, and cards.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={() => setAddAccountOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Account
            </Button>
          </div>
        </header>

        <main className="flex-1 p-6 space-y-8">
          <Card>
              <CardHeader>
                  <CardTitle>Total Balance</CardTitle>
                  <CardDescription>The sum of all your account balances.</CardDescription>
              </CardHeader>
              <CardContent>
                  <p className={cn(
                      'text-4xl font-bold',
                      totalBalance >= 0 ? 'text-success' : 'text-destructive'
                  )}>
                      {formatCurrency(totalBalance)}
                  </p>
              </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">Loading accounts...</TableCell>
                    </TableRow>
                  )}
                  {accounts && accounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell className="font-medium flex items-center gap-3">
                          <BankLogo provider={account.provider} />
                          <div>
                              {account.name}
                              {account.lastFour && <span className="text-muted-foreground ml-2">...{account.lastFour}</span>}
                          </div>
                      </TableCell>
                      <TableCell>{account.provider}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{account.type}</Badge>
                      </TableCell>
                      <TableCell className={cn('text-right font-semibold', account.balance >= 0 ? 'text-success' : 'text-destructive')}>
                          {formatCurrency(account.balance)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Edit</DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                          </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {!isLoading && accounts?.length === 0 && (
                     <TableRow>
                      <TableCell colSpan={5} className="text-center">No accounts found. Add one to get started.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
        <AddAccountDialog
          isOpen={isAddAccountOpen}
          onOpenChange={setAddAccountOpen}
          onAccountAdded={handleAddAccount}
        />
      </div>
    </AuthenticatedPage>
  );
}
