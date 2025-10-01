export type Transaction = {
  id: string;
  date: any; 
  category: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  userId: string;
};
