import axios from 'axios';

const PLAID_BASE_URL = process.env.NEXT_PUBLIC_PLAID_BASE_URL;
const ALPHAVANTAGE_API_KEY = process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_KEY;
const EXPERIAN_API_KEY = process.env.NEXT_PUBLIC_EXPERIAN_API_KEY;

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
  private plaidClient: any; // Replace with Plaid client type

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
    try {
      const response = await axios.post('/api/plaid/exchange-token', { publicToken });
      return response.data.accessToken;
    } catch (error) {
      console.error('Error connecting bank account:', error);
      throw error;
    }
  }

  public async getAccounts(accessToken: string): Promise<PlaidAccount[]> {
    try {
      const response = await axios.post('/api/plaid/get-accounts', { accessToken });
      return response.data.accounts;
    } catch (error) {
      console.error('Error fetching accounts:', error);
      throw error;
    }
  }

  // Credit Score Integration (Experian)
  public async getCreditScore(userId: string): Promise<CreditScore> {
    try {
      const response = await axios.get('/api/credit-score', {
        headers: {
          'Authorization': `Bearer ${EXPERIAN_API_KEY}`,
          'userId': userId
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching credit score:', error);
      throw error;
    }
  }

  // Real-time Market Data (Alpha Vantage)
  public async getMarketData(symbol: string): Promise<MarketData> {
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHAVANTAGE_API_KEY}`
      );
      
      const quote = response.data['Global Quote'];
      return {
        symbol: quote['01. symbol'],
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
        volume: parseInt(quote['06. volume']),
        marketCap: parseFloat(quote['08. previous close']) * parseInt(quote['06. volume'])
      };
    } catch (error) {
      console.error('Error fetching market data:', error);
      throw error;
    }
  }

  // Crypto Market Data
  public async getCryptoData(symbol: string): Promise<MarketData> {
    try {
      // For crypto we need to use DIGITAL_CURRENCY_DAILY and append USD to the symbol
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${symbol}&market=USD&apikey=${ALPHAVANTAGE_API_KEY}`
      );
      
      const timeSeries = response.data['Time Series (Digital Currency Daily)'];
      if (!timeSeries || Object.keys(timeSeries).length === 0) {
        throw new Error('No crypto data available for the specified symbol');
      }

      // Get the latest date's data
      const latestDate = Object.keys(timeSeries)[0];
      const latest = timeSeries[latestDate];
      
      if (!latest) {
        throw new Error('Could not retrieve latest crypto data');
      }
      
      const currentPrice = parseFloat(latest['4a. close (USD)']);
      const previousPrice = parseFloat(latest['1a. open (USD)']);
      const change = currentPrice - previousPrice;
      const changePercent = (change / previousPrice) * 100;
      
      return {
        symbol,
        price: currentPrice,
        change,
        changePercent,
        volume: parseInt(latest['5. volume']),
        marketCap: currentPrice * parseInt(latest['5. volume']) // Approximate market cap
      };
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      throw error;
    }
  }

  // Export data to various formats
  public async exportData(userId: string, format: 'csv' | 'pdf' | 'excel') {
    try {
      const response = await axios.post('/api/export', {
        userId,
        format
      }, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `financial-report.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting data:', error);
      throw error;
    }
  }
}

export const financialApi = FinancialApiService.getInstance();