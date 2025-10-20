import { analyzeSpendingPatterns } from './spending-patterns';
import { Transaction } from '@/lib/types';

describe('analyzeSpendingPatterns', () => {
  it('should return empty arrays when no transactions are provided', () => {
    const { patterns, trends, suggestions } = analyzeSpendingPatterns([]);
    expect(patterns).toEqual([]);
    expect(trends).toEqual([]);
    expect(suggestions).toEqual([]);
  });

  it('should analyze spending patterns correctly', () => {
    const transactions: Transaction[] = [
      { category: 'food', amount: 10, date: '2024-01-01', description: '', id: '1', type: 'expense', userId: '1', createdAt: '2024-01-01', updatedAt: '2024-01-01', recurring: false },
      { category: 'food', amount: 20, date: '2024-01-02', description: '', id: '2', type: 'expense', userId: '1', createdAt: '2024-01-02', updatedAt: '2024-01-02', recurring: false },
      { category: 'food', amount: 15, date: '2024-02-01', description: '', id: '3', type: 'expense', userId: '1', createdAt: '2024-02-01', updatedAt: '2024-02-01', recurring: false },
      { category: 'food', amount: 25, date: '2024-02-02', description: '', id: '4', type: 'expense', userId: '1', createdAt: '2024-02-02', updatedAt: '2024-02-02', recurring: false },
    ];
    const { patterns, trends, suggestions } = analyzeSpendingPatterns(transactions);
    expect(patterns.length).toBeGreaterThan(0);
    expect(trends.length).toBeGreaterThan(0);
    // expect(suggestions.length).toBeGreaterThan(0);
  });
});

describe('detectPattern', () => {
  it('should return null when no transactions are provided', () => {
    const detectPattern = analyzeSpendingPatterns([]).patterns;
    expect(detectPattern).toEqual([]);
  });
});

describe('analyzeTrend', () => {
  it('should return null when no transactions are provided', () => {
    const analyzeTrendResult = analyzeSpendingPatterns([]).trends;
    expect(analyzeTrendResult).toEqual([]);
  });
});

describe('generateSuggestion', () => {
  it('should return null when no transactions are provided', () => {
    const generateSuggestionResult = analyzeSpendingPatterns([]).suggestions;
    expect(generateSuggestionResult).toEqual([]);
  });
});