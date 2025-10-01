
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LayoutDashboard, Wallet, TrendingUp, ScrollText } from 'lucide-react';

const features = [
  {
    icon: <LayoutDashboard className="h-8 w-8 text-primary" />,
    title: 'All-in-One Dashboard',
    description: 'Get a complete overview of your financial health at a glance. Track your balance, income, and expenses effortlessly.',
  },
  {
    icon: <ScrollText className="h-8 w-8 text-primary" />,
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
  }
];

export default function WelcomePage() {
  const { dashboardScreenshot } = placeholderImages;
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
              <Link href="/dashboard">Login</Link>
            </Button>
            <Button className="shadow-sm" asChild>
               <Link href="/dashboard">Sign Up</Link>
            </Button>
          </div>
        </nav>
      </header>
      
      <main className="flex-grow">
        <section className="container mx-auto px-6 py-24 md:py-32 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-foreground leading-tight">
              Master Your Money,
              <br/>
              <span className="text-primary">Simply and Beautifully.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              PennyWise is the last personal finance app you'll ever need. Track spending, manage budgets, and grow your investments—all from one stunningly simple platform.
            </p>
            <div className="mt-10 flex justify-center items-center gap-4">
               <Button size="lg" className="h-12 px-8 text-base font-semibold shadow-md" asChild>
                  <Link href="/dashboard">Get Started for Free</Link>
              </Button>
            </div>
        </section>

        <section className="container mx-auto px-6 pb-24 md:pb-32">
            <div className="relative rounded-xl border-8 border-foreground/5 shadow-2xl">
                 <Image
                    alt={dashboardScreenshot.alt}
                    className="w-full h-auto rounded-lg"
                    src={dashboardScreenshot.src}
                    width={dashboardScreenshot.width}
                    height={dashboardScreenshot.height}
                    data-ai-hint={dashboardScreenshot['data-ai-hint']}
                    priority
                />
            </div>
        </section>

         <section className="container mx-auto px-6 pb-24 md:pb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Everything you need, nothing you don't.</h2>
            <p className="mt-4 text-lg text-muted-foreground">PennyWise is packed with powerful features to help you take control.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
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

        <footer className="border-t">
          <div className="container mx-auto px-6 py-12 text-center text-muted-foreground">
            <div className="flex justify-center space-x-6 mb-4">
              <a
                className="hover:text-primary transition-colors"
                href="#"
              >
                Twitter
              </a>
              <a
                className="hover:text-primary transition-colors"
                href="#"
              >
                GitHub
              </a>
              <a
                className="hover:text-primary transition-colors"
                href="#"
              >
                LinkedIn
              </a>
            </div>
            <p>© 2024 PennyWise. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
