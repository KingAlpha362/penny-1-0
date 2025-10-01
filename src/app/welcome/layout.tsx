
import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'PennyWise - Personal Finance App',
  description: 'Your new best friend for managing money!',
};

export default function WelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
