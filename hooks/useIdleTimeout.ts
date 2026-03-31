'use client';
import { useEffect, useState, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'; 

export function useIdleTimeout() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClientComponentClient();
  
  const [showWarning, setShowWarning] = useState(false);
  const timeoutId = useRef<NodeJS.Timeout>();
  const warningId = useRef<NodeJS.Timeout>();
  
  const IDLE_TIMEOUT = 300 * 1000; // 300 detik
  const WARNING_TIME = 270 * 1000; // 270 detik

  const resetTimer = () => {
    setShowWarning(false);
    clearTimeout(timeoutId.current);
    clearTimeout(warningId.current);

    // Jangan apply pada halaman public
    if (pathname === '/' || pathname === '/about' || pathname === '/login' || pathname === '/pia') return;

    warningId.current = setTimeout(() => {
      setShowWarning(true);
    }, WARNING_TIME);

    timeoutId.current = setTimeout(async () => {
      // Execute Logout
      await supabase.auth.signOut();
      router.push('/login');
    }, IDLE_TIMEOUT);
  };

  useEffect(() => {
    // Events yang mendeteksi "aktivitas"
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    
    events.forEach(event => document.addEventListener(event, resetTimer));
    resetTimer(); // init

    return () => {
      events.forEach(event => document.removeEventListener(event, resetTimer));
      clearTimeout(timeoutId.current);
      clearTimeout(warningId.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return { showWarning, resetTimer };
}
