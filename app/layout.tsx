import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Pegadaian Innovation Center',
  description: 'Pusat Manajemen Inovasi PT Pegadaian',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-white border-t border-gray-100 py-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} PT Pegadaian. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
