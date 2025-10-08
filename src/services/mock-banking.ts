import { faker } from '@faker-js/faker';

export interface BankAccount {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  mask: string; // Last 4 digits
  institution: {
    name: string;
    logo: string;
  };
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  description: string;
  category: string;
  type: 'credit' | 'debit';
  pending: boolean;
  merchant: {
    name: string;
    category: string;
    logo?: string;
  };
}

// Common merchants for realistic data
const commonMerchants = [
  { name: 'Amazon', category: 'Shopping', logo: '/logos/merchants/amazon.svg' },
  { name: 'Netflix', category: 'Entertainment', logo: '/logos/merchants/netflix.svg' },
  { name: 'Spotify', category: 'Entertainment', logo: '/logos/merchants/spotify.svg' },
  { name: 'Uber', category: 'Transportation', logo: '/logos/merchants/uber.svg' },
  { name: 'Walmart', category: 'Shopping', logo: '/logos/merchants/walmart.svg' },
  { name: 'Target', category: 'Shopping', logo: '/logos/merchants/target.svg' },
  { name: 'Starbucks', category: 'Food & Drink', logo: '/logos/merchants/starbucks.svg' },
];

// Common banks for realistic data
const commonBanks = [
  { name: 'Chase', logo: '/logos/banks/chase.svg' },
  { name: 'Bank of America', logo: '/logos/banks/bankofamerica.svg' },
  { name: 'Wells Fargo', logo: '/logos/banks/wellsfargo.svg' },
  { name: 'Citibank', logo: '/logos/banks/citibank.svg' },
];

class MockBankingService {
  private static instance: MockBankingService;
  private accounts: BankAccount[] = [];
  private simulatedDelay = 800; // ms

  private constructor() {
    this.generateAccounts();
  }

  public static getInstance(): MockBankingService {
    if (!MockBankingService.instance) {
      MockBankingService.instance = new MockBankingService();
    }
    return MockBankingService.instance;
  }

  private generateAccounts(): void {
    // Generate 2-4 accounts
    const numAccounts = faker.number.int({ min: 2, max: 4 });
    
    for (let i = 0; i < numAccounts; i++) {
      const type = faker.helpers.arrayElement(['checking', 'savings', 'credit', 'investment']) as BankAccount['type'];
      const institution = faker.helpers.arrayElement(commonBanks);
      
      const account: BankAccount = {
        id: faker.string.uuid(),
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} Account`,
        type,
        balance: faker.number.float({ min: 1000, max: 50000, fractionDigits: 2 }),
        mask: faker.string.numeric(4),
        institution,
        transactions: this.generateTransactions(),
      };
      
      this.accounts.push(account);
    }
  }

  private generateTransactions(): Transaction[] {
    const transactions: Transaction[] = [];
    const numTransactions = faker.number.int({ min: 20, max: 50 });
    
    for (let i = 0; i < numTransactions; i++) {
      const merchant = faker.helpers.arrayElement(commonMerchants);
      const isDebit = faker.datatype.boolean();
      
      const transaction: Transaction = {
        id: faker.string.uuid(),
        date: faker.date.recent({ days: 30 }),
        amount: faker.number.float({ min: 1, max: isDebit ? 500 : 5000, fractionDigits: 2 }),
        description: faker.helpers.arrayElement([
          merchant.name,
          `${merchant.name} - ${faker.location.city()}`,
          `${merchant.name} #${faker.string.numeric(4)}`,
        ]),
        category: merchant.category,
        type: isDebit ? 'debit' : 'credit',
        pending: faker.datatype.boolean({ probability: 0.1 }),
        merchant: {
          ...merchant,
          logo: merchant.logo,
        },
      };
      
      transactions.push(transaction);
    }
    
    // Sort by date, most recent first
    return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  // Simulated API methods
  public async getAccounts(): Promise<BankAccount[]> {
    await this.delay();
    return this.accounts;
  }

  public async getAccount(id: string): Promise<BankAccount | null> {
    await this.delay();
    return this.accounts.find(account => account.id === id) || null;
  }

  public async getTransactions(accountId: string, options: {
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  } = {}): Promise<Transaction[]> {
    await this.delay();
    const account = await this.getAccount(accountId);
    if (!account) {return [];}

    let transactions = [...account.transactions];

    if (options.startDate) {
      transactions = transactions.filter(t => t.date >= options.startDate!);
    }

    if (options.endDate) {
      transactions = transactions.filter(t => t.date <= options.endDate!);
    }

    if (options.limit) {
      transactions = transactions.slice(0, options.limit);
    }

    return transactions;
  }

  public async refreshTransactions(): Promise<void> {
    await this.delay();
    // Add some new transactions
    this.accounts.forEach(account => {
      const newTransactions = this.generateTransactions().slice(0, 5);
      account.transactions = [...newTransactions, ...account.transactions];
    });
  }

  private async delay(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, this.simulatedDelay));
  }

  // Analytics methods
  public async getSpendingByCategory(accountId: string, timeframe: 'week' | 'month' | 'year'): Promise<{
    category: string;
    amount: number;
    count: number;
  }[]> {
    const account = await this.getAccount(accountId);
    if (!account) {return [];}

    const now = new Date();
    const startDate = new Date();
    switch (timeframe) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    const transactions = account.transactions.filter(t => 
      t.date >= startDate && t.type === 'debit'
    );

    const spending = transactions.reduce((acc, t) => {
      if (!acc[t.category]) {
        acc[t.category] = { amount: 0, count: 0 };
      }
      acc[t.category].amount += t.amount;
      acc[t.category].count += 1;
      return acc;
    }, {} as Record<string, { amount: number; count: number; }>);

    return Object.entries(spending).map(([category, data]) => ({
      category,
      amount: Number(data.amount.toFixed(2)),
      count: data.count,
    }));
  }

  // Recurring transactions detection
  public async getRecurringTransactions(accountId: string): Promise<{
    merchant: string;
    amount: number;
    frequency: 'weekly' | 'monthly';
    lastDate: Date;
    nextDate: Date;
  }[]> {
    const account = await this.getAccount(accountId);
    if (!account) {return [];}

    // Group transactions by merchant
    const byMerchant = account.transactions.reduce((acc, t) => {
      if (!acc[t.merchant.name]) {
        acc[t.merchant.name] = [];
      }
      acc[t.merchant.name].push(t);
      return acc;
    }, {} as Record<string, Transaction[]>);

    const recurring: ReturnType<typeof this.getRecurringTransactions> extends Promise<infer T> ? T : never = [];

    // Analyze each merchant's transactions for patterns
    Object.entries(byMerchant).forEach(([merchant, transactions]) => {
      if (transactions.length < 2) {return;}

      const sortedDates = transactions
        .map(t => t.date.getTime())
        .sort((a, b) => a - b);

      // Calculate average time between transactions
      const intervals = sortedDates
        .slice(1)
        .map((date, i) => date - sortedDates[i]);

      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const isConsistent = intervals.every(interval => 
        Math.abs(interval - avgInterval) < (1000 * 60 * 60 * 24 * 3) // 3 days variance
      );

      if (isConsistent && transactions.length >= 3) {
        const frequency = avgInterval < (1000 * 60 * 60 * 24 * 10)
          ? 'weekly'
          : 'monthly';

        const lastDate = new Date(Math.max(...sortedDates));
        const nextDate = new Date(lastDate.getTime() + avgInterval);

        recurring.push({
          merchant,
          amount: Number(transactions[0].amount.toFixed(2)),
          frequency,
          lastDate,
          nextDate,
        });
      }
    });

    return recurring;
  }
}

export const mockBanking = MockBankingService.getInstance();