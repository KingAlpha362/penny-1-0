
import type {Metadata} from 'next';
import '../globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import { AppSidebar } from '@/components/pennywise/sidebar';


export const metadata: Metadata = {
  title: 'PennyWise',
  description: 'A comprehensive personal finance management web application.',
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen relative bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
      <Toaster />
    </div>
  );
}
