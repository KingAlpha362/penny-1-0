
"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  PlusCircle,
  Search,
} from "lucide-react";
import { transactions as initialTransactions, Transaction, transactionCategories } from "@/lib/data";
import { AddTransactionDialog } from "@/components/pennywise/add-transaction-dialog";
import { cn } from "@/lib/utils";

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [isAddTransactionOpen, setAddTransactionOpen] = useState(false);

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    setTransactions(prev => [
        { ...newTransaction, id: crypto.randomUUID() },
        ...prev
    ]);
  };

  return (
    <div className="flex flex-col flex-1 bg-muted/40">
       <header className="flex items-center justify-between p-6 border-b bg-card">
        <div>
          <h2 className="text-2xl font-bold font-headline">Transactions</h2>
          <p className="text-muted-foreground">
            View and manage your transactions.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={() => setAddTransactionOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Transaction
          </Button>
        </div>
      </header>
      <main className="flex-1 space-y-6 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
              A list of all your recent transactions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
              <div className="relative w-full md:flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex gap-2">
                      Date <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Newest</DropdownMenuItem>
                    <DropdownMenuItem>Oldest</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex gap-2">
                      Category <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Categories</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {transactionCategories.map(cat => (
                         <DropdownMenuItem key={cat}>{cat}</DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex gap-2">
                      Type <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     <DropdownMenuItem>Income</DropdownMenuItem>
                     <DropdownMenuItem>Expense</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.date}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{transaction.category}</Badge>
                    </TableCell>
                     <TableCell>
                      <Badge variant={transaction.type === 'income' ? 'secondary' : 'destructive'} className={cn(transaction.type === 'income' && 'bg-success/10 text-success border-transparent', transaction.type === 'expense' && 'bg-destructive/10 text-destructive border-transparent' )}>
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right font-semibold",
                        transaction.type === "income"
                          ? "text-success"
                          : "text-destructive"
                      )}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
       <AddTransactionDialog 
        isOpen={isAddTransactionOpen}
        onOpenChange={setAddTransactionOpen}
        onTransactionAdded={handleAddTransaction}
      />
    </div>
  );
}
