
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LayoutDashboard, Search, TrendingUp, Wallet, ShieldCheck, HelpCircle, Lock, History } from 'lucide-react';
import { AnimatedHero } from '@/components/landing/animated-hero';
import HeroSection from '@/components/blocks/hero-section-1';
import { AnimatedFeatures } from '@/components/landing/animated-features';
import { AnimatedStats } from '@/components/landing/animated-stats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: <LayoutDashboard className="h-8 w-8 text-primary" />,
    title: 'All-in-One Dashboard',
    description: 'Get a complete overview of your financial health at a glance. Track your balance, income, and expenses effortlessly.',
  },
  {
    icon: <Search className="h-8 w-8 text-primary" />,
    title: 'Smart Transactions',
    description: 'Log, categorize, and search your transactions with ease. Understand where your money is going.',
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: 'Investment Tracking',
    description: 'Monitor your portfolio performance. Keep track of your stocks, crypto, and funds in one place.',
  },
  {
    icon: <Wallet className="h-8 w-8 text-primary" />,
    title: 'Effortless Budgeting',
    description: 'Create and manage budgets that work for you. Set limits and get forecasts on your spending habits.',
  },
];

const supportFeatures = [
  {
    icon: <HelpCircle className="h-8 w-8 text-primary" />,
    title: '24/7 Support',
    description: 'Our team is available around the clock to help with any questions or issues you may have.',
  },
  {
    icon: <Lock className="h-8 w-8 text-primary" />,
    title: 'Bank-Level Security',
    description: 'Your data is protected with the same level of security as a bank.',
  },
  {
    icon: <History className="h-8 w-8 text-primary" />,
    title: '99.9% Uptime',
    description: 'You can count on us to be there when you need us. We have a 99.9% uptime guarantee.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Data Privacy',
    description: 'We do not sell your data. Your privacy is our top priority.',
  },
];


