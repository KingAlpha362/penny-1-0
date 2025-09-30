
import {NextRequest, NextResponse} from 'next/server';
import {generateFinancialTip} from '@/ai/flows/personalized-financial-tips';
import {z} from 'zod';

const financialTipRequestSchema = z.object({
  transactions: z.array(
    z.object({
      id: z.string(),
      date: z.string(),
      category: z.string(),
      description: z.string(),
      amount: z.number(),
      type: z.enum(['income', 'expense']),
    })
  ),
  income: z.number(),
  expenses: z.number(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = financialTipRequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {error: 'Invalid request body', details: validation.error.errors},
        {status: 400}
      );
    }
    const {transactions, income, expenses} = validation.data;

    // More detailed spending habits
    const categoryTotals: {[key: string]: number} = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

    const spendingHabits = Object.entries(categoryTotals)
      .sort(([, a], [, b]) => b - a) // Sort by amount descending
      .map(([category, total]) => `${category}: $${total.toFixed(2)}`)
      .join(', ') || 'No recent spending data.';


    const budgetGoals = `Monthly income is $${income.toFixed(
      2
    )}, and total monthly expenses are $${expenses.toFixed(
      2
    )}. The user's goal is to increase their savings and reduce unnecessary spending.`;

    const result = await generateFinancialTip({
      spendingHabits,
      budgetGoals,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to generate financial tip:', error);
    return NextResponse.json(
      {error: 'Failed to generate financial tip'},
      {status: 500}
    );
  }
}
