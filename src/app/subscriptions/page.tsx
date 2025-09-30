
"use client";

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
import { Card, CardContent } from "@/components/ui/card";
import { activeSubscriptions, inactiveSubscriptions } from "@/lib/data";
import { PlusCircle, Info, Edit } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export default function SubscriptionsPage() {
  return (
    <div className="flex flex-col flex-1">
      <header className="flex items-center justify-between p-6">
        <div>
          <h2 className="text-2xl font-bold font-headline">Subscriptions</h2>
          <p className="text-muted-foreground">
            Manage your recurring subscriptions and services.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Subscription
          </Button>
        </div>
      </header>
      <main className="flex-1 space-y-8 p-6">
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <Info className="h-5 w-5 text-primary" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-bold text-primary">
                  Potential Savings Found!
                </h3>
                <div className="mt-1 text-sm text-primary/80">
                  <p>
                    We've identified subscriptions that may be unused or
                    duplicates. Review them below to optimize your spending.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold font-headline">Active Subscriptions</h2>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Billing Cycle</TableHead>
                    <TableHead>Next Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeSubscriptions.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium">{sub.name}</TableCell>
                      <TableCell>{formatCurrency(sub.amount)}</TableCell>
                      <TableCell>{sub.billingCycle}</TableCell>
                      <TableCell>{sub.nextDueDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="bg-success/10 text-success border-transparent"
                        >
                          Active
                        </Badge>
                      </TableCell>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="#">
                                <Edit className="mr-2 h-4 w-4"/> Edit
                            </Link>
                        </Button>
                      </td>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold font-headline">Inactive Subscriptions</h2>
           <Card>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Billing Cycle</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {inactiveSubscriptions.map((sub) => (
                        <TableRow key={sub.id}>
                            <TableCell className="font-medium">{sub.name}</TableCell>
                            <TableCell>{formatCurrency(sub.amount)}</TableCell>
                            <TableCell>{sub.billingCycle}</TableCell>
                            <TableCell>
                                <Badge variant="outline">Canceled</Badge>
                            </TableCell>
                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                <Button variant="link" size="sm" className="text-primary" asChild>
                                    <Link href="#">
                                        Reactivate
                                    </Link>
                                </Button>
                            </td>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
