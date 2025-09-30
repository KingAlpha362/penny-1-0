
export type Transaction = {
  id: string;
  date: string;
  category: "Groceries" | "Salary" | "Online Shopping" | "Dining" | "Rent" | "Utilities" | "Freelance" | "Transportation" | "Entertainment";
  description: string;
  amount: number;
  type: 'income' | 'expense';
};

export const transactions: Transaction[] = [
  {
    id: "1",
    date: "2024-07-20",
    category: "Groceries",
    description: "Local Market",
    amount: 80.00,
    type: "expense",
  },
  {
    id: "2",
    date: "2024-07-15",
    category: "Salary",
    description: "Tech Solutions Inc.",
    amount: 2500.00,
    type: "income",
  },
  {
    id: "3",
    date: "2024-07-10",
    category: "Online Shopping",
    description: "Amazon",
    amount: 150.00,
    type: "expense",
  },
  {
    id: "4",
    date: "2024-07-05",
    category: "Dining",
    description: "Cafe Bistro",
    amount: 60.00,
    type: "expense",
  },
  {
    id: "5",
    date: "2024-07-01",
    category: "Rent",
    description: "Apartment",
    amount: 800.00,
    type: "expense",
  },
  {
    id: "6",
    date: "2024-06-25",
    category: "Utilities",
    description: "Electricity Bill",
    amount: 75.50,
    type: "expense",
  },
  {
    id: "7",
    date: "2024-06-15",
    category: "Salary",
    description: "Tech Solutions Inc.",
    amount: 2500.00,
    type: "income",
  },
   {
    id: "8",
    date: "2024-06-10",
    category: "Freelance",
    description: "Web Design Project",
    amount: 500.00,
    type: "income",
  },
  { id: "9", date: "2024-07-22", category: "Transportation", description: "Gasoline", amount: 40.00, type: "expense" },
  { id: "10", date: "2024-07-21", category: "Entertainment", description: "Movie night", amount: 35.00, type: "expense" },
  { id: "11", date: "2024-07-18", category: "Groceries", description: "Supermarket", amount: 120.50, type: "expense" },
  { id: "12", date: "2024-07-17", category: "Utilities", description: "Internet Bill", amount: 50.00, type: "expense" },
];

export const transactionCategories = [
    "Groceries", 
    "Salary", 
    "Online Shopping", 
    "Dining", 
    "Rent",
    "Utilities",
    "Freelance",
    "Transportation",
    "Entertainment",
];

export type Budget = {
  id: string;
  category: "Groceries" | "Utilities" | "Transportation" | "Entertainment";
  amount: number;
};

export const budgets: Budget[] = [
  { id: "1", category: "Groceries", amount: 500 },
  { id: "2", category: "Utilities", amount: 200 },
  { id: "3", category: "Transportation", amount: 150 },
  { id: "4", category: "Entertainment", amount: 250 },
];

export type Subscription = {
    id: string;
    name: string;
    amount: number;
    billingCycle: 'Monthly' | 'Annually';
    nextDueDate: string;
    status: 'Active' | 'Canceled';
};

export const activeSubscriptions: Subscription[] = [
    { id: '1', name: 'Premium Streaming', amount: 15.99, billingCycle: 'Monthly', nextDueDate: 'July 15, 2024', status: 'Active' },
    { id: '2', name: 'Fitness Club', amount: 45.00, billingCycle: 'Monthly', nextDueDate: 'July 20, 2024', status: 'Active' },
    { id: '3', name: 'Home Insurance', amount: 120.00, billingCycle: 'Annually', nextDueDate: 'August 1, 2024', status: 'Active' },
];

export const inactiveSubscriptions: Subscription[] = [
    { id: '1', name: 'Music Streaming', amount: 9.99, billingCycle: 'Monthly', nextDueDate: 'N/A', status: 'Canceled' },
];

export type Debt = {
  id: string;
  type: string;
  balance: number;
  interestRate: number;
  minPayment: number;
  payoffDate: string;
};

export const debts: Debt[] = [
    { id: '1', type: 'Personal Loan', balance: 5000, interestRate: 8.5, minPayment: 150, payoffDate: '1y 8m' },
    { id: '2', type: 'Credit Card A', balance: 4500, interestRate: 18.0, minPayment: 100, payoffDate: '3y 2m' },
    { id: '3', type: 'Credit Card B', balance: 3000, interestRate: 22.0, minPayment: 100, payoffDate: '2y 10m' },
];


export type DebtGoal = {
  id: string;
  title: string;
  targetDate: string;
  currentAmount: number;
  totalAmount: number;
  type: 'payoff' | 'reduce';
};

export const debtGoals: DebtGoal[] = [
    { id: '1', title: 'Pay off Credit Card A', targetDate: 'Dec 2025', currentAmount: 3375, totalAmount: 4500, type: 'payoff' },
    { id: '2', title: 'Reduce Personal Loan Balance', targetDate: 'Jun 2025', currentAmount: 2500, totalAmount: 5000, type: 'reduce' },
    { id: '3', title: 'First Debt Free Year', targetDate: 'Jan 2026', currentAmount: 3125, totalAmount: 12500, type: 'payoff' },
];
