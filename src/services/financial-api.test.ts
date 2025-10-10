import { financialApi } from './financial-api';

describe('FinancialApiService', () => {
  it('should be defined', () => {
    expect(financialApi).toBeDefined();
  });

  it('should have getAccounts method', () => {
    expect(typeof financialApi.getAccounts).toBe('function');
  });

  it('should have getCreditScore method', () => {
    expect(typeof financialApi.getCreditScore).toBe('function');
  });

  it('should have getMarketData method', () => {
    expect(typeof financialApi.getMarketData).toBe('function');
  });

  it('should have getCryptoData method', () => {
    expect(typeof financialApi.getCryptoData).toBe('function');
  });

  it('should have exportData method', () => {
    expect(typeof financialApi.exportData).toBe('function');
  });
});
