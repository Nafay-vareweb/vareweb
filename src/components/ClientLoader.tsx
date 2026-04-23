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
  const [loaderVariant, setLoaderVariant] = useState<'page' | 'simple'>(() => pathname === '/' ? 'page' : 'simple');
  const [showLoader, setShowLoader] = useState<boolean>(() => pathname === '/' && !isAdminPath);
  const prevPathRef = useRef(pathname);
  const isNavigating = useRef(false);
  // Store pathname in a ref so click handler always has the latest value (no stale closure)
  const pathnameRef = useRef(pathname);
  const initialLoadDone = useRef(false);

  // Keep pathnameRef in sync
  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  const handleLoaderComplete = useCallback(() => {
    // Ensure overflow is always restored
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    setShowLoader(false);
    initialLoadDone.current = true;
  }, []);

  // Ensure admin routes never show the global page loader
  useEffect(() => {
    if (!pathname) return;
    if (pathname.startsWith('/admin')) {
      setShowLoader(false);
    }
  }, [pathname]);

  // Hide simple spinner when navigation finishes (path changes)
  useEffect(() => {
    if (prevPathRef.current === pathname) return;
    // If we were showing a simple loader (non-home), hide it now
    if (showLoader && loaderVariant === 'simple') {
      handleLoaderComplete();
    }
  }, [pathname, showLoader, loaderVariant, handleLoaderComplete]);

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

      // Determine loader variant for the target route and show loader
      const variant = href === '/' ? 'page' : 'simple';
      setLoaderVariant(variant);

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
      const p = window.location.pathname;
      if (p.startsWith('/admin')) {
        window.scrollTo({ top: 0 });
        return;
      }
      // Choose variant based on destination
      setLoaderVariant(p === '/' ? 'page' : 'simple');
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

    // Choose variant for target route
    const variant = href === '/' ? 'page' : 'simple';
    setLoaderVariant(variant);

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
        loaderVariant === 'page' ? (
          <PageLoader onComplete={handleLoaderComplete} />
        ) : (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        )
      )}
      <div style={{
        opacity: showLoader ? 0 : 1,
        transform: showLoader ? 'translateY(20px)' : 'translateY(0)',
        transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out',
        willChange: 'opacity, transform'
      }}>
        {children}
      </div>
    </NavigationContext.Provider>
  );
}
