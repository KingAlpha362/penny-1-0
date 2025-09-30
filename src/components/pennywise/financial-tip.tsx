
import { generateFinancialTip } from "@/ai/flows/personalized-financial-tips";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/lib/data";
import { Lightbulb } from "lucide-react";

interface FinancialTipProps {
  transactions: Transaction[];
  income: number;
  expenses: number;
}

export default async function FinancialTip({ transactions, income, expenses }: FinancialTipProps) {
  const spendingHabits = transactions
    .filter(t => t.type === 'expense')
    .slice(0, 5)
    .map(t => `${t.category}: $${t.amount}`)
    .join(", ");
    
  const budgetGoals = `Monthly income is $${income.toFixed(2)}, and expenses are $${expenses.toFixed(2)}. Goal is to increase savings.`;

  let tip = "Start tracking your expenses to find savings opportunities!";
  try {
    const result = await generateFinancialTip({
      spendingHabits: spendingHabits || "No recent spending data.",
      budgetGoals: budgetGoals,
    });
    if (result.tip) {
      tip = result.tip;
    }
  } catch (error) {
    console.error("Failed to generate financial tip:", error);
    // Use default tip
  }


  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <Lightbulb className="w-6 h-6 text-primary" />
        <CardTitle className="font-headline">Personalized Tip</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground leading-relaxed">
          {tip}
        </p>
      </CardContent>
    </Card>
  );
}
