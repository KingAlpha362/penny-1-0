export type TransactionType = 'income' | 'expense';
export type TransactionCategory =
  | 'salary'
  | 'investment'
  | 'business'
  | 'other_income'
  | 'housing'
  | 'transportation'
  | 'food'
  | 'utilities'
  | 'insurance'
  | 'healthcare'
  | 'entertainment'
  | 'shopping'
  | 'other_expense';

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  category: TransactionCategory;
  date: string | Date;
  description?: string;
  recurring?: boolean;
  recurringFrequency?: 'weekly' | 'monthly' | 'yearly';
  tags?: string[];
  attachments?: string[];
  createdAt: string | Date;
  updatedAt: string | Date;
}