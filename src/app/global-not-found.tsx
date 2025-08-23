// Import global styles and fonts
import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import BackButton from '@/components/custom/BackButton';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function GlobalNotFound() {
 
  return (
    <html lang="en" className={`${geistSans.className} ${geistMono.className} antialiased`}>
      <body>
        <div className="w-screen flex flex-col items-center justify-center h-screen bg-gradient-to-b from-indigo-800 via-indigo-700 to-indigo-900">
          <h1 className="text-2xl font-bold text-white">404 - Page Not Found</h1>
          <p className="text-white m-6">This page does not exist.</p>
          <div className="flex gap-6">
            <BackButton />
            <Button variant="destructive">
              <LogIn className="w-4 h-4" />
              <Link href="/signin">
                Logout
              </Link>
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
