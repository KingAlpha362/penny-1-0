import * as z from 'zod';
import { TransactionType, TransactionCategory } from '@/app/lib/types';

const currencySchema = z.number()
  .min(0.01, 'Amount must be greater than 0')
  .max(1000000, 'Amount cannot exceed $1,000,000');

export const transactionSchema = z.object({
  type: z.enum(['income', 'expense'] as [TransactionType, TransactionType], {
    required_error: 'Please select a transaction type',
  }),
  amount: currencySchema,
  category: z.enum([
    'salary',
    'investment',
    'business',
    'other_income',
    'housing',
    'transportation',
    'food',
    'utilities',
    'insurance',
    'healthcare',
    'entertainment',
    'shopping',
    'other_expense'
  ] as [TransactionCategory, ...TransactionCategory[]], {
    required_error: 'Please select a category',
  }),
  date: z.string().or(z.date()),
  description: z.string()
    .min(1, 'Description is required')
    .max(100, 'Description must be 100 characters or less'),
  recurring: z.boolean().optional(),
  recurringFrequency: z.enum(['weekly', 'monthly', 'yearly']).optional(),
  notes: z.string()
    .max(500, 'Notes must be 500 characters or less')
    .optional(),
  tags: z.array(z.string()).optional(),
});

export const userProfileSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be 50 characters or less'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .optional(),
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    sms: z.boolean()
  }),
  currency: z.string()
    .min(3, 'Currency code must be 3 characters')
    .max(3, 'Currency code must be 3 characters')
    .regex(/^[A-Z]{3}$/, 'Invalid currency code')
    .default('USD'),
  timezone: z.string()
    .min(1, 'Timezone is required')
    .default('UTC'),
});

export const budgetSchema = z.object({
  name: z.string()
    .min(2, 'Budget name must be at least 2 characters')
    .max(50, 'Budget name must be 50 characters or less'),
  amount: currencySchema,
  category: z.string()
    .min(1, 'Category is required'),
  period: z.enum(['weekly', 'monthly', 'yearly'], {
    required_error: 'Please select a budget period',
  }),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date())
    .optional()
    .refine(
      (date) => {
        if (!date) return true;
        return new Date(date) > new Date();
      },
      'End date must be in the future'
    ),
  rollover: z.boolean()
    .default(false),
  alerts: z.object({
    enabled: z.boolean().default(true),
    threshold: z.number()
      .min(1, 'Threshold must be greater than 0')
      .max(100, 'Threshold must be 100 or less')
      .default(80),
  }).optional(),
});

export const accountSchema = z.object({
  name: z.string()
    .min(1, 'Account name is required')
    .max(50, 'Account name must be 50 characters or less'),
  type: z.enum(['checking', 'savings', 'credit', 'investment'], {
    required_error: 'Please select an account type',
  }),
  balance: currencySchema,
  accountNumber: z.string()
    .regex(/^\d{4,17}$/, 'Invalid account number')
    .transform(val => val.slice(-4)), // Only store last 4 digits
  provider: z.string()
    .min(1, 'Provider name is required')
    .max(50, 'Provider name must be 50 characters or less'),
});

export const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be 100 characters or less'),
  rememberMe: z.boolean().optional(),
});

export const registrationSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be 100 characters or less')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: z.string()
    .min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});