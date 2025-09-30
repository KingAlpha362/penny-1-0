
"use client";

import { useState, useMemo } from "react";
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
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
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

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");


  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    setTransactions(prev => [
        { ...newTransaction, id: crypto.randomUUID() },
        ...prev
    ]);
  };
  
  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    if (searchTerm) {
        filtered = filtered.filter(t => t.description.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (categoryFilter !== 'all') {
        filtered = filtered.filter(t => t.category === categoryFilter);
    }

    if (typeFilter !== 'all') {
        filtered = filtered.filter(t => t.type === typeFilter);
    }
    
    filtered.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return filtered;

  }, [transactions, searchTerm, categoryFilter, typeFilter, sortOrder]);


  return (
    <div className="flex flex-col flex-1">
       <header className="flex items-center justify-between p-6">
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                    <DropdownMenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
                        <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex gap-2">
                      Category <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuRadioGroup value={categoryFilter} onValueChange={setCategoryFilter}>
                        <DropdownMenuLabel>Categories</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                        {transactionCategories.map(cat => (
                            <DropdownMenuRadioItem key={cat} value={cat}>{cat}</DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex gap-2">
                      Type <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     <DropdownMenuRadioGroup value={typeFilter} onValueChange={setTypeFilter}>
                        <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="income">Income</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="expense">Expense</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
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
                {filteredTransactions.map((transaction) => (
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
