// This is your client-side environment configuration
export const env = {
  // Firebase Configuration
  FIREBASE_API_KEY: 'AIzaSyAYOMqvZBiyGugIYn4Y-g1RS4ZM1k0C9g8',
  FIREBASE_AUTH_DOMAIN: 'studio-4654281853-a56f4.firebaseapp.com',
  FIREBASE_PROJECT_ID: 'studio-4654281853-a56f4',
  FIREBASE_STORAGE_BUCKET: 'studio-4654281853-a56f4.firebasestorage.app',
  FIREBASE_MESSAGING_SENDER_ID: '1062419582019',
  FIREBASE_APP_ID: '1:1062419582019:web:19a099f3b328293f4b18f6',
  
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