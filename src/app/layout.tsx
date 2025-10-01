
import type {Metadata} from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import { AppSidebar } from '@/components/pennywise/sidebar';
import { ClientProvider } from '@/components/pennywise/client-provider';


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
        <ClientProvider>
          <div className="flex min-h-screen relative">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              {children}
            </div>
          </div>
          <Toaster />
        </ClientProvider>
      </body>
    </html>
  );
}
