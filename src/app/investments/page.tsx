
"use client";

import { investments } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal, ArrowUp, ArrowDown } from "lucide-react";
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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { InvestmentLogo } from "@/components/pennywise/investment-logo";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

const portfolioData = [
  { name: 'Jan', value: 5000 },
  { name: 'Feb', value: 5500 },
  { name: 'Mar', value: 6200 },
  { name: 'Apr', value: 6000 },
  { name: 'May', value: 6800 },
  { name: 'Jun', value: 7200 },
  { name: 'Jul', value: 8000 },
];

export default function InvestmentsPage() {
  const totalValue = investments.reduce((acc, investment) => acc + investment.value, 0);
  const totalChange = investments.reduce((acc, investment) => acc + (investment.change * investment.quantity), 0);
  const totalChangePercent = (totalChange / (totalValue - totalChange)) * 100;

  return (
    <div className="flex flex-col flex-1">
      <header className="flex items-center justify-between p-6">
        <div>
          <h2 className="text-2xl font-bold font-headline">Investments</h2>
          <p className="text-muted-foreground">
            Track your investment portfolio performance.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Investment
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Total Portfolio Value</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{formatCurrency(totalValue)}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Today's Change</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className={cn("text-3xl font-bold", totalChange >= 0 ? "text-success" : "text-destructive")}>
                        {totalChange >= 0 ? '+' : ''}{formatCurrency(totalChange)}
                    </p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Today's Change %</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className={cn("text-3xl font-bold", totalChangePercent >= 0 ? "text-success" : "text-destructive")}>
                        {totalChangePercent >= 0 ? '+' : ''}{totalChangePercent.toFixed(2)}%
                    </p>
                </CardContent>
            </Card>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-80 w-full">
                    <ResponsiveContainer>
                        <LineChart data={portfolioData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => formatCurrency(Number(value))} />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="text-right">Today's Change</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {investments.map((investment) => (
                  <TableRow key={investment.id}>
                    <TableCell className="font-medium flex items-center gap-3">
                        <InvestmentLogo symbol={investment.symbol} />
                        <div>
                            {investment.name} <span className="text-muted-foreground">{investment.symbol}</span>
                        </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{investment.type}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{formatCurrency(investment.price)}</TableCell>
                    <TableCell className="text-right">{investment.quantity}</TableCell>
                    <TableCell className="text-right font-semibold">{formatCurrency(investment.value)}</TableCell>
                    <TableCell className={cn("text-right font-semibold flex justify-end items-center gap-2", investment.change >= 0 ? "text-success" : "text-destructive")}>
                        {investment.change >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                        {formatCurrency(investment.change)} ({investment.changePercent.toFixed(2)}%)
                    </TableCell>
                    <TableCell className="text-right">
                       <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Trade</DropdownMenuItem>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
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
