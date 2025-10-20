import { isWithinInterval, subMonths } from 'date-fns';
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

/**
 * Analyzes spending patterns from a list of transactions.
 */
export function analyzeSpendingPatterns(transactions: TxLike[]): {
    patterns: SpendingPattern[];
    trends: SpendingTrend[];
    suggestions: string[];
} {
    console.log('transactions', transactions);
    // 1. Prepare data: Normalize and group transactions by category.
    const { normalized, byCategory } = prepareTransactions(transactions);
    console.log('normalized', normalized);
    console.log('byCategory', byCategory);

    // 2. Analyze spending patterns, trends, and generate suggestions for each category.
    const { patterns, trends, suggestions } = analyzeCategories(byCategory);
    console.log('patterns', patterns);
    console.log('trends', trends);
    console.log('suggestions', suggestions);

    // 3. Return the analysis results.
    return { patterns, trends, suggestions };
}

/**
 * Normalizes transactions and groups them by category.
 */
function prepareTransactions(transactions: TxLike[]) {
    try {
        const normalized = transactions
            .filter((t): t is TxLike => t && typeof t.amount === 'number' && !!t.category && !!t.date)
            .map(t => ({ ...t, date: new Date(t.date) }));

        const byCategory = normalized.reduce((acc, t) => {
            if (!acc[t.category]) {
                acc[t.category] = [];
            }
            acc[t.category].push(t as TxLike as Transaction);
            return acc;
        }, {} as Record<string, Transaction[]>);

        return { normalized, byCategory };
    } catch (error) {
        console.error("Error in prepareTransactions:", error);
        return { normalized: [], byCategory: {} };
    }
}

/**
 * Analyzes spending patterns, trends, and generates suggestions for each category.
 */
function analyzeCategories(byCategory: Record<string, Transaction[]>) {
    try {
        const patterns: SpendingPattern[] = [];
        const trends: SpendingTrend[] = [];
        const suggestions: string[] = [];

        const now = new Date();
        const lastMonth = subMonths(now, 1);
        const twoMonthsAgo = subMonths(now, 2);

        Object.entries(byCategory).forEach(([category, txs]) => {
            const pattern = detectPattern(txs);
            console.log('pattern', pattern);
            if (pattern) {
                patterns.push(pattern);
            }

            const trend = analyzeTrend(txs, lastMonth, twoMonthsAgo);
             console.log('trend', trend);
            if (trend) {
                trends.push(trend);
            }

            const suggestion = generateSuggestion(category, txs, pattern, trend);
             console.log('suggestion', suggestion);
            if (suggestion) {
                suggestions.push(suggestion);
            }
        });

        return { patterns, trends, suggestions };
    } catch (error) {
        console.error("Error in analyzeCategories:", error);
        return { patterns: [], trends: [], suggestions: [] };
    }
}

function detectPattern(transactions: Transaction[]): SpendingPattern | null {
    try {
        console.log('detectPattern transactions', transactions);
        if (!transactions || transactions.length === 0) {
            return null;
        }

        if (transactions.length < 2) {
            const pattern = {
                category: transactions[0].category,
                frequency: 'monthly' as 'monthly',
                averageAmount: transactions[0].amount,
                confidence: 50,
            };
            console.log('detectPattern pattern', pattern);
            return pattern;
        }

        const sortedTxs = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        const intervals: number[] = [];
        for (let i = 1; i < sortedTxs.length; i++) {
            intervals.push(new Date(sortedTxs[i].date).getTime() - new Date(sortedTxs[i - 1].date).getTime());
        }

        const avgInterval = intervals.length ? intervals.reduce((a, b) => a + b, 0) / intervals.length : Number.MAX_SAFE_INTEGER;
        const avgAmount = sortedTxs.reduce((sum, tx) => sum + tx.amount, 0) / sortedTxs.length;

        let frequency: 'daily' | 'weekly' | 'monthly';
        if (avgInterval <= 86400000) { // 24 hours in milliseconds
            frequency = 'daily';
        } else if (avgInterval <= 604800000) { // 7 days in milliseconds
            frequency = 'weekly';
        } else {
            frequency = 'monthly';
        }

        const stdDev = calculateStandardDeviation(intervals);
        let confidence = 0;
        if (avgInterval > 0) {
            confidence = Math.max(0, Math.min(100, 100 - (stdDev / avgInterval) * 100));
        }

        const pattern: SpendingPattern = {
            category: transactions[0].category,
            frequency,
            averageAmount: avgAmount,
            confidence
        };
        console.log('detectPattern pattern', pattern);
        return pattern;
    } catch (error) {
        console.error("Error in detectPattern:", error);
        return null;
    }
}

