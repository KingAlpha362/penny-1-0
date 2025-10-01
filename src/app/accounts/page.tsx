
"use client";

import { accounts } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export default function AccountsPage() {
  const totalBalance = accounts.reduce((acc, account) => acc + account.balance, 0);

  return (
    <div className="flex flex-col flex-1">
      <header className="flex items-center justify-between p-6">
        <div>
          <h2 className="text-2xl font-bold font-headline">Accounts</h2>
          <p className="text-muted-foreground">
            Manage your connected bank accounts, wallets, and cards.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button>
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
                <p className="text-4xl font-bold text-primary">{formatCurrency(totalBalance)}</p>
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
                {accounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">
                        {account.name}
                        {account.lastFour && <span className="text-muted-foreground ml-2">...{account.lastFour}</span>}
                    </TableCell>
                    <TableCell>{account.provider}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{account.type}</Badge>
                    </TableCell>
                    <TableCell className={cn("text-right font-semibold", account.balance > 0 ? "text-success" : "text-destructive")}>
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
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
