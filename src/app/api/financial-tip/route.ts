
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

    const spendingHabits =
      transactions
        .filter(t => t.type === 'expense')
        .slice(0, 5)
        .map(t => `${t.category}: $${t.amount}`)
        .join(', ') || 'No recent spending data.';

    const budgetGoals = `Monthly income is $${income.toFixed(
      2
    )}, and expenses are $${expenses.toFixed(
      2
    )}. Goal is to increase savings.`;

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
