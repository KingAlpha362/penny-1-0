// This is your client-side environment configuration
export const env = {
  // Firebase Configuration
  FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
  FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
  FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
  FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
  FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '',
  
  // Financial APIs
  PLAID_CLIENT_ID: process.env.NEXT_PUBLIC_PLAID_CLIENT_ID ?? '',
  PLAID_SECRET: process.env.NEXT_PUBLIC_PLAID_SECRET ?? '',
  PLAID_ENV: process.env.NEXT_PUBLIC_PLAID_ENV ?? 'sandbox',
  
  // Market Data APIs
  ALPHAVANTAGE_API_KEY: process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_KEY ?? '',
  
  // Credit Score API
  EXPERIAN_API_KEY: process.env.NEXT_PUBLIC_EXPERIAN_API_KEY ?? '',
  
  // Other Services
  STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '',
  
  // Feature Flags
  ENABLE_CRYPTO: process.env.NEXT_PUBLIC_ENABLE_CRYPTO === 'true',
  ENABLE_AI_FEATURES: process.env.NEXT_PUBLIC_ENABLE_AI_FEATURES === 'true',
  
  // API Endpoints
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  
  // Validate environment
  validate() {
    const requiredVars = [
      'PLAID_CLIENT_ID',
      'ALPHAVANTAGE_API_KEY',
      'EXPERIAN_API_KEY',
      'STRIPE_PUBLISHABLE_KEY',
    ];

    const missing = requiredVars.filter(key => !this[key as keyof typeof env]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
  }
};