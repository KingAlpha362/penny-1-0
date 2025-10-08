import { format, isWithinInterval, subMonths } from 'date-fns';
import type { Transaction } from '@/lib/types';

type SpendingPattern = {
    category: string;
    frequency: 'daily' | 'weekly' | 'monthly';
    averageAmount: number;
    confidence: number;
};

type SpendingTrend = {
    category: string;
    trend: 'increasing' | 'decreasing' | 'stable';
    percentage: number;
};

type TxLike = {
    id?: string;
    userId?: string;
    type?: Transaction['type'];
    amount: number;
    category: string;
    date: string | Date;
    description?: string;
};

export function analyzeSpendingPatterns(transactions: TxLike[]): {
    patterns: SpendingPattern[];
    trends: SpendingTrend[];
    suggestions: string[];
} {
    const now = new Date();
    const lastMonth = subMonths(now, 1);
    const twoMonthsAgo = subMonths(now, 2);

    // Group transactions by category
    // Normalize transactions: filter out entries missing required fields
    const normalized = transactions
        .filter((t): t is TxLike => t && typeof t.amount === 'number' && !!t.category && !!t.date)
        .map(t => ({ ...t, date: t.date }));

    const byCategory = normalized.reduce((acc, t) => {
        if (!acc[t.category]) {
            acc[t.category] = [];
        }
        acc[t.category].push(t as TxLike as Transaction);
        return acc;
    }, {} as Record<string, Transaction[]>);

    const patterns: SpendingPattern[] = [];
    const trends: SpendingTrend[] = [];
    const suggestions: string[] = [];

    // Analyze each category
    Object.entries(byCategory).forEach(([category, txs]) => {
        // Detect patterns
        const pattern = detectPattern(txs);
        if (pattern) {
            patterns.push(pattern);
        }

        // Analyze trends
        const trend = analyzeTrend(txs, lastMonth, twoMonthsAgo);
        if (trend) {
            trends.push({
                category,
                ...trend
            });
        }

        // Generate suggestions
        const suggestion = generateSuggestion(category, txs, pattern);
        if (suggestion) {
            suggestions.push(suggestion);
        }
    });

    return { patterns, trends, suggestions };
}

function detectPattern(transactions: Transaction[]): SpendingPattern | null {
    if (!transactions || transactions.length === 0) {return null;}

    // If there's only one transaction, we can't detect a repeating pattern
    if (transactions.length < 2) {
        return {
            category: transactions[0].category,
            frequency: 'monthly',
            averageAmount: transactions[0].amount,
            confidence: 50,
        };
    }

    // Sort transactions by date
    const sortedTxs = transactions.slice().sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
    });

    // Calculate intervals between transactions
    const intervals: number[] = [];
    for (let i = 1; i < sortedTxs.length; i++) {
        const dateA = new Date(sortedTxs[i-1].date);
        const dateB = new Date(sortedTxs[i].date);
        intervals.push(dateB.getTime() - dateA.getTime());
    }

    // Calculate average interval and amount
    const avgInterval = intervals.length ? intervals.reduce((a, b) => a + b, 0) / intervals.length : Number.MAX_SAFE_INTEGER;
    const avgAmount = sortedTxs.length ? sortedTxs.reduce((sum, tx) => sum + tx.amount, 0) / sortedTxs.length : 0;

    // Determine frequency based on average interval
    let frequency: 'daily' | 'weekly' | 'monthly';
    if (avgInterval <= 86400000) { // 24 hours in milliseconds
        frequency = 'daily';
    } else if (avgInterval <= 604800000) { // 7 days in milliseconds
        frequency = 'weekly';
    } else {
        frequency = 'monthly';
    }

    // Calculate confidence based on consistency of intervals
    const stdDev = calculateStandardDeviation(intervals);
    const confidence = Math.max(0, Math.min(100, 100 - (stdDev / avgInterval) * 100));

    return {
        category: transactions[0].category,
        frequency,
        averageAmount: avgAmount,
        confidence
    };
}

function analyzeTrend(
    transactions: Transaction[],
    lastMonth: Date,
    twoMonthsAgo: Date
): { trend: 'increasing' | 'decreasing' | 'stable'; percentage: number } | null {
    const currentMonthTotal = transactions
        .filter(t => isWithinInterval(new Date(t.date), { start: lastMonth, end: new Date() }))
        .reduce((sum, tx) => sum + tx.amount, 0);

    const lastMonthTotal = transactions
        .filter(t => isWithinInterval(new Date(t.date), { start: twoMonthsAgo, end: lastMonth }))
        .reduce((sum, tx) => sum + tx.amount, 0);

    if (currentMonthTotal === 0 || lastMonthTotal === 0) {return null;}

    const percentageChange = ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;

    let trend: 'increasing' | 'decreasing' | 'stable';
    if (Math.abs(percentageChange) < 5) {
        trend = 'stable';
    } else if (percentageChange > 0) {
        trend = 'increasing';
    } else {
        trend = 'decreasing';
    }

    return { trend, percentage: Math.abs(percentageChange) };
}

function generateSuggestion(
    category: string,
    transactions: Transaction[],
    pattern: SpendingPattern | null
): string | null {
    const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);
    const avgTransaction = total / transactions.length;

    // Suggestions based on patterns and amount
    if (pattern && pattern.frequency === 'daily' && avgTransaction > 20) {
        return `Consider setting a daily budget for ${category} expenses to reduce frequent spending.`;
    }

    if (total > 1000) {
        return `Your ${category} expenses are significant. Review if there are opportunities to reduce costs or find better deals.`;
    }

    if (pattern && pattern.confidence > 90) {
        return `You have very consistent ${category} expenses. This is great for budgeting but check if you can negotiate better rates.`;
    }

    return null;
}

function calculateStandardDeviation(numbers: number[]): number {
    const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    const squareDiffs = numbers.map(value => {
        const diff = value - mean;
        return diff * diff;
    });
    const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / squareDiffs.length;
    return Math.sqrt(avgSquareDiff);
}