function analyzeTrend(
    transactions: Transaction[],
    lastMonth: Date,
    twoMonthsAgo: Date
): SpendingTrend | null {
    try {
         console.log('analyzeTrend transactions', transactions);
        const currentMonthTotal = transactions
            .filter(t => isWithinInterval(new Date(t.date), { start: lastMonth, end: new Date() }))
            .reduce((sum, tx) => sum + tx.amount, 0);

        const lastMonthTotal = transactions
            .filter(t => isWithinInterval(new Date(t.date), { start: twoMonthsAgo, end: lastMonth }))
            .reduce((sum, tx) => sum + tx.amount, 0);

        if (currentMonthTotal === 0 && lastMonthTotal === 0) {
            const trend: SpendingTrend = { category: transactions[0].category, trend: 'stable' as 'stable', percentage: 0 };
            console.log('analyzeTrend trend', trend);
            return trend;
        }

        if (lastMonthTotal === 0) {
            const trend: SpendingTrend = { category: transactions[0].category, trend: 'increasing' as 'increasing', percentage: 100 };
             console.log('analyzeTrend trend', trend);
            return trend;
        }

        const percentageChange = ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;

        let trend: 'increasing' | 'decreasing' | 'stable';
        if (Math.abs(percentageChange) < 5) {
            trend = 'stable';
        } else if (percentageChange > 0) {
            trend = 'increasing';
        } else {
            trend = 'decreasing';
        }

        const trendResult: SpendingTrend = { category: transactions[0].category, trend, percentage: Math.abs(percentageChange) };
        console.log('analyzeTrend trendResult', trendResult);
        return trendResult;
    } catch (error) {
        console.error("Error in analyzeTrend:", error);
        return null;
    }
}

function generateSuggestion(
    category: string,
    transactions: Transaction[],
    pattern: SpendingPattern | null,
    trend: SpendingTrend | null
): string | null {
    try {
         console.log('generateSuggestion transactions', transactions);
         console.log('generateSuggestion pattern', pattern);
         console.log('generateSuggestion trend', trend);
        const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);
        const avgTransaction = total / transactions.length;

        if (pattern && pattern.frequency === 'daily' && avgTransaction > 20) {
            return `Consider setting a daily budget for ${category} expenses to reduce frequent spending.`;
        }

        if (total > 1000) {
            return `Your ${category} expenses are significant. Review if there are opportunities to reduce costs or find better deals.`;
        }

        if (pattern && pattern.confidence > 90) {
            return `You have very consistent ${category} expenses. This is great for budgeting but check if you can negotiate better rates.`;
        }

        if (trend && trend.trend === 'increasing') {
            return `Your ${category} expenses are increasing. Consider ways to reduce them.`;
        }

        if (trend && trend.trend === 'decreasing') {
            return `Your ${category} expenses are decreasing. Keep up the good work!`;
        }

        return null;
    } catch (error) {
        console.error("Error in generateSuggestion:", error);
        return null;
    }
}

function calculateStandardDeviation(numbers: number[]): number {
    try{
        const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
        const squareDiffs = numbers.map(value => {
            const diff = value - mean;
            return diff * diff;
        });
        const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / squareDiffs.length;
        return Math.sqrt(avgSquareDiff);
    } catch (error) {
        console.error("Error in calculateStandardDeviation:", error);
        return 0;
    }
}