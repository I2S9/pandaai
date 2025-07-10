import './globals.css';
import { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import Header from '../components/layout/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PandasAI',
  description: 'PandaAI - Plateforme d&apos;apprentissage IA avec flashcards, quiz et répétition espacée. Apprenez plus intelligemment avec nos pandas kawaii !',
  keywords: ['apprentissage', 'IA', 'flashcards', 'quiz', 'répétition espacée', 'éducation', 'panda'],
  authors: [{ name: 'PandaAI Team' }],
  creator: 'PandaAI',
  publisher: 'PandaAI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pandaai.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://pandaai.com',
    title: 'PandaAI - Plateforme d&apos;apprentissage IA kawaii',
    description: 'PandaAI - Plateforme d&apos;apprentissage IA avec flashcards, quiz et répétition espacée. Apprenez plus intelligemment avec nos pandas kawaii !',
    siteName: 'PandaAI',
    images: [
      {
        url: '/logo-pandaai.svg',
        width: 1200,
        height: 630,
        alt: 'PandaAI Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PandaAI - Plateforme d&apos;apprentissage IA kawaii',
    description: 'PandaAI - Plateforme d&apos;apprentissage IA avec flashcards, quiz et répétition espacée. Apprenez plus intelligemment avec nos pandas kawaii !',
    images: ['/logo-pandaai.svg'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

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
