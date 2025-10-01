
import type {Metadata} from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import { AppSidebar } from '@/components/pennywise/sidebar';
import { ThemeProvider } from '@/components/pennywise/theme-provider';

export const metadata: Metadata = {
  title: 'PennyWise',
  description: 'A comprehensive personal finance management web application.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", "bg-background")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="theme-green"
        >
          <div className="flex min-h-screen relative">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-primary/10 dark:from-primary/20 dark:via-transparent dark:to-primary/20 -z-10" />
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              {children}
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
