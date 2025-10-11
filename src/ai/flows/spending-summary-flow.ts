
'use server';
/**
 * @fileOverview A flow that generates a natural language summary of spending transactions.
 *
 * - getSpendingSummary: A function that takes transaction data and returns a summary.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
// Update the import path below if your types file is located elsewhere
// Update the import path below if your types file is located elsewhere
// import type { Transaction } from '../../lib/types';
import type { Transaction } from '@/lib/types'; // Adjust this path if your types file is in a different location

// Define the input schema for the flow, expecting an array of transactions.
const SpendingSummaryInputSchema = z.array(z.object({
    id: z.string(),
    date: z.string().describe('The date of the transaction as an ISO string.'),
    category: z.string(),
    description: z.string().optional(),
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
        Analyze the following list of financial transactions and provide a comprehensive yet concise analysis of the user's financial behavior.
        
        Include:
        1. Top spending category and its percentage of total expenses
        2. Notable trends or patterns in spending
        3. Month-over-month comparisons if available
        4. Unusual or large transactions that stand out
        5. Potential areas for saving money
        6. Income vs expense ratio if income data is available
        
        Format the response in a friendly, conversational tone.
        Provide specific numbers and percentages when relevant.
        Include one actionable suggestion for improving financial health.
        Keep the summary to 3-4 sentences.
        Do not start with phrases like "Here is a summary" or "Based on the analysis".
        Use emojis sparingly but effectively to highlight key points.
        
        Here are the transactions:
        
        {{{JSON.stringify(input)}}}
        `,
    }
);

import { analyzeSpendingPatterns } from '../analysis/spending-patterns';

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

    // Analyze spending patterns (kept for future use)
    analyzeSpendingPatterns(expenses);

    // Pass only the expenses array to the prompt, as required by the schema
    const { output } = await spendingSummaryPrompt(expenses);
    return output ?? '';
    }
);

// This is a type that matches the expected input of the flow, but with `date` as a string.
type SerializableTransaction = Omit<Transaction, 'date'> & { date: string };


/**
 * Takes an array of user transactions and returns an AI-generated summary.
 * @param transactions An array of serializable Transaction objects, where `date` is a string.
 * @returns A promise that resolves to a string containing the spending summary.
 */
export async function getSpendingSummary(transactions: SerializableTransaction[]): Promise<string> {
    // Ensure each transaction has all required properties for the flow input schema.
    const normalized = transactions.map(t => ({
        id: t.id,
        date: t.date,
        category: t.category,
        description: t.description ?? '',
        amount: t.amount,
        type: t.type,
        userId: t.userId,
    }));
    return spendingSummaryFlow(normalized);
}
