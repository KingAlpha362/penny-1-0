import { httpGet, httpPost } from '@/lib/http';

const ALPHAVANTAGE_API_KEY = process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_KEY ?? '';
const EXPERIAN_API_KEY = process.env.NEXT_PUBLIC_EXPERIAN_API_KEY ?? '';

interface PlaidAccount {
  id: string;
  name: string;
  type: string;
  subtype: string;
  balances: {
    available: number;
    current: number;
    limit?: number;
  };
}

interface CreditScore {
  score: number;
  provider: string;
  lastUpdated: string;
  factors: Array<{
    factor: string;
    impact: 'positive' | 'negative';
    description: string;
  }>;
  history: Array<{
    date: string;
    score: number;
  }>;
}

interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
}

class FinancialApiService {
  private static instance: FinancialApiService;
  // TODO: Replace with actual Plaid client type from SDK
  private plaidClient: unknown;

  private constructor() {
    // Initialize Plaid client
    this.initializePlaid();
  }

  public static getInstance(): FinancialApiService {
    if (!FinancialApiService.instance) {
      FinancialApiService.instance = new FinancialApiService();
    }
    return FinancialApiService.instance;
  }

  private async initializePlaid() {
    // Initialize Plaid client with your credentials
    // This would typically be done server-side
  }

  // Plaid Integration
  public async connectBankAccount(publicToken: string): Promise<string> {
    const response = await httpPost('/api/plaid/exchange-token', { publicToken });
    return response.data.accessToken;
  }

  public async getAccounts(accessToken: string): Promise<PlaidAccount[]> {
    const response = await httpPost('/api/plaid/get-accounts', { accessToken });
    return response.data.accounts;
  }

  // Credit Score Integration (Experian)
  public async getCreditScore(userId: string): Promise<CreditScore> {
    const response = await httpGet('/api/credit-score', { headers: { 'Authorization': `Bearer ${EXPERIAN_API_KEY}`, 'userId': userId } });
    return response.data;
  }

  // Real-time Market Data (Alpha Vantage)
  public async getMarketData(symbol: string): Promise<MarketData> {
    const response = await httpGet(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHAVANTAGE_API_KEY}`
    );
    const quote = response.data['Global Quote'] || {};
    return {
      symbol: quote['01. symbol'] || symbol,
      price: parseFloat(quote['05. price'] || '0'),
      change: parseFloat(quote['09. change'] || '0'),
      changePercent: parseFloat((quote['10. change percent'] || '0').toString().replace('%', '')),
      volume: parseInt(quote['06. volume'] || '0'),
      marketCap: parseFloat(quote['08. previous close'] || '0') * parseInt(quote['06. volume'] || '0')
    };
  }

  // Crypto Market Data
  public async getCryptoData(symbol: string): Promise<MarketData> {
    const response = await httpGet(
      `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${symbol}&market=USD&apikey=${ALPHAVANTAGE_API_KEY}`
    );
    const timeSeries = response.data['Time Series (Digital Currency Daily)'] || {};
    const latestDate = Object.keys(timeSeries)[0];
    const latest = timeSeries[latestDate] || {};
    const currentPrice = parseFloat(latest['4a. close (USD)'] || '0');
    const previousPrice = parseFloat(latest['1a. open (USD)'] || '0');
    const change = currentPrice - previousPrice;
    const changePercent = previousPrice ? (change / previousPrice) * 100 : 0;
    return {
      symbol,
      price: currentPrice,
      change,
      changePercent,
      volume: parseInt(latest['5. volume'] || '0'),
      marketCap: currentPrice * parseInt(latest['5. volume'] || '0')
    };
  }

  // Export data to various formats
  public async exportData(userId: string, format: 'csv' | 'pdf' | 'excel') {
    const response = await httpPost('/api/export', { userId, format }, { responseType: 'blob' as any });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `financial-report.${format}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

export const financialApi = FinancialApiService.getInstance();