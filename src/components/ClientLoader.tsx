'use client';

import { useState, useCallback, useEffect, useRef, createContext, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import PageLoader from '@/components/PageLoader';

// Context to allow programmatic navigation with loader
interface NavigationContextType {
  navigateWithLoader: (href: string) => void;
}

export const NavigationContext = createContext<NavigationContextType>({
  navigateWithLoader: () => {},
});

export function useNavigationLoader() {
  return useContext(NavigationContext);
}

export default function ClientLoader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdminPath = pathname?.startsWith('/admin');
  const [showLoader, setShowLoader] = useState<boolean>(() => !isAdminPath);
  const prevPathRef = useRef(pathname);
  const isNavigating = useRef(false);
  // Store pathname in a ref so click handler always has the latest value (no stale closure)
  const pathnameRef = useRef(pathname);
  const initialLoadDone = useRef(false);

  // Keep pathnameRef in sync
  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  // Ensure admin routes never show the global page loader
  useEffect(() => {
    if (!pathname) return;
    if (pathname.startsWith('/admin')) {
      setShowLoader(false);
    }
  }, [pathname]);

  const handleLoaderComplete = useCallback(() => {
    // Ensure overflow is always restored
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    setShowLoader(false);
    initialLoadDone.current = true;
  }, []);

  // Clean up path changes (no manual timeouts to kill loader)
  useEffect(() => {
    if (prevPathRef.current === pathname) return;
    prevPathRef.current = pathname;
    
    window.scrollTo({ top: 0 });
    
    if (isNavigating.current) {
      isNavigating.current = false;
    } else {
      // Browser back/forward might have triggered this without a click handler setting true
      // but popstate already set showLoader(true), so just let it finish.
    }
  }, [pathname]);

  // Intercept all link clicks globally
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Only intercept internal navigation links
      if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('/api/')) return;

      // Use ref instead of closure variable to avoid stale pathname
      const currentPath = pathnameRef.current;

      // Same page - don't show loader
      if (href === currentPath) return;

      // If navigating into admin routes, skip the global page loader
      if (href.startsWith('/admin')) {
        e.preventDefault();
        window.scrollTo({ top: 0 });
        router.push(href);
        return;
      }

      // Mark as navigating and show loader
      e.preventDefault();
      isNavigating.current = true;
      window.scrollTo({ top: 0 });
      setShowLoader(true);

      // Navigate after a brief delay so the loader shows
      setTimeout(() => {
        router.push(href);
      }, 100);
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [router]); // Remove pathname from deps - we use pathnameRef instead

  // Listen for browser back/forward (popstate)
  useEffect(() => {
    const handlePopState = () => {
      // Avoid showing loader for admin routes on history navigation
      if (window.location.pathname.startsWith('/admin')) {
        window.scrollTo({ top: 0 });
        return;
      }
      // Show loader immediately on popstate
      setShowLoader(true);
      window.scrollTo({ top: 0 });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Clean up hash fragments from URL
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    const handleHashChange = () => {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateWithLoader = useCallback((href: string) => {
    // Don't show global loader for admin navigation
    if (href.startsWith('/admin')) {
      window.scrollTo({ top: 0 });
      router.push(href);
      return;
    }

    isNavigating.current = true;
    window.scrollTo({ top: 0 });
    setShowLoader(true);
    setTimeout(() => {
      router.push(href);
    }, 100);
  }, [router]);

  return (
    <NavigationContext.Provider value={{ navigateWithLoader }}>
      {showLoader && (
        <PageLoader onComplete={handleLoaderComplete} />
      )}
      <div style={{ opacity: showLoader ? 0 : 1, transition: 'opacity 0.2s ease' }}>
        {children}
      </div>
    </NavigationContext.Provider>
  );
}