export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
        <nav className="container mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="material-icons text-primary text-3xl">
              savings
            </span>
            <h1 className="text-2xl font-bold text-foreground">
              PennyWise
            </h1>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <a
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
              href="#"
            >
              Features
            </a>
            <Link
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
              href="/pricing"
            >
              Pricing
            </Link>
            <a
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
              href="#"
            >
              About
            </a>
          </div>
          <div className="flex items-center space-x-4">
             <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button className="shadow-sm" asChild>
               <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </nav>
      </header>
      
      <main className="flex-grow">
  <AnimatedHero />
  {/* Integrated HeroSection bundle (PennyWise component bundle) */}
  <HeroSection />
        
        {/* Dashboard Preview */}
        <section className="container mx-auto px-6 pb-24 md:pb-32">
          <div className="dashboard-preview relative rounded-2xl border border-foreground/10 shadow-2xl overflow-hidden group transition-all duration-300 bg-gradient-to-br from-background via-background/95 to-background/90">
            <div className="relative w-full h-[600px]">
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl p-6">
                  <div className="dashboard-card bg-card/95 backdrop-blur-sm p-6 rounded-xl border border-foreground/10 hover:border-primary/20 transition-colors duration-300">
                    <h3 className="text-lg font-semibold mb-2">Total Balance</h3>
                    <p className="text-3xl font-bold text-primary">$4,089.00</p>
                  </div>
                  <div className="dashboard-card bg-card/95 backdrop-blur-sm p-6 rounded-xl border border-foreground/10 hover:border-primary/20 transition-colors duration-300">
                    <h3 className="text-lg font-semibold mb-2">Income</h3>
                    <p className="text-3xl font-bold text-green-500">$5,500.00</p>
                  </div>
                  <div className="dashboard-card bg-card/95 backdrop-blur-sm p-6 rounded-xl border border-foreground/10 hover:border-primary/20 transition-colors duration-300">
                    <h3 className="text-lg font-semibold mb-2">Expenses</h3>
                    <p className="text-3xl font-bold text-red-500">$1,411.00</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl p-6">
                  <div className="dashboard-card bg-card/95 backdrop-blur-sm p-6 rounded-xl border border-foreground/10 hover:border-primary/20 transition-colors duration-300">
                    <h3 className="text-lg font-semibold mb-4">Balance History</h3>
                    <div className="h-40 bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg"></div>
                  </div>
                  <div className="dashboard-card bg-card/95 backdrop-blur-sm p-6 rounded-xl border border-foreground/10 hover:border-primary/20 transition-colors duration-300">
                    <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-2 rounded-lg hover:bg-primary/5 transition-colors duration-200">
                        <div>
                          <p className="font-medium">Local Market</p>
                          <p className="text-sm text-muted-foreground">Groceries</p>
                        </div>
                        <p className="text-red-500">-$80.00</p>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded-lg hover:bg-primary/5 transition-colors duration-200">
                        <div>
                          <p className="font-medium">Tech Solutions Inc.</p>
                          <p className="text-sm text-muted-foreground">Salary</p>
                        </div>
                        <p className="text-green-500">+$2,500.00</p>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded-lg hover:bg-primary/5 transition-colors duration-200">
                        <div>
                          <p className="font-medium">Amazon</p>
                          <p className="text-sm text-muted-foreground">Online Shopping</p>
                        </div>
                        <p className="text-red-500">-$150.00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent pointer-events-none rounded-xl" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col items-start bg-background/80 backdrop-blur-md rounded-b-xl border-t border-foreground/10">
              <h3 className="text-lg md:text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
                <span className="material-icons text-primary align-middle">dashboard</span>
                Live Dashboard Preview
              </h3>
              <p className="text-muted-foreground text-sm md:text-base max-w-xl">
                See your total balance, income, expenses, and recent transactions at a glance. PennyWise makes managing your finances simple, visual, and stress-free.
              </p>
            </div>
          </div>
        </section>

        <AnimatedStats />
        
        <AnimatedFeatures />

        {/* AI Features Section */}
        <section className="container mx-auto px-6 pb-24 md:pb-32">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Powered by AI</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-2">Your Personal Financial Copilot</h2>
            <p className="mt-4 text-lg text-muted-foreground">Experience smart insights and automated financial planning</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Smart Spending Analysis</h3>
                  <p className="text-muted-foreground">Get AI-powered insights into your spending patterns and recommendations for saving opportunities.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Automated Bill Detection</h3>
                  <p className="text-muted-foreground">Our AI automatically identifies recurring bills and subscriptions, helping you avoid unnecessary expenses.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Smart Investment Suggestions</h3>
                  <p className="text-muted-foreground">Receive personalized investment recommendations based on your goals and risk tolerance.</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-2xl p-8">
              <div className="bg-background/80 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="material-icons text-primary text-xl">smart_toy</span>
                  </div>
                  <h4 className="font-semibold">AI Assistant</h4>
                </div>
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-sm">Based on your spending patterns, you could save $240/month by optimizing your food delivery expenses.</p>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-3">
                    <p className="text-sm">I notice you have 3 subscription services with overlapping features. Would you like me to analyze which ones you use most?</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs bg-primary/20 hover:bg-primary/30 text-primary px-3 py-1.5 rounded-full transition-colors">
                      Show Analysis
                    </button>
                    <button className="text-xs bg-foreground/10 hover:bg-foreground/20 px-3 py-1.5 rounded-full transition-colors">
                      Remind Later
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Multi-Currency Section */}
        <section className="container mx-auto px-6 pb-24 md:pb-32 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-3xl"></div>
          <div className="relative">
            <div className="text-center mb-16">
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">Global Finance</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-2">Your Money, Any Currency</h2>
              <p className="mt-4 text-lg text-muted-foreground">Support for multiple currencies and automatic exchange rate updates</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
                <span className="text-2xl">$</span>
                <div>
                  <p className="font-medium">USD</p>
                  <p className="text-xs text-muted-foreground">US Dollar</p>
                </div>
              </div>
              <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
                <span className="text-2xl">€</span>
                <div>
                  <p className="font-medium">EUR</p>
                  <p className="text-xs text-muted-foreground">Euro</p>
                </div>
              </div>
              <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
                <span className="text-2xl">£</span>
                <div>
                  <p className="font-medium">GBP</p>
                  <p className="text-xs text-muted-foreground">British Pound</p>
                </div>
              </div>
              <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
                <span className="text-2xl">¥</span>
                <div>
                  <p className="font-medium">JPY</p>
                  <p className="text-xs text-muted-foreground">Japanese Yen</p>
                </div>
              </div>
              <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
                <span className="text-2xl">R</span>
                <div>
                  <p className="font-medium">ZAR</p>
                  <p className="text-xs text-muted-foreground">South African Rand</p>
                </div>
              </div>
              <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
                <span className="text-2xl">A$</span>
                <div>
                  <p className="font-medium">AUD</p>
                  <p className="text-xs text-muted-foreground">Australian Dollar</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reports & Analytics Section */}
        <section className="container mx-auto px-6 pb-24 md:pb-32">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Deep Insights</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-2">Beautiful Reports & Analytics</h2>
            <p className="mt-4 text-lg text-muted-foreground">Understand your finances with stunning visualizations and detailed reports</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-background/80 backdrop-blur-sm rounded-xl p-6 border border-foreground/10">
                <h3 className="text-xl font-semibold mb-4">Spending by Category</h3>
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-lg"></div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-background/80 backdrop-blur-sm rounded-xl p-6 border border-foreground/10">
                <h3 className="text-xl font-semibold mb-4">Monthly Trends</h3>
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="container mx-auto px-6 pb-24 md:pb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How PennyWise Works</h2>
            <p className="mt-4 text-lg text-muted-foreground">Get started in three simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Connect Your Accounts</h3>
              <p className="text-muted-foreground">Securely link your bank accounts and credit cards in just a few clicks</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Set Your Goals</h3>
              <p className="text-muted-foreground">Create custom budgets and financial goals that match your lifestyle</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Track & Grow</h3>
              <p className="text-muted-foreground">Watch your finances improve with real-time insights and smart recommendations</p>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="container mx-auto px-6 pb-24 md:pb-32">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Bank-Grade Security</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-2">Your Security is Our Priority</h2>
            <p className="mt-4 text-lg text-muted-foreground">Enterprise-level security features to keep your data safe</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background/80 backdrop-blur-sm rounded-xl p-8 border border-foreground/10">
              <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">256-bit Encryption</h3>
              <p className="text-muted-foreground">Your data is encrypted using bank-level security standards, ensuring your information stays private and secure.</p>
            </div>
            <div className="bg-background/80 backdrop-blur-sm rounded-xl p-8 border border-foreground/10">
              <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Two-Factor Authentication</h3>
              <p className="text-muted-foreground">Add an extra layer of security to your account with 2FA, including support for authenticator apps and biometrics.</p>
            </div>
            <div className="bg-background/80 backdrop-blur-sm rounded-xl p-8 border border-foreground/10">
              <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">SOC 2 Certified</h3>
              <p className="text-muted-foreground">We maintain strict security protocols and undergo regular audits to ensure your data is protected.</p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="container mx-auto px-6 pb-24 md:pb-32">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Simple Pricing</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-2">Choose Your Plan</h2>
            <p className="mt-4 text-lg text-muted-foreground">Start free, upgrade when you need more features</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-background/80 backdrop-blur-sm rounded-xl p-8 border border-foreground/10">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold">Basic</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">Free</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Connect up to 2 accounts</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Basic budgeting tools</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Monthly insights</span>
                </li>
              </ul>
              <Button className="w-full" variant="outline">Get Started</Button>
            </div>
            <div className="bg-gradient-to-b from-primary/20 to-primary rounded-xl p-8 border-2 border-primary relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold">Pro</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$9.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unlimited accounts</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Advanced AI insights</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Custom categories</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Investment tracking</span>
                </li>
              </ul>
              <Button className="w-full bg-white text-primary hover:bg-white/90">Start Free Trial</Button>
            </div>
            <div className="bg-background/80 backdrop-blur-sm rounded-xl p-8 border border-foreground/10">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold">Business</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$24.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Multiple users</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>API access</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Priority support</span>
                </li>
              </ul>
              <Button className="w-full" variant="outline">Contact Sales</Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="container mx-auto px-6 pb-24 md:pb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What our users say</h2>
            <p className="mt-4 text-lg text-muted-foreground">Real stories from people who mastered their money with PennyWise.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl border bg-card/80 shadow-md flex flex-col items-center text-center">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="w-16 h-16 rounded-full mb-4 border-2 border-primary" />
              <p className="text-lg font-medium mb-2">“PennyWise helped me finally stick to a budget and save for my dream vacation!”</p>
              <span className="text-muted-foreground text-sm">— Jane D.</span>
            </div>
            <div className="p-8 rounded-xl border bg-card/80 shadow-md flex flex-col items-center text-center">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-16 h-16 rounded-full mb-4 border-2 border-primary" />
              <p className="text-lg font-medium mb-2">“The dashboard is so clean and easy to use. I can see all my accounts in one place.”</p>
              <span className="text-muted-foreground text-sm">— Alex R.</span>
            </div>
            <div className="p-8 rounded-xl border bg-card/80 shadow-md flex flex-col items-center text-center">
              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" className="w-16 h-16 rounded-full mb-4 border-2 border-primary" />
              <p className="text-lg font-medium mb-2">“I love the investment tracking and the peace of mind PennyWise gives me.”</p>
              <span className="text-muted-foreground text-sm">— Priya S.</span>
            </div>
          </div>
        </section>
        <section className="container mx-auto px-6 pb-24 md:pb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Peace of mind, guaranteed.</h2>
            <p className="mt-4 text-lg text-muted-foreground">We are committed to providing a secure and reliable platform for our users.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportFeatures.map((feature) => (
              <div key={feature.title} className="p-8 rounded-xl border bg-card/80 backdrop-blur-sm">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="border-t bg-card/50">
          <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Security</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Roadmap</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Press</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
                <p className="text-muted-foreground mb-4">Get the latest updates and tips straight to your inbox.</p>
                <form className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-lg bg-background border border-input"
                  />
                  <Button size="sm">Subscribe</Button>
                </form>
              </div>
            </div>
            <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-muted-foreground">© 2024 PennyWise. All rights reserved.</p>
              <div className="flex items-center space-x-6">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
