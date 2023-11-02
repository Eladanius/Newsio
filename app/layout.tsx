import Topbar from '@/components/shared/bars/Topbar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from '@/lib/store/StoreProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Newsio',
  description: 'Discover randow news around the world',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <StoreProvider>
          <Topbar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
