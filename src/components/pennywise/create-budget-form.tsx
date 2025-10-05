
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { budgetSchema } from "@/lib/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { transactionCategories } from "@/lib/data";
import { FormDescription } from "@/components/ui/form";
import type { Budget } from "@/app/(app)/budgets/page";

type FormData = z.infer<typeof budgetSchema>;

interface CreateBudgetFormProps {
  onSubmit: (budget: Omit<Budget, 'id' | 'userId'>) => void;
}

export function CreateBudgetForm({ onSubmit }: CreateBudgetFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      category: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof budgetSchema>) => {
    const { amount, ...rest } = values;
    onSubmit({ ...rest, limit: amount });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
         <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Monthly Groceries" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

         <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {transactionCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Amount</FormLabel>
               <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input type="number" placeholder="500.00" {...field} className="pl-7"/>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="period"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Period</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rollover"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Roll Over Unused Budget
                </FormLabel>
                <FormDescription>
                  Unused budget will carry over to the next period
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="alerts.enabled"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Enable Budget Alerts
                </FormLabel>
                <FormDescription>
                  Receive notifications when approaching budget limit
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {form.watch("alerts.enabled") && (
          <FormField
            control={form.control}
            name="alerts.threshold"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alert Threshold (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    placeholder="80"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className="flex justify-end gap-4 pt-4">
          <Button variant="ghost" type="button" onClick={() => form.reset()}>Cancel</Button>
          <Button type="submit">Save Budget</Button>
        </div>
      </form>
    </Form>
  );
}
