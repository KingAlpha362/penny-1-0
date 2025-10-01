'use server';
/**
 * @fileOverview A flow that generates a natural language summary of spending transactions.
 *
 * - getSpendingSummary: A function that takes transaction data and returns a summary.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import type { Transaction } from '@/lib/types';

// Define the input schema for the flow, expecting an array of transactions.
const SpendingSummaryInputSchema = z.array(z.object({
    id: z.string(),
    date: z.any().describe("The date of the transaction. Can be a string or a Firebase Timestamp."),
    category: z.string(),
    description: z.string(),
    amount: z.number(),
    type: z.enum(['income', 'expense']),
    userId: z.string(),
}));

const spendingSummaryPrompt = ai.definePrompt(
    {
        name: 'spendingSummaryPrompt',
        input: { schema: SpendingSummaryInputSchema },
        output: { schema: z.string() },
        prompt: `You are a helpful financial assistant called PennyWise.
        Analyze the following list of financial transactions and provide a concise, friendly, and insightful summary of the user's spending habits.
        Focus on the expenses.
        Mention the category with the highest spending and any notable trends.
        Keep the summary to 2-3 sentences.
        Do not start with "Here is a summary". Just provide the summary directly.
        
        Here are the transactions:
        
        {{{JSON.stringify(input)}}}
        `,
    }
);

const spendingSummaryFlow = ai.defineFlow(
    {
        name: 'spendingSummaryFlow',
        inputSchema: SpendingSummaryInputSchema,
        outputSchema: z.string(),
    },
    async (transactions) => {
        // Filter for expenses only before sending to the prompt
        const expenses = transactions.filter(t => t.type === 'expense');

        if (expenses.length === 0) {
            return "You don't have any expenses in this period. Great job saving!";
        }

        const { output } = await spendingSummaryPrompt(expenses);
        return output!;
    }
);

/**
 * Takes an array of user transactions and returns an AI-generated summary.
 * @param transactions An array of Transaction objects.
 * @returns A promise that resolves to a string containing the spending summary.
 */
export async function getSpendingSummary(transactions: Transaction[]): Promise<string> {
    // The flow expects a plain array, so we can pass it directly.
    return spendingSummaryFlow(transactions);
}
