
export type Transaction = {
  id: string;
  date: string;
  category: "Groceries" | "Salary" | "Online Shopping" | "Dining" | "Rent" | "Utilities" | "Freelance";
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
];

export const transactionCategories = [
    "Groceries", 
    "Salary", 
    "Online Shopping", 
    "Dining", 
    "Rent",
    "Utilities",
    "Freelance",
];
