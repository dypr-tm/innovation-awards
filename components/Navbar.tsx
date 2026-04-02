'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { MdNotifications, MdAccountCircle, MdLogout, MdKeyboardArrowDown } from 'react-icons/md';
import Image from 'next/image';

export default function Navbar() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };
    
    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setProfileOpen(false);
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 pegadaian-shadow">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 group hover:opacity-90 transition-opacity">
          {/* Logo updated to point to the user's provided logo image */}
          {/* We use standard img to avoid Next.js Image caching complexities if they swap the file frequently, but feel free to change to next/image later */}
          <img 
            src="/logo.png" 
            alt="Pegadaian Innovation Center" 
            className="h-[48px] w-auto object-contain"
            onError={(e) => {
              // Fallback visual if logo.png is not yet placed by the user
              e.currentTarget.style.display = 'none';
              const fallback = document.getElementById('logo-fallback');
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          {/* Fallback that looks like the old logo inline SVG, just in case they haven't saved logo.png yet */}
          <div id="logo-fallback" className="hidden items-center gap-3" style={{ display: 'none' }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="shrink-0">
              <path d="M 8 28 A 16 16 0 1 1 40 28" stroke="#7a8599" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M 24 4 Q 24 18 36 18 Q 24 18 24 28 L 24 48 Q 24 18 12 18 Q 24 18 24 4 Z" fill="#f7c02b" />
            </svg>
            <div className="flex flex-col justify-center -space-y-1 mt-1">
              <span className="font-extrabold text-[22px] text-[#7a8599] leading-none tracking-tight lowercase">innovation</span>
              <span className="font-extrabold text-[22px] text-[#f7c02b] leading-none tracking-tight lowercase">center</span>
            </div>
          </div>
        </a>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <a href="/" className="hover:text-pegadaian-green transition-colors">Beranda</a>
          <a href="/pia" className="hover:text-pegadaian-green transition-colors">PIA</a>
          <a href="/repository" className="hover:text-pegadaian-green transition-colors">Repository</a>
          <a href="/about" className="hover:text-pegadaian-green transition-colors">Tentang Kami</a>
          <a href="/contact" className="hover:text-pegadaian-green transition-colors">Kontak</a>
        </nav>
        
        <div className="flex items-center gap-2 md:gap-4 lg:gap-6">
          {!loading && !session ? (
            // Unauthenticated UI
            <div className="flex items-center gap-2 md:gap-4">
              <a href="/login" className="px-4 py-2 md:px-6 md:py-2 text-sm font-semibold text-pegadaian-green border border-pegadaian-green rounded-[6px] hover:bg-green-50 transition-colors">
                Login
              </a>
              <a href="/pia/submit" className="hidden sm:inline-flex px-4 py-2 md:px-6 md:py-2 text-sm font-semibold bg-pegadaian-green text-white rounded-[6px] hover:opacity-90 transition-all shadow-md hover:shadow-lg">
                Kirim Inovasi
              </a>
            </div>
          ) : !loading && session ? (
            // Authenticated UI
            <div className="flex items-center gap-2 sm:gap-4 relative">
              <a href="/pia/submit" className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold bg-pegadaian-green text-white rounded-[6px] hover:opacity-90 transition-all shadow-sm">
                Kirim Inovasi
              </a>
              
              <button className="p-2 text-gray-500 hover:text-pegadaian-green hover:bg-green-50 rounded-full transition-colors relative">
                <MdNotifications size={24} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-pegadaian-yellow rounded-full border border-white"></span>
              </button>

              <div className="relative">
                <button 
                  onClick={() => setProfileOpen(!profileOpen)}
                  onBlur={() => setTimeout(() => setProfileOpen(false), 200)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-full sm:rounded-[6px] border border-transparent hover:border-gray-100 transition-all cursor-pointer"
                >
                  <MdAccountCircle size={28} className="text-gray-400" />
                  <span className="hidden w-16 sm:w-auto sm:block text-sm font-medium text-gray-700 max-w-[120px] truncate">
                    {session.user.user_metadata?.full_name || 'Profile'}
                  </span>
                  <MdKeyboardArrowDown size={20} className="text-gray-400 hidden sm:block" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-[12px] pegadaian-shadow border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {session.user.user_metadata?.full_name || 'My Profile'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                      <div className="mt-1 flex">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 capitalize">
                          {session.user.user_metadata?.role || 'Peserta'}
                        </span>
                      </div>
                    </div>
                    {session.user.user_metadata?.role === 'superadmin' || session.user.user_metadata?.role === 'admin' ? (
                      <a href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        Admin Dashboard
                      </a>
                    ) : null}
                    <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      Pengaturan Profil
                    </a>
                    <button 
                      onMouseDown={(e) => { e.preventDefault(); handleSignOut(); }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors mt-1 border-t border-gray-50 pt-2"
                    >
                      <MdLogout size={20} />
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Loading skeleton or empty state
            <div className="w-32 h-10 bg-gray-100 animate-pulse rounded-[6px]"></div>
          )}
        </div>
      </div>
    </header>
  );
}
