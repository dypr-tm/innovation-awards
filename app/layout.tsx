import type { Metadata } from 'next';
import './globals.css';

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
          <header className="bg-white border-b border-gray-100 sticky top-0 z-50 pegadaian-shadow">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
              <a href="/" className="flex items-center gap-3 group hover:opacity-90 transition-opacity">
                {/* Logo Mark (SVG Replica of the image) */}
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <path d="M 8 28 A 16 16 0 1 1 40 28" stroke="#7a8599" strokeWidth="4.5" strokeLinecap="round" />
                  <path d="M 24 4 Q 24 18 36 18 Q 24 18 24 28 L 24 48 Q 24 18 12 18 Q 24 18 24 4 Z" fill="url(#starGrad)" />
                  <defs>
                    <linearGradient id="starGrad" x1="24" y1="4" x2="24" y2="48" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#ffeb85" />
                      <stop offset="40%" stopColor="#f7c02b" />
                      <stop offset="100%" stopColor="#d19a15" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Logo Text */}
                <div className="flex flex-col justify-center -space-y-1 mt-1">
                  <span className="font-extrabold text-[22px] text-[#7a8599] leading-none tracking-tight lowercase">innovation</span>
                  <span className="font-extrabold text-[22px] text-[#f7c02b] leading-none tracking-tight lowercase">center</span>
                </div>
              </a>
              <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
                <a href="/" className="hover:text-pegadaian-navy transition-colors">Beranda</a>
                <a href="/pia" className="hover:text-pegadaian-navy transition-colors">PIA</a>
                <a href="/repository" className="hover:text-pegadaian-navy transition-colors">Repository</a>
                <a href="/about" className="hover:text-pegadaian-navy transition-colors">Tentang Kami</a>
                <a href="/contact" className="hover:text-pegadaian-navy transition-colors">Kontak</a>
              </nav>
              <div>
                <a href="/login" className="px-5 py-2.5 text-sm font-semibold text-pegadaian-navy border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors mr-3">
                  Login
                </a>
                <a href="/pia/submit" className="px-5 py-2.5 text-sm font-semibold bg-pegadaian-navy text-white rounded-xl hover:bg-pegadaian-dark transition-all shadow-md hover:shadow-lg">
                  Kirim Inovasi
                </a>
              </div>
            </div>
          </header>
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
