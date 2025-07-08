import './globals.css';
import { ReactNode } from 'react';
import Header from '../components/layout/Header';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background font-sans min-h-screen">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
