import './globals.css';
import { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import Header from '../components/layout/Header';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body id="top" className="bg-background font-sans min-h-screen">
          <Header />
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